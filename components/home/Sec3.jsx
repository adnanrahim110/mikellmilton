"use client";

import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";
import { TextScroll } from "../ui/TextScroll";

const Sec3 = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [1.4, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={sectionRef} className="relative w-full">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-14 -left-16 h-[380px] w-[380px] rounded-full bg-primary/20 blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl opacity-60" />
      </div>

      <div className="w-full h-[500px] xl:h-[600px] xxl:h-[710px] relative z-[1] overflow-hidden">
        <motion.img
          src="/imgs/home-sec3.jpeg"
          alt=""
          decoding="async"
          className="size-full object-cover"
          style={{
            scaleY,
            y,
            transformOrigin: "50% 50%",
            willChange: "transform",
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/10 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="absolute left-0 w-full -bottom-1.5 lg:-bottom-10">
          <TextScroll
            className="font-extrabold uppercase leading-none text-shadow-[4px_4px_0px] text-shadow-primary-700 text-black text-7xl md:text-9xl xl:text-[170px] xl:h-[204px] xxl:text-[235px] align-baseline"
            text="The dope breakthrough&nbsp;&nbsp;"
            default_velocity={2}
          />
        </div>
      </div>
    </section>
  );
};

export default Sec3;
