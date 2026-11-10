// Tiny, dependency-free code re-indenter for the playground editor.
// It only fixes indentation / trailing whitespace; it never rewrites tokens.

const IND = "  ";

type BraceState = { block: boolean; tpl: boolean };

// Count net bracket depth change of a line, ignoring strings and comments.
// Returns [leadingClosers, netDelta] and updates multi-line state.
function scanLine(line: string, st: BraceState): { lead: number; delta: number } {
  let depth = 0;
  let lead = 0;
  let seenCode = false;
  let i = 0;
  while (i < line.length) {
    const c = line[i];
    const n = line[i + 1];
    if (st.block) {
      if (c === "*" && n === "/") {
        st.block = false;
        i += 2;
      } else i++;
      continue;
    }
    if (st.tpl) {
      if (c === "\\") i += 2;
      else {
        if (c === "`") st.tpl = false;
        i++;
      }
      continue;
    }
    if (c === "/" && n === "*") {
      st.block = true;
      i += 2;
      continue;
    }
    if (c === "/" && n === "/") break;
    if (c === "`") {
      st.tpl = true;
      seenCode = true;
      i++;
      continue;
    }
    if (c === '"' || c === "'") {
      seenCode = true;
      i++;
      while (i < line.length && line[i] !== c) i += line[i] === "\\" ? 2 : 1;
      i++;
      continue;
    }
    if (c === "{" || c === "(" || c === "[") {
      depth++;
      seenCode = true;
    } else if (c === "}" || c === ")" || c === "]") {
      depth--;
      if (!seenCode) lead++;
    } else if (c !== " " && c !== "\t") seenCode = true;
    i++;
  }
  return { lead, delta: depth };
}

// Re-indent JS or CSS by bracket depth. `base` is a starting indent level.
export function indentBraces(src: string, base = 0): string {
  const st: BraceState = { block: false, tpl: false };
  let depth = base;
  const out: string[] = [];
  for (const raw of src.replace(/\r\n?/g, "\n").split("\n")) {
    // Lines that begin inside a block comment / template literal stay as-is.
    if (st.block || st.tpl) {
      scanLine(raw, st);
      out.push(raw.replace(/\s+$/, ""));
      continue;
    }
    const line = raw.trim();
    if (!line) {
      out.push("");
      continue;
    }
    const { lead, delta } = scanLine(line, st);
    const level = Math.max(base, depth - lead);
    out.push(IND.repeat(level) + line);
    depth = Math.max(base, depth + delta);
  }
  return out.join("\n");
}

const VOID = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr",
]);

type RawTag = "script" | "style" | "pre" | "textarea";

// Re-indent HTML by tag depth; <script>/<style> bodies use the brace indenter.
export function indentHtml(src: string): string {
  const lines = src.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let depth = 0;
  let raw: RawTag | null = null;
  let buf: string[] = [];

  const flush = () => {
    if (!buf.length) return;
    if (raw === "script" || raw === "style") {
      out.push(...indentBraces(buf.join("\n"), depth).split("\n"));
    } else out.push(...buf);
    buf = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (raw) {
      const close = new RegExp(`</${raw}\\s*>`, "i").exec(line);
      if (!close) {
        buf.push(raw === "script" || raw === "style" ? line : rawLine.replace(/\s+$/, ""));
        continue;
      }
      // Closing tag on this line: body before it belongs to the raw block.
      const before = line.slice(0, close.index);
      if (before.trim()) buf.push(raw === "script" || raw === "style" ? before : before);
      flush();
      const wasRaw = raw;
      raw = null;
      if (wasRaw === "script" || wasRaw === "style") depth = Math.max(0, depth - 1);
      out.push(IND.repeat(depth) + line.slice(close.index));
      continue;
    }
    if (!line) {
      out.push("");
      continue;
    }
    // Tags on this line.
    let delta = 0;
    let lead = /^<\//.test(line) ? 1 : 0;
    const tagRe = /<(\/?)([a-zA-Z][\w-]*)(?:"[^"]*"|'[^']*'|[^'">])*?(\/?)>/g;
    let m: RegExpExecArray | null;
    let openRaw: RawTag | null = null;
    while ((m = tagRe.exec(line))) {
      const [, closing, name, selfClose] = m;
      const tag = name.toLowerCase();
      if (VOID.has(tag) || selfClose) continue;
      if (closing) delta--;
      else {
        delta++;
        if (tag === "script" || tag === "style" || tag === "pre" || tag === "textarea") {
          // Opened here and not closed on the same line -> raw block.
          const rest = line.slice(tagRe.lastIndex);
          if (!new RegExp(`</${tag}\\s*>`, "i").test(rest)) openRaw = tag;
        }
      }
    }
    if (line.startsWith("<!--") || line.startsWith("<!")) {
      delta = 0;
      lead = 0;
    }
    const level = Math.max(0, depth - lead);
    out.push(IND.repeat(level) + line);
    depth = Math.max(0, depth + delta);
    if (openRaw) raw = openRaw;
  }
  flush();
  return out.join("\n");
}

export function formatCode(kind: "html" | "css" | "js", src: string): string {
  const res = kind === "html" ? indentHtml(src) : indentBraces(src);
  return res.replace(/\n{3,}/g, "\n\n").replace(/\s+$/, "") + "\n";
}
