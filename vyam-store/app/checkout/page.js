"use client";
import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { inr } from "@/lib/catalog";

const FIELDS = [
  ["name", "Full name", "text", true],
  ["email", "Email", "email", true],
  ["phone", "Phone", "tel", true],
  ["address", "Address", "text", true],
  ["city", "City", "text", true],
  ["state", "State", "text", true],
  ["pincode", "PIN code", "text", true]
];

export default function Checkout() {
  const cart = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  if (!cart || !cart.ready) return <div className="center">Loading…</div>;
  if (cart.items.length === 0) {
    return (
      <div className="center">
        <h1 className="h2" style={{ marginBottom: 18 }}>Nothing to check out.</h1>
        <Link className="btn solid" href="/shop">Shop now →</Link>
      </div>
    );
  }

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  async function pay(e) {
    e.preventDefault();
    setErr("");
    for (const [k, label, , req] of FIELDS) {
      if (req && !form[k].trim()) { setErr("Please fill in " + label.toLowerCase() + "."); return; }
    }
    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.items.map((i) => ({ slug: i.slug, variant: i.variant, qty: i.qty })),
          customer: form
        })
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Checkout failed");

      if (d.mode === "razorpay") {
        const rzp = new window.Razorpay({
          key: d.keyId,
          order_id: d.rzpOrderId,
          amount: d.amount,
          currency: "INR",
          name: "VYAM",
          description: "Order " + d.ref,
          prefill: { name: form.name, email: form.email, contact: form.phone },
          theme: { color: "#B4481B" },
          handler: async (resp) => {
            const v = await fetch("/api/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...resp, ref: d.ref })
            });
            const vd = await v.json();
            if (vd.verified) {
              cart.clear();
              router.push("/order/" + d.ref);
            } else {
              setErr("Payment verification failed. If money was deducted, contact us with reference " + d.ref + ".");
              setBusy(false);
            }
          },
          modal: { ondismiss: () => setBusy(false) }
        });
        rzp.open();
      } else {
        // Demo mode: payments not configured yet
        cart.clear();
        router.push("/order/" + d.ref + "?demo=1");
      }
    } catch (ex) {
      setErr(ex.message || "Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  return (
    <section>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <div className="container co-grid">
        <form onSubmit={pay}>
          <div className="eyebrow">Checkout</div>
          <h1 className="h2" style={{ marginBottom: 30 }}>Delivery details.</h1>
          <div className="frow2">
            <div className="field"><label>Full name</label>
              <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} /></div>
            <div className="field"><label>Phone</label>
              <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} /></div>
          </div>
          <div className="field"><label>Email</label>
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} /></div>
          <div className="field"><label>Address</label>
            <input type="text" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="House / street / area" /></div>
          <div className="frow2">
            <div className="field"><label>City</label>
              <input type="text" value={form.city} onChange={(e) => set("city", e.target.value)} /></div>
            <div className="field"><label>State</label>
              <input type="text" value={form.state} onChange={(e) => set("state", e.target.value)} /></div>
          </div>
          <div className="field" style={{ maxWidth: 220 }}><label>PIN code</label>
            <input type="text" inputMode="numeric" value={form.pincode} onChange={(e) => set("pincode", e.target.value)} /></div>
          <button className="btn solid block" type="submit" disabled={busy}>
            {busy ? "Processing…" : "Pay " + inr(cart.total) + " →"}
          </button>
          {err && <div className="errmsg">{err}</div>}
          <p className="small-muted" style={{ marginTop: 16 }}>
            Payments are processed securely by Razorpay. We never see your card details.
          </p>
        </form>
        <div className="summary">
          <h3>Order summary</h3>
          {cart.items.map((it) => (
            <div className="sline" key={it.slug + it.variant}>
              <span>{it.name} ({it.variant}) × {it.qty}</span>
              <span>{inr(it.line)}</span>
            </div>
          ))}
          <div className="sline"><span>Shipping</span><span>Free</span></div>
          <div className="sline total"><span>Total</span><span>{inr(cart.total)}</span></div>
        </div>
      </div>
    </section>
  );
}
