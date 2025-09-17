export const runtime = "nodejs";
import { signDraft } from "@/lib/draft";

export async function POST(req) {
  try {
    const { items, coupon } = await req.json();
    if (!Array.isArray(items) || !items.length) throw new Error("No items");
    const payload = {
      items,
      coupon: coupon || null,
      iat: Date.now(),
      exp: Date.now() + 30 * 60 * 1000, // 30 min
    };
    const draftId = signDraft(payload);
    return new Response(JSON.stringify({ draftId }), { status: 200 });
  } catch (e) {
    console.error("POST /api/checkout/quote/sign error", e);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
