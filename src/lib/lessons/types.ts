// Structured lesson model for Storxon's interactive coding lessons.
//
// A lesson is an ordered list of blocks. Blocks are *data*, not application
// code: any executable example runs only inside the sandboxed <Playground>
// iframe (sandbox="allow-scripts", no allow-same-origin), never in the app
// context. This keeps instructor-authored code untrusted by construction.

// Optional illustration for a theory block. `src` must be a local path under
// /public (e.g. "/kit/code.webp"); alt text is required for accessibility.
export type TheoryImage = { src: string; alt: string; width: number; height: number; caption?: string };

/** The three editable source files of a playground/exercise (raw strings, never executed in the app context). */
export type PlaygroundFiles = { html: string; css: string; js: string };

/**
 * One unit of a lesson, discriminated by `kind`:
 * `theory` (rich text), `code` (read-only sample), `playground` (editable sandbox),
 * `exercise` (checked task), `film` (link to the gated player) or `quiz`.
 */
export type LessonBlock =
  // Trusted rich text — Mongolian explanations, diagrams. (DB-authored theory
  // must be sanitized before it reaches here; in-repo content is trusted.)
  | { kind: "theory"; title?: string; html: string; image?: TheoryImage }
  // Read-only example with syntax-free highlighting.
  | { kind: "code"; title?: string; lang: "html" | "css" | "js"; code: string }
  // Editable code with live sandboxed preview.
  | { kind: "playground"; title?: string; starter: PlaygroundFiles; height?: number }
  // A task: edit the starter until the deterministic `check` passes.
  | {
      kind: "exercise";
      title: string;
      prompt: string;
      starter: PlaygroundFiles;
      hint?: string;
      // Optional stronger second-level hint, unlocked after the first.
      hint2?: string;
      solution?: PlaygroundFiles;
      check: ExerciseCheck;
    }
  // Link to a recorded film/lecture in the gated course player (/learn). Only a
  // title/description/link lives here — the private course content is never
  // copied or embedded; /learn keeps enforcing sign-in + enrollment.
  | { kind: "film"; title: string; description?: string; href?: string; label?: string }
  // Single-answer question.
  | {
      kind: "quiz";
      title?: string;
      question: string;
      options: string[];
      answer: number;
      explain?: string;
      /** Optional extra questions, shown one after another in the same block. */
      more?: QuizQuestion[];
    };

// Deterministic completion criteria, evaluated client-side against the
// student's *source*. A button click alone never completes an exercise — the
// check must pass. (Richer in-iframe assertion running is a later upgrade.)
/**
 * Completion criteria for an exercise. The `*Includes` variants test a RegExp
 * (`pattern` + optional `flags`) against one file; `allOf` requires every nested
 * check to pass. `message` is shown on success (and appended to the hint on failure).
 */
export type ExerciseCheck =
  | { type: "htmlIncludes"; pattern: string; flags?: string; message: string }
  | { type: "cssIncludes"; pattern: string; flags?: string; message: string }
  | { type: "jsIncludes"; pattern: string; flags?: string; message: string }
  | { type: "allOf"; checks: ExerciseCheck[] };

/** A full lesson: metadata plus its ordered blocks. */
export type Lesson = {
  id: string; // stable slug; also the progress key in storage
  module: number;
  title: string;
  objectives: string[];
  blocks: LessonBlock[];
};

const FILE_LABEL = { html: "HTML", css: "CSS", js: "JS" } as const;

function testFile(
  kind: keyof typeof FILE_LABEL,
  check: { pattern: string; flags?: string; message: string },
  files: PlaygroundFiles,
): { ok: boolean; message: string } {
  const label = FILE_LABEL[kind];
  const src = files[kind];
  let ok = false;
  try {
    ok = new RegExp(check.pattern, check.flags).test(src);
  } catch {
    return { ok: false, message: "Энэ дасгалын шалгуурт алдаа байна. Багшид мэдэгдээрэй." };
  }
  if (ok) return { ok: true, message: check.message };
  // Gentle, specific guidance: point to the right tab and say what is missing.
  const where = src.trim() === ""
    ? `${label} таб хоосон байна — эхлээд кодоо бичээрэй.`
    : `${label} табаа дахин нэг харчих.`;
  return { ok: false, message: `Бараг боллоо! ${where} ${check.message}` };
}

/**
 * Run an ExerciseCheck against the current playground source.
 *
 * Pure and deterministic. An invalid regex yields `{ ok: false }` with a message
 * telling the student to notify the teacher, rather than throwing. For `allOf`
 * the first failing check's result is returned.
 *
 * @returns `ok` plus a student-facing Mongolian `message`.
 */
export function runCheck(check: ExerciseCheck, files: PlaygroundFiles): { ok: boolean; message: string } {
  switch (check.type) {
    case "htmlIncludes":
      return testFile("html", check, files);
    case "cssIncludes":
      return testFile("css", check, files);
    case "jsIncludes":
      return testFile("js", check, files);
    case "allOf": {
      for (const c of check.checks) {
        const r = runCheck(c, files);
        if (!r.ok) return r;
      }
      return { ok: true, message: "Бүх шалгуур хангагдлаа." };
    }
  }
}

/** One quiz question; `answer` is the zero-based index into `options`. */
export type QuizQuestion = { question: string; options: string[]; answer: number; explain?: string };
