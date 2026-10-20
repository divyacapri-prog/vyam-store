// Shiprocket integration. Skips silently until SHIPROCKET_EMAIL / SHIPROCKET_PASSWORD
// (API-user credentials) are set in Vercel env vars.

let cached = { token: null, at: 0 };

export async function srToken() {
  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;
  if (!email || !password) return null;
  if (cached.token && Date.now() - cached.at < 8 * 3600 * 1000) return cached.token;
  const r = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!r.ok) return null;
  const d = await r.json();
  if (!d || !d.token) return null;
  cached = { token: d.token, at: Date.now() };
  return d.token;
}

// Approximate pack weights (kg) by variant label.
function itemWeight(variant) {
  return variant && variant.startsWith("40") ? 0.85 : 0.45;
}

export async function srCreateOrder(order) {
  const token = await srToken();
  if (!token) return { skipped: true };

  const c = order.customer || {};
  const parts = String(c.name || "Customer").trim().split(/\s+/);
  const first = parts.shift() || "Customer";
  const last = parts.join(" ");

  const now = new Date();
  const orderDate =
    now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    String(now.getDate()).padStart(2, "0") + " " +
    String(now.getHours()).padStart(2, "0") + ":" +
    String(now.getMinutes()).padStart(2, "0");

  const payload = {
    order_id: order.ref,
    order_date: orderDate,
    pickup_location: process.env.SHIPROCKET_PICKUP || "Primary",
    billing_customer_name: first,
    billing_last_name: last,
    billing_address: c.address || "",
    billing_city: c.city || "",
    billing_pincode: c.pincode || "",
    billing_state: c.state || "",
    billing_country: "India",
    billing_email: c.email || "",
    billing_phone: c.phone || "",
    shipping_is_billing: true,
    order_items: (order.items || []).map((it) => ({
      name: it.name + " (" + it.variant + ")",
      sku: it.slug + "-" + String(it.variant).replace(/\s+/g, ""),
      units: it.qty,
      selling_price: it.price
    })),
    payment_method: "Prepaid",
    sub_total: order.amount,
    length: 22,
    breadth: 16,
    height: 8,
    weight: Math.max(
      0.3,
      (order.items || []).reduce((s, it) => s + itemWeight(it.variant) * it.qty, 0)
    )
  };

  try {
    const r = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
      body: JSON.stringify(payload)
    });
    const d = await r.json().catch(() => null);
    return { ok: r.ok, data: d };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
