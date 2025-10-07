import nodemailer from "nodemailer";
import { buildOrderConfirmation } from "./email/templates/orderConfirmation";

let _transporter;
export function mailer() {
  if (_transporter) return _transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    String(process.env.SMTP_SECURE || "").toLowerCase() === "true" ||
    port === 465;

  _transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return _transporter;
}

function resolveRecipient(order, hint) {
  const candidates = [
    hint,
    order?.email,
    order?.customer_email,
    order?.payer_email,
    order?.contact_email,
  ]
    .map(v => (v || "").trim())
    .filter(Boolean);

  return candidates[0] || null;
}

function toText(html) {
  try {
    return html
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
      .replace(/<\/(p|div|br|li|h[1-6])>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+\n/g, "\n")
      .replace(/\n\s+/g, "\n")
      .replace(/[ \t]+/g, " ")
      .trim();
  } catch {
    return "";
  }
}

export async function sendOrderEmails({ order, items = [], downloads = [], recipient }) {
  const to = resolveRecipient(order, recipient);
  if (!to) {
    const err = new Error("No recipients defined");
    err.code = "EENVELOPE";
    throw err;
  }

  const t = mailer();

  const built = buildOrderConfirmation
    ? buildOrderConfirmation({ order, items, downloads })
    : null;

  let subject =
    (built && built.subject) ||
    `Your order ${order?.public_id ? `#${order.public_id}` : "confirmation"}`;
  let html = (built && built.html) || "<p>Thank you for your order.</p>";
  let text = (built && built.text) || toText(html);

  const from =
    process.env.SMTP_FROM ||
    process.env.EMAIL_FROM ||
    `"${process.env.SITE_NAME || "Store"}" <no-reply@${(process.env.SITE_DOMAIN || "example.com")}>`;

  await t.sendMail({
    from,
    to,
    subject,
    html,
    text,
  });
}
