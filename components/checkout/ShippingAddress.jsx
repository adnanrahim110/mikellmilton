"use client";
import { Truck } from "lucide-react";
import React from "react";
import Field from "./Field";
import SectionCard from "./SectionCard";

export default function ShippingAddress({ shipping, setShipping, errors }) {
  return (
    <SectionCard>
      <div className="flex items-center gap-2">
        <Truck className="w-4 h-4 text-primary" />
        <h4 className="text-sm font-semibold text-secondary-900">
          Shipping address
        </h4>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <Field
          placeholder="First name"
          value={shipping.first}
          onChange={(e) => setShipping({ ...shipping, first: e.target.value })}
        />
        <Field
          placeholder="Last name"
          value={shipping.last}
          onChange={(e) => setShipping({ ...shipping, last: e.target.value })}
        />
      </div>
      <Field
        placeholder="Address"
        value={shipping.address1}
        onChange={(e) => setShipping({ ...shipping, address1: e.target.value })}
        className="mt-3"
      />
      <Field
        placeholder="Apartment, suite, etc. (optional)"
        value={shipping.address2}
        onChange={(e) => setShipping({ ...shipping, address2: e.target.value })}
        className="mt-3"
      />
      <div className="grid sm:grid-cols-3 gap-3 mt-3">
        <Field
          placeholder="City"
          value={shipping.city}
          onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
        />
        <Field
          placeholder="State"
          value={shipping.state}
          onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
        />
        <Field
          placeholder="ZIP"
          value={shipping.zip}
          onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs text-red-600 mt-2">
        <div>{errors.sfirst}</div>
        <div>{errors.slast}</div>
        <div className="col-span-2">{errors.saddress1}</div>
        <div>{errors.scity}</div>
        <div>{errors.sstate}</div>
        <div>{errors.szip}</div>
      </div>
    </SectionCard>
  );
}
