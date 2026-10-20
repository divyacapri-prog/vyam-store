"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { inr } from "@/lib/catalog";
import Carousel from "@/components/Carousel";

// Renders the product gallery (carousel) + purchase controls together so the
// carousel always shows the images of the selected variant.
export default function BuyBox({ product, tint, children }) {
  const cart = useCart();
  const [variant, setVariant] = useState(product.variants[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function addToCart() {
    cart.add(product.slug, variant.label, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  const imgs = variant.images && variant.images.length ? variant.images : product.images;

  return (
    <div className="container pd">
      <div className="pd-media">
        <Carousel images={imgs} alt={product.name + " (" + variant.label + ")"} tint={tint} />
      </div>
      <div>
        {children}
        <div className="pd-price">{inr(variant.price)}</div>
        <div className="pd-note">{variant.note}</div>
        <div className="vrow">
          {product.variants.map((v) => (
            <button
              key={v.label}
              className={"vbtn" + (v.label === variant.label ? " on" : "")}
              onClick={() => setVariant(v)}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div className="qtyrow">
          <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)} aria-label="Increase">+</button>
        </div>
        <button className="btn solid block" onClick={addToCart}>Add to cart</button>
        {added && (
          <div className="addedmsg">
            Added to cart. <Link href="/cart" style={{ textDecoration: "underline" }}>View cart →</Link>
          </div>
        )}
        {product.features.length > 0 && (
          <ul className="feat">
            {product.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}
