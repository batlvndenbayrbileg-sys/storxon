"use client";

import { useEffect, useState } from "react";

const KEY = "sx-theme";

/** Гараар dark/light солих товч. Сонголтыг localStorage (`sx-theme`)-д хадгална. */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Гэрэл горим руу шилжих" : "Харанхуй горим руу шилжих"}
      title={dark ? "Гэрэл горим" : "Харанхуй горим"}
      className="grid size-9 place-items-center rounded-lg border border-zinc-200 bg-white text-base text-zinc-700 hover:border-violet-400 print:hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
    >
      <span aria-hidden>{dark ? "☀️" : "🌙"}</span>
    </button>
  );
}
