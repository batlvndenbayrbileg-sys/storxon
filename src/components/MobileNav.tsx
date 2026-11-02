"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#about", label: "Сургалтын тухай" },
  { href: "#modules", label: "Хөтөлбөр" },
  { href: "#teacher", label: "Багш" },
  { href: "#pricing", label: "Үнэ" },
  { href: "#faq", label: "FAQ" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Цэс"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="grid size-9 place-items-center rounded-xl border border-line bg-white text-paper transition active:scale-95"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 top-[57px] z-30 bg-black/10" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute inset-x-0 top-full z-40 border-b border-line bg-white shadow-lg shadow-violet-500/5">
            <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-muted transition hover:bg-ink-2 hover:text-paper"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
