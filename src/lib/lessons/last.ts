"use client";

/** Last viewed lesson id, localStorage only (`sx-last`). */
const KEY = "sx-last";

export function readLast(): string | null {
  try {
    const v = localStorage.getItem(KEY);
    return v && v.length < 200 ? v : null;
  } catch {
    return null;
  }
}

export function saveLast(id: string): void {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    /* private mode / quota — ignore */
  }
}
