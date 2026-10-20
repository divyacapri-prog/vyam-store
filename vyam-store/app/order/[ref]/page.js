import Link from "next/link";

export const metadata = { title: "Order confirmed | VYAM" };

export default function OrderConfirmed({ params, searchParams }) {
  const demo = searchParams?.demo === "1";
  return (
    <div className="center">
      <div className="big-ok">✓</div>
      <h1 className="h2" style={{ marginBottom: 14 }}>
        {demo ? "Order received." : "Order confirmed."}
      </h1>
      <p className="lead" style={{ margin: "0 auto 10px" }}>
        Your order reference is <strong>{params.ref}</strong>.
      </p>
      {demo ? (
        <p className="small-muted" style={{ marginBottom: 30 }}>
          Note: online payments are not yet activated on this store, so no payment was collected.
          We'll contact you to complete this order.
        </p>
      ) : (
        <p className="small-muted" style={{ marginBottom: 30 }}>
          A confirmation will be sent to your email. We'll be in touch with shipping updates.
        </p>
      )}
      <Link className="btn solid" href="/shop">Continue shopping →</Link>
    </div>
  );
}
