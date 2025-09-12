"use client";

import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import React from "react";
import P from "../ui/P";
import Subtitle from "../ui/Subtitle";
import Title from "../ui/Title";

const Sec10 = () => {
  return (
    <section className="relative py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl opacity-60" />
        <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('/imgs/texture2.jpg')] bg-center bg-no-repeat bg-[length:70%_80%]" />
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-[0.75fr_1fr] gap-10 items-center">
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

          <div className="space-y-8">
            <Subtitle>Awakening Divine Power</Subtitle>
            <Title className="text-[46px]">What are your Divine powers?</Title>

            <P>
              In the Kingdom of Amen-Amensa, hidden forces have been guiding
              humanity for centuries. Through the DBT homing device, fragments
              of truth about the New Earth reality are being revealed.
              Sleepwalkers stir across the globe, unaware that the divine plan
              is unfolding, and higher powers are rewriting the course of human
              history.
            </P>

            <P>
              As the breakthrough approaches, the unseen hands of the Creator
              activate signals that pierce the limits of the world system. Those
              who align with the sacred purpose will rise, and through their
              actions, blessings will flow to all nations.
            </P>

            <P className="text-right text-secondary italic font-albert-sans">
              —Inspired by the eternal principle:
              <strong className="text-black"> As above, so below</strong>
            </P>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec10;
