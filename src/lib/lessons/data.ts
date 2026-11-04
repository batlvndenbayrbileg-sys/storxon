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

// Example of a lesson authored as plain JSON and validated at load time.
export const HTML_HEADINGS: Lesson = lessonFromJson(htmlHeadingsJson);

export const LESSONS: Lesson[] = [HTML_INTRO, CSS_INTRO, JS_INTRO, HTML_HEADINGS];

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
