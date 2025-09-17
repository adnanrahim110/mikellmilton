"use client";

import {
  clearCart,
  decrement,
  increment,
  removeFromCart,
  selectCartItems,
  selectItemCount,
  selectSubtotal,
  setQuantity,
} from "@/lib/cartSlice";
import { toast } from "@/utils/toast";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import ProgressiveImage from "../ui/ProgressiveImage";

const Sidebar = ({
  openCart,
  setOpenCart,
  currency = "USD",
  onCheckout = () => {},
  onUpdateQty,
  onRemove,
}) => {
  const panelRef = useRef(null);
  const lastFocusRef = useRef(null);
  const router = useRouter();

  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const itemCount = useSelector(selectItemCount);
  const subtotal = useSelector(selectSubtotal);

  const hasItems = items.length > 0;

  const handleCheckout = () => {
    if (!hasItems) return;
    setOpenCart(false);
    try {
      onCheckout?.();
    } catch {}
    router.push("/checkout");
  };

  useEffect(() => {
    if (!openCart) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openCart]);

  useEffect(() => {
    if (!openCart) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpenCart(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openCart, setOpenCart]);

  useEffect(() => {
    if (openCart) {
      lastFocusRef.current = document.activeElement;
      requestAnimationFrame(() => panelRef.current?.focus());
    } else if (lastFocusRef.current instanceof HTMLElement) {
      lastFocusRef.current.focus();
    }
  }, [openCart]);

  const handleRemove = (id, title) => {
    if (onRemove) onRemove(id, title);
    else dispatch(removeFromCart(id));
    toast.success(`Removed "${title}" from cart`);
  };

  const setQty = (id, qty) => {
    const q = Math.max(1, Number(qty) || 1);
    if (onUpdateQty) onUpdateQty(id, q);
    else dispatch(setQuantity({ id, quantity: q }));
  };

  const decQty = (id, current) => {
    const next = Math.max(1, (current || 1) - 1);
    if (onUpdateQty) onUpdateQty(id, next);
    else dispatch(decrement({ id }));
  };

  const incQty = (id) => {
    if (onUpdateQty) onUpdateQty(id, undefined);
    else dispatch(increment({ id }));
  };

  const format = (n) =>
    n.toLocaleString(undefined, { style: "currency", currency });

  return (
    <AnimatePresence>
      {openCart && (
        <motion.div
          key="cart-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-xs"
          onClick={() => setOpenCart(false)}
        >
          <motion.div
            key="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: 360 }}
            animate={{ x: 0 }}
            exit={{ x: 360 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.04}
            onDragEnd={(_, info) => {
              if (info.offset.x > 80 || info.velocity.x > 600)
                setOpenCart(false);
            }}
            ref={panelRef}
            tabIndex={-1}
            className="absolute top-0 right-0 h-dvh w-full max-w-sm bg-white shadow-2xl outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 w-full flex items-center justify-center gap-2 px-4 py-4 bg-white/95 backdrop-blur-xs border-b">
              <ShoppingBag className="text-black" strokeWidth={1} />
              <h2 id="cart-title" className="text-xl font-semibold">
                Your Cart
              </h2>
              <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary-900">
                {itemCount}
              </span>

              <motion.button
                onClick={() => setOpenCart(false)}
                className="group absolute right-3 top-3 inline-flex items-center justify-center rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-red-400/70"
                aria-label="Close cart"
                whileHover={{ scale: 1.06, rotate: 90 }}
                whileTap={{ scale: 0.94 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ boxShadow: "0 0 0 8px rgba(239,68,68,0.12)" }}
                />
                <X className="relative z-10 text-red-500 group-hover:text-red-600 transition-colors" />
              </motion.button>
            </div>

            <div className="h-[calc(100dvh-9.5rem)] overflow-y-auto px-4 py-3">
              {!hasItems ? (
                <div className="h-full grid place-items-center text-center">
                  <div>
                    <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full border border-black/10 bg-primary/5 text-primary">
                      <ShoppingBag />
                    </div>
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <p className="text-sm text-neutral-500">
                      Add something you love and come back.
                    </p>
                  </div>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((it) => {
                    const qty = it.quantity || 1;
                    const atMin = qty <= 1;
                    return (
                      <li
                        key={it.id}
                        className="flex gap-3 rounded-lg border border-black/10 p-3 bg-white/80"
                      >
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-neutral-100 ring-1 ring-black/5">
                          {it.image ? (
                            <ProgressiveImage
                              src={it.image}
                              alt={it.title}
                              width={80}
                              height={80}
                            />
                          ) : (
                            <div className="h-full w-full grid place-items-center text-xs text-neutral-500">
                              No image
                            </div>
                          )}
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="truncate font-medium text-secondary-900">
                              {it.title}
                            </h3>
                            <button
                              onClick={() => handleRemove(it.id, it.title)}
                              className="rounded-full p-1 text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                              aria-label={`Remove ${it.title}`}
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="mt-1 text-sm text-neutral-500">
                            {format(it.price)} each
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <div className="inline-flex items-center rounded-full border border-black/10 bg-white">
                              <button
                                onClick={() => decQty(it.id, qty)}
                                className={`p-1.5 rounded-l-full ${
                                  atMin
                                    ? "opacity-40 cursor-not-allowed"
                                    : "hover:bg-neutral-100"
                                }`}
                                aria-label="Decrease quantity"
                                disabled={atMin}
                              >
                                <Minus size={14} />
                              </button>
                              <input
                                type="number"
                                inputMode="numeric"
                                min={1}
                                value={qty}
                                onChange={(e) => setQty(it.id, e.target.value)}
                                className="w-10 text-center text-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              <button
                                onClick={() => incQty(it.id)}
                                className="p-1.5 rounded-r-full hover:bg-neutral-100"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <div className="text-right font-semibold">
                              {format((it.price || 0) * qty)}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="sticky bottom-0 z-10 border-t bg-white/95 backdrop-blur-xs px-4 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-neutral-600">Subtotal</span>
                <span className="text-lg font-semibold">
                  {format(subtotal)}
                </span>
              </div>

              <div className="flex gap-2">
                {itemCount > 0 ? (
                  <Link
                    href="/cart"
                    className="h-11 flex-1 rounded-lg border border-black/10 bg-white text-sm font-medium grid place-items-center hover:bg-neutral-50 transition"
                    onClick={() => setOpenCart(false)}
                    aria-label="View cart"
                  >
                    View Cart
                  </Link>
                ) : (
                  <Button
                    tone="dark"
                    onClick={() => setOpenCart(false)}
                    className="h-11 flex-1 rounded-lg text-sm"
                  >
                    Continue Shopping
                  </Button>
                )}

                <motion.button
                  onClick={handleCheckout}
                  whileHover={hasItems ? { y: -1, scale: 1.01 } : {}}
                  whileTap={hasItems ? { scale: 0.98 } : {}}
                  aria-disabled={!hasItems}
                  disabled={!hasItems}
                  className={`h-11 flex-1 rounded-lg text-sm font-medium transition-shadow shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] ${
                    hasItems
                      ? "bg-black text-white hover:shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)]"
                      : "bg-neutral-200 text-neutral-500 cursor-not-allowed opacity-70"
                  }`}
                >
                  {hasItems ? `Checkout • ${itemCount}` : "Checkout"}
                </motion.button>
              </div>

              {hasItems && (
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-neutral-500">
                    Taxes and shipping calculated at checkout.
                  </p>
                  <button
                    onClick={() => dispatch(clearCart())}
                    className="text-xs text-red-500 hover:text-red-600"
                    title="Empty cart"
                  >
                    Clear cart
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
