import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import React from "react";
import P from "../ui/P";
import Title from "../ui/Title";

const Sec10 = () => {
  return (
    <section className="relative py-28">
      <div className="container">
        <div className="grid lg:grid-cols-[0.75fr_1fr] gap-10 items-center">
          <MotionInView
            as={motion.div}
            v={variants.fadeIn}
            viewport={{ once: true, amount: 0.5 }}
            className="overflow-hidden"
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
          </MotionInView>
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
