"use client";
import { CreditCard } from "lucide-react";
import React from "react";
import Field from "./Field";
import SectionCard from "./SectionCard";

export default function Payment({ pay, setPay, errors, agree, setAgree }) {
  return (
    <SectionCard>
      <div className="flex items-center gap-2">
        <CreditCard className="w-4 h-4 text-primary" />
        <h4 className="text-sm font-semibold text-secondary-900">Payment</h4>
      </div>

      <Field
        placeholder="Name on card"
        value={pay.name}
        onChange={(e) => setPay({ ...pay, name: e.target.value })}
        className="mt-4"
      />
      <div className="grid sm:grid-cols-2 gap-3 mt-3">
        <Field
          placeholder="Card number (numbers only)"
          inputMode="numeric"
          value={pay.number}
          onChange={(e) =>
            setPay({ ...pay, number: e.target.value.replace(/[^\d]/g, "") })
          }
        />
        <div className="grid grid-cols-2 gap-3">
          <Field
            placeholder="MM/YY"
            inputMode="numeric"
            value={pay.exp}
            onChange={(e) => setPay({ ...pay, exp: e.target.value })}
          />
          <Field
            placeholder="CVC"
            inputMode="numeric"
            value={pay.cvc}
            onChange={(e) =>
              setPay({ ...pay, cvc: e.target.value.replace(/[^\d]/g, "") })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs text-red-600 mt-2">
        <div>{errors.pname}</div>
        <div>{errors.pexp}</div>
        <div>{errors.pcvc}</div>
        <div className="col-span-3">{errors.pnum}</div>
      </div>

      <div className="flex items-center gap-2 pt-3">
        <input
          id="agree"
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="size-4 rounded border-secondary-400 text-primary focus:ring-primary/30"
        />
        <label htmlFor="agree" className="text-sm text-secondary-800">
          I agree to the terms and privacy policy
        </label>
      </div>
      {errors.agree ? (
        <p className="text-xs text-red-600">{errors.agree}</p>
      ) : null}
    </SectionCard>
  );
}
