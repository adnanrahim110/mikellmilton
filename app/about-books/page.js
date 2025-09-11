"use client";
import Sec2 from "@/components/home/Sec2";
import SharedHero from "@/components/ui/SharedHero";
import { UserRound } from "lucide-react";
import React from "react";

export default function BooksPage() {
  return (
    <>
      <SharedHero
        eyebrow="About Books"
        Icon={UserRound}
        title="The story behind the mission"
        description="I build, write, and point people toward purpose. This page is the snapshot of where that comes from, what I believe, and how I move."
        bgImage="/imgs/home-sec3.jpeg"
        primaryCta={{ label: "Buy Now", href: "/shop" }}
        secondaryCta={{ label: "Contact", href: "/contact" }}
      />
      <Sec2 />
    </>
  );
}
