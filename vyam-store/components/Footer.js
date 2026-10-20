import Link from "next/link";
import { BRANDS } from "@/lib/catalog";

export default function Footer() {
  return (
    <footer className="site">
      <div className="container">
        <div className="foot-grid">
          <div>
            <div className="foot-logo">VYAM</div>
            <p className="small-muted">Everyday products.<br />Better ideas.</p>
          </div>
          <div className="foot-col">
            <h4>Brands</h4>
            {Object.values(BRANDS).map((b) => (
              <Link key={b.slug} href={"/brand/" + b.slug}>{b.name}</Link>
            ))}
          </div>
          <div className="foot-col">
            <h4>Shop</h4>
            <Link href="/shop">All products</Link>
            <Link href="/cart">Cart</Link>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="foot-col">
            <h4>Policies</h4>
            <Link href="/policies/privacy">Privacy Policy</Link>
            <Link href="/policies/terms">Terms of Service</Link>
            <Link href="/policies/refunds">Refund & Cancellation</Link>
            <Link href="/policies/shipping">Shipping Policy</Link>
          </div>
        </div>
        <div className="foot-base">
          <div>© 2026 Vyam Trading Ventures LLP · Coimbatore, Tamil Nadu</div>
          <div>vyamretail.incbe@gmail.com</div>
        </div>
      </div>
    </footer>
  );
}
