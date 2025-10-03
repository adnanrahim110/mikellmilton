import nodemailer from "nodemailer";
import { buildOrderConfirmation } from "./email/templates/orderConfirmation.js";

let transporter;

function normalizeSecureFlag(v) {
  if (v == null) return false;
  const val = String(v).toLowerCase().trim();
  if (val === "true" || val === "ssl") return true;
  if (val === "false") return false;
  if (val === "tls" || val === "starttls") return false;
  return false;
}

export function mailer() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST) throw new Error("SMTP not configured");

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: normalizeSecureFlag(SMTP_SECURE),
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  return transporter;
}

export async function sendOrderEmails({ order, items, downloads }) {
  const t = mailer();
  const from = process.env.FROM_EMAIL || process.env.SMTP_USER || "no-reply@localhost";
  const admin = process.env.ADMIN_EMAIL;

  const brand = {
    name: process.env.BRAND_NAME || "",
    logoUrl: process.env.BRAND_LOGO_URL || "",
    supportEmail: process.env.SUPPORT_EMAIL || from,
    website: process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "",
    address: process.env.BRAND_ADDRESS || "",
  };

  const { subject, html, text, previewText } =
    buildOrderConfirmation({ order, items, downloads, brand });

  await t.sendMail({
    to: order.customer_email,
    from,
    subject: subject || `Your order #${order.public_id}`,
    html,
    text,
    headers: previewText ? { "X-Preheader": previewText } : undefined,
  });

  if (admin) {
    await t.sendMail({
      to: admin,
      from,
      subject: `Paid order #${order.public_id}`,
      text: `Order ${order.public_id} paid: ${(order.total_cents / 100).toFixed(2)} ${order.currency}`,
    });
  }
}
