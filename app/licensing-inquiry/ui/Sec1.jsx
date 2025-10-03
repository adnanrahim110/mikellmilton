"use client";

import Button from "@/components/ui/Button";
import P from "@/components/ui/P";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";

const licensingText = [
  <>
    The DBT Franchise’s <strong>TEMPLE GARDEN License Agreement</strong> - for
    UNICEF, Government Entities, Corporations and Religious Institutions –
    provides simple, comprehensive and affordable access to The DOPE
    Breakthrough E-Book and EB-Album to enlighten and educate your citizens,
    employees, parishioners and church members.
  </>,
  "In the 21st century, providing humanitarian and developmental aid to children, teenagers, and young adults doesn’t require mass marketing or magic. In 2025, if you were to ask children in the U.S., Brazil or Niger who Antonio Guterres is, “Antonio who?” would be their likely response. Yet UN Secretary General Guterres and the United Nations International Children’s Emergency Fund help save children’s lives in over 190 countries.",
  "Apple, Coca-Cola, Microsoft, Time Warner, Mattel, ByteDance, Abu Dhabi’s MGX and many other international giants have billions of dollars to invest in a positive, worldwide phenomenon if they view healthy minded children, teenagers and young adults as assets.",
  <>
    If music connects people, then <strong>The DOPE Breakthrough’s</strong>{" "}
    EB-Album will not only build bridges of unity, but will also serve as a
    universal tool to help people from different cultures and backgrounds
    transcend into a higher and rewarding reality.
  </>,
];

const Sec1 = () => {
  return (
    <section className="relative pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-20 h-[380px] w-[380px] rounded-full bg-primary/20 blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl opacity-60" />
      </div>

      <div className="container">
        <Subtitle tone="dark" svgClass="-rotate-180 -scale-x-100">
          Licensing Inquiry
        </Subtitle>
        <Title className="mb-10">How Licensing Can Make a Big Difference</Title>

        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            {licensingText.map((t, i) => (
              <P key={i} duration={1.1} className="not-last:mb-1 text-base">
                {t}
              </P>
            ))}
          </div>

          <div className="relative flex flex-col justify-center">
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
                  src="/imgs/temple.png"
                  alt=""
                  className="block w-full h-auto object-cover"
                />
              </motion.div>

              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5" />
            </MotionInView>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec1;
