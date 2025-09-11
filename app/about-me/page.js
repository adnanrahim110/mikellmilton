"use client";

import AboutBandDark from "@/components/layout/AboutBandDark";
import AboutCTA from "@/components/layout/AboutCTA";
import AboutFAQ from "@/components/layout/AboutFAQ.jsx";
import AboutFeatureWipe from "@/components/layout/AboutFeatureWipe";
import AboutParallaxQuote from "@/components/layout/AboutParallaxQuote";
import AboutStory from "@/components/layout/AboutStory";
import AboutTimeline from "@/components/layout/AboutTimeline";
import AboutValues from "@/components/layout/AboutValues";
import AboutValuesDark from "@/components/layout/AboutValuesDark";
import SharedHero from "@/components/ui/SharedHero";
import { UserRound } from "lucide-react";

export default function AboutMe() {
  return (
    <>
      <SharedHero
        eyebrow="About me"
        Icon={UserRound}
        title="The story behind the mission"
        description="I build, write, and point people toward purpose. This page is the snapshot of where that comes from, what I believe, and how I move."
        bgImage="/imgs/home-sec3.jpeg"
        primaryCta={{ label: "Read my story", href: "#story" }}
        secondaryCta={{ label: "Contact", href: "/contact" }}
      />
      <AboutStory />
      <AboutBandDark />
      <AboutFeatureWipe />
      <AboutParallaxQuote />
      <AboutCTA />
    </>
  )
}
