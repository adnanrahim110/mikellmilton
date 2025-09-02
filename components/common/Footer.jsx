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
import Link from "next/link";
import React from "react";

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
    <footer className="relative mt-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-36 h-[520px] w-[520px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-0 opacity-25 mix-blend-multiply bg-[url('/imgs/texture2.jpg')] bg-top bg-no-repeat bg-[length:70%_80%]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px, 22px 22px",
          }}
        />
      </div>
      <div className="container mb-5">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="group relative flex items-center justify-center overflow-hidden rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-2xl">
            <div className="absolute -right-16 -top-16 size-44 rounded-full bg-primary/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="flex items-center gap-4 p-5 md:px-5 md:py-3">
              <div className="grow-0 shrink-0 basis-auto">
                <DonutMini value={80} />
              </div>
              <div className="flex flex-col">
                <div className="min-w-0">
                  <h4 className="text-base font-semibold text-secondary-900">
                    DBT Fundraiser
                  </h4>
                  <p className="text-xs mt-1 text-secondary-700">
                    80% goes to the CPOYI Sovereign Wealth Fund
                  </p>
                </div>
                <a
                  href="https://www.Jeremiah31eight-31.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto -mt-3 inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-white/90 px-3 py-2 text-xs font-semibold text-secondary-900 shadow-inner hover:bg-white transition"
                >
                  J-31 Plan <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="group relative flex items-center justify-center overflow-hidden rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-2xl">
            <div className="absolute -left-16 -bottom-16 size-44 rounded-full bg-primary/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-4 p-5 md:px-5 md:py-3">
              <div className="min-w-0">
                <h4 className="text-base font-semibold text-secondary-900">
                  Buy the Book
                </h4>
                <p className="text-sm text-secondary-700">
                  Print, eBook, and audiobook formats
                </p>
              </div>
              <div className="grow-0 shrink-0 basis-auto">
                <Link
                  href="/shop"
                  className="ml-auto inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-secondary-950 shadow hover:bg-primary-600 transition"
                >
                  Visit Shop <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="group relative flex items-center justify-center overflow-hidden rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-2xl">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute -right-10 -top-10 size-36 rounded-full bg-primary/10 blur-2xl" />
            </div>
            <div className="px-5 md:px-5 md:py-3 w-full">
              <h4 className="text-base font-semibold text-secondary-900 mb-2">
                Get updates
              </h4>
              <form
                className="flex items-stretch gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-white/60 bg-white/85 px-3 py-2.5 text-sm text-secondary-900 placeholder:text-secondary-400 shadow-inner focus:outline-none focus:ring-4 focus:ring-primary/25"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2.5 text-xs font-semibold text-secondary-950 shadow hover:bg-primary-600 transition"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="relative overflow-hidden rounded-4xl border border-white/40 bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-[0_25px_80px_-30px_rgba(0,0,0,.3)]">
          <div className="h-1.5 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
          <div className="flex flex-wrap justify-between gap-10 p-8 md:p-12">
            <div className="w-full lg:basis-[30%] space-y-5">
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="relative grid place-items-center size-12 rounded-xl">
                  <span className="absolute inset-0 rounded-xl bg-primary/25" />
                  <span className="relative z-10 font-extrabold text-primary text-sm">
                    MMM
                  </span>
                </span>
                <span className="text-lg font-semibold text-secondary-900">
                  Mikell M. Milton
                </span>
              </Link>

              <p className="text-sm leading-relaxed text-secondary-700">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Tenetur nostrum.
              </p>

              <div className="flex items-center gap-3 pt-1">
                {[
                  {
                    Icon: Facebook,
                    href: "https://facebook.com/",
                    label: "Facebook",
                  },
                  {
                    Icon: Instagram,
                    href: "https://instagram.com/",
                    label: "Instagram",
                  },
                  {
                    Icon: Twitter,
                    href: "https://twitter.com/",
                    label: "Twitter",
                  },
                  {
                    Icon: Youtube,
                    href: "https://youtube.com/",
                    label: "YouTube",
                  },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="group size-9 grid place-items-center rounded-lg bg-secondary-900 text-white shadow-md hover:shadow-lg transition"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div className="w-full lg:basis-1/12">
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
            <div className="w-full lg:basis-[15%]">
              <h4 className="text-sm font-semibold text-secondary-900 mb-3">
                Contact
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 text-secondary-700">
                  <MapPin className="w-4 h-4 mt-0.5 text-secondary-500" />
                  <span>Lorem, ipsum dolor.</span>
                </li>
                <li className="flex items-start gap-2 text-secondary-700">
                  <Mail className="w-4 h-4 mt-0.5 text-secondary-500" />
                  <a
                    href="mailto:hello@dbt.example"
                    className="hover:text-primary-800 transition"
                  >
                    hello@example.com
                  </a>
                </li>
                <li className="flex items-start gap-2 text-secondary-700">
                  <Phone className="w-4 h-4 mt-0.5 text-secondary-500" />
                  <a
                    href="tel:+10000000000"
                    className="hover:text-primary-800 transition"
                  >
                    +1 000 000 0000
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full lg:basis-1/4">
              <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/80 ring-1 ring-black/5 shadow-inner p-4">
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
                <div className="mt-3 flex gap-2">
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
