import { describe, expect, it } from "vitest";
import { runCheck, type ExerciseCheck, type PlaygroundFiles } from "@/lib/lessons/types";
import { lessonFromJson } from "@/lib/lessons/fromJson";
import sample from "@/lib/lessons/json/html-headings.json";

const files = (p: Partial<PlaygroundFiles> = {}): PlaygroundFiles => ({ html: "", css: "", js: "", ...p });

describe("runCheck", () => {
  it("passes when the pattern matches the right file", () => {
    const c: ExerciseCheck = { type: "htmlIncludes", pattern: "<h1>", message: "ok" };
    expect(runCheck(c, files({ html: "<h1>Hi</h1>" }))).toEqual({ ok: true, message: "ok" });
  });

  it("fails with a hint about an empty tab", () => {
    const c: ExerciseCheck = { type: "cssIncludes", pattern: "color", message: "need color" };
    const r = runCheck(c, files());
    expect(r.ok).toBe(false);
    expect(r.message).toContain("CSS таб хоосон");
    expect(r.message).toContain("need color");
  });

  it("checks only the matching file type", () => {
    const c: ExerciseCheck = { type: "jsIncludes", pattern: "let ", message: "m" };
    expect(runCheck(c, files({ html: "let x" })).ok).toBe(false);
    expect(runCheck(c, files({ js: "let x = 1" })).ok).toBe(true);
  });

  it("honors regex flags", () => {
    const c: ExerciseCheck = { type: "htmlIncludes", pattern: "<H1>", flags: "i", message: "m" };
    expect(runCheck(c, files({ html: "<h1>" })).ok).toBe(true);
  });

  it("reports a broken pattern instead of throwing", () => {
    const c: ExerciseCheck = { type: "htmlIncludes", pattern: "(", message: "m" };
    expect(runCheck(c, files({ html: "x" })).ok).toBe(false);
  });

  it("allOf requires every check and returns the first failure", () => {
    const c: ExerciseCheck = {
      type: "allOf",
      checks: [
        { type: "htmlIncludes", pattern: "<h1>", message: "h1" },
        { type: "htmlIncludes", pattern: "<p>", message: "p" },
      ],
    };
    expect(runCheck(c, files({ html: "<h1></h1><p></p>" })).ok).toBe(true);
    const r = runCheck(c, files({ html: "<h1></h1>" }));
    expect(r.ok).toBe(false);
    expect(r.message).toContain("p");
  });
});

const baseLesson = {
  id: "t",
  module: 1,
  title: "T",
  objectives: ["a"],
  blocks: [{ kind: "theory", html: "<p>x</p>" }],
};

describe("lessonFromJson", () => {
  it("parses the bundled sample lesson", () => {
    const l = lessonFromJson(sample);
    expect(l.id).toBeTruthy();
    expect(l.blocks.length).toBeGreaterThan(0);
  });

  it("parses a minimal lesson", () => {
    expect(lessonFromJson(baseLesson).blocks[0].kind).toBe("theory");
  });

  it("rejects non-objects, empty blocks and bad module", () => {
    expect(() => lessonFromJson(null)).toThrow(/\$/);
    expect(() => lessonFromJson({ ...baseLesson, blocks: [] })).toThrow(/\$\.blocks/);
    expect(() => lessonFromJson({ ...baseLesson, module: "1" })).toThrow(/\$\.module/);
  });

  it("rejects unknown block kinds and invalid regex", () => {
    expect(() => lessonFromJson({ ...baseLesson, blocks: [{ kind: "nope" }] })).toThrow(/kind/);
    const ex = {
      kind: "exercise",
      title: "e",
      prompt: "p",
      starter: { html: "", css: "", js: "" },
      check: { type: "htmlIncludes", pattern: "(", message: "m" },
    };
    expect(() => lessonFromJson({ ...baseLesson, blocks: [ex] })).toThrow(/regex/);
  });

  it("validates quiz answer index and film href", () => {
    const quiz = { kind: "quiz", question: "q", options: ["a", "b"], answer: 2 };
    expect(() => lessonFromJson({ ...baseLesson, blocks: [quiz] })).toThrow(/answer/);
    const film = { kind: "film", title: "f", href: "//evil.com" };
    expect(() => lessonFromJson({ ...baseLesson, blocks: [film] })).toThrow(/href/);
  });
});

describe("author example lessons", () => {
  const examples = import.meta.glob("./json/example-*.json", { eager: true, import: "default" });

  it("finds the example files", () => {
    expect(Object.keys(examples).length).toBeGreaterThanOrEqual(3);
  });

  it.each(Object.entries(examples))("%s passes lessonFromJson", (_name, raw) => {
    expect(() => lessonFromJson(raw)).not.toThrow();
  });
});
