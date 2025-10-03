"use client";

import AboutBandDark from "@/components/layout/AboutBandDark";
import AboutCTA from "@/components/layout/AboutCTA";
import AboutFeatureWipe from "@/components/layout/AboutFeatureWipe";
import AboutParallaxQuote from "@/components/layout/AboutParallaxQuote";
import AboutStory from "@/components/layout/AboutStory";
import SharedHero from "@/components/ui/SharedHero";
import { UserRound } from "lucide-react";

export default function AboutUs() {
  return (
    <>
      <SharedHero
        eyebrow="About us"
        Icon={UserRound}
        title="Called to write. Chosen to build."
        description="Every word we write, every vision we build, flows from a shared calling: to point people toward purpose. Our journey is not about self, but about service, Israelite and Gentile, man and woman working together to lift others into the destiny already written for them. This space is not just a snapshot of what we do, but a glimpse into why we believe, how we move, and the mission we carry forward."
        bgImage="/imgs/home-sec3.jpeg"
        secondaryCta={{ label: "Contact Us", href: "/licensing-inquiry#contactUs" }}
      />
      <AboutStory />
      <AboutBandDark />
      <AboutFeatureWipe />
      <AboutParallaxQuote />
      <AboutCTA />
    </>
  )
}
