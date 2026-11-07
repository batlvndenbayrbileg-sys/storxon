"use client";

import { useState } from "react";
import { ArrowRight, BookOpen, Code2, Eye, Trophy } from "lucide-react";

/**
 * Landing "Хэрхэн ажилладаг" section: 4 steps + a tiny live playground.
 * The preview runs in <iframe sandbox="allow-scripts"> (no allow-same-origin),
 * so it cannot touch the app's cookies/session. No app data is injected.
 */

const STARTER = `<h1 id="t">Сайн уу, Storxon!</h1>
<p>Энэ текстийг засаад үр дүнг шууд хар.</p>
<style>
  body { font-family: system-ui, sans-serif; padding: 16px; }
  h1 { color: #5b4cf0; margin: 0 0 8px; }
</style>`;

const STEPS = [
  { icon: BookOpen, title: "Унш", body: "Богино, ойлгомжтой онол." },
  { icon: Code2, title: "Код засна", body: "Жишээг шууд хөтөч дээр өөрчил." },
  { icon: Eye, title: "Үр дүн хар", body: "Ажиллуулмагц preview шинэчлэгдэнэ." },
  { icon: Trophy, title: "Дасгал хий", body: "Шалгалт өгч, ахиц ахиулна." },
];

export default function HowItWorks() {
  const [code, setCode] = useState(STARTER);

  return (
    <section id="how" className="bg-ink-2">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="reveal mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="mb-4 inline-block rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
            Хэрхэн ажилладаг
          </p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Видео үзэхгүй — код бичиж сур</h2>
          <p className="mt-4 text-muted">Доорх жижиг editor-т оролдоод үз. Хичээл бүр яг ингэж явна.</p>
        </div>

        <ol className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              data-d={`${i * 70}ms`}
              className="reveal flex items-start gap-3 rounded-3xl border border-line bg-white p-5 shadow-sm"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-brand shadow-md shadow-violet-500/25">
                <s.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold">
                  {i + 1}. {s.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="reveal grid overflow-hidden rounded-3xl border border-line bg-white shadow-sm md:grid-cols-2">
          <div className="flex flex-col bg-zinc-900">
            <label htmlFor="how-editor" className="px-4 pt-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              HTML + CSS
            </label>
            <textarea
              id="how-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="min-h-64 flex-1 resize-y bg-transparent p-4 font-mono text-sm leading-relaxed text-zinc-100 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-400"
            />
          </div>
          <div className="flex flex-col border-t border-line md:border-l md:border-t-0">
            <p className="px-4 pt-3 text-xs font-semibold uppercase tracking-wide text-muted">Үр дүн</p>
            <iframe
              title="Жишээ playground-ийн үр дүн"
              sandbox="allow-scripts"
              srcDoc={`<!doctype html><html><head><meta charset="utf-8"></head><body>${code}</body></html>`}
              className="min-h-64 w-full flex-1 bg-white"
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/playground"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold shadow-md shadow-violet-500/25 transition hover:opacity-90 active:scale-95"
          >
            Хичээлүүдийг үзэх <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
