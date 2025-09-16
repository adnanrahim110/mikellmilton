"use client";

import { Truck } from "lucide-react";
import { AnimatePresence } from "motion/react";
import React from "react";
import CartItem from "./CartItem";

export default function CartList({ items, itemCount, onQty, onRemove }) {
  return (
    <div className="bg-gradient-to-r from-primary/30 via-amber-500/20 to-primary/30 p-[1.5px] rounded-[22px]">
      <div className="rounded-[20px] bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-secondary-700">
            {itemCount} item{itemCount > 1 ? "s" : ""}
          </div>
          <div className="inline-flex items-center gap-2 text-xs text-secondary-600">
            <Truck className="w-4 h-4" />
            Free shipping over $75
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQty={onQty}
                onRemove={onRemove}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
