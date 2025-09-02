"use client";

import { NAVIGATION_LINK } from "@/constants";
import { cn } from "@/utils/cn";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import Button from "../ui/Button";

const Header = () => {
  return (
    <header className={cn("absolute top-0 left-0 w-full z-[999] h-20")}>
      <div className="flex h-full">
        <div className="w-2/12 flex items-stretch">
          <Link href="/" className="w-full" />
        </div>

        <nav
          className={cn(
            "w-auto grow flex items-center justify-between",
            "bg-secondary-900/90 text-white backdrop-blur-md",
            "border-b border-white/10 ring-1 ring-white/5 shadow-md",
            "px-6 md:px-8"
          )}
        >
          <ul className="flex items-center justify-center gap-6 md:gap-10">
            {NAVIGATION_LINK.map((nav_link, idx) => (
              <li key={idx} className="relative">
                <Link
                  href={nav_link.url}
                  className="group relative inline-block text-sm md:text-base font-medium text-white hover:text-primary transition"
                >
                  <span>{nav_link.title}</span>
                  <span className="pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Button tone="white">Buy now</Button>
          </div>
        </nav>

        <div className="w-20">
          <button
            className={cn(
              "size-full flex items-center justify-center",
              "bg-primary text-secondary-950",
              "shadow-md hover:opacity-90 transition"
            )}
            aria-label="Cart"
          >
            <ShoppingCart size={26} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
