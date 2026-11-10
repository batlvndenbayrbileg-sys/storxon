import type { Metadata } from "next";
import Link from "next/link";
import { GLOSSARY } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Нэр томьёоны толь",
  robots: { index: false, follow: false },
};

export default function GlossaryPage() {
  const terms = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, "mn"));
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10 [color-scheme:light_dark] dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl">
        <Link href="/playground" className="text-sm font-semibold text-violet-600 hover:underline">
          ← Хичээл рүү буцах
        </Link>
        <h1 className="mt-3 text-3xl font-black tracking-tight">Нэр томьёоны толь</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Хичээлүүдэд тааралдах вэб хөгжүүлэлтийн үндсэн ойлголтууд.
        </p>
        <dl className="mt-6 grid gap-3">
          {terms.map((t) => (
            <div
              key={t.term}
              className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <dt className="font-bold">
                {t.term}
                {t.en && t.en !== t.term && (
                  <span className="ml-2 text-xs font-medium text-zinc-500">{t.en}</span>
                )}
              </dt>
              <dd className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{t.def}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
