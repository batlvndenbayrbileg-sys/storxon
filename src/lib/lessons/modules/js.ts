import type { Lesson } from "@/lib/lessons/types";

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
