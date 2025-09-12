"use client";

import { NAVIGATION_LINK } from "@/constants";
import { cn } from "@/utils/cn";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Button from "../ui/Button";

const Header = () => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "absolute top-0 left-0 w-full z-[999] h-28 bg-secondary-900 shadow-md"
      )}
    >
      <div className="flex h-full">
        <div className="w-auto px-5 flex items-stretch p-2">
          <Link href="/" className="size-full flex items-center">
            <Image
              width={91.83}
              height={96}
              src="/imgs/logo-w.png"
              alt="Mikell Milton Logo"
              className="h-full max-h-[96px] w-auto"
            />
          </Link>
        </div>

        <nav
          className={cn(
            "w-auto grow flex items-center justify-end",
            "px-6 md:px-8"
          )}
        >
          <ul className="flex items-center justify-center gap-6 md:gap-14 grow">
            {NAVIGATION_LINK.map((nav_link, idx) => (
              <li key={idx} className="relative">
                <Link
                  href={nav_link.url}
                  className={cn(
                    "group relative inline-block text-sm md:text-base font-medium transition",
                    pathname === nav_link.url
                      ? "text-primary"
                      : " text-white hover:text-primary"
                  )}
                >
                  <span>{nav_link.title}</span>
                  <span
                    className={cn(
                      "pointer-events-none absolute left-0 -bottom-0.5 h-0.5 bg-primary transition-all duration-300",
                      pathname === nav_link.url
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Button tone="white">Buy now</Button>
          </div>
        </nav>

        <div className="w-28">
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
