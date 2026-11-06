import { Fragment, type ReactNode } from "react";

type Lang = "html" | "css" | "js";

// Ordered token patterns per language; first matching group wins. No dependencies.
const RULES: Record<Lang, Array<[string, RegExp]>> = {
  html: [
    ["comment", /<!--[\s\S]*?-->/y],
    ["tag", /<\/?[a-zA-Z][\w-]*|\/?>/y],
    ["string", /"[^"]*"|'[^']*'/y],
    ["attr", /[a-zA-Z-]+(?==)/y],
  ],
  css: [
    ["comment", /\/\*[\s\S]*?\*\//y],
    ["string", /"[^"]*"|'[^']*'/y],
    ["number", /#[0-9a-fA-F]{3,8}\b|-?\d*\.?\d+(?:px|rem|em|%|vh|vw|s|ms|deg)?/y],
    ["keyword", /@[a-zA-Z-]+/y],
    ["attr", /[a-zA-Z-]+(?=\s*:)/y],
  ],
  js: [
    ["comment", /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
    ["string", /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/y],
    ["number", /\b\d+(?:\.\d+)?\b/y],
    [
      "keyword",
      /\b(?:const|let|var|function|return|if|else|for|while|of|in|new|class|import|export|from|true|false|null|undefined|typeof|async|await)\b/y,
    ],
  ],
};

const COLORS: Record<string, string> = {
  comment: "text-zinc-500 italic",
  string: "text-emerald-300",
  number: "text-amber-300",
  keyword: "text-fuchsia-300",
  tag: "text-sky-300",
  attr: "text-orange-300",
};

function tokenize(code: string, lang: Lang): ReactNode[] {
  const rules = RULES[lang];
  const out: ReactNode[] = [];
  let plain = "";
  let i = 0;
  const flush = () => {
    if (plain) out.push(<Fragment key={`p${out.length}`}>{plain}</Fragment>);
    plain = "";
  };
  while (i < code.length) {
    let hit = false;
    for (const [kind, re] of rules) {
      re.lastIndex = i;
      const m = re.exec(code);
      if (m && m[0].length > 0) {
        flush();
        out.push(
          <span key={`t${out.length}`} className={COLORS[kind]}>
            {m[0]}
          </span>,
        );
        i += m[0].length;
        hit = true;
        break;
      }
    }
    if (!hit) {
      plain += code[i];
      i += 1;
    }
  }
  flush();
  return out;
}

export default function HighlightedCode({ code, lang }: { code: string; lang: Lang }) {
  return <code>{tokenize(code, lang)}</code>;
}
