"use client";
import { MapPin } from "lucide-react";
import React from "react";
import Field from "./Field";
import SectionCard from "./SectionCard";

export default function BillingBlock({
  billing,
  setBilling,
  requiresShipping,
  shipSame,
  setShipSame,
  errors,
}) {
  return (
    <SectionCard>
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        <h4 className="text-sm font-semibold text-secondary-900">
          {requiresShipping ? "Billing address" : "Billing details"}
        </h4>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <Field
          placeholder="First name"
          value={billing.first}
          onChange={(e) => setBilling({ ...billing, first: e.target.value })}
        />
        <Field
          placeholder="Last name"
          value={billing.last}
          onChange={(e) => setBilling({ ...billing, last: e.target.value })}
        />
      </div>

      {requiresShipping ? (
        <>
          <Field
            placeholder="Address"
            value={billing.address1}
            onChange={(e) =>
              setBilling({ ...billing, address1: e.target.value })
            }
            className="mt-3"
          />
          <Field
            placeholder="Apartment, suite, etc. (optional)"
            value={billing.address2}
            onChange={(e) =>
              setBilling({ ...billing, address2: e.target.value })
            }
            className="mt-3"
          />
          <div className="grid sm:grid-cols-3 gap-3 mt-3">
            <Field
              placeholder="City"
              value={billing.city}
              onChange={(e) => setBilling({ ...billing, city: e.target.value })}
            />
            <Field
              placeholder="State"
              value={billing.state}
              onChange={(e) =>
                setBilling({ ...billing, state: e.target.value })
              }
            />
            <Field
              placeholder="ZIP"
              value={billing.zip}
              onChange={(e) => setBilling({ ...billing, zip: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2 pt-3">
            <input
              id="ship-same"
              type="checkbox"
              checked={shipSame}
              onChange={(e) => setShipSame(e.target.checked)}
              className="size-4 rounded border-secondary-400 text-primary focus:ring-primary/30"
            />
            <label htmlFor="ship-same" className="text-sm text-secondary-800">
              Shipping address same as billing
            </label>
          </div>
        </>
      ) : null}

      <div className="grid grid-cols-2 gap-3 text-xs text-red-600 mt-2">
        <div>{errors.first}</div>
        <div>{errors.last}</div>
        {requiresShipping ? (
          <>
            <div className="col-span-2">{errors.address1}</div>
            <div>{errors.city}</div>
            <div>{errors.state}</div>
            <div>{errors.zip}</div>
          </>
        ) : null}
      </div>
    </SectionCard>
  );
}
