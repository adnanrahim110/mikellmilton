"use client";

import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import React from "react";
import BookHover from "../ui/BookHover";
import P from "../ui/P";
import Subtitle from "../ui/Subtitle";
import Title from "../ui/Title";

const Sec2 = () => {
  return (
    <section className="relative pt-[80px] pb-[140px]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-20 h-[380px] w-[380px] rounded-full bg-primary/20 blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl opacity-60" />
        <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('/imgs/texture2.jpg')] bg-center bg-no-repeat bg-[length:70%_80%]" />
      </div>

      <div className="container">
        <Subtitle tone="dark" svgClass="-rotate-180 -scale-x-100">
          Aleph-Tav “Strength of the Covenant”
        </Subtitle>

        <div className="grid lg:grid-cols-[1.8fr_1fr] gap-20">
          <div>
            <Title className="mb-5">
              The DBT Franchise Ministry Presents...
            </Title>

            <MotionInView
              as={motion.p}
              v={variants.fadeRise}
              duration={1.1}
              viewport={{ once: true, amount: 0.5 }}
              className="mb-5 text-secondary"
            >
              The Prophecy of Sovereignty For the Royal House of Judah (Modern
              Day African-Americans)
            </MotionInView>

            <P duration={1.1}>
              During his ministry in 627 B.C., Jeremiah, the Hebrew-Israelite
              prophet from the tribe of Levi, warned three of the twelve tribes
              of a present and future danger. In the ancient world, 70
              nation-states, some eventually achieving empire status, were
              governed by the Elohim, one supreme god or a pantheon of gods.
              History is chock-full of demigod legends: Titans battling
              Olympians and their mortal servants, magicians, pharaohs, kings,
              and Caesars, all waging wars and making pacts in order to secure
              wealth, power and fame. But there is one ancient tale that 70
              united nations around the world agreed to keep secret… At the End
              of the Age, 144,000 combat-sport tested Sol officers, the most
              highly decorated war-gamers in the Kingdom of Amen-Amensa, would
              be sent to the most violent and dangerous battlefield in the solar
              system to WIN the war that began in Heaven. General K’el and his
              war-gamers have broken through!
            </P>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-white/40 blur-xl opacity-50 pointer-events-none" />
            <div className="relative rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-2xl p-5">
              <BookHover img="/imgs/book_cover.png" />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec2;
