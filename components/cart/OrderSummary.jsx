"use client";

import Button from "@/components/ui/Button";
import React from "react";
import SummaryRow from "./SummaryRow";

const money = (n) => `$${Number(n || 0).toFixed(2)}`;

export default function OrderSummary({
  subtotal,
  discount,
  shipping,
  tax,
  total,
}) {
  return (
    <div className="bg-gradient-to-r from-primary/30 via-amber-500/20 to-primary/30 p-[1.5px] rounded-[22px]">
      <div className="rounded-[20px] bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-xl p-5">
        <h4 className="text-sm font-semibold text-secondary-900 mb-3">
          Order summary
        </h4>
        <div className="space-y-1">
          <SummaryRow label="Subtotal" value={money(subtotal)} />
          <SummaryRow label="Discount" value={`- ${money(discount)}`} />
          <SummaryRow
            label="Shipping"
            value={shipping === 0 ? "Free" : money(shipping)}
          />
          <SummaryRow label="Estimated tax" value={money(tax)} />
          <div className="my-2 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          <SummaryRow label="Total" value={money(total)} strong />
        </div>

        <div className="mt-4 space-y-2">
          <Button href="/checkout" tone="dark" className="w-full rounded-xl">
            Proceed to checkout
          </Button>
          <Button href="/shop" className="w-full rounded-xl" tone="white">
            Continue shopping
          </Button>
        </div>

        <div className="mt-3 text-[11px] text-secondary-600">
          Taxes and shipping are estimates. Final amounts shown at checkout.
        </div>
      </div>
    </div>
  );
}
