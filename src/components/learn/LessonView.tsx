"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import HighlightedCode from "@/components/learn/HighlightedCode";
import LessonSidebar, { gradeableIds } from "@/components/learn/LessonSidebar";
import Logo from "@/components/Logo";
import { LESSONS } from "@/lib/lessons/data";
import { loadProgress, markComplete } from "@/lib/lessons/progress";
import { getStreak, touchStreak } from "@/lib/lessons/streak";
import { DAILY_GOAL, getDailyCount, recordLessonToday } from "@/lib/lessons/daily";
import { computeXp, getXp, saveXp } from "@/lib/lessons/xp";
import { runCheck, type ExerciseCheck, type Lesson, type LessonBlock, type PlaygroundFiles } from "@/lib/lessons/types";

// Playground-г тусдаа chunk болгон ачаална (код хуваалт) — хичээлийн эхний ачаалал хөнгөрнө.
const Playground = dynamic(() => import("@/components/learn/Playground"), {
  loading: () => (
    <div
      role="status"
      aria-label="Playground ачаалж байна"
      className="h-48 animate-pulse rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
    />
  ),
});

/**
 * Renders one structured lesson: theory, read-only code, sandboxed playgrounds,
 * exercises (with deterministic checks), and quizzes. Reusable — there is no
 * hardcoded page per lesson. Completion is derived from meaningful activity
 * (passing every exercise + quiz), not from opening the page. Progress and the
 * student's edited code persist through src/lib/lessons/progress.ts — Supabase
 * when signed in (RLS per user), localStorage otherwise.
 */

/** Estimated minutes to read/do a lesson, derived from its blocks. */
function estimateMinutes(l: Lesson): number {
  let min = 0;
  for (const b of l.blocks) {
    switch (b.kind) {
      case "theory": {
        const words = b.html.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
        min += words / 150;
        break;
      }
      case "code":
        min += 0.5;
        break;
      case "playground":
        min += 1;
        break;
      case "exercise":
        min += 3;
        break;
      case "quiz":
        min += 1 + (b.more?.length ?? 0);
        break;
      default:
        break;
    }
  }
  return Math.max(1, Math.round(min));
}

export default function LessonView({
  lesson,
  lessons = LESSONS,
  hrefBase,
}: {
  lesson: Lesson;
  lessons?: Lesson[];
  /** e.g. "/playground" → lesson links become `${hrefBase}/${id}` (string, so it can cross the server→client boundary). */
  hrefBase?: string;
}) {
  const hrefFor = hrefBase ? (id: string) => `${hrefBase}/${id}` : undefined;
  const gradeable = lesson.blocks.filter((b) => b.kind === "exercise" || b.kind === "quiz").length;
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const [showTop, setShowTop] = useState(false);
  const [streak, setStreak] = useState(0);
  const [daily, setDaily] = useState(0);

  const [storedXp, setStoredXp] = useState(0);
  const [progressLoaded, setProgressLoaded] = useState(false);

  useEffect(() => {
    setStreak(getStreak());
    setDaily(getDailyCount());
    setStoredXp(getXp());
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    let alive = true;
    loadProgress().then((d) => {
      if (alive) {
        setDoneIds(new Set(Object.keys(d).filter((k) => d[k])));
        setProgressLoaded(true);
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  const markDone = useCallback((taskId: string) => {
    markComplete(taskId);
    setStreak(touchStreak());
    setDoneIds((prev) => new Set(prev).add(taskId));
  }, []);

  const doneCount = lesson.blocks.filter(
    (b, i) => (b.kind === "exercise" || b.kind === "quiz") && doneIds.has(`${lesson.id}:${i}`),
  ).length;
  const complete = gradeable > 0 && doneCount === gradeable;
  const finishedLessons = lessons.filter((l) => {
    const ids = gradeableIds(l);
    return ids.length > 0 && ids.every((id) => doneIds.has(id));
  }).length;
  const overallPct = lessons.length > 0 ? Math.round((finishedLessons / lessons.length) * 100) : 0;
  const tasksDone = lessons.reduce((n, l) => n + gradeableIds(l).filter((id) => doneIds.has(id)).length, 0);
  const derivedXp = computeXp(tasksDone, finishedLessons);
  const xp = Math.max(derivedXp, storedXp);
  useEffect(() => {
    if (doneIds.size > 0 && derivedXp > storedXp) saveXp(derivedXp);
  }, [doneIds, derivedXp, storedXp]);
  // Count lessons that flip to finished during this visit toward today's goal.
  const baselineFinished = useRef<Set<string> | null>(null);
  useEffect(() => {
    if (!progressLoaded) return;
    const finished = lessons
      .filter((l) => {
        const ids = gradeableIds(l);
        return ids.length > 0 && ids.every((id) => doneIds.has(id));
      })
      .map((l) => l.id);
    if (baselineFinished.current === null) {
      baselineFinished.current = new Set(finished);
      return;
    }
    let count = -1;
    for (const id of finished) {
      if (!baselineFinished.current.has(id)) {
        baselineFinished.current.add(id);
        count = recordLessonToday(id);
      }
    }
    if (count >= 0) setDaily(count);
  }, [doneIds, lessons, progressLoaded]);
  const moduleLessons = lessons.filter((l) => l.module === lesson.module);
  const moduleFinished = moduleLessons.filter((l) => {
    const ids = gradeableIds(l);
    return ids.length > 0 && ids.every((id) => doneIds.has(id));
  }).length;
  const modulePct = moduleLessons.length > 0 ? Math.round((moduleFinished / moduleLessons.length) * 100) : 0;
  const moduleComplete = moduleLessons.length > 0 && moduleFinished === moduleLessons.length;
  // Confetti only when the module flips to complete during this visit (not on page load).
  const [confetti, setConfetti] = useState(false);
  const prevModuleComplete = useRef<boolean | null>(null);
  useEffect(() => {
    if (!progressLoaded) return;
    if (prevModuleComplete.current === false && moduleComplete) {
      setConfetti(true);
      const t = window.setTimeout(() => setConfetti(false), 3500);
      prevModuleComplete.current = moduleComplete;
      return () => window.clearTimeout(t);
    }
    prevModuleComplete.current = moduleComplete;
  }, [moduleComplete, progressLoaded]);
  const idx = lessons.findIndex((l) => l.id === lesson.id);
  const prev = idx > 0 ? lessons[idx - 1] : undefined;
  const next = idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : undefined;

  return (
    <>
    {/* Sticky top bar — always a way out (home / list / dashboard) and quick lesson jumps */}
    <div className="sticky top-0 z-30 -mx-4 mb-6 border-b border-zinc-200/80 bg-zinc-50/85 px-4 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/85">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 py-2.5">
        <div className="flex min-w-0 items-center gap-1">
          {lessons.length > 0 && (
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-controls="lesson-sidebar"
              aria-expanded={drawerOpen}
              aria-label="Хичээлүүдийн жагсаалт"
              className="mr-1 grid size-9 shrink-0 place-items-center rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:border-violet-400 lg:hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
            >
              ☰
            </button>
          )}
          <Link href="/" aria-label="Нүүр хуудас" className="flex shrink-0 items-center gap-2 font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            <Logo className="size-9" />
            <span className="hidden sm:inline">Storxon</span>
          </Link>
          {hrefFor && (
            <Link
              href={hrefBase ?? "/playground"}
              className="ml-1 hidden items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 sm:inline-flex dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              ← Бүх хичээл
            </Link>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            href="/dashboard"
            className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-semibold text-zinc-700 hover:border-violet-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          >
            Самбар
          </Link>
          {hrefFor && (
            <div className="flex items-center gap-1">
              {prev ? (
                <Link href={hrefFor(prev.id)} aria-label={`Өмнөх хичээл: ${prev.title}`} title={`← ${prev.title}`} className="grid size-9 place-items-center rounded-lg border border-zinc-200 bg-white text-xl leading-none text-zinc-700 hover:border-violet-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">‹</Link>
              ) : (
                <span aria-hidden className="grid size-9 place-items-center rounded-lg border border-zinc-100 text-xl leading-none text-zinc-300 dark:border-zinc-900 dark:text-zinc-700">‹</span>
              )}
              {next ? (
                <Link href={hrefFor(next.id)} aria-label={`Дараах хичээл: ${next.title}`} title={`${next.title} →`} className="grid size-9 place-items-center rounded-lg bg-violet-600 text-xl leading-none text-white hover:bg-violet-700">›</Link>
              ) : (
                <span aria-hidden className="grid size-9 place-items-center rounded-lg border border-zinc-100 text-xl leading-none text-zinc-300 dark:border-zinc-900 dark:text-zinc-700">›</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="mx-auto flex max-w-5xl flex-col gap-6 lg:flex-row">
      <LessonSidebar
        lessons={lessons}
        activeId={lesson.id}
        doneIds={doneIds}
        streak={streak}
        xp={xp}
        daily={daily}
        hrefFor={hrefFor}
        open={drawerOpen}
        onClose={closeDrawer}
      />
      <article className="min-w-0 max-w-3xl flex-1">
      <header className="mb-6">
        {lessons.length > 0 && (
          <div className="mb-4 flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
            <div
              role="progressbar"
              aria-label="Нийт хичээлийн явц"
              aria-valuemin={0}
              aria-valuemax={lessons.length}
              aria-valuenow={finishedLessons}
              className="relative h-16 w-16 shrink-0"
            >
              <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90" aria-hidden="true">
                <circle cx="18" cy="18" r="15.9155" fill="none" strokeWidth="3.5" className="stroke-zinc-100 dark:stroke-zinc-800" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray={`${overallPct} 100`}
                  className="stroke-violet-600 motion-safe:transition-[stroke-dasharray] motion-safe:duration-500"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-zinc-800 dark:text-zinc-100">
                {Math.round(overallPct)}%
              </span>
            </div>
            <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              <div>Нийт явц</div>
              <div className="font-medium text-zinc-500">
                {finishedLessons}/{lessons.length} хичээл дууссан
              </div>
              {hrefBase === "/playground" && finishedLessons === lessons.length && (
                <Link href="/playground/certificate" className="mt-1 inline-block text-xs font-bold text-violet-600 hover:underline">
                  Гэрчилгээ авах →
                </Link>
              )}
            </div>
          </div>
        )}
        <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-wider text-violet-600">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              {hrefFor ? (
                <Link href={hrefBase ?? "/playground"} className="hover:underline">
                  Хичээлүүд
                </Link>
              ) : (
                <span>Хичээлүүд</span>
              )}
            </li>
            <li aria-hidden="true" className="text-zinc-400">›</li>
            <li>Модуль {lesson.module}</li>
            <li aria-hidden="true" className="text-zinc-400">›</li>
            <li aria-current="page" className="max-w-[16rem] truncate text-zinc-500 normal-case tracking-normal">
              {lesson.title}
            </li>
          </ol>
        </nav>
        {moduleLessons.length > 0 && (
          <div className="mt-2 flex items-center gap-2 text-xs font-medium text-zinc-500">
            <span className="whitespace-nowrap">
              Модуль {lesson.module}: {moduleFinished}/{moduleLessons.length}
            </span>
            <div
              role="progressbar"
              aria-label={`Модуль ${lesson.module}-ийн явц`}
              aria-valuemin={0}
              aria-valuemax={moduleLessons.length}
              aria-valuenow={moduleFinished}
              className="h-1.5 w-28 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
            >
              <div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${modulePct}%` }} />
            </div>
          </div>
        )}
        {moduleComplete && (
          <div
            role="status"
            className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200"
          >
            <span aria-hidden>🏆</span>
            <span>Баяр хүргэе! Модуль {lesson.module}-г бүрэн дуусгалаа.</span>
          </div>
        )}
        {confetti && (
          <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden motion-reduce:hidden">
            {Array.from({ length: 36 }, (_, i) => (
              <span
                key={i}
                className="sx-confetti"
                style={{
                  left: `${(i * 97) % 100}%`,
                  background: ["#7c3aed", "#f59e0b", "#10b981", "#ec4899", "#3b82f6"][i % 5],
                  animationDelay: `${(i % 9) * 0.1}s`,
                  animationDuration: `${2 + (i % 5) * 0.4}s`,
                }}
              />
            ))}
          </div>
        )}
        <h1 className="mt-1 text-2xl font-extrabold text-zinc-900 sm:text-3xl dark:text-zinc-50">{lesson.title}</h1>
        <div className="mt-1 text-sm font-medium text-zinc-500">⏱ ~{estimateMinutes(lesson)} минут</div>
        {lesson.objectives.length > 0 && (
          <div className="mt-4 rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/40 dark:bg-violet-950/30">
            <div className="text-xs font-bold uppercase tracking-wide text-violet-700 dark:text-violet-300">Суралцах зорилго</div>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
              {lesson.objectives.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        )}
        {gradeable > 0 && (
          <div className="mt-3 text-sm font-medium text-zinc-500">
            Явц: {doneCount}/{gradeable} даалгавар {complete && "· ✅ Дууссан"}
          </div>
        )}
      </header>

      <div className="space-y-8">
        {lesson.blocks.map((block, i) => (
          <Block key={`${lesson.id}:${i}`} block={block} taskId={`${lesson.id}:${i}`} done={doneIds.has(`${lesson.id}:${i}`)} onDone={markDone} />
        ))}
      </div>

      {gradeable > 0 && <SummaryCard lesson={lesson} doneIds={doneIds} />}

      {hrefFor && (prev || next) && (
        <nav aria-label="Хичээл хоорондын навигаци" className="mt-10 flex items-stretch justify-between gap-3">
          {prev ? (
            <Link
              href={hrefFor(prev.id)}
              className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm hover:border-violet-400 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="block text-xs text-zinc-500">← Өмнөх</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{prev.title}</span>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
          {next ? (
            <Link
              href={hrefFor(next.id)}
              className="flex-1 rounded-xl border border-violet-300 bg-violet-50 px-4 py-3 text-right text-sm hover:border-violet-500 dark:border-violet-900/50 dark:bg-violet-950/30"
            >
              <span className="block text-xs text-violet-600">Дараах →</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{next.title}</span>
              {next.objectives.length > 0 && (
                <span className="mt-2 block border-t border-violet-200 pt-2 text-left text-xs text-zinc-600 dark:border-violet-900/40 dark:text-zinc-400">
                  <span className="block font-bold uppercase tracking-wide text-violet-700 dark:text-violet-300">Зорилго</span>
                  {next.objectives.slice(0, 2).map((o, i) => (
                    <span key={i} className="mt-1 block">• {o}</span>
                  ))}
                </span>
              )}
            </Link>
          ) : (
            <span className="flex-1" />
          )}
        </nav>
      )}
      </article>
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Хичээлийн эхлэл рүү буцах"
          className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-1.5 rounded-full border border-violet-300 bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-lg hover:border-violet-500 dark:border-violet-800 dark:bg-zinc-900 dark:text-violet-300"
        >
          ↑ Эхлэл рүү
        </button>
      )}
    </div>
    </>
  );
}

function SummaryCard({ lesson, doneIds }: { lesson: Lesson; doneIds: Set<string> }) {
  const stat = (kind: "exercise" | "quiz") => {
    let total = 0;
    let done = 0;
    lesson.blocks.forEach((b, i) => {
      if (b.kind !== kind) return;
      total += 1;
      if (doneIds.has(`${lesson.id}:${i}`)) done += 1;
    });
    return { total, done };
  };
  const ex = stat("exercise");
  const qz = stat("quiz");
  const total = ex.total + qz.total;
  const done = ex.done + qz.done;
  const complete = total > 0 && done === total;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const rows = [
    { label: "Дасгал", ...ex },
    { label: "Quiz", ...qz },
  ].filter((r) => r.total > 0);
  return (
    <section
      aria-label="Хичээлийн дүгнэлт"
      className={`mt-10 rounded-2xl border p-5 ${
        complete
          ? "border-emerald-300 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30"
          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50">
          {complete ? "🎉 Хичээл дууслаа!" : "Хичээлийн дүгнэлт"}
        </h2>
        <span className="text-sm font-bold text-violet-600">{pct}%</span>
      </div>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {complete
          ? "Бүх дасгал, quiz-ийг амжилттай хийлээ. Дараагийн хичээл рүү шилжиж болно."
          : `${total - done} даалгавар үлдлээ. Дээш гүйлгэж үргэлжлүүлээрэй.`}
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {rows.map((r) => (
          <li
            key={r.label}
            className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">{r.label}</span>
            <span className={r.done === r.total ? "font-bold text-emerald-600" : "font-bold text-zinc-500"}>
              {r.done}/{r.total} {r.done === r.total && "✅"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Block({
  block,
  taskId,
  done,
  onDone,
}: {
  block: LessonBlock;
  taskId: string;
  done: boolean;
  onDone: (id: string) => void;
}) {
  switch (block.kind) {
    case "theory":
      return (
        <section>
          {block.title && <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">{block.title}</h2>}
          {/* In-repo authored content is trusted; DB-authored theory must be sanitized upstream. */}
          <div className="prose-sx text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: block.html }} />
          {block.image && (
            <figure className="mt-4">
              <Image
                src={block.image.src}
                alt={block.image.alt}
                width={block.image.width}
                height={block.image.height}
                className="mx-auto h-auto max-h-64 w-auto rounded-xl"
              />
              {block.image.caption && (
                <figcaption className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">{block.image.caption}</figcaption>
              )}
            </figure>
          )}
        </section>
      );
    case "code":
      return (
        <section>
          {block.title && <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">{block.title}</h2>}
          <pre className="overflow-auto rounded-xl bg-zinc-900 p-4 font-mono text-[13px] leading-relaxed text-zinc-100">
            <HighlightedCode code={block.code} lang={block.lang} />
          </pre>
        </section>
      );
    case "playground":
      return (
        <section>
          {block.title && <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">{block.title}</h2>}
          <Playground starter={block.starter} height={block.height} persistId={taskId} />
        </section>
      );
    case "film":
      return (
        <section className="flex flex-wrap items-center gap-4 rounded-2xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900 dark:bg-violet-950/40">
          <div className="min-w-0 flex-1">
            <span className="rounded-md bg-violet-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">Бичлэг хичээл</span>
            <h2 className="mt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">{block.title}</h2>
            {block.description && <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{block.description}</p>}
          </div>
          <Link
            href={block.href ?? "/learn"}
            className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          >
            {block.label ?? "Бичлэг үзэх"} →
          </Link>
        </section>
      );
    case "quiz":
      return <Quiz block={block} done={done} onDone={() => onDone(taskId)} />;
    case "exercise":
      return <Exercise block={block} taskId={taskId} done={done} onDone={() => onDone(taskId)} />;
  }
}

function Exercise({
  block,
  taskId,
  done,
  onDone,
}: {
  block: Extract<LessonBlock, { kind: "exercise" }>;
  taskId: string;
  done: boolean;
  onDone: () => void;
}) {
  const filesRef = useRef<PlaygroundFiles>(block.starter);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  // 0 = none, 1 = first hint, 2 = stronger second hint (opened one by one).
  const [hintLevel, setHintLevel] = useState(0);
  const [starter, setStarter] = useState<PlaygroundFiles>(block.starter);
  // Bumping this key remounts the editor so a loaded solution replaces the code.
  const [ver, setVer] = useState(0);
  // After the solution is loaded we stop persisting/restoring so the shown
  // answer isn't overwritten by (or saved as) the student's own work.
  const [solShown, setSolShown] = useState(false);

  const errorsRef = useRef<string[]>([]);

  const check = () => {
    if (errorsRef.current.length > 0) {
      const first = errorsRef.current[0];
      setResult({
        ok: false,
        message: `Console-д алдаа байна: «${first.length > 120 ? first.slice(0, 120) + "…" : first}». Эхлээд алдааг засаад "Ажиллуулах" дарж, дараа нь дахин шалга.`,
      });
      return;
    }
    const r = runCheck(block.check as ExerciseCheck, filesRef.current);
    setResult(r);
    if (r.ok) onDone();
  };

  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
      <div className="flex items-center gap-2">
        <span className="rounded-md bg-amber-500 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">Даалгавар</span>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{block.title}</h2>
        {done && <span className="ml-auto text-sm font-semibold text-emerald-600">✅ Биелсэн</span>}
      </div>
      <p className="mt-2 text-[15px] text-zinc-700 dark:text-zinc-300">{block.prompt}</p>

      <div className="mt-3">
        <Playground key={ver} starter={starter} persistId={solShown ? undefined : taskId} onFilesChange={(f) => (filesRef.current = f)} onErrorsChange={(e) => (errorsRef.current = e)} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" onClick={check} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white hover:bg-violet-500">
          Шалгах
        </button>
        {block.hint && (
          <button
            type="button"
            onClick={() => setHintLevel((l) => (l === 0 ? 1 : l === 1 && block.hint2 ? 2 : 0))}
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-white dark:border-zinc-700 dark:text-zinc-300"
          >
            {hintLevel === 0 ? "Сануулга" : hintLevel === 1 && block.hint2 ? "Илүү тодорхой сануулга" : "Сануулга нуух"}
          </button>
        )}
        {block.solution && (
          <button
            type="button"
            onClick={() => {
              filesRef.current = block.solution!;
              setStarter(block.solution!);
              setSolShown(true);
              setVer((v) => v + 1);
            }}
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-white dark:border-zinc-700 dark:text-zinc-300"
          >
            Хариу харах
          </button>
        )}
      </div>

      {hintLevel >= 1 && block.hint && (
        <p className="mt-2 rounded-lg bg-white/70 p-3 text-sm text-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-300">💡 {block.hint}</p>
      )}
      {hintLevel >= 2 && block.hint2 && (
        <p className="mt-2 rounded-lg bg-white/70 p-3 text-sm text-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-300">🔎 {block.hint2}</p>
      )}
      {result && (
        <p className={`mt-2 text-sm font-semibold ${result.ok ? "text-emerald-700" : "text-red-700"}`}>
          {result.ok ? "✅ Зөв! Даалгавар биеллээ." : `💡 ${result.message}`}
        </p>
      )}
    </section>
  );
}

function Quiz({
  block,
  done,
  onDone,
}: {
  block: Extract<LessonBlock, { kind: "quiz" }>;
  done: boolean;
  onDone: () => void;
}) {
  const items = [block, ...(block.more ?? [])];
  const [picks, setPicks] = useState<(number | null)[]>(() => items.map(() => null));
  const multi = items.length > 1;

  function pick(qi: number, i: number) {
    const next = picks.slice();
    next[qi] = i;
    setPicks(next);
    if (items.every((q, k) => next[k] === q.answer)) onDone();
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-2">
        <span className="rounded-md bg-sky-500 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">Асуулт</span>
        {done && <span className="ml-auto text-sm font-semibold text-emerald-600">✅</span>}
      </div>
      {items.map((q, qi) => {
        const picked = picks[qi];
        const answered = picked !== null;
        const correct = picked === q.answer;
        return (
          <div key={qi} className={qi > 0 ? "mt-5 border-t border-zinc-200 pt-4 dark:border-zinc-800" : ""}>
            <p className="mt-2 font-semibold text-zinc-900 dark:text-zinc-100">
              {multi && <span className="mr-1 text-zinc-400">{qi + 1}/{items.length}.</span>}
              {q.question}
            </p>
            <div className="mt-3 space-y-2">
              {q.options.map((opt, i) => {
                const state = !answered ? "" : i === q.answer ? "ok" : i === picked ? "bad" : "";
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={answered}
                    onClick={() => pick(qi, i)}
                    className={`block w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                      state === "ok"
                        ? "border-emerald-400 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
                        : state === "bad"
                          ? "border-red-400 bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-200"
                          : "border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div
                role="status"
                className={`mt-3 rounded-lg border px-3 py-2 text-sm ${
                  correct
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
                    : "border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200"
                }`}
              >
                <p className="font-semibold">{correct ? "✅ Зөв!" : "❌ Буруу байна."}</p>
                <p className="mt-1 font-normal">
                  {q.explain ?? `Зөв хариулт: ${q.options[q.answer]}`}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
