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
      <div className="w-full h-[710px] xl:h-[600px] xxl:h-[710px] relative z-[1] overflow-hidden">
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
        <div className="absolute left-0 w-full -bottom-10">
          <TextScroll
            className="font-extrabold uppercase leading-none text-shadow-[4px_4px_0px] text-shadow-primary-700 text-black text-[235px] xl:text-[170px] xl:h-[204px] xxl:text-[235px] align-baseline"
            text="The dope break through&nbsp;&nbsp;"
            default_velocity={2}
          />
        </div>
      </div>
    </section>
  );
};

export default Sec3;
