import Link from "next/link";
import { BRANDS, PRODUCTS } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

export const metadata = { title: "Shop | VYAM" };

export default function Shop({ searchParams }) {
  const brand = searchParams?.brand || null;
  const list = PRODUCTS.filter((p) => !brand || p.brand === brand);
  return (
    <section>
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow">Shop</div>
          <h2 className="display">All products.</h2>
        </div>
        <div className="chips">
          <Link className={"chip" + (!brand ? " on" : "")} href="/shop">All</Link>
          {Object.values(BRANDS).map((b) => (
            <Link key={b.slug} className={"chip" + (brand === b.slug ? " on" : "")} href={"/shop?brand=" + b.slug}>
              {b.name}
            </Link>
          ))}
        </div>
        <div className="pgrid">
          {list.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </div>
    </section>
  );
}
