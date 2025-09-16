import { cn } from "@/utils/cn";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

const Button = ({
  children,
  className,
  onClick,
  type = "button",
  disabled = false,
  href,
  tone = "white",
  size = "md",
  fullWidth = false,
  ...props
}) => {
  const Tag = href ? Link : "button";
  const isButton = !href;
  const isDisabled = Boolean(disabled) && isButton;

  const tones = {
    dark: {
      bg: "bg-black",
      text: "text-white",
    },
    white: {
      bg: "bg-white",
      text: "text-black hover:text-white",
    },
    cart: {
      bg: "bg-black",
      text: "text-white",
    },
  };
  const t = tones[tone] || tones.dark;

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md gap-1.5",
    md: "px-4 py-2.5 text-base rounded-lg gap-2",
    lg: "px-5 py-3 text-lg rounded-xl gap-2.5",
  };
  const s = sizes[size] || sizes.md;

  const disabledBase = "cursor-not-allowed opacity-70";
  const disabledNeutralColors = "bg-neutral-200 text-neutral-500";
  const disabledCartColors =
    "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300";

  const showCartDone = isDisabled && tone === "cart";

  return (
    <Tag
      {...(href ? { href } : { onClick, type, disabled })}
      aria-disabled={isDisabled ? "true" : undefined}
      {...props}
      className={cn(
        "relative inline-flex items-center justify-center select-none whitespace-nowrap align-middle border-none font-semibold leading-none transition overflow-hidden",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 btn",
        fullWidth && "w-full",
        !isDisabled && "cursor-pointer group",
        isDisabled && disabledBase,
        !isDisabled && t.bg,
        !isDisabled && t.text,
        isDisabled &&
          (showCartDone ? disabledCartColors : disabledNeutralColors),
        s,
        className
      )}
    >
      {showCartDone && <Check size={18} className="-ml-0.5" />}

      <span className="relative z-[1] inline-flex items-center gap-2">
        {children}
      </span>

      {!isDisabled && (
        <>
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className={cn(
                "absolute w-[150%] h-40 top-1/2 -translate-y-1/2 -left-4 rotate-[7deg] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-[2]",
                i === 0
                  ? "bg-primary-200 group-hover:duration-500 duration-1000"
                  : i === 1
                  ? "bg-primary-400 group-hover:duration-700 duration-700"
                  : "bg-primary group-hover:duration-1000 duration-500"
              )}
            />
          ))}

          <span className="absolute inset-0 z-10 inline-flex items-center justify-center gap-2 opacity-0 duration-100 group-hover:opacity-100 group-hover:duration-1000">
            {children}
          </span>
        </>
      )}
    </Tag>
  );
};

export default Button;
