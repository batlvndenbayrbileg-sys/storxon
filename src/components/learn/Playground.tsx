"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PlaygroundFiles } from "@/lib/lessons/types";

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
}: {
  starter: PlaygroundFiles;
  height?: number;
  onFilesChange?: (f: PlaygroundFiles) => void;
}) {
  const [files, setFiles] = useState<PlaygroundFiles>(starter);
  const [tab, setTab] = useState<Tab>("html");
  const [srcDoc, setSrcDoc] = useState<string>("");
  const [logs, setLogs] = useState<ConsoleLine[]>([]);
  const [full, setFull] = useState(false);
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
    },
    [onFilesChange],
  );

  const reset = useCallback(() => {
    update(starter);
    setLogs([]);
    setSrcDoc(buildSrcDoc(starter));
  }, [starter, update]);

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

  const wrap = full ? "fixed inset-0 z-50 bg-zinc-950 p-3" : "";

  return (
    <div className={wrap}>
      <div className={`grid gap-3 ${full ? "h-full grid-rows-[1fr]" : ""} md:grid-cols-2`}>
        {/* Editor */}
        <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900">
          <div className="flex items-center gap-1 border-b border-zinc-800 px-2 py-1.5">
            {(["html", "css", "js"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  tab === t
                    ? "bg-violet-600 text-white ring-1 ring-violet-300/60"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {TAB_LABEL[t]}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-1">
              <button type="button" onClick={reset} className="rounded-md px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white">
                Эхлэл
              </button>
              <button type="button" onClick={() => setFull((v) => !v)} className="rounded-md px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white">
                {full ? "Хаах" : "Дэлгэц"}
              </button>
              <button type="button" onClick={run} className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-500">
                ▶ Ажиллуул
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
              className="min-h-0 min-w-0 flex-1 resize-none overflow-auto whitespace-pre bg-zinc-900 p-3 font-mono text-[13px] leading-relaxed text-zinc-100 outline-none"
              style={{ height: full ? undefined : height, tabSize: 2 }}
              aria-label={`${TAB_LABEL[tab]} editor`}
            />
          </div>
        </div>

        {/* Preview + console */}
        <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-300 bg-white">
          <div className="border-b border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-500">Үр дүн</div>
          <iframe
            ref={iframeRef}
            title="preview"
            sandbox="allow-scripts"
            srcDoc={srcDoc}
            className="w-full flex-1 bg-white"
            style={{ height: full ? undefined : height, minHeight: 120 }}
          />
          <div className="max-h-28 overflow-auto border-t border-zinc-200 bg-zinc-950 p-2 font-mono text-[12px]">
            {logs.length === 0 ? (
              <div className="text-zinc-600">console…</div>
            ) : (
              logs.map((l, i) => (
                <div
                  key={i}
                  className={
                    l.level === "error" ? "text-red-400" : l.level === "warn" ? "text-amber-300" : "text-zinc-300"
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
