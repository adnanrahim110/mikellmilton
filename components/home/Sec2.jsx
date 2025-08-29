"use client";

import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import React from "react";
import BookHover from "../ui/BookHover";
import Subtitle from "../ui/Subtitle";
import Title from "../ui/Title";

const Sec2 = () => {
  return (
    <section className="py-[80px_140px]">
      <div className="container">
        <Subtitle tone="dark" svgClass="-rotate-180 -scale-x-100">
          Aleph-Tav “Strength of the Covenant”
        </Subtitle>
        <div className="grid lg:grid-cols-[1.8fr_1fr] gap-20">
          <div>
            <Title className="mb-5">
              The DBT Franchise Ministry Presents...
            </Title>
            <div>
              <MotionInView
                as={motion.p}
                v={variants.fadeRise}
                duration={1.5}
                viewport={{ once: true, amount: 0.5 }}
                className="mb-5"
              >
                The Prophecy of Sovereignty For the Royal House of Judah (Modern
                Day African-Americans)
              </MotionInView>
              <MotionInView
                as={motion.p}
                v={variants.fadeRise}
                duration={1.5}
                viewport={{ once: true, amount: 0.5 }}
              >
                During his ministry in 627 B.C., Jeremiah, the Hebrew-Israelite
                prophet from the tribe of Levi, warned three of the twelve
                tribes of a present and future danger. In the ancient world, 70
                nation-states, some eventually achieving empire status, were
                governed by the Elohim, one supreme god or a pantheon of gods.
                History is chock-full of demigod legends: Titans battling
                Olympians and their mortal servants, magicians, pharaohs, kings,
                and Caesars, all waging wars and making pacts in order to secure
                wealth, power and fame. But there is one ancient tale that 70
                united nations around the world agreed to keep secret… At the
                End of the Age, 144,000 combat-sport tested Sol officers, the
                most highly decorated war-gamers in the Kingdom of Amen-Amensa,
                would be sent to the most violent and dangerous battlefield in
                the solar system to WIN the war that began in Heaven. General
                K’el and his war-gamers have broken through!
              </MotionInView>
            </div>
          </div>
          <div>
            <BookHover img="/imgs/book_cover.png" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec2;
