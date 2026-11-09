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

export const REACT_EFFECT: Lesson = {
  id: "react-effect",
  module: 9,
  title: "React — useEffect ба амьдралын мөчлөг",
  objectives: [
    "Компонент зурагдсаны дараа `useEffect`-ээр тал талын үйлдэл хийх",
    "Dependency массив (`[]`, `[count]`) ямар үед effect ажиллахыг тодорхойлохыг ойлгох",
    "Cleanup функцээр таймер зэргийг цэвэрлэх",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Effect — зурагдсаны дараах үйлдэл",
      html: `<p><code>useEffect</code> нь компонент дэлгэцэнд <strong>зурагдсаны дараа</strong> ажиллах кодыг бичих газар юм (таймер, гарчиг солих, өгөгдөл татах гэх мэт).</p>
             <ul>
               <li><code>React.useEffect(fn, [])</code> — зөвхөн анх зурагдахад <strong>нэг удаа</strong></li>
               <li><code>React.useEffect(fn, [count])</code> — <code>count</code> өөрчлөгдөх бүрт</li>
               <li><code>fn</code> дотроос функц буцаавал энэ нь <strong>cleanup</strong> — компонент устахад эсвэл effect дахин ажиллахын өмнө дуудагдана</li>
             </ul>
             <p>Dependency массивыг орхивол effect <em>render болгоны дараа</em> ажиллана — ихэнхдээ хэрэггүй.</p>`,
    },
    {
      kind: "playground",
      title: "Секунд тоологч",
      height: 300,
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `const h = React.createElement;

function Timer() {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(function () {
    const id = setInterval(function () {
      setSeconds(function (s) { return s + 1; });
    }, 1000);
    return function () { clearInterval(id); }; // cleanup
  }, []);

  return h("p", null, "Өнгөрсөн секунд: " + seconds);
}

ReactDOM.createRoot(document.getElementById("root")).render(h(Timer));`,
      },
    },
    {
      kind: "exercise",
      title: "Гарчиг шинэчил",
      prompt: "`count` өөрчлөгдөх бүрт `document.title`-г \"Тоо: ...\" болгодог `useEffect` нэм. Dependency массивт `[count]` өг.",
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nbutton { padding: 6px 14px; border-radius: 8px; border: 1px solid #ccc; cursor: pointer; }`,
        js: `const h = React.createElement;

function App() {
  const [count, setCount] = React.useState(0);

  // Энд useEffect нэм: count өөрчлөгдөх бүрт document.title шинэчил

  return h("div", null,
    h("p", null, "Тоо: " + count),
    h("button", { onClick: function () { setCount(count + 1); } }, "Нэмэх")
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
      hint: 'React.useEffect(function () { document.title = "Тоо: " + count; }, [count]);',
      solution: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nbutton { padding: 6px 14px; border-radius: 8px; border: 1px solid #ccc; cursor: pointer; }`,
        js: `const h = React.createElement;

function App() {
  const [count, setCount] = React.useState(0);

  React.useEffect(function () {
    document.title = "Тоо: " + count;
  }, [count]);

  return h("div", null,
    h("p", null, "Тоо: " + count),
    h("button", { onClick: function () { setCount(count + 1); } }, "Нэмэх")
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "useEffect\\s*\\(", message: "`React.useEffect(...)` олдсонгүй." },
          { type: "jsIncludes", pattern: "document\\.title\\s*=", message: "Effect дотор `document.title = ...` гэж оноогоорой." },
          { type: "jsIncludes", pattern: "\\[\\s*count\\s*\\]", message: "Dependency массивт `[count]` өгөөрэй." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "`React.useEffect(fn, [])` — fn хэзээ ажиллах вэ?",
      options: [
        "Render болгоны дараа",
        "Зөвхөн компонент анх зурагдсаны дараа нэг удаа",
        "Хэзээ ч ажиллахгүй",
        "Товч дарагдах бүрт",
      ],
      answer: 1,
      explain: "Хоосон dependency массив `[]` нь хамаарах утгагүй гэсэн үг тул effect зөвхөн анхны render-ийн дараа нэг удаа ажилладаг.",
    },
    {
      kind: "quiz",
      question: "Effect-ээс буцаасан функц (cleanup) юунд хэрэгтэй вэ?",
      options: [
        "Компонентийг хурдан болгох",
        "Таймер, event listener зэргийг устгаж, алдаа/зөрөөс сэргийлэх",
        "Төлөвийг шууд өөрчлөх",
        "Dependency массивыг орлох",
      ],
      answer: 1,
      explain: "Cleanup нь компонент устах эсвэл effect дахин ажиллахын өмнө дуудагдаж, `clearInterval` зэргээр өмнөх үйлдлийг цэвэрлэнэ.",
    },
  ],
};

export const REACT_FORMS: Lesson = {
  id: "react-forms",
  module: 9,
  title: "React — Форм ба controlled input",
  objectives: [
    "Input-ийн утгыг `useState`-ээр удирдах (controlled input)",
    "`value` ба `onChange` хослолыг зөв бичих",
    "Form-ын `onSubmit` дотор `preventDefault()` ашиглах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Controlled input гэж юу вэ?",
      html: `<p><strong>Controlled input</strong> гэдэг нь input-ийн утгыг браузер биш <strong>React-ийн state</strong> эзэмшиж байгаа хэлбэр юм.</p>
             <ul>
               <li><code>value: name</code> — input үргэлж state-ийн утгыг харуулна</li>
               <li><code>onChange</code> — бичих бүрт <code>e.target.value</code>-г state-д хадгална</li>
               <li>Form-д <code>onSubmit</code> өгч, дотор нь <code>e.preventDefault()</code> дуудвал хуудас дахин ачаалагдахгүй</li>
             </ul>
             <p>Ингэснээр бичсэн утгыг бодит цагт харуулах, шалгах, цэвэрлэх нь амархан болдог.</p>`,
    },
    {
      kind: "playground",
      title: "Нэрээ бичихэд мэндчилгээ шинэчлэгдэнэ",
      height: 300,
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\ninput { padding: 8px 10px; border-radius: 8px; border: 1px solid #ccc; }`,
        js: `const h = React.createElement;

function Greeting() {
  const [name, setName] = React.useState("");

  return h("div", null,
    h("input", {
      value: name,
      placeholder: "Нэрээ бич",
      onChange: function (e) { setName(e.target.value); }
    }),
    h("p", null, name ? "Сайн уу, " + name + "!" : "Нэрээ оруулна уу")
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(Greeting));`,
      },
    },
    {
      kind: "exercise",
      title: "Controlled input холбо",
      prompt: "Input-д `value: text` өгч, `onChange` дотор `setText(e.target.value)` дуудаж controlled input болго.",
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\ninput { padding: 8px 10px; border-radius: 8px; border: 1px solid #ccc; }`,
        js: `const h = React.createElement;

function App() {
  const [text, setText] = React.useState("");

  return h("div", null,
    // Энд input-д value болон onChange нэм
    h("input", { placeholder: "Юм бич" }),
    h("p", null, "Урт: " + text.length)
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
      hint: "h(\"input\", { value: text, onChange: function (e) { setText(e.target.value); } })",
      solution: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\ninput { padding: 8px 10px; border-radius: 8px; border: 1px solid #ccc; }`,
        js: `const h = React.createElement;

function App() {
  const [text, setText] = React.useState("");

  return h("div", null,
    h("input", {
      placeholder: "Юм бич",
      value: text,
      onChange: function (e) { setText(e.target.value); }
    }),
    h("p", null, "Урт: " + text.length)
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "value\\s*:\\s*text", message: "Input-д `value: text` өгөөрэй." },
          { type: "jsIncludes", pattern: "onChange\\s*:", message: "Input-д `onChange` бичээрэй." },
          { type: "jsIncludes", pattern: "setText\\s*\\(\\s*e\\.target\\.value", message: "`setText(e.target.value)` дуудаарай." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Controlled input гэж юу вэ?",
      options: [
        "Утгыг нь React state удирддаг input",
        "Өнгөө солих боломжгүй input",
        "Зөвхөн унших боломжтой input",
        "Автоматаар хадгалагддаг input",
      ],
      answer: 0,
      explain: "Controlled input нь `value`-г state-ээс авч, `onChange`-ээр state-ийг шинэчилдэг тул утгын эх сурвалж нэг л газар (state) байна.",
    },
    {
      kind: "quiz",
      question: "Form илгээхэд хуудас дахин ачаалагдахаас сэргийлэх нь аль нь вэ?",
      options: [
        "e.stopPropagation()",
        "e.preventDefault()",
        "e.target.reset()",
        "setState(null)",
      ],
      answer: 1,
      explain: "`onSubmit` дотор `e.preventDefault()` дуудвал браузерын анхдагч submit (хуудас дахин ачаалах) зогсч, та өөрийн логикоо ажиллуулна.",
    },
  ],
};

export const REACT_CONDITIONAL_KEY: Lesson = {
  id: "react-conditional-key",
  module: 9,
  title: "React — Нөхцөлт render ба жагсаалтын key",
  objectives: [
    "`&&` ба гурвалсан (`? :`) оператороор элементийг нөхцөлтэй харуулах",
    "Харуулахгүй байх үед `null` буцаах",
    "Жагсаалтын элемент бүрт тогтвортой `key` өгөх (индекс биш `id`)",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Нөхцөлт render",
      html: `<p>React-д <code>if</code>-ийг JSX/createElement-ийн <em>дотор</em> бичихийн оронд энгийн JavaScript илэрхийлэл ашиглана:</p>
             <ul>
               <li><code>show &amp;&amp; h("p", null, "Харагдана")</code> — <code>show</code> үнэн үед л элемент гарна.</li>
               <li><code>ok ? h("b", null, "Тийм") : h("i", null, "Үгүй")</code> — хоёр сонголтын нэгийг харуулна.</li>
               <li>Юу ч харуулахгүй бол <code>null</code> буцаана.</li>
             </ul>
             <p><strong>key</strong>: жагсаалтыг <code>.map()</code>-ээр гаргахад элемент бүр <code>key</code>-тэй байх ёстой. Ингэснээр React аль элемент нэмэгдэж, устсаныг зөв танина. Тогтвортой <code>id</code>-г ашигла; массивын индексийг зөвхөн жагсаалт өөрчлөгддөггүй үед хэрэглэ.</p>`,
    },
    {
      kind: "playground",
      title: "Нууц үг харуулах/нуух",
      height: 320,
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nbutton { padding: 6px 14px; font-size: 16px; }\nli { margin: 4px 0; }`,
        js: `const h = React.createElement;

const TODOS = [
  { id: 1, text: "HTML сурах", done: true },
  { id: 2, text: "CSS сурах", done: true },
  { id: 3, text: "React сурах", done: false },
];

function App() {
  const [show, setShow] = React.useState(false);
  return h("div", null,
    h("button", { onClick: () => setShow(!show) }, show ? "Нуух" : "Харуулах"),
    show && h("p", null, "Энэ мэдээлэл товч дарсны дараа гарч ирнэ."),
    h("ul", null,
      TODOS.map((t) => h("li", { key: t.id }, (t.done ? "✅ " : "⬜ ") + t.text))
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
    },
    {
      kind: "exercise",
      title: "Дууссан даалгаврыг нуу",
      prompt: "`TODOS.filter(...)`-ээр зөвхөн дуусаагүй (`!t.done`) даалгаврыг жагсаалтад үлдээ. `key`-ээ `t.id` хэвээр байлга.",
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `const h = React.createElement;

const TODOS = [
  { id: 1, text: "HTML сурах", done: true },
  { id: 2, text: "CSS сурах", done: true },
  { id: 3, text: "React сурах", done: false },
];

function App() {
  return h("ul", null,
    TODOS.map((t) => h("li", { key: t.id }, t.text))
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
      hint: "`TODOS.map(...)`-ын өмнө `TODOS.filter((t) => !t.done)` нэм: `TODOS.filter((t) => !t.done).map(...)`.",
      solution: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }`,
        js: `const h = React.createElement;

const TODOS = [
  { id: 1, text: "HTML сурах", done: true },
  { id: 2, text: "CSS сурах", done: true },
  { id: 3, text: "React сурах", done: false },
];

function App() {
  return h("ul", null,
    TODOS.filter((t) => !t.done).map((t) => h("li", { key: t.id }, t.text))
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "\\.filter\\s*\\(", message: "`.filter(...)` ашиглаарай." },
          { type: "jsIncludes", pattern: "key\\s*:\\s*t\\.id", message: "`key: t.id` хэвээр байлга." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Элементийг нөхцөлтэй харуулахгүй байхын тулд компонент юу буцааж болох вэ?",
      options: ["null", "undefined гэсэн текст", "\"hide\"", "false гэсэн функц"],
      answer: 0,
      explain: "`null` буцаавал React юу ч render хийхгүй.",
    },
    {
      kind: "quiz",
      question: "Жагсаалтын `key`-д ямар утга хамгийн тохиромжтой вэ?",
      options: [
        "Элемент бүрийн тогтвортой өвөрмөц id",
        "Math.random()",
        "Бүх элементэд ижил тоо",
        "Элементийн өнгө",
      ],
      answer: 0,
      explain: "Тогтвортой id нь дахин render хийхэд React элемент бүрийг зөв таних боломжийг өгнө. Math.random() бүр дахин үүсэж, шинэчлэлийг дэмий болгоно.",
    },
  ],
};

export const REACT_COMPOSITION: Lesson = {
  id: "react-composition",
  module: 9,
  title: "React — Компонент задлах ба дахин ашиглах",
  objectives: [
    "Том UI-г жижиг, нэг үүрэгтэй компонентуудад хуваах",
    "Нэг компонентыг өөр өөр props-оор олон удаа дахин ашиглах",
    "`children` prop-оор компонентын дотор агуулга дамжуулах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Жижиг компонент, олон удаа ашиглалт",
      html: `<p>Нэг том функцэд бүх UI-г бичихийн оронд <strong>жижиг компонентод</strong> хуваа. Компонент бүр нэг л зүйлийг хийвэл унших, засахад хялбар.</p>
             <ul>
               <li>Давтагдаж буй хэсгийг (жишээ нь карт) тусдаа компонент болгоод <code>props</code>-оор өөр өөр өгөгдөл өг.</li>
               <li>Компонентыг <code>h(Card, { title: "..." })</code> хэлбэрээр хэдэн ч удаа дуудаж болно.</li>
               <li><code>children</code> — <code>h(Box, null, "текст")</code> гэж дамжуулсан агуулга <code>props.children</code>-д ирнэ.</li>
             </ul>
             <p>Дүрэм: компонентын нэр <strong>том үсгээр</strong> эхэлнэ (<code>Card</code>), эс тэгвээс React үүнийг энгийн HTML tag гэж ойлгоно.</p>`,
    },
    {
      kind: "playground",
      title: "Карт компонентыг дахин ашиглах",
      height: 320,
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\n.card { border: 1px solid #ccc; border-radius: 8px; padding: 12px; margin: 8px 0; }\n.card h3 { margin: 0 0 4px; }`,
        js: `const h = React.createElement;

function Card(props) {
  return h("div", { className: "card" },
    h("h3", null, props.title),
    h("div", null, props.children)
  );
}

function App() {
  return h("div", null,
    h(Card, { title: "HTML" }, "Вэбийн бүтэц"),
    h(Card, { title: "CSS" }, "Загвар, өнгө"),
    h(Card, { title: "JS" }, "Үйлдэл, логик")
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
    },
    {
      kind: "exercise",
      title: "Badge компонент гарга",
      prompt: "`Badge` нэртэй компонент үүсгэ: `props.text`-ийг `<span>`-д харуулна. Дараа нь `App` дотор `Badge`-ийг өөр өөр текстээр 2 удаа дууд.",
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nspan { background: #eef; padding: 2px 10px; border-radius: 12px; margin-right: 6px; }`,
        js: `const h = React.createElement;

// Энд Badge компонентыг бич

function App() {
  return h("div", null,
    // Badge-ийг 2 удаа дууд
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
      hint: "`function Badge(props) { return h(\"span\", null, props.text); }` бичээд `App` дотор `h(Badge, { text: \"Шинэ\" })` гэж дууд.",
      solution: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nspan { background: #eef; padding: 2px 10px; border-radius: 12px; margin-right: 6px; }`,
        js: `const h = React.createElement;

function Badge(props) {
  return h("span", null, props.text);
}

function App() {
  return h("div", null,
    h(Badge, { text: "Шинэ" }),
    h(Badge, { text: "Алдартай" })
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "function\\s+Badge\\s*\\(", message: "`function Badge(props)` компонент зарла." },
          { type: "jsIncludes", pattern: "props\\.text", message: "`props.text`-ийг ашигла." },
          { type: "jsIncludes", pattern: "h\\s*\\(\\s*Badge[\\s\\S]*h\\s*\\(\\s*Badge", message: "`Badge`-ийг 2 удаа дууд." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Өөрийн компонентын нэр яагаад том үсгээр эхлэх ёстой вэ?",
      options: [
        "Эс тэгвээс React үүнийг энгийн HTML tag гэж ойлгоно",
        "Зөвхөн гоё харагдуулахын тулд",
        "Жижиг үсэг алдаа заадаг учраас",
        "Том үсэг хурдан ажилладаг",
      ],
      answer: 0,
      explain: "Том үсгээр эхэлсэн нэрийг React компонент, жижиг үсгээр эхэлснийг HTML tag гэж ялгадаг.",
    },
    {
      kind: "quiz",
      question: "`h(Box, null, \"Сайн уу\")` дахь \"Сайн уу\" компонентод хаана ирэх вэ?",
      options: ["props.children", "props.text", "props.title", "state"],
      answer: 0,
      explain: "Гурав дахь аргументаас хойших агуулга `props.children` болж ирнэ.",
    },
  ],
};

export const REACT_USEREF: Lesson = {
  id: "react-useref",
  module: 9,
  title: "React — useRef ба DOM хандалт",
  objectives: [
    "`useRef`-ээр DOM элемент рүү шууд хандах",
    "`ref.current`-ээр элементийн `focus()` гэх мэт үйлдэл дуудах",
    "`useRef` утга өөрчлөгдөхөд дахин render хийдэггүйг ойлгох",
  ],
  blocks: [
    {
      kind: "theory",
      title: "ref — DOM руу шууд хандах хаалга",
      html: `<p>Заримдаа элемент рүү шууд хандах хэрэгтэй болдог: input-д <code>focus()</code> хийх, хэмжээг нь уншихад гэх мэт. Үүнд <strong><code>useRef</code></strong> хэрэгтэй.</p>
             <ul>
               <li><code>const inputRef = React.useRef(null);</code> — ref объект үүсгэнэ.</li>
               <li>Элементэд <code>ref: inputRef</code> prop-оор холбоно: <code>h("input", { ref: inputRef })</code>.</li>
               <li>Render хийгдсэний дараа <code>inputRef.current</code> нь жинхэнэ DOM элемент болно.</li>
               <li><code>ref.current</code>-ийг өөрчлөхөд компонент <strong>дахин render хийгдэхгүй</strong> (state-ээс ялгаа).</li>
             </ul>
             <p>Дүрэм: render хийх үед биш, <em>event handler</em> эсвэл <code>useEffect</code> дотор <code>ref.current</code>-ийг ашигла.</p>`,
    },
    {
      kind: "playground",
      title: "Товч дарахад input-д focus хийх",
      height: 280,
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\ninput { padding: 6px; margin-right: 8px; }`,
        js: `const h = React.createElement;

function App() {
  const inputRef = React.useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return h("div", null,
    h("input", { ref: inputRef, placeholder: "Энд бич..." }),
    h("button", { onClick: focusInput }, "Focus хий")
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
    },
    {
      kind: "exercise",
      title: "Input-г цэвэрлээд focus хий",
      prompt: "`Цэвэрлэх` товч дарахад input-ийн утгыг хоосолж (`value = \"\"`), дараа нь `focus()` хий. `useRef`-ийг ашигла.",
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\ninput { padding: 6px; margin-right: 8px; }`,
        js: `const h = React.createElement;

function App() {
  // Энд useRef үүсгэ

  function clearInput() {
    // Энд утгыг хоосолж, focus хий
  }

  return h("div", null,
    h("input", { placeholder: "Энд бич..." }),
    h("button", { onClick: clearInput }, "Цэвэрлэх")
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
      hint: "`const ref = React.useRef(null);` үүсгээд input-д `ref: ref` өг. Handler дотор `ref.current.value = \"\"; ref.current.focus();` бич.",
      solution: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\ninput { padding: 6px; margin-right: 8px; }`,
        js: `const h = React.createElement;

function App() {
  const ref = React.useRef(null);

  function clearInput() {
    ref.current.value = "";
    ref.current.focus();
  }

  return h("div", null,
    h("input", { ref: ref, placeholder: "Энд бич..." }),
    h("button", { onClick: clearInput }, "Цэвэрлэх")
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "useRef\\s*\\(", message: "`React.useRef(null)` ашигла." },
          { type: "jsIncludes", pattern: "ref\\s*:", message: "Input-д `ref` prop өг." },
          { type: "jsIncludes", pattern: "\\.current\\.value\\s*=", message: "`ref.current.value = \"\"` гэж утгыг хоосол." },
          { type: "jsIncludes", pattern: "\\.current\\.focus\\s*\\(", message: "`ref.current.focus()` дуудаж focus хий." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "`ref.current`-ийг өөрчлөхөд юу болох вэ?",
      options: [
        "Компонент дахин render хийгдэхгүй",
        "Компонент заавал дахин render хийгдэнэ",
        "Алдаа заана",
        "State автоматаар шинэчлэгдэнэ",
      ],
      answer: 0,
      explain: "`useRef` нь state-ээс ялгаатай — `current` өөрчлөгдөхөд React дахин render хийдэггүй.",
    },
    {
      kind: "quiz",
      question: "Элементийн DOM node `ref.current`-д хэзээ орох вэ?",
      options: [
        "Render хийгдэж DOM-д орсны дараа",
        "Компонент зарлах үед шууд",
        "Зөвхөн CSS ачаалсны дараа",
        "Хэзээ ч орохгүй",
      ],
      answer: 0,
      explain: "Эхэндээ `null` байх ба mount хийгдсэний дараа жинхэнэ DOM элемент болно, тиймээс event handler эсвэл useEffect дотор ашиглана.",
    },
  ],
};

export const REACT_CUSTOM_HOOK: Lesson = {
  id: "react-custom-hook",
  module: 9,
  title: "React — Энгийн custom hook",
  objectives: [
    "Давтагдсан state логикийг `use...` нэртэй функц болгон салгах",
    "Custom hook-ээс утга ба функц буцаах",
    "Нэг hook-ийг олон компонентод бие даасан state-тэй ашиглах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Custom hook — логикоо дахин ашиглах",
      html: `<p>Хоёр компонент ижил state логик хэрэглэж байвал хуулж бичихийн оронд <strong>custom hook</strong> болгон салгаж болно.</p>
             <ul>
               <li>Custom hook бол нэр нь <code>use</code>-ээр эхэлдэг энгийн функц: <code>function useCounter() { ... }</code>.</li>
               <li>Дотроо <code>React.useState</code>, <code>React.useEffect</code> гэх мэт hook-уудыг дуудаж болно.</li>
               <li>Утга, функцээ массив эсвэл объектоор буцаана: <code>return { count, increment };</code></li>
               <li>Hook-ийг дуудах бүрт <strong>өөрийн state</strong> үүснэ — state хуваалцахгүй, зөвхөн логик хуваалцана.</li>
             </ul>
             <p>Дүрэм: hook-ийг зөвхөн компонент эсвэл өөр hook-ийн дээд түвшинд дууд (if/for дотор биш).</p>`,
    },
    {
      kind: "playground",
      title: "useCounter hook",
      height: 300,
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nbutton { margin-right: 6px; padding: 4px 10px; }\n.box { margin-bottom: 10px; }`,
        js: `const h = React.createElement;

function useCounter(start) {
  const [count, setCount] = React.useState(start);
  const increment = () => setCount(count + 1);
  const reset = () => setCount(start);
  return { count, increment, reset };
}

function Counter(props) {
  const c = useCounter(props.start);
  return h("div", { className: "box" },
    h("span", null, props.label + ": " + c.count + " "),
    h("button", { onClick: c.increment }, "+1"),
    h("button", { onClick: c.reset }, "Reset")
  );
}

function App() {
  return h("div", null,
    h(Counter, { label: "A", start: 0 }),
    h(Counter, { label: "B", start: 10 })
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
    },
    {
      kind: "exercise",
      title: "useToggle hook бич",
      prompt: "`useToggle` нэртэй custom hook бич: `React.useState(false)` ашиглан `on` утга болон `toggle` функц буцаа. Дараа нь `App` дотор ашигла.",
      starter: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nbutton { padding: 6px 12px; }`,
        js: `const h = React.createElement;

// Энд useToggle hook бич

function App() {
  // const t = useToggle();
  return h("div", null,
    h("button", null, "Асаах/Унтраах"),
    h("p", null, "Төлөв: ?")
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
      hint: "`function useToggle() { const [on, setOn] = React.useState(false); const toggle = () => setOn(!on); return { on, toggle }; }` — дараа нь `const t = useToggle();` гэж дууд.",
      solution: {
        html: REACT_CDN + `<div id="root"></div>`,
        css: `body { font-family: system-ui; padding: 16px; }\nbutton { padding: 6px 12px; }`,
        js: `const h = React.createElement;

function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);
  return { on, toggle };
}

function App() {
  const t = useToggle();
  return h("div", null,
    h("button", { onClick: t.toggle }, "Асаах/Унтраах"),
    h("p", null, "Төлөв: " + (t.on ? "Асаалттай" : "Унтарсан"))
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));`,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "jsIncludes", pattern: "function\\s+useToggle\\s*\\(", message: "`function useToggle()` гэж hook зарла." },
          { type: "jsIncludes", pattern: "useState\\s*\\(\\s*false\\s*\\)", message: "Hook дотор `React.useState(false)` ашигла." },
          { type: "jsIncludes", pattern: "return\\s*[{\\[]", message: "Hook-оос `on` ба `toggle`-ийг буцаа." },
          { type: "jsIncludes", pattern: "=\\s*useToggle\\s*\\(", message: "`App` дотор `useToggle()`-ийг дууд." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Custom hook-ийн нэр яаж эхлэх ёстой вэ?",
      options: ["`use`-ээр", "`hook`-оор", "Том үсгээр", "Ямар ч нэр болно"],
      answer: 0,
      explain: "Нэр нь `use`-ээр эхэлснээр React болон linter үүнийг hook гэж таньж, hook-ийн дүрмийг шалгадаг.",
    },
    {
      kind: "quiz",
      question: "Нэг custom hook-ийг хоёр компонент дуудвал state яах вэ?",
      options: [
        "Компонент бүр өөрийн тусдаа state-тэй болно",
        "Хоёулаа нэг state хуваалцана",
        "Хоёр дахь нь алдаа заана",
        "State үүсэхгүй",
      ],
      answer: 0,
      explain: "Custom hook нь зөвхөн логикийг хуваалцдаг. Дуудах бүрт шинэ, бие даасан state үүснэ.",
    },
  ],
};
