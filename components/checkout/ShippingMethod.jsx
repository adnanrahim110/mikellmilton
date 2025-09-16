"use client";
import { Truck } from "lucide-react";
import React from "react";
import RadioCard from "./RadioCard";
import SectionCard from "./SectionCard";

export default function ShippingMethod({
  shipMethod,
  setShipMethod,
  shippingCost,
}) {
  return (
    <SectionCard>
      <div className="flex items-center gap-2">
        <Truck className="w-4 h-4 text-primary" />
        <h4 className="text-sm font-semibold text-secondary-900">
          Shipping method
        </h4>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-4">
        <RadioCard
          name="shipMethod"
          value="standard"
          checked={shipMethod === "standard"}
          onChange={setShipMethod}
          title="Standard"
          hint="5–7 business days"
          price={
            shippingCost === 0 && shipMethod === "standard" ? "Free" : "$6.99"
          }
        />
        <RadioCard
          name="shipMethod"
          value="express"
          checked={shipMethod === "express"}
          onChange={setShipMethod}
          title="Express"
          hint="2–3 business days"
          price="$14.99"
        />
        <RadioCard
          name="shipMethod"
          value="overnight"
          checked={shipMethod === "overnight"}
          onChange={setShipMethod}
          title="Overnight"
          hint="1 business day"
          price="$29.99"
        />
      </div>
    </SectionCard>
  );
}
