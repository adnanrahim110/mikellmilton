import { toast as hotToast } from "react-hot-toast";

const base = {
  duration: 1800,
  style: {
    whiteSpace: "nowrap",
    padding: "10px 14px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    fontWeight: 600,
    maxWidth: "calc(100vw - 24px)",
  },
};

export const toast = {
  success: (msg, opts) =>
    hotToast.success(msg, {
      ...base,
      ...opts,
      style: { ...base.style, background: "#10b981", color: "#fff", ...(opts?.style || {}) },
    }),
  error: (msg, opts) =>
    hotToast.error(msg, {
      ...base,
      ...opts,
      style: { ...base.style, background: "#ef4444", color: "#fff", ...(opts?.style || {}) },
    }),
  info: (msg, opts) =>
    hotToast(msg, {
      ...base,
      ...opts,
      icon: "ℹ️",
      style: { ...base.style, background: "#3b82f6", color: "#fff", ...(opts?.style || {}) },
    }),
  warning: (msg, opts) =>
    hotToast(msg, {
      ...base,
      ...opts,
      icon: "⚠️",
      style: { ...base.style, background: "#f59e0b", color: "#111827", ...(opts?.style || {}) },
    }),
};
