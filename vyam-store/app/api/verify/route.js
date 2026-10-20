import { NextResponse } from "next/server";
import crypto from "crypto";
import { getAdmin } from "@/lib/db";
import { srCreateOrder } from "@/lib/shiprocket";

export const runtime = "nodejs";

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ verified: false }, { status: 400 }); }
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, ref } = body || {};
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ verified: false }, { status: 400 });
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  const ok =
    expected.length === razorpay_signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature));

  if (!ok) return NextResponse.json({ verified: false }, { status: 400 });

  const sb = getAdmin();
  if (sb && ref) {
    const { data: rows } = await sb
      .from("orders")
      .select("*")
      .eq("ref", ref)
      .eq("rzp_order_id", razorpay_order_id)
      .limit(1);
    const order = rows && rows[0];

    await sb
      .from("orders")
      .update({ status: "paid", rzp_payment_id: razorpay_payment_id })
      .eq("ref", ref)
      .eq("rzp_order_id", razorpay_order_id);

    // Push the paid order to Shiprocket (no-op until credentials are configured).
    if (order) {
      try {
        const sr = await srCreateOrder(order);
        if (sr && !sr.skipped) {
          await sb.from("orders").update({ shiprocket: sr.data || { error: sr.error } }).eq("ref", ref);
        }
      } catch {}
    }
  }
  return NextResponse.json({ verified: true });
}
