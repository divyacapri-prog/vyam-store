import Link from "next/link";
import { notFound } from "next/navigation";

const COMPANY = "Vyam Trading Ventures LLP";
const EMAIL = "vyamretail.incbe@gmail.com";
const CITY = "Coimbatore, Tamil Nadu, India";
const EFFECTIVE = "23 August 2026";

const POLICIES = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      { h: "Who we are", p: [`${COMPANY} ("VYAM", "we", "us") operates this online store. This policy explains what information we collect when you use our website and place orders, and how we use it. It is effective from ${EFFECTIVE}.`] },
      { h: "Information we collect", p: [
        "When you place an order we collect your name, email address, phone number and delivery address. We also keep a record of the items you ordered and your order history.",
        "We do not collect or store your card, UPI or banking details. Payments are processed entirely by Razorpay, our payment gateway, on their secure systems."
      ] },
      { h: "How we use your information", p: [
        "We use your information to process and deliver your orders, to send you order and shipping updates, and to respond to your queries. We do not sell your personal information to anyone.",
        "To fulfil your order we share the necessary details with our service providers: Razorpay (payment processing) and our logistics partners such as Shiprocket and their courier networks (delivery). Each of these providers is bound by their own privacy and security obligations."
      ] },
      { h: "Data storage and security", p: [
        "Order information is stored securely in our database with access restricted to authorised personnel. Our website is served over HTTPS, so information you submit is encrypted in transit."
      ] },
      { h: "Cookies and analytics", p: [
        "The site uses your browser's local storage only to remember your shopping cart. We do not use advertising trackers."
      ] },
      { h: "Your rights", p: [
        `You can ask us to view, correct or delete the personal information we hold about you at any time by writing to ${EMAIL}. We retain order records only as long as needed for legal, tax and warranty purposes.`
      ] },
      { h: "Contact", p: [`For any privacy-related questions, contact us at ${EMAIL}.`] }
    ]
  },
  terms: {
    title: "Terms of Service",
    sections: [
      { h: "About these terms", p: [`This website is operated by ${COMPANY}, ${CITY}. By using this website or placing an order, you agree to these terms, effective ${EFFECTIVE}.`] },
      { h: "Products and pricing", p: [
        "We sell consumer products under our own brands, including SMOD laundry care. All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. Product images are representative; minor variations in packaging may occur.",
        "We take care to keep product information and pricing accurate. If a pricing error affects your order, we will contact you before dispatch and offer a correction or a full refund."
      ] },
      { h: "Orders and payment", p: [
        "An order is confirmed once your payment is successfully processed by Razorpay, our payment gateway, and you receive an order reference. We reserve the right to refuse or cancel an order (with a full refund) in cases of suspected fraud, pricing errors or stock unavailability.",
        "We never see or store your card or banking details — payment is handled entirely on Razorpay's secure systems."
      ] },
      { h: "Delivery", p: [
        "We ship across India through our logistics partners. Estimated timelines are described in our Shipping Policy. Ownership of products passes to you on delivery."
      ] },
      { h: "Use of the website", p: [
        "You agree not to misuse this website, attempt to gain unauthorised access to it, or use it for any unlawful purpose. All content on this site, including brand names, logos and product descriptions, belongs to us and may not be reproduced without permission."
      ] },
      { h: "Liability", p: [
        "Our liability for any claim arising from an order is limited to the amount you paid for that order. Nothing in these terms limits rights you have under applicable Indian consumer protection law."
      ] },
      { h: "Governing law", p: [`These terms are governed by the laws of India, and courts at ${CITY.split(",")[0]} shall have jurisdiction.`] },
      { h: "Contact", p: [`Questions about these terms: ${EMAIL}.`] }
    ]
  },
  refunds: {
    title: "Refund & Cancellation Policy",
    sections: [
      { h: "Cancellations", p: [
        `You can cancel an order any time before it is dispatched by writing to ${EMAIL} with your order reference. Cancelled orders are refunded in full to the original payment method.`
      ] },
      { h: "Damaged, defective or wrong items", p: [
        "If your order arrives damaged, defective, or different from what you ordered, contact us within 7 days of delivery with your order reference and photos of the product and packaging. We will arrange a replacement or a full refund, including shipping, at no cost to you."
      ] },
      { h: "Returns", p: [
        "As our products are household and personal care consumables, opened or used products cannot be returned for hygiene and safety reasons, unless they are defective. Unopened products in original packaging may be returned within 7 days of delivery; return shipping for non-defective returns is borne by the customer."
      ] },
      { h: "Refund timelines", p: [
        "Approved refunds are initiated within 2 business days and are credited to your original payment method by Razorpay, typically within 5–7 business days depending on your bank."
      ] },
      { h: "Contact", p: [`For any refund or cancellation request, write to ${EMAIL} with your order reference.`] }
    ]
  },
  shipping: {
    title: "Shipping Policy",
    sections: [
      { h: "Where we ship", p: ["We currently ship across India. Shipping is free on all orders."] },
      { h: "Timelines", p: [
        "Orders are dispatched from our warehouse in Coimbatore, Tamil Nadu within 1–2 business days of payment confirmation. Delivery typically takes 3–7 business days depending on your location; remote PIN codes may take longer.",
      ] },
      { h: "Tracking", p: [
        "Once your order is dispatched through our courier partners, tracking details are shared on your registered email or phone number."
      ] },
      { h: "Delays and issues", p: [
        `If your order hasn't arrived within the expected window, write to ${EMAIL} with your order reference and we'll chase it down for you.`
      ] }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const p = POLICIES[params.slug];
  return { title: p ? p.title + " | VYAM" : "Policies | VYAM" };
}

export default function PolicyPage({ params }) {
  const policy = POLICIES[params.slug];
  if (!policy) notFound();
  return (
    <section>
      <div className="container" style={{ maxWidth: 780 }}>
        <div className="eyebrow">VYAM — {COMPANY}</div>
        <h1 className="h2" style={{ marginBottom: 10 }}>{policy.title}</h1>
        <p className="small-muted" style={{ marginBottom: 40 }}>Effective {EFFECTIVE}</p>
        {policy.sections.map((s) => (
          <div key={s.h} style={{ marginBottom: 34 }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 12, letterSpacing: "-.01em" }}>{s.h}</h2>
            {s.p.map((para, i) => (
              <p key={i} className="lead" style={{ fontSize: "1rem", marginBottom: 12, maxWidth: "none" }}>{para}</p>
            ))}
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--hair)", paddingTop: 26, marginTop: 20 }}>
          <p className="small-muted">
            {COMPANY} · {CITY} · {EMAIL}
          </p>
          <div style={{ marginTop: 16, display: "flex", gap: 22, flexWrap: "wrap" }}>
            <Link className="textlink" href="/policies/privacy">Privacy</Link>
            <Link className="textlink" href="/policies/terms">Terms</Link>
            <Link className="textlink" href="/policies/refunds">Refunds</Link>
            <Link className="textlink" href="/policies/shipping">Shipping</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
