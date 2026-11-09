import type { Lesson } from "./types";

export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: "Хялбар",
  medium: "Дунд",
  hard: "Хүнд",
};

/**
 * Хичээлийн хүндийн зэргийг агуулгаас нь (дасгалын тоо, кодын хэмжээ) тооцно.
 * Цэвэр функц — өгөгдөл хадгалахгүй, DB-д хүрэхгүй.
 */
export function difficultyOf(lesson: Lesson): Difficulty {
  let exercises = 0;
  let chars = 0;
  for (const b of lesson.blocks) {
    if (b.kind === "exercise") {
      exercises += 1;
      chars += b.starter.html.length + b.starter.css.length + b.starter.js.length;
    } else if (b.kind === "code") {
      chars += b.code.length;
    } else if (b.kind === "playground") {
      chars += b.starter.html.length + b.starter.css.length + b.starter.js.length;
    }
  }
  const score = exercises * 2 + chars / 600;
  if (score < 5) return "easy";
  if (score < 10) return "medium";
  return "hard";
}
