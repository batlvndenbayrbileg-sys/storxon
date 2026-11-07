"use client";

/**
 * Daily goal, localStorage only (`sx-daily`).
 * Stored as { day: "YYYY-MM-DD" (local day), lessons: string[] } — ids of lessons
 * finished during that day. A new day starts a fresh list automatically.
 */
const DKEY = "sx-daily";

/** Lessons to finish per day. */
export const DAILY_GOAL = 1;

type Daily = { day: string; lessons: string[] };

function today(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function read(): Daily {
  try {
    const raw = localStorage.getItem(DKEY);
    if (raw) {
      const v = JSON.parse(raw) as Daily;
      if (v?.day === today() && Array.isArray(v.lessons)) return v;
    }
  } catch {
    /* ignore */
  }
  return { day: today(), lessons: [] };
}

/** Number of distinct lessons finished today. */
export function getDailyCount(): number {
  return read().lessons.length;
}

/** Record a finished lesson for today and return today's count. */
export function recordLessonToday(lessonId: string): number {
  const d = read();
  if (!d.lessons.includes(lessonId)) {
    d.lessons.push(lessonId);
    try {
      localStorage.setItem(DKEY, JSON.stringify(d));
    } catch {
      /* private mode / quota — ignore */
    }
  }
  return d.lessons.length;
}
