"use client";
import ShopProducts from "@/components/shop/ShopProducts";
import SharedHero from "@/components/ui/SharedHero";
import { Store } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
export default function ShopClient() {
  const params = useSearchParams();
  return (
    <>
      <SharedHero
        eyebrow="Shop"
        Icon={Store}
        title="The Dope Breakthrough – Divining Our Perfect Eternity"
        subtitleMaxW="max-w-[calc(100%-40px)]"
        description="This is more than a book, it is a call to destiny. The Dope Breakthrough – Divining Our Perfect Eternity brings prophecy, history, and revelation together in a way that speaks to every generation in the Diaspora and beyond. Each copy is a step into clarity, a guide toward sovereignty, and a reminder that eternity has already been written."
        bgImage="/imgs/home-sec3.jpeg"
        secondaryCta={{ label: "Contact", href: "/contact" }}
      />
      <ShopProducts />
    </>
  );
}
