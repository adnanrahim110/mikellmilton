"use client";

import BillingBlock from "@/components/checkout/BillingBlock";
import ContactForm from "@/components/checkout/ContactForm";
import { buildModeLookup, fetchQuote, toSkuItems } from "@/components/checkout/helpers";
import OrderSummary from "@/components/checkout/OrderSummary";
import PayPalSection from "@/components/checkout/PayPalSection";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import ShippingMethod from "@/components/checkout/ShippingMethod";
import SharedHero from "@/components/ui/SharedHero";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { clearCart, selectCartItems, selectSubtotal } from "@/lib/cartSlice";
import { toast } from "@/utils/toast";
import { Store } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

const LS_KEYS = {
  CONTACT: "co_contact",
  BILLING: "co_billing",
  SHIPPING: "co_shipping",
  SHIPSAME: "co_shipSame",
  SHIPMETHOD: "co_shipMethod",
  PROMO_APPLIED: "co_applied",
  REVEAL_PP: "co_reveal_pp",
  CART: "cart",
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

function useRequiredValidations({ contact, billing, requiresShipping, shipSame, shipping }) {
  const req = (v) => String(v || "").trim().length > 0;
  const emailOk = req(contact.email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email);
  const nameOk = req(billing.first) && req(billing.last);
  let shippingOk = true;
  if (requiresShipping) {
    shippingOk = req(billing.address1) && req(billing.city) && req(billing.state) && req(billing.zip);
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
  return { emailOk, nameOk, shippingOk, allOk: emailOk && nameOk && shippingOk };
}

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);

  const [contact, setContact] = useState(() => safeGet(LS_KEYS.CONTACT, { email: "", phone: "" }));
  const [billing, setBilling] = useState(() =>
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
  const [shipSame, setShipSame] = useState(() => safeGet(LS_KEYS.SHIPSAME, true));
  const [shipping, setShipping] = useState(() =>
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

  const [shipMethod, setShipMethod] = useState(() => safeGet(LS_KEYS.SHIPMETHOD, "standard"));
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState(() => safeGet(LS_KEYS.PROMO_APPLIED, ""));

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const [quote, setQuote] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [draftId, setDraftId] = useState(null);

  const [revealPayPal, setRevealPayPal] = useState(() => Boolean(safeGet(LS_KEYS.REVEAL_PP, false)));
  const [ppLoading, setPpLoading] = useState(false);

  const [overlay, setOverlay] = useState(false);

  useEffect(() => safeSet(LS_KEYS.CONTACT, contact), [contact]);
  useEffect(() => safeSet(LS_KEYS.BILLING, billing), [billing]);
  useEffect(() => safeSet(LS_KEYS.SHIPSAME, shipSame), [shipSame]);
  useEffect(() => safeSet(LS_KEYS.SHIPPING, shipping), [shipping]);
  useEffect(() => safeSet(LS_KEYS.SHIPMETHOD, shipMethod), [shipMethod]);
  useEffect(() => safeSet(LS_KEYS.PROMO_APPLIED, applied), [applied]);
  useEffect(() => safeSet(LS_KEYS.REVEAL_PP, revealPayPal), [revealPayPal]);

  const getMode = useMemo(buildModeLookup, []);
  const resolvedItems = useMemo(
    () => items.map((it) => ({ ...it, __resolvedMode: getMode(it) })),
    [items, getMode]
  );
  const allDigital = resolvedItems.length > 0 && resolvedItems.every((it) => it.__resolvedMode === "digital");
  const requiresShipping = !allDigital;

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

        const q = await fetchQuote({ items: skuItems, coupon: applied || null });
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

  const validity = useRequiredValidations({ contact, billing, requiresShipping, shipSame, shipping });
  const canPay = validity.allOk && !!quote && !!draftId;

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (code === "DOPE10") setApplied(code);
    setPromo("");
  };

  useEffect(() => {
    const e = {};
    if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) e.email = "Invalid email";
    if (billing.first || billing.last) {
      if (!billing.first) e.first = "Required";
      if (!billing.last) e.last = "Required";
    }
    setErrors(e);
  }, [contact.email, billing.first, billing.last]);

  useEffect(() => {
    if (!canPay && revealPayPal) {
      setRevealPayPal(false);
      safeSet(LS_KEYS.REVEAL_PP, false);
    }
  }, [canPay]);

  useEffect(() => {
    setRevealPayPal(false);
    safeSet(LS_KEYS.REVEAL_PP, false);
  }, [draftId, items.length, applied]);

  useEffect(() => {
    if (canPay && safeGet(LS_KEYS.REVEAL_PP, false)) {
      setRevealPayPal(true);
      setPpLoading(true);
      const el = document.getElementById("paypal-section");
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
    }
  }, [canPay]);

  useEffect(() => {
    if (!revealPayPal) setPpLoading(false);
  }, [revealPayPal]);

  const ppClientId = PAYPAL_CLIENT_ID || "";
  const ppOptions = useMemo(
    () => ({
      "client-id": ppClientId,
      currency: quote?.currency || "USD",
      intent: "capture",
      components: "buttons",
    }),
    [ppClientId, quote?.currency]
  );

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
    setPpLoading(true);
    safeSet(LS_KEYS.REVEAL_PP, true);
    const el = document.getElementById("paypal-section");
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  };

  const resetCheckout = () => {
    [
      LS_KEYS.CONTACT,
      LS_KEYS.BILLING,
      LS_KEYS.SHIPPING,
      LS_KEYS.SHIPSAME,
      LS_KEYS.SHIPMETHOD,
      LS_KEYS.PROMO_APPLIED,
      LS_KEYS.REVEAL_PP,
      LS_KEYS.CART,
    ].forEach(safeRemove);

    setContact({ email: "", phone: "" });
    setBilling({
      first: "",
      last: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
    });
    setShipSame(true);
    setShipping({
      first: "",
      last: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
    });
    setShipMethod("standard");
    setPromo("");
    setApplied("");
    setRevealPayPal(false);
    setPpLoading(false);
  };

  const createOrder = async () => {
    setOverlay(true);
    setProcessing(true);
    if (!draftId) {
      setOverlay(false);
      throw new Error("Unable to start payment");
    }
    const fullName = `${billing.first} ${billing.last}`.trim();
    const res = await fetch("/api/checkout/paypal/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        draftId,
        customer: { email: contact.email, name: fullName, phone: contact.phone || null },
        addresses: null,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setProcessing(false);
      setOverlay(false);
      toast.error(data.error || "Unable to start payment");
      throw new Error(data.error || "Unable to start payment");
    }
    return data.paypalOrderId;
  };

  const onApprove = async (data) => {
    try {
      setOverlay(true);
      const res = await fetch("/api/checkout/paypal/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paypalOrderId: data.orderID }),
      });
      const json = await res.json();
      if (!res.ok || json?.error) throw new Error(json?.error || "Payment failed");

      dispatch(clearCart());
      resetCheckout();

      toast.success("Payment successful! Redirecting to downloads…");
      const dest = (typeof json.next === "string" && json.next) || `/download/${encodeURIComponent(data.orderID)}`;
      setTimeout(() => (window.location.href = dest), 400);
    } catch (err) {
      setProcessing(false);
      setPpLoading(false);
      setOverlay(false);
      toast.error(err.message || "Payment error");
    }
  };

  const onCancel = () => {
    setProcessing(false);
    setPpLoading(false);
    setOverlay(false);
    toast.info("Payment was cancelled.");
  };

  const onError = (e) => {
    setProcessing(false);
    setPpLoading(false);
    setOverlay(false);
    toast.error("PayPal error. Please try again.");
    console.error("PayPal onError:", e);
  };

  if (resolvedItems.length === 0) {
    return (
      <section className="relative py-[90px]">
        <div className="container">
          <div className="mb-8 space-y-3">
            <Subtitle tone="dark">Checkout</Subtitle>
            <Title className="text-[clamp(28px,5.2vw,44px)]">Your cart is empty</Title>
          </div>
        </div>
      </section>
    );
  }

  const subtotalServer = quote ? quote.subtotal_cents / 100 : subtotal;
  const discountServer = quote ? quote.discount_cents / 100 : 0;
  const shippingServer = quote ? quote.shipping_cents / 100 : 0;
  const taxServer = 0;
  const totalServer = quote ? quote.total_cents / 100 : Math.max(0, subtotal - discountServer);

  return (
    <>
      <SharedHero
        eyebrow="Checkout"
        Icon={Store}
        title="The Dope Breakthrough – Divining Our Perfect Eternity"
        subtitleMaxW="max-w-[calc(100%-40px)]"
        description="This is more than a book, it is a call to destiny. The Dope Breakthrough – Divining Our Perfect Eternity brings prophecy, history, and revelation together in a way that speaks to every generation in the Diaspora and beyond. Each copy is a step into clarity, a guide toward sovereignty, and a reminder that eternity has already been written."
        bgImage="/imgs/home-sec3.jpeg"
        secondaryCta={{ label: "Contact", href: "/licensing-inquiry#contactUs" }}
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
                <ShippingMethod shipMethod={shipMethod} setShipMethod={setShipMethod} shippingCost={shippingServer} />
              ) : null}

              <PayPalSection
                id="paypal-section"
                wrapperClassName="bg-gradient-to-r max-lg:hidden from-primary/30 via-amber-500/20 to-primary/30 p-[1.5px] rounded-[22px]"
                cardClassName="relative rounded-[20px] bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-xl p-5"
                header="Payment"
                revealPayPal={revealPayPal}
                canPay={canPay}
                ppClientId={ppClientId}
                ppOptions={ppOptions}
                ppLoading={ppLoading}
                setPpLoading={setPpLoading}
                createOrder={createOrder}
                onApprove={onApprove}
                onCancel={onCancel}
                onError={onError}
              />
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
                disablePlaceOrder={revealPayPal}
              />
            </div>

            <PayPalSection
              id="paypal-section"
              wrapperClassName="bg-gradient-to-r lg:hidden from-primary/30 via-amber-500/20 to-primary/30 p-[1.5px] rounded-[22px]"
              cardClassName="relative rounded-[20px] bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-xl p-5"
              header="Payment"
              revealPayPal={revealPayPal}
              canPay={canPay}
              ppClientId={ppClientId}
              ppOptions={ppOptions}
              ppLoading={ppLoading}
              setPpLoading={setPpLoading}
              createOrder={createOrder}
              onApprove={onApprove}
              onCancel={onCancel}
              onError={onError}
            />
          </div>
        </div>

        {overlay && (
          <div className="fixed inset-0 z-[100] bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl ring-1 ring-black/10 bg-white/90 shadow">
              <div className="h-5 w-5 rounded-full border-2 border-black/20 border-t-black animate-spin" />
              <div className="text-sm font-medium text-black/80">Finalizing your order…</div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
