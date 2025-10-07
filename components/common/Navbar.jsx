"use client";
import { cn } from "@/utils/cn";
import { Menu, ShoppingCart, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const Navbar = ({ navItems = [], setOpenCart }) => {
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current !== "number") return;

    const direction = current - scrollYProgress.getPrevious();
    if (typeof window !== "undefined" && window.scrollY === 0) {
      setVisible(true);
      return;
    }
    if (scrollYProgress.get() < 0.05) {
      setVisible(false);
    } else {
      setVisible(direction < 0);
    }
  });

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onDocClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        closeMobile();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [mobileOpen, closeMobile]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeMobile();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeMobile]);

  const cartItems = useSelector((state) => state.cart.items || []);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + (item?.quantity ?? 0),
    0
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -120 }}
        animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed inset-x-0 z-[999] w-full",
          "top-3 sm:top-4 md:top-5 lg:top-6"
        )}
      >
        <div className="relative px-3 sm:px-4">
          <div className="absolute left-2 sm:left-3 lg:left-5 -top-2 sm:-top-5 p-2 h-16 sm:h-[4.75rem] lg:h-28 rounded-xl bg-black/65 backdrop-blur-xs">
            <img src="/imgs/logo-w.png" className="h-full w-auto" alt="Logo" />
          </div>

          <div className="absolute w-full inset-x-0 mx-auto flex h-12 sm:h-14 md:h-16 items-center justify-center">
            <div className="hidden lg:flex border border-white/[0.2] rounded-full bg-black/75 backdrop-blur-xs shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-2.5 py-2 items-center justify-center space-x-4">
              {navItems.map((navItem, idx) => (
                <Link
                  key={`link-${idx}`}
                  href={navItem.url}
                  className={cn(
                    "relative items-center flex space-x-1 border font-medium rounded-full px-4 py-2 transition-colors btn whitespace-nowrap",
                    navItem.url === pathname
                      ? "border-white/25 text-primary bg-black/40"
                      : "border-transparent text-neutral-100 hover:border-white/15 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <span className="block sm:hidden">{navItem.icon}</span>
                  <span className="hidden sm:block">{navItem.title}</span>
                  {navItem.url === pathname && (
                    <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-primary to-transparent h-px" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="absolute right-3 sm:right-4 lg:right-5 flex items-center justify-end">
            <div className="lg:hidden">
              <button
                ref={btnRef}
                onClick={() => setMobileOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className={cn(
                  "flex items-center gap-2 rounded-full border border-white/[0.2]",
                  "bg-black/75 backdrop-blur-xs btn shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
                  "px-4 py-2 text-neutral-100"
                )}
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
                <span className="text-sm font-medium">Menu</span>
              </button>
            </div>
            <motion.button
              onClick={() => setOpenCart?.(true)}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={cn(
                "group",
                "size-12 sm:size-14 lg:size-16",
                "flex items-center justify-center rounded-full bg-black/65 backdrop-blur-xs btn border border-white/20 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-0"
              )}
              aria-label={`Open cart${
                cartItemCount ? `, ${cartItemCount} items` : ""
              }`}
              title="Open cart"
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="absolute -inset-1 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.22),rgba(255,255,255,0)_60%)] blur-md"
              />
              <motion.span
                className="absolute inset-0 rounded-full pointer-events-none"
                initial={false}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: cartItemCount ? [0.25, 0, 0.25] : 0,
                }}
                transition={{
                  duration: 1.2,
                  repeat: cartItemCount ? Infinity : 0,
                  ease: "easeOut",
                }}
                style={{ boxShadow: "0 0 0 2px rgba(255,255,255,0.22)" }}
              />
              <motion.div
                className="relative z-10"
                animate={{ rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 0.6, ease: "easeOut", repeat: 0 }}
                key={cartItemCount}
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </motion.div>
              <AnimatePresence>
                {cartItemCount > 0 && (
                  <motion.span
                    key={`count-${cartItemCount}`}
                    initial={{ scale: 0, y: -6 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0, y: -6 }}
                    transition={{ type: "spring", stiffness: 520, damping: 32 }}
                    className={cn(
                      "absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-red-500 text-white border border-white/80 shadow",
                      "min-w-4 h-4 text-[9px] px-1 sm:min-w-5 sm:h-5 sm:text-[10px] sm:px-1.5 lg:min-w-5 lg:h-5"
                    )}
                  >
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                ref={menuRef}
                role="menu"
                aria-label="Main menu"
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className={cn(
                  "lg:hidden",
                  "absolute left-1/2 -translate-x-1/2 mt-16 w-[90vw] max-w-sm",
                  "rounded-2xl border border-white/20 bg-black/80 backdrop-blur-xs",
                  "shadow-[0px_10px_30px_rgba(0,0,0,0.35)] overflow-hidden"
                )}
              >
                <div>
                  {navItems.map((navItem, idx) => {
                    const active = navItem.url === pathname;
                    return (
                      <Link
                        key={`mitem-${idx}`}
                        href={navItem.url}
                        role="menuitem"
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 text-sm transition-colors",
                          "focus:outline-none focus:bg-white/10",
                          active
                            ? "text-primary bg-white/5"
                            : "text-neutral-100 hover:bg-white/5"
                        )}
                        onClick={closeMobile}
                      >
                        <span className="shrink-0">{navItem.icon}</span>
                        <span className="truncate">{navItem.title}</span>
                        {active && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
