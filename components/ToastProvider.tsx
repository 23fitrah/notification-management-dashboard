"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: { fontSize: "14px" },
        success: { iconTheme: { primary: "#3cb878", secondary: "#fff" } },
      }}
    />
  );
}
