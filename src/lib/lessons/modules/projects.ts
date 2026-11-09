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

const CALC_HTML = `<div class="calc">
  <input id="a" type="number" value="8" aria-label="Эхний тоо">
  <select id="op" aria-label="Үйлдэл">
    <option value="+">+</option>
    <option value="-">−</option>
    <option value="*">×</option>
    <option value="/">÷</option>
  </select>
  <input id="b" type="number" value="2" aria-label="Хоёр дахь тоо">
  <button id="eq">=</button>
  <p id="out">Үр дүн: ?</p>
</div>`;

const CALC_CSS = `body { font-family: system-ui; padding: 16px; background: #f5f3ff; }
.calc { max-width: 360px; display: flex; flex-wrap: wrap; gap: 8px; padding: 20px; background: white; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,.12); }
.calc input, .calc select { width: 80px; padding: 8px; font-size: 16px; }
.calc button { padding: 8px 16px; font-size: 16px; }
#out { width: 100%; margin: 8px 0 0; font-size: 20px; font-weight: 700; }`;

const CALC_JS_STEP2 = `const a = document.getElementById("a");
const b = document.getElementById("b");
const op = document.getElementById("op");
const out = document.getElementById("out");

document.getElementById("eq").addEventListener("click", () => {
  out.textContent = "Үр дүн: " + (Number(a.value) + Number(b.value));
});`;

const CALC_JS_STEP3 = `const a = document.getElementById("a");
const b = document.getElementById("b");
const op = document.getElementById("op");
const out = document.getElementById("out");

function calculate(x, y, sign) {
  if (sign === "+") return x + y;
  if (sign === "-") return x - y;
  if (sign === "*") return x * y;
  if (sign === "/") {
    if (y === 0) return "0-д хуваах боломжгүй";
    return x / y;
  }
}

document.getElementById("eq").addEventListener("click", () => {
  out.textContent = "Үр дүн: " + calculate(Number(a.value), Number(b.value), op.value);
});`;

export const PROJECT_CALCULATOR: Lesson = {
  id: "project-calculator",
  module: 10,
  title: "Төсөл: Тооны машин",
  objectives: [
    "HTML + CSS-ээр тооны машины интерфэйс босгох",
    "Товч дарахад input-ийн утгыг уншиж, DOM-д үр дүн гаргах",
    "Үйлдэл бүрийг функцэд тусгаарлаж, 0-д хуваахаас хамгаалах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Бид юу бүтээх вэ?",
      html: `<p>Энэ төсөлд <strong>тооны машин</strong>-г 3 алхамд бүтээнэ:</p><ol><li><strong>Интерфэйс (HTML+CSS):</strong> хоёр тоо, үйлдлийн сонголт, «=» товч.</li><li><strong>Логик (JS):</strong> товч дарахад утгуудыг уншаад нэмнэ.</li><li><strong>Бүх үйлдэл:</strong> <code>+ − × ÷</code> ба 0-д хуваахаас хамгаалах.</li></ol><p>Санамж: <code>input.value</code> нь үргэлж <em>текст</em> байдаг тул <code>Number(...)</code>-ээр тоо болгоно, эс бөгөөс <code>"8" + "2"</code> нь <code>"82"</code> болно.</p>`,
    },
    {
      kind: "exercise",
      title: "Алхам 1 — Интерфэйс",
      prompt:
        "HTML хэсэгт `id=\"a\"`, `id=\"b\"` гэсэн хоёр `<input type=\"number\">`, `id=\"op\"` `<select>`, `id=\"eq\"` `<button>` ба үр дүнг харуулах `id=\"out\"` `<p>` бич. Дараа нь Шалгах дээр дар.",
      starter: {
        html: `<!-- Энд бич -->\n`,
        css: CALC_CSS,
        js: ``,
      },
      hint: "Эхлээд <input id=\"a\" type=\"number\"> бич, дараа нь <select id=\"op\"> дотор <option>-ууд нэм.",
      hint2: "<input id=\"a\" type=\"number\"> <select id=\"op\"><option value=\"+\">+</option></select> <input id=\"b\" type=\"number\"> <button id=\"eq\">=</button> <p id=\"out\"></p>",
      solution: { html: CALC_HTML, css: CALC_CSS, js: `` },
      check: {
        type: "allOf",
        checks: [
          { type: "htmlIncludes", pattern: "<input[^>]*id\\s*=\\s*[\"']a[\"']", flags: "i", message: "`id=\"a\"` input олдсонгүй." },
          { type: "htmlIncludes", pattern: "<input[^>]*id\\s*=\\s*[\"']b[\"']", flags: "i", message: "`id=\"b\"` input олдсонгүй." },
          { type: "htmlIncludes", pattern: "<select[^>]*id\\s*=\\s*[\"']op[\"'][^>]*>[\\s\\S]*<option", flags: "i", message: "`id=\"op\"` select ба `<option>` олдсонгүй." },
          { type: "htmlIncludes", pattern: "<button[^>]*id\\s*=\\s*[\"']eq[\"']", flags: "i", message: "`id=\"eq\"` товч олдсонгүй." },
          { type: "htmlIncludes", pattern: "<p[^>]*id\\s*=\\s*[\"']out[\"']", flags: "i", message: "`id=\"out\"` `<p>` олдсонгүй." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Алхам 2 — Нэмэх логик",
      prompt:
        "JS хэсэгт «=» товчинд `addEventListener(\"click\", ...)` холбож, `Number(a.value) + Number(b.value)`-ийн үр дүнг `out.textContent`-д гарга.",
      starter: {
        html: CALC_HTML,
        css: CALC_CSS,
        js: `const a = document.getElementById("a");\nconst b = document.getElementById("b");\nconst op = document.getElementById("op");\nconst out = document.getElementById("out");\n\n// Энд товчны click-д логик бич\n`,
      },
      hint: "document.getElementById(\"eq\").addEventListener(\"click\", () => { ... }) бич.",
      hint2: "out.textContent = \"Үр дүн: \" + (Number(a.value) + Number(b.value));",
      solution: { html: CALC_HTML, css: CALC_CSS, js: CALC_JS_STEP2 },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "addEventListener\\s*\\(\\s*[\"']click[\"']", flags: "", message: "`click` event-д холбоогүй байна." },
          { type: "jsIncludes", pattern: "Number\\s*\\(", flags: "", message: "`Number(...)`-ээр утгыг тоо болго." },
          { type: "jsIncludes", pattern: "out\\.textContent\\s*=", flags: "", message: "Үр дүнг `out.textContent`-д онооно." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Алхам 3 — Бүх үйлдэл ба 0-д хуваах",
      prompt:
        "`calculate(x, y, sign)` функц бич: `+`, `-`, `*`, `/` үйлдлийг шийд. `/` үед `y === 0` бол «0-д хуваах боломжгүй» мессеж буцаа. Товч дарахад `calculate(...)`-г `op.value`-тай дуудаж үр дүнг гарга.",
      starter: {
        html: CALC_HTML,
        css: CALC_CSS,
        js: CALC_JS_STEP2,
      },
      hint: "function calculate(x, y, sign) { if (sign === \"+\") return x + y; ... } гэж эхэл.",
      hint2: "\"/\" үед: if (y === 0) return \"0-д хуваах боломжгүй\"; return x / y;",
      solution: { html: CALC_HTML, css: CALC_CSS, js: CALC_JS_STEP3 },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "function\\s+calculate\\s*\\(", flags: "", message: "`calculate` функц олдсонгүй." },
          { type: "jsIncludes", pattern: "op\\.value", flags: "", message: "Үйлдлийг `op.value`-оос ав." },
          { type: "jsIncludes", pattern: "===?\\s*0", flags: "", message: "0-д хуваахаас хамгаалах шалгалт нэм (`y === 0`)." },
          { type: "jsIncludes", pattern: "x\\s*\\*\\s*y[\\s\\S]*x\\s*/\\s*y|x\\s*/\\s*y[\\s\\S]*x\\s*\\*\\s*y", flags: "", message: "`*` ба `/` үйлдлүүдийг хоёуланг нь хэрэгжүүл." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "`input.value` ямар төрлийн утга буцаадаг вэ, тооцоолохын өмнө юу хийх ёстой вэ?",
      options: [
        "Текст — Number(...)-ээр тоо болгоно",
        "Тоо — шууд нэмж болно",
        "Boolean — if-ээр шалгана",
        "Массив — for-оор гүйнэ",
      ],
      answer: 0,
      explain: "`input.value` үргэлж текст. `Number(...)`-гүйгээр `\"8\" + \"2\"` нь `\"82\"` болно.",
    },
  ],
};
