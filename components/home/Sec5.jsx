"use client";

import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import React from "react";
import { FaPeopleArrows } from "react-icons/fa6";
import P from "../ui/P";
import Quote from "../ui/Quote";
import Subtitle from "../ui/Subtitle";
import Title from "../ui/Title";

const Sec5 = () => {
  return (
    <section className="relative w-full pt-[130px]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-20 h-[380px] w-[380px] rounded-full bg-primary/20 blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl opacity-60" />
      </div>

      <div className="container">
        <Subtitle icon={FaPeopleArrows}>The dope break through</Subtitle>

        <div className="space-y-6 mb-16">
          <Title after={[{ word: 1, src: "/imgs/sec5_title.jpg" }]}>
            A Prophecy of Destiny for Every Generation
          </Title>
        </div>

        <div className="grid gap-10 mb-8 grid-cols-[1fr_0.8fr]">
          <div className="space-y-8">
            <Quote author="Revelation 7:9">
              For the vision is yet for an appointed time; though it tarry, wait
              for it, because it will surely come, it will not delay.
            </Quote>

            <P>
              From the ancient warnings of the prophets to the rise of nations
              today, the story has always been about one promise: the return of
              the chosen, and the breakthrough that changes everything. History
              is filled with rulers, empires, and deceivers but prophecy tells
              us of a people, scattered yet sovereign, carrying within them the
              key to eternity.
            </P>
            <P>
              The Dope Breakthrough is not just a book, it is the unveiling of a
              plan written before time. It speaks to Boomers, Gen X,
              Millennials, Gen Z, and Gen Alpha alike: every soul is called,
              every voice counted. The war that began in Heaven is reaching its
              final hour on Earth, and the generations must rise together.{" "}
              <em>
                This is not the end, it is the Beginning you already know.
              </em>
            </P>
          </div>

          <MotionInView
            as={motion.div}
            v={variants.fadeIn}
            viewport={{ once: true, amount: 0.5 }}
            className="overflow-hidden rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-2xl"
          >
            <motion.div
              variants={variants.wipeRight}
              style={{ willChange: "clip-path" }}
              className="w-full h-full"
            >
              <img
                src="/imgs/home-sec5.jpeg"
                alt=""
                className="block w-full h-auto object-cover"
              />
            </motion.div>

            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5" />
          </MotionInView>
        </div>
      </div>
    </section>
  );
};

export default Sec5;
