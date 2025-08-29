"use client";

import React from "react";
import { FaPeopleArrows } from "react-icons/fa6";
import { LiaQuoteLeftSolid } from "react-icons/lia";
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
            <blockquote className="bg-primary-100 p-3 pl-[82px] relative">
              <span className="absolute -top-1.5 left-0 text-[78px] text-primary">
                <LiaQuoteLeftSolid />
              </span>
              <p className="leading-[1.4] text-base italic font-medium">
                After this I looked, and there before me was a great multitude
                that no one could count, from every nation, tribe, people and
                language, standing before the throne and before the Lamb. They
                were wearing white robes and were holding palm branches in their
                hands.
              </p>
              <span className="absolute -bottom-3 right-3 bg-primary-300 px-3 py-0.5 font-semibold text-sm">
                - Revelation 7:9
              </span>
            </blockquote>
            <p>
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
            </p>
          </div>
          <div>
            <img src="/imgs/home-sec5.jpeg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec5;
