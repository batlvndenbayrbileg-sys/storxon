"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { PlaygroundFiles } from "@/lib/lessons/types";
import { loadWorkspace, saveWorkspace } from "@/lib/lessons/progress";

/**
 * Sandboxed HTML/CSS/JS playground.
 *
 * SECURITY (P0): the student's code runs inside an <iframe sandbox="allow-scripts">
 * with NO `allow-same-origin`. The frame is therefore a unique "null" origin and
 * cannot:
 *   - read the parent's cookies, localStorage, or the Supabase auth session,
 *   - reach same-origin app routes/APIs as the logged-in user,
 *   - navigate the top window or open popups.
 * We never inject app secrets into the srcdoc. Console/error output is relayed
 * back over postMessage and matched by `event.source === iframe.contentWindow`
 * (origin is "null" for a credential-less sandbox, so we identify by source).
 *
 * This component is a building block; it is not, by itself, a claim that every
 * future lesson type (e.g. arbitrary npm packages) is safe — only HTML/CSS/JS.
 */

type ConsoleLine = { level: "log" | "info" | "warn" | "error"; text: string };
type Tab = "html" | "css" | "js";

const TAB_LABEL: Record<Tab, string> = { html: "HTML", css: "CSS", js: "JS" };

// Visible keyboard focus ring shared by every interactive control.
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-900";

function buildSrcDoc(f: PlaygroundFiles): string {
  // The relay shim forwards console + errors to the parent. User code follows.
  const shim = `
    (function () {
      function ser(a){ try { return typeof a === "object" ? JSON.stringify(a) : String(a); } catch (e) { return String(a); } }
      function send(level, args){ parent.postMessage({ __sx_pg: true, level: level, text: Array.prototype.map.call(args, ser).join(" ") }, "*"); }
      ["log","info","warn","error"].forEach(function(l){ var o = console[l]; console[l] = function(){ send(l, arguments); try { o.apply(console, arguments); } catch(e){} }; });
      window.addEventListener("error", function(e){ send("error", [e.message + (e.filename ? " (" + e.lineno + ":" + e.colno + ")" : "")]); });
      window.addEventListener("unhandledrejection", function(e){ send("error", ["Unhandled: " + ser(e.reason)]); });
    })();
  `;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${f.css}</style></head><body>${f.html}<script>${shim}</script><script>try{\n${f.js}\n}catch(e){console.error(e && e.message || e);}</script></body></html>`;
}

export default function Playground({
  starter,
  height = 260,
  onFilesChange,
  persistId,
}: {
  starter: PlaygroundFiles;
  height?: number;
  onFilesChange?: (f: PlaygroundFiles) => void;
  /** When set, the student's edits are saved (DB if signed in, else localStorage) and restored on return. */
  persistId?: string;
}) {
  const [files, setFiles] = useState<PlaygroundFiles>(starter);
  const [tab, setTab] = useState<Tab>("html");
  const [srcDoc, setSrcDoc] = useState<string>("");
  const [logs, setLogs] = useState<ConsoleLine[]>([]);
  const [full, setFull] = useState(false);
  const [copied, setCopied] = useState<"ok" | "fail" | null>(null);
  const uid = useId();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const gutterRef = useRef<HTMLDivElement | null>(null);

  const run = useCallback(() => {
    setLogs([]);
    setSrcDoc(buildSrcDoc(files));
  }, [files]);

  // Run once on mount so the preview is never blank.
  useEffect(() => {
    setSrcDoc(buildSrcDoc(starter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restore the student's saved code (DB when signed in, else localStorage).
  // Overrides the starter preview above only if a saved version exists.
  useEffect(() => {
    if (!persistId) return;
    let alive = true;
    loadWorkspace(persistId).then((saved) => {
      if (!alive || !saved) return;
      setFiles(saved);
      onFilesChange?.(saved);
      setSrcDoc(buildSrcDoc(saved));
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistId]);

  // Relay console/errors from *our* iframe only.
  useEffect(() => {
    function onMsg(e: MessageEvent) {
      if (e.source !== iframeRef.current?.contentWindow) return;
      const d = e.data as { __sx_pg?: boolean; level?: ConsoleLine["level"]; text?: string };
      if (!d || d.__sx_pg !== true) return;
      setLogs((prev) => [...prev.slice(-49), { level: d.level || "log", text: d.text || "" }]);
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const update = useCallback(
    (next: PlaygroundFiles) => {
      setFiles(next);
      onFilesChange?.(next);
      if (persistId) saveWorkspace(persistId, next);
    },
    [onFilesChange, persistId],
  );

  const reset = useCallback(() => {
    update(starter);
    setLogs([]);
    setSrcDoc(buildSrcDoc(starter));
  }, [starter, update]);

  // Copy the active tab's code. Clipboard API can be unavailable/denied (insecure
  // context, permissions), so fall back to a hidden textarea + execCommand.
  const copyCode = useCallback(async () => {
    const text = files[tab];
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    setCopied(ok ? "ok" : "fail");
  }, [files, tab]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(null), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  const errorCount = logs.filter((l) => l.level === "error").length;

  const editorValue = files[tab];
  const lineCount = useMemo(() => editorValue.split("\n").length, [editorValue]);
  const onEdit = (v: string) => update({ ...files, [tab]: v });

  // Tab key inserts two spaces instead of leaving the editor.
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const el = e.currentTarget;
    const s = el.selectionStart;
    const next = editorValue.slice(0, s) + "  " + editorValue.slice(el.selectionEnd);
    onEdit(next);
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = s + 2;
    });
  };

  // Fullscreen: lock page scroll + Esc to close (important on phones where the
  // fixed overlay would otherwise scroll the page behind it).
  useEffect(() => {
    if (!full) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFull(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [full]);

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern).
  const onTabKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const order: Tab[] = ["html", "css", "js"];
    const i = order.indexOf(tab);
    let n = -1;
    if (e.key === "ArrowRight") n = (i + 1) % order.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + order.length) % order.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = order.length - 1;
    if (n < 0) return;
    e.preventDefault();
    setTab(order[n]);
    document.getElementById(`${uid}-tab-${order[n]}`)?.focus();
  };

  const wrap = full ? "fixed inset-0 z-50 overflow-hidden bg-zinc-950 p-2 sm:p-3" : "";

  return (
    <div className={wrap}>
      <div className={`grid gap-3 ${full ? "h-full grid-rows-[1fr_1fr] md:grid-rows-[1fr]" : ""} md:grid-cols-2`}>
        {/* Editor */}
        <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900">
          <div className="flex flex-wrap items-center gap-1 border-b border-zinc-800 px-2 py-1.5">
            <div role="tablist" aria-label="Кодын файлууд" className="flex items-center gap-1">
            {(["html", "css", "js"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                id={`${uid}-tab-${t}`}
                aria-selected={tab === t}
                tabIndex={tab === t ? 0 : -1}
                onClick={() => setTab(t)}
                onKeyDown={onTabKey}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${FOCUS} ${
                  tab === t
                    ? "bg-violet-600 text-white ring-1 ring-violet-300/60"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {TAB_LABEL[t]}
              </button>
            ))}
            </div>
            <div className="ml-auto flex items-center gap-1">
              <button
                type="button"
                onClick={copyCode}
                aria-label={`${TAB_LABEL[tab]} кодыг хуулах`}
                className={`rounded-md px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white ${FOCUS}`}
              >
                {copied === "ok" ? "Хуулсан ✓" : copied === "fail" ? "Амжилтгүй" : "Хуулах"}
              </button>
              <button
                type="button"
                onClick={reset}
                aria-label="Кодыг эхлэлийн төлөвт буцаах"
                className={`rounded-md px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white ${FOCUS}`}
              >
                Эхлэл
              </button>
              <button
                type="button"
                onClick={() => setFull((v) => !v)}
                aria-pressed={full}
                aria-label={full ? "Бүтэн дэлгэцийг хаах" : "Бүтэн дэлгэцээр нээх"}
                className={`rounded-md px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white ${FOCUS}`}
              >
                {full ? "Хаах" : "Дэлгэц"}
              </button>
              <button
                type="button"
                onClick={run}
                aria-label="Кодыг ажиллуулах"
                className={`rounded-md bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-500 ${FOCUS}`}
              >
                <span aria-hidden="true">▶</span> Ажиллуул
              </button>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 overflow-hidden">
            <div
              ref={gutterRef}
              aria-hidden="true"
              className="select-none overflow-hidden bg-zinc-950/60 py-3 pl-2 pr-2 text-right font-mono text-[13px] leading-relaxed text-zinc-600"
              style={{ height: full ? undefined : height }}
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              value={editorValue}
              onChange={(e) => onEdit(e.target.value)}
              onKeyDown={onKeyDown}
              onScroll={(e) => {
                if (gutterRef.current) gutterRef.current.scrollTop = e.currentTarget.scrollTop;
              }}
              spellCheck={false}
              wrap="off"
              className="min-h-0 min-w-0 flex-1 resize-none overflow-auto whitespace-pre bg-zinc-900 p-3 font-mono text-[13px] leading-relaxed text-zinc-100 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-400"
              style={{ height: full ? undefined : height, tabSize: 2 }}
              aria-label={`${TAB_LABEL[tab]} кодын редактор`}
            />
          </div>
        </div>

        {/* Preview + console */}
        <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-300 bg-white">
          <div className="border-b border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-500">Үр дүн</div>
          <iframe
            ref={iframeRef}
            title="Кодын урьдчилан харалт"
            sandbox="allow-scripts"
            srcDoc={srcDoc}
            className="w-full flex-1 bg-white"
            style={{ height: full ? undefined : height, minHeight: 120 }}
          />
          <div
            role="log"
            aria-label="Console гаралт"
            aria-live="polite"
            className={`max-h-28 overflow-auto border-t p-2 font-mono text-[12px] ${
              errorCount > 0 ? "border-red-500 bg-red-950/60" : "border-zinc-200 bg-zinc-950"
            }`}
          >
            {errorCount > 0 && (
              <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-red-300">
                ⚠ {errorCount} алдаа
              </div>
            )}
            {logs.length === 0 ? (
              <div className="text-zinc-600">console…</div>
            ) : (
              logs.map((l, i) => (
                <div
                  key={i}
                  className={
                    l.level === "error" ? "font-semibold text-red-300" : l.level === "warn" ? "text-amber-300" : "text-zinc-300"
                  }
                >
                  {l.text}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
