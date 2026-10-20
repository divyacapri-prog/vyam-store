import Link from "next/link";
import Image from "next/image";
import { BRANDS, PRODUCTS } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.buyable).slice(0, 4);
  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="hero-head">
            <div className="eyebrow" style={{ justifyContent: "center" }}>VYAM Store</div>
            <div className="hero-tag">Everyday products. Better ideas.</div>
            <p className="lead" style={{ margin: "0 auto 28px" }}>
              We build consumer brands around the way people live, care and clean every day.
              SMOD laundry pods are here — more brands are on the way.
            </p>
            <Link className="btn solid" href="/shop">Shop now →</Link>
          </div>
          <div className="hero-banner">
            <Image
              src="https://d2ol7oe51mr4n9.cloudfront.net/user_3IMyctpTEDyautVxPt2exFQaBqy/b3b640e5-798b-4551-a4c8-2322e8c51456.png"
              alt="SMOD — Laundry Pods for Every Wash: Socks, Intimate Care, Sports, Baby and Regular"
              fill
              sizes="(max-width: 1240px) 100vw, 1240px"
              style={{ objectFit: "cover" }}
              quality={100}
              priority
            />
          </div>
        </div>
      </div>

      <section style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="sec-head">
            <div className="eyebrow">Now Available</div>
            <h2 className="h2">SMOD. Detergent, redesigned.</h2>
            <p className="lead">Pre-measured laundry pods — no measuring cups, no mess, no guesswork.</p>
          </div>
          <div className="pgrid">
            {featured.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
          <div style={{ marginTop: 30 }}>
            <Link className="textlink" href="/shop">View all products <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="strip">
        <div className="container">
          <div className="eyebrow">What's Next</div>
          <h2 className="h2" style={{ maxWidth: "16em" }}>Something new is quietly taking shape.</h2>
          <p className="lead" style={{ margin: "20px 0 30px" }}>
            FYND, KHIND, RIWERS and our pet care line are in the works. We're constantly exploring
            what's next in everyday consumer products.
          </p>
          <Link className="btn" style={{ borderColor: "rgba(247,244,238,.5)", color: "var(--bg)" }} href="/brands">
            Meet the brands →
          </Link>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="sec-head">
            <div className="eyebrow">Our Brands</div>
            <h2 className="h2">Built for everyday life.</h2>
          </div>
          <div className="bcards">
            {Object.values(BRANDS).map((b) => (
              <Link key={b.slug} className="bcard" href={"/brand/" + b.slug} style={{ background: b.tint, color: b.dark }}>
                <div>
                  <div className="bc-name">{b.name}</div>
                  <div className="bc-cat">{b.cat}</div>
                </div>
                <div className="bc-tag">{b.live ? "Shop now →" : "Coming soon"}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
