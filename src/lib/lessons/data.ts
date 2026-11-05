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
      kind: "exercise",
      title: "Гарчгийн хэмжээг ихэсгэ (гүнзгийрүүлсэн)",
      prompt: "`h1`-ийн `font-size`-ийг 40px болгож, мөн `color`-ыг нь өөрчил. Хоёуланг нэг `h1 { ... }` дүрэмд бич.",
      starter: {
        html: "<h1>Том гарчиг</h1>\n<p>Энэ жижиг текст.</p>",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "",
      },
      hint: "h1 { font-size: 40px; color: teal; }",
      solution: {
        html: "<h1>Том гарчиг</h1>\n<p>Энэ жижиг текст.</p>",
        css: "body { font-family: system-ui; padding: 16px; }\nh1 { font-size: 40px; color: teal; }",
        js: "",
      },
      check: {
        type: "allOf",
        checks: [
          {
            type: "cssIncludes",
            pattern: "h1\\s*\\{[^}]*font-size\\s*:",
            flags: "i",
            message: "`h1`-д `font-size` олдсонгүй.",
          },
          {
            type: "cssIncludes",
            pattern: "h1\\s*\\{[^}]*[^-]color\\s*:",
            flags: "i",
            message: "`h1`-д `color` олдсонгүй.",
          },
        ],
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
      kind: "exercise",
      title: "Хувьсагч үүсгээд console-д хэвлэ",
      prompt: "`const` хувьсагч зарлаж, `console.log`-оор түүний утгыг хэвлэ.",
      starter: {
        html: "<p>Console-г нээгээд үр дүнг хар.</p>",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "// Энд бич\n",
      },
      hint: "const name = \"Бат\"; console.log(name);",
      solution: {
        html: "<p>Console-г нээгээд үр дүнг хар.</p>",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "const name = \"Бат\";\nconsole.log(name);",
      },
      check: {
        type: "allOf",
        checks: [
          {
            type: "jsIncludes",
            pattern: "(let|const)\\s+\\w+\\s*=",
            message: "`let` эсвэл `const` хувьсагч олдсонгүй.",
          },
          {
            type: "jsIncludes",
            pattern: "console\\.log\\s*\\(\\s*\\w+",
            message: "Хувьсагчийг `console.log`-оор хэвлээгүй байна.",
          },
        ],
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
      kind: "exercise",
      title: "Элемент нэм",
      prompt: "`App` дотор `h(\"p\", null, \"...\")` ашиглан гарчгийн доор догол мөр нэм.",
      starter: {
        html: REACT_CDN + "<div id=\"root\"></div>",
        css: "body { font-family: system-ui; padding: 16px; }\n.card { border: 1px solid #ccc; border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; }",
        js: "const h = React.createElement;\n\nfunction App() {\n  return h(\"div\", null,\n    h(\"h2\", null, \"Сайн уу, React!\")\n    // Энд p нэм\n  );\n}\n\nReactDOM.createRoot(document.getElementById(\"root\")).render(h(App));",
      },
      hint: "Өмнөх мөрийн дараа таслал тавиад h(\"p\", null, \"Энэ бол миний эхний компонент\") нэм.",
      solution: {
        html: REACT_CDN + "<div id=\"root\"></div>",
        css: "body { font-family: system-ui; padding: 16px; }\n.card { border: 1px solid #ccc; border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; }",
        js: "const h = React.createElement;\n\nfunction App() {\n  return h(\"div\", null,\n    h(\"h2\", null, \"Сайн уу, React!\"),\n    h(\"p\", null, \"Энэ бол миний эхний компонент\")\n  );\n}\n\nReactDOM.createRoot(document.getElementById(\"root\")).render(h(App));",
      },
      check: {
        type: "jsIncludes",
        pattern: "h\\(\\s*[\"']p[\"']",
        message: "`h(\"p\", ...)` элемент олдсонгүй.",
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
      kind: "exercise",
      title: "Имэйлийн талбар нэм",
      prompt: "`<label>`-тай, `type=\"email\"` ба `required` бүхий `<input>` нэм.",
      starter: {
        html: "<form>\n  <!-- Энд имэйлийн талбар нэм -->\n  <button type=\"submit\">Илгээх</button>\n</form>",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "",
      },
      hint: "<label>Имэйл <input type=\"email\" required></label>",
      solution: {
        html: "<form>\n  <label>Имэйл <input type=\"email\" required></label>\n  <button type=\"submit\">Илгээх</button>\n</form>",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "",
      },
      check: {
        type: "allOf",
        checks: [
          {
            type: "htmlIncludes",
            pattern: "<label",
            flags: "i",
            message: "`<label>` олдсонгүй.",
          },
          {
            type: "htmlIncludes",
            pattern: "<input[^>]*type\\s*=\\s*[\"']email[\"']",
            flags: "i",
            message: "`type=\"email\"` input олдсонгүй.",
          },
          {
            type: "htmlIncludes",
            pattern: "<input[^>]*\\brequired\\b",
            flags: "i",
            message: "`required` атрибут олдсонгүй.",
          },
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
      kind: "exercise",
      title: "Хуудсыг semantic tag-аар бүтэцлэ",
      prompt: "Хуудсанд `<header>`, `<main>`, `<footer>` гурвыг ашигла.",
      starter: {
        html: "<div>Миний сайт</div>\n<div>Үндсэн агуулга</div>\n<div>© 2026</div>",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "",
      },
      hint: "Эхний div-ийг <header>, дунд нь <main>, сүүлийнхийг <footer> болго.",
      solution: {
        html: "<header>Миний сайт</header>\n<main>Үндсэн агуулга</main>\n<footer>© 2026</footer>",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "",
      },
      check: {
        type: "allOf",
        checks: [
          {
            type: "htmlIncludes",
            pattern: "<header[\\s>]",
            flags: "i",
            message: "`<header>` олдсонгүй.",
          },
          {
            type: "htmlIncludes",
            pattern: "<main[\\s>]",
            flags: "i",
            message: "`<main>` олдсонгүй.",
          },
          {
            type: "htmlIncludes",
            pattern: "<footer[\\s>]",
            flags: "i",
            message: "`<footer>` олдсонгүй.",
          },
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
      kind: "exercise",
      title: "Хуудасны дэвсгэр өнгө тавь",
      prompt: "`body`-д `background-color` өгч, `color`-оор текстийг нь уншигдахуйц өнгөтэй болго.",
      starter: {
        html: "<h1>Өнгөт хуудас</h1>\n<p>Дэвсгэр ба текстийн өнгө.</p>",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "",
      },
      hint: "body { background-color: #1e1b4b; color: white; }",
      solution: {
        html: "<h1>Өнгөт хуудас</h1>\n<p>Дэвсгэр ба текстийн өнгө.</p>",
        css: "body { font-family: system-ui; padding: 16px; }\nbody { background-color: #1e1b4b; color: white; }",
        js: "",
      },
      check: {
        type: "allOf",
        checks: [
          {
            type: "cssIncludes",
            pattern: "background(-color)?\\s*:",
            flags: "i",
            message: "`background-color` олдсонгүй.",
          },
          {
            type: "cssIncludes",
            pattern: "(^|[;{\\s])color\\s*:",
            flags: "i",
            message: "Текстийн `color` олдсонгүй.",
          },
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
      kind: "exercise",
      title: "Картыг box model-оор хэлбэрлэ",
      prompt: "`.card`-д `padding`, `border`, `margin` гурвыг бүгдийг нэм.",
      starter: {
        html: "<div class=\"card\">Миний карт</div>",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "",
      },
      hint: ".card { padding: 16px; border: 2px solid #7c3aed; margin: 12px; }",
      solution: {
        html: "<div class=\"card\">Миний карт</div>",
        css: "body { font-family: system-ui; padding: 16px; }\n.card { padding: 16px; border: 2px solid #7c3aed; margin: 12px; }",
        js: "",
      },
      check: {
        type: "allOf",
        checks: [
          {
            type: "cssIncludes",
            pattern: "\\.card\\s*\\{[^}]*padding\\s*:",
            flags: "i",
            message: "`.card`-д `padding` олдсонгүй.",
          },
          {
            type: "cssIncludes",
            pattern: "\\.card\\s*\\{[^}]*border\\s*:",
            flags: "i",
            message: "`.card`-д `border` олдсонгүй.",
          },
          {
            type: "cssIncludes",
            pattern: "\\.card\\s*\\{[^}]*margin\\s*:",
            flags: "i",
            message: "`.card`-д `margin` олдсонгүй.",
          },
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
      kind: "exercise",
      title: "Гарчгийг голлуулж, зузаан болго",
      prompt: "`h1`-д `text-align: center` ба `font-weight: 700` нэм.",
      starter: {
        html: "<h1>Төвд байрлах гарчиг</h1>",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "",
      },
      hint: "h1 { text-align: center; font-weight: 700; }",
      solution: {
        html: "<h1>Төвд байрлах гарчиг</h1>",
        css: "body { font-family: system-ui; padding: 16px; }\nh1 { text-align: center; font-weight: 700; }",
        js: "",
      },
      check: {
        type: "allOf",
        checks: [
          {
            type: "cssIncludes",
            pattern: "text-align\\s*:\\s*center",
            flags: "i",
            message: "`text-align: center` олдсонгүй.",
          },
          {
            type: "cssIncludes",
            pattern: "font-weight\\s*:",
            flags: "i",
            message: "`font-weight` олдсонгүй.",
          },
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
      kind: "exercise",
      title: "Flex мөр ба зай",
      prompt: "`.row`-ийг `display: flex` болгож, хайрцгуудын хооронд `gap` өг.",
      starter: {
        html: "<div class=\"row\"><div class=\"box\">1</div><div class=\"box\">2</div><div class=\"box\">3</div></div>",
        css: "body { font-family: system-ui; padding: 16px; }\n.box { background: #ede9fe; padding: 12px; }",
        js: "",
      },
      hint: ".row { display: flex; gap: 12px; }",
      solution: {
        html: "<div class=\"row\"><div class=\"box\">1</div><div class=\"box\">2</div><div class=\"box\">3</div></div>",
        css: "body { font-family: system-ui; padding: 16px; }\n.box { background: #ede9fe; padding: 12px; }\n.row { display: flex; gap: 12px; }",
        js: "",
      },
      check: {
        type: "allOf",
        checks: [
          {
            type: "cssIncludes",
            pattern: "display\\s*:\\s*flex",
            flags: "i",
            message: "`display: flex` олдсонгүй.",
          },
          {
            type: "cssIncludes",
            pattern: "gap\\s*:",
            flags: "i",
            message: "`gap` олдсонгүй.",
          },
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
      kind: "exercise",
      title: "3 баганатай grid",
      prompt: "`.grid`-ийг `display: grid` болгож, `grid-template-columns`-оор 3 багана үүсгэ.",
      starter: {
        html: "<div class=\"grid\"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>",
        css: "body { font-family: system-ui; padding: 16px; }\n.grid div { background: #ede9fe; padding: 12px; }",
        js: "",
      },
      hint: ".grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }",
      solution: {
        html: "<div class=\"grid\"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>",
        css: "body { font-family: system-ui; padding: 16px; }\n.grid div { background: #ede9fe; padding: 12px; }\n.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }",
        js: "",
      },
      check: {
        type: "allOf",
        checks: [
          {
            type: "cssIncludes",
            pattern: "display\\s*:\\s*grid",
            flags: "i",
            message: "`display: grid` олдсонгүй.",
          },
          {
            type: "cssIncludes",
            pattern: "grid-template-columns\\s*:",
            flags: "i",
            message: "`grid-template-columns` олдсонгүй.",
          },
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

export const CSS_RESPONSIVE: Lesson = {
  id: "css-responsive",
  module: 2,
  title: "CSS — Responsive ба @media (гар утас/дэлгэц)",
  objectives: [
    "viewport meta тэг ба responsive дизайны үндсийг ойлгох",
    "@media (max-width: ...) дүрмээр дэлгэцийн хэмжээнд тохируулан загвар өөрчлөх",
    "Гар утас болон компьютер дээр өөр өөр байрлал гаргах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Responsive гэж юу вэ",
      html: `<p>Нэг вэб хуудас гар утас, таблет, компьютер дээр бүгдэд нь тохирч харагдах ёстой. Үүнийг <strong>responsive дизайн</strong> гэнэ. Гол хэрэгсэл нь <code>@media</code> дүрэм юм.</p>
             <ul>
               <li><code>@media (max-width: 600px) { ... }</code> — дэлгэц 600px ба түүнээс явцуу үед л ажиллана</li>
               <li><code>@media (min-width: 900px) { ... }</code> — дэлгэц 900px-ээс өргөн үед ажиллана</li>
               <li>HTML-ийн <code>&lt;head&gt;</code>-д <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code> заавал бичнэ</li>
             </ul>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "css",
      code: `.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* компьютер: 3 багана */
  gap: 12px;
}

@media (max-width: 600px) {
  .cards {
    grid-template-columns: 1fr; /* гар утас: 1 багана */
  }
}`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 280,
      starter: {
        html: `<div class="cards">\n  <div class="card">1</div>\n  <div class="card">2</div>\n  <div class="card">3</div>\n</div>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.cards {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n.card { background: #7c3aed; color: #fff; padding: 20px; border-radius: 8px; text-align: center; }\n\n@media (max-width: 400px) {\n  .cards { grid-template-columns: 1fr; }\n}`,
        js: ``,
      },
    },
    {
      kind: "exercise",
      title: "Гар утсанд зориулсан дүрэм бич",
      prompt: "CSS хэсэгт `@media (max-width: 600px)` дүрэм нэмж, дотор нь `.box` классын `font-size`-ийг өөрчил. Дараа нь Шалгах дээр дар.",
      starter: {
        html: `<p class="box">Дэлгэц явцуу болоход миний хэмжээ өөрчлөгдөнө.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.box { font-size: 24px; color: #7c3aed; }\n\n/* Энд @media дүрмээ бич */\n`,
        js: ``,
      },
      hint: "@media (max-width: 600px) { .box { font-size: 16px; } } гэж бичээд үз.",
      solution: {
        html: `<p class="box">Дэлгэц явцуу болоход миний хэмжээ өөрчлөгдөнө.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.box { font-size: 24px; color: #7c3aed; }\n\n@media (max-width: 600px) {\n  .box { font-size: 16px; }\n}`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "cssIncludes", pattern: "@media\\s*\\(\\s*max-width\\s*:\\s*600px\\s*\\)", flags: "i", message: "`@media (max-width: 600px)` дүрэм олдсонгүй." },
          { type: "cssIncludes", pattern: "@media[^{]*\\{[^@]*\\.box\\s*\\{[^}]*font-size\\s*:", flags: "i", message: "@media дотор `.box`-ийн `font-size` олдсонгүй." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Жижиг дэлгэцэд өнгө солих",
      prompt: "`@media (max-width: 600px)` дүрэм бичиж, жижиг дэлгэц дээр `body`-ийн `background`-ыг өөрчил.",
      starter: {
        html: "<h1>Responsive</h1>\n<p>Цонхоо жижигрүүл.</p>",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "",
      },
      hint: "@media (max-width: 600px) { body { background: #fef3c7; } }",
      solution: {
        html: "<h1>Responsive</h1>\n<p>Цонхоо жижигрүүл.</p>",
        css: "body { font-family: system-ui; padding: 16px; }\n@media (max-width: 600px) { body { background: #fef3c7; } }",
        js: "",
      },
      check: {
        type: "cssIncludes",
        pattern: "@media[^{]*max-width\\s*:[^{]*\\{[\\s\\S]*background",
        flags: "i",
        message: "`@media (max-width: ...)` доторх `background` дүрэм олдсонгүй.",
      },
    },
    {
      kind: "quiz",
      question: "`@media (max-width: 600px)` дүрэм хэзээ ажиллах вэ?",
      options: ["Дэлгэц 600px-ээс өргөн үед", "Дэлгэц 600px ба түүнээс явцуу үед", "Зөвхөн хэвлэх үед", "Үргэлж"],
      answer: 1,
      explain: "`max-width: 600px` нь дэлгэцийн өргөн хамгийн ихдээ 600px байх үед, өөрөөр хэлбэл гар утас шиг явцуу дэлгэцэд ажиллана.",
    },
  ],
};

export const CSS_HOVER_TRANSITION: Lesson = {
  id: "css-hover-transition",
  module: 2,
  title: "CSS — Hover ба transition (энгийн анимэйшн)",
  objectives: [
    ":hover-ээр хулганаа дээгүүр нь аваачихад элементийн загварыг өөрчлөх",
    "transition-оор өөрчлөлтийг жигд, аажим болгох",
    "transform ашиглан товч, картыг зөөлөн томруулах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Hover ба transition гэж юу вэ",
      html: `<p>Сайн вэб хуудас хэрэглэгчийн үйлдэлд хариу өгдөг. <code>:hover</code> нь хулганыг элемент дээр аваачихад ажилладаг, <code>transition</code> нь өөрчлөлтийг "шууд" биш <strong>аажмаар</strong> болгодог.</p>
             <ul>
               <li><code>a:hover { ... }</code> — хулгана дээр байх үеийн загвар</li>
               <li><code>transition: background 0.3s ease;</code> — өөрчлөгдөх шинж чанар, үргэлжлэх хугацаа, хурдны муруй</li>
               <li><code>transform: scale(1.05);</code> — элементийг томруулах/зөөх/эргүүлэх</li>
             </ul>
             <p><code>transition</code>-ийг <em>энгийн</em> төлөвт (hover-гүй) бичдэг: ингэснээр орох ба гарах хоёр чиглэлд хоёуланд нь жигд ажиллана.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "css",
      code: `.btn {
  background: #7c3aed;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background 0.3s ease, transform 0.3s ease;
}

.btn:hover {
  background: #5b21b6;
  transform: scale(1.05);
}`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 240,
      starter: {
        html: `<button class="btn">Хулганаа надад ойртуул</button>`,
        css: `body { font-family: system-ui; padding: 24px; }\n.btn {\n  background: #7c3aed;\n  color: #fff;\n  border: 0;\n  padding: 12px 24px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background 0.3s ease, transform 0.3s ease;\n}\n.btn:hover {\n  background: #5b21b6;\n  transform: scale(1.08);\n}`,
        js: ``,
      },
    },
    {
      kind: "exercise",
      title: "Hover ба transition нэм",
      prompt: "`.card` классад `transition` нэмж, `.card:hover` дүрэм бичиж өнгийг нь өөрчил. Дараа нь Шалгах дээр дар.",
      starter: {
        html: `<div class="card">Надад хулганаа аваачаарай</div>`,
        css: `body { font-family: system-ui; padding: 24px; }\n.card {\n  background: #e9d5ff;\n  padding: 24px;\n  border-radius: 12px;\n  /* Энд transition нэм */\n}\n\n/* Энд .card:hover бич */\n`,
        js: ``,
      },
      hint: ".card дотор transition: background 0.3s ease; нэмээд, .card:hover { background: #7c3aed; color: #fff; } гэж бичээд үз.",
      solution: {
        html: `<div class="card">Надад хулганаа аваачаарай</div>`,
        css: `body { font-family: system-ui; padding: 24px; }\n.card {\n  background: #e9d5ff;\n  padding: 24px;\n  border-radius: 12px;\n  transition: background 0.3s ease;\n}\n\n.card:hover {\n  background: #7c3aed;\n  color: #fff;\n}`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "cssIncludes", pattern: "transition\\s*:", flags: "i", message: "`transition` шинж чанар олдсонгүй." },
          { type: "cssIncludes", pattern: "\\.card\\s*:hover\\s*\\{[^}]*background", flags: "i", message: "`.card:hover` дотор `background` олдсонгүй." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Товчийг hover дээр жигд өөрчил",
      prompt: "`.btn`-д `transition` нэмж, `.btn:hover` дүрмээр өнгийг нь өөрчил.",
      starter: {
        html: "<button class=\"btn\">Дар</button>",
        css: "body { font-family: system-ui; padding: 16px; }\n.btn { background: #7c3aed; color: white; border: 0; padding: 10px 18px; border-radius: 8px; }",
        js: "",
      },
      hint: ".btn { transition: background 0.3s; } .btn:hover { background: #5b21b6; }",
      solution: {
        html: "<button class=\"btn\">Дар</button>",
        css: "body { font-family: system-ui; padding: 16px; }\n.btn { background: #7c3aed; color: white; border: 0; padding: 10px 18px; border-radius: 8px; transition: background 0.3s; }\n.btn:hover { background: #5b21b6; }",
        js: "",
      },
      check: {
        type: "allOf",
        checks: [
          {
            type: "cssIncludes",
            pattern: "transition\\s*:",
            flags: "i",
            message: "`transition` олдсонгүй.",
          },
          {
            type: "cssIncludes",
            pattern: "\\.btn\\s*:hover\\s*\\{[^}]*background",
            flags: "i",
            message: "`.btn:hover` дүрэмд `background` олдсонгүй.",
          },
        ],
      },
    },
    {
      kind: "quiz",
      question: "`transition` нь юу хийдэг вэ?",
      options: ["Элементийг нууна", "Загварын өөрчлөлтийг аажим, жигд болгоно", "Хуудсыг шинэчилнэ", "Зургийг ачаална"],
      answer: 1,
      explain: "`transition` нь нэг утгаас нөгөө рүү шилжихийг заасан хугацаанд аажмаар хийж, гэнэтийн үсрэлтийг арилгадаг.",
    },
  ],
};

export const JS_VARIABLES_TYPES: Lesson = {
  id: "js-huvisagch-turul",
  module: 3,
  title: "JS — Хувьсагч ба төрөл (let, const, string, number, boolean)",
  objectives: [
    "let ба const-ын ялгааг ойлгох",
    "String, number, boolean гэсэн үндсэн төрлүүдийг таних",
    "typeof ашиглан утгын төрлийг шалгах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Хувьсагч ба төрөл",
      html: `<p><strong>Хувьсагч</strong> нь утгыг нэрлэж хадгалдаг "хайрцаг" юм.</p>
             <ul>
               <li><code>let</code> — дараа нь утгыг нь өөрчилж болно</li>
               <li><code>const</code> — нэг удаа олгоно, дахин өөрчилж болохгүй</li>
             </ul>
             <p>Утга бүр <strong>төрөлтэй</strong>:</p>
             <ul>
               <li><code>string</code> — текст: <code>"Сайн уу"</code></li>
               <li><code>number</code> — тоо: <code>42</code>, <code>3.14</code></li>
               <li><code>boolean</code> — үнэн/худал: <code>true</code>, <code>false</code></li>
             </ul>
             <p><code>typeof</code> оператор нь утгын төрлийг хэлж өгнө.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "js",
      code: `const name = "Storxon";   // string
let age = 3;              // number
let isOpen = true;        // boolean

age = age + 1;            // let-ийг өөрчилж болно
console.log(name, age, isOpen);
console.log(typeof name, typeof age, typeof isOpen);`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 240,
      starter: {
        html: `<h1>Хувьсагч</h1>\n<p>Консолыг харна уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `const city = "Улаанбаатар";\nlet temp = -5;\nlet isCold = temp < 0;\n\nconsole.log(city, temp, isCold);\nconsole.log(typeof city, typeof temp, typeof isCold);`,
      },
    },
    {
      kind: "exercise",
      title: "Өөрийн хувьсагч зарла",
      prompt: "`const`-оор нэр (string), `let`-ээр нас (number) зарлаад `console.log`-оор хэвлэ. Дараа нь Шалгах дээр дар.",
      starter: {
        html: `<p>Консолыг шалгана уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `// const-оор нэр, let-ээр нас зарла\n// console.log-оор хэвлэ\n`,
      },
      hint: 'const name = "Болд"; let age = 20; console.log(name, age); гэж бичээд үз.',
      solution: {
        html: `<p>Консолыг шалгана уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `const name = "Болд";\nlet age = 20;\nconsole.log(name, age);`,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "\\bconst\\s+\\w+\\s*=", message: "`const` хувьсагч зарлаагүй байна." },
          { type: "jsIncludes", pattern: "\\blet\\s+\\w+\\s*=", message: "`let` хувьсагч зарлаагүй байна." },
          { type: "jsIncludes", pattern: "console\\.log\\s*\\(", message: "`console.log(...)` дуудлага олдсонгүй." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Template literal ашигла",
      prompt: "Backtick ба `${...}` ашиглан `name`, `age` хувьсагчийг нэг өгүүлбэрт нэгтгэж хэвлэ.",
      starter: {
        html: "",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "const name = \"Болд\";\nconst age = 12;\n// Template literal-ээр хэвлэ\n",
      },
      hint: "console.log(`${name} ${age} настай`);",
      solution: {
        html: "",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "const name = \"Болд\";\nconst age = 12;\nconsole.log(`${name} ${age} настай`);",
      },
      check: {
        type: "jsIncludes",
        pattern: "`[^`]*\\$\\{[^}]+\\}[^`]*`",
        message: "Backtick доторх `${...}` олдсонгүй.",
      },
    },
    {
      kind: "quiz",
      question: "`typeof true` юуг буцаах вэ?",
      options: ['"string"', '"number"', '"boolean"', '"object"'],
      answer: 2,
      explain: "`true`/`false` нь boolean төрөлтэй тул `typeof true` нь \"boolean\" буцаана.",
    },
  ],
};

export const JS_CONDITIONS: Lesson = {
  id: "js-nohtsol-if-else",
  module: 3,
  title: "JS — Нөхцөл (if / else)",
  objectives: [
    "if, else if, else бүтцийг бичих",
    "Харьцуулах оператор (>, <, ===) ашиглах",
    "Нөхцлөөр өөр өөр үр дүн гаргах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Нөхцөл гэж юу вэ?",
      html: `<p><strong>Нөхцөл</strong> нь программд "хэрэв ... бол ... үгүй бол ..." гэж шийдвэр гаргуулдаг.</p>
             <ul>
               <li><code>if (нөхцөл) { ... }</code> — нөхцөл үнэн үед ажиллана</li>
               <li><code>else if (...)</code> — өөр нөхцөл шалгана</li>
               <li><code>else { ... }</code> — бусад бүх тохиолдолд</li>
             </ul>
             <p>Харьцуулах операторууд: <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>===</code> (тэнцүү), <code>!==</code> (тэнцүү биш).</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "js",
      code: `const temp = 18;

if (temp < 0) {
  console.log("Хүйтэн байна");
} else if (temp < 20) {
  console.log("Сэрүүн байна");
} else {
  console.log("Дулаан байна");
}`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 240,
      starter: {
        html: `<h1>Нөхцөл</h1>\n<p>Консолыг харна уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `let score = 75;\n\nif (score >= 90) {\n  console.log("Онц");\n} else if (score >= 60) {\n  console.log("Сайн");\n} else {\n  console.log("Дахин оролд");\n}`,
      },
    },
    {
      kind: "exercise",
      title: "Насны шалгалт бич",
      prompt: "`age` хувьсагчийн утгаар `if ... else` бичиж, 18 ба түүнээс дээш бол \"Насанд хүрсэн\", үгүй бол \"Хүүхэд\" гэж `console.log`-оор хэвлэ.",
      starter: {
        html: `<p>Консолыг шалгана уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `let age = 20;\n\n// if ... else бичээд console.log-оор хэвлэ\n`,
      },
      hint: 'if (age >= 18) { console.log("Насанд хүрсэн"); } else { console.log("Хүүхэд"); }',
      solution: {
        html: `<p>Консолыг шалгана уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `let age = 20;\n\nif (age >= 18) {\n  console.log("Насанд хүрсэн");\n} else {\n  console.log("Хүүхэд");\n}`,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "\\bif\\s*\\(", message: "`if (...)` бүтэц олдсонгүй." },
          { type: "jsIncludes", pattern: "\\belse\\b", message: "`else` хэсэг олдсонгүй." },
          { type: "jsIncludes", pattern: "console\\.log\\s*\\(", message: "`console.log(...)` дуудлага олдсонгүй." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Нас шалгах нөхцөл",
      prompt: "`age >= 18` бол \"Насанд хүрсэн\", үгүй бол \"Хүүхэд\" гэж `if/else`-ээр хэвлэ.",
      starter: {
        html: "",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "const age = 15;\n// if / else бич\n",
      },
      hint: "if (age >= 18) { console.log(\"Насанд хүрсэн\"); } else { console.log(\"Хүүхэд\"); }",
      solution: {
        html: "",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "const age = 15;\nif (age >= 18) {\n  console.log(\"Насанд хүрсэн\");\n} else {\n  console.log(\"Хүүхэд\");\n}",
      },
      check: {
        type: "jsIncludes",
        pattern: "if\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*\\}\\s*else",
        message: "`if (...) { } else { }` бүтэц олдсонгүй.",
      },
    },
    {
      kind: "quiz",
      question: "`5 === \"5\"` юуг буцаах вэ?",
      options: ["true", "false", "undefined", "Алдаа гарна"],
      answer: 1,
      explain: "`===` нь утга болон төрлийг хоёуланг нь харьцуулдаг. 5 (number) ба \"5\" (string) төрөл нь өөр тул үр дүн нь false.",
    },
  ],
};

export const JS_LOOPS: Lesson = {
  id: "js-davtalt-for-while",
  module: 3,
  title: "JS — Давталт (for / while)",
  objectives: [
    "for давталтын 3 хэсгийг (эхлэл, нөхцөл, алхам) ойлгох",
    "while давталт бичих",
    "Давталтаар олон удаа үйлдэл хийх",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Давталт гэж юу вэ?",
      html: `<p><strong>Давталт</strong> нь нэг кодыг олон удаа давтан ажиллуулдаг.</p>
             <ul>
               <li><code>for (эхлэл; нөхцөл; алхам) { ... }</code> — давтах тоо мэдэгдэж байх үед</li>
               <li><code>while (нөхцөл) { ... }</code> — нөхцөл үнэн байх хугацаанд давтана</li>
             </ul>
             <p>Анхаар: нөхцөл хэзээ ч худал болохгүй бол давталт <em>төгсгөлгүй</em> болно.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "js",
      code: `for (let i = 1; i <= 3; i++) {
  console.log("Давталт №" + i);
}

let n = 3;
while (n > 0) {
  console.log("Үлдсэн: " + n);
  n--;
}`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 240,
      starter: {
        html: `<h1>Давталт</h1>\n<p>Консолыг харна уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `for (let i = 1; i <= 5; i++) {\n  console.log("i = " + i);\n}`,
      },
    },
    {
      kind: "exercise",
      title: "1-ээс 5 хүртэл хэвлэ",
      prompt: "`for` давталт ашиглаж 1-ээс 5 хүртэлх тоог `console.log`-оор хэвлэ.",
      starter: {
        html: `<p>Консолыг шалгана уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `// for давталт бичээд 1-ээс 5 хүртэл хэвлэ\n`,
      },
      hint: "for (let i = 1; i <= 5; i++) { console.log(i); }",
      solution: {
        html: `<p>Консолыг шалгана уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}`,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "\\bfor\\s*\\(", message: "`for (...)` давталт олдсонгүй." },
          { type: "jsIncludes", pattern: "console\\.log\\s*\\(", message: "`console.log(...)` дуудлага олдсонгүй." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "1-ээс 5 хүртэлх нийлбэр",
      prompt: "`for` давталтаар 1-ээс 5 хүртэлх тоог `+=`-ээр нэмж, нийлбэрийг хэвлэ.",
      starter: {
        html: "",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "let sum = 0;\n// for давталт бич\nconsole.log(sum);",
      },
      hint: "for (let i = 1; i <= 5; i++) { sum += i; }",
      solution: {
        html: "",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "let sum = 0;\nfor (let i = 1; i <= 5; i++) {\n  sum += i;\n}\nconsole.log(sum);",
      },
      check: {
        type: "allOf",
        checks: [
          {
            type: "jsIncludes",
            pattern: "for\\s*\\(",
            message: "`for` давталт олдсонгүй.",
          },
          {
            type: "jsIncludes",
            pattern: "\\+=",
            message: "`+=` ашиглан нийлбэр цуглуулаагүй байна.",
          },
        ],
      },
    },
    {
      kind: "quiz",
      question: "`for (let i = 0; i < 3; i++)` давталт хэдэн удаа ажиллах вэ?",
      options: ["2 удаа", "3 удаа", "4 удаа", "Төгсгөлгүй"],
      answer: 1,
      explain: "i нь 0, 1, 2 үед нөхцөл (i < 3) үнэн тул 3 удаа ажиллана. i = 3 болоход зогсоно.",
    },
  ],
};

export const JS_FUNCTIONS: Lesson = {
  id: "js-funkts",
  module: 3,
  title: "JS — Функц",
  objectives: [
    "Функц зарлаж, дуудах",
    "Параметр дамжуулах",
    "return-оор утга буцаах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Функц гэж юу вэ?",
      html: `<p><strong>Функц</strong> нь нэрлэгдсэн, дахин ашиглах боломжтой кодын блок юм.</p>
             <ul>
               <li><code>function нэр(параметр) { ... }</code> — функц зарлах</li>
               <li><code>нэр(утга)</code> — функцийг дуудах</li>
               <li><code>return</code> — үр дүнг буцаана</li>
             </ul>
             <p>Функцийг нэг удаа бичээд олон удаа дуудаж болно.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "js",
      code: `function nemeh(a, b) {
  return a + b;
}

console.log(nemeh(2, 3)); // 5
console.log(nemeh(10, 7)); // 17`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 240,
      starter: {
        html: `<h1>Функц</h1>\n<p>Консолыг харна уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `function mendchil(ner) {\n  return "Сайн уу, " + ner + "!";\n}\n\nconsole.log(mendchil("Бат"));`,
      },
    },
    {
      kind: "exercise",
      title: "Үржүүлэх функц бич",
      prompt: "`urjuuleh(a, b)` нэртэй функц бичиж `a * b`-г `return` хий. Дараа нь дуудаж `console.log`-оор хэвлэ.",
      starter: {
        html: `<p>Консолыг шалгана уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `// urjuuleh функцийг энд бич\n`,
      },
      hint: "function urjuuleh(a, b) { return a * b; } console.log(urjuuleh(3, 4));",
      solution: {
        html: `<p>Консолыг шалгана уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `function urjuuleh(a, b) {\n  return a * b;\n}\n\nconsole.log(urjuuleh(3, 4));`,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "function\\s+urjuuleh\\s*\\(", message: "`function urjuuleh(...)` зарлалт олдсонгүй." },
          { type: "jsIncludes", pattern: "\\breturn\\b", message: "`return` олдсонгүй." },
          { type: "jsIncludes", pattern: "console\\.log\\s*\\(", message: "`console.log(...)` дуудлага олдсонгүй." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Хоёр тоог нэмэх функц",
      prompt: "`add(a, b)` функц зарлаж `return`-оор нийлбэрийг буцааж, дуудаад хэвлэ.",
      starter: {
        html: "",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "// add функцээ энд бич\n",
      },
      hint: "function add(a, b) { return a + b; } console.log(add(2, 3));",
      solution: {
        html: "",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3));",
      },
      check: {
        type: "allOf",
        checks: [
          {
            type: "jsIncludes",
            pattern: "function\\s+\\w+\\s*\\([^)]*,[^)]*\\)",
            message: "Хоёр параметртэй функц олдсонгүй.",
          },
          {
            type: "jsIncludes",
            pattern: "return\\b",
            message: "`return` олдсонгүй.",
          },
        ],
      },
    },
    {
      kind: "quiz",
      question: "`function f(x) { return x * 2; }` үед `f(4)` юу буцаах вэ?",
      options: ["4", "6", "8", "undefined"],
      answer: 2,
      explain: "x = 4 тул 4 * 2 = 8 буцна. return байхгүй бол функц undefined буцаадаг.",
    },
  ],
};

export const JS_ARRAYS: Lesson = {
  id: "js-massiv",
  module: 3,
  title: "JS — Массив",
  objectives: [
    "Массив үүсгэж, индексээр утга унших",
    "length-ээр уртыг мэдэх",
    "push-оор шинэ утга нэмэх",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Массив гэж юу вэ?",
      html: `<p><strong>Массив</strong> нь олон утгыг нэг дор, дарааллаар нь хадгалдаг жагсаалт юм.</p>
             <ul>
               <li><code>const жимс = ["алим", "лийр"]</code> — массив үүсгэх</li>
               <li><code>жимс[0]</code> — индексээр унших (индекс <em>0</em>-ээс эхэлнэ)</li>
               <li><code>жимс.length</code> — элементийн тоо</li>
               <li><code>жимс.push("гүйлс")</code> — төгсгөлд нэмэх</li>
             </ul>
             <p>Анхаар: сүүлийн элементийн индекс нь <code>length - 1</code>.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "js",
      code: `const jims = ["алим", "лийр", "усан үзэм"];

console.log(jims[0]);      // алим
console.log(jims.length);  // 3

jims.push("гүйлс");
console.log(jims.length);  // 4`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 240,
      starter: {
        html: `<h1>Массив</h1>\n<p>Консолыг харна уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `const ner = ["Бат", "Сараа"];\nner.push("Тэмүүлэн");\nconsole.log(ner[2]);\nconsole.log(ner.length);`,
      },
    },
    {
      kind: "exercise",
      title: "Массивт утга нэм",
      prompt: "`toonuud` нэртэй массив үүсгэж 1, 2, 3 утга хий. `push`-оор 4 нэмээд `length`-ийг `console.log`-оор хэвл.",
      starter: {
        html: `<p>Консолыг шалгана уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `// toonuud массивыг энд бич\n`,
      },
      hint: "const toonuud = [1, 2, 3]; toonuud.push(4); console.log(toonuud.length);",
      solution: {
        html: `<p>Консолыг шалгана уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `const toonuud = [1, 2, 3];\ntoonuud.push(4);\nconsole.log(toonuud.length);`,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "\\b(const|let)\\s+toonuud\\s*=\\s*\\[", message: "`toonuud` массив зарлалт олдсонгүй." },
          { type: "jsIncludes", pattern: "toonuud\\.push\\s*\\(", message: "`toonuud.push(...)` олдсонгүй." },
          { type: "jsIncludes", pattern: "toonuud\\.length", message: "`toonuud.length` олдсонгүй." },
          { type: "jsIncludes", pattern: "console\\.log\\s*\\(", message: "`console.log(...)` дуудлага олдсонгүй." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Массивт элемент нэмж уртыг хар",
      prompt: "`fruits` массивт `push`-оор шинэ жимс нэмээд `length`-ийг хэвлэ.",
      starter: {
        html: "",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "const fruits = [\"алим\", \"гүйлс\"];\n// push ба length ашигла\n",
      },
      hint: "fruits.push(\"лууван\"); console.log(fruits.length);",
      solution: {
        html: "",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "const fruits = [\"алим\", \"гүйлс\"];\nfruits.push(\"лууван\");\nconsole.log(fruits.length);",
      },
      check: {
        type: "allOf",
        checks: [
          {
            type: "jsIncludes",
            pattern: "\\.push\\s*\\(",
            message: "`push` олдсонгүй.",
          },
          {
            type: "jsIncludes",
            pattern: "\\.length",
            message: "`length` олдсонгүй.",
          },
        ],
      },
    },
    {
      kind: "quiz",
      question: "`const a = [10, 20, 30];` үед `a[1]` юу вэ?",
      options: ["10", "20", "30", "undefined"],
      answer: 1,
      explain: "Индекс 0-ээс эхэлдэг тул a[0] = 10, a[1] = 20, a[2] = 30.",
    },
  ],
};

export const JS_OBJECTS: Lesson = {
  id: "js-obyekt",
  module: 3,
  title: "JS — Объект",
  objectives: [
    "Объект үүсгэж key/value хадгалах",
    "Цэгийн нотациар утга унших, өөрчлөх",
    "Объектод шинэ шинж чанар нэмэх",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Объект гэж юу вэ?",
      html: `<p><strong>Объект</strong> нь холбоотой мэдээллийг <em>key: value</em> хосоор нэг дор хадгалдаг.</p>
             <ul>
               <li><code>const хүн = { нэр: "Бат", нас: 20 }</code> — объект үүсгэх</li>
               <li><code>хүн.нэр</code> — цэгийн нотациар унших</li>
               <li><code>хүн.нас = 21</code> — утга өөрчлөх</li>
               <li><code>хүн.хот = "УБ"</code> — шинэ шинж чанар нэмэх</li>
             </ul>
             <p>Массив нь дарааллаар (индексээр), объект нь нэрээр (key-ээр) утга олдог.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "js",
      code: `const user = { name: "Бат", age: 20 };

console.log(user.name);  // Бат

user.age = 21;
user.city = "Улаанбаатар";

console.log(user.age);   // 21
console.log(user.city);  // Улаанбаатар`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 240,
      starter: {
        html: `<h1>Объект</h1>\n<p>Консолыг харна уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `const book = { title: "Storxon", pages: 100 };\nbook.pages = 120;\nbook.author = "Сараа";\nconsole.log(book.title, book.pages, book.author);`,
      },
    },
    {
      kind: "exercise",
      title: "Объект бүтээ",
      prompt: "`surgagch` нэртэй объект үүсгэж `ner` ба `nas` шинж чанартай болго. Дараа нь `surgagch.hot` нэмээд `surgagch.ner`-ийг `console.log`-оор хэвл.",
      starter: {
        html: `<p>Консолыг шалгана уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `// surgagch объектыг энд бич\n`,
      },
      hint: 'const surgagch = { ner: "Бат", nas: 18 }; surgagch.hot = "УБ"; console.log(surgagch.ner);',
      solution: {
        html: `<p>Консолыг шалгана уу.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `const surgagch = { ner: "Бат", nas: 18 };\nsurgagch.hot = "УБ";\nconsole.log(surgagch.ner);`,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "\\b(const|let)\\s+surgagch\\s*=\\s*\\{", message: "`surgagch` объект зарлалт олдсонгүй." },
          { type: "jsIncludes", pattern: "\\bner\\s*:", message: "`ner` шинж чанар олдсонгүй." },
          { type: "jsIncludes", pattern: "\\bnas\\s*:", message: "`nas` шинж чанар олдсонгүй." },
          { type: "jsIncludes", pattern: "surgagch\\.hot\\s*=", message: "`surgagch.hot = ...` олдсонгүй." },
          { type: "jsIncludes", pattern: "console\\.log\\s*\\(\\s*surgagch\\.ner", message: "`console.log(surgagch.ner)` олдсонгүй." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Объектын шинж чанарыг унш",
      prompt: "`student` объект үүсгэж, цэгийн нотациар (`student.name`) нэг утгыг хэвлэ.",
      starter: {
        html: "",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "// student объект бич\n",
      },
      hint: "const student = { name: \"Сараа\", age: 13 }; console.log(student.name);",
      solution: {
        html: "",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "const student = { name: \"Сараа\", age: 13 };\nconsole.log(student.name);",
      },
      check: {
        type: "allOf",
        checks: [
          {
            type: "jsIncludes",
            pattern: "(let|const)\\s+\\w+\\s*=\\s*\\{",
            message: "Объект олдсонгүй.",
          },
          {
            type: "jsIncludes",
            pattern: "console\\.log\\s*\\(\\s*\\w+\\.\\w+",
            message: "Цэгийн нотациар утга хэвлээгүй байна.",
          },
        ],
      },
    },
    {
      kind: "quiz",
      question: "`const a = { x: 1, y: 2 }; a.y = 5;` дараа `a.y` юу вэ?",
      options: ["1", "2", "5", "undefined"],
      answer: 2,
      explain: "Цэгийн нотациар `a.y = 5` гэж утгыг дарж бичсэн тул a.y = 5.",
    },
  ],
};

export const JS_DOM: Lesson = {
  id: "js-dom",
  module: 3,
  title: "JS — DOM унших/бичих",
  objectives: [
    "document.querySelector-оор элемент сонгох",
    "textContent-ээр текст унших, солих",
    "Сонгосон элементийн style-ийг өөрчлөх",
  ],
  blocks: [
    {
      kind: "theory",
      title: "DOM гэж юу вэ?",
      html: `<p><strong>DOM</strong> нь хөтөч HTML хуудсыг JavaScript-д харагдуулдаг мод бүтэц юм. JS-ээр элементийг <em>сонгож</em>, дараа нь текст, өнгийг нь <em>уншиж, өөрчилж</em> болно.</p>
             <ul>
               <li><code>document.querySelector("h1")</code> — CSS сонгогчоор эхний тохирох элементийг авах</li>
               <li><code>el.textContent</code> — элементийн текстийг унших</li>
               <li><code>el.textContent = "Шинэ"</code> — текстийг солих</li>
               <li><code>el.style.color = "red"</code> — өнгө өөрчлөх</li>
             </ul>
             <p>Бүх код энэ хуудасны хамгаалагдсан sandbox дотор ажиллана.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "js",
      code: `const title = document.querySelector("h1");

console.log(title.textContent);  // Сайн уу

title.textContent = "Сайн байна уу!";
title.style.color = "tomato";`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 260,
      starter: {
        html: `<h1 id="gar">Сайн уу</h1>\n<p class="tailbar">Энэ текстийг JS-ээр солино.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `const p = document.querySelector(".tailbar");\nconsole.log(p.textContent);\np.textContent = "JS-ээр солигдлоо!";\ndocument.querySelector("#gar").style.color = "teal";`,
      },
    },
    {
      kind: "exercise",
      title: "Гарчгийг солих",
      prompt: "`document.querySelector`-оор `h1`-ийг сонгож, `textContent`-ийг нь \"Storxon\" болгож солих код бич.",
      starter: {
        html: `<h1>Хуучин гарчиг</h1>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `// h1-ийг энд сонгож текстийг нь солино уу\n`,
      },
      hint: 'const h = document.querySelector("h1"); h.textContent = "Storxon";',
      solution: {
        html: `<h1>Хуучин гарчиг</h1>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `const h = document.querySelector("h1");\nh.textContent = "Storxon";`,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "document\\.querySelector\\s*\\(", message: "`document.querySelector(...)` олдсонгүй." },
          { type: "jsIncludes", pattern: "\\.textContent\\s*=", message: "`.textContent = ...` олдсонгүй." },
          { type: "jsIncludes", pattern: "Storxon", message: "Текст нь \"Storxon\" байх ёстой." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Гарчгийн текстийг солих",
      prompt: "`querySelector`-оор `#title`-ийг олж `textContent`-ийг нь шинэчил.",
      starter: {
        html: "<h1 id=\"title\">Хуучин гарчиг</h1>",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "// Энд бич\n",
      },
      hint: "document.querySelector(\"#title\").textContent = \"Шинэ гарчиг\";",
      solution: {
        html: "<h1 id=\"title\">Хуучин гарчиг</h1>",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "document.querySelector(\"#title\").textContent = \"Шинэ гарчиг\";",
      },
      check: {
        type: "allOf",
        checks: [
          {
            type: "jsIncludes",
            pattern: "querySelector\\s*\\(",
            message: "`querySelector` олдсонгүй.",
          },
          {
            type: "jsIncludes",
            pattern: "\\.textContent\\s*=",
            message: "`textContent = ...` олдсонгүй.",
          },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Эхний `<p>` элементийг сонгох зөв код аль нь вэ?",
      options: ['document.querySelector("p")', "document.p", 'document.textContent("p")', 'querySelector.p'],
      answer: 0,
      explain: "`document.querySelector` нь CSS сонгогч авч, эхний тохирох элементийг буцаадаг.",
    },
  ],
};

export const JS_EVENTS: Lesson = {
  id: "js-events",
  module: 3,
  title: "JS — Үйл явдал (events)",
  objectives: [
    "addEventListener-ээр товч дарахыг сонсох",
    "Үйл явдал гарахад текст, өнгө өөрчлөх",
    "onclick ба addEventListener-ийн ялгааг ойлгох",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Үйл явдал гэж юу вэ?",
      html: `<p><strong>Үйл явдал (event)</strong> гэдэг нь хэрэглэгч хуудас дээр хийсэн үйлдэл — товч дарах, хулганаар дээгүүр нь гарах, гараас бичих гэх мэт. JS эдгээрийг <em>сонсож</em>, хариу үйлдэл хийж чаддаг.</p>
             <ul>
               <li><code>el.addEventListener("click", функц)</code> — дарах үед функцийг ажиллуулна</li>
               <li><code>"click"</code>, <code>"mouseover"</code>, <code>"input"</code> — түгээмэл үйл явдлын нэрс</li>
               <li><code>el.onclick = функц</code> — богино хувилбар (нэг л үйлдэл тохируулна)</li>
             </ul>
             <p>Бүх код энэ хуудасны хамгаалагдсан sandbox дотор ажиллана.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "js",
      code: `const btn = document.querySelector("button");
const out = document.querySelector("#out");

btn.addEventListener("click", function () {
  out.textContent = "Товч дарагдлаа!";
  out.style.color = "teal";
});`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 260,
      starter: {
        html: `<button>Дар намайг</button>\n<p id="out">Одоогоор юу ч болоогүй.</p>`,
        css: `body { font-family: system-ui; padding: 16px; }\nbutton { padding: 8px 14px; cursor: pointer; }`,
        js: `const btn = document.querySelector("button");\nconst out = document.querySelector("#out");\nlet count = 0;\n\nbtn.addEventListener("click", () => {\n  count++;\n  out.textContent = "Дарсан тоо: " + count;\n  console.log("click", count);\n});`,
      },
    },
    {
      kind: "exercise",
      title: "Товч дарахад текст солих",
      prompt:
        "`button`-ийг сонгож, `addEventListener(\"click\", ...)` ашиглан дарах үед `#msg`-ийн `textContent`-ийг \"Сайн уу!\" болго.",
      starter: {
        html: `<button>Мэндлэх</button>\n<p id="msg">...</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `// Энд товчийг сонгож, click үйл явдлыг сонсоорой\n`,
      },
      hint: 'btn.addEventListener("click", () => { msg.textContent = "Сайн уу!"; });',
      solution: {
        html: `<button>Мэндлэх</button>\n<p id="msg">...</p>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `const btn = document.querySelector("button");\nconst msg = document.querySelector("#msg");\nbtn.addEventListener("click", () => {\n  msg.textContent = "Сайн уу!";\n});`,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "addEventListener\\s*\\(\\s*[\"']click[\"']", message: "`addEventListener(\"click\", ...)` олдсонгүй." },
          { type: "jsIncludes", pattern: "\\.textContent\\s*=", message: "`.textContent = ...` олдсонгүй." },
          { type: "jsIncludes", pattern: "Сайн уу!", message: "Текст нь \"Сайн уу!\" байх ёстой." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Товч дарахад текст солих",
      prompt: "`addEventListener(\"click\", ...)`-ээр товч дарахад `#msg`-ийн текстийг өөрчил.",
      starter: {
        html: "<button id=\"btn\">Дар</button>\n<p id=\"msg\">Хүлээж байна...</p>",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "const btn = document.querySelector(\"#btn\");\n// Энд click listener нэм\n",
      },
      hint: "btn.addEventListener(\"click\", () => { document.querySelector(\"#msg\").textContent = \"Дарлаа!\"; });",
      solution: {
        html: "<button id=\"btn\">Дар</button>\n<p id=\"msg\">Хүлээж байна...</p>",
        css: "body { font-family: system-ui; padding: 16px; }",
        js: "const btn = document.querySelector(\"#btn\");\nbtn.addEventListener(\"click\", () => {\n  document.querySelector(\"#msg\").textContent = \"Дарлаа!\";\n});",
      },
      check: {
        type: "allOf",
        checks: [
          {
            type: "jsIncludes",
            pattern: "addEventListener\\s*\\(\\s*[\"']click[\"']",
            message: "`addEventListener(\"click\", ...)` олдсонгүй.",
          },
          {
            type: "jsIncludes",
            pattern: "textContent\\s*=",
            message: "`textContent = ...` олдсонгүй.",
          },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Товч дарахыг сонсох зөв код аль нь вэ?",
      options: [
        'btn.addEventListener("click", функц)',
        'btn.listen("click")',
        'btn.click.addEvent(функц)',
        'addEventListener(btn, "click")',
      ],
      answer: 0,
      explain: "`элемент.addEventListener(\"үйл явдлын нэр\", функц)` — эхний аргумент нь үйл явдлын нэр, хоёр дахь нь ажиллах функц.",
    },
  ],
};

export const REACT_PROPS: Lesson = {
  id: "react-props",
  module: 9,
  title: "React — Props дамжуулах",
  objectives: [
    "Props гэж юу болохыг ойлгох",
    "Компонентод createElement-ийн 2 дахь аргументаар утга дамжуулах",
    "Нэг компонентийг өөр өөр props-оор дахин ашиглах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Props — компонентийн оролт",
      html: `<p><strong>Props</strong> нь компонентод гаднаас өгдөг утгууд бөгөөд функцийн параметртэй адил.</p>
             <p><code>h(Card, { name: "Бат" })</code> гэж дуудахад <code>Card</code> функц <code>props.name</code>-ээр уг утгыг авна.</p>
             <p>Props нь <em>зөвхөн унших</em> — компонент өөрт өгөгдсөн props-ийг өөрчилдөггүй.</p>`,
    },
    {
      kind: "playground",
      title: "Мэндчилгээний компонент",
      height: 300,
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.card { border: 1px solid #ccc; border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; }`,
        js: `const h = React.createElement;

function Greeting(props) {
  return h("div", { className: "card" }, "Сайн уу, " + props.name + "!");
}

function App() {
  return h("div", null,
    h(Greeting, { name: "Бат" }),
    h(Greeting, { name: "Болд" })
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
    },
    {
      kind: "exercise",
      title: "Гурав дахь мэндчилгээ нэм",
      prompt: "`App` дотор `name` props-ийг \"Сараа\" гэж өгсөн гурав дахь `Greeting` нэм.",
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.card { border: 1px solid #ccc; border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; }`,
        js: `const h = React.createElement;

function Greeting(props) {
  return h("div", { className: "card" }, "Сайн уу, " + props.name + "!");
}

function App() {
  return h("div", null,
    h(Greeting, { name: "Бат" }),
    h(Greeting, { name: "Болд" })
    // Энд "Сараа"-тай Greeting нэм
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
      hint: 'Өмнөх мөрийн төгсгөлд таслал тавиад h(Greeting, { name: "Сараа" }) гэж нэм.',
      solution: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.card { border: 1px solid #ccc; border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; }`,
        js: `const h = React.createElement;

function Greeting(props) {
  return h("div", { className: "card" }, "Сайн уу, " + props.name + "!");
}

function App() {
  return h("div", null,
    h(Greeting, { name: "Бат" }),
    h(Greeting, { name: "Болд" }),
    h(Greeting, { name: "Сараа" })
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
      check: {
        type: "jsIncludes",
        pattern: "name\\s*:\\s*[\"']Сараа[\"']",
        message: "`name: \"Сараа\"` props-тэй Greeting олдсонгүй.",
      },
    },
    {
      kind: "exercise",
      title: "Хоёр дахь props нэм",
      prompt: "`Profile` одоо `age` props хүлээж авдаг. `App` дотор `age` props-ийг тоогоор өгөөд, өөр нэртэй хоёр дахь `Profile` нэм.",
      starter: {
        html: REACT_CDN + "<div id=\"root\"></div>",
        css: "body { font-family: system-ui; padding: 16px; }\n.card { border: 1px solid #ccc; border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; }",
        js: "const h = React.createElement;\n\nfunction Profile(props) {\n  return h(\"div\", { className: \"card\" }, props.name + \" — \" + props.age + \" настай\");\n}\n\nfunction App() {\n  return h(\"div\", null,\n    h(Profile, { name: \"Бат\" })\n  );\n}\n\nReactDOM.createRoot(document.getElementById(\"root\")).render(h(App));",
      },
      hint: "h(Profile, { name: \"Бат\", age: 12 }), h(Profile, { name: \"Сараа\", age: 13 })",
      solution: {
        html: REACT_CDN + "<div id=\"root\"></div>",
        css: "body { font-family: system-ui; padding: 16px; }\n.card { border: 1px solid #ccc; border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; }",
        js: "const h = React.createElement;\n\nfunction Profile(props) {\n  return h(\"div\", { className: \"card\" }, props.name + \" — \" + props.age + \" настай\");\n}\n\nfunction App() {\n  return h(\"div\", null,\n    h(Profile, { name: \"Бат\", age: 12 }),\n    h(Profile, { name: \"Сараа\", age: 13 })\n  );\n}\n\nReactDOM.createRoot(document.getElementById(\"root\")).render(h(App));",
      },
      check: {
        type: "jsIncludes",
        pattern: "age\\s*:\\s*\\d+[\\s\\S]*age\\s*:\\s*\\d+",
        message: "Хоёр `Profile`-д `age: <тоо>` өгөөгүй байна.",
      },
    },
    {
      kind: "quiz",
      question: "Компонент props-ийг хэрхэн хүлээн авах вэ?",
      options: [
        "Функцийн эхний параметрээр (props)",
        "document.querySelector-оор",
        "useState-ээр",
        "CSS-ээр",
      ],
      answer: 0,
      explain: "`h(Comp, { name: \"Бат\" })` дахь объект нь `Comp(props)` функцийн эхний параметр болж очдог.",
    },
  ],
};

export const REACT_STATE: Lesson = {
  id: "react-state",
  module: 9,
  title: "React — useState төлөв",
  objectives: [
    "Төлөв (state) гэж юу болохыг ойлгох",
    "useState-ийн [утга, setter] хосыг ашиглах",
    "Товч дарахад төлөв өөрчлөгдөж дэлгэц шинэчлэгдэхийг харах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Төлөв — өөрчлөгддөг утга",
      html: `<p><strong>Төлөв (state)</strong> нь компонентийн цаг хугацаанд өөрчлөгддөг утга юм (жишээ нь тоолуурын тоо).</p>
             <p><code>const [count, setCount] = React.useState(0)</code> — <code>count</code> нь одоогийн утга, <code>setCount</code> нь шинэ утга өгөх функц, <code>0</code> нь анхны утга.</p>
             <p><code>setCount(...)</code>-г дуудахад React компонентийг дахин зурж, шинэ утгыг дэлгэцэнд харуулна. <code>count</code>-д шууд утга оноож болохгүй.</p>`,
    },
    {
      kind: "playground",
      title: "Тоолуур",
      height: 300,
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nbutton { padding: 6px 14px; border-radius: 8px; border: 1px solid #ccc; cursor: pointer; }`,
        js: `const h = React.createElement;

function Counter() {
  const [count, setCount] = React.useState(0);
  return h("div", null,
    h("p", null, "Тоо: " + count),
    h("button", { onClick: function () { setCount(count + 1); } }, "Нэмэх")
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(Counter));`,
      },
    },
    {
      kind: "exercise",
      title: "Хасах товч нэм",
      prompt: "`Counter` дотор `count`-ыг 1-ээр бууруулдаг \"Хасах\" товч нэм (`setCount(count - 1)`).",
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nbutton { padding: 6px 14px; border-radius: 8px; border: 1px solid #ccc; cursor: pointer; margin-right: 6px; }`,
        js: `const h = React.createElement;

function Counter() {
  const [count, setCount] = React.useState(0);
  return h("div", null,
    h("p", null, "Тоо: " + count),
    h("button", { onClick: function () { setCount(count + 1); } }, "Нэмэх")
    // Энд "Хасах" товч нэм
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(Counter));`,
      },
      hint: 'Өмнөх товчны дараа таслал тавиад h("button", { onClick: function () { setCount(count - 1); } }, "Хасах") гэж нэм.',
      solution: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nbutton { padding: 6px 14px; border-radius: 8px; border: 1px solid #ccc; cursor: pointer; margin-right: 6px; }`,
        js: `const h = React.createElement;

function Counter() {
  const [count, setCount] = React.useState(0);
  return h("div", null,
    h("p", null, "Тоо: " + count),
    h("button", { onClick: function () { setCount(count + 1); } }, "Нэмэх"),
    h("button", { onClick: function () { setCount(count - 1); } }, "Хасах")
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(Counter));`,
      },
      check: {
        type: "jsIncludes",
        pattern: "setCount\\(\\s*count\\s*-\\s*1\\s*\\)",
        message: "`setCount(count - 1)` гэсэн хасах товч олдсонгүй.",
      },
    },
    {
      kind: "exercise",
      title: "Reset товч нэм",
      prompt: "Тоолуурын доор `setCount(0)` дуудах \"Reset\" товч нэм.",
      starter: {
        html: REACT_CDN + "<div id=\"root\"></div>",
        css: "body { font-family: system-ui; padding: 16px; }\n.card { border: 1px solid #ccc; border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; }",
        js: "const h = React.createElement;\n\nfunction App() {\n  const [count, setCount] = React.useState(0);\n  return h(\"div\", null,\n    h(\"p\", null, \"Тоо: \" + count),\n    h(\"button\", { onClick: () => setCount(count + 1) }, \"+1\")\n    // Энд Reset товч нэм\n  );\n}\n\nReactDOM.createRoot(document.getElementById(\"root\")).render(h(App));",
      },
      hint: "h(\"button\", { onClick: () => setCount(0) }, \"Reset\")",
      solution: {
        html: REACT_CDN + "<div id=\"root\"></div>",
        css: "body { font-family: system-ui; padding: 16px; }\n.card { border: 1px solid #ccc; border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; }",
        js: "const h = React.createElement;\n\nfunction App() {\n  const [count, setCount] = React.useState(0);\n  return h(\"div\", null,\n    h(\"p\", null, \"Тоо: \" + count),\n    h(\"button\", { onClick: () => setCount(count + 1) }, \"+1\"),\n    h(\"button\", { onClick: () => setCount(0) }, \"Reset\")\n  );\n}\n\nReactDOM.createRoot(document.getElementById(\"root\")).render(h(App));",
      },
      check: {
        type: "jsIncludes",
        pattern: "setCount\\s*\\(\\s*0\\s*\\)",
        message: "`setCount(0)` олдсонгүй.",
      },
    },
    {
      kind: "quiz",
      question: "Төлөвийг өөрчилж дэлгэцийг шинэчлэхийн тулд юу хийх вэ?",
      options: [
        "count = count + 1 гэж шууд онооно",
        "setCount(count + 1) гэж setter-ийг дуудна",
        "document.write ашиглана",
        "Хуудсыг гараар дахин ачаална",
      ],
      answer: 1,
      explain: "Зөвхөн setter (`setCount`)-ийг дуудахад React шинэ утгыг хадгалж, компонентийг дахин зурдаг.",
    },
  ],
};

export const REACT_LISTS: Lesson = {
  id: "react-lists",
  module: 9,
  title: "React — жагсаалт render (map)",
  objectives: [
    "Массивыг .map()-ээр элементүүд болгон хувиргах",
    "Жагсаалтын элемент бүрт өвөрмөц key өгөх",
    "Массивт утга нэмэхэд жагсаалт шинэчлэгдэхийг харах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Массивыг жагсаалт болгох",
      html: `<p>React-д олон элементийг нэг нэгээр нь бичихийн оронд <strong>массив</strong>-аас <code>.map()</code>-ээр үүсгэнэ.</p>
             <p><code>items.map(function (x) { return h("li", { key: x }, x); })</code> — массивын элемент бүрээс нэг <code>&lt;li&gt;</code> гаргана.</p>
             <p>Элемент бүрт <code>key</code> prop өгөх ёстой. Энэ нь React-д аль элемент аль нь вэ гэдгийг ялгах өвөрмөц шошго юм.</p>`,
    },
    {
      kind: "playground",
      title: "Хоолны жагсаалт",
      height: 300,
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nli { margin: 4px 0; }`,
        js: `const h = React.createElement;

function FoodList() {
  const foods = ["Бууз", "Хуушуур", "Цуйван"];
  return h("ul", null,
    foods.map(function (f) {
      return h("li", { key: f }, f);
    })
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(FoodList));`,
      },
    },
    {
      kind: "exercise",
      title: "Жагсаалтад нэмэлт утга",
      prompt: "`foods` массивт \"Банштай шөл\" гэсэн дөрөв дэх утгыг нэм. Жагсаалт автоматаар шинэчлэгдэнэ.",
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nli { margin: 4px 0; }`,
        js: `const h = React.createElement;

function FoodList() {
  const foods = ["Бууз", "Хуушуур", "Цуйван"];
  return h("ul", null,
    foods.map(function (f) {
      return h("li", { key: f }, f);
    })
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(FoodList));`,
      },
      hint: 'foods массивын төгсгөлд таслал тавиад "Банштай шөл" гэж нэм.',
      solution: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nli { margin: 4px 0; }`,
        js: `const h = React.createElement;

function FoodList() {
  const foods = ["Бууз", "Хуушуур", "Цуйван", "Банштай шөл"];
  return h("ul", null,
    foods.map(function (f) {
      return h("li", { key: f }, f);
    })
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(FoodList));`,
      },
      check: {
        type: "jsIncludes",
        pattern: "Банштай шөл",
        message: "\"Банштай шөл\" гэсэн утга массивт олдсонгүй.",
      },
    },
    {
      kind: "exercise",
      title: "Жагсаалтад key өг",
      prompt: "`map` дотор үүсгэж буй `li` бүрт өвөрмөц `key` props өг.",
      starter: {
        html: REACT_CDN + "<div id=\"root\"></div>",
        css: "body { font-family: system-ui; padding: 16px; }\n.card { border: 1px solid #ccc; border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; }",
        js: "const h = React.createElement;\n\nconst items = [\"Алим\", \"Лууван\", \"Гүйлс\"];\n\nfunction App() {\n  return h(\"ul\", null,\n    items.map((item) => h(\"li\", null, item))\n  );\n}\n\nReactDOM.createRoot(document.getElementById(\"root\")).render(h(App));",
      },
      hint: "h(\"li\", { key: item }, item)",
      solution: {
        html: REACT_CDN + "<div id=\"root\"></div>",
        css: "body { font-family: system-ui; padding: 16px; }\n.card { border: 1px solid #ccc; border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; }",
        js: "const h = React.createElement;\n\nconst items = [\"Алим\", \"Лууван\", \"Гүйлс\"];\n\nfunction App() {\n  return h(\"ul\", null,\n    items.map((item) => h(\"li\", { key: item }, item))\n  );\n}\n\nReactDOM.createRoot(document.getElementById(\"root\")).render(h(App));",
      },
      check: {
        type: "jsIncludes",
        pattern: "key\\s*:",
        message: "`key` props олдсонгүй.",
      },
    },
    {
      kind: "quiz",
      question: "Жагсаалтын элемент бүрт `key` юуны төлөө өгдөг вэ?",
      options: [
        "Элементийг өнгөөр будах",
        "React элемент бүрийг өвөрмөцөөр ялгаж таних",
        "Элементийг нууж харуулах",
        "Элементийн хэмжээг тохируулах",
      ],
      answer: 1,
      explain: "`key` нь жагсаалтын элемент бүрийг өвөрмөцөөр ялгаж, өөрчлөлт гарахад React зөв элементийг шинэчлэхэд тусална.",
    },
  ],
};

export const DEVTOOLS_CONSOLE: Lesson = {
  id: "devtools-console",
  module: 4,
  title: "Хөтчийн DevTools ба console",
  objectives: [
    "DevTools нээж сурах",
    "console.log-оор утга шалгах",
    "Элементийг Inspect хийж харах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "DevTools гэж юу вэ?",
      html: `<p><strong>DevTools</strong> нь хөтөч доторх хөгжүүлэгчийн хэрэгсэл юм. <code>F12</code> дарж эсвэл хуудас дээр баруун товшоод <em>Inspect</em> сонгож нээнэ.</p><p><strong>Elements</strong> таб нь HTML/CSS-ийг шууд харж засахад, <strong>Console</strong> таб нь <code>console.log()</code>-ийн гаралт болон алдааг харахад хэрэгтэй.</p>`,
    },
    {
      kind: "quiz",
      question: "Console дээр утга хэвлэхэд аль функцийг ашигладаг вэ?",
      options: [
        "print()",
        "console.log()",
        "echo()",
        "write.console()",
      ],
      answer: 1,
      explain: "`console.log()` нь утгыг Console табд хэвлэж, код дотор юу болж байгааг шалгахад тусалдаг.",
    },
  ],
};

export const GIT_BASICS: Lesson = {
  id: "git-undes",
  module: 5,
  title: "Git-ийн үндэс — өөрчлөлтөө хадгалах",
  objectives: [
    "Git репозитор гэж юу гэдгийг ойлгох",
    "commit хийж сурах",
    "add → commit дарааллыг мэдэх",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Git гэж юу вэ?",
      html: `<p><strong>Git</strong> нь кодын өөрчлөлтийг түүхтэй нь хадгалдаг хэрэгсэл юм. Нэг хадгалалтыг <em>commit</em> гэнэ.</p><p>Үндсэн дараалал: <code>git add .</code> (өөрчлөлтийг бэлтгэх) → <code>git commit -m "тайлбар"</code> (хадгалах).</p>`,
    },
    {
      kind: "quiz",
      question: "Өөрчлөлтийг хадгалах commit хийхээс өмнө ямар команд ажиллуулдаг вэ?",
      options: [
        "git add",
        "git delete",
        "git open",
        "git run",
      ],
      answer: 0,
      explain: "`git add` нь өөрчлөлтийг commit-д бэлтгэнэ, дараа нь `git commit` түүнийг түүхэнд хадгална.",
    },
  ],
};

export const JS_ARRAY_METHODS: Lesson = {
  id: "js-massiv-method",
  module: 6,
  title: "JavaScript — массивын map ба filter",
  objectives: [
    "map-аар массивыг хувиргах",
    "filter-ээр шүүх",
    "Шинэ массив буцаадгийг ойлгох",
  ],
  blocks: [
    {
      kind: "theory",
      title: "map ба filter",
      html: `<p><code>map</code> нь массивын элемент бүрийг хувиргаж <strong>шинэ массив</strong> буцаана: <code>[1,2,3].map(n =&gt; n * 2)</code> → <code>[2,4,6]</code>.</p><p><code>filter</code> нь нөхцөлд таарсан элементүүдийг л үлдээнэ: <code>[1,2,3].filter(n =&gt; n &gt; 1)</code> → <code>[2,3]</code>.</p>`,
    },
    {
      kind: "quiz",
      question: "[1,2,3].filter(n => n > 1) юу буцаах вэ?",
      options: [
        "[1]",
        "[2,3]",
        "[1,2,3]",
        "[3]",
      ],
      answer: 1,
      explain: "`filter` нь нөхцөл үнэн болох элементүүдийг л үлдээдэг тул 2 ба 3 үлдэнэ.",
    },
  ],
};

export const WEB_ACCESSIBILITY: Lesson = {
  id: "web-accessibility",
  module: 7,
  title: "Хүртээмжтэй вэб — alt, label, контраст",
  objectives: [
    "Зурагт alt бичих",
    "Оролтод label холбох",
    "Өнгөний контрастыг анхаарах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Хүртээмж гэж юу вэ?",
      html: `<p>Хүртээмжтэй вэб нь хараа, сонсгол, хөдөлгөөний бэрхшээлтэй хүмүүст ч хэрэглэхэд тохиромжтой байдаг.</p><ul><li>Зураг бүрт утга бүхий <code>alt</code> бичнэ.</li><li><code>&lt;input&gt;</code> бүрт <code>&lt;label&gt;</code> холбоно.</li><li>Текст ба дэвсгэрийн өнгө хангалттай ялгарсан байх ёстой.</li></ul>`,
    },
    {
      kind: "quiz",
      question: "Зургийн alt шинж чанар юунд хэрэгтэй вэ?",
      options: [
        "Зургийг томруулахад",
        "Зураг харагдахгүй үед эсвэл дэлгэц уншигчид зургийг тайлбарлахад",
        "Зургийн өнгийг солиход",
        "Зургийг хурдан ачаалахад",
      ],
      answer: 1,
      explain: "`alt` нь зургийг тайлбарласан текст бөгөөд дэлгэц уншигч болон зураг ачаалагдаагүй үед хэрэглэгчид тус болно.",
    },
  ],
};

export const MINI_PROJECT_INTRO: Lesson = {
  id: "mini-project",
  module: 8,
  title: "Жижиг төсөл — Хувийн танилцуулга хуудас",
  objectives: [
    "HTML + CSS + JS-ийг нэгтгэх",
    "Төслийн бүтцийг төлөвлөх",
    "Өөрийн хуудсыг бүтээх",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Төслийн төлөвлөгөө",
      html: `<p>Энэ модульд сурсан бүхнээ нэгтгэж <strong>хувийн танилцуулга хуудас</strong> бүтээнэ.</p><ol><li><strong>HTML:</strong> гарчиг, зураг, товч намтар, холбоосууд.</li><li><strong>CSS:</strong> өнгө, фонт, Flexbox байршил.</li><li><strong>JS:</strong> товч дарахад мэндчилгээ солих.</li></ol><p>Эхлээд цаасан дээр бүтцээ зур, дараа нь хэсэг хэсгээр нь код болго.</p>`,
    },
    {
      kind: "quiz",
      question: "Төслөө эхлэхэд хамгийн сайн эхний алхам аль нь вэ?",
      options: [
        "Шууд бүх кодыг бичих",
        "Бүтцээ төлөвлөж, жижиг хэсгээр нь хийх",
        "CSS-гүйгээр орхих",
        "Бусдын төслийг хуулах",
      ],
      answer: 1,
      explain: "Бүтцээ эхлээд төлөвлөөд жижиг хэсгүүдээр барьвал алдааг хялбар олж засна.",
    },
  ],
};

export const LESSONS: Lesson[] = [HTML_INTRO, CSS_INTRO, JS_INTRO, HTML_HEADINGS, HTML_LISTS_LINKS, HTML_IMAGES_MEDIA, HTML_TABLES, HTML_FORMS, HTML_SEMANTIC, CSS_COLORS, CSS_BOX_MODEL, CSS_TEXT_FONT, CSS_FLEXBOX, CSS_GRID, CSS_RESPONSIVE, CSS_HOVER_TRANSITION, JS_VARIABLES_TYPES, JS_CONDITIONS, JS_LOOPS, JS_FUNCTIONS, JS_ARRAYS, JS_OBJECTS, JS_DOM, JS_EVENTS, DEVTOOLS_CONSOLE, GIT_BASICS, JS_ARRAY_METHODS, WEB_ACCESSIBILITY, MINI_PROJECT_INTRO, REACT_INTRO, REACT_PROPS, REACT_STATE, REACT_LISTS];

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
