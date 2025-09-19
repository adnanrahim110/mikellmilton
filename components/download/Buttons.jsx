"use client";

export function PrimaryButton({ href, children, className = "", ...props }) {
  const Comp = href ? "a" : "button";
  return (
    <Comp
      href={href}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-2xl",
        "px-4 py-2 text-sm font-medium text-white",
        "bg-gradient-to-r from-primary to-primary/80",
        "shadow-sm transition-all duration-150",
        "hover:shadow-md hover:-translate-y-[1px] active:translate-y-0",
        "focus:outline-none focus:ring-2 focus:ring-primary/30",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </Comp>
  );
}
