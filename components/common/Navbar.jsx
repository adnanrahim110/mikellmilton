"use client";
import { cn } from "@/utils/cn";
import { ShoppingCart } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../ui/Button";

export const Navbar = ({ navItems, setOpenCart }) => {
  const { scrollYProgress } = useScroll();

  const pathname = usePathname();

  const [visible, setVisible] = useState(true);
  const [cartHover, setCartHover] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (window.scrollY === 0) {
        setVisible(true);
        return;
      } else if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -120,
        }}
        animate={{
          y: visible ? 0 : -120,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="fixed top-6 inset-x-0 z-[999]"
      >
        <div className="relative">
          <div className="absolute left-5 -top-5 p-2.5 h-28 rounded-xl bg-black/65 backdrop-blur-xs">
            <img src="/imgs/logo-w.png" className="w-auto h-full" alt="" />
          </div>
          <div
            className={cn(
              "flex absolute items-center justify-center h-16 inset-x-0 max-w-fit mx-auto"
            )}
          >
            <div className="flex border border-white/[0.2] rounded-full bg-black/75 backdrop-blur-xs shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-2.5 py-2 items-center justify-center space-x-4">
              {navItems.map((navItem, idx) => (
                <Link
                  key={`link=${idx}`}
                  href={navItem.url}
                  className={cn(
                    "relative items-center flex space-x-1 border font-medium rounded-full px-4 py-2 transition-colors btn",
                    navItem.url === pathname
                      ? "border-white/25 text-primary bg-black/40"
                      : "border-transparent text-neutral-100 hover:border-white/15 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <span className="block sm:hidden">{navItem.icon}</span>
                  <span className="hidden sm:block">{navItem.title}</span>
                  {navItem.url === pathname && (
                    <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-primary to-transparent  h-px" />
                  )}
                </Link>
              ))}
            </div>
            <Button tone="dark" className="rounded-full h-16">
              Buy Now
            </Button>
          </div>
          <motion.button
            onClick={() => setOpenCart(true)}
            whileHover={{ y: -2, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group absolute right-5 size-16 flex items-center justify-center rounded-full bg-black/65 backdrop-blur-xs btn border border-white/20 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-0"
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
              <ShoppingCart size={28} />
            </motion.div>
            <AnimatePresence>
              {cartItemCount > 0 && (
                <motion.span
                  key={`count-${cartItemCount}`}
                  initial={{ scale: 0, y: -6 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: -6 }}
                  transition={{ type: "spring", stiffness: 520, damping: 32 }}
                  className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] leading-none grid place-items-center border border-white/80 shadow"
                >
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
