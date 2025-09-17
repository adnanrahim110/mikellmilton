export const runtime = "nodejs";
import { getServerQuote } from "@/lib/quote";

export async function POST(req) {
  try {
    const { items, coupon } = await req.json();
    const quote = await getServerQuote({ items, coupon });
    return new Response(JSON.stringify(quote), { status: 200 });
  } catch (e) {
    console.error("POST /api/checkout/quote error", e);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
