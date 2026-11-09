import type { Lesson } from "@/lib/lessons/types";

export const PROJECT_PROFILE_PAGE: Lesson = {
  id: "project-profile-page",
  module: 10,
  title: "Төсөл: Миний танилцуулга хуудас",
  objectives: [
    "HTML-ээр хуудасны бүтцийг алхам алхмаар босгох",
    "CSS-ээр карт маягийн загвар өгөх",
    "Холбоосуудыг Flexbox-оор эгнээнд байрлуулах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Бид юу бүтээх вэ?",
      html: `<p>Энэ төсөлд <strong>өөрийн танилцуулга хуудас</strong>-аа 3 алхамд бүтээнэ:</p><ol><li><strong>Бүтэц (HTML):</strong> нэр, товч намтар, холбоосууд.</li><li><strong>Загвар (CSS):</strong> өнгө, фонт, карт маягийн хүрээ.</li><li><strong>Байрлал (Flexbox):</strong> холбоосуудыг нэг эгнээнд гаргах.</li></ol><p>Алхам бүр өмнөхөө үргэлжлүүлнэ. Гацвал <em>зөвлөгөө</em>, хамгийн сүүлд <em>хариулт</em>-ыг ашигла.</p>`,
    },
    {
      kind: "exercise",
      title: "Алхам 1 — Хуудасны бүтэц",
      prompt:
        "HTML хэсэгт `<h1>` (өөрийн нэр), `<p>` (товч намтар) болон `<ul>` дотор `<li>`-тэй холбоосуудын жагсаалт (`<a href=\"...\">`) бич. Дараа нь Шалгах дээр дар.",
      starter: {
        html: `<!-- Энд бич -->\n`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      hint: "Эхлээд <h1>Таны нэр</h1>, дараа нь <p>...</p> бич.",
      hint2: "Холбоос: <ul><li><a href=\"https://example.com\">Миний сайт</a></li></ul>",
      solution: {
        html: `<h1>Бат</h1>\n<p>Би вэб хөгжүүлэгч болохоор суралцаж байна.</p>\n<ul>\n  <li><a href="https://example.com">Миний сайт</a></li>\n  <li><a href="https://github.com">GitHub</a></li>\n</ul>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "htmlIncludes", pattern: "<h1[^>]*>[^<]+</h1>", flags: "i", message: "`<h1>` дотор нэрээ бич." },
          { type: "htmlIncludes", pattern: "<p[^>]*>[^<]+</p>", flags: "i", message: "Товч намтрыг `<p>` дотор бич." },
          { type: "htmlIncludes", pattern: "<ul[^>]*>[\\s\\S]*<li[^>]*>[\\s\\S]*<a\\s[^>]*href", flags: "i", message: "`<ul>` → `<li>` → `<a href>` бүтэц олдсонгүй." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Алхам 2 — Карт загвар",
      prompt:
        "Хуудсаа `<div class=\"card\">`-д ороож, CSS-д `.card` дүрэм бич: `max-width`, `padding`, `border-radius`, `box-shadow` (эсвэл `border`) ашигла.",
      starter: {
        html: `<h1>Бат</h1>\n<p>Би вэб хөгжүүлэгч болохоор суралцаж байна.</p>\n<ul>\n  <li><a href="https://example.com">Миний сайт</a></li>\n  <li><a href="https://github.com">GitHub</a></li>\n</ul>`,
        css: `body { font-family: system-ui; padding: 16px; background: #f5f3ff; }`,
        js: ``,
      },
      hint: "HTML-ийг <div class=\"card\"> ... </div>-ээр бүхэлд нь ороо.",
      hint2: ".card { max-width: 420px; padding: 24px; border-radius: 16px; background: white; box-shadow: 0 8px 24px rgba(0,0,0,.12); }",
      solution: {
        html: `<div class="card">\n  <h1>Бат</h1>\n  <p>Би вэб хөгжүүлэгч болохоор суралцаж байна.</p>\n  <ul>\n    <li><a href="https://example.com">Миний сайт</a></li>\n    <li><a href="https://github.com">GitHub</a></li>\n  </ul>\n</div>`,
        css: `body { font-family: system-ui; padding: 16px; background: #f5f3ff; }\n.card { max-width: 420px; padding: 24px; border-radius: 16px; background: white; box-shadow: 0 8px 24px rgba(0,0,0,.12); }`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "htmlIncludes", pattern: "<div[^>]*class\\s*=\\s*[\"'][^\"']*\\bcard\\b", flags: "i", message: "`<div class=\"card\">` олдсонгүй." },
          { type: "cssIncludes", pattern: "\\.card\\s*\\{[^}]*padding\\s*:", flags: "i", message: "`.card`-д `padding` нэм." },
          { type: "cssIncludes", pattern: "\\.card\\s*\\{[^}]*border-radius\\s*:", flags: "i", message: "`.card`-д `border-radius` нэм." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Алхам 3 — Холбоосуудыг эгнээнд",
      prompt:
        "Жагсаалтын цэгийг арилгаж, холбоосуудыг нэг эгнээнд гарга: `ul`-д `display: flex`, `gap` ба `list-style: none` өг.",
      starter: {
        html: `<div class="card">\n  <h1>Бат</h1>\n  <p>Би вэб хөгжүүлэгч болохоор суралцаж байна.</p>\n  <ul>\n    <li><a href="https://example.com">Миний сайт</a></li>\n    <li><a href="https://github.com">GitHub</a></li>\n  </ul>\n</div>`,
        css: `body { font-family: system-ui; padding: 16px; background: #f5f3ff; }\n.card { max-width: 420px; padding: 24px; border-radius: 16px; background: white; box-shadow: 0 8px 24px rgba(0,0,0,.12); }`,
        js: ``,
      },
      hint: "ul { display: flex; } гэж эхэл.",
      hint2: "ul { display: flex; gap: 16px; list-style: none; padding: 0; }",
      solution: {
        html: `<div class="card">\n  <h1>Бат</h1>\n  <p>Би вэб хөгжүүлэгч болохоор суралцаж байна.</p>\n  <ul>\n    <li><a href="https://example.com">Миний сайт</a></li>\n    <li><a href="https://github.com">GitHub</a></li>\n  </ul>\n</div>`,
        css: `body { font-family: system-ui; padding: 16px; background: #f5f3ff; }\n.card { max-width: 420px; padding: 24px; border-radius: 16px; background: white; box-shadow: 0 8px 24px rgba(0,0,0,.12); }\nul { display: flex; gap: 16px; list-style: none; padding: 0; }`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "cssIncludes", pattern: "ul\\s*\\{[^}]*display\\s*:\\s*flex", flags: "i", message: "`ul`-д `display: flex` өг." },
          { type: "cssIncludes", pattern: "ul\\s*\\{[^}]*gap\\s*:", flags: "i", message: "`ul`-д `gap` нэм." },
          { type: "cssIncludes", pattern: "ul\\s*\\{[^}]*list-style\\s*:\\s*none", flags: "i", message: "`list-style: none` нэм." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Холбоосуудыг нэг эгнээнд, хоорондох зайтай байрлуулахад аль хослол тохирох вэ?",
      options: ["display: flex + gap", "position: fixed", "float: none", "visibility: hidden"],
      answer: 0,
      explain: "`display: flex` нь хүүхдүүдийг эгнээнд гаргаж, `gap` нь тэдгээрийн хоорондын зайг тохируулна.",
    },
  ],
};
