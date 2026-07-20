"use client";

import { useEffect, useState } from "react";
import { Rocket, BellRing, ShieldCheck, LucideIcon } from "lucide-react";
import Image from "next/image"

interface Slide {
  icon: LucideIcon;
  image : string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    icon: Rocket,
    image : "assets/img/dashboard.svg",
    title: "Dashboard Intuitif",
    description: "Nikmati dashboard yang sederhana dan mudah digunakan untuk mengelola notifikasi dengan lebih cepat dan efisien.",
  },
  {
    icon: BellRing,
    image : "assets/img/notif.svg",
    title: "Notifikasi Real-time",
    description: "Pantau setiap aktivitas dan status notifikasi secara langsung tanpa perlu me-refresh halaman.",
  },
  {
    icon: ShieldCheck,
    image : "assets/img/secure.svg",
    title: "Aman Terpercaya",
    description: "Lindungi data dan notifikasi dengan sistem keamanan modern dan enkripsi end-to-end.",
  },
];


const AUTO_SLIDE_MS = 5000;

export default function AdCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-brand-500">
      {/* Track yang digeser pakai translateX */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${(100 / slides.length) * active}%)`,
        }}
      >
        {slides.map((slide, i) => {
          const Icon = slide.icon;
          return (
            <div
              key={i}
              className="flex h-full flex-col items-center justify-center px-10 text-center text-white"
              style={{ width: `${100 / slides.length}%` }}
            >
               <Image
                    src={slide.image}
                    alt={slide.title}
                    width={200}
                    height={200}
                    className="mb-4"
                />
              <h3 className="mb-2 text-xl font-bold">{slide.title}</h3>
              <p className="text-sm text-white/90">{slide.description}</p>
            </div>
          );
        })}
      </div>

      {/* Dot indicator */}
      <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === active ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
