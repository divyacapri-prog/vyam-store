import Link from "next/link";
import Image from "next/image";
import { BRANDS, inr } from "@/lib/catalog";

export default function ProductCard({ p }) {
  const b = BRANDS[p.brand];
  const from = p.buyable && p.variants.length ? Math.min(...p.variants.map((v) => v.price)) : null;
  return (
    <Link className="pcard" href={"/product/" + p.slug}>
      <div className="pimg" style={{ background: b.tint }}>
        {p.images[0] ? (
          <Image
            src={p.images[0]}
            alt={p.name}
            fill
            sizes="(max-width: 900px) 50vw, 25vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="ph-tile" style={{ background: b.grad }}>
            <span style={{ color: "#fff" }}>{b.name}</span>
          </div>
        )}
      </div>
      <div className="pbody">
        <div className="pbrand" style={{ color: b.dark }}>{b.name}</div>
        <h3>{p.name}</h3>
        <div className="pshort">{p.short}</div>
        {from ? (
          <div className="pprice">From {inr(from)}</div>
        ) : (
          <div className="soon">Coming soon</div>
        )}
      </div>
    </Link>
  );
}
