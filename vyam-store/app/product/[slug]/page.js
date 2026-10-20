import Link from "next/link";
import { notFound } from "next/navigation";
import { BRANDS, PRODUCTS, getProduct } from "@/lib/catalog";
import BuyBox from "@/components/BuyBox";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProduct(params.slug);
  return { title: p ? p.name + " | VYAM" : "Product | VYAM" };
}

export default function ProductPage({ params }) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  const b = BRANDS[p.brand];
  const related = PRODUCTS.filter((x) => x.brand === p.brand && x.slug !== p.slug && x.buyable).slice(0, 3);

  const header = (
    <>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        <Link href={"/brand/" + b.slug}>{b.name} — {b.cat}</Link>
      </div>
      <h1>{p.name}</h1>
      <p className="lead">{p.desc}</p>
    </>
  );

  return (
    <>
      {p.buyable ? (
        <BuyBox product={p} tint={b.tint}>{header}</BuyBox>
      ) : (
        <div className="container pd">
          <div className="pd-img" style={{ background: b.tint }}>
            <div className="ph-tile" style={{ background: b.grad, minHeight: 300 }}>
              <span style={{ color: "#fff" }}>{b.name}</span>
            </div>
          </div>
          <div>
            {header}
            <div className="notice" style={{ marginTop: 26 }}>
              This product is part of an upcoming {b.name} launch and isn't available to buy yet.
              <div style={{ marginTop: 12 }}>
                <Link className="textlink" href="/contact">Get notified / talk to us →</Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {related.length > 0 && (
        <section>
          <div className="container">
            <div className="sec-head"><h2 className="h2">More from {b.name}.</h2></div>
            <div className="pgrid">
              {related.map((r) => <ProductCard key={r.slug} p={r} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
