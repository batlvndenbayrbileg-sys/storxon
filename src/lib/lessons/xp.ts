"use client";

/**
 * XP / points, localStorage only (`sx-xp`). The total is derived from lesson
 * progress (10 XP per finished exercise/quiz, +20 bonus per finished lesson)
 * and persisted so the badge shows instantly on the next visit.
 */
const XKEY = "sx-xp";

export const XP_PER_TASK = 10;
export const XP_PER_LESSON = 20;

export function computeXp(tasksDone: number, lessonsFinished: number): number {
  return tasksDone * XP_PER_TASK + lessonsFinished * XP_PER_LESSON;
}

export function getXp(): number {
  try {
    const n = Number(localStorage.getItem(XKEY));
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
  } catch {
    return 0;
  }
}

export function saveXp(xp: number) {
  try {
    localStorage.setItem(XKEY, String(xp));
  } catch {
    /* private mode / quota — ignore */
  }
}
