
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
        title="Lorem ipsum dolor sit"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus quidem incidunt magnam dicta unde sapiente est placeat, aliquam ea commodi nisi possimus beatae natus ipsum voluptates deleniti dignissimos qui? Fuga nihil iusto architecto adipisci voluptates placeat quo distinctio voluptatibus, deleniti perferendis."
        bgImage="/imgs/home-sec3.jpeg"
        secondaryCta={{ label: "Contact", href: "/contact" }}
      />
      <Sec6 />
    </>
  )
}
