"use client";

import BillingBlock from "@/components/checkout/BillingBlock";
import ContactForm from "@/components/checkout/ContactForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import Payment from "@/components/checkout/Payment";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import ShippingMethod from "@/components/checkout/ShippingMethod";
import { buildModeLookup, computeTotals } from "@/components/checkout/helpers";
import Button from "@/components/ui/Button";
import SharedHero from "@/components/ui/SharedHero";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { selectCartItems, selectSubtotal } from "@/lib/cartSlice";
import { Store } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function CheckoutPage() {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);

  const [contact, setContact] = useState({ email: "", phone: "" });
  const [billing, setBilling] = useState({
    first: "", last: "", address1: "", address2: "", city: "", state: "", zip: "", country: "United States",
  });
  const [shipSame, setShipSame] = useState(true);
  const [shipping, setShipping] = useState({
    first: "", last: "", address1: "", address2: "", city: "", state: "", zip: "", country: "United States",
  });

  const [shipMethod, setShipMethod] = useState("standard");
  const [pay, setPay] = useState({ name: "", number: "", exp: "", cvc: "" });
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState("");
  const [agree, setAgree] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const getMode = useMemo(buildModeLookup, []);
  const resolvedItems = useMemo(
    () => items.map((it) => ({ ...it, __resolvedMode: getMode(it) })),
    [items, getMode]
  );
  const allDigital = resolvedItems.length > 0 && resolvedItems.every((it) => it.__resolvedMode === "digital");
  const requiresShipping = !allDigital;

  const discountRate = applied === "DOPE10" ? 0.1 : 0;
  const { discount, shippingCost, tax, total } = computeTotals({
    subtotal,
    discountRate,
    items: resolvedItems,
    shipMethod,
    requiresShipping,
  });

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (code === "DOPE10") setApplied(code);
    setPromo("");
  };

  const req = (v) => String(v || "").trim().length > 0;
  const validate = () => {
    const e = {};
    if (!req(contact.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) e.email = "Invalid email";
    if (!req(billing.first)) e.first = "Required";
    if (!req(billing.last)) e.last = "Required";

    if (requiresShipping) {
      if (!req(billing.address1)) e.address1 = "Required";
      if (!req(billing.city)) e.city = "Required";
      if (!req(billing.state)) e.state = "Required";
      if (!req(billing.zip)) e.zip = "Required";

      if (!shipSame) {
        if (!req(shipping.first)) e.sfirst = "Required";
        if (!req(shipping.last)) e.slast = "Required";
        if (!req(shipping.address1)) e.saddress1 = "Required";
        if (!req(shipping.city)) e.scity = "Required";
        if (!req(shipping.state)) e.sstate = "Required";
        if (!req(shipping.zip)) e.szip = "Required";
      }
    }

    if (!req(pay.name)) e.pname = "Required";
    if (!/^\d{13,19}$/.test((pay.number || "").replace(/\s+/g, ""))) e.pnum = "Invalid card";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(pay.exp || "")) e.pexp = "MM/YY";
    if (!/^\d{3,4}$/.test(pay.cvc || "")) e.pcvc = "Invalid CVC";
    if (!agree) e.agree = "Required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = () => {
    if (!validate()) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      window.location.href = "/thank-you";
    }, 1200);
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
          <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('/imgs/texture2.jpg')] bg-center bg-no-repeat bg-[length:70%_80%]" />
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
            <div className="space-y-6">
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
                <ShippingMethod shipMethod={shipMethod} setShipMethod={setShipMethod} shippingCost={shippingCost} />
              ) : null}
              <Payment pay={pay} setPay={setPay} errors={errors} agree={agree} setAgree={setAgree} />
            </div>

            <OrderSummary
              items={resolvedItems}
              subtotal={subtotal}
              discount={discount}
              shippingCost={shippingCost}
              tax={tax}
              total={total}
              requiresShipping={requiresShipping}
              promo={promo}
              setPromo={setPromo}
              applied={applied}
              applyPromo={() => {
                const code = promo.trim().toUpperCase();
                if (code === "DOPE10") setApplied(code);
                setPromo("");
              }}
              placeOrder={placeOrder}
              processing={processing}
            />
          </div>
        </div>
      </section>
    </>
  );
}
