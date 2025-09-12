
"use client";
import ShopHero from '@/components/contact/ShopHero';
import Sec6 from '@/components/home/Sec6';
import SharedHero from '@/components/ui/SharedHero';
import { UserRound } from 'lucide-react';
import React from 'react';

export default function Shop() {
  return (
    <>
      <SharedHero
        eyebrow="Shop"
        Icon={UserRound}
        title="The Breakthrough You Can Hold"
        description="This is more than a book, it is a call to destiny. The Dope Breakthrough – Divining Our Perfect Eternity brings prophecy, history, and revelation together in a way that speaks to every generation in the Diaspora and beyond. Each copy is a step into clarity, a guide toward sovereignty, and a reminder that eternity has already been written."
        bgImage="/imgs/home-sec3.jpeg"
        secondaryCta={{ label: "Contact", href: "/contact" }}
      />
      <Sec6 />
    </>
  )
}
