import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: "PulseNotify | Aplikasi Manajemen Notifikasi",
  description: "Aplikasi Manajemen Notifikasi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased bg-slate-100 text-slate-800">
        <ToastProvider />
        {children} 
      </body>
    </html>
  );
}
