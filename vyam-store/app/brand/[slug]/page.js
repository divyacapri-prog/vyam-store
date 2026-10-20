import { notFound } from "next/navigation";
import { BRANDS, productsByBrand } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return Object.keys(BRANDS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const b = BRANDS[params.slug];
  return { title: b ? b.name + " | VYAM" : "Brand | VYAM" };
}

export default function BrandPage({ params }) {
  const b = BRANDS[params.slug];
  if (!b) notFound();
  const list = productsByBrand(b.slug);
  return (
    <>
      <div className="bhero" style={{ background: b.grad }}>
        <div className="container">
          <div className="bcat">{b.cat}</div>
          <div className="bname">{b.name}</div>
          <div className="bpos">{b.pos}</div>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="sec-head">
            <div className="eyebrow">The Brand</div>
            <p className="lead">{b.story}</p>
          </div>
          <div className="pgrid">
            {list.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
