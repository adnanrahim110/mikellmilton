"use client";

import { Truck } from "lucide-react";
import { AnimatePresence } from "motion/react";
import React from "react";
import CartItem from "./CartItem";

export default function CartList({ items, itemCount, onQty, onRemove }) {
  return (
    <div className="bg-gradient-to-r from-primary/30 via-amber-500/20 to-primary/30 p-[1.5px] rounded-[22px]">
      <div className="rounded-[20px] bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-xl p-5">
        <div className="space-y-2.5">
          <AnimatePresence initial={false}>
            {items.map((item, idx) => (
              <>
                <CartItem
                  key={item.id}
                  item={item}
                  onQty={onQty}
                  onRemove={onRemove}
                />
                {items.length - 1 !== idx && (
                  <div className="my-2 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                )}
              </>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
