import { describe, expect, it } from "vitest";
import { formatCode, indentBraces, indentHtml } from "@/lib/formatCode";
import { DIFFICULTY_LABEL, difficultyOf } from "@/lib/lessons/difficulty";
import { computeXp, XP_PER_LESSON, XP_PER_TASK } from "@/lib/lessons/xp";
import { GLOSSARY } from "@/lib/glossary";
import { LESSONS } from "@/lib/lessons/data";
import type { Lesson } from "@/lib/lessons/types";

describe("formatCode", () => {
  it("re-indents CSS by brace depth", () => {
    expect(indentBraces("a{\ncolor:red;\n}")).toBe("a{\n  color:red;\n}");
  });

  it("ignores braces inside strings and line comments", () => {
    const out = indentBraces('const s = "{";\n// }\nlet x = 1;');
    expect(out).toBe('const s = "{";\n// }\nlet x = 1;');
  });

  it("re-indents nested HTML and leaves void tags alone", () => {
    const out = indentHtml("<div>\n<p>Hi</p>\n<br>\n<img src=a>\n</div>");
    expect(out).toBe("<div>\n  <p>Hi</p>\n  <br>\n  <img src=a>\n</div>");
  });

  it("indents <style> bodies inside HTML", () => {
    const out = indentHtml("<style>\na{\ncolor:red;\n}\n</style>");
    expect(out).toContain("  a{");
    expect(out).toContain("    color:red;");
  });

  it("normalizes CRLF, collapses blank lines and ends with one newline", () => {
    expect(formatCode("css", "a{}\r\n\r\n\r\n\r\nb{}\n\n")).toBe("a{}\n\nb{}\n");
  });

  it("is idempotent", () => {
    const once = formatCode("js", "function f(){\nreturn [1,\n2];\n}");
    expect(formatCode("js", once)).toBe(once);
  });
});

describe("difficultyOf", () => {
  const base: Lesson = { id: "x", module: "m", title: "t", objectives: [], blocks: [] } as unknown as Lesson;

  it("rates an empty lesson as easy", () => {
    expect(difficultyOf(base)).toBe("easy");
  });

  it("always returns a labelled difficulty for real lessons", () => {
    for (const l of LESSONS) expect(DIFFICULTY_LABEL[difficultyOf(l)]).toBeTruthy();
  });
});

describe("computeXp", () => {
  it("combines tasks and finished lessons", () => {
    expect(computeXp(3, 2)).toBe(3 * XP_PER_TASK + 2 * XP_PER_LESSON);
  });

  it("is zero with no progress", () => {
    expect(computeXp(0, 0)).toBe(0);
  });
});

describe("glossary", () => {
  it("has unique, non-empty terms with definitions", () => {
    const seen = new Set<string>();
    for (const g of GLOSSARY) {
      expect(g.term.trim()).not.toBe("");
      expect(g.def.trim()).not.toBe("");
      const k = g.term.toLowerCase();
      expect(seen.has(k)).toBe(false);
      seen.add(k);
    }
  });
});
