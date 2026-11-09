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

const TODO_HTML = `<div class="todo">
  <h2>Миний ажлууд</h2>
  <form id="form">
    <input id="task" type="text" placeholder="Шинэ ажил..." aria-label="Шинэ ажил">
    <button type="submit">Нэмэх</button>
  </form>
  <ul id="list"></ul>
</div>`;

const TODO_CSS = `body { font-family: system-ui; padding: 16px; background: #f5f3ff; }
.todo { max-width: 380px; padding: 20px; background: white; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,.12); }
.todo h2 { margin: 0 0 12px; }
#form { display: flex; gap: 8px; }
#task { flex: 1; padding: 8px; font-size: 16px; }
#form button { padding: 8px 14px; font-size: 16px; }
#list { list-style: none; padding: 0; margin: 12px 0 0; }
#list li { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #eee; cursor: pointer; }
#list li.done span { text-decoration: line-through; color: #999; }
#list li button { border: 0; background: none; color: #c00; font-size: 18px; cursor: pointer; }`;

const TODO_JS_STEP2 = `const form = document.getElementById("form");
const input = document.getElementById("task");
const list = document.getElementById("list");

let tasks = [];

function render() {
  list.innerHTML = "";
  tasks.forEach((t) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = t.text;
    li.appendChild(span);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text: text, done: false });
  input.value = "";
  render();
});

render();`;

const TODO_JS_STEP3 = `const form = document.getElementById("form");
const input = document.getElementById("task");
const list = document.getElementById("list");

let tasks = [];

function render() {
  list.innerHTML = "";
  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    if (t.done) li.classList.add("done");
    const span = document.createElement("span");
    span.textContent = t.text;
    li.appendChild(span);
    li.addEventListener("click", () => {
      tasks[i].done = !tasks[i].done;
      render();
    });
    const del = document.createElement("button");
    del.textContent = "×";
    del.setAttribute("aria-label", "Устгах");
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(i, 1);
      render();
    });
    li.appendChild(del);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text: text, done: false });
  input.value = "";
  render();
});

render();`;

const TODO_JS_STEP4 = `const form = document.getElementById("form");
const input = document.getElementById("task");
const list = document.getElementById("list");

const KEY = "sx-todo";
let memory = null; // localStorage ажиллахгүй үед санах ойд хадгална

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return memory || [];
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  } catch (err) {
    memory = tasks;
  }
}

let tasks = load();

function render() {
  list.innerHTML = "";
  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    if (t.done) li.classList.add("done");
    const span = document.createElement("span");
    span.textContent = t.text;
    li.appendChild(span);
    li.addEventListener("click", () => {
      tasks[i].done = !tasks[i].done;
      save();
      render();
    });
    const del = document.createElement("button");
    del.textContent = "×";
    del.setAttribute("aria-label", "Устгах");
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(i, 1);
      save();
      render();
    });
    li.appendChild(del);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text: text, done: false });
  input.value = "";
  save();
  render();
});

render();`;

export const PROJECT_TODO: Lesson = {
  id: "project-todo",
  module: 10,
  title: "Төсөл: To-do жагсаалт",
  objectives: [
    "Форм ба жагсаалтаар To-do аппын интерфэйсийг босгох",
    "Массивт ажил нэмж, `render()` функцээр DOM-ыг дахин зурах",
    "Ажил дуусгах/устгах, мөн localStorage-д хадгалах (алдаанаас хамгаалсан)",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Бид юу бүтээх вэ?",
      html: `<p>Энэ төсөлд <strong>To-do жагсаалт</strong>-ыг 4 алхамд бүтээнэ:</p><ol><li><strong>Интерфэйс (HTML):</strong> форм, текст input, жагсаалт.</li><li><strong>Нэмэх (JS):</strong> ажлуудыг массивт хадгалж <code>render()</code>-ээр зурах.</li><li><strong>Дуусгах ба устгах:</strong> дарахад дууссан гэж тэмдэглэх, × товчоор устгах.</li><li><strong>Хадгалах:</strong> <code>localStorage</code>-д хадгалах.</li></ol><p>Гол санаа: <em>өгөгдөл (массив) → render() → DOM</em>. Өгөгдлөө өөрчлөөд <code>render()</code>-ийг дахин дуудахад дэлгэц шинэчлэгдэнэ.</p><p><strong>Анхаар:</strong> манай playground тусгаарлагдсан (sandbox) тул <code>localStorage</code> энд хаалттай байж болно. Тиймээс <code>try/catch</code> ашиглана.</p>`,
    },
    {
      kind: "exercise",
      title: "Алхам 1 — Интерфэйс",
      prompt:
        "HTML хэсэгт `id=\"form\"` `<form>`, түүн дотор `id=\"task\"` `<input type=\"text\">` ба `<button>`, мөн `id=\"list\"` `<ul>` бич. Дараа нь Шалгах дээр дар.",
      starter: {
        html: `<!-- Энд бич -->\n`,
        css: TODO_CSS,
        js: ``,
      },
      hint: "Эхлээд <form id=\"form\"> дотор <input id=\"task\" type=\"text\"> ба <button type=\"submit\"> бич.",
      hint2: "<form id=\"form\"><input id=\"task\" type=\"text\"><button type=\"submit\">Нэмэх</button></form> <ul id=\"list\"></ul>",
      solution: { html: TODO_HTML, css: TODO_CSS, js: `` },
      check: {
        type: "allOf",
        checks: [
          { type: "htmlIncludes", pattern: "<form[^>]*id\\s*=\\s*[\"']form[\"']", flags: "i", message: "`id=\"form\"` form олдсонгүй." },
          { type: "htmlIncludes", pattern: "<input[^>]*id\\s*=\\s*[\"']task[\"']", flags: "i", message: "`id=\"task\"` input олдсонгүй." },
          { type: "htmlIncludes", pattern: "<button", flags: "i", message: "«Нэмэх» `<button>` нэм." },
          { type: "htmlIncludes", pattern: "<ul[^>]*id\\s*=\\s*[\"']list[\"']", flags: "i", message: "`id=\"list\"` `<ul>` олдсонгүй." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Алхам 2 — Ажил нэмэх",
      prompt:
        "`tasks` массив зарлаж, `render()` функц бич (жагсаалтыг цэвэрлээд ажил бүрт `<li>` үүсгэнэ). Формын `submit` үед `e.preventDefault()` дуудаж, шинэ ажлыг `tasks.push(...)`-ээр нэмээд `render()` дуудна.",
      starter: {
        html: TODO_HTML,
        css: TODO_CSS,
        js: `const form = document.getElementById("form");\nconst input = document.getElementById("task");\nconst list = document.getElementById("list");\n\n// Энд tasks массив, render(), submit логик бич\n`,
      },
      hint: "let tasks = []; function render() { list.innerHTML = \"\"; tasks.forEach(...) } гэж эхэл.",
      hint2: "form.addEventListener(\"submit\", (e) => { e.preventDefault(); tasks.push({ text: input.value, done: false }); render(); });",
      solution: { html: TODO_HTML, css: TODO_CSS, js: TODO_JS_STEP2 },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "(let|const|var)\\s+tasks\\s*=\\s*\\[", flags: "", message: "`tasks` массив зарла." },
          { type: "jsIncludes", pattern: "function\\s+render\\s*\\(", flags: "", message: "`render()` функц олдсонгүй." },
          { type: "jsIncludes", pattern: "addEventListener\\s*\\(\\s*[\"']submit[\"']", flags: "", message: "Формын `submit` event-д холбо." },
          { type: "jsIncludes", pattern: "preventDefault\\s*\\(", flags: "", message: "Хуудас дахин ачаалахаас сэргийлж `e.preventDefault()` дууд." },
          { type: "jsIncludes", pattern: "tasks\\.push\\s*\\(", flags: "", message: "Шинэ ажлыг `tasks.push(...)`-ээр нэм." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Алхам 3 — Дуусгах ба устгах",
      prompt:
        "`<li>`-д `click` холбож `tasks[i].done`-г эсрэгээр нь болго (`!`), `done` үед `done` класс нэм. Мөн × товч үүсгэж `tasks.splice(i, 1)`-ээр устга. Өөрчлөлт бүрийн дараа `render()` дууд.",
      starter: { html: TODO_HTML, css: TODO_CSS, js: TODO_JS_STEP2 },
      hint: "tasks.forEach((t, i) => { ... }) болгож индекс `i`-г ав.",
      hint2: "li.addEventListener(\"click\", () => { tasks[i].done = !tasks[i].done; render(); }); устгахад: tasks.splice(i, 1);",
      solution: { html: TODO_HTML, css: TODO_CSS, js: TODO_JS_STEP3 },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "\\.done\\s*=\\s*!", flags: "", message: "`done`-г эсрэгээр нь болго (`tasks[i].done = !tasks[i].done`)." },
          { type: "jsIncludes", pattern: "splice\\s*\\(", flags: "", message: "Устгахдаа `tasks.splice(i, 1)` ашигла." },
          { type: "jsIncludes", pattern: "classList\\.(add|toggle)\\s*\\(", flags: "", message: "Дууссан ажилд `classList.add(\"done\")` ашигла." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Алхам 4 — localStorage-д хадгалах",
      prompt:
        "`save()` функц бич: `localStorage.setItem(KEY, JSON.stringify(tasks))`. `load()` функц: `JSON.parse(localStorage.getItem(KEY))`. Хоёуланг `try/catch`-д ороо (sandbox-д localStorage хаалттай байж болно). `tasks`-ийг `load()`-оор эхлүүл, өөрчлөлт бүрийн дараа `save()` дууд.",
      starter: { html: TODO_HTML, css: TODO_CSS, js: TODO_JS_STEP3 },
      hint: "const KEY = \"sx-todo\"; function save() { try { ... } catch (err) { ... } } гэж эхэл.",
      hint2: "let tasks = load(); — мөн нэмэх, дуусгах, устгах бүрийн дараа save(); render(); гэж дууд.",
      solution: { html: TODO_HTML, css: TODO_CSS, js: TODO_JS_STEP4 },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "localStorage\\.setItem\\s*\\(", flags: "", message: "`localStorage.setItem(...)`-ээр хадгал." },
          { type: "jsIncludes", pattern: "localStorage\\.getItem\\s*\\(", flags: "", message: "`localStorage.getItem(...)`-ээр уншаарай." },
          { type: "jsIncludes", pattern: "JSON\\.stringify\\s*\\(", flags: "", message: "Массивыг `JSON.stringify`-аар текст болго." },
          { type: "jsIncludes", pattern: "JSON\\.parse\\s*\\(", flags: "", message: "Уншихдаа `JSON.parse`-аар буцаан массив болго." },
          { type: "jsIncludes", pattern: "try\\s*\\{[\\s\\S]*catch", flags: "", message: "`try/catch`-ээр хамгаал (sandbox-д localStorage хаалттай байж болно)." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Массивт ажил нэмсний дараа дэлгэц шинэчлэгдэхийн тулд юу хийх ёстой вэ?",
      options: [
        "render()-ийг дахин дуудна",
        "Хуудсыг гараар refresh хийнэ",
        "CSS-д display: block нэмнэ",
        "console.log хийнэ",
      ],
      answer: 0,
      explain: "Өгөгдөл (массив) өөрчлөгдөхөд DOM өөрөө шинэчлэгдэхгүй. `render()` нь массивын одоогийн төлөвөөр жагсаалтыг дахин зурна.",
    },
  ],
};

const QUIZ_HTML = `<div class="quiz">
  <h2>Мини шалгалт</h2>
  <p id="progress">Асуулт 1</p>
  <p id="question">Асуулт энд гарна</p>
  <div id="options"></div>
  <p id="result" aria-live="polite"></p>
</div>`;

const QUIZ_CSS = `body { font-family: system-ui; padding: 16px; background: #f5f3ff; }
.quiz { max-width: 380px; padding: 20px; background: white; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,.12); }
.quiz h2 { margin: 0 0 8px; }
#progress { margin: 0; color: #666; font-size: 14px; }
#question { font-size: 18px; font-weight: 700; }
#options { display: grid; gap: 8px; }
#options button { padding: 10px; font-size: 16px; text-align: left; border: 2px solid #ddd; border-radius: 10px; background: white; cursor: pointer; }
#options button.right { border-color: #16a34a; background: #dcfce7; }
#options button.wrong { border-color: #dc2626; background: #fee2e2; }
#result { margin: 12px 0 0; font-size: 18px; font-weight: 700; }`;

const QUIZ_JS_STEP2 = `const progress = document.getElementById("progress");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const result = document.getElementById("result");

const questions = [
  { q: "HTML-ийн гарчгийн хамгийн том tag аль вэ?", options: ["<h1>", "<h6>", "<p>"], answer: 0 },
  { q: "CSS-ээр өнгө өөрчлөх property аль вэ?", options: ["size", "color", "href"], answer: 1 },
  { q: "JS-д хувьсагч зарлах түлхүүр үг аль вэ?", options: ["let", "paint", "tag"], answer: 0 },
];

let index = 0;

function render() {
  const item = questions[index];
  progress.textContent = "Асуулт " + (index + 1) + " / " + questions.length;
  questionEl.textContent = item.q;
  optionsEl.innerHTML = "";
  item.options.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    optionsEl.appendChild(btn);
  });
}

render();`;

const QUIZ_JS_STEP3 = `const progress = document.getElementById("progress");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const result = document.getElementById("result");

const questions = [
  { q: "HTML-ийн гарчгийн хамгийн том tag аль вэ?", options: ["<h1>", "<h6>", "<p>"], answer: 0 },
  { q: "CSS-ээр өнгө өөрчлөх property аль вэ?", options: ["size", "color", "href"], answer: 1 },
  { q: "JS-д хувьсагч зарлах түлхүүр үг аль вэ?", options: ["let", "paint", "tag"], answer: 0 },
];

let index = 0;
let score = 0;

function render() {
  const item = questions[index];
  progress.textContent = "Асуулт " + (index + 1) + " / " + questions.length;
  questionEl.textContent = item.q;
  optionsEl.innerHTML = "";
  item.options.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.addEventListener("click", () => choose(i));
    optionsEl.appendChild(btn);
  });
}

function choose(i) {
  if (i === questions[index].answer) {
    score++;
    result.textContent = "Зөв! Оноо: " + score;
  } else {
    result.textContent = "Буруу. Оноо: " + score;
  }
}

render();`;

const QUIZ_JS_STEP4 = `const progress = document.getElementById("progress");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const result = document.getElementById("result");

const questions = [
  { q: "HTML-ийн гарчгийн хамгийн том tag аль вэ?", options: ["<h1>", "<h6>", "<p>"], answer: 0 },
  { q: "CSS-ээр өнгө өөрчлөх property аль вэ?", options: ["size", "color", "href"], answer: 1 },
  { q: "JS-д хувьсагч зарлах түлхүүр үг аль вэ?", options: ["let", "paint", "tag"], answer: 0 },
];

let index = 0;
let score = 0;

function render() {
  const item = questions[index];
  progress.textContent = "Асуулт " + (index + 1) + " / " + questions.length;
  questionEl.textContent = item.q;
  optionsEl.innerHTML = "";
  item.options.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.addEventListener("click", () => choose(i));
    optionsEl.appendChild(btn);
  });
}

function choose(i) {
  if (i === questions[index].answer) {
    score++;
    result.textContent = "Зөв! Оноо: " + score;
  } else {
    result.textContent = "Буруу. Оноо: " + score;
  }
  index++;
  setTimeout(() => {
    result.textContent = "";
    if (index < questions.length) {
      render();
    } else {
      showFinal();
    }
  }, 700);
}

function showFinal() {
  progress.textContent = "Дууслаа";
  questionEl.textContent = "Таны оноо: " + score + " / " + questions.length;
  optionsEl.innerHTML = "";
  const again = document.createElement("button");
  again.textContent = "Дахин эхлэх";
  again.addEventListener("click", () => {
    index = 0;
    score = 0;
    render();
  });
  optionsEl.appendChild(again);
}

render();`;

export const PROJECT_QUIZ: Lesson = {
  id: "project-quiz",
  module: 10,
  title: "Төсөл: Асуулт хариулт (quiz) тоглоом",
  objectives: [
    "Асуултуудыг объектын массивт хадгалж, нэг нэгээр нь үзүүлэх",
    "Сонголт дарахад хариуг шалгаж оноо тооцох",
    "Бүх асуулт дууссаны дараа эцсийн оноог гаргаж, дахин эхлүүлэх",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Бид юу бүтээх вэ?",
      html: `<p>Энэ төсөлд <strong>асуулт хариулт тоглоом</strong>-ыг 4 алхамд бүтээнэ:</p><ol><li><strong>Интерфэйс (HTML):</strong> асуулт, сонголтууд, үр дүнгийн хэсэг.</li><li><strong>Асуулт үзүүлэх (JS):</strong> асуултуудыг массивт хийж <code>render()</code>-ээр зурах.</li><li><strong>Хариу шалгах:</strong> сонголт дарахад зөв эсэхийг шалгаж оноо нэмэх.</li><li><strong>Дуусгах:</strong> эцсийн оноо, «Дахин эхлэх» товч.</li></ol><p>Асуулт бүр <code>{ q, options, answer }</code> хэлбэртэй объект бөгөөд <code>answer</code> нь зөв сонголтын индекс (0-ээс эхэлнэ).</p>`,
    },
    {
      kind: "exercise",
      title: "Алхам 1 — Интерфэйс",
      prompt:
        "HTML хэсэгт `id=\"question\"` `<p>`, `id=\"options\"` `<div>` (сонголтын товчнууд энд орно) болон `id=\"result\"` `<p>` бич. Дараа нь Шалгах дээр дар.",
      starter: {
        html: `<!-- Энд бич -->\n`,
        css: QUIZ_CSS,
        js: ``,
      },
      hint: "Эхлээд <p id=\"question\"></p> бич.",
      hint2: "<p id=\"question\"></p> <div id=\"options\"></div> <p id=\"result\"></p>",
      solution: { html: QUIZ_HTML, css: QUIZ_CSS, js: `` },
      check: {
        type: "allOf",
        checks: [
          { type: "htmlIncludes", pattern: "<p[^>]*id\\s*=\\s*[\"']question[\"']", flags: "i", message: "`id=\"question\"` `<p>` олдсонгүй." },
          { type: "htmlIncludes", pattern: "<div[^>]*id\\s*=\\s*[\"']options[\"']", flags: "i", message: "`id=\"options\"` `<div>` олдсонгүй." },
          { type: "htmlIncludes", pattern: "<p[^>]*id\\s*=\\s*[\"']result[\"']", flags: "i", message: "`id=\"result\"` `<p>` олдсонгүй." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Алхам 2 — Асуулт үзүүлэх",
      prompt:
        "`questions` массивт `{ q, options, answer }` бүтэцтэй асуултууд зарла, `let index = 0;` хий. `render()` функц бич: асуултыг `question.textContent`-д гаргаад `options`-г цэвэрлэж, сонголт бүрт `document.createElement(\"button\")` үүсгэж нэм.",
      starter: {
        html: QUIZ_HTML,
        css: QUIZ_CSS,
        js: `const progress = document.getElementById("progress");\nconst questionEl = document.getElementById("question");\nconst optionsEl = document.getElementById("options");\nconst result = document.getElementById("result");\n\n// Энд questions массив, index, render() бич\n`,
      },
      hint: "const questions = [{ q: \"...\", options: [\"a\", \"b\"], answer: 0 }]; гэж эхэл.",
      hint2: "function render() { const item = questions[index]; questionEl.textContent = item.q; optionsEl.innerHTML = \"\"; item.options.forEach((text) => { const btn = document.createElement(\"button\"); btn.textContent = text; optionsEl.appendChild(btn); }); }",
      solution: { html: QUIZ_HTML, css: QUIZ_CSS, js: QUIZ_JS_STEP2 },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "(let|const|var)\\s+questions\\s*=\\s*\\[", flags: "", message: "`questions` массив зарла." },
          { type: "jsIncludes", pattern: "answer\\s*:", flags: "", message: "Асуулт бүрт `answer:` (зөв сонголтын индекс) нэм." },
          { type: "jsIncludes", pattern: "function\\s+render\\s*\\(", flags: "", message: "`render()` функц олдсонгүй." },
          { type: "jsIncludes", pattern: "createElement\\s*\\(\\s*[\"']button[\"']", flags: "", message: "Сонголт бүрт `createElement(\"button\")` ашигла." },
          { type: "jsIncludes", pattern: "\\.forEach\\s*\\(", flags: "", message: "Сонголтуудаар `forEach`-ээр гүй." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Алхам 3 — Хариу шалгах ба оноо",
      prompt:
        "`let score = 0;` нэм. Сонголтын товчинд `click` холбож `choose(i)` дууд. `choose(i)` дотор `i === questions[index].answer` эсэхийг шалгаж, зөв бол `score++` хийгээд `result.textContent`-д «Зөв!» / «Буруу.» мессеж гарга.",
      starter: { html: QUIZ_HTML, css: QUIZ_CSS, js: QUIZ_JS_STEP2 },
      hint: "btn.addEventListener(\"click\", () => choose(i)); гэж render() дотор холбо.",
      hint2: "function choose(i) { if (i === questions[index].answer) { score++; result.textContent = \"Зөв!\"; } else { result.textContent = \"Буруу.\"; } }",
      solution: { html: QUIZ_HTML, css: QUIZ_CSS, js: QUIZ_JS_STEP3 },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "(let|var)\\s+score\\s*=\\s*0", flags: "", message: "`let score = 0;` зарла." },
          { type: "jsIncludes", pattern: "function\\s+choose\\s*\\(", flags: "", message: "`choose(i)` функц олдсонгүй." },
          { type: "jsIncludes", pattern: "addEventListener\\s*\\(\\s*[\"']click[\"']", flags: "", message: "Товчинд `click` event холбо." },
          { type: "jsIncludes", pattern: "===\\s*questions\\s*\\[\\s*index\\s*\\]\\.answer", flags: "", message: "`i === questions[index].answer` гэж зөв хариуг шалга." },
          { type: "jsIncludes", pattern: "score\\s*(\\+\\+|\\+=\\s*1)", flags: "", message: "Зөв үед `score++` хий." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Алхам 4 — Дараагийн асуулт ба эцсийн оноо",
      prompt:
        "`choose()` дотор `index++` хийж, `setTimeout`-оор богино хүлээгээд `index < questions.length` бол `render()`, үгүй бол `showFinal()` дууд. `showFinal()` нь `Таны оноо: score / questions.length` гаргаж, «Дахин эхлэх» товч үүсгэн `index` ба `score`-г 0 болгоно.",
      starter: { html: QUIZ_HTML, css: QUIZ_CSS, js: QUIZ_JS_STEP3 },
      hint: "choose() төгсгөлд index++; setTimeout(() => { ... }, 700); гэж бич.",
      hint2: "if (index < questions.length) { render(); } else { showFinal(); } — showFinal()-д index = 0; score = 0; render(); гэж дахин эхлүүл.",
      solution: { html: QUIZ_HTML, css: QUIZ_CSS, js: QUIZ_JS_STEP4 },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "index\\s*(\\+\\+|\\+=\\s*1)", flags: "", message: "Дараагийн асуулт руу `index++` хий." },
          { type: "jsIncludes", pattern: "index\\s*<\\s*questions\\.length", flags: "", message: "`index < questions.length` гэж асуулт үлдсэн эсэхийг шалга." },
          { type: "jsIncludes", pattern: "function\\s+showFinal\\s*\\(", flags: "", message: "`showFinal()` функц бич." },
          { type: "jsIncludes", pattern: "setTimeout\\s*\\(", flags: "", message: "`setTimeout`-оор богино хүлээж дараагийн асуултыг үзүүл." },
          { type: "jsIncludes", pattern: "score\\s*=\\s*0", flags: "", message: "Дахин эхлэхэд `score = 0` болго." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Асуулт бүрийн `answer: 1` гэдэг юу илэрхийлэх вэ?",
      options: [
        "Зөв сонголт нь options массивын 1 индекстэй (хоёр дахь) элемент",
        "Асуулт нэг оноотой",
        "Хэрэглэгч нэг удаа хариулна",
        "Зөв сонголт нь 1 тэмдэгттэй",
      ],
      answer: 0,
      explain: "Массивын индекс 0-ээс эхэлдэг тул `answer: 1` нь `options[1]` буюу хоёр дахь сонголтыг зөв гэж заана.",
    },
  ],
};

const TIMER_HTML = `<div class="timer">
  <h2>Секундомер</h2>
  <p id="display" aria-live="off">00:00</p>
  <div class="row">
    <button id="toggle">Эхлүүлэх</button>
    <button id="reset">Шинэчлэх</button>
  </div>
</div>`;

const TIMER_CSS = `body { font-family: system-ui; padding: 16px; background: #f5f3ff; }
.timer { max-width: 320px; padding: 20px; background: white; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,.12); text-align: center; }
.timer h2 { margin: 0 0 8px; }
#display { margin: 8px 0 16px; font-size: 48px; font-weight: 800; font-variant-numeric: tabular-nums; }
.row { display: flex; gap: 8px; justify-content: center; }
.row button { padding: 10px 16px; font-size: 16px; border: 0; border-radius: 10px; background: #6d28d9; color: white; cursor: pointer; }
#reset { background: #e5e7eb; color: #111; }`;

const TIMER_JS_STEP2 = `const display = document.getElementById("display");
const toggle = document.getElementById("toggle");
const reset = document.getElementById("reset");

let seconds = 0;

function pad(n) {
  return String(n).padStart(2, "0");
}

function format(total) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return pad(m) + ":" + pad(s);
}

function show() {
  display.textContent = format(seconds);
}

show();`;

const TIMER_JS_STEP3 = `const display = document.getElementById("display");
const toggle = document.getElementById("toggle");
const reset = document.getElementById("reset");

let seconds = 0;
let timerId = null;

function pad(n) {
  return String(n).padStart(2, "0");
}

function format(total) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return pad(m) + ":" + pad(s);
}

function show() {
  display.textContent = format(seconds);
}

toggle.addEventListener("click", () => {
  if (timerId === null) {
    timerId = setInterval(() => {
      seconds++;
      show();
    }, 1000);
    toggle.textContent = "Түр зогсоох";
  } else {
    clearInterval(timerId);
    timerId = null;
    toggle.textContent = "Үргэлжлүүлэх";
  }
});

show();`;

const TIMER_JS_STEP4 = `const display = document.getElementById("display");
const toggle = document.getElementById("toggle");
const reset = document.getElementById("reset");

let seconds = 0;
let timerId = null;

function pad(n) {
  return String(n).padStart(2, "0");
}

function format(total) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return pad(m) + ":" + pad(s);
}

function show() {
  display.textContent = format(seconds);
}

toggle.addEventListener("click", () => {
  if (timerId === null) {
    timerId = setInterval(() => {
      seconds++;
      show();
    }, 1000);
    toggle.textContent = "Түр зогсоох";
  } else {
    clearInterval(timerId);
    timerId = null;
    toggle.textContent = "Үргэлжлүүлэх";
  }
});

reset.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
  seconds = 0;
  toggle.textContent = "Эхлүүлэх";
  show();
});

show();`;

export const PROJECT_TIMER: Lesson = {
  id: "project-timer",
  module: 10,
  title: "Төсөл: Цаг/таймер апп (секундомер)",
  objectives: [
    "Секундыг мм:сс хэлбэрт форматлан дэлгэцэнд гаргах",
    "setInterval-аар секунд тоолж, clearInterval-аар зогсоох",
    "Эхлүүлэх/түр зогсоох товч болон шинэчлэх товчийг хэрэгжүүлэх",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Бид юу бүтээх вэ?",
      html: `<p>Энэ төсөлд <strong>секундомер</strong>-ыг 4 алхамд бүтээнэ:</p><ol><li><strong>Интерфэйс (HTML):</strong> цаг харуулах хэсэг, хоёр товч.</li><li><strong>Формат (JS):</strong> секундийг <code>мм:сс</code> болгох <code>format()</code> функц.</li><li><strong>Тоолуур:</strong> <code>setInterval</code>-аар секунд бүр нэмж, <code>clearInterval</code>-аар зогсоох.</li><li><strong>Шинэчлэх:</strong> тоолуурыг 0 болгож, төлөвийг анхны байдалд оруулах.</li></ol><p>Санамж: <code>setInterval</code> нь <em>id</em> буцаадаг. Тэр id-г хувьсагчид хадгалж байж л <code>clearInterval(id)</code>-ээр зогсоож чадна.</p>`,
    },
    {
      kind: "exercise",
      title: "Алхам 1 — Интерфэйс",
      prompt:
        "HTML хэсэгт цаг харуулах `id=\"display\"` `<p>`, мөн `id=\"toggle\"` ба `id=\"reset\"` гэсэн хоёр `<button>` бич. Дараа нь Шалгах дээр дар.",
      starter: {
        html: `<!-- Энд бич -->\n`,
        css: TIMER_CSS,
        js: ``,
      },
      hint: "Эхлээд <p id=\"display\">00:00</p> бич.",
      hint2: "<p id=\"display\">00:00</p> <button id=\"toggle\">Эхлүүлэх</button> <button id=\"reset\">Шинэчлэх</button>",
      solution: { html: TIMER_HTML, css: TIMER_CSS, js: `` },
      check: {
        type: "allOf",
        checks: [
          { type: "htmlIncludes", pattern: "<p[^>]*id\\s*=\\s*[\"']display[\"']", flags: "i", message: "`id=\"display\"` `<p>` олдсонгүй." },
          { type: "htmlIncludes", pattern: "<button[^>]*id\\s*=\\s*[\"']toggle[\"']", flags: "i", message: "`id=\"toggle\"` товч олдсонгүй." },
          { type: "htmlIncludes", pattern: "<button[^>]*id\\s*=\\s*[\"']reset[\"']", flags: "i", message: "`id=\"reset\"` товч олдсонгүй." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Алхам 2 — Цаг форматлах",
      prompt:
        "`let seconds = 0;` зарла. `format(total)` функц бич: минут = `Math.floor(total / 60)`, секунд = `total % 60`, хоёуланг нь `padStart(2, \"0\")`-ээр хоёр оронтой болгож `мм:сс` буцаа. `show()` нь `display.textContent`-д `format(seconds)`-г онооно.",
      starter: {
        html: TIMER_HTML,
        css: TIMER_CSS,
        js: `const display = document.getElementById("display");\nconst toggle = document.getElementById("toggle");\nconst reset = document.getElementById("reset");\n\n// Энд seconds, format(), show() бич\n`,
      },
      hint: "function format(total) { const m = Math.floor(total / 60); const s = total % 60; ... } гэж эхэл.",
      hint2: "return String(m).padStart(2, \"0\") + \":\" + String(s).padStart(2, \"0\");",
      solution: { html: TIMER_HTML, css: TIMER_CSS, js: TIMER_JS_STEP2 },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "(let|var)\\s+seconds\\s*=\\s*0", flags: "", message: "`let seconds = 0;` зарла." },
          { type: "jsIncludes", pattern: "function\\s+format\\s*\\(", flags: "", message: "`format(total)` функц олдсонгүй." },
          { type: "jsIncludes", pattern: "Math\\.floor\\s*\\(", flags: "", message: "Минутыг `Math.floor(total / 60)`-аар ол." },
          { type: "jsIncludes", pattern: "%\\s*60", flags: "", message: "Секундийг `total % 60`-аар ол." },
          { type: "jsIncludes", pattern: "padStart\\s*\\(\\s*2", flags: "", message: "`padStart(2, \"0\")`-ээр хоёр оронтой болго." },
          { type: "jsIncludes", pattern: "display\\.textContent\\s*=", flags: "", message: "Цагийг `display.textContent`-д онооно." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Алхам 3 — Эхлүүлэх ба түр зогсоох",
      prompt:
        "`let timerId = null;` нэм. «toggle» товчинд `click` холбо: `timerId === null` бол `setInterval`-аар 1000 мс тутам `seconds++` хийж `show()` дууд; үгүй бол `clearInterval(timerId)` хийгээд `timerId = null` болго.",
      starter: { html: TIMER_HTML, css: TIMER_CSS, js: TIMER_JS_STEP2 },
      hint: "toggle.addEventListener(\"click\", () => { if (timerId === null) { ... } else { ... } });",
      hint2: "timerId = setInterval(() => { seconds++; show(); }, 1000); — зогсоохдоо clearInterval(timerId); timerId = null;",
      solution: { html: TIMER_HTML, css: TIMER_CSS, js: TIMER_JS_STEP3 },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "(let|var)\\s+timerId\\s*=\\s*null", flags: "", message: "`let timerId = null;` зарла." },
          { type: "jsIncludes", pattern: "addEventListener\\s*\\(\\s*[\"']click[\"']", flags: "", message: "Товчинд `click` event холбо." },
          { type: "jsIncludes", pattern: "setInterval\\s*\\(", flags: "", message: "`setInterval`-аар секунд тоол." },
          { type: "jsIncludes", pattern: "1000", flags: "", message: "Интервалыг `1000` мс (1 секунд) болго." },
          { type: "jsIncludes", pattern: "seconds\\s*(\\+\\+|\\+=\\s*1)", flags: "", message: "Секунд бүр `seconds++` хий." },
          { type: "jsIncludes", pattern: "clearInterval\\s*\\(\\s*timerId", flags: "", message: "`clearInterval(timerId)`-ээр зогсоо." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Алхам 4 — Шинэчлэх товч",
      prompt:
        "«reset» товчинд `click` холбож: `clearInterval(timerId)`, `timerId = null`, `seconds = 0` болгоод «toggle» товчны текстийг «Эхлүүлэх» болгож `show()` дууд.",
      starter: { html: TIMER_HTML, css: TIMER_CSS, js: TIMER_JS_STEP3 },
      hint: "reset.addEventListener(\"click\", () => { ... }) бич.",
      hint2: "clearInterval(timerId); timerId = null; seconds = 0; toggle.textContent = \"Эхлүүлэх\"; show();",
      solution: { html: TIMER_HTML, css: TIMER_CSS, js: TIMER_JS_STEP4 },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "reset\\.addEventListener\\s*\\(\\s*[\"']click[\"']", flags: "", message: "`reset` товчинд `click` холбо." },
          { type: "jsIncludes", pattern: "seconds\\s*=\\s*0", flags: "", message: "Шинэчлэхэд `seconds = 0` болго." },
          { type: "jsIncludes", pattern: "timerId\\s*=\\s*null[\\s\\S]*seconds\\s*=\\s*0|seconds\\s*=\\s*0[\\s\\S]*timerId\\s*=\\s*null", flags: "", message: "`timerId = null` болгохыг мартав." },
          { type: "jsIncludes", pattern: "toggle\\.textContent\\s*=", flags: "", message: "Товчны текстийг буцааж «Эхлүүлэх» болго." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Яагаад `setInterval`-ийн буцаасан id-г хувьсагчид хадгалах ёстой вэ?",
      options: [
        "Дараа нь clearInterval(id)-ээр тэр тоолуурыг зогсоохын тулд",
        "Интервалыг хурдасгахын тулд",
        "Тоог форматлахын тулд",
        "id байхгүй бол setInterval ажиллахгүй",
      ],
      answer: 0,
      explain: "`setInterval` нь id буцаадаг. `clearInterval(id)`-д тэр id-г өгөөд л тоолуурыг зогсооно. Хадгалаагүй бол зогсоох боломжгүй.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Project: small React counter (createElement-only, runs in the sandbox)
// ---------------------------------------------------------------------------
const RCOUNTER_CDN =
  `<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>\n` +
  `<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>\n`;

const RCOUNTER_HTML = RCOUNTER_CDN + `<div id="root"></div>`;

const RCOUNTER_CSS = `body { font-family: system-ui; padding: 16px; background: #f5f3ff; }
.counter { max-width: 320px; padding: 20px; background: white; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,.12); text-align: center; }
.counter h2 { margin: 0 0 8px; }
.value { margin: 8px 0 16px; font-size: 56px; font-weight: 800; font-variant-numeric: tabular-nums; }
.row { display: flex; gap: 8px; justify-content: center; }
.row button { padding: 10px 16px; font-size: 18px; border: 0; border-radius: 10px; background: #6d28d9; color: white; cursor: pointer; }
.row button:disabled { opacity: .4; cursor: not-allowed; }
.row .ghost { background: #e5e7eb; color: #111; }`;

const RCOUNTER_JS_STEP1 = `const h = React.createElement;

function Counter() {
  return h("div", { className: "counter" },
    h("h2", null, "Тоолуур"),
    h("p", { className: "value" }, 0)
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(Counter));`;

const RCOUNTER_JS_STEP2 = `const h = React.createElement;

function Counter() {
  const [count, setCount] = React.useState(0);

  return h("div", { className: "counter" },
    h("h2", null, "Тоолуур"),
    h("p", { className: "value" }, count),
    h("div", { className: "row" },
      h("button", { onClick: () => setCount(count - 1) }, "−"),
      h("button", { onClick: () => setCount(count + 1) }, "+")
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(Counter));`;

const RCOUNTER_JS_STEP3 = `const h = React.createElement;

function Counter() {
  const [count, setCount] = React.useState(0);

  return h("div", { className: "counter" },
    h("h2", null, "Тоолуур"),
    h("p", { className: "value" }, count),
    h("div", { className: "row" },
      h("button", { disabled: count === 0, onClick: () => setCount((c) => c - 1) }, "−"),
      h("button", { onClick: () => setCount((c) => c + 1) }, "+"),
      h("button", { className: "ghost", onClick: () => setCount(0) }, "Шинэчлэх")
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(Counter));`;

export const PROJECT_REACT_COUNTER: Lesson = {
  id: "project-react-counter",
  module: 10,
  title: "Төсөл: Жижиг React тоолуур",
  objectives: [
    "React.createElement-ээр компонент босгож дэлгэцэнд гаргах",
    "useState-ээр тоог хадгалж, товчоор нэмэх/хасах",
    "Функциональ шинэчлэлт, disabled товч, шинэчлэх товч нэмэх",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Бид юу бүтээх вэ?",
      html: `<p>Энэ төсөлд <strong>React тоолуур</strong>-ыг 3 алхамд бүтээнэ (JSX биш, зөвхөн <code>React.createElement</code>):</p><ol><li><strong>Компонент:</strong> <code>Counter</code> функц, гарчиг, тоо харуулах хэсэг.</li><li><strong>Төлөв:</strong> <code>useState</code> ба «+» «−» товч.</li><li><strong>Сайжруулалт:</strong> функциональ шинэчлэлт, 0 дээр «−»-г идэвхгүй болгох, «Шинэчлэх» товч.</li></ol><p>React сан sandbox дотор бэлэн ачаалагдсан тул <code>React</code> ба <code>ReactDOM</code>-ийг шууд ашиглана. Гацвал <em>зөвлөгөө</em>, хамгийн сүүлд <em>хариулт</em>-ыг ашигла.</p>`,
    },
    {
      kind: "exercise",
      title: "Алхам 1 — Counter компонент",
      prompt:
        "`function Counter()` бич: `h(\"div\", { className: \"counter\" }, ...)` дотор `h(\"h2\", null, \"Тоолуур\")` болон `className: \"value\"`-тай `<p>` (одоогоор `0` гарга) хий. Төгсгөлд `ReactDOM.createRoot(...).render(h(Counter))`-аар дэлгэцэнд гарга.",
      starter: {
        html: RCOUNTER_HTML,
        css: RCOUNTER_CSS,
        js: `const h = React.createElement;\n\n// Энд Counter компонентыг бич\n`,
      },
      hint: "function Counter() { return h(\"div\", { className: \"counter\" }, ...хүүхдүүд); } гэж эхэл.",
      hint2: "Төгсгөлд: ReactDOM.createRoot(document.getElementById(\"root\")).render(h(Counter));",
      solution: { html: RCOUNTER_HTML, css: RCOUNTER_CSS, js: RCOUNTER_JS_STEP1 },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "function\\s+Counter\\s*\\(", flags: "", message: "`function Counter()` олдсонгүй." },
          { type: "jsIncludes", pattern: "(createElement|\\bh)\\s*\\(\\s*[\"']h2[\"']", flags: "", message: "`h2` гарчиг үүсгээгүй байна." },
          { type: "jsIncludes", pattern: "className\\s*:\\s*[\"']value[\"']", flags: "", message: "Тоог `className: \"value\"` бүхий элементэд гарга." },
          { type: "jsIncludes", pattern: "createRoot\\s*\\([\\s\\S]*\\)\\s*\\.render\\s*\\(", flags: "", message: "`ReactDOM.createRoot(...).render(...)`-аар дэлгэцэнд гарга." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Алхам 2 — useState ба товчнууд",
      prompt:
        "`Counter` дотор `const [count, setCount] = React.useState(0)` нэм. `0`-ийн оронд `count`-ыг гарга, мөн `className: \"row\"` div дотор «−» ба «+» гэсэн хоёр товч хий: `onClick`-д `setCount(...)` дууд.",
      starter: { html: RCOUNTER_HTML, css: RCOUNTER_CSS, js: RCOUNTER_JS_STEP1 },
      hint: "Товч: h(\"button\", { onClick: () => setCount(count + 1) }, \"+\")",
      hint2: "h(\"div\", { className: \"row\" }, h(\"button\", { onClick: () => setCount(count - 1) }, \"−\"), h(\"button\", { onClick: () => setCount(count + 1) }, \"+\"))",
      solution: { html: RCOUNTER_HTML, css: RCOUNTER_CSS, js: RCOUNTER_JS_STEP2 },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "\\[\\s*count\\s*,\\s*setCount\\s*\\]\\s*=\\s*React\\.useState\\s*\\(", flags: "", message: "`const [count, setCount] = React.useState(0)` нэм." },
          { type: "jsIncludes", pattern: "onClick\\s*:[\\s\\S]*setCount\\s*\\(", flags: "", message: "Товчны `onClick` дотор `setCount(...)` дууд." },
          { type: "jsIncludes", pattern: "[\"']button[\"'][\\s\\S]*[\"']button[\"']", flags: "", message: "«−» ба «+» гэсэн 2 товч хэрэгтэй." },
          { type: "jsIncludes", pattern: "className\\s*:\\s*[\"']value[\"']\\s*\\}\\s*,\\s*count", flags: "", message: "`0`-ийн оронд `count`-ыг гарга." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Алхам 3 — Сайжруулалт",
      prompt:
        "1) `setCount`-д функц дамжуул: `setCount((c) => c + 1)`. 2) «−» товчинд `disabled: count === 0` нэм. 3) `className: \"ghost\"`-той «Шинэчлэх» товч нэмж `setCount(0)` дууд.",
      starter: { html: RCOUNTER_HTML, css: RCOUNTER_CSS, js: RCOUNTER_JS_STEP2 },
      hint: "setCount(count + 1)-ийн оронд setCount((c) => c + 1) гэж бич — өмнөх утгаас найдвартай тооцно.",
      hint2: "h(\"button\", { className: \"ghost\", onClick: () => setCount(0) }, \"Шинэчлэх\")",
      solution: { html: RCOUNTER_HTML, css: RCOUNTER_CSS, js: RCOUNTER_JS_STEP3 },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "setCount\\s*\\(\\s*\\(?\\s*\\w+\\s*\\)?\\s*=>", flags: "", message: "Функциональ шинэчлэл ашигла: `setCount((c) => c + 1)`." },
          { type: "jsIncludes", pattern: "disabled\\s*:\\s*count\\s*===?\\s*0", flags: "", message: "«−» товчинд `disabled: count === 0` нэм." },
          { type: "jsIncludes", pattern: "setCount\\s*\\(\\s*0\\s*\\)", flags: "", message: "«Шинэчлэх» товч `setCount(0)` дуудах ёстой." },
          { type: "jsIncludes", pattern: "Шинэчлэх", flags: "", message: "Товчны текст «Шинэчлэх» байна." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Яагаад `setCount((c) => c + 1)` гэж функц дамжуулах нь `setCount(count + 1)`-ээс найдвартай вэ?",
      options: [
        "Функц нь React-ийн хадгалсан хамгийн сүүлийн утгыг авдаг тул дараалсан шинэчлэлт алдагдахгүй",
        "Функц ашиглавал компонент дахин зурагдахгүй",
        "Энгийн тоо дамжуулбал React алдаа заадаг",
        "Ямар ч ялгаагүй, зөвхөн хэв маяг",
      ],
      answer: 0,
      explain: "`count` нь тухайн render-ийн хуучин хуулбар байж болно. `(c) => c + 1` нь React-ийн хамгийн сүүлийн төлвийг `c`-д өгдөг тул нэг дор олон шинэчлэл хийсэн ч зөв ажиллана.",
    },
  ],
};
