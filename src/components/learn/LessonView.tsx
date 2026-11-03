"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Playground from "@/components/learn/Playground";
import { LESSONS } from "@/lib/lessons/data";
import { runCheck, type ExerciseCheck, type Lesson, type LessonBlock, type PlaygroundFiles } from "@/lib/lessons/types";

/**
 * Renders one structured lesson: theory, read-only code, sandboxed playgrounds,
 * exercises (with deterministic checks), and quizzes. Reusable — there is no
 * hardcoded page per lesson. Completion is derived from meaningful activity
 * (passing every exercise + quiz), not from opening the page, and is persisted
 * per-task in localStorage for the MVP. (Server/Supabase persistence with RLS
 * is a separate, reviewed task — see AGENT_BACKLOG.md.)
 */

const KEY = "sx-learn"; // { [taskId]: true }

function readDone(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") || {};
  } catch {
    return {};
  }
}
function writeDone(id: string) {
  try {
    const d = readDone();
    d[id] = true;
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch {
    /* storage may be unavailable (private mode) — progress is best-effort */
  }
}

function gradeableIds(l: Lesson): string[] {
  const ids: string[] = [];
  l.blocks.forEach((b, i) => {
    if (b.kind === "exercise" || b.kind === "quiz") ids.push(`${l.id}:${i}`);
  });
  return ids;
}

/** Left sidebar: lessons grouped by module, active lesson highlighted, ✓ when finished. */
function Sidebar({
  lessons,
  activeId,
  doneIds,
  hrefFor,
}: {
  lessons: Lesson[];
  activeId: string;
  doneIds: Set<string>;
  hrefFor?: (id: string) => string;
}) {
  const modules = Array.from(new Set(lessons.map((l) => l.module))).sort((a, b) => a - b);
  return (
    <nav aria-label="Хичээлийн жагсаалт" className="w-full shrink-0 lg:sticky lg:top-6 lg:w-64 lg:self-start">
      <div className="rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
        {modules.map((m) => (
          <div key={m} className="mb-3 last:mb-0">
            <div className="px-2 pb-1 text-xs font-bold uppercase tracking-wider text-violet-600">Модуль {m}</div>
            <ul className="space-y-1">
              {lessons
                .filter((l) => l.module === m)
                .map((l) => {
                  const ids = gradeableIds(l);
                  const finished = ids.length > 0 && ids.every((id) => doneIds.has(id));
                  const active = l.id === activeId;
                  const cls = `flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${
                    active
                      ? "bg-violet-100 font-semibold text-violet-800 dark:bg-violet-950/50 dark:text-violet-200"
                      : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`;
                  const inner = (
                    <>
                      <span aria-hidden className={finished ? "text-emerald-600" : "text-zinc-300 dark:text-zinc-600"}>
                        {finished ? "✓" : "○"}
                      </span>
                      <span className="min-w-0 flex-1">{l.title}</span>
                      {finished && <span className="sr-only">Дууссан</span>}
                    </>
                  );
                  return (
                    <li key={l.id}>
                      {hrefFor ? (
                        <a href={hrefFor(l.id)} aria-current={active ? "page" : undefined} className={cls}>
                          {inner}
                        </a>
                      ) : (
                        <div aria-current={active ? "page" : undefined} className={cls}>
                          {inner}
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
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

  useEffect(() => {
    const d = readDone();
    setDoneIds(new Set(Object.keys(d).filter((k) => d[k])));
  }, []);

  const markDone = useCallback((taskId: string) => {
    writeDone(taskId);
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
  const idx = lessons.findIndex((l) => l.id === lesson.id);
  const prev = idx > 0 ? lessons[idx - 1] : undefined;
  const next = idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : undefined;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 lg:flex-row">
      <Sidebar lessons={lessons} activeId={lesson.id} doneIds={doneIds} hrefFor={hrefFor} />
      <article className="min-w-0 max-w-3xl flex-1">
      <header className="mb-6">
        {lessons.length > 0 && (
          <div className="mb-4 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              <span>Нийт явц</span>
              <span>
                {finishedLessons}/{lessons.length} хичээл дууссан
              </span>
            </div>
            <div
              role="progressbar"
              aria-label="Нийт хичээлийн явц"
              aria-valuemin={0}
              aria-valuemax={lessons.length}
              aria-valuenow={finishedLessons}
              className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
            >
              <div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${overallPct}%` }} />
            </div>
          </div>
        )}
        <div className="text-xs font-semibold uppercase tracking-wider text-violet-600">Модуль {lesson.module}</div>
        <h1 className="mt-1 text-2xl font-extrabold text-zinc-900 sm:text-3xl dark:text-zinc-50">{lesson.title}</h1>
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
          <Block key={i} block={block} taskId={`${lesson.id}:${i}`} done={doneIds.has(`${lesson.id}:${i}`)} onDone={markDone} />
        ))}
      </div>

      {hrefFor && (prev || next) && (
        <nav aria-label="Хичээл хоорондын навигаци" className="mt-10 flex items-stretch justify-between gap-3">
          {prev ? (
            <a
              href={hrefFor(prev.id)}
              className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm hover:border-violet-400 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="block text-xs text-zinc-500">← Өмнөх</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{prev.title}</span>
            </a>
          ) : (
            <span className="flex-1" />
          )}
          {next ? (
            <a
              href={hrefFor(next.id)}
              className="flex-1 rounded-xl border border-violet-300 bg-violet-50 px-4 py-3 text-right text-sm hover:border-violet-500 dark:border-violet-900/50 dark:bg-violet-950/30"
            >
              <span className="block text-xs text-violet-600">Дараах →</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{next.title}</span>
            </a>
          ) : (
            <span className="flex-1" />
          )}
        </nav>
      )}
      </article>
    </div>
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
        </section>
      );
    case "code":
      return (
        <section>
          {block.title && <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">{block.title}</h2>}
          <pre className="overflow-auto rounded-xl bg-zinc-900 p-4 font-mono text-[13px] leading-relaxed text-zinc-100">
            <code>{block.code}</code>
          </pre>
        </section>
      );
    case "playground":
      return (
        <section>
          {block.title && <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">{block.title}</h2>}
          <Playground starter={block.starter} height={block.height} />
        </section>
      );
    case "quiz":
      return <Quiz block={block} done={done} onDone={() => onDone(taskId)} />;
    case "exercise":
      return <Exercise block={block} done={done} onDone={() => onDone(taskId)} />;
  }
}

function Exercise({
  block,
  done,
  onDone,
}: {
  block: Extract<LessonBlock, { kind: "exercise" }>;
  done: boolean;
  onDone: () => void;
}) {
  const filesRef = useRef<PlaygroundFiles>(block.starter);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [starter, setStarter] = useState<PlaygroundFiles>(block.starter);
  // Bumping this key remounts the editor so a loaded solution replaces the code.
  const [ver, setVer] = useState(0);

  const check = () => {
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
        <Playground key={ver} starter={starter} onFilesChange={(f) => (filesRef.current = f)} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" onClick={check} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white hover:bg-violet-500">
          Шалгах
        </button>
        {block.hint && (
          <button type="button" onClick={() => setShowHint((v) => !v)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-white dark:border-zinc-700 dark:text-zinc-300">
            Сануулга
          </button>
        )}
        {block.solution && (
          <button
            type="button"
            onClick={() => {
              filesRef.current = block.solution!;
              setStarter(block.solution!);
              setVer((v) => v + 1);
            }}
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-white dark:border-zinc-700 dark:text-zinc-300"
          >
            Хариу харах
          </button>
        )}
      </div>

      {showHint && block.hint && (
        <p className="mt-2 rounded-lg bg-white/70 p-3 text-sm text-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-300">💡 {block.hint}</p>
      )}
      {result && (
        <p className={`mt-2 text-sm font-semibold ${result.ok ? "text-emerald-600" : "text-red-600"}`}>
          {result.ok ? "✅ Зөв! Даалгавар биеллээ." : `❌ ${result.message}`}
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
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const correct = picked === block.answer;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-2">
        <span className="rounded-md bg-sky-500 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">Асуулт</span>
        {done && <span className="ml-auto text-sm font-semibold text-emerald-600">✅</span>}
      </div>
      <p className="mt-2 font-semibold text-zinc-900 dark:text-zinc-100">{block.question}</p>
      <div className="mt-3 space-y-2">
        {block.options.map((opt, i) => {
          const state = !answered ? "" : i === block.answer ? "ok" : i === picked ? "bad" : "";
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => {
                setPicked(i);
                if (i === block.answer) onDone();
              }}
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
        <p className={`mt-2 text-sm font-semibold ${correct ? "text-emerald-600" : "text-red-600"}`}>
          {correct ? "Зөв!" : "Буруу байна."} {block.explain && <span className="font-normal text-zinc-500">{block.explain}</span>}
        </p>
      )}
    </section>
  );
}
