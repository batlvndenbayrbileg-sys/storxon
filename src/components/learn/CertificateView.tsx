"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { gradeableIds } from "@/components/learn/LessonSidebar";
import { LESSONS } from "@/lib/lessons/data";
import { loadProgress } from "@/lib/lessons/progress";

const NAME_KEY = "sx-cert-name";

/** Printable completion certificate. Name lives in localStorage only (no DB). */
export default function CertificateView() {
  const [name, setName] = useState("");
  const [finished, setFinished] = useState(0);
  const [ready, setReady] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    try {
      setName(localStorage.getItem(NAME_KEY) ?? "");
    } catch {
      /* ignore */
    }
    setDate(new Date().toLocaleDateString("mn-MN", { year: "numeric", month: "long", day: "numeric" }));
    let alive = true;
    loadProgress().then((d) => {
      if (!alive) return;
      const n = LESSONS.filter((l) => {
        const ids = gradeableIds(l);
        return ids.length > 0 && ids.every((id) => d[id]);
      }).length;
      setFinished(n);
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  const onName = (v: string) => {
    const clean = v.slice(0, 60);
    setName(clean);
    try {
      localStorage.setItem(NAME_KEY, clean);
    } catch {
      /* ignore */
    }
  };

  const total = LESSONS.length;
  const complete = ready && total > 0 && finished === total;
  const canPrint = name.trim().length > 0;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 space-y-3 print:hidden">
        <Link href="/playground" className="text-xs font-semibold uppercase tracking-wider text-violet-600 hover:underline">
          ‹ Хичээлүүд
        </Link>
        <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">Гэрчилгээ</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {ready ? `${finished}/${total} хичээл дууссан.` : "Явцыг ачаалж байна…"}{" "}
          {ready && !complete && "Бүх хичээлийг дуусгасны дараа гэрчилгээгээ хэвлэнэ."}
        </p>
        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Таны нэр
          <input
            value={name}
            onChange={(e) => onName(e.target.value)}
            maxLength={60}
            placeholder="Овог Нэр"
            className="mt-1 block w-full max-w-sm rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-normal text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </label>
        <button
          type="button"
          onClick={() => window.print()}
          disabled={!complete || !canPrint}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Хэвлэх
        </button>
      </div>

      <section
        aria-label="Гэрчилгээ"
        className="rounded-2xl border-4 border-double border-violet-600 bg-white p-10 text-center text-zinc-900 print:rounded-none print:border-violet-700"
      >
        <div className="text-sm font-extrabold uppercase tracking-[0.3em] text-violet-600">Storxon</div>
        <h2 className="mt-6 text-3xl font-extrabold">Гэрчилгээ</h2>
        <p className="mt-6 text-sm text-zinc-500">Энэхүү гэрчилгээг олгов</p>
        <p className="mt-3 min-h-[3rem] break-words border-b border-zinc-300 pb-2 text-3xl font-bold">
          {name.trim() || "—"}
        </p>
        <p className="mt-6 text-base text-zinc-700">
          Интерактив кодчлолын курсийн бүх {total} хичээлийг амжилттай дүүргэсэн болохыг батламжилж байна.
        </p>
        <p className="mt-8 text-sm text-zinc-500">{date}</p>
      </section>
    </div>
  );
}
