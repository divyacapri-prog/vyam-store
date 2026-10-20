import { NextResponse } from "next/server";
import { priceOf } from "@/lib/catalog";
import { getAdmin } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Bad request" }, { status: 400 }); }
  const { items, customer } = body || {};
  if (!Array.isArray(items) || items.length === 0 || !customer) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Server-side pricing — never trust client totals.
  let amount = 0;
  const lines = [];
  for (const it of items) {
    const qty = Math.max(1, Math.min(50, parseInt(it.qty, 10) || 0));
    const p = priceOf(it.slug, it.variant);
    if (!p || !qty) return NextResponse.json({ error: "Invalid item in cart" }, { status: 400 });
    amount += p.price * qty;
    lines.push({ slug: it.slug, name: p.name, variant: p.variant, qty, price: p.price });
  }

  const ref =
    "VY" + Date.now().toString(36).toUpperCase() +
    Math.random().toString(36).slice(2, 6).toUpperCase();

  const keyId = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  let rzp = null;

  if (keyId && secret) {
    const r = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(keyId + ":" + secret).toString("base64"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount: amount * 100, currency: "INR", receipt: ref })
    });
    if (!r.ok) {
      return NextResponse.json({ error: "Payment initialisation failed. Please try again." }, { status: 502 });
    }
    rzp = await r.json();
  }

  const sb = getAdmin();
  if (sb) {
    await sb.from("orders").insert({
      ref,
      amount,
      status: rzp ? "created" : "demo",
      customer,
      items: lines,
      rzp_order_id: rzp ? rzp.id : null
    });
  }

  if (rzp) {
    return NextResponse.json({ mode: "razorpay", keyId, rzpOrderId: rzp.id, amount: amount * 100, ref });
  }
  return NextResponse.json({ mode: "demo", ref });
}
