import type { Lesson } from "@/lib/lessons/types";

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

export const CSS_POSITION: Lesson = {
  id: "css-position",
  module: 2,
  title: "CSS — Position (relative/absolute/fixed/sticky)",
  objectives: [
    "position-ы 4 үндсэн утгыг ялгаж ойлгох",
    "relative эцэг дотор absolute элементийг байрлуулах",
    "fixed ба sticky-г ашиглан хөвөгч товч, наалддаг толгой хийх",
  ],
  blocks: [
    {
      kind: "theory",
      title: "position гэж юу вэ",
      html: `<p>Элемент ердийн үед дээрээс доош дарааллаараа урсдаг. <code>position</code> нь үүнийг өөрчилж, элементийг <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>-ээр нарийн байрлуулах боломж олгоно.</p>
             <ul>
               <li><code>relative</code> — өөрийн ердийн байрнаас харьцангуй шилжинэ; мөн доторх <code>absolute</code> элементийн "лавлах цэг" болно</li>
               <li><code>absolute</code> — хамгийн ойрын <code>position</code>-той эцэг элементээс хэмжиж байрлана, урсгалаас гарна</li>
               <li><code>fixed</code> — дэлгэцэнд хөвж, гүйлгэхэд хөдөлдөггүй</li>
               <li><code>sticky</code> — гүйлгэж очоод заасан байранд хүрмэгц наалдана</li>
             </ul>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "css",
      code: `.card {
  position: relative;   /* absolute-ийн лавлах цэг */
}

.badge {
  position: absolute;   /* картын булан руу */
  top: 8px;
  right: 8px;
}

.header {
  position: sticky;     /* гүйлгэхэд дээд талд наалдана */
  top: 0;
}`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 260,
      starter: {
        html: `<div class="card">Карт<span class="badge">Шинэ</span></div>`,
        css: `body { font-family: system-ui; padding: 24px; }\n.card {\n  position: relative;\n  background: #e9d5ff;\n  padding: 32px;\n  border-radius: 12px;\n}\n.badge {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  background: #7c3aed;\n  color: #fff;\n  padding: 2px 10px;\n  border-radius: 999px;\n  font-size: 12px;\n}`,
        js: ``,
      },
    },
    {
      kind: "exercise",
      title: "Тэмдгийг картын буланд байрлуул",
      prompt: "`.card`-д `position: relative`, `.badge`-д `position: absolute` өгч, `top` ба `right` тохируул. Дараа нь Шалгах дээр дар.",
      starter: {
        html: `<div class="card">Карт<span class="badge">Шинэ</span></div>`,
        css: `body { font-family: system-ui; padding: 24px; }\n.card {\n  background: #e9d5ff;\n  padding: 32px;\n  border-radius: 12px;\n  /* Энд position нэм */\n}\n.badge {\n  background: #7c3aed;\n  color: #fff;\n  padding: 2px 10px;\n  border-radius: 999px;\n  /* Энд position, top, right нэм */\n}`,
        js: ``,
      },
      hint: ".card { position: relative; } .badge { position: absolute; top: 8px; right: 8px; }",
      solution: {
        html: `<div class="card">Карт<span class="badge">Шинэ</span></div>`,
        css: `body { font-family: system-ui; padding: 24px; }\n.card {\n  position: relative;\n  background: #e9d5ff;\n  padding: 32px;\n  border-radius: 12px;\n}\n.badge {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  background: #7c3aed;\n  color: #fff;\n  padding: 2px 10px;\n  border-radius: 999px;\n}`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "cssIncludes", pattern: "\\.card\\s*\\{[^}]*position\\s*:\\s*relative", flags: "i", message: "`.card` дотор `position: relative` олдсонгүй." },
          { type: "cssIncludes", pattern: "\\.badge\\s*\\{[^}]*position\\s*:\\s*absolute", flags: "i", message: "`.badge` дотор `position: absolute` олдсонгүй." },
          { type: "cssIncludes", pattern: "\\.badge\\s*\\{[^}]*(top|right)\\s*:", flags: "i", message: "`.badge`-д `top` эсвэл `right` нэмээрэй." },
        ],
      },
    },
    {
      kind: "exercise",
      title: "Наалддаг толгой хий",
      prompt: "`.header`-г гүйлгэхэд дээд талд наалддаг болго: `position: sticky` ба `top: 0`.",
      starter: {
        html: `<div class="header">Толгой</div>\n<p>Контент 1</p><p>Контент 2</p><p>Контент 3</p>`,
        css: `body { font-family: system-ui; padding: 0 16px; }\n.header {\n  background: #7c3aed;\n  color: #fff;\n  padding: 12px;\n}`,
        js: ``,
      },
      hint: ".header { position: sticky; top: 0; }",
      solution: {
        html: `<div class="header">Толгой</div>\n<p>Контент 1</p><p>Контент 2</p><p>Контент 3</p>`,
        css: `body { font-family: system-ui; padding: 0 16px; }\n.header {\n  position: sticky;\n  top: 0;\n  background: #7c3aed;\n  color: #fff;\n  padding: 12px;\n}`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "cssIncludes", pattern: "position\\s*:\\s*sticky", flags: "i", message: "`position: sticky` олдсонгүй." },
          { type: "cssIncludes", pattern: "top\\s*:\\s*0", flags: "i", message: "`top: 0` олдсонгүй." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "`position: absolute` элементийг ямар элементээс хэмжиж байрлуулдаг вэ?",
      options: ["Үргэлж body-оос", "Хамгийн ойрын position-той эцэг элементээс", "Дэлгэцийн төвөөс", "Өмнөх элементээс"],
      answer: 1,
      explain: "absolute нь хамгийн ойрын `position`-той (static биш) өвөг элементээс хэмждэг. Тийм нь байхгүй бол хуудсын эхлэлээс хэмжинэ. Тиймээс эцэгт нь `position: relative` өгдөг.",
    },
  ],
};

export const CSS_TRANSFORM_KEYFRAMES: Lesson = {
  id: "css-transform-keyframes",
  module: 2,
  title: "CSS — Transform ба @keyframes анимэйшн",
  objectives: [
    "transform-оор элементийг шилжүүлэх, эргүүлэх, томруулах",
    "@keyframes-ээр өөрийн анимэйшн зарлах",
    "animation шинж чанаруудыг (duration, iteration-count, timing) тохируулах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "transform ба animation гэж юу вэ",
      html: `<p><code>transform</code> нь элементийн байрлах зайг өөрчлөхгүйгээр дүр төрхийг нь хувиргана. <code>@keyframes</code> нь анимэйшний алхмуудыг тодорхойлж, <code>animation</code> шинж чанараар элемент дээр ажиллуулна.</p>
             <ul>
               <li><code>translate(x, y)</code> — шилжүүлнэ</li>
               <li><code>rotate(45deg)</code> — эргүүлнэ</li>
               <li><code>scale(1.2)</code> — томруулна/жижигрүүлнэ</li>
               <li><code>@keyframes нэр { from {...} to {...} }</code> — анимэйшний алхмууд</li>
               <li><code>animation: нэр 2s infinite</code> — нэр, үргэлжлэх хугацаа, давталт</li>
             </ul>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "css",
      code: `.box {
  transform: rotate(10deg) scale(1.1);
}

@keyframes pulse {
  from { transform: scale(1); }
  to   { transform: scale(1.2); }
}

.dot {
  animation: pulse 1s ease-in-out infinite alternate;
}`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 260,
      starter: {
        html: `<div class="dot"></div>`,
        css: `body { font-family: system-ui; padding: 48px; }\n.dot {\n  width: 60px;\n  height: 60px;\n  background: #7c3aed;\n  border-radius: 50%;\n  animation: pulse 1s ease-in-out infinite alternate;\n}\n@keyframes pulse {\n  from { transform: scale(1); }\n  to { transform: scale(1.4); }\n}`,
        js: ``,
      },
    },
    {
      kind: "exercise",
      title: "Эргэдэг дүрс хий",
      prompt: "`@keyframes spin` зарла (`from` дээр `rotate(0deg)`, `to` дээр `rotate(360deg)`), дараа нь `.loader`-т `animation` өгч үргэлж эргүүл.",
      starter: {
        html: `<div class="loader"></div>`,
        css: `body { font-family: system-ui; padding: 48px; }\n.loader {\n  width: 48px;\n  height: 48px;\n  border: 6px solid #e9d5ff;\n  border-top-color: #7c3aed;\n  border-radius: 50%;\n  /* Энд animation нэм */\n}\n/* Энд @keyframes spin нэм */`,
        js: ``,
      },
      hint: "@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .loader { animation: spin 1s linear infinite; }",
      solution: {
        html: `<div class="loader"></div>`,
        css: `body { font-family: system-ui; padding: 48px; }\n.loader {\n  width: 48px;\n  height: 48px;\n  border: 6px solid #e9d5ff;\n  border-top-color: #7c3aed;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n}\n@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "cssIncludes", pattern: "@keyframes\\s+spin", flags: "i", message: "`@keyframes spin` олдсонгүй." },
          { type: "cssIncludes", pattern: "rotate\\s*\\(", flags: "i", message: "`transform: rotate(...)` ашиглаарай." },
          { type: "cssIncludes", pattern: "\\.loader\\s*\\{[^}]*animation\\s*:[^;}]*spin", flags: "i", message: "`.loader`-т `animation: spin ...` өгөөрэй." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Анимэйшнийг тодорхойлсны дараа элемент дээр ажиллуулахад аль шинж чанарыг ашигладаг вэ?",
      options: ["transition", "animation", "transform-origin", "@media"],
      answer: 1,
      explain: "`@keyframes` нь зөвхөн алхмуудыг зарлана. Тэр нэрийг элемент дээр `animation: нэр хугацаа ...` гэж өгснөөр ажиллана.",
    },
  ],
};

export const CSS_CUSTOM_PROPERTIES: Lesson = {
  id: "css-custom-properties",
  module: 2,
  title: "CSS — Custom properties (хувьсагч)",
  objectives: [
    "`--нэр` хэлбэрээр CSS хувьсагч зарлах",
    "`var(--нэр)`-ээр хувьсагчийг ашиглах, нөөц утга өгөх",
    "`:root`-д нийтлэг өнгө, зайг төвлөрүүлж нэг дор удирдах",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Custom property гэж юу вэ",
      html: `<p><strong>Custom property</strong> (CSS хувьсагч) нь утгыг нэг удаа зарлаад олон газар дахин ашиглах боломж олгоно. Өнгөө нэг газраас солихад бүх хуудас шинэчлэгдэнэ.</p>
             <ul>
               <li><code>--brand: #7c3aed;</code> — хувьсагч зарлана (нэр заавал <code>--</code>-ээр эхэлнэ)</li>
               <li><code>var(--brand)</code> — хувьсагчийн утгыг авна</li>
               <li><code>var(--brand, blue)</code> — хувьсагч байхгүй бол нөөц утга</li>
               <li><code>:root { ... }</code> — бүх хуудсанд хүчинтэй нийтлэг хувьсагч</li>
             </ul>
             <p>Хувьсагч нь өвлөгддөг: элемент дотор дахин зарласан бол зөвхөн тэр элемент ба үр удамд нь өөр утгатай болно.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "css",
      code: `:root {
  --brand: #7c3aed;
  --radius: 12px;
}

.btn {
  background: var(--brand);
  border-radius: var(--radius);
  color: var(--text, white);
}`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 240,
      starter: {
        html: `<button class="btn">Товч</button>\n<button class="btn alt">Өөр товч</button>`,
        css: `:root {\n  --brand: #7c3aed;\n  --radius: 12px;\n}\nbody { font-family: system-ui; padding: 24px; }\n.btn {\n  background: var(--brand);\n  color: white;\n  border: 0;\n  padding: 10px 18px;\n  border-radius: var(--radius);\n}\n.alt { --brand: #0ea5e9; }`,
        js: ``,
      },
    },
    {
      kind: "exercise",
      title: "Өнгөний хувьсагч зарла",
      prompt: "`:root` дотор `--accent` хувьсагч зарла (дурын өнгө), дараа нь `.card`-ийн `border-color` болон `h2`-ийн `color`-д `var(--accent)` ашигла.",
      starter: {
        html: `<div class="card">\n  <h2>Гарчиг</h2>\n  <p>Өнгийг нэг газраас удирдая.</p>\n</div>`,
        css: `body { font-family: system-ui; padding: 24px; }\n/* Энд :root { --accent: ... } нэм */\n.card {\n  border: 3px solid black;\n  padding: 16px;\n  border-radius: 12px;\n}\nh2 { color: black; }`,
        js: ``,
      },
      hint: ":root { --accent: #7c3aed; } .card { border: 3px solid var(--accent); } h2 { color: var(--accent); }",
      solution: {
        html: `<div class="card">\n  <h2>Гарчиг</h2>\n  <p>Өнгийг нэг газраас удирдая.</p>\n</div>`,
        css: `:root { --accent: #7c3aed; }\nbody { font-family: system-ui; padding: 24px; }\n.card {\n  border: 3px solid var(--accent);\n  padding: 16px;\n  border-radius: 12px;\n}\nh2 { color: var(--accent); }`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "cssIncludes", pattern: "--accent\\s*:", flags: "i", message: "`--accent` хувьсагчийг зарлаагүй байна." },
          { type: "cssIncludes", pattern: "var\\(\\s*--accent", flags: "i", message: "`var(--accent)` ашиглаарай." },
          { type: "cssIncludes", pattern: "h2\\s*\\{[^}]*color\\s*:\\s*var\\(\\s*--accent", flags: "i", message: "`h2`-ийн `color`-д `var(--accent)` өгөөрэй." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "Зарласан `--brand` хувьсагчийг хэрхэн ашиглах вэ?",
      options: ["$brand", "var(--brand)", "get(--brand)", "--brand()"],
      answer: 1,
      explain: "CSS хувьсагчийг `var(--нэр)` функцээр уншина. Хоёр дахь аргументаар нөөц утга өгч болно: `var(--brand, blue)`.",
    },
  ],
};

export const CSS_PSEUDO: Lesson = {
  id: "css-pseudo",
  module: 2,
  title: "CSS — Pseudo-class ба pseudo-element (:hover, ::before, ::after)",
  objectives: [
    "`:hover`, `:focus`, `:first-child` зэрэг pseudo-class-аар элементийн төлөвт стиль өгөх",
    "`::before`, `::after`-аар HTML нэмэлгүйгээр чимэглэл нэмэх",
    "`content` шинж чанар заавал хэрэгтэйг ойлгох",
  ],
  blocks: [
    {
      kind: "theory",
      title: "Pseudo-class ба pseudo-element",
      html: `<p><strong>Pseudo-class</strong> (нэг <code>:</code>) нь элемент тодорхой <em>төлөвт</em> байх үед стиль өгнө. <strong>Pseudo-element</strong> (хоёр <code>::</code>) нь элементийн тодорхой <em>хэсэгт</em> стиль өгнө.</p>
             <ul>
               <li><code>:hover</code> — хулгана дээгүүр байх үед</li>
               <li><code>:focus</code> — товч/талбар сонгогдсон үед</li>
               <li><code>:first-child</code>, <code>:last-child</code> — эхний/сүүлийн хүүхэд</li>
               <li><code>::before</code>, <code>::after</code> — элементийн өмнө/ард виртуал агуулга нэмнэ</li>
             </ul>
             <p><code>::before</code>/<code>::after</code> нь <code>content</code> шинж чанаргүйгээр харагдахгүй. Хоосон бол <code>content: "";</code> гэж бичнэ.</p>`,
    },
    {
      kind: "code",
      title: "Жишээ код",
      lang: "css",
      code: `.btn:hover {
  background: #7c3aed;
}

li:first-child {
  font-weight: bold;
}

.title::after {
  content: " ✨";
}`,
    },
    {
      kind: "playground",
      title: "Туршиж үз",
      height: 260,
      starter: {
        html: `<button class="btn">Дээр хулгана аваачаарай</button>\n<ul>\n  <li>Нэг</li>\n  <li>Хоёр</li>\n  <li>Гурав</li>\n</ul>\n<h2 class="title">Гарчиг</h2>`,
        css: `body { font-family: system-ui; padding: 24px; }\n.btn {\n  background: #e5e7eb;\n  border: 0;\n  padding: 10px 18px;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.btn:hover { background: #7c3aed; color: white; }\nli:first-child { font-weight: bold; }\n.title::before { content: "★ "; color: #f59e0b; }`,
        js: ``,
      },
    },
    {
      kind: "exercise",
      title: "Hover ба ::after нэм",
      prompt: "`.link:hover`-д `color: tomato` өг, мөн `.link::after`-д `content: \" →\"` нэм.",
      starter: {
        html: `<a class="link" href="#">Дэлгэрэнгүй</a>`,
        css: `body { font-family: system-ui; padding: 24px; }\n.link {\n  color: #2563eb;\n  text-decoration: none;\n}\n/* Энд .link:hover ба .link::after нэм */`,
        js: ``,
      },
      hint: ".link:hover { color: tomato; } .link::after { content: \" →\"; }",
      solution: {
        html: `<a class="link" href="#">Дэлгэрэнгүй</a>`,
        css: `body { font-family: system-ui; padding: 24px; }\n.link {\n  color: #2563eb;\n  text-decoration: none;\n}\n.link:hover { color: tomato; }\n.link::after { content: " →"; }`,
        js: ``,
      },
      check: {
        type: "allOf",
        checks: [
          { type: "cssIncludes", pattern: "\\.link:hover\\s*\\{[^}]*color\\s*:\\s*tomato", flags: "i", message: "`.link:hover`-д `color: tomato` өгөөрэй." },
          { type: "cssIncludes", pattern: "\\.link::after\\s*\\{[^}]*content\\s*:", flags: "i", message: "`.link::after`-д `content` шинж чанар нэмээрэй." },
        ],
      },
    },
    {
      kind: "quiz",
      question: "`::before` эсвэл `::after` харагдахын тулд заавал юу хэрэгтэй вэ?",
      options: ["display: block", "content шинж чанар", "position: absolute", "z-index"],
      answer: 1,
      explain: "Pseudo-element нь `content` шинж чанаргүй бол үүсэхгүй. Хоосон байлгах бол `content: \"\";` гэж бичнэ.",
    },
  ],
};
