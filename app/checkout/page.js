"use client";

import BillingBlock from "@/components/checkout/BillingBlock";
import ContactForm from "@/components/checkout/ContactForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import ShippingMethod from "@/components/checkout/ShippingMethod";
import {
  buildModeLookup,
  fetchQuote,
  toSkuItems,
} from "@/components/checkout/helpers";
import Button from "@/components/ui/Button";
import SharedHero from "@/components/ui/SharedHero";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { clearCart, selectCartItems, selectSubtotal } from "@/lib/cartSlice";
import { Store } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "@/utils/toast";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AnimatePresence, motion } from "motion/react";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

/* ---------- localStorage helpers ---------- */
const LS_KEYS = {
  CONTACT: "co_contact",
  BILLING: "co_billing",
  SHIPPING: "co_shipping",
  SHIPSAME: "co_shipSame",
  SHIPMETHOD: "co_shipMethod",
  PROMO_APPLIED: "co_applied",
  REVEAL_PP: "co_reveal_pp",
  CART: "cart", // if you persist cart client-side
};

const safeGet = (k, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const v = window.localStorage.getItem(k);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};
const safeSet = (k, v) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(k, JSON.stringify(v));
  } catch { }
};
const safeRemove = (k) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(k);
  } catch { }
};

/* ---------- Validations ---------- */
function useRequiredValidations({
  contact,
  billing,
  requiresShipping,
  shipSame,
  shipping,
}) {
  const req = (v) => String(v || "").trim().length > 0;
  const emailOk =
    req(contact.email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email);
  const nameOk = req(billing.first) && req(billing.last);

  let shippingOk = true;
  if (requiresShipping) {
    shippingOk =
      req(billing.address1) && req(billing.city) && req(billing.state) && req(billing.zip);
    if (!shipSame) {
      shippingOk =
        shippingOk &&
        req(shipping.first) &&
        req(shipping.last) &&
        req(shipping.address1) &&
        req(shipping.city) &&
        req(shipping.state) &&
        req(shipping.zip);
    }
  }
  return {
    emailOk,
    nameOk,
    shippingOk,
    allOk: emailOk && nameOk && shippingOk,
  };
}

export default function CheckoutPage() {
  const dispatch = useDispatch(); // ⬅️
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);

  /* ---------- Form state (hydrated from LS) ---------- */
  const [contact, setContact] = useState(
    () => safeGet(LS_KEYS.CONTACT, { email: "", phone: "" })
  );
  const [billing, setBilling] = useState(
    () =>
      safeGet(LS_KEYS.BILLING, {
        first: "",
        last: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "United States",
      })
  );
  const [shipSame, setShipSame] = useState(
    () => safeGet(LS_KEYS.SHIPSAME, true)
  );
  const [shipping, setShipping] = useState(
    () =>
      safeGet(LS_KEYS.SHIPPING, {
        first: "",
        last: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "United States",
      })
  );

  const [shipMethod, setShipMethod] = useState(
    () => safeGet(LS_KEYS.SHIPMETHOD, "standard")
  );
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState(() => safeGet(LS_KEYS.PROMO_APPLIED, ""));

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const [quote, setQuote] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [draftId, setDraftId] = useState(null);

  // Explicit reveal flag for PayPal buttons (hydrate once)
  const [revealPayPal, setRevealPayPal] = useState(() =>
    Boolean(safeGet(LS_KEYS.REVEAL_PP, false))
  );

  /* ---------- Persist to LS on change ---------- */
  useEffect(() => safeSet(LS_KEYS.CONTACT, contact), [contact]);
  useEffect(() => safeSet(LS_KEYS.BILLING, billing), [billing]);
  useEffect(() => safeSet(LS_KEYS.SHIPSAME, shipSame), [shipSame]);
  useEffect(() => safeSet(LS_KEYS.SHIPPING, shipping), [shipping]);
  useEffect(() => safeSet(LS_KEYS.SHIPMETHOD, shipMethod), [shipMethod]);
  useEffect(() => safeSet(LS_KEYS.PROMO_APPLIED, applied), [applied]);
  useEffect(() => safeSet(LS_KEYS.REVEAL_PP, revealPayPal), [revealPayPal]);

  /* ---------- Modes & shipping requirement ---------- */
  const getMode = useMemo(buildModeLookup, []);
  const resolvedItems = useMemo(
    () => items.map((it) => ({ ...it, __resolvedMode: getMode(it) })),
    [items, getMode]
  );
  const allDigital =
    resolvedItems.length > 0 &&
    resolvedItems.every((it) => it.__resolvedMode === "digital");
  const requiresShipping = !allDigital;

  /* ---------- Pricing & quote ---------- */
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (!items.length) {
          if (active) {
            setQuote(null);
            setDraftId(null);
          }
          return;
        }
        setQuoteLoading(true);
        const skuItems = toSkuItems(items);

        const q = await fetchQuote({
          items: skuItems,
          coupon: applied || null,
        });
        if (!active) return;
        setQuote(q);

        const res = await fetch("/api/checkout/quote/sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: skuItems, coupon: applied || null }),
        });
        const js = await res.json();
        if (!active) return;
        setDraftId(res.ok && js?.draftId ? js.draftId : null);
      } catch {
        if (active) setDraftId(null);
      } finally {
        if (active) setQuoteLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [items, applied]);

  /* ---------- Derived validity ---------- */
  const validity = useRequiredValidations({
    contact,
    billing,
    requiresShipping,
    shipSame,
    shipping,
  });
  const canPay = validity.allOk && !!quote && !!draftId;

  /* ---------- Promo ---------- */
  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (code === "DOPE10") setApplied(code);
    setPromo("");
  };

  /* ---------- Field-level errors ---------- */
  useEffect(() => {
    const e = {};
    if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email))
      e.email = "Invalid email";
    if (billing.first || billing.last) {
      if (!billing.first) e.first = "Required";
      if (!billing.last) e.last = "Required";
    }
    setErrors(e);
  }, [contact.email, billing.first, billing.last]);

  /* ---------- Keep reveal state honest ---------- */
  useEffect(() => {
    if (!canPay && revealPayPal) {
      setRevealPayPal(false);
      safeSet(LS_KEYS.REVEAL_PP, false);
    }
  }, [canPay]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setRevealPayPal(false);
    safeSet(LS_KEYS.REVEAL_PP, false);
  }, [draftId, items.length, applied]);

  /* ---------- Auto-reveal after reload if user had clicked and can still pay ---------- */
  useEffect(() => {
    if (canPay && safeGet(LS_KEYS.REVEAL_PP, false)) {
      setRevealPayPal(true);
      const el = document.getElementById("paypal-section");
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
    }
  }, [canPay]);

  /* ---------- Place order: reveal + scroll ---------- */
  const ppClientId = PAYPAL_CLIENT_ID || "";
  const placeOrder = () => {
    if (!canPay) {
      toast.error("Please complete required fields first.");
      return;
    }
    if (!ppClientId) {
      toast.error("Missing PayPal client ID.");
      return;
    }

    setRevealPayPal(true);
    safeSet(LS_KEYS.REVEAL_PP, true);

    const el = document.getElementById("paypal-section");
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  };

  if (resolvedItems.length === 0) {
    return (
      <section className="relative py-[90px]">
        <div className="container">
          <div className="mb-8 space-y-3">
            <Subtitle tone="dark">Checkout</Subtitle>
            <Title className="text-[clamp(28px,5.2vw,44px)]">Your cart is empty</Title>
          </div>
          <Button href="/shop" tone="dark" className="rounded-xl inline-flex items-center gap-2">
            <span className="w-4 h-4">←</span>
            Back to shop
          </Button>
        </div>
      </section>
    );
  }

  const subtotalServer = quote ? quote.subtotal_cents / 100 : subtotal;
  const discountServer = quote ? quote.discount_cents / 100 : 0;
  const shippingServer = quote ? quote.shipping_cents / 100 : 0;
  const taxServer = 0;
  const totalServer = quote ? quote.total_cents / 100 : Math.max(0, subtotal - discountServer);

  const ppOptions = useMemo(
    () => ({
      "client-id": ppClientId,
      currency: quote?.currency || "USD",
      intent: "capture",
      components: "buttons",
    }),
    [ppClientId, quote?.currency]
  );

  return (
    <>
      <SharedHero
        eyebrow="Checkout"
        Icon={Store}
        title="The Dope Breakthrough – Divining Our Perfect Eternity"
        subtitleMaxW="max-w-[calc(100%-40px)]"
        description="This is more than a book, it is a call to destiny. The Dope Breakthrough – Divining Our Perfect Eternity brings prophecy, history, and revelation together in a way that speaks to every generation in the Diaspora and beyond. Each copy is a step into clarity, a guide toward sovereignty, and a reminder that eternity has already been written."
        bgImage="/imgs/home-sec3.jpeg"
        secondaryCta={{ label: "Contact", href: "/contact" }}
      />

      <section className="relative py-[90px]">
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
          <div className="mb-8 space-y-3">
            <Subtitle tone="dark">Checkout</Subtitle>
            <Title className="text-[clamp(28px,5.2vw,44px)]">Secure payment</Title>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <div className="flex flex-col gap-y-6">
              <ContactForm contact={contact} setContact={setContact} error={errors.email} />
              <BillingBlock
                billing={billing}
                setBilling={setBilling}
                requiresShipping={requiresShipping}
                shipSame={shipSame}
                setShipSame={setShipSame}
                errors={errors}
              />
              {requiresShipping && !shipSame ? (
                <ShippingAddress shipping={shipping} setShipping={setShipping} errors={errors} />
              ) : null}
              {requiresShipping ? (
                <ShippingMethod
                  shipMethod={shipMethod}
                  setShipMethod={setShipMethod}
                  shippingCost={shippingServer}
                />
              ) : null}

              <div
                id="paypal-section"
                className="bg-gradient-to-r from-primary/30 via-amber-500/20 to-primary/30 p-[1.5px] rounded-[22px]"
              >
                <div className="relative rounded-[20px] bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-xl p-5">
                  <h4 className="text-sm font-semibold text-secondary-900 mb-3">Payment</h4>

                  {(!revealPayPal || !canPay || !ppClientId) && (
                    <div className="absolute inset-0 z-10 rounded-[20px] bg-white/70 backdrop-blur-sm flex items-center justify-center text-sm font-semibold text-secondary-700 ring-1 ring-black/5">
                      {!ppClientId
                        ? "Missing PAYPAL_CLIENT_ID"
                        : !canPay
                          ? "Complete the form above to enable payment"
                          : "Click “Place order” to continue"}
                    </div>
                  )}

                  <AnimatePresence initial={false} mode="wait">
                    {revealPayPal && canPay && ppClientId ? (
                      <motion.div
                        key="paypal"
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="relative px-10"
                      >
                        <PayPalScriptProvider options={ppOptions}>
                          <PayPalButtons
                            style={{ layout: "vertical", shape: "rect", label: "paypal" }}
                            createOrder={async () => {
                              setProcessing(true);
                              if (!draftId) throw new Error("Unable to start payment");
                              const fullName = `${billing.first} ${billing.last}`.trim();
                              const res = await fetch("/api/checkout/paypal/create", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  draftId,
                                  customer: {
                                    email: contact.email,
                                    name: fullName,
                                    phone: contact.phone || null,
                                  },
                                  addresses: null,
                                }),
                              });
                              const data = await res.json();
                              if (!res.ok) {
                                setProcessing(false);
                                toast.error(data.error || "Unable to start payment");
                                throw new Error(data.error || "Unable to start payment");
                              }
                              return data.paypalOrderId;
                            }}
                            onApprove={async (data) => {
                              try {
                                const res = await fetch("/api/checkout/paypal/capture", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ paypalOrderId: data.orderID }),
                                });
                                const json = await res.json();
                                if (!res.ok || json?.error) {
                                  throw new Error(json?.error || "Payment failed");
                                }

                                // ✅ Clear cart after capture succeeds
                                dispatch(clearCart());
                                safeRemove(LS_KEYS.CART);
                                // Reset reveal state for future sessions
                                safeRemove(LS_KEYS.REVEAL_PP);

                                toast.success("Payment successful! Redirecting to downloads…");

                                const dest =
                                  (typeof json.next === "string" && json.next) ||
                                  `/download/${encodeURIComponent(data.orderID)}`;

                                setTimeout(() => (window.location.href = dest), 400);
                              } catch (err) {
                                setProcessing(false);
                                toast.error(err.message || "Payment error");
                              }
                            }}
                            onCancel={() => {
                              setProcessing(false);
                              toast.info("Payment was cancelled.");
                            }}
                            onError={(e) => {
                              setProcessing(false);
                              toast.error("PayPal error. Please try again.");
                              console.error("PayPal onError:", e);
                            }}
                          />
                        </PayPalScriptProvider>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <div className="mt-3 text-[11px] text-secondary-600">
                    Payments are processed securely by PayPal. You’ll be redirected to your downloads after payment.
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-full">
              <OrderSummary
                subtotal={subtotalServer}
                discount={discountServer}
                shippingCost={shippingServer}
                tax={taxServer}
                total={totalServer}
                promo={promo}
                setPromo={setPromo}
                applied={applied}
                applyPromo={applyPromo}
                placeOrder={placeOrder}
                processing={processing || quoteLoading}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
