import type { Lesson } from "@/lib/lessons/types";

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
