import nodemailer from "nodemailer";

let transporter;
export function mailer() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: String(SMTP_SECURE || "false") === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

export async function sendOrderEmails({ order, items, downloadUrl }) {
  const subject = `Order ${order.public_id} confirmed`;
  const html = `
    <div style="font-family:ui-sans-serif,system-ui">
      <h2>Thank you for your purchase!</h2>
      <p>Order ID: <strong>${order.public_id}</strong></p>
      <ul>
        ${items.map(it => `<li>${it.title_snapshot} (${it.format}) × ${it.quantity}</li>`).join("")}
      </ul>
      <p><strong>Total:</strong> ${(order.total_cents / 100).toFixed(2)} ${order.currency}</p>
      <p>Download your files here: <a href="${downloadUrl}">${downloadUrl}</a></p>
    </div>
  `;
  await mailer().sendMail({
    from: process.env.SMTP_USER,
    to: order.email,
    subject,
    html,
  });
  if (process.env.ADMIN_EMAIL) {
    await mailer().sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `[ADMIN] ${subject}`,
      html,
    });
  }
}
