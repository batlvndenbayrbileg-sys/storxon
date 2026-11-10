import type { Lesson } from "@/lib/lessons/types";
import { lessonFromJson } from "@/lib/lessons/fromJson";
import htmlHeadingsJson from "@/lib/lessons/json/html-headings.json";

export const HTML_INTRO: Lesson = {
  id: "html-undes",
  module: 1,
  title: "HTML-ийн үндэс — анхны вэб хуудас",
  objectives: [
    "HTML тэг гэж юу болохыг ойлгох",
    "Гарчиг, догол мөр бичиж сурах",
    "Өөрийн кодоо засаад шууд үр дүнг харах",
  ],
  tips: [
    "Тэгээ хаахаа мартдаг: <p> нээсэн бол </p>-ээр заавал хаа.",
    "Гарчгийг зөвхөн том жижиг үсгийн төлөө бүү сонго — <h1>-ийг хуудсанд нэг удаа ашигла.",
    "Кодоо өөрчлөөд «Ажиллуулах» дарахаа бүү март — үр дүн шууд шинэчлэгдэхгүй байж болно.",
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
      hint2: "Яг ингэж бич: <h1>Сайн уу</h1>",
      why: "<h1> нь хуудасны хамгийн чухал гарчгийг тэмдэглэдэг. Хөтөч нээх (<h1>) ба хаах (</h1>) тэгийн хооронд байгаа текстийг том гарчиг болгон үзүүлдэг тул текстээ заавал тэгийн дотор бичдэг.",
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
