import type { Lesson } from "@/lib/lessons/types";
import { lessonFromJson } from "@/lib/lessons/fromJson";
import htmlHeadingsJson from "@/lib/lessons/json/html-headings.json";

// MVP seed content. Instructor-authored lessons will live as structured data
// (in-repo modules now; a DB-backed authoring workflow is a later task). This
// is one complete interactive lesson exercising every block type.

export const HTML_INTRO: Lesson = {
  id: "html-undes",
  module: 1,
  title: "HTML-ийн үндэс — анхны вэб хуудас",
  objectives: [
    "HTML тэг гэж юу болохыг ойлгох",
    "Гарчиг, догол мөр бичиж сурах",
    "Өөрийн кодоо засаад шууд үр дүнг харах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "HTML гэж юу вэ?",
      html: `<p><strong>HTML</strong> нь вэб хуудасны <em>араг яс</em> юм. Хуудсан дээрх гарчиг, текст, зураг бүрийг <code>&lt;тэг&gt;</code>-ээр тэмдэглэдэг.</p>
             <p>Жишээ нь <code>&lt;h1&gt;</code> нь том гарчиг, <code>&lt;p&gt;</code> нь догол мөр үүсгэнэ. Тэг бүр нээгдээд (<code>&lt;p&gt;</code>) хаагддаг (<code>&lt;/p&gt;</code>).</p>`,
      image: { src: "/kit/code.webp", alt: "Код бичиж буй Storxon-ийн дүр", width: 514, height: 536, caption: "Код бичихэд бэлэн үү?" },
    },
    {
      kind: "film",
      title: "Видео хичээл: HTML-ийн танилцуулга",
      description: "Бичлэгт хичээлийг курсын тоглуулагчаас үзнэ (бүртгэлтэй суралцагчдад).",
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "html",
      code: `<h1>Сайн байна уу!</h1>
<p>Энэ бол миний анхны вэб хуудас.</p>`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 220,
      starter: {
        html: `<h1>Сайн байна уу!</h1>\n<p>Текстээ өөрчилж, ▶ Ажиллуул дээр дар.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }\nh1 { color: #7c3aed; }`,
        js: `console.log("Хуудас ачаалагдлаа");`,
      },
    },
    {
      kind: "exercise",
      title: "Өөрийн гарчиг нэм",
      prompt: "HTML хэсэгт \"Намайг Storxon сурагч\" гэсэн текст бүхий <h1> гарчиг нэмээд Шалгах дээр дар.",
      starter: {
        html: `<p>Доор гарчигаа нэм.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      hint: "<h1>...</h1> тэгийн дотор текстээ бич.",
      solution: {
        html: `<h1>Намайг Storxon сурагч</h1>\n<p>Доор гарчигаа нэм.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      check: {
        type: "htmlIncludes",
        pattern: "<h1[^>]*>\\s*Намайг Storxon сурагч",
        flags: "i",
        message: "\"Намайг Storxon сурагч\" гэсэн <h1> гарчиг олдсонгүй.",
      },
    },
    {
      kind: "exercise",
      title: "Гарчиг ба догол мөр хамт",
      prompt: "HTML хэсэгт <h1> гарчиг болон <p> догол мөр хоёуланг нь, тус бүр нь тексттэй байхаар бич. Шалгах дээр дар.",
      starter: {
        html: ``,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      hint: "<h1>Гарчиг</h1> ба <p>Текст</p> хоёрыг дараалуулан бич.",
      solution: {
        html: `<h1>Миний хуудас</h1>\n<p>Энэ бол миний анхны догол мөр.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "htmlIncludes", pattern: "<h1[^>]*>\\s*\\S[^<]*</h1>", flags: "i", message: "Текст бүхий <h1> гарчиг олдсонгүй." },
          { type: "htmlIncludes", pattern: "<p[^>]*>\\s*\\S[^<]*</p>", flags: "i", message: "Текст бүхий <p> догол мөр олдсонгүй." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "HTML ба CSS хамтад нь",
      prompt: "HTML-д <h1> гарчиг нэмж, CSS-д h1-ийн өнгийг (color) тодорхойл. Шалгах дээр дар.",
      starter: {
        html: ``,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      hint: "HTML: <h1>Сайн уу</h1>, CSS: h1 { color: tomato; }",
      solution: {
        html: `<h1>Сайн уу</h1>`,
        css: `body { font-family: system-ui; padding: 16px; }\nh1 { color: tomato; }`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "htmlIncludes", pattern: "<h1[^>]*>\\s*\\S[^<]*</h1>", flags: "i", message: "Текст бүхий <h1> гарчиг олдсонгүй." },
          { type: "cssIncludes", pattern: "h1\\s*\\{[^}]*color\\s*:", flags: "i", message: "CSS-д h1-ийн color шинжийг тодорхойлоогүй байна." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Аль тэг нь том гарчиг үүсгэх вэ?",
      options: ["<p>", "<h1>", "<div>", "<span>"],
      answer: 1,
      explain: "<h1> нь хамгийн том түвшний гарчиг.",
    },
  ],
};

export const CSS_INTRO: Lesson = {
  id: "css-undes",
  module: 2,
  title: "CSS-ийн үндэс — хуудсаа гоё болгох",
  objectives: [
    "CSS дүрэм (selector, property, value) гэж юу болохыг ойлгох",
    "Өнгө ба үсгийн хэмжээг өөрчилж сурах",
    "Кодоо засаад шууд үр дүнг харах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "CSS гэж юу вэ?",
      html: `<p><strong>CSS</strong> нь HTML-ийн <em>гадаад төрх</em>-ийг тодорхойлдог: өнгө, хэмжээ, зай, байрлал.</p>
             <p>CSS дүрэм нь <code>сонгогч { шинж: утга; }</code> хэлбэртэй. Жишээ нь <code>h1 { color: red; }</code> нь бүх <code>&lt;h1&gt;</code> гарчгийг улаан болгоно.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "css",
      code: `h1 {
  color: #7c3aed;
  font-size: 32px;
}
p {
  color: #444;
}`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 220,
      starter: {
        html: `<h1>Сайн байна уу!</h1>\n<p>CSS-ээ өөрчилж, ▶ Ажиллуул дээр дар.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }\nh1 { color: #7c3aed; }\np { color: #444; }`,
        js: ``,
      },
    },
    {
      kind: "exercise",
      title: "Догол мөрийн өнгийг өөрчил",
      prompt: "CSS хэсэгт <p> тэгийн өнгийг тодорхойлох `p { color: ...; }` дүрэм нэмээд Шалгах дээр дар.",
      starter: {
        html: `<h1>Миний хуудас</h1>\n<p>Энэ догол мөрийг будна.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      hint: "p { color: tomato; } гэж бичээд үз.",
      solution: {
        html: `<h1>Миний хуудас</h1>\n<p>Энэ догол мөрийг будна.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }\np { color: tomato; }`,
        js: ``,
      },
      check: {
        type: "cssIncludes",
        pattern: "p\\s*\\{[^}]*color\\s*:",
        flags: "i",
        message: "`p { color: ...; }` дүрэм олдсонгүй.",
      },
    },
    {
      kind: "quiz",
      question: "Текстийн өнгийг аль CSS шинж өөрчлөх вэ?",
      options: ["font-size", "color", "margin", "display"],
      answer: 1,
      explain: "`color` нь текстийн өнгийг тодорхойлно.",
    },
  ],
};

export const JS_INTRO: Lesson = {
  id: "js-undes",
  module: 3,
  title: "JavaScript-ийн үндэс — хуудсаа амьдруулъя",
  objectives: [
    "Хувьсагч (let, const) гэж юу болохыг ойлгох",
    "console.log-оор утга хэвлэж сурах",
    "Кодоо засаад шууд үр дүнг харах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "JavaScript гэж юу вэ?",
      html: `<p><strong>JavaScript</strong> нь вэб хуудсыг <em>амьдруулдаг</em> хэл: товч дарахад юм хийх, тоо бодох, текст солих.</p>
             <p>Утгыг нэрлэж хадгалахдаа <code>let</code> эсвэл <code>const</code> ашиглана. Үр дүнг харахдаа <code>console.log(...)</code> гэж бичнэ.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "js",
      code: `const name = "Storxon";
let count = 2;
count = count + 1;
console.log("Сайн уу, " + name);
console.log(count);`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 220,
      starter: {
        html: `<h1>JavaScript</h1>\n<p>Кодоо өөрчилж, ▶ Ажиллуул дээр дар.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `const name = "Storxon";\nconsole.log("Сайн уу, " + name);`,
      },
    },
    {
      kind: "exercise",
      title: "Анхны console.log",
      prompt: "JS хэсэгт `console.log(...)` ашиглан ямар нэг зүйл хэвлээд Шалгах дээр дар.",
      starter: {
        html: `<p>Консолыг шалгана уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `// Энд console.log бич\n`,
      },
      hint: 'console.log("Сайн уу!"); гэж бичээд үз.',
      solution: {
        html: `<p>Консолыг шалгана уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `console.log("Сайн уу!");`,
      },
      check: {
        type: "jsIncludes",
        pattern: "^\\s*console\\.log\\s*\\(",
        flags: "m",
        message: "`console.log(...)` дуудлага олдсонгүй.",
      },
    },
    {
      kind: "quiz",
      question: "Дахин олгох боломжгүй (өөрчлөгдөхгүй) утгыг аль түлхүүр үгээр зарлах вэ?",
      options: ["let", "const", "var", "function"],
      answer: 1,
      explain: "`const` нь дахин олгох боломжгүй хувьсагч зарлана.",
    },
  ],
};

// React starter lesson. Runs in the same sandboxed Playground (no new
// dependency in the app): React 18 UMD builds are loaded by <script> tags
// *inside* the sandboxed iframe, so student code still has a null origin.
// No JSX/Babel — only React.createElement, with one explicit instruction set.
const REACT_CDN =
  `<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>\n` +
  `<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>\n`;

export const REACT_INTRO: Lesson = {
  id: "react-undes",
  module: 9,
  title: "React-ийн эхлэл — эхний компонент",
  objectives: [
    "Компонент гэж юу болохыг ойлгох",
    "React.createElement-ээр элемент үүсгэх",
    "useState-ээр товч дарахад тоо нэмэгдүүлэх",
  ],
  blocks: [
    {
      kind: "theory",
      title: "React гэж юу вэ?",
      html: `<p><strong>React</strong> нь хуудсыг жижиг, дахин ашиглагдах <em>компонент</em>уудаас бүтээдэг сан.</p>
             <p>Эхний алхамд JSX биш, зөвхөн <code>React.createElement(төрөл, props, хүүхэд)</code>-ийг ашиглана. Доорх тайлбарыг дагана уу:</p>
             <ol>
               <li><code>function App()</code> нэртэй ганц компонент бичнэ.</li>
               <li>Төгсгөлд нь <code>ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App))</code> гэж ажиллуулна (кодод бэлэн байгаа).</li>
               <li>Төлөв хадгалахдаа <code>const [n, setN] = React.useState(0)</code> ашиглана.</li>
             </ol>`,
    },
    {
      kind: "playground",
      title: "Тоолуур — туршиж үз",
      height: 300,
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nbutton { padding: 6px 14px; font-size: 16px; }`,
        js: `const h = React.createElement;

function App() {
  const [n, setN] = React.useState(0);
  return h("div", null,
    h("h1", null, "Тоолуур: " + n),
    h("button", { onClick: () => setN(n + 1) }, "Нэм +1")
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
    },
    {
      kind: "exercise",
      title: "Хасах товч нэм",
      prompt: "`App` компонентод `setN(n - 1)` хийдэг \"Хас -1\" товч нэмээд Шалгах дээр дар.",
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nbutton { padding: 6px 14px; font-size: 16px; margin-right: 8px; }`,
        js: `const h = React.createElement;

function App() {
  const [n, setN] = React.useState(0);
  return h("div", null,
    h("h1", null, "Тоолуур: " + n),
    h("button", { onClick: () => setN(n + 1) }, "Нэм +1")
    // Энд "Хас -1" товчийг нэм
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
      hint: 'h("button", { onClick: () => setN(n - 1) }, "Хас -1") гэсэн мөрийг өмнөх товчийн дараа таслалаар нэм.',
      solution: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nbutton { padding: 6px 14px; font-size: 16px; margin-right: 8px; }`,
        js: `const h = React.createElement;

function App() {
  const [n, setN] = React.useState(0);
  return h("div", null,
    h("h1", null, "Тоолуур: " + n),
    h("button", { onClick: () => setN(n + 1) }, "Нэм +1"),
    h("button", { onClick: () => setN(n - 1) }, "Хас -1")
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
      check: {
        type: "jsIncludes",
        pattern: "setN\\s*\\(\\s*n\\s*-\\s*1\\s*\\)",
        message: "`setN(n - 1)` дуудлагатай товч олдсонгүй.",
      },
    },
    {
      kind: "quiz",
      question: "React-д компонентийн төлөвийг (state) хадгалахад аль hook-ийг ашиглах вэ?",
      options: ["useState", "useStyle", "createRoot", "querySelector"],
      answer: 0,
      explain: "`React.useState(эхний утга)` нь [утга, утга солих функц] хос буцаана.",
    },
  ],
};

// Example of a lesson authored as plain JSON and validated at load time.
export const HTML_HEADINGS: Lesson = lessonFromJson(htmlHeadingsJson);

export const HTML_LISTS_LINKS: Lesson = {
  id: "html-jagsaalt-holboos",
  module: 1,
  title: "HTML — жагсаалт ба холбоос",
  objectives: [
    "<ul> ба <ol> жагсаалт бичих",
    "<li>-ээр жагсаалтын зүйл үүсгэх",
    "<a href> холбоос үүсгэх",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Жагсаалт ба холбоос",
      html: `<p><strong>Жагсаалт</strong> нь холбоотой зүйлсийг цэгцтэй харуулдаг. Дарааллын хамаагүй бол <code>&lt;ul&gt;</code> (цэгтэй), дараалал чухал бол <code>&lt;ol&gt;</code> (дугаартай) ашиглана. Зүйл бүр <code>&lt;li&gt;</code> дотор бичигдэнэ.</p>
             <p><strong>Холбоос</strong> нь өөр хуудас руу хөтөлнө: <code>&lt;a href="https://storxon.com"&gt;Текст&lt;/a&gt;</code>. <code>href</code> нь очих хаяг, тэгний доторх текст нь дарагдах хэсэг юм.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "html",
      code: `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
<a href="https://example.com">Жишээ сайт</a>`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 240,
      starter: {
        html: `<h1>Миний сурах жагсаалт</h1>\n<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>\n<a href="https://example.com">Жишээ сайт</a>`,
        css: `body { font-family: system-ui; padding: 16px; }\na { color: #7c3aed; }`,
        js: ``,
      },
    },
    {
      kind: "exercise",
      title: "Жагсаалт бич",
      prompt: "HTML хэсэгт <ul> жагсаалт үүсгэж, дотор нь тексттэй 2 ширхэг <li> бич. Шалгах дээр дар.",
      starter: {
        html: `<h1>Миний дуртай хоол</h1>\n`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      hint: "<ul><li>Бууз</li><li>Хуушуур</li></ul> гэж бичээд үз.",
      solution: {
        html: `<h1>Миний дуртай хоол</h1>\n<ul>\n  <li>Бууз</li>\n  <li>Хуушуур</li>\n</ul>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "htmlIncludes", pattern: "<ul[^>]*>", flags: "i", message: "<ul> жагсаалт олдсонгүй." },
          {
            type: "htmlIncludes",
            pattern: "<li[^>]*>\\s*\\S[^<]*</li>[\\s\\S]*<li[^>]*>\\s*\\S[^<]*</li>",
            flags: "i",
            message: "Текст бүхий дор хаяж 2 <li> олдсонгүй.",
          },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Холбоос нэм",
      prompt: "HTML хэсэгт https://storxon.com хаяг руу хөтлөх, тексттэй <a href> холбоос нэмээд Шалгах дээр дар.",
      starter: {
        html: `<p>Манай сайт руу орох холбоос нэм.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      hint: '<a href="https://storxon.com">Storxon</a> гэж бичээд үз.',
      solution: {
        html: `<p>Манай сайт руу орох холбоос нэм.</p>\n<a href="https://storxon.com">Storxon</a>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      check: {
        type: "htmlIncludes",
        pattern: "<a\\s[^>]*href\\s*=\\s*[\"']https?://[^\"']+[\"'][^>]*>\\s*\\S[^<]*</a>",
        flags: "i",
        message: "href бүхий, тексттэй <a> холбоос олдсонгүй.",
      },
    },
    {
      kind: "quiz",
      question: "Дугаарласан жагсаалтыг аль тэг үүсгэх вэ?",
      options: ["<ul>", "<ol>", "<li>", "<a>"],
      answer: 1,
      explain: "<ol> нь дугаартай жагсаалт; <ul> нь цэгтэй жагсаалт.",
    },
  ],
};

// Tiny inline SVG so image examples work offline inside the sandboxed iframe.
const DEMO_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='100'%3E%3Crect width='160' height='100' rx='12' fill='%237c3aed'/%3E%3Ccircle cx='80' cy='50' r='24' fill='%23fff'/%3E%3C/svg%3E";

export const HTML_IMAGES_MEDIA: Lesson = {
  id: "html-zurag-media",
  module: 1,
  title: "HTML — зураг ба медиа",
  objectives: [
    "<img> тэгээр зураг оруулах",
    "alt атрибутыг юуны тулд бичихийг ойлгох",
    "<figure> ба <figcaption>-оор зургийг тайлбартай харуулах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Зураг оруулах",
      html: `<p>Зургийг <code>&lt;img&gt;</code> тэгээр оруулна. Энэ тэг хаагдах тэггүй бөгөөд <code>src</code> (зургийн хаяг) ба <code>alt</code> (зургийн тайлбар текст) атрибуттай байна.</p>
             <p><code>alt</code> нь зураг ачаалагдахгүй үед харагдаж, дэлгэц уншигч програмд зургийг тайлбарладаг тул <strong>үргэлж</strong> бичнэ. Хэрэв зураг зөвхөн чимэглэл бол <code>alt=""</code> гэж хоосон үлдээнэ.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "html",
      code: `<img src="kitten.jpg" alt="Саарал зулзага цонхны дэргэд унтаж байна" width="320">

<figure>
  <img src="mountain.jpg" alt="Цасаар хучигдсан уул">
  <figcaption>Хангайн нуруу, өвөл</figcaption>
</figure>`,
    },
    {
      kind: "theory",
      title: "figure ба figcaption",
      html: `<p>Зургийг тайлбар (гарчиг)-тай нь хамт бүлэглэхдээ <code>&lt;figure&gt;</code> дотор <code>&lt;img&gt;</code> ба <code>&lt;figcaption&gt;</code>-г хамт бичнэ. Ингэснээр зураг, тайлбар хоёр утгаараа холбогдоно.</p>
             <p>Дуу, бичлэгийг мөн адил <code>&lt;audio controls&gt;</code>, <code>&lt;video controls&gt;</code> тэгээр оруулдаг.</p>`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 280,
      starter: {
        html: `<h1>Миний зураг</h1>\n<figure>\n  <img src="${DEMO_IMG}" alt="Ягаан дэвсгэр дээрх цагаан дугуй" width="160">\n  <figcaption>Анхны зураг</figcaption>\n</figure>`,
        css: `body { font-family: system-ui; padding: 16px; }\nfigcaption { color: #666; font-size: 14px; margin-top: 6px; }`,
        js: ``,
      },
    },
    {
      kind: "exercise",
      title: "Зураг alt-тай нэм",
      prompt: "HTML хэсэгт src болон тексттэй alt атрибут бүхий <img> тэг нэмээд Шалгах дээр дар.",
      starter: {
        html: `<h1>Миний зураг</h1>\n`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      hint: `<img src="${DEMO_IMG}" alt="Ягаан дугуй"> гэж бичээд үз.`,
      solution: {
        html: `<h1>Миний зураг</h1>\n<img src="${DEMO_IMG}" alt="Ягаан дугуй">`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "htmlIncludes", pattern: "<img\\s[^>]*src\\s*=\\s*[\"'][^\"']+[\"']", flags: "i", message: "src бүхий <img> тэг олдсонгүй." },
          { type: "htmlIncludes", pattern: "<img\\s[^>]*alt\\s*=\\s*[\"'][^\"']*\\S[^\"']*[\"']", flags: "i", message: "<img> тэгт тексттэй alt атрибут нэмнэ үү." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Зургийг тайлбартай болго",
      prompt: "Зургийг <figure> дотор байрлуулж, <figcaption> тайлбар нэмээд Шалгах дээр дар.",
      starter: {
        html: `<img src="${DEMO_IMG}" alt="Ягаан дугуй" width="160">`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      hint: "<figure> дотор <img> ба <figcaption>Тайлбар</figcaption> хоёрыг бич.",
      solution: {
        html: `<figure>\n  <img src="${DEMO_IMG}" alt="Ягаан дугуй" width="160">\n  <figcaption>Ягаан дугуй</figcaption>\n</figure>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "htmlIncludes", pattern: "<figure[^>]*>[\\s\\S]*<img\\s[^>]*>[\\s\\S]*</figure>", flags: "i", message: "<figure> дотор <img> олдсонгүй." },
          { type: "htmlIncludes", pattern: "<figcaption[^>]*>\\s*\\S[^<]*</figcaption>", flags: "i", message: "Тексттэй <figcaption> олдсонгүй." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "<img> тэгийн alt атрибут юунд хэрэгтэй вэ?",
      options: [
        "Зургийн хэмжээг тогтоох",
        "Зураг харагдахгүй үед болон дэлгэц уншигчид зургийг тайлбарлах",
        "Зургийг хөдөлгөөнтэй болгох",
        "Зургийн хаягийг зааж өгөх",
      ],
      answer: 1,
      explain: "alt нь зургийн текст тайлбар; хаягийг нь src атрибут зааж өгдөг.",
    },
  ],
};

export const HTML_TABLES: Lesson = {
  id: "html-husnegt",
  module: 1,
  title: "HTML — хүснэгт",
  objectives: [
    "<table>, <tr>, <td> тэгээр хүснэгт байгуулах",
    "<th>-ээр толгой нүд тэмдэглэх",
    "<thead> ба <tbody>-оор хүснэгтийн хэсгийг ялгах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Хүснэгтийн бүтэц",
      html: `<p>Хүснэгтийг <code>&lt;table&gt;</code> тэг бүхэлд нь тойрно. Мөр бүр <code>&lt;tr&gt;</code> (table row), мөрийн нүд бүр <code>&lt;td&gt;</code> (table data) байна.</p>
             <p>Баганын гарчиг нүдийг <code>&lt;th&gt;</code> (table header) гэж бичвэл браузер тодруулж, дэлгэц уншигч гарчиг гэдгийг нь танина.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "html",
      code: `<table>
  <thead>
    <tr>
      <th>Нэр</th>
      <th>Нас</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Болд</td>
      <td>12</td>
    </tr>
    <tr>
      <td>Сараа</td>
      <td>11</td>
    </tr>
  </tbody>
</table>`,
    },
    {
      kind: "theory",
      title: "thead, tbody ба зураас",
      html: `<p><code>&lt;thead&gt;</code> нь гарчгийн мөрийг, <code>&lt;tbody&gt;</code> нь үндсэн өгөгдлийг бүлэглэнэ. Хүснэгтийн хүрээ, өнгийг HTML биш <strong>CSS</strong>-ээр өгдөг (жишээ нь <code>border</code>, <code>border-collapse</code>).</p>`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 300,
      starter: {
        html: `<table>\n  <thead>\n    <tr><th>Хичээл</th><th>Оноо</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>HTML</td><td>90</td></tr>\n    <tr><td>CSS</td><td>85</td></tr>\n  </tbody>\n</table>`,
        css: `body { font-family: system-ui; padding: 16px; }\ntable { border-collapse: collapse; }\nth, td { border: 1px solid #999; padding: 6px 12px; }\nth { background: #f3e8ff; }`,
        js: ``,
      },
    },
    {
      kind: "exercise",
      title: "Анхны хүснэгт",
      prompt: "<table> дотор нэг <tr>, түүнд <td> нүд бичээд Шалгах дээр дар.",
      starter: {
        html: `<h1>Миний хүснэгт</h1>\n`,
        css: `body { font-family: system-ui; padding: 16px; }\ntd { border: 1px solid #999; padding: 6px 12px; }`,
        js: ``,
      },
      hint: "<table><tr><td>Сайн уу</td></tr></table> гэж бичээд үз.",
      solution: {
        html: `<h1>Миний хүснэгт</h1>\n<table>\n  <tr><td>Сайн уу</td></tr>\n</table>`,
        css: `body { font-family: system-ui; padding: 16px; }\ntd { border: 1px solid #999; padding: 6px 12px; }`,
        js: ``,
      },
      check: {
        type: "htmlIncludes",
        pattern: "<table[^>]*>[\\s\\S]*<tr[^>]*>[\\s\\S]*<td[^>]*>[\\s\\S]*</td>[\\s\\S]*</tr>[\\s\\S]*</table>",
        flags: "i",
        message: "<table> дотор <tr> ба <td> олдсонгүй.",
      },
    },
    {
      kind: "exercise",
      title: "Гарчигтай хүснэгт",
      prompt: "Хүснэгтэд <th> гарчиг нүд ба <td> өгөгдлийн нүд хоёуланг нь оруулаад Шалгах дээр дар.",
      starter: {
        html: `<table>\n  <tr><td>Болд</td><td>12</td></tr>\n</table>`,
        css: `body { font-family: system-ui; padding: 16px; }\nth, td { border: 1px solid #999; padding: 6px 12px; }`,
        js: ``,
      },
      hint: "Шинэ мөр <tr><th>Нэр</th><th>Нас</th></tr>-ийг хамгийн дээр нэм.",
      solution: {
        html: `<table>\n  <tr><th>Нэр</th><th>Нас</th></tr>\n  <tr><td>Болд</td><td>12</td></tr>\n</table>`,
        css: `body { font-family: system-ui; padding: 16px; }\nth, td { border: 1px solid #999; padding: 6px 12px; }`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "htmlIncludes", pattern: "<th[^>]*>\\s*\\S[^<]*</th>", flags: "i", message: "Тексттэй <th> гарчиг нүд олдсонгүй." },
          { type: "htmlIncludes", pattern: "<td[^>]*>\\s*\\S[^<]*</td>", flags: "i", message: "Тексттэй <td> нүд олдсонгүй." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Хүснэгтийн баганын гарчиг нүдийг ямар тэгээр бичих вэ?",
      options: ["<td>", "<tr>", "<th>", "<caption>"],
      answer: 2,
      explain: "<th> нь гарчиг нүд; <td> нь энгийн өгөгдлийн нүд, <tr> нь мөр.",
    },
  ],
};

export const LESSONS: Lesson[] = [HTML_INTRO, CSS_INTRO, JS_INTRO, HTML_HEADINGS, HTML_LISTS_LINKS, HTML_IMAGES_MEDIA, HTML_TABLES, REACT_INTRO];

// Course outline: skeletons (title + objectives, no blocks yet) for the next
// modules. Deliberately NOT part of LESSONS so empty lessons never reach the
// sidebar, routes or progress totals. Move a skeleton into LESSONS once its
// blocks (theory/playground/exercise/quiz) are authored.
export const MODULE_SKELETONS: Lesson[] = [
  {
    id: "html-jagsaalt-holbooc",
    module: 4,
    title: "HTML — жагсаалт, холбоос, зураг",
    objectives: ["<ul>/<ol> жагсаалт бичих", "<a> холбоос үүсгэх", "<img> зургийг alt-тай оруулах"],
    blocks: [],
  },
  {
    id: "css-layout-flex",
    module: 5,
    title: "CSS — Flexbox байршил",
    objectives: ["display:flex ойлгох", "Элементүүдийг төвлөрүүлэх, зайлуулах", "Мобайлд тохирсон мөр/багана"],
    blocks: [],
  },
  {
    id: "js-dom-event",
    module: 6,
    title: "JavaScript — DOM ба үйл явдал",
    objectives: ["Элементийг сонгох", "Товч дарахад текст солих", "addEventListener ашиглах"],
    blocks: [],
  },
  {
    id: "html-form",
    module: 7,
    title: "HTML — Форм ба оролт",
    objectives: ["<form>, <input>, <label> бичих", "Оролтын утгыг JS-ээр унших", "Энгийн шалгалт хийх"],
    blocks: [],
  },
  {
    id: "mini-project",
    module: 8,
    title: "Жижиг төсөл — Хувийн танилцуулга хуудас",
    objectives: ["HTML + CSS + JS-ийг нэгтгэх", "Өөрийн хуудсыг бүтээх", "Дүгнэлт хийх"],
    blocks: [],
  },
];

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
