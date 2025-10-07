"use client";

import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

const variants = {
  warning: {
    Icon: AlertTriangle,
    border: "border-amber-300",
    bg: "from-amber-50 to-white",
    icon: "text-amber-700",
    titleClass: "text-amber-900",
    textClass: "text-amber-800",
    defaultTitle: "Email issue detected",
    defaultMessage: "We could not confirm your confirmation email was sent.",
  },
  success: {
    Icon: CheckCircle2,
    border: "border-emerald-300",
    bg: "from-emerald-50 to-white",
    icon: "text-emerald-700",
    titleClass: "text-emerald-900",
    textClass: "text-emerald-800",
    defaultTitle: "Email sent",
    defaultMessage: "Your confirmation email has been sent.",
  },
  error: {
    Icon: XCircle,
    border: "border-red-300",
    bg: "from-red-50 to-white",
    icon: "text-red-700",
    titleClass: "text-red-900",
    textClass: "text-red-800",
    defaultTitle: "Email could not be sent",
    defaultMessage: "Something went wrong while sending your email.",
  },
};

export default function EmailBanner({
  variant = "warning",
  title,
  message,
  onDismiss,
}) {
  const v = variants[variant] || variants.warning;
  const Icon = v.Icon;

  return (
    <div
      className={`rounded-3xl border ${v.border} bg-gradient-to-br ${v.bg} p-4 flex items-start gap-3`}
    >
      <Icon className={`w-5 h-5 ${v.icon} mt-0.5`} />
      <div className="flex-1">
        <div className={`font-semibold ${v.titleClass}`}>
          {title || v.defaultTitle}
        </div>
        <div className={`${v.textClass} text-sm`}>
          {message || v.defaultMessage} You can access files below.
        </div>
      </div>
      {onDismiss ? (
        <button
          className="text-sm underline hover:opacity-80"
          onClick={onDismiss}
        >
          Dismiss
        </button>
      ) : null}
    </div>
  );
}
