"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getProduct } from "@/lib/catalog";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("vyam-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem("vyam-cart", JSON.stringify(items)); } catch {}
  }, [items, ready]);

  function add(slug, variant, qty = 1) {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.slug === slug && x.variant === variant);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { slug, variant, qty }];
    });
  }

  function setQty(slug, variant, qty) {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((x) => !(x.slug === slug && x.variant === variant))
        : prev.map((x) => (x.slug === slug && x.variant === variant ? { ...x, qty } : x))
    );
  }

  function clear() { setItems([]); }

  const detailed = items
    .map((it) => {
      const p = getProduct(it.slug);
      if (!p) return null;
      const v = p.variants.find((v) => v.label === it.variant);
      if (!v) return null;
      return { ...it, name: p.name, price: v.price, image: p.images[0] || null, line: v.price * it.qty };
    })
    .filter(Boolean);

  const total = detailed.reduce((s, x) => s + x.line, 0);
  const count = detailed.reduce((s, x) => s + x.qty, 0);

  return (
    <CartCtx.Provider value={{ items: detailed, add, setQty, clear, total, count, ready }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  return useContext(CartCtx);
}
