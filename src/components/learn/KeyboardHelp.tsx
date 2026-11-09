"use client";

import { useEffect, useRef, useState } from "react";

const SHORTCUTS: { keys: string[]; label: string }[] = [
  { keys: ["?"], label: "Энэ тусламжийн самбарыг нээх / хаах" },
  { keys: ["Esc"], label: "Самбар, жагсаалт, бүтэн дэлгэцийг хаах" },
  { keys: ["Ctrl", "Enter"], label: "Editor-т кодыг ажиллуулах (Mac: ⌘ Enter)" },
  { keys: ["Tab"], label: "Editor дотор догол мөр оруулах" },
  { keys: ["←", "→"], label: "Editor-ийн табуудын хооронд шилжих" },
];

function isTyping(t: EventTarget | null): boolean {
  if (!(t instanceof HTMLElement)) return false;
  return t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName);
}

export default function KeyboardHelp() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "?" || e.ctrlKey || e.metaKey || e.altKey || isTyping(e.target)) return;
      e.preventDefault();
      setOpen((o) => !o);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <button
        type="button"
        aria-label="Хаах"
        tabIndex={-1}
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/50"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Гарын товчлол"
        className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-50">Гарын товчлол</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Хаах"
            className="grid size-8 place-items-center rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            ✕
          </button>
        </div>
        <ul className="space-y-2">
          {SHORTCUTS.map((s) => (
            <li key={s.label} className="flex items-center justify-between gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <span>{s.label}</span>
              <span className="flex shrink-0 gap-1">
                {s.keys.map((k) => (
                  <kbd key={k} className="rounded-md border border-zinc-300 bg-zinc-50 px-1.5 py-0.5 text-xs font-bold dark:border-zinc-700 dark:bg-zinc-800">
                    {k}
                  </kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
