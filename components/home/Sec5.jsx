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
      <div className="container">
        <Subtitle icon={FaPeopleArrows}>The dope break through</Subtitle>
        <div className="space-y-6 mb-16">
          <Title after={[{ word: 2, src: "/imgs/sec5_title.jpg" }]}>
            A 21st Century Prophecy for the Boomers, GEN X, Millennials, GEN Z,
            and GEN ALPHA.
          </Title>
        </div>
        <div className="grid gap-10 mb-8 grid-cols-[1fr_0.8fr]">
          <div className="space-y-8">
            <Quote author="Revelation 7:9">
              After this I looked, and there before me was a great multitude
              that no one could count, from every nation, tribe, people and
              language, standing before the throne and before the Lamb. They
              were wearing white robes and were holding palm branches in their
              hands.
            </Quote>
            <P>
              So let us answer the first question. Yes, there are traitors in
              our midst; from every nation. Bullies and Wizards working for the
              EOM have pulled off one of the greatest deceptions of all-time.
              You were lied to. Millions of “Blacks”, specifically those living
              in Canada and the U.S., are in reality not Africans, but rather
              Nubeing Sols, descendants of royal and noble Israelite Spirit
              combatants trafficked in the Transatlantic Slave Trade. Why? The
              Genesis 15 prophecy foretold America’s future. Millions would fall
              victim to the Religious Ego Rebels and Tech Titans waging an armed
              insurgency against Sol children. The DOPE Breakthrough was a
              mission that U.S. Patriots couldn’t or weren’t willing to
              sacrifice their ALL to expedite the Return of Christ-King Yashiah.
              U.S. Slavery transformed Israelite Sol DNA. It was a risky
              400-year venture, but it worked. Mission Accomplished. The EOM’s
              Westworld is falling... It’s time to go! But you must know how to
              BREAKTHROUGH!
            </P>
          </div>
          <MotionInView
            as={motion.div}
            v={variants.fadeIn}
            viewport={{ once: true, amount: 0.5 }}
            className="overflow-hidden"
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
          </MotionInView>
        </div>
      </div>
    </section>
  );
};

export default Sec5;
