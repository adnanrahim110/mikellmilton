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
            <span className="text-primary">DBT Franchise Presents:</span>
          </Title>
        </div>

        <MotionInView variants={variants.fadeRise} className="w-full">
          <div className="mx-auto max-w-md rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/10 relative">
            <div className="bg-card/60 p-2 md:p-3 flex flex-col gap-3">
              <div className="relative w-full">
                <ProgressiveImage
                  src={posterSrc}
                  alt="DBT Franchise — Film Poster"
                  width={2000}
                  height={1200}
                  priority
                />
              </div>
              <div className="flex flex-col items-start text-[#CE2029] gap-1">
                <strong>DBT Franchise THEATRICAL DEBUT</strong>
                <p className="text-[15px] text-[#CE2029]">
                  <strong> THE V.O.T.T.A.</strong> [The Voice of The Arch Angel]
                  Summer of 2027
                </p>
                <p className="text-[15px] text-[#CE2029]">
                  <strong>The D'EVILS</strong> Winter of 2027 (Techno Thriller)
                </p>
                <p className="text-[15px] text-[#CE2029]">
                  <strong>CANARY GOLD</strong> Spring of 2028 (A Heroine's
                  Journey)
                </p>
              </div>
            </div>
          </div>
        </MotionInView>
      </div>
    </section>
  );
};

export default Sec6DBTFranchise;
