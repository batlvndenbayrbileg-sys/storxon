"use client";

import { formatCode } from "@/lib/formatCode";
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

type ConsoleLine = { level: "log" | "info" | "warn" | "error"; text: string; line?: number };
type Tab = "html" | "css" | "js";

const TAB_LABEL: Record<Tab, string> = { html: "HTML", css: "CSS", js: "JS" };

// --- Share link: code travels in the URL (?sx=...), no backend involved. ---
const SHARE_PARAM = "sx";
const SHARE_MAX = 6000;

function b64urlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(s: string): string {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

function readSharedFiles(id: string): PlaygroundFiles | null {
  try {
    const raw = new URLSearchParams(window.location.search).get(SHARE_PARAM);
    if (!raw) return null;
    const d = JSON.parse(b64urlDecode(raw)) as { p?: unknown; h?: unknown; c?: unknown; j?: unknown };
    if (d.p !== id) return null;
    if (typeof d.h !== "string" || typeof d.c !== "string" || typeof d.j !== "string") return null;
    return { html: d.h, css: d.c, js: d.j };
  } catch {
    return null;
  }
}

// Visible keyboard focus ring shared by every interactive control.
const FONT_KEY = "storxon:editor-font";
const FONT_MIN = 11;
const FONT_MAX = 20;
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-900";

function buildSrcDoc(f: PlaygroundFiles): string {
  // The relay shim forwards console + errors to the parent. User code follows.
  const shim = `
    (function () {
      function ser(a){ try { if (a instanceof Error) return a.name + ": " + a.message; if (typeof a === "undefined") return "undefined"; if (typeof a === "function") return String(a); if (typeof a === "object" && a !== null) { var j = JSON.stringify(a, null, 2); return j === undefined ? String(a) : j; } return String(a); } catch (e) { return String(a); } }
      function send(level, args, line){ parent.postMessage({ __sx_pg: true, level: level, line: line, text: Array.prototype.map.call(args, ser).join(" ") }, "*"); }
      function ul(n){ n = Number(n) - __SX_OFFSET__; return n >= 1 ? n : undefined; }
      window.__sxCatch = function(e){ var m = /srcdoc:(\d+):\d+/.exec(e && e.stack || ""); send("error", [(e && e.message) || String(e)], m ? ul(m[1]) : undefined); };
      ["log","info","warn","error"].forEach(function(l){ var o = console[l]; console[l] = function(){ send(l, arguments); try { o.apply(console, arguments); } catch(e){} }; });
      window.addEventListener("error", function(e){ send("error", [e.message + (e.filename ? " (" + e.lineno + ":" + e.colno + ")" : "")], e.lineno ? ul(e.lineno) : undefined); });
      window.addEventListener("unhandledrejection", function(e){ send("error", ["Unhandled: " + ser(e.reason)]); });
    })();
  `;
  const head = `<!doctype html><html><head><meta charset="utf-8"><style>${f.css}</style></head><body>${f.html}<script>${shim}</script><script>try{\n`;
  // User JS starts on the line after `try{`, so its line N is document line N + (newlines in head).
  const offset = head.split("\n").length - 1;
  return (head + `${f.js}\n}catch(e){ window.__sxCatch ? window.__sxCatch(e) : console.error(e && e.message || e); }</script></body></html>`).replace("__SX_OFFSET__", String(offset));
}

// Clean standalone page for download: same user code, no console-relay shim.
function buildStandaloneDoc(f: PlaygroundFiles): string {
  return `<!doctype html>
<html lang="mn">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Storxon</title>
<style>
${f.css}
</style>
</head>
<body>
${f.html}
<script>
${f.js}
</script>
</body>
</html>
`;
}

export default function Playground({
  starter,
  height = 260,
  onFilesChange,
  persistId,
  onErrorsChange,
}: {
  starter: PlaygroundFiles;
  height?: number;
  onFilesChange?: (f: PlaygroundFiles) => void;
  /** Called with the error messages currently in the console (empty when clean). */
  onErrorsChange?: (errors: string[]) => void;
  /** When set, the student's edits are saved (DB if signed in, else localStorage) and restored on return. */
  persistId?: string;
}) {
  const [files, setFiles] = useState<PlaygroundFiles>(starter);
  const [tab, setTab] = useState<Tab>("html");
  const [srcDoc, setSrcDoc] = useState<string>("");
  const [logs, setLogs] = useState<ConsoleLine[]>([]);
  const [full, setFull] = useState(false);
  const [copied, setCopied] = useState<"ok" | "fail" | null>(null);
  const [autoRun, setAutoRun] = useState(false);
  const [fontSize, setFontSize] = useState(13);
  const [toast, setToast] = useState<string | null>(null);
  // Preview width toggle: responsive check at phone / tablet / full width.
  const [device, setDevice] = useState<"full" | "tablet" | "phone">("full");
  // Lazy-load the preview iframe: only attach srcDoc once it nears the viewport.
  const [inView, setInView] = useState(false);
  const uid = useId();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const gutterRef = useRef<HTMLDivElement | null>(null);

  const run = useCallback(() => {
    setLogs([]);
    setSrcDoc(buildSrcDoc(files));
  }, [files]);

  // Manual run (button / Ctrl+Enter) also confirms with a small toast.
  const runManual = useCallback(() => {
    run();
    setToast("Ажиллууллаа ✓");
  }, [run]);

  // Optional live preview: re-run shortly after the student stops typing.
  // Off by default; toggled from the editor toolbar.
  useEffect(() => {
    if (!autoRun) return;
    const t = setTimeout(run, 700);
    return () => clearTimeout(t);
  }, [autoRun, run]);

  // Defer the iframe's content until it is close to the viewport.
  useEffect(() => {
    const el = iframeRef.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  // Restore the student's preferred editor font size.
  useEffect(() => {
    try {
      const v = Number(localStorage.getItem(FONT_KEY));
      if (v >= FONT_MIN && v <= FONT_MAX) setFontSize(v);
    } catch {}
  }, []);

  const changeFont = (delta: number) => {
    setFontSize((cur) => {
      const next = Math.min(FONT_MAX, Math.max(FONT_MIN, cur + delta));
      try {
        localStorage.setItem(FONT_KEY, String(next));
      } catch {}
      return next;
    });
  };

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
      // A shared link (?sx=...) for this exact exercise wins over saved code.
      const shared = readSharedFiles(persistId);
      const next = shared ?? saved;
      if (!alive || !next) return;
      setFiles(next);
      onFilesChange?.(next);
      setSrcDoc(buildSrcDoc(next));
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
      const d = e.data as { __sx_pg?: boolean; level?: ConsoleLine["level"]; text?: string; line?: number };
      if (!d || d.__sx_pg !== true) return;
      setLogs((prev) => [...prev.slice(-49), { level: d.level || "log", text: d.text || "", line: typeof d.line === "number" ? d.line : undefined }]);
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Let the parent know about console errors from the last run.
  useEffect(() => {
    onErrorsChange?.(logs.filter((l) => l.level === "error").map((l) => l.text));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logs]);

  const update = useCallback(
    (next: PlaygroundFiles) => {
      setFiles(next);
      onFilesChange?.(next);
      if (persistId) saveWorkspace(persistId, next);
    },
    [onFilesChange, persistId],
  );

  const modified =
    files.html !== starter.html || files.css !== starter.css || files.js !== starter.js;

  const reset = useCallback(() => {
    if (!window.confirm("Одоогийн кодыг устгаад эхлэлийн кодоор солих уу?")) return;
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
    setToast(ok ? "Хуулсан ✓" : "Хуулж чадсангүй");
  }, [files, tab]);

  // Build a link carrying the current code in a query param and copy it.
  const shareLink = useCallback(async () => {
    if (!persistId) return;
    const payload = b64urlEncode(JSON.stringify({ p: persistId, h: files.html, c: files.css, j: files.js }));
    if (payload.length > SHARE_MAX) {
      setToast("Код хэт урт тул холбоос үүсгэж чадсангүй");
      return;
    }
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set(SHARE_PARAM, payload);
    let ok = false;
    try {
      await navigator.clipboard.writeText(url.toString());
      ok = true;
    } catch {}
    setToast(ok ? "Холбоос хуулагдлаа ✓" : "Холбоос хуулж чадсангүй");
  }, [files, persistId]);

  const downloadHtml = useCallback(() => {
    const blob = new Blob([buildStandaloneDoc(files)], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "storxon.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [files]);

  const openPreviewTab = useCallback(() => {
    const blob = new Blob([buildStandaloneDoc(files)], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }, [files]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(null), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  const errorCount = logs.filter((l) => l.level === "error").length;
  // Line (1-based) of the latest JS error, shown in red in the JS editor gutter.
  const errorLine = useMemo(() => {
    const hit = [...logs].reverse().find((l) => l.level === "error" && l.line);
    return hit?.line;
  }, [logs]);

  const editorValue = files[tab];
  const lineCount = useMemo(() => editorValue.split("\n").length, [editorValue]);
  const onEdit = (v: string) => update({ ...files, [tab]: v });
  const formatTab = () => {
    const next = formatCode(tab, editorValue);
    if (next !== editorValue) onEdit(next);
    setToast("Код цэгцлэгдлээ");
  };

  // Tab key inserts two spaces instead of leaving the editor.
  // Ctrl/Cmd+Enter runs the code.
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runManual();
      return;
    }
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
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4"
      >
        {toast && (
          <span className="rounded-full bg-zinc-900/95 px-4 py-2 text-sm font-medium text-white shadow-lg ring-1 ring-violet-400/40">
            {toast}
          </span>
        )}
      </div>
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
                onClick={() => changeFont(-1)}
                disabled={fontSize <= FONT_MIN}
                aria-label="Editor-ийн фонтыг жижигрүүлэх"
                className={`rounded-md px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 ${FOCUS}`}
              >
                A−
              </button>
              <button
                type="button"
                onClick={() => changeFont(1)}
                disabled={fontSize >= FONT_MAX}
                aria-label="Editor-ийн фонтыг томруулах"
                className={`rounded-md px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 ${FOCUS}`}
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setAutoRun((v) => !v)}
                aria-pressed={autoRun}
                aria-label="Автомат урьдчилан харалт"
                title="Бичихээ больсны дараа код автоматаар ажиллана"
                className={`rounded-md px-2 py-1 text-xs font-medium ${FOCUS} ${
                  autoRun ? "bg-violet-600/30 text-violet-200" : "text-zinc-400 hover:text-white"
                }`}
              >
                Авто {autoRun ? "асаалттай" : "унтраалттай"}
              </button>
              <button
                type="button"
                onClick={formatTab}
                aria-label={`${TAB_LABEL[tab]} кодыг цэгцлэх`}
                className={`rounded-md px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white ${FOCUS}`}
              >
                Цэгцлэх
              </button>
              <button
                type="button"
                onClick={copyCode}
                aria-label={`${TAB_LABEL[tab]} кодыг хуулах`}
                className={`rounded-md px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white ${FOCUS}`}
              >
                {copied === "ok" ? "Хуулсан ✓" : copied === "fail" ? "Амжилтгүй" : "Хуулах"}
              </button>
              {persistId && (
                <button
                  type="button"
                  onClick={shareLink}
                  aria-label="Кодыг хуваалцах холбоос хуулах"
                  className={`rounded-md px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white ${FOCUS}`}
                >
                  Хуваалцах
                </button>
              )}
              <button
                type="button"
                onClick={downloadHtml}
                aria-label="Кодыг .html файлаар татах"
                className={`rounded-md px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white ${FOCUS}`}
              >
                Татах
              </button>
              <button
                type="button"
                onClick={openPreviewTab}
                aria-label="Preview-г шинэ табд нээх"
                className={`rounded-md px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white ${FOCUS}`}
              >
                Шинэ таб
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={!modified}
                aria-label="Кодыг эхлэлийн төлөвт буцаах"
                className={`rounded-md px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-zinc-400 ${FOCUS}`}
              >
                Эхлэлд буцаах
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
                onClick={runManual}
                aria-label="Кодыг ажиллуулах"
                title="Ctrl/Cmd + Enter"
                aria-keyshortcuts="Control+Enter Meta+Enter"
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
              className="select-none overflow-hidden bg-zinc-950/60 py-3 pl-2 pr-2 text-right font-mono leading-relaxed text-zinc-600"
              style={{ height: full ? undefined : height, fontSize }}
            >
              {Array.from({ length: lineCount }, (_, i) => {
                const bad = tab === "js" && errorLine === i + 1;
                return (
                  <div
                    key={i}
                    className={bad ? "-ml-2 -mr-2 bg-red-600/40 pl-2 pr-2 font-bold text-red-300" : undefined}
                    title={bad ? "Алдаа энэ мөрөнд байна" : undefined}
                  >
                    {i + 1}
                  </div>
                );
              })}
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
              className="min-h-0 min-w-0 flex-1 resize-none overflow-auto whitespace-pre bg-zinc-900 p-3 font-mono leading-relaxed text-zinc-100 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-400"
              style={{ height: full ? undefined : height, tabSize: 2, fontSize }}
              aria-label={`${TAB_LABEL[tab]} кодын редактор`}
            />
          </div>
        </div>

        {/* Preview + console */}
        <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            <span>Үр дүн</span>
            <div role="group" aria-label="Preview-н хэмжээ" className="flex gap-1">
              {(
                [
                  ["phone", "Утас", "Утасны хэмжээ (375px)"],
                  ["tablet", "Таблет", "Таблетын хэмжээ (768px)"],
                  ["full", "Дэлгэц", "Бүтэн өргөн"],
                ] as const
              ).map(([id, label, aria]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setDevice(id)}
                  aria-pressed={device === id}
                  aria-label={aria}
                  className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${FOCUS} ${
                    device === id
                      ? "bg-violet-600 text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-1 justify-center overflow-auto bg-zinc-100 dark:bg-zinc-950">
            <iframe
              ref={iframeRef}
              title="Кодын урьдчилан харалт"
              sandbox="allow-scripts"
              srcDoc={inView ? srcDoc : ""}
              className="max-w-full bg-white"
              style={{
                width: device === "phone" ? 375 : device === "tablet" ? 768 : "100%",
                height: full ? "100%" : height,
                minHeight: 120,
              }}
            />
          </div>
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
                  className={`whitespace-pre-wrap break-words ${
                    l.level === "error" ? "font-semibold text-red-300" : l.level === "warn" ? "text-amber-300" : "text-zinc-300"
                  }`}
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
