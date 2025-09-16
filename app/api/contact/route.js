export const runtime = "nodejs";
import { getPool } from "@/lib/db";
import { mailer } from "@/lib/email";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name = "", email = "", phone = "", message = "" } = body || {};
    if (!email || !message) throw new Error("Missing fields");

    await mailer().sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `[CONTACT] ${name || "Website"} <${email}>`,
      html: `<p><strong>Name:</strong> ${name}<br/><strong>Email:</strong> ${email}<br/><strong>Phone:</strong> ${phone || "-"}</p><p>${String(message).replace(/\n/g, "<br/>")}</p>`
    });

    await getPool().query(
      `INSERT INTO form_submissions (form_slug, email, name, payload) VALUES ('contact', ?, ?, ?)`,
      [email, name || null, JSON.stringify(body)]
    );

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
}
