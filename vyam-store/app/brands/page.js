import Link from "next/link";
import { BRANDS } from "@/lib/catalog";

export const metadata = { title: "Our Brands | VYAM" };

export default function Brands() {
  return (
    <section>
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow">Our Brands</div>
          <h2 className="display">Built for<br />everyday life.</h2>
          <p className="lead" style={{ marginTop: 22 }}>
            A growing portfolio of consumer brands across the categories people use, care about and
            live with every day. All of them start with the same question: can this be better?
          </p>
        </div>
        <div className="bcards" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
          {Object.values(BRANDS).map((b) => (
            <Link key={b.slug} className="bcard" href={"/brand/" + b.slug}
              style={{ background: b.tint, color: b.dark, minHeight: 240 }}>
              <div>
                <div className="bc-name" style={{ fontSize: "1.8rem" }}>{b.name}</div>
                <div className="bc-cat">{b.cat}</div>
                <p style={{ marginTop: 12, fontSize: ".95rem", opacity: 0.85 }}>{b.pos}</p>
              </div>
              <div className="bc-tag">{b.live ? "Shop now →" : "Coming soon"}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
