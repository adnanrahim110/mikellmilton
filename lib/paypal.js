const PP_BASE = process.env.PAYPAL_ENV === "live"
  ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

async function token() {
  const res = await fetch(`${PP_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(
        process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_SECRET
      ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("PayPal auth failed");
  return (await res.json()).access_token;
}

export async function paypalCreateOrder({ total, currency }) {
  const t = await token();
  const res = await fetch(`${PP_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{ amount: { currency_code: currency, value: (total / 100).toFixed(2) } }],
      application_context: {
        user_action: "PAY_NOW",
        return_url: process.env.APP_URL + "/checkout",
        cancel_url: process.env.APP_URL + "/checkout",
        shipping_preference: "NO_SHIPPING"
      }
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data; // {id, links}
}

export async function paypalCaptureOrder(orderId) {
  const t = await token();
  const res = await fetch(`${PP_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: { Authorization: `Bearer ${t}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

export async function paypalVerifyWebhook(headers, body) {
  const t = await token();
  const verification = {
    auth_algo: headers.get("paypal-auth-algo"),
    cert_url: headers.get("paypal-cert-url"),
    transmission_id: headers.get("paypal-transmission-id"),
    transmission_sig: headers.get("paypal-transmission-sig"),
    transmission_time: headers.get("paypal-transmission-time"),
    webhook_id: process.env.PAYPAL_WEBHOOK_ID,
    webhook_event: body,
  };
  const res = await fetch(`${PP_BASE}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
    body: JSON.stringify(verification)
  });
  const data = await res.json();
  return data.verification_status === "SUCCESS";
}
