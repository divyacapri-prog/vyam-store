export const metadata = { title: "About | VYAM" };

export default function About() {
  return (
    <>
      <section>
        <div className="container">
          <div className="eyebrow">About VYAM</div>
          <h1 className="display">We build consumer brands<br />around everyday needs.</h1>
          <p className="lead" style={{ marginTop: 26 }}>
            Vyam Trading Ventures LLP is a consumer-products company building brands across everyday
            categories. From cleaning and personal care to beauty, hair care and pet care, our focus
            is simple: identify what people need, find where things can be better, and build products
            that make sense for everyday life.
          </p>
        </div>
      </section>
      <section className="strip">
        <div className="container">
          <p className="lead" style={{ fontSize: "1.4rem", maxWidth: "26em" }}>
            We're not here to build everything. We're here to build the right things.
          </p>
          <p className="lead" style={{ marginTop: 24, color: "#E0A184", fontWeight: 600 }}>
            Today, we're building brands. Tomorrow, we want to build categories.
          </p>
        </div>
      </section>
    </>
  );
}
