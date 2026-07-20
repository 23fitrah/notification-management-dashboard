"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/services/authService";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace(isAuthenticated() ? "/products" : "/login");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center text-slate-400">
      Memuat...
    </div>
  );
}
