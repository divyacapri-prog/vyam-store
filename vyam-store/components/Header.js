"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const LINKS = [
  ["/shop", "Shop"],
  ["/brands", "Brands"],
  ["/about", "About"],
  ["/contact", "Contact"]
];

export default function Header() {
  const cart = useCart();
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="site">
        <div className="container nav">
          <Link className="logo" href="/">VYA<span>M</span></Link>
          <nav className="navlinks">
            {LINKS.map(([href, label]) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
            <Link className="cartlink" href="/cart">
              Cart {cart && cart.count > 0 ? <span className="bubble">{cart.count}</span> : null}
            </Link>
          </nav>
          <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>
            <div /><div /><div />
          </button>
        </div>
      </header>
      <div className={"mobilemenu" + (open ? " open" : "")}>
        {[["/", "Home"], ...LINKS, ["/cart", "Cart"]].map(([href, label]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
        ))}
      </div>
    </>
  );
}
