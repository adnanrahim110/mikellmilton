"use client";

import { Toaster } from "react-hot-toast";

export default function ToastHost() {
  return (
    <Toaster
      position="bottom-center"
      gutter={8}
      toastOptions={{
        duration: 1800,
        style: {
          whiteSpace: "nowrap",
          padding: "10px 14px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          fontWeight: 600,
          maxWidth: "calc(100vw - 24px)",
        },
        success: {
          style: { background: "#10b981", color: "#fff" },
        },
        error: {
          style: { background: "#ef4444", color: "#fff" },
        },
      }}
    />
  );
}
