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
        <div className="w-2/12">
          <Link href="/"></Link>
        </div>
        <nav className="w-auto grow flex justify-between bg-secondary text-white py-5 px-8">
          <ul className="flex items-center justify-center gap-10">
            {NAVIGATION_LINK.map((nav_link, idx) => (
              <li key={idx} className="relative">
                <Link href={nav_link.url}>{nav_link.title}</Link>
              </li>
            ))}
          </ul>
          <div>
            <Button tone="white">Buy now</Button>
          </div>
        </nav>
        <div className="w-20">
          <button className="size-full bg-primary text-white flex items-center justify-center">
            <ShoppingCart size={30} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
