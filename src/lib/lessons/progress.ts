"use client";

import { supabaseBrowser } from "@/lib/supabase/client";
import type { PlaygroundFiles } from "@/lib/lessons/types";

/**
 * Lesson progress + saved workspaces, resilient by design.
 *
 * - Signed-in student: reads/writes Supabase (`lesson_progress`, `workspaces`),
 *   each row scoped to the user by RLS (`user_id = auth.uid()`), and mirrors to
 *   localStorage so the UI has an instant offline copy.
 * - Signed-out (e.g. the public /playground demo) or any DB error: falls back to
 *   localStorage only. Nothing here ever throws into the UI.
 *
 * The schema + RLS for the two tables live in supabase/schema.sql and must be
 * run once in Supabase before the signed-in path does anything; until then this
 * silently behaves exactly like the old localStorage-only version.
 */

const PKEY = "sx-learn"; // progress:   { [taskId]: true }
const WKEY = "sx-ws"; // workspaces: { [blockId]: PlaygroundFiles }

// ---- localStorage helpers (always available; best-effort) ----
function lsGet<T>(key: string, def: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? ((JSON.parse(raw) as T) ?? def) : def;
  } catch {
    return def;
  }
}
function lsSet(key: string, val: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    /* private mode / quota — ignore */
  }
}

// ---- Supabase (lazy singleton) + cached user id ----
let _sb: ReturnType<typeof supabaseBrowser> | null = null;
function sb() {
  return (_sb ??= supabaseBrowser());
}

let _uid: Promise<string | null> | null = null;
function userId(): Promise<string | null> {
  return (_uid ??= (async () => {
    try {
      const { data } = await sb().auth.getUser();
      return data.user?.id ?? null;
    } catch {
      return null;
    }
  })());
}

// ---- progress ----
/**
 * Read completed task ids as `{ [taskId]: true }`.
 * Starts from localStorage; when signed in, merges completed rows from Supabase
 * (RLS-scoped to the user) and refreshes the local copy. Never throws — on any
 * error or when signed out it returns the local data.
 */
export async function loadProgress(): Promise<Record<string, boolean>> {
  const local = lsGet<Record<string, boolean>>(PKEY, {});
  const id = await userId();
  if (!id) return local;
  try {
    const { data, error } = await sb().from("lesson_progress").select("task_id").eq("completed", true);
    if (error || !data) return local;
    const merged = { ...local };
    for (const row of data as { task_id: string }[]) merged[row.task_id] = true;
    lsSet(PKEY, merged);
    return merged;
  } catch {
    return local;
  }
}

export async function markComplete(taskId: string): Promise<void> {
  const d = lsGet<Record<string, boolean>>(PKEY, {});
  d[taskId] = true;
  lsSet(PKEY, d);
  const id = await userId();
  if (!id) return;
  try {
    await sb()
      .from("lesson_progress")
      .upsert({ user_id: id, task_id: taskId, completed: true, updated_at: new Date().toISOString() }, { onConflict: "user_id,task_id" });
  } catch {
    /* kept in localStorage; DB sync is best-effort */
  }
}

// ---- workspaces (student's edited code, per block) ----
/**
 * Read the student's saved code for a block, or `null` if none.
 * Prefers the Supabase copy when signed in (and caches it locally), otherwise
 * falls back to localStorage. Never throws.
 */
export async function loadWorkspace(blockId: string): Promise<PlaygroundFiles | null> {
  const local = lsGet<Record<string, PlaygroundFiles>>(WKEY, {});
  const id = await userId();
  if (id) {
    try {
      const { data } = await sb().from("workspaces").select("code").eq("block_id", blockId).maybeSingle<{ code: PlaygroundFiles }>();
      if (data?.code) {
        local[blockId] = data.code;
        lsSet(WKEY, local);
        return data.code;
      }
    } catch {
      /* fall through to local */
    }
  }
  return local[blockId] ?? null;
}

const timers: Record<string, ReturnType<typeof setTimeout>> = {};
export function saveWorkspace(blockId: string, files: PlaygroundFiles): void {
  const local = lsGet<Record<string, PlaygroundFiles>>(WKEY, {});
  local[blockId] = files;
  lsSet(WKEY, local);
  // Debounce the network write so fast typing is one upsert, not dozens.
  clearTimeout(timers[blockId]);
  timers[blockId] = setTimeout(async () => {
    const id = await userId();
    if (!id) return;
    try {
      await sb()
        .from("workspaces")
        .upsert({ user_id: id, block_id: blockId, code: files, updated_at: new Date().toISOString() }, { onConflict: "user_id,block_id" });
    } catch {
      /* kept in localStorage; DB sync is best-effort */
    }
  }, 800);
}
