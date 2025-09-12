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
        title="The BREAKTHROUGH Within Prophecy"
        description="This book was written with one purpose: to uncover prophecy, reveal identity, and call this generation back to destiny. Every chapter carries the thread of scripture and story, pointing readers to the truth that their lives are not accidents, but part of a greater design. It is more than a book it is a guide, a message, and a breakthrough for those ready to see the ending that was written from the beginning."
        bgImage="/imgs/home-sec3.jpeg"
        primaryCta={{ label: "Buy Now", href: "/shop" }}
        secondaryCta={{ label: "Contact", href: "/contact" }}
      />
      <Sec2 eyebrow="The Dope Breakthrough – Divining Our Perfect Eternity" title="The DBT Franchise Ministry Presents…" text={["Prophecy fulfilled, the DOPE BREAKTHROUGH begins.", "In every age, empires rise and fall, kings boast of power, and nations march under banners of conquest. Legends tell of gods and rulers shaping the world for their own gain. Yet hidden within prophecy lies a story too great to silence, one that speaks not of crowns or empires, but of a people chosen to carry destiny itself. At the appointed time, 144,000 champions will stand, their mission not forged by men but by Heaven. They are the Sol officers of the Kingdom of Amen-Amensa, born to face the battlefield where the first war began. Their charge is not only survival, it is sovereignty, victory, and renewal.", "This is the moment foretold. This is the Breakthrough.", "In the Beginning… You Know the Ending."]} />
    </>
  );
}
