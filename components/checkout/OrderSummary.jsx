"use client";
import Button from "@/components/ui/Button";
import { selectCartItems } from "@/lib/cartSlice";
import { LoaderCircle, ShieldCheck } from "lucide-react";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { cap, money } from "./helpers";
import SectionCard from "./SectionCard";

export default function OrderSummary({
  items,
  subtotal,
  discount,
  shippingCost,
  tax,
  total,
  requiresShipping,
  promo,
  setPromo,
  applied,
  applyPromo,
  placeOrder,
  processing,
  disablePlaceOrder = false,
}) {
  const cartItems = useSelector(selectCartItems);

  const normalizedItems = useMemo(() => {
    const src = Array.isArray(items) ? items : cartItems || [];
    return src.map((it) => {
      const qty = Math.max(1, it.quantity ?? it.qty ?? 1);
      const img = it.image ?? it.img ?? "/imgs/book_cover.png";
      const mode = it.mode ?? it.__resolvedMode ?? "digital";
      return { ...it, qty, img, mode };
    });
  }, [items, cartItems]);

  const requiresShippingEffective = useMemo(() => {
    if (typeof requiresShipping === "boolean") return requiresShipping;
    return normalizedItems.some(
      (it) => String(it.mode).toLowerCase() !== "digital"
    );
  }, [requiresShipping, normalizedItems]);

  return (
    <div className="relative space-y-6 h-full">
      <SectionCard className="max-h-full lg:max-h-full">
        <h4 className="text-sm font-semibold text-secondary-900 mb-3">
          Order summary
        </h4>

        <div className="space-y-3 mb-4">
          {normalizedItems.map((it) => (
            <div key={it.id} className="flex items-center gap-3">
              <div className="h-14 p-1 overflow-hidden rounded-sm bg-white/70 ring-1 ring-black/5">
                <img
                  src={it.img}
                  alt={it.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-secondary-900 line-clamp-1">
                  {it.title}
                </div>
                <div className="text-xs text-secondary-600">
                  {cap(it.mode)} · Qty {it.qty}
                </div>
              </div>
              <div className="ml-auto text-sm font-bold text-secondary-900">
                {money((Number(it.price) || 0) * it.qty)}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between py-1">
            <div className="text-sm text-secondary-700">Subtotal</div>
            <div className="text-sm text-secondary-900">{money(subtotal)}</div>
          </div>
          {discount > 0 && (
            <div className="flex items-center justify-between py-1">
              <div className="text-sm text-secondary-700">Discount</div>
              <div className="text-sm text-secondary-900">
                - {money(discount)}
              </div>
            </div>
          )}
          {requiresShippingEffective ? (
            <div className="flex items-center justify-between py-1">
              <div className="text-sm text-secondary-700">Shipping</div>
              <div className="text-sm text-secondary-900">
                {shippingCost === 0 ? "Free" : money(shippingCost)}
              </div>
            </div>
          ) : null}
          <div className="flex items-center justify-between py-1">
            <div className="text-sm text-secondary-700"> tax</div>
            <div className="text-sm text-secondary-900">{money(tax)}</div>
          </div>
          <div className="my-2 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          <div className="flex items-center justify-between py-1">
            <div className="text-sm font-extrabold text-secondary-900">
              Total
            </div>
            <div className="text-sm font-extrabold text-secondary-900">
              {money(total)}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-2">
          <div className="flex items-stretch gap-2">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder={applied ? `Applied: ${applied}` : "Promo code"}
              disabled={!!applied}
              className="flex-1 rounded-xl border border-white/60 bg-white/85 px-3 py-3 text-sm text-secondary-900 placeholder:text-secondary-400 shadow-inner focus:outline-none focus:ring-4 focus:ring-primary/25 disabled:opacity-70"
            />
            <button
              onClick={applyPromo}
              disabled={!String(promo || "").trim() || !!applied}
              className="inline-flex items-center gap-2 rounded-xl bg-primary text-secondary-950 px-4 py-3 text-sm font-semibold shadow disabled:opacity-50"
            >
              Apply
            </button>
          </div>

          <Button
            tone="dark"
            className="w-full rounded-xl flex items-center justify-center"
            onClick={placeOrder}
            disabled={processing || disablePlaceOrder}
          >
            {processing ? (
              <>
                <LoaderCircle className="animate-spin" /> Processing order
              </>
            ) : disablePlaceOrder ? (
              "Use Paypal to place order"
            ) : (
              "Place order"
            )}
          </Button>
          <Button href="/cart" className="w-full rounded-xl" tone="white">
            <span className="mr-1">←</span> Back to cart
          </Button>
          <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-secondary-600">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Secure 256 bit encryption
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
