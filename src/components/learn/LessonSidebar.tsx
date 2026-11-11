"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DAILY_GOAL } from "@/lib/lessons/daily";
import { readFavs, toggleFav } from "@/lib/lessons/favs";
import { DIFFICULTY_LABEL, difficultyOf, type Difficulty } from "@/lib/lessons/difficulty";
import type { Lesson } from "@/lib/lessons/types";
import BackupPanel from "@/components/learn/BackupPanel";

const DIFFICULTY_CLS: Record<Difficulty, string> = {
  easy: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200",
  hard: "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200",
};

export function gradeableIds(l: Lesson): string[] {
  const ids: string[] = [];
  l.blocks.forEach((b, i) => {
    if (b.kind === "exercise" || b.kind === "quiz") ids.push(`${l.id}:${i}`);
  });
  return ids;
}

/** Left sidebar: lessons grouped by module, active lesson highlighted, ✓ when finished. */
export default function LessonSidebar({
  lessons,
  activeId,
  doneIds,
  streak,
  xp,
  daily,
  hrefFor,
  open,
  onClose,
}: {
  lessons: Lesson[];
  activeId: string;
  doneIds: Set<string>;
  streak: number;
  xp: number;
  daily: number;
  hrefFor?: (id: string) => string;
  /** Mobile drawer state (ignored on lg+, where the sidebar is always visible). */
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [favs, setFavs] = useState<Set<string>>(() => new Set());
  useEffect(() => {
    setFavs(readFavs());
  }, []);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    // lg+ дээр sidebar модал биш — focus trap хэрэггүй, зөвхөн Esc.
    const isDrawer = !window.matchMedia("(min-width: 1024px)").matches;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(
        navRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);
    if (isDrawer) focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !isDrawer) return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!navRef.current?.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (isDrawer) previouslyFocused?.focus();
    };
  }, [open, onClose]);
  const q = query.trim().toLowerCase();
  const visible = q ? lessons.filter((l) => l.title.toLowerCase().includes(q)) : lessons;
  const modules = Array.from(new Set(visible.map((l) => l.module))).sort((a, b) => a - b);
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Жагсаалтыг хаах"
          tabIndex={-1}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}
    <nav
      ref={navRef}
      id="lesson-sidebar"
      aria-label="Хичээлийн жагсаалт"
      className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] shrink-0 overflow-y-auto bg-zinc-50 p-3 shadow-xl transition-transform duration-200 motion-reduce:transition-none dark:bg-zinc-950 ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:sticky lg:top-20 lg:z-auto lg:w-64 lg:max-w-none lg:translate-x-0 lg:self-start lg:overflow-visible lg:bg-transparent lg:p-0 lg:shadow-none dark:lg:bg-transparent`}
    >
      <div className="rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
        <button
          type="button"
          onClick={onClose}
          aria-label="Жагсаалтыг хаах"
          className="mb-2 ml-auto block rounded-lg px-2 py-1 text-sm text-zinc-500 hover:bg-zinc-100 lg:hidden dark:hover:bg-zinc-800"
        >
          ✕ Хаах
        </button>
        {doneIds.size === 0 && xp === 0 && lessons.length > 0 && (
          <div className="mb-3 rounded-lg border border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50 px-3 py-3 text-sm dark:border-violet-900 dark:from-violet-950/40 dark:to-fuchsia-950/30">
            <p className="font-bold text-violet-800 dark:text-violet-200">
              <span aria-hidden>🚀</span> Эхний алхмаа хийцгээе!
            </p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Явц 0% байна. Эхний хичээлээ дуусгаад оноо, streak цуглуулж эхэл.
            </p>
            {hrefFor && (
              <Link
                href={hrefFor(lessons[0].id)}
                onClick={onClose}
                className="mt-2 inline-block rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-700"
              >
                Эхний хичээлээс эхлэх →
              </Link>
            )}
          </div>
        )}
        {streak > 0 && (
          <div
            className="mb-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
            title="Өдөр бүр дараалан суралцсан хоног"
          >
            <span aria-hidden>🔥</span>
            <span>{streak} өдрийн streak</span>
          </div>
        )}
        {xp > 0 && (
          <div
            className="mb-3 flex items-center gap-2 rounded-lg bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-800 dark:bg-violet-950/40 dark:text-violet-200"
            title="Дуусгасан дасгал, шалгалт бүрт оноо"
          >
            <span aria-hidden>⭐</span>
            <span>{xp} XP</span>
          </div>
        )}
        <div
          className="mb-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
          title="Өдөр бүр хичээл дуусгах зорилго"
        >
          <div className="flex items-center justify-between font-semibold">
            <span>
              <span aria-hidden>🎯</span> Өнөөдрийн зорилго
            </span>
            <span>
              {Math.min(daily, DAILY_GOAL)}/{DAILY_GOAL}
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="Өнөөдрийн зорилго"
            aria-valuemin={0}
            aria-valuemax={DAILY_GOAL}
            aria-valuenow={Math.min(daily, DAILY_GOAL)}
            className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-emerald-200 dark:bg-emerald-900"
          >
            <div
              className="h-full rounded-full bg-emerald-500 transition-[width] duration-300 motion-reduce:transition-none"
              style={{ width: `${Math.min(100, (daily / DAILY_GOAL) * 100)}%` }}
            />
          </div>
          <p className="mt-1 text-xs">
            {daily >= DAILY_GOAL ? "Өнөөдрийн зорилго биелсэн! 🎉" : `${DAILY_GOAL} хичээл дуусга`}
          </p>
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Хичээл хайх…"
          aria-label="Хичээл хайх"
          className="mb-3 w-full rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-violet-900"
        />
        {q && visible.length === 0 && (
          <p className="px-2 py-1 text-sm text-zinc-500">Илэрц олдсонгүй</p>
        )}
        {modules.map((m) => (
          <div key={m} className="mb-3 last:mb-0">
            <div className="px-2 pb-1 text-xs font-bold uppercase tracking-wider text-violet-600">Модуль {m}</div>
            <ul className="space-y-1">
              {visible
                .filter((l) => l.module === m)
                .map((l) => {
                  const ids = gradeableIds(l);
                  const finished = ids.length > 0 && ids.every((id) => doneIds.has(id));
                  const active = l.id === activeId;
                  const faved = favs.has(l.id);
                  const cls = `flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${
                    active
                      ? "border-l-4 border-violet-600 bg-violet-100 pl-1 font-semibold text-violet-900 dark:border-violet-400 dark:bg-violet-900/40 dark:text-violet-100"
                      : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`;
                  const inner = (
                    <>
                      <span
                        aria-hidden
                        className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold leading-none ${
                          finished
                            ? "bg-emerald-500 text-white"
                            : "border-2 border-zinc-300 dark:border-zinc-600"
                        }`}
                      >
                        {finished ? "✓" : null}
                      </span>
                      <span className="min-w-0 flex-1">{l.title}</span>
                      <span
                        className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${DIFFICULTY_CLS[difficultyOf(l)]}`}
                        title="Хичээлийн хүндийн зэрэг"
                      >
                        <span className="sr-only">Хүндийн зэрэг: </span>
                        {DIFFICULTY_LABEL[difficultyOf(l)]}
                      </span>
                      {finished && <span className="sr-only">Дууссан</span>}
                    </>
                  );
                  return (
                    <li key={l.id} className="flex items-center gap-1">
                      {hrefFor ? (
                        <Link
                          href={hrefFor(l.id)}
                          aria-current={active ? "page" : undefined}
                          className={`${cls} min-w-0 flex-1`}
                          onClick={onClose}
                        >
                          {inner}
                        </Link>
                      ) : (
                        <div aria-current={active ? "page" : undefined} className={`${cls} min-w-0 flex-1`}>
                          {inner}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setFavs(toggleFav(l.id))}
                        aria-pressed={faved}
                        aria-label={faved ? `${l.title} — хадгалснаас хасах` : `${l.title} — хадгалах`}
                        title={faved ? "Хадгалснаас хасах" : "Хадгалах"}
                        className={`shrink-0 rounded-md px-1.5 py-1 text-base leading-none hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                          faved ? "text-amber-500" : "text-zinc-300 dark:text-zinc-600"
                        }`}
                      >
                        <span aria-hidden>{faved ? "★" : "☆"}</span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
        <BackupPanel />
      </div>
    </nav>
    </>
  );
}
