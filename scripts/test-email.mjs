import fs from "node:fs/promises";
import path from "node:path";
import { mailer } from "../lib/email.js";
import { buildOrderConfirmation } from "../lib/email/templates/orderConfirmation.js";

let t;

async function main() {
  t = mailer();

  console.log("Verifying SMTP connection...");
  await t.verify();
  console.log("SMTP looks good.");

  const to = process.env.TEST_TO || process.env.SMTP_USER;
  const from = process.env.FROM_EMAIL || process.env.SMTP_USER;

  const sample = {
    order: {
      public_id: "WB-10027",
      customer_name: "Test Customer",
      customer_email: to,
      currency: process.env.DEFAULT_CURRENCY || "USD",
      total_cents: 4200,
      created_at: new Date().toISOString(),
    },
    items: [
      { title: "Sample eBook", format: "PDF", price_cents: 2000 },
      { title: "Coaching Session", format: "Service", price_cents: 2200 },
    ],
    downloads: [{ label: "Sample eBook PDF", download_token: "test-token-123" }],
  };

  const brand = {
    name: process.env.BRAND_NAME || "",
    logoUrl: process.env.BRAND_LOGO_URL || "",
    supportEmail: process.env.SUPPORT_EMAIL || from,
    website: process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "",
    address: process.env.BRAND_ADDRESS || "",
  };

  const { subject, html, text } = buildOrderConfirmation({ ...sample, brand });

  const outDir = path.join(process.cwd(), "tmp");
  await fs.mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, "order-preview.html");
  await fs.writeFile(outPath, html, "utf8");
  console.log(`Preview written: ${outPath}`);

  if (!to) {
    console.log("No TEST_TO or SMTP_USER set. Skipping send.");
    return;
  }
  if (from && to && to.toLowerCase() === from.toLowerCase()) {
    console.log(`Refusing to send to the same address as FROM (${from}). Set TEST_TO to a different mailbox.`);
    return;
  }

  const info = await t.sendMail({ to, from, subject, html, text });
  console.log("Sent message id:", info.messageId);
}

main()
  .catch(err => {
    console.error("Test failed:");
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      if (t && typeof t.close === "function") await t.close();
    } catch { }
    process.exit();
  });
