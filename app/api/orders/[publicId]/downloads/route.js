// app/api/orders/[publicId]/downloads/route.js
import { getPool } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(_req, ctx) {
  const { publicId } = await ctx.params;

  if (!publicId) {
    return NextResponse.json({ error: "Missing publicId" }, { status: 400 });
  }

  try {
    const pool = getPool();

    // Try full orders first
    const [o] = await pool.query(
      "SELECT * FROM orders WHERE public_id=? LIMIT 1",
      [publicId]
    );
    const order = o?.[0];

    if (order) {
      const [dl] = await pool.query(
        "SELECT download_token, format, expires_at, download_count, max_downloads FROM downloads WHERE order_id=?",
        [order.id]
      );
      const emailStatus = {
        sent: !!order.email_sent,
        error: !!order.email_error,
        message: order.email_error_message || null,
      };
      return NextResponse.json({ downloads: dl, emailStatus });
    }

    // Fallback to checkout_orders
    const [coRows] = await pool.query(
      "SELECT * FROM checkout_orders WHERE paypal_order_id=? LIMIT 1",
      [publicId]
    );
    const co = coRows?.[0];
    if (co) {
      const emailStatus = {
        sent: !!co.email_sent,
        error: !!co.email_error,
        message: co.email_error_message || null,
      };
      return NextResponse.json({ downloads: [], emailStatus });
    }

    return NextResponse.json({ downloads: [], emailStatus: null }, { status: 404 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch downloads", details: String(err?.message || err) },
      { status: 500 }
    );
  }
}

