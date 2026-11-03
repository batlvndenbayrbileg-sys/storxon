"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Playground from "@/components/learn/Playground";
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

export default function LessonView({ lesson }: { lesson: Lesson }) {
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

  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-6">
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
    </article>
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
