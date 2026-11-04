"use client";

import { useEffect, useState } from "react";

/** Мобайл дээр хөвөх "Бүртгүүлэх" CTA. Гүйлгэсний дараа гарч, бүртгэлийн секц харагдахад нуугдана. */
export default function FloatingCta() {
  const [scrolled, setScrolled] = useState(false);
  const [atRegister, setAtRegister] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const el = document.getElementById("register");
    let io: IntersectionObserver | undefined;
    if (el) {
      io = new IntersectionObserver(([e]) => setAtRegister(e.isIntersecting), { threshold: 0.05 });
      io.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const show = scrolled && !atRegister;
  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition duration-300 md:hidden ${
        show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <a
        href="#register"
        aria-label="Бүртгүүлэх хэсэг рүү очих"
        tabIndex={show ? 0 : -1}
        className={`rounded-full bg-brand px-8 py-3 text-sm font-semibold shadow-lg shadow-violet-500/40 active:scale-95 ${
          show ? "pointer-events-auto" : ""
        }`}
      >
        Бүртгүүлэх
      </a>
    </div>
  );
}
