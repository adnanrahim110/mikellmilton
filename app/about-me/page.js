"use client";

import AboutBandDark from "@/components/layout/AboutBandDark";
import AboutCTA from "@/components/layout/AboutCTA";
import AboutFeatureWipe from "@/components/layout/AboutFeatureWipe";
import AboutParallaxQuote from "@/components/layout/AboutParallaxQuote";
import AboutStory from "@/components/layout/AboutStory";
import SharedHero from "@/components/ui/SharedHero";
import { UserRound } from "lucide-react";

export default function AboutMe() {
  return (
    <>
      <SharedHero
        eyebrow="About me"
        Icon={UserRound}
        title="Called to write. Chosen to build."
        description="Every word I write, every vision I build, flows from a single calling: to point people toward purpose. My journey is not about self, but about service, lifting others to see the destiny already written for them. This space is not just a snapshot of what I do, but a glimpse into why I believe, how I move, and the mission I carry forward."
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
