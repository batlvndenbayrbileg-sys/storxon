import type { Lesson } from "@/lib/lessons/types";

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
