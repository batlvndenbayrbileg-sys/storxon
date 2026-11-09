"use client";

import { useRef, useState } from "react";
import { buildBackup, restoreBackup } from "@/lib/lessons/backup";

/** Export / import learning progress as a JSON file (browser-only). */
export default function BackupPanel() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState("");

  function onExport() {
    const blob = new Blob([JSON.stringify(buildBackup(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `storxon-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMsg("Файл татагдлаа");
  }

  async function onImport(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    try {
      const n = restoreBackup(await f.text());
      setMsg(`${n} утга сэргээгдлээ — хуудсыг шинэчилж байна…`);
      setTimeout(() => location.reload(), 800);
    } catch {
      setMsg("Файл буруу байна");
    }
  }

  const btn =
    "rounded-lg border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800";
  return (
    <div className="mt-3 border-t border-zinc-200 pt-3 dark:border-zinc-800">
      <p className="mb-2 text-xs font-semibold text-zinc-500">Явцын нөөц</p>
      <div className="flex gap-2">
        <button type="button" onClick={onExport} className={btn}>
          Экспорт
        </button>
        <button type="button" onClick={() => fileRef.current?.click()} className={btn}>
          Импорт
        </button>
        <input ref={fileRef} type="file" accept="application/json,.json" onChange={onImport} className="hidden" aria-label="Явцын JSON файл сонгох" />
      </div>
      <p role="status" className="mt-1.5 min-h-4 text-xs text-zinc-500">
        {msg}
      </p>
    </div>
  );
}
