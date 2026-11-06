"use client";

/**
 * Daily learning streak, localStorage only (`sx-streak`).
 * Stored as { last: "YYYY-MM-DD" (local day), count }. A streak is alive while
 * the last active day is today or yesterday; completing a task bumps it.
 */
const SKEY = "sx-streak";

type Streak = { last: string; count: number };

function dayKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function read(): Streak | null {
  try {
    const raw = localStorage.getItem(SKEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Streak;
    return typeof v?.last === "string" && typeof v?.count === "number" ? v : null;
  } catch {
    return null;
  }
}

function write(s: Streak) {
  try {
    localStorage.setItem(SKEY, JSON.stringify(s));
  } catch {
    /* private mode / quota — ignore */
  }
}

/** Current streak length (0 if broken or never started). */
export function getStreak(): number {
  const s = read();
  if (!s) return 0;
  const now = new Date();
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  return s.last === dayKey(now) || s.last === dayKey(yesterday) ? s.count : 0;
}

/** Record activity today and return the updated streak length. */
export function touchStreak(): number {
  const now = new Date();
  const today = dayKey(now);
  const s = read();
  if (s?.last === today) return s.count;
  const yesterday = dayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
  const count = s?.last === yesterday ? s.count + 1 : 1;
  write({ last: today, count });
  return count;
}
