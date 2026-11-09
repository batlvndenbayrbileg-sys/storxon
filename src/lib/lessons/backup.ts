"use client";

/**
 * Progress backup, localStorage only. Exports every `sx-*` learning key as one
 * JSON file and restores it. Never touches the DB, auth or any non-`sx-` key.
 */
export const BACKUP_VERSION = 1;
const PREFIX = "sx-";
const MAX_VALUE = 500_000; // per-key sanity cap (chars)

export type Backup = { app: "storxon"; version: number; exportedAt: string; data: Record<string, string> };

export function buildBackup(): Backup {
  const data: Record<string, string> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(PREFIX)) {
        const v = localStorage.getItem(k);
        if (v !== null) data[k] = v;
      }
    }
  } catch {
    /* storage unavailable */
  }
  return { app: "storxon", version: BACKUP_VERSION, exportedAt: new Date().toISOString(), data };
}

/** Validates the parsed file and writes its `sx-*` keys. Returns count restored. */
export function restoreBackup(raw: string): number {
  const parsed = JSON.parse(raw) as Partial<Backup> | null;
  if (!parsed || parsed.app !== "storxon" || typeof parsed.data !== "object" || parsed.data === null) {
    throw new Error("invalid");
  }
  let n = 0;
  for (const [k, v] of Object.entries(parsed.data)) {
    if (!k.startsWith(PREFIX) || typeof v !== "string" || v.length > MAX_VALUE) continue;
    try {
      localStorage.setItem(k, v);
      n++;
    } catch {
      /* quota — skip */
    }
  }
  return n;
}
