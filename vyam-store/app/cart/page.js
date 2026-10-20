"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { inr } from "@/lib/catalog";

export default function CartPage() {
  const cart = useCart();
  if (!cart || !cart.ready) return <div className="center">Loading…</div>;
  if (cart.items.length === 0) {
    return (
      <div className="center">
        <h1 className="h2" style={{ marginBottom: 18 }}>Your cart is empty.</h1>
        <p className="lead" style={{ margin: "0 auto 30px" }}>Everyday essentials are one click away.</p>
        <Link className="btn solid" href="/shop">Shop now →</Link>
      </div>
    );
  }
  return (
    <section>
      <div className="container" style={{ maxWidth: 820 }}>
        <div className="sec-head">
          <div className="eyebrow">Cart</div>
          <h1 className="h2">Your cart.</h1>
        </div>
        {cart.items.map((it) => (
          <div className="cartline" key={it.slug + it.variant}>
            <div className="cimg">{it.image && <img src={it.image} alt={it.name} />}</div>
            <div>
              <h4>{it.name}</h4>
              <div className="cv">{it.variant} · {inr(it.price)} each</div>
              <div className="qtyrow" style={{ margin: "10px 0 0" }}>
                <button onClick={() => cart.setQty(it.slug, it.variant, it.qty - 1)} aria-label="Decrease">−</button>
                <span>{it.qty}</span>
                <button onClick={() => cart.setQty(it.slug, it.variant, it.qty + 1)} aria-label="Increase">+</button>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700 }}>{inr(it.line)}</div>
              <button
                onClick={() => cart.setQty(it.slug, it.variant, 0)}
                style={{ background: "none", border: "none", color: "var(--muted)", fontSize: ".85rem", textDecoration: "underline", marginTop: 8 }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="totalrow"><span>Total</span><span>{inr(cart.total)}</span></div>
        <p className="small-muted" style={{ marginBottom: 24 }}>Free shipping across India.</p>
        <Link className="btn solid block" href="/checkout">Proceed to checkout →</Link>
      </div>
    </section>
  );
}
