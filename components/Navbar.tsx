"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { getCurrentUser, logout } from "@/services/authService";

export default function Navbar() {
  const router = useRouter();
  const user = getCurrentUser();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div className="text-lg font-bold">
        <span className="text-brand-500">Pulse</span>
        <span className="text-slate-800">Notify</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-500">
          Halo, {user?.name || "User"}
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-600 transition hover:bg-brand-100"
        >
          <LogOut size={16} />
          Keluar
        </button>
      </div>
    </nav>
  );
}
