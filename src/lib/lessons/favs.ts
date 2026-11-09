"use client";

/** Bookmarked lessons, localStorage only (`sx-fav`): JSON array of lesson ids. */
const KEY = "sx-fav";

export function readFavs(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY);
    const v = raw ? (JSON.parse(raw) as unknown) : [];
    return new Set(Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
  } catch {
    return new Set();
  }
}

/** Toggle a lesson id; returns the updated set. */
export function toggleFav(id: string): Set<string> {
  const s = readFavs();
  if (s.has(id)) s.delete(id);
  else s.add(id);
  try {
    localStorage.setItem(KEY, JSON.stringify([...s]));
  } catch {
    /* private mode / quota — ignore */
  }
  return s;
}
