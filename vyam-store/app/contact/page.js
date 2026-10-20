"use client";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section>
      <div className="container" style={{ maxWidth: 680 }}>
        <div className="eyebrow">Let's Talk</div>
        <h1 className="display" style={{ marginBottom: 22 }}>Have an opportunity worth exploring?</h1>
        <p className="lead" style={{ marginBottom: 40 }}>
          We're open to conversations with retailers, distributors, manufacturing partners and
          people who see an opportunity worth exploring.
        </p>
        {sent ? (
          <div className="notice">Thank you — we've received your message and will be in touch.</div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="frow2">
              <div className="field"><label>Name</label><input type="text" required /></div>
              <div className="field"><label>Company</label><input type="text" /></div>
            </div>
            <div className="frow2">
              <div className="field"><label>Email</label><input type="email" required /></div>
              <div className="field"><label>Phone</label><input type="tel" /></div>
            </div>
            <div className="field">
              <label>I'm interested in</label>
              <select>
                <option>Retail Partnership</option>
                <option>Distribution</option>
                <option>Manufacturing</option>
                <option>Business Opportunity</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field"><label>Message</label><textarea rows={4} /></div>
            <button className="btn solid" type="submit">Send enquiry →</button>
          </form>
        )}
      </div>
    </section>
  );
}
