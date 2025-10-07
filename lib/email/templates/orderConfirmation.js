
const COLORS = {
  primary: "#ffbe00",
  primary50: "#fffeea",
  primary100: "#fffbc5",
  primary200: "#fff785",
  primary300: "#ffed46",
  primary400: "#ffde1b",
  primary500: "#ffbe00",
  primary600: "#e29200",
  primary700: "#bb6802",
  primary800: "#985008",
  primary900: "#7c410b",
  primary950: "#482100",
  secondary: "#363636",
  secondary50: "#f6f6f6",
  secondary100: "#e7e7e7",
  secondary200: "#d1d1d1",
  secondary300: "#b0b0b0",
  secondary400: "#888888",
  secondary500: "#6d6d6d",
  secondary600: "#5d5d5d",
  secondary700: "#4f4f4f",
  secondary800: "#454545",
  secondary900: "#363636",
  secondary950: "#262626",
  text: "#111827",       // neutral-900
  textDim: "#6b7280",    // neutral-500/600
  border: "#e5e7eb",     // neutral-200
  bg: "#f5f6f8"          // subtle grey
};

const escapeHtml = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const fmtMoney = (cents = 0, currency = "USD", locale = "en-US") =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format((cents || 0) / 100);

export function buildOrderConfirmation({ order, items = [], downloads = [], brand = {} }) {
  const {
    name: brandName = process.env.BRAND_NAME || "",
    logoUrl = process.env.BRAND_LOGO_URL || "",
    supportEmail = process.env.SUPPORT_EMAIL || process.env.FROM_EMAIL || process.env.SMTP_USER || "",
    website = process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "",
    address = process.env.BRAND_ADDRESS || "",
  } = brand;

  const customerName = order?.customer_name || "";
  const currency = order?.currency || process.env.DEFAULT_CURRENCY || "USD";
  const total = fmtMoney(order?.total_cents, currency);
  const orderId = order?.public_id || "";
  const createdAt = order?.created_at ? new Date(order.created_at).toLocaleString() : "";
  const appUrl = process.env.APP_URL || website || "";

  const itemRows = items.map((i, idx) => `
    <tr style="${idx % 2 ? `background:${COLORS.secondary50};` : ""}">
      <td style="padding:12px 12px; font:14px/20px ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto; color:${COLORS.text};">
        <div style="font-weight:600;">${escapeHtml(i.title || "")}</div>
        ${i.format ? `<div style="color:${COLORS.textDim};">${escapeHtml(i.format)}</div>` : ""}
      </td>
      <td style="padding:12px 12px; text-align:right; font:14px/20px ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto; color:${COLORS.text}; white-space:nowrap;">
        ${i.price_cents != null ? fmtMoney(i.price_cents, currency) : ""}
      </td>
    </tr>
  `).join("");

  const downloadBlocks = downloads.map(d => {
    const token = d?.download_token || "";
    const label = d?.label || "file";
    const url = token ? `${appUrl}/api/downloads/${token}` : "#";
    return `
      <tr>
        <td style="padding:10px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="border-radius:10px; background:${COLORS.primary600}; padding:12px 18px;">
                <a href="${url}" target="_blank" style="font:600 14px ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto; color:#000; text-decoration:none; display:inline-block;">
                  ⬇ Download ${escapeHtml(label)}
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  }).join("");

  const subject = `Your order #${orderId} is confirmed`;
  const previewText = `Order ${orderId} confirmed. Total ${total}.${downloads.length ? " Your downloads are ready." : ""}`;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${escapeHtml(subject)}</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { -ms-interpolation-mode:bicubic; border:0; outline:0; text-decoration:none; max-width:100%; }
    table { border-collapse:collapse !important; }
    body { margin:0; padding:0; width:100% !important; background:${COLORS.bg}; }

    @media (prefers-color-scheme: dark) {
      body, .bg { background:#0b1118 !important; }
      .card { background:#0f172a !important; }
      .text { color:#e5e7eb !important; }
      .muted { color:#9ca3af !important; }
      .rule { border-color:#1f2937 !important; }
      .pill { background:${COLORS.primary900} !important; color:#000 !important; }
      .cta { background:${COLORS.primary700} !important; color:#000 !important; }
      .dlbtn { background:${COLORS.primary800} !important; color:#000 !important; }
    }

    @media screen and (max-width:600px) {
      .container { width:100% !important; padding:0 16px !important; }
      .p-24 { padding:16px !important; }
      .p-28 { padding:18px !important; }
      .p-32 { padding:20px !important; }
      .h1 { font-size:22px !important; }
      .brand { font-size:16px !important; }
    }
  </style>
</head>
<body>
  <!-- hidden preview text -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${escapeHtml(previewText)}</div>

  <table role="presentation" width="100%" class="bg" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:0;">
        <table role="presentation" width="600" class="container" cellpadding="0" cellspacing="0" style="width:600px; max-width:100%;">

          <!-- Top brand bar -->
          <tr>
            <td style="height:6px; background:${COLORS.primary500}; border-radius:0 0 8px 8px;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td class="p-24" style="padding:20px 24px 12px; text-align:center;">
              ${logoUrl
      ? `<a href="${website || "#"}" target="_blank" style="text-decoration:none;">
                     <img src="${logoUrl}" alt="${escapeHtml(brandName || "Logo")}" width="160" style="display:inline-block;" />
                   </a>`
      : (brandName
        ? `<div class="brand" style="font:700 18px/1 ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto; color:${COLORS.secondary900};">
                         ${escapeHtml(brandName)}
                       </div>`
        : ``)
    }
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td class="card p-32" style="background:#ffffff; border-radius:14px; padding:28px; box-shadow:0 10px 30px rgba(0,0,0,0.06);">
              <!-- Status pill -->
              <div class="pill" style="display:inline-block; background:${COLORS.primary100}; color:${COLORS.secondary900}; border:1px solid ${COLORS.primary300}; font:700 12px/1 ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto; padding:8px 12px; border-radius:999px; letter-spacing:.3px;">
                ORDER CONFIRMED
              </div>

              <!-- Title -->
              <div class="text h1" style="margin-top:12px; font:700 24px/1.35 ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto; color:${COLORS.text};">
                ${customerName ? `Thanks, ${escapeHtml(customerName)}.` : "Thanks."} We’ve got your order.
              </div>
              <div class="muted" style="margin-top:6px; color:${COLORS.textDim}; font:14px/1.5 ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto;">
                ${orderId ? `Order #${escapeHtml(orderId)}` : ""}${createdAt ? ` • ${escapeHtml(createdAt)}` : ""}
              </div>

              <!-- Summary -->
              <table role="presentation" width="100%" style="margin-top:20px;">
                <tr><td class="rule" style="border-top:1px solid ${COLORS.border}; height:1px;"></td></tr>
              </table>

              <table role="presentation" width="100%" style="margin-top:4px;">
                ${itemRows || `<tr><td style="padding:12px; color:${COLORS.textDim}; font:14px ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto;">No items listed.</td></tr>`}
                <tr><td class="rule" colspan="2" style="border-top:1px solid ${COLORS.border}; height:1px; padding-top:8px;"></td></tr>
                <tr>
                  <td style="padding-top:10px; font:700 15px ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto; color:${COLORS.text};">Total</td>
                  <td style="padding-top:10px; font:700 15px ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto; color:${COLORS.text}; text-align:right;">${total}</td>
                </tr>
              </table>

              <!-- CTA -->
              ${(appUrl && orderId) ? `
                <div style="margin-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="cta" style="border-radius:12px; background:${COLORS.primary500}; padding:14px 18px; box-shadow:0 6px 18px rgba(255,190,0,0.35);">
                        <a href="${appUrl}/orders/${encodeURIComponent(orderId)}" target="_blank" style="font:700 14px ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto; text-decoration:none; color:#000; display:inline-block;">
                          View order
                        </a>
                      </td>
                    </tr>
                  </table>
                </div>` : ""}

              <!-- Downloads -->
              ${downloads.length ? `
              <div class="text" style="margin-top:24px; font:600 16px ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto; color:${COLORS.text};">
                Your downloads
              </div>
              <table role="presentation" width="100%" style="margin-top:10px;">
                ${downloadBlocks}
              </table>` : ""}

              <!-- Help -->
              ${supportEmail ? `
              <div class="muted" style="margin-top:18px; font:14px ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto; color:${COLORS.textDim};">
                Need help? <a href="mailto:${supportEmail}" style="color:${COLORS.secondary900}; text-decoration:underline;">${supportEmail}</a>
              </div>` : ""}

            </td>
          </tr>

          <!-- Footer -->
          ${(website || address) ? `
          <tr>
            <td style="padding:18px 24px 28px; text-align:center; color:${COLORS.secondary500}; font:12px ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto;">
              ${website ? `<a href="${website}" target="_blank" style="color:${COLORS.secondary700}; text-decoration:none;">${escapeHtml(website)}</a><br/>` : ""}
              ${escapeHtml(address)}
            </td>
          </tr>` : ""}

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `${brandName ? `${brandName} — ` : ""}Order ${orderId} confirmed`,
    "",
    `${customerName ? `Hi ${customerName},` : "Hi,"}`,
    `Your order #${orderId} is confirmed.`,
    "",
    "Items:",
    ...items.map(i =>
      `• ${i.title || ""}${i.format ? ` — ${i.format}` : ""}${i.price_cents != null ? ` — ${fmtMoney(i.price_cents, currency)}` : ""}`
    ),
    "",
    `Total: ${total}`,
    ...(downloads.length ? ["", ...downloads.map(d => `Download ${d.label || "file"}: ${appUrl}/api/downloads/${d.download_token}`)] : []),
    "",
    supportEmail ? `Need help? ${supportEmail}` : "",
    (appUrl && orderId) ? `View order: ${appUrl}/download/${orderId}` : "",
  ].filter(Boolean).join("\n");

  return { subject, html, text, previewText };
}
