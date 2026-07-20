"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Facebook, Linkedin } from "lucide-react";
import toast from "react-hot-toast";
import { login } from "@/services/authService";
import AdCarousel from "../../components/AdCarousel"

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email dan password wajib diisi");
      return;
    }
    setLoading(true);
    try {
      toast.error("Email atau password salah");

    //  await login({ email, password });
     // toast.success("Berhasil masuk!");
     // router.push("/products");
    } catch (err) {
      toast.error("Email atau password salah");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-xl2 bg-white shadow-card md:grid-cols-2">
        {/* Left: form */}
        <div className="flex flex-col justify-center px-8 py-12 sm:px-14">
          <div className="mb-10 text-lg font-bold">
            <span className="text-brand-500">Pulse</span>
            <span className="text-slate-800">Notify</span>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-brand-500">
            Masuk ke Akun
          </h1>
          <div className="mb-6 h-1 w-10 rounded bg-brand-500" />

          <div className="mb-4 flex gap-3">
            {[Facebook, Linkedin].map((Icon, i) => (
              <button
                key={i}
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand-300 hover:text-brand-500"
              >
                <Icon size={16} />
              </button>
            ))}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-sm font-bold text-slate-500 transition hover:border-brand-300 hover:text-brand-500"
            >
              G
            </button>
          </div>

          <p className="mb-6 text-sm text-slate-400">
            atau gunakan akun email
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 rounded-md bg-slate-100 px-4 py-3">
              <Mail size={18} className="text-slate-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 rounded-md bg-slate-100 px-4 py-3">
              <Lock size={18} className="text-slate-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-500">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-400"
                />
                Ingat aku
              </label>
              <a href="#" className="text-slate-500 hover:text-brand-500">
                Lupa Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-brand-500 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>

        {/* Right: green panel */}
        <div className="hidden flex-col items-center justify-center bg-brand-500 px-10 py-12 text-center text-white md:flex">
           <div className="hidden md:block md:w-full">
            <AdCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
