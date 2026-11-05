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

export const HTML_FORMS: Lesson = {
  id: "html-form",
  module: 1,
  title: "HTML — форм ба оролт",
  objectives: [
    "<form> тэгээр форм үүсгэх",
    "<input> ба <label>-ийг холбох",
    "<button>-оор форм илгээх товч хийх",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Форм гэж юу вэ?",
      html: `<p>Форм нь хэрэглэгчээс мэдээлэл авах хэрэгсэл юм (нэр, и-мэйл, нууц үг гэх мэт). <code>&lt;form&gt;</code> тэг бүх талбарыг тойрно.</p>
             <p><code>&lt;input&gt;</code> нь бичих талбар, <code>type</code> атрибутаар төрлийг сонгоно: <code>text</code>, <code>email</code>, <code>password</code>, <code>number</code>.</p>
             <p><code>&lt;label&gt;</code> нь талбарын нэр. <code>for</code> нь input-ийн <code>id</code>-тай таарвал нэр дээр дарахад талбар идэвхжинэ.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "html",
      code: `<form>
  <label for="name">Нэр</label>
  <input type="text" id="name" name="name">

  <label for="email">И-мэйл</label>
  <input type="email" id="email" name="email">

  <button type="submit">Илгээх</button>
</form>`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 260,
      starter: {
        html: `<form>\n  <p><label for="n">Нэр</label><br><input type="text" id="n" name="n"></p>\n  <p><label for="p">Нууц үг</label><br><input type="password" id="p" name="p"></p>\n  <button type="submit">Илгээх</button>\n</form>`,
        css: `body { font-family: system-ui; padding: 16px; }\ninput { padding: 6px 10px; }\nbutton { padding: 6px 14px; }`,
        js: `document.querySelector("form").addEventListener("submit", function (e) { e.preventDefault(); });`,
      },
    },
    {
      kind: "exercise",
      title: "Нэвтрэх форм",
      prompt: "<form> дотор <label for=\"email\">, id=\"email\" бүхий <input type=\"email\"> ба <button> бичээд Шалгах дээр дар.",
      starter: {
        html: `<h1>Бүртгүүлэх</h1>\n`,
        css: `body { font-family: system-ui; padding: 16px; }\ninput, button { padding: 6px 10px; }`,
        js: ``,
      },
      hint: "<form><label for=\"email\">И-мэйл</label><input type=\"email\" id=\"email\"><button>Илгээх</button></form>",
      solution: {
        html: `<h1>Бүртгүүлэх</h1>\n<form>\n  <label for="email">И-мэйл</label>\n  <input type="email" id="email" name="email">\n  <button type="submit">Илгээх</button>\n</form>`,
        css: `body { font-family: system-ui; padding: 16px; }\ninput, button { padding: 6px 10px; }`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "htmlIncludes", pattern: "<form[^>]*>[\\s\\S]*</form>", flags: "i", message: "<form> тэг олдсонгүй." },
          { type: "htmlIncludes", pattern: "<label[^>]*\\sfor=[\"']email[\"'][^>]*>", flags: "i", message: "for=\"email\" бүхий <label> олдсонгүй." },
          { type: "htmlIncludes", pattern: "<input[^>]*type=[\"']email[\"'][^>]*>", flags: "i", message: "type=\"email\" бүхий <input> олдсонгүй." },
          { type: "htmlIncludes", pattern: "<button[^>]*>", flags: "i", message: "<button> олдсонгүй." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "<label>-ийг <input>-тай холбохын тулд label-д ямар атрибут өгөх вэ?",
      options: ["name", "for", "href", "type"],
      answer: 1,
      explain: "label-ийн for нь input-ийн id-тай таарна.",
    },
  ],
};

export const HTML_SEMANTIC: Lesson = {
  id: "html-semantic",
  module: 1,
  title: "HTML — семантик тэгүүд",
  objectives: [
    "<header>, <nav>, <main>, <footer> тэгүүдийн үүргийг ялгах",
    "<section>-ээр агуулгыг хэсэглэх",
    "Хуудсыг утга бүхий бүтцээр зохион байгуулах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Семантик тэг гэж юу вэ?",
      html: `<p>Семантик тэг нь агуулгын <b>утгыг</b> илэрхийлнэ. <code>&lt;div&gt;</code> бүх зүйлд ашиглагдаж болох ч юу болохыг хэлдэггүй; харин семантик тэг нь хайлтын систем болон дэлгэц уншигчид хуудсыг ойлгоход тусална.</p>
             <p><code>&lt;header&gt;</code> — толгой хэсэг, <code>&lt;nav&gt;</code> — навигацийн холбоосууд, <code>&lt;main&gt;</code> — хуудасны үндсэн агуулга (нэг л удаа), <code>&lt;section&gt;</code> — сэдэвчилсэн хэсэг, <code>&lt;footer&gt;</code> — хөл хэсэг.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "html",
      code: `<header>
  <h1>Миний сайт</h1>
  <nav>
    <a href="/">Нүүр</a>
    <a href="/about">Тухай</a>
  </nav>
</header>
<main>
  <section>
    <h2>Мэдээ</h2>
    <p>Энд агуулга байна.</p>
  </section>
</main>
<footer>© 2026</footer>`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 280,
      starter: {
        html: `<header>\n  <h1>Миний сайт</h1>\n  <nav><a href="#">Нүүр</a> <a href="#">Тухай</a></nav>\n</header>\n<main>\n  <section>\n    <h2>Мэдээ</h2>\n    <p>Энд агуулга байна.</p>\n  </section>\n</main>\n<footer>© 2026</footer>`,
        css: `body { font-family: system-ui; margin: 0; }\nheader, footer { background: #222; color: #fff; padding: 12px 16px; }\nnav a { color: #9cf; margin-right: 10px; }\nmain { padding: 16px; }`,
        js: ``,
      },
    },
    {
      kind: "exercise",
      title: "Хуудасны бүтэц",
      prompt: "<header>, <nav>, <main>, <footer> тэгүүдийг бүгдийг нь ашиглан хуудас бичээд Шалгах дээр дар.",
      starter: {
        html: `<h1>Миний хуудас</h1>\n`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      hint: "<header><nav>...</nav></header><main>...</main><footer>...</footer>",
      solution: {
        html: `<header>\n  <h1>Миний хуудас</h1>\n  <nav><a href="#">Нүүр</a></nav>\n</header>\n<main>\n  <p>Үндсэн агуулга.</p>\n</main>\n<footer>© 2026</footer>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "htmlIncludes", pattern: "<header[^>]*>[\\s\\S]*</header>", flags: "i", message: "<header> олдсонгүй." },
          { type: "htmlIncludes", pattern: "<nav[^>]*>[\\s\\S]*</nav>", flags: "i", message: "<nav> олдсонгүй." },
          { type: "htmlIncludes", pattern: "<main[^>]*>[\\s\\S]*</main>", flags: "i", message: "<main> олдсонгүй." },
          { type: "htmlIncludes", pattern: "<footer[^>]*>[\\s\\S]*</footer>", flags: "i", message: "<footer> олдсонгүй." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Навигацийн холбоосуудыг ямар семантик тэгээр бүлэглэх вэ?",
      options: ["<section>", "<nav>", "<footer>", "<main>"],
      answer: 1,
      explain: "<nav> нь сайтын гол навигацийн холбоосуудад зориулагдсан.",
    },
  ],
};

export const CSS_COLORS: Lesson = {
  id: "css-ungu-fon",
  module: 2,
  title: "CSS — өнгө ба фон",
  objectives: [
    "Өнгийг нэр, hex, rgb хэлбэрээр бичиж сурах",
    "color ба background шинжийн ялгааг ойлгох",
    "Элементийн фонд өнгө тохируулах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Өнгө тодорхойлох аргууд",
      html: `<p>CSS-д өнгийг гурван үндсэн аргаар бичнэ: <b>нэрээр</b> (<code>tomato</code>), <b>hex</b> кодоор (<code>#7c3aed</code>), <b>rgb</b>-ээр (<code>rgb(124, 58, 237)</code>).</p>
             <p><code>color</code> нь <em>текстийн</em> өнгө, <code>background</code> (эсвэл <code>background-color</code>) нь элементийн <em>фоны</em> өнгийг тодорхойлно.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "css",
      code: `h1 {
  color: #ffffff;
  background: #7c3aed;
}
p {
  color: rgb(40, 40, 40);
  background-color: lightyellow;
}`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 240,
      starter: {
        html: `<h1>Өнгөт гарчиг</h1>\n<p>Фон болон текстийн өнгийг өөрчлөөд ▶ Ажиллуул дээр дар.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }\nh1 { color: #fff; background: #7c3aed; padding: 8px 12px; }\np { color: rgb(40, 40, 40); background-color: lightyellow; padding: 8px 12px; }`,
        js: ``,
      },
    },
    {
      kind: "exercise",
      title: "Фонтой гарчиг",
      prompt: "CSS хэсэгт <h1>-д `color` болон `background` (эсвэл `background-color`) шинжийг хоёуланг нь тохируулаад Шалгах дээр дар.",
      starter: {
        html: `<h1>Миний хуудас</h1>\n<p>Гарчгаа будна.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: ``,
      },
      hint: "h1 { color: white; background: #7c3aed; } гэж бичээд үз.",
      solution: {
        html: `<h1>Миний хуудас</h1>\n<p>Гарчгаа будна.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }\nh1 { color: white; background: #7c3aed; }`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "cssIncludes", pattern: "h1\\s*\\{[^}]*[;\\s{]color\\s*:", flags: "i", message: "`h1`-д `color` шинж олдсонгүй." },
          { type: "cssIncludes", pattern: "h1\\s*\\{[^}]*background(-color)?\\s*:", flags: "i", message: "`h1`-д `background` шинж олдсонгүй." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Элементийн фоны өнгийг аль шинж тодорхойлох вэ?",
      options: ["color", "background", "font-size", "border-radius"],
      answer: 1,
      explain: "`background` (эсвэл `background-color`) нь фоны өнгийг, `color` нь текстийн өнгийг тодорхойлно.",
    },
  ],
};

export const CSS_BOX_MODEL: Lesson = {
  id: "css-box-model",
  module: 2,
  title: "CSS — box model (margin, padding, border)",
  objectives: [
    "Элемент бүр хайрцаг гэдгийг ойлгох",
    "padding, border, margin гурвын ялгааг мэдэх",
    "Хайрцгийн дотор ба гадна зайг тохируулах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Элемент бол хайрцаг",
      html: `<p>Веб хуудасны элемент бүр дөрвөн давхарга бүхий хайрцаг юм (дотроосоо гадагш):</p>
             <ul>
               <li><b>content</b> — агуулга (текст, зураг)</li>
               <li><b>padding</b> — агуулга ба хүрээний хоорондох <em>дотоод</em> зай</li>
               <li><b>border</b> — хүрээ</li>
               <li><b>margin</b> — хүрээнээс гадуурх <em>гадаад</em> зай (бусад элементээс тусгаарлана)</li>
             </ul>
             <p>Товчхон: <code>padding</code> нь дотогшоо, <code>margin</code> нь гадагшаа зай үүсгэнэ.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "css",
      code: `.card {
  padding: 16px;              /* дотоод зай */
  border: 2px solid #7c3aed;  /* хүрээ */
  margin: 24px;               /* гадаад зай */
}`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 280,
      starter: {
        html: `<div class="card">Хайрцаг 1</div>\n<div class="card">Хайрцаг 2</div>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.card {\n  background: #f3e8ff;\n  padding: 16px;\n  border: 2px solid #7c3aed;\n  margin: 24px 0;\n}`,
        js: ``,
      },
    },
    {
      kind: "exercise",
      title: "Хүрээтэй хайрцаг",
      prompt: "CSS хэсэгт `.box` классд `padding`, `border`, `margin` гурвыг хоёуланг нь тохируулаад Шалгах дээр дар.",
      starter: {
        html: `<div class="box">Миний хайрцаг</div>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.box {\n  background: #f3e8ff;\n}`,
        js: ``,
      },
      hint: ".box { padding: 16px; border: 2px solid #7c3aed; margin: 20px; } гэж бичээд үз.",
      solution: {
        html: `<div class="box">Миний хайрцаг</div>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.box {\n  background: #f3e8ff;\n  padding: 16px;\n  border: 2px solid #7c3aed;\n  margin: 20px;\n}`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "cssIncludes", pattern: "\\.box\\s*\\{[^}]*padding\\s*:", flags: "i", message: "`.box`-д `padding` шинж олдсонгүй." },
          { type: "cssIncludes", pattern: "\\.box\\s*\\{[^}]*border\\s*:", flags: "i", message: "`.box`-д `border` шинж олдсонгүй." },
          { type: "cssIncludes", pattern: "\\.box\\s*\\{[^}]*margin\\s*:", flags: "i", message: "`.box`-д `margin` шинж олдсонгүй." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Хүрээнээс ГАДУУР, бусад элементээс тусгаарлах зайг аль шинж тодорхойлох вэ?",
      options: ["padding", "margin", "border", "content"],
      answer: 1,
      explain: "`margin` нь хүрээнээс гадуурх зай, `padding` нь агуулга ба хүрээний хоорондох дотоод зай юм.",
    },
  ],
};

export const CSS_TEXT_FONT: Lesson = {
  id: "css-text-font",
  module: 2,
  title: "CSS — текст ба фонт (font-size, font-weight, text-align)",
  objectives: [
    "font-size-аар үсгийн хэмжээг тохируулах",
    "font-weight-аар тод/хэвийн үсэг сонгох",
    "text-align-аар текстийг зэрэгцүүлэх",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Текстийг хэрхэн хэлбэржүүлэх вэ",
      html: `<p>CSS-ээр текстийн харагдах байдлыг гурван үндсэн шинжээр өөрчилнө:</p>
             <ul>
               <li><code>font-size</code> — үсгийн хэмжээ (жишээ: <code>18px</code>, <code>1.2rem</code>)</li>
               <li><code>font-weight</code> — үсгийн жин: <code>normal</code>, <code>bold</code> эсвэл <code>400</code>–<code>700</code></li>
               <li><code>text-align</code> — зэрэгцүүлэлт: <code>left</code>, <code>center</code>, <code>right</code></li>
             </ul>
             <p>Мөн <code>font-family</code>-аар фонтын төрлийг сонгоно.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "css",
      code: `h1 {
  font-size: 32px;      /* хэмжээ */
  font-weight: 700;     /* тод */
  text-align: center;   /* голд нь */
}`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 260,
      starter: {
        html: `<h1>Сайн байна уу</h1>\n<p>Энэ бол жишээ догол мөр.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }\nh1 {\n  font-size: 32px;\n  font-weight: 700;\n  text-align: center;\n}\np { font-size: 18px; text-align: right; }`,
        js: ``,
      },
    },
    {
      kind: "exercise",
      title: "Гарчгийг хэлбэржүүл",
      prompt: "CSS хэсэгт `.title` классд `font-size`, `font-weight`, `text-align` гурвыг тохируулаад Шалгах дээр дар.",
      starter: {
        html: `<p class="title">Миний гарчиг</p>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.title {\n  color: #7c3aed;\n}`,
        js: ``,
      },
      hint: ".title { font-size: 28px; font-weight: bold; text-align: center; } гэж бичээд үз.",
      solution: {
        html: `<p class="title">Миний гарчиг</p>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.title {\n  color: #7c3aed;\n  font-size: 28px;\n  font-weight: bold;\n  text-align: center;\n}`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "cssIncludes", pattern: "\\.title\\s*\\{[^}]*font-size\\s*:", flags: "i", message: "`.title`-д `font-size` шинж олдсонгүй." },
          { type: "cssIncludes", pattern: "\\.title\\s*\\{[^}]*font-weight\\s*:", flags: "i", message: "`.title`-д `font-weight` шинж олдсонгүй." },
          { type: "cssIncludes", pattern: "\\.title\\s*\\{[^}]*text-align\\s*:", flags: "i", message: "`.title`-д `text-align` шинж олдсонгүй." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Текстийг хуудасны голд байрлуулах CSS аль нь вэ?",
      options: ["font-weight: center;", "text-align: center;", "font-size: center;", "align: middle;"],
      answer: 1,
      explain: "`text-align: center` нь текстийг голд нь зэрэгцүүлнэ. `font-weight` нь жин, `font-size` нь хэмжээг тодорхойлно.",
    },
  ],
};

export const CSS_FLEXBOX: Lesson = {
  id: "css-flexbox",
  module: 2,
  title: "CSS — Flexbox зэрэгцүүлэлт (display:flex, justify, align)",
  objectives: [
    "display:flex-ээр элементүүдийг нэг мөрөнд зэрэгцүүлэх",
    "justify-content-оор хэвтээ тэнхлэгт зэрэгцүүлэх",
    "align-items-ээр босоо тэнхлэгт зэрэгцүүлэх",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Flexbox гэж юу вэ",
      html: `<p>Flexbox нь элементүүдийг мөр эсвэл баганаар хялбар зэрэгцүүлдэг байршлын арга юм. Эцэг элемент дээр <code>display: flex</code> бичихэд доторх хүүхдүүд нь зэрэгцэн жагсана.</p>
             <ul>
               <li><code>justify-content</code> — үндсэн (хэвтээ) тэнхлэгт зэрэгцүүлэх: <code>flex-start</code>, <code>center</code>, <code>space-between</code></li>
               <li><code>align-items</code> — хөндлөн (босоо) тэнхлэгт зэрэгцүүлэх: <code>flex-start</code>, <code>center</code>, <code>stretch</code></li>
               <li><code>gap</code> — элементүүдийн хоорондох зай</li>
             </ul>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "css",
      code: `.row {
  display: flex;
  justify-content: space-between; /* хоёр захад */
  align-items: center;            /* босоогоор голд */
  gap: 12px;
}`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 260,
      starter: {
        html: `<div class="row">\n  <div class="box">1</div>\n  <div class="box">2</div>\n  <div class="box">3</div>\n</div>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  height: 120px;\n  background: #f3f0ff;\n}\n.box { background: #7c3aed; color: #fff; padding: 16px 24px; border-radius: 8px; }`,
        js: ``,
      },
    },
    {
      kind: "exercise",
      title: "Элементүүдийг голд нь байрлуул",
      prompt: "CSS хэсэгт `.row` классд `display: flex`, `justify-content`, `align-items` гурвыг бичээд Шалгах дээр дар.",
      starter: {
        html: `<div class="row">\n  <span>А</span>\n  <span>Б</span>\n  <span>В</span>\n</div>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.row {\n  height: 100px;\n  background: #f3f0ff;\n}`,
        js: ``,
      },
      hint: ".row { display: flex; justify-content: center; align-items: center; } гэж бичээд үз.",
      solution: {
        html: `<div class="row">\n  <span>А</span>\n  <span>Б</span>\n  <span>В</span>\n</div>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.row {\n  height: 100px;\n  background: #f3f0ff;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "cssIncludes", pattern: "\\.row\\s*\\{[^}]*display\\s*:\\s*flex", flags: "i", message: "`.row`-д `display: flex` олдсонгүй." },
          { type: "cssIncludes", pattern: "\\.row\\s*\\{[^}]*justify-content\\s*:", flags: "i", message: "`.row`-д `justify-content` шинж олдсонгүй." },
          { type: "cssIncludes", pattern: "\\.row\\s*\\{[^}]*align-items\\s*:", flags: "i", message: "`.row`-д `align-items` шинж олдсонгүй." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Flex контейнерийн доторх элементүүдийг хэвтээ тэнхлэгт голд нь байрлуулах шинж аль нь вэ?",
      options: ["align-items: center;", "justify-content: center;", "text-align: middle;", "flex-center: true;"],
      answer: 1,
      explain: "`justify-content` нь үндсэн (хэвтээ) тэнхлэгт, `align-items` нь хөндлөн (босоо) тэнхлэгт зэрэгцүүлнэ.",
    },
  ],
};

export const CSS_GRID: Lesson = {
  id: "css-grid",
  module: 2,
  title: "CSS — Grid үндэс (display:grid, grid-template)",
  objectives: [
    "display:grid-ээр хүснэгт маягийн сүлжээ үүсгэх",
    "grid-template-columns-оор баганын тоо, өргөнийг тодорхойлох",
    "gap болон fr нэгжийг ашиглах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Grid гэж юу вэ",
      html: `<p>Grid нь элементүүдийг <strong>мөр ба багана</strong> хэлбэрээр хоёр хэмжээст сүлжээнд байрлуулдаг арга юм. Эцэг элемент дээр <code>display: grid</code> бичээд баганаа тодорхойлно.</p>
             <ul>
               <li><code>grid-template-columns</code> — баганын тоо ба өргөн: <code>repeat(3, 1fr)</code></li>
               <li><code>fr</code> — үлдсэн зайн хувь (1fr = нэг хэсэг)</li>
               <li><code>gap</code> — мөр ба баганын хоорондох зай</li>
             </ul>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "css",
      code: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 тэнцүү багана */
  gap: 12px;
}`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 280,
      starter: {
        html: `<div class="grid">\n  <div class="box">1</div>\n  <div class="box">2</div>\n  <div class="box">3</div>\n  <div class="box">4</div>\n  <div class="box">5</div>\n  <div class="box">6</div>\n</div>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n.box { background: #7c3aed; color: #fff; padding: 20px; border-radius: 8px; text-align: center; }`,
        js: ``,
      },
    },
    {
      kind: "exercise",
      title: "2 баганатай сүлжээ хий",
      prompt: "CSS хэсэгт `.grid` классд `display: grid`, `grid-template-columns`, `gap` гурвыг бичээд Шалгах дээр дар.",
      starter: {
        html: `<div class="grid">\n  <div>А</div>\n  <div>Б</div>\n  <div>В</div>\n  <div>Г</div>\n</div>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.grid {\n  background: #f3f0ff;\n}\n.grid div { background: #7c3aed; color: #fff; padding: 16px; border-radius: 8px; }`,
        js: ``,
      },
      hint: ".grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; } гэж бичээд үз.",
      solution: {
        html: `<div class="grid">\n  <div>А</div>\n  <div>Б</div>\n  <div>В</div>\n  <div>Г</div>\n</div>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.grid {\n  background: #f3f0ff;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.grid div { background: #7c3aed; color: #fff; padding: 16px; border-radius: 8px; }`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "cssIncludes", pattern: "\\.grid\\s*\\{[^}]*display\\s*:\\s*grid", flags: "i", message: "`.grid`-д `display: grid` олдсонгүй." },
          { type: "cssIncludes", pattern: "\\.grid\\s*\\{[^}]*grid-template-columns\\s*:", flags: "i", message: "`.grid`-д `grid-template-columns` шинж олдсонгүй." },
          { type: "cssIncludes", pattern: "\\.grid\\s*\\{[^}]*gap\\s*:", flags: "i", message: "`.grid`-д `gap` шинж олдсонгүй." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "`grid-template-columns: repeat(3, 1fr);` юу хийх вэ?",
      options: ["3 мөр үүсгэнэ", "3 тэнцүү өргөнтэй багана үүсгэнэ", "3px зай үлдээнэ", "3 элементийг нуух"],
      answer: 1,
      explain: "`repeat(3, 1fr)` нь нэг мөрөнд 3 тэнцүү багана үүсгэнэ. `fr` нь үлдсэн зайн нэг хэсгийг илэрхийлнэ.",
    },
  ],
};

export const LESSONS: Lesson[] = [HTML_INTRO, CSS_INTRO, JS_INTRO, HTML_HEADINGS, HTML_LISTS_LINKS, HTML_IMAGES_MEDIA, HTML_TABLES, HTML_FORMS, HTML_SEMANTIC, CSS_COLORS, CSS_BOX_MODEL, CSS_TEXT_FONT, CSS_FLEXBOX, CSS_GRID, REACT_INTRO];

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
