"use client";

import { NAVIGATION_LINK } from "@/constants";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Shield,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../ui/Button";

const DonutMini = ({ value = 80 }) => {
  return (
    <div className="relative size-16 ">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(hsl(45 100% 50%) ${value}%, rgba(0,0,0,.08) 0)`,
        }}
      />
      <div className="absolute inset-[6px] rounded-full bg-white/90 ring-1 ring-black/5" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-[10px] font-bold text-secondary-900">
          {value}%
        </span>
      </div>
    </div>
  );
};

const Footer = ({ links = NAVIGATION_LINK }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-36 h-[420px] w-[520px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px, 22px 22px",
          }}
        />
      </div>
      <div className="container">
        <div className="relative overflow-hidden rounded-4xl border border-white/40 bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-[0_25px_80px_-30px_rgba(0,0,0,.3)]">
          <div className="h-1.5 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
          <div className="flex flex-wrap justify-between gap-10 p-8 md:p-12">
            <div className="w-full lg:basis-2/6 space-y-5">
              <Link href="/" className="inline-flex items-center gap-3">
                <Image
                  src="/imgs/logo.png"
                  width={200}
                  height={209}
                  alt="Mikell Milton Logo"
                  className="max-w-[120px]"
                />
              </Link>

              <p className="text-sm leading-relaxed text-secondary-700">
                Own the prophecy. Live the Breakthrough.
              </p>
            </div>
            <div className="w-full lg:basis-2/12">
              <h4 className="text-sm font-semibold text-secondary-900 mb-3">
                Explore
              </h4>
              <ul className="grid">
                {links?.map((l) => (
                  <li key={l.url}>
                    <Link
                      href={l.url}
                      className="group relative inline-block text-sm text-secondary-700 hover:text-primary-800 transition"
                    >
                      <span>{l.title}</span>
                      <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full lg:basis-2/5">
              <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/80 ring-1 ring-black/5 shadow-inner p-6 pb-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center size-10 rounded-lg bg-primary text-secondary-950 font-extrabold">
                    $
                  </span>
                  <div className="min-w-0">
                    <h5 className="text-sm font-semibold text-secondary-900">
                      Support the Mission
                    </h5>
                    <p className="text-xs text-secondary-700">
                      Every purchase fuels the work
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button tone="dark" className="rounded-xl text-xs">
                    Buy E-Book
                  </Button>
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-secondary-950 shadow hover:bg-primary-600 transition"
                  >
                    Buy EB - Album
                  </Link>
                  <a
                    href="https://www.Jeremiah31eight-31.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/40 bg-white px-3 py-2 text-xs font-semibold text-secondary-900 shadow-inner hover:bg-white/90 transition"
                  >
                    <Shield className="h-3.5 w-3.5 text-primary-700" />
                    J-31 Plan
                  </a>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
              </div>
            </div>
          </div>
          <div className="border-t border-white/50 bg-white/65 px-6 md:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-secondary-600">
            <div>
              © {year} Mikell M. Miltion & L.A. Doyle . All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="hover:text-primary-800 transition"
              >
                Privacy Policy
              </Link>
              <span className="h-3 w-px bg-secondary-300" />
              <Link href="/terms" className="hover:text-primary-800 transition">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="h-5" />
    </footer>
  );
};

export default Footer;
