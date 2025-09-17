const PP_BASE = process.env.PAYPAL_ENV === "live"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

async function getToken() {
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;
  if (!id || !secret) throw new Error("PayPal creds missing");
  const res = await fetch(`${PP_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("PayPal auth failed");
  const j = await res.json();
  return j.access_token;
}

export async function paypalCreateOrder({ total_cents, currency }) {
  const access = await getToken();
  const res = await fetch(`${PP_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${access}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{ amount: { currency_code: currency, value: (total_cents / 100).toFixed(2) } }],
    }),
  });
  if (!res.ok) throw new Error("PayPal create failed");
  return res.json(); // includes id
}

export async function paypalCaptureOrder(orderId) {
  const access = await getToken();
  const res = await fetch(`${PP_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: { Authorization: `Bearer ${access}`, "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("PayPal capture failed");
  return res.json();
}
