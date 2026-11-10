"use client";

import { useEffect, useState } from "react";

const KEY = "sx-difficulty-feedback"; // { [lessonId]: 1 | 2 | 3 }

const OPTIONS: { value: 1 | 2 | 3; label: string }[] = [
  { value: 1, label: "Хялбар" },
  { value: 2, label: "Дунд" },
  { value: 3, label: "Хэцүү" },
];

function read(): Record<string, number> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) ?? {} : {};
  } catch {
    return {};
  }
}

export default function DifficultyFeedback({ lessonId }: { lessonId: string }) {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    setValue(read()[lessonId] ?? null);
  }, [lessonId]);

  const pick = (v: number) => {
    setValue(v);
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...read(), [lessonId]: v }));
    } catch {
      /* private mode / quota — ignore */
    }
  };

  return (
    <section
      aria-label="Хичээлийн хүндрэлийн санал"
      className="print:hidden mt-8 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Энэ хичээл хэр хэцүү байсан бэ?</p>
      <div role="group" aria-label="Хүндрэлийн түвшин" className="mt-3 flex flex-wrap gap-2">
        {OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => pick(o.value)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${
              value === o.value
                ? "border-violet-600 bg-violet-600 text-white"
                : "border-zinc-300 text-zinc-700 hover:border-violet-400 dark:border-zinc-700 dark:text-zinc-300"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      {value !== null && (
        <p role="status" className="mt-2 text-xs text-zinc-500">Баярлалаа! Санал хадгалагдлаа.</p>
      )}
    </section>
  );
}
