export const runtime = "nodejs";
import { computeQuote } from "@/lib/quote";

export async function POST(req) {
  try {
    const { items, coupon } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "No items", code: "NO_ITEMS" }),
        { status: 400 }
      );
    }

    const quote = await computeQuote(items, coupon);
    return new Response(JSON.stringify(quote), { status: 200 });
  } catch (e) {
    console.error("POST /api/checkout/quote error", e);
    return new Response(
      JSON.stringify({ error: e.message || "Server error" }),
      { status: 500 }
    );
  }
}
