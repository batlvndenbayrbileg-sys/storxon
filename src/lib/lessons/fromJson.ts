import type { ExerciseCheck, Lesson, PlaygroundFiles, QuizQuestion } from "@/lib/lessons/types";

// Validates untrusted/plain JSON and returns a typed Lesson. Throws a
// descriptive Error on the first problem so bad content fails the build
// instead of rendering broken. Pure data only — no code is evaluated.

const BLOCK_KINDS = ["theory", "code", "playground", "exercise", "quiz", "film"];

function fail(path: string, msg: string): never {
  throw new Error(`Lesson JSON invalid at ${path}: ${msg}`);
}

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function str(v: unknown, path: string): string {
  if (typeof v !== "string") fail(path, "string хүлээгдсэн");
  return v;
}

function files(v: unknown, path: string): PlaygroundFiles {
  if (!isObj(v)) fail(path, "{html, css, js} объект хүлээгдсэн");
  return { html: str(v.html, `${path}.html`), css: str(v.css, `${path}.css`), js: str(v.js, `${path}.js`) };
}

function check(v: unknown, path: string): ExerciseCheck {
  if (!isObj(v)) fail(path, "check объект хүлээгдсэн");
  if (v.type === "allOf") {
    if (!Array.isArray(v.checks) || v.checks.length === 0) fail(`${path}.checks`, "хоосон биш массив хүлээгдсэн");
    return { type: "allOf", checks: v.checks.map((c, i) => check(c, `${path}.checks[${i}]`)) };
  }
  if (v.type === "htmlIncludes" || v.type === "cssIncludes" || v.type === "jsIncludes") {
    const pattern = str(v.pattern, `${path}.pattern`);
    const flags = v.flags === undefined ? undefined : str(v.flags, `${path}.flags`);
    try {
      new RegExp(pattern, flags);
    } catch {
      fail(`${path}.pattern`, "буруу regex");
    }
    return { type: v.type, pattern, flags, message: str(v.message, `${path}.message`) };
  }
  return fail(`${path}.type`, "htmlIncludes | cssIncludes | jsIncludes | allOf");
}

export function lessonFromJson(input: unknown): Lesson {
  if (!isObj(input)) fail("$", "объект хүлээгдсэн");
  const { id, module: mod, title, objectives, blocks } = input;
  if (typeof mod !== "number") fail("$.module", "тоо хүлээгдсэн");
  if (!Array.isArray(objectives)) fail("$.objectives", "массив хүлээгдсэн");
  if (!Array.isArray(blocks) || blocks.length === 0) fail("$.blocks", "хоосон биш массив хүлээгдсэн");

  return {
    id: str(id, "$.id"),
    module: mod,
    title: str(title, "$.title"),
    objectives: objectives.map((o, i) => str(o, `$.objectives[${i}]`)),
    ...(input.summary === undefined ? {} : { summary: str(input.summary, "$.summary") }),
    blocks: blocks.map((raw, i): Lesson["blocks"][number] => {
      const p = `$.blocks[${i}]`;
      if (!isObj(raw)) return fail(p, "объект хүлээгдсэн");
      const title = raw.title === undefined ? undefined : str(raw.title, `${p}.title`);
      switch (raw.kind) {
        case "theory":
          return { kind: "theory", title, html: str(raw.html, `${p}.html`) };
        case "code": {
          if (raw.lang !== "html" && raw.lang !== "css" && raw.lang !== "js") fail(`${p}.lang`, "html | css | js");
          return { kind: "code", title, lang: raw.lang, code: str(raw.code, `${p}.code`) };
        }
        case "playground":
          return {
            kind: "playground",
            title,
            starter: files(raw.starter, `${p}.starter`),
            height: typeof raw.height === "number" ? raw.height : undefined,
          };
        case "exercise":
          return {
            kind: "exercise",
            title: str(raw.title, `${p}.title`),
            prompt: str(raw.prompt, `${p}.prompt`),
            starter: files(raw.starter, `${p}.starter`),
            hint: raw.hint === undefined ? undefined : str(raw.hint, `${p}.hint`),
            hint2: raw.hint2 === undefined ? undefined : str(raw.hint2, `${p}.hint2`),
            solution: raw.solution === undefined ? undefined : files(raw.solution, `${p}.solution`),
            check: check(raw.check, `${p}.check`),
          };
        case "film": {
          const href = raw.href === undefined ? undefined : str(raw.href, `${p}.href`);
          if (href !== undefined && !/^\/(?!\/)/.test(href)) fail(`${p}.href`, "'/'-ээр эхэлсэн дотоод зам хүлээгдсэн");
          return {
            kind: "film",
            title: str(raw.title, `${p}.title`),
            description: raw.description === undefined ? undefined : str(raw.description, `${p}.description`),
            href,
            label: raw.label === undefined ? undefined : str(raw.label, `${p}.label`),
          };
        }
        case "quiz": {
          const parseQ = (q: Record<string, unknown>, qp: string): QuizQuestion => {
            if (!Array.isArray(q.options) || q.options.length < 2) fail(`${qp}.options`, "≥2 сонголттой массив");
            const options = (q.options as unknown[]).map((o, j) => str(o, `${qp}.options[${j}]`));
            if (!Number.isInteger(q.answer) || (q.answer as number) < 0 || (q.answer as number) >= options.length)
              fail(`${qp}.answer`, "options-ийн индекс хүлээгдсэн");
            return {
              question: str(q.question, `${qp}.question`),
              options,
              answer: q.answer as number,
              explain: q.explain === undefined ? undefined : str(q.explain, `${qp}.explain`),
            };
          };
          if (raw.more !== undefined && !Array.isArray(raw.more)) fail(`${p}.more`, "асуултуудын массив");
          const more = (raw.more as Record<string, unknown>[] | undefined)?.map((q, j) => parseQ(q, `${p}.more[${j}]`));
          return { kind: "quiz", title, ...parseQ(raw, p), ...(more && more.length ? { more } : {}) };
        }
        default:
          return fail(`${p}.kind`, BLOCK_KINDS.join(" | "));
      }
    }),
  };
}
