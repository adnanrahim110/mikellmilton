"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import React from "react";

const BookHover = ({ price, discountedPrice, img }) => {
  return (
    <div className="relative inline-block w-full after:table after:clear-both">
      <div className="perspective-distant group relative">
        <div
          className={cn(
            "relative inline-block w-full origin-[35%_50%] transform-3d transition-all duration-500",
            "[transform-style:preserve-3d]",
            "after:absolute after:-top-0.5 after:-bottom-0.5 after:left-[98.5%] after:w-[66px] after:z-0",
            "after:bg-[repeating-linear-gradient(to_right,_#f6f6f6,_#f6f6f6_5px,_#b0b0b0_5px,_#b0b0b0_6px)]",
            "after:origin-[0%_50%] after:[transform:rotateY(90deg)]",
            "group-hover:-rotate-y-[22deg]"
          )}
        >
          <Link
            href="/"
            aria-label="Buy the Book"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -right-[14px] z-[2]",
              "uppercase tracking-[1px] text-xs md:text-[13px] text-white",
              "w-1/2 lg:w-[65%] py-2.5 pl-5 pr-6 text-left",
              "rounded-l-md shadow-xl ring-1 ring-black/10",
              "bg-gradient-to-br from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700",
              "origin-[100%_0] group-hover:translate-3d group-hover:rotate-y-[22deg] transition-all duration-500",
              "after:absolute after:top-full after:right-0 after:border-t-[15px] after:border-r-[15px] after:border-transparent after:border-t-primary-600",
              "hover:after:border-t-primary-700"
            )}
          >
            <span className="ml-2.5">Buy the Book</span>
          </Link>

          <img
            src={img}
            alt=""
            className={cn(
              "relative z-[1] block w-full h-auto object-contain",
              "group-hover:rounded-r-md",
              "shadow-[0_20px_45px_-15px_rgba(0,0,0,0.35)]"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default BookHover;
