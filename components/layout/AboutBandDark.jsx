"use client";

import P from "@/components/ui/P";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { MotionInView, variants } from "@/utils/motion";
import { Compass, PenTool, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Quote from "../ui/Quote";

const AboutBandDark = () => {
  return (
    <section className="relative z-[1] bg-secondary py-[90px] md:py-[110px]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -left-28 h-[420px] w-[420px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
            backgroundSize: "22px 22px, 22px 22px",
          }}
        />
        <div className="absolute inset-0 opacity-20 mix-blend-multiply bg-[url('/imgs/texture2.png')] bg-center bg-no-repeat bg-[length:70%_80%]" />
      </div>

      <div className="container">
        <div className="grid items-center">
          <div className="space-y-6">
            <Subtitle tone="light" icon={PenTool} stroke={false}>
              OUR MISSION
            </Subtitle>

            <div className="relative">
              <MotionInView
                as={motion.div}
                v={variants.fadeRise}
                viewport={{ once: true, amount: 0.5 }}
                duration={0.9}
              >
                <Title tone="light" className="text-[clamp(28px,5vw,48px)]">
                  Writing vision. Revealing destiny.
                </Title>
              </MotionInView>

              <motion.span
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-2 left-0 h-[3px] w-32 rounded-full "
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,190,0,0) 0%, rgba(255,190,0,.9) 40%, rgba(255,190,0,0) 100%)",
                }}
              />
            </div>

            <MotionInView
              as={motion.div}
              v={variants.fadeRise}
              viewport={{ once: true, amount: 0.5 }}
              duration={0.9}
              delay={0.1}
            >
              <P className="text-secondary-50">
                Our purpose is simple yet eternal: to write, teach, and build so
                that others may see the path already written for them. Through
                The Dope Breakthrough – Divining Our Perfect Eternity, my work
                points to prophecy, identity, and destiny, calling this
                generation of the Diaspora to remember who they are and what
                they are here to do.
              </P>
              <Quote tone="dark" author="Habakkuk 2:2" className="mt-3.5 mb-7">
                Write the vision and make it plain on tablets, that he may run
                who reads it.
              </Quote>
              <P className="text-secondary-50">
                This is my charge: to record the vision, to make it clear, and
                to pass it forward so that others may move with purpose toward
                eternity.
              </P>
            </MotionInView>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBandDark;
