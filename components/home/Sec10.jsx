"use client";

import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import React from "react";
import P from "../ui/P";
import Title from "../ui/Title";

const Sec10 = () => {
  return (
    <section className="relative py-28">
      {/* themed backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl opacity-60" />
        <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('/imgs/texture2.jpg')] bg-center bg-no-repeat bg-[length:70%_80%]" />
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-[0.75fr_1fr] gap-10 items-center">
          {/* image with wipe-in from left and themed frame */}
          <MotionInView
            as={motion.div}
            v={variants.fadeIn}
            viewport={{ once: true, amount: 0.5 }}
            className="overflow-hidden rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-2xl"
          >
            <motion.div
              variants={variants.wipeLeft}
              style={{ willChange: "clip-path" }}
              className="w-full h-full"
            >
              <img
                src="/imgs/home-sec10.jpeg"
                alt=""
                className="block w-full h-auto object-cover"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5" />
          </MotionInView>

          {/* text */}
          <div className="space-y-8">
            <Title className="text-[46px]">What are your Divine powers?</Title>

            <P>
              After the target was secured, the C.C. CORP (www.cccorpba.com) and
              the Office of the Crown Prince of Yehudah, Israel
              (www.officeofcpoyi.com) under the strategic guidance of General
              K’el, hacked into the capstone antenna atop the Egyptian obelisk
              in Washington, D.C. The Bizbrainz immediately began rewriting
              planetary control codes.
            </P>

            <P>
              On October 16, 2025, after 30 years of rewriting the capstone’s
              “Laus Deo” code, the DBT homing device will finally activate the
              EMERGENCY “Mayday” signal. Operation 2nd Coming will breach all
              world system defenses shortly thereafter. Did you think we were
              waiting ON YOU to BREAKTHROUGH?
            </P>

            <P>
              Those who bless Israel will be blessed and those who work to keep
              Israel at the bottom will be cursed. And all the people on Earth
              will be blessed through you.
            </P>

            <P className="text-right text-black">
              <strong>-Genesis 12:3</strong>
            </P>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec10;
