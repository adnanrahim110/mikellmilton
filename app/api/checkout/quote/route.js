export const runtime = "nodejs";
import { signDraft } from "@/lib/draft";
import { getServerQuote } from "@/lib/quote";

export async function POST(req) {
  try {
    const { items = [], coupon } = await req.json();
    const quote = await getServerQuote({ items, coupon });
    const draftId = signDraft({
      kind: "checkout-quote",
      items, coupon: coupon || null,
      shippingOption: quote.shipping_option,
      subtotal: quote.subtotal_cents, discount: quote.discount_cents,
      shipping: quote.shipping_cents, tax: quote.tax_cents,
      total: quote.total_cents, currency: quote.currency, ts: Date.now()
    });
    return new Response(JSON.stringify({ draftId, ...quote }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
}
