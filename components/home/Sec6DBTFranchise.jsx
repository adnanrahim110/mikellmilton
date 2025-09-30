"use client";

import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";
import Button from "../ui/Button";
import ProgressiveImage from "../ui/ProgressiveImage";
import Title from "../ui/Title";

const Sec6DBTFranchise = () => {
  const posterSrc = "/imgs/dbt-franchise-poster.jpg";

  return (
    <section id="dbt-franchise" className="py-14 md:py-20 bg-background">
      <div className="container">
        <div className="w-full text-center pb-[2.5em]">
          <Title>
            <span className="text-primary">DBT Franchise —</span> Film Series
            Poster
          </Title>
        </div>

        <MotionInView variants={variants.fadeRise} className="w-full">
          <div className="mx-auto max-w-md rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/10 relative">
            <div className="bg-card/60 p-2 md:p-3">
              <div className="relative w-full">
                <ProgressiveImage
                  src={posterSrc}
                  alt="DBT Franchise — Film Poster"
                  width={2000}
                  height={1200}
                  priority
                />
              </div>
            </div>
          </div>
        </MotionInView>
      </div>
    </section>
  );
};

export default Sec6DBTFranchise;
