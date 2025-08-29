import { cn } from "@/utils/cn";
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
  ...props
}) => {
  const Tag = href ? Link : "button";
  const tones = {
    dark: {
      bg: "bg-black",
      text: "text-white",
    },
    white: {
      bg: "bg-white",
      text: "text-black hover:text-white",
    },
  };
  const t = tones[tone] || tones.dark;

  return (
    <Tag
      {...(href ? { href } : { onClick, type, disabled })}
      {...props}
      className={cn(
        "overflow-hidden inline-block relative min-w-32 px-6 p-2 h-12 border-none rounded-md text-xl text-center font-bold cursor-pointer z-10 group btn",
        t.bg,
        t.text,
        className
      )}
    >
      {children}

      {[...Array(3)].map((_, i) => (
        <span
          key={i}
          className={cn(
            "absolute w-[115%] h-40 top-1/2 -translate-y-1/2 -left-4 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left",
            i === 0
              ? "bg-primary-200 group-hover:duration-500 duration-1000"
              : i === 1
              ? "bg-primary-400 group-hover:duration-700 duration-700"
              : "bg-primary group-hover:duration-1000 duration-500"
          )}
        />
      ))}

      <span
        className={cn(
          "group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 text-center absolute top-2.5 left-0 w-full z-10"
        )}
      >
        {children}
      </span>
    </Tag>
  );
};

export default Button;
