"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

export default function PayPalSection({
  id,
  wrapperClassName,
  cardClassName,
  header = "Payment",
  revealPayPal,
  canPay,
  ppClientId,
  ppOptions,
  ppLoading,
  setPpLoading,
  createOrder,
  onApprove,
  onCancel,
  onError,
}) {
  return (
    <div id={id} className={wrapperClassName}>
      <div className={cardClassName}>
        <h4 className="text-sm font-semibold text-secondary-900 mb-3">
          {header}
        </h4>

        {(ppLoading || !revealPayPal || !canPay || !ppClientId) && (
          <div className="absolute inset-0 z-[1000] rounded-[20px] bg-white/70 backdrop-blur-md flex items-center justify-center text-sm font-semibold text-secondary-700 ring-1 ring-black/5">
            {ppLoading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span>Preparing PayPal…</span>
              </div>
            ) : !ppClientId ? (
              "Missing PAYPAL_CLIENT_ID"
            ) : !canPay ? (
              "Complete the form above to enable payment"
            ) : (
              "Click “Place order” to continue"
            )}
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
                  onInit={() => setPpLoading(false)}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onCancel={onCancel}
                  onError={onError}
                />
              </PayPalScriptProvider>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-3 text-[11px] text-secondary-600">
          Payments are processed securely by PayPal. You’ll be redirected to
          your downloads after payment.
        </div>
      </div>
    </div>
  );
}
