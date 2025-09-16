"use client";

import Button from "@/components/ui/Button";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import React from "react";

export default function CartEmpty() {
  return (
    <div className="rounded-3xl bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-xl p-8 text-center">
      <div className="mx-auto max-w-lg space-y-4">
        <ShieldCheck className="w-10 h-10 mx-auto text-primary" />
        <p className="text-secondary-700">
          Your cart is empty. Add some books from the shop to continue.
        </p>
        <Button href="/shop" tone="dark">
          <ArrowLeft className="w-4 h-4" />
          Back to shop
        </Button>
      </div>
    </div>
  );
}
