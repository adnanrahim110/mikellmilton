import nodemailer from "nodemailer";

let transporter;
export function mailer() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST) throw new Error("SMTP not configured");
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: String(SMTP_SECURE || "false") === "true",
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
  return transporter;
}

export async function sendOrderEmails({ order, items, downloads }) {
  const t = mailer();
  const from = process.env.FROM_EMAIL || "no-reply@localhost";
  const admin = process.env.ADMIN_EMAIL;

  const lines = items.map(i => `• ${i.title} — ${i.format}`).join("\n");
  const links = downloads?.length
    ? downloads.map(d => `${process.env.APP_URL}/api/downloads/${d.download_token}`).join("\n")
    : "";

  const html = `
    <p>Hi ${order.customer_name || ""},</p>
    <p>Your order <b>#${order.public_id}</b> is confirmed.</p>
    <pre>${lines}</pre>
    ${links ? `<p>Downloads:</p><pre>${links}</pre>` : ""}
  `;

  await t.sendMail({
    to: order.customer_email,
    from,
    subject: `Your order #${order.public_id}`,
    html,
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
