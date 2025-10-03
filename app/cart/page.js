"use client";

import CartEmpty from "@/components/cart/CartEmpty";
import CartList from "@/components/cart/CartList";
import OrderSummary from "@/components/cart/OrderSummary";
import PromoField from "@/components/cart/PromoField";
import SharedHero from "@/components/ui/SharedHero";
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectItemCount,
  selectSubtotal,
  setQuantity,
} from "@/lib/cartSlice";
import { toast } from "@/utils/toast";
import { ShoppingCart } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const money = (n) => `$${Number(n || 0).toFixed(2)}`;

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const itemCount = useSelector(selectItemCount);
  const subtotal = useSelector(selectSubtotal);

  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState("");

  const discountRate = applied === "DOPE10" ? 0.1 : 0;
  const discount = useMemo(() => subtotal * discountRate, [subtotal, discountRate]);
  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal - discount >= 75 ? 0 : 6.99;
  }, [items.length, subtotal, discount]);
  const tax = useMemo(() => 0, []);
  const total = useMemo(
    () => Math.max(0, subtotal - discount) + shipping + tax,
    [subtotal, discount, shipping, tax]
  );

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (code === "DOPE10") setApplied(code);
    setPromo("");
  };

  const onQty = (id, qty) => dispatch(setQuantity({ id, quantity: qty }));
  const onRemove = (id, title) => {
    dispatch(removeFromCart(id));
    if (title) toast.success(`Removed "${title}" from cart`);
  };
  const onClear = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  return (
    <>
      <SharedHero
        eyebrow="Cart"
        Icon={ShoppingCart}
        title="The Breakthrough You Can Hold"
        description="This is more than a book, it is a call to destiny. The Dope Breakthrough – Divining Our Perfect Eternity brings prophecy, history, and revelation together in a way that speaks to every generation in the Diaspora and beyond. Each copy is a step into clarity, a guide toward sovereignty, and a reminder that eternity has already been written."
        bgImage="/imgs/home-sec3.jpeg"
        secondaryCta={{ label: "Contact", href: "/licensing-inquiry#contactUs" }}
      />

      <section className="relative py-[110px_90px]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-amber-500/15 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px)",
              backgroundSize: "22px 22px, 22px 22px",
            }}
          />
        </div>

        <div className="container">
          {items.length === 0 ? (
            <CartEmpty />
          ) : (
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
              <div className="space-y-5 relative">
                <div className="flex items-center justify-between absolute bottom-full left-0 w-full">
                  <span className="text-sm text-secondary-700">
                    {itemCount} item{itemCount > 1 ? "s" : ""}
                  </span>
                  <button
                    onClick={onClear}
                    className="text-sm text-red-400 hover:text-red-600 font-medium transition"
                  >
                    Clear cart
                  </button>
                </div>

                <CartList
                  items={items}
                  itemCount={itemCount}
                  onQty={onQty}
                  onRemove={onRemove}
                />

                <div className="bg-gradient-to-r from-primary/30 via-amber-500/20 to-primary/30 p-[1.5px] rounded-[22px]">
                  <div className="rounded-[20px] bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-xl p-5">
                    <h4 className="text-sm font-semibold text-secondary-900 mb-3">
                      Promo code
                    </h4>
                    <PromoField
                      code={promo}
                      setCode={setPromo}
                      onApply={applyPromo}
                      applied={applied}
                    />
                    {applied ? (
                      <div className="mt-2 text-xs text-primary-800">
                        Code {applied} applied. You saved {money(discount)}.
                      </div>
                    ) : (
                      <div className="mt-2 text-xs text-secondary-600">
                        Try <span className="font-semibold">DOPE10</span> for 10% off eligible items.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:sticky lg:top-24 space-y-5">
                <OrderSummary
                  subtotal={subtotal}
                  discount={discount}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                />

                <div className="rounded-2xl border border-white/50 bg-white/70 p-4 ring-1 ring-black/5 shadow-inner">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" strokeWidth="2" />
                      <path d="M9 12l2 2 4-4" strokeWidth="2" />
                    </svg>
                    <p className="text-xs text-secondary-700">
                      Secure checkout. Your information is encrypted and protected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
