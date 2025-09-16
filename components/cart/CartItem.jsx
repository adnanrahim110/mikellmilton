"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

const money = (n) => `$${Number(n || 0).toFixed(2)}`;

export default function CartItem({ item, onQty, onRemove }) {
  const img = item.image ?? item.img ?? "/imgs/book_cover.png";
  const qty = Math.max(1, item.quantity ?? item.qty ?? 1);

  const dec = () => onQty(item.id, Math.max(1, qty - 1));
  const inc = () => onQty(item.id, qty + 1);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-[100px_1fr_auto] gap-4 items-center"
    >
      <div className="overflow-hidden bg-white/70 ring-1 ring-black/5">
        <img
          src={img}
          alt={item.title}
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-secondary-900">
              {item.title}
            </h3>
            <div className="text-xs text-secondary-600">
              {item.sku ? <>SKU {item.sku} · </> : null}
              {item.type || "Book"}
            </div>
          </div>
          <button
            onClick={() => onRemove(item.id, item.title)}
            className="shrink-0 inline-flex items-center justify-center size-8 rounded-lg bg-black/5 text-secondary-700 hover:text-red-500 cursor-pointer btn hover:bg-black/10 transition"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="inline-flex items-center rounded-xl border border-white/60 bg-white/80 shadow-inner">
            <button
              onClick={dec}
              className={`px-2 py-2 text-secondary-900 hover:text-primary transition btn ${
                qty <= 1
                  ? "opacity-40 cursor-not-allowed hover:text-secondary-900"
                  : ""
              }`}
              aria-label="Decrease quantity"
              disabled={qty <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) =>
                onQty(item.id, Math.max(1, Number(e.target.value) || 1))
              }
              className="w-12 text-center bg-transparent text-sm text-secondary-900 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              onClick={inc}
              className="px-2 py-2 text-secondary-900 hover:text-primary transition btn"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="text-base font-bold text-secondary-900">
            {money((item.price || 0) * qty)}
          </div>
        </div>
      </div>

      <div className="hidden sm:block text-right font-semibold text-secondary-900">
        {money(item.price)}
        <div className="text-xs font-normal text-secondary-600">each</div>
      </div>
    </motion.div>
  );
}
