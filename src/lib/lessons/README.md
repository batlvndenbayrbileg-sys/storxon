# Lessons — JSON бүтэц

Хичээл бол **зөвхөн өгөгдөл** (блокуудын жагсаалт). Код биш тул instructor-ийн
бичсэн агуулга апп-ын контекстэд хэзээ ч ажиллахгүй — жишээ код нь зөвхөн sandbox
iframe (`Playground`) дотор ажиллана.

Төрлүүд: [`types.ts`](./types.ts). Баталгаажуулагч: [`fromJson.ts`](./fromJson.ts)
(`lessonFromJson(unknown): Lesson` — буруу бол тодорхой алдаатай `throw` хийнэ,
тиймээс буруу контент build дээр илэрнэ).

## Lesson

| талбар | төрөл | тайлбар |
|---|---|---|
| `id` | string | тогтвортой slug; URL (`/playground/[id]`) ба явцын түлхүүр |
| `module` | number | модулийн дугаар (sidebar бүлэглэнэ) |
| `title` | string | хичээлийн нэр |
| `objectives` | string[] | суралцах зорилгууд |
| `blocks` | Block[] | ≥1 блок, дарааллаар нь харуулна |

## Блок (`kind`)

- `theory` — `{ title?, html }` Итгэмжлэгдсэн HTML тайлбар. (Дараа нь DB-ээс ирвэл заавал sanitize хийх.)
- `code` — `{ title?, lang: "html"|"css"|"js", code }` Зөвхөн унших жишээ.
- `playground` — `{ title?, height?, starter: {html, css, js} }` Засах боломжтой + live preview.
- `exercise` — `{ title, prompt, starter, hint?, solution?, check }` `check` давах хүртэл дуусахгүй.
- `film` — `{ title, description?, href?, label? }` Бичлэг/лекцийн карт; `href` нь дотоод зам (default `/learn`, нэвтрэлт + төлбөрийн шалгалттай player). `private/course.html`-ийн агуулгыг хуулахгүй, зөвхөн холбоно.
- `quiz` — `{ title?, question, options: string[], answer: number, explain? }` `answer` нь `options`-ийн 0-ээс эхэлсэн индекс.

## Exercise `check`

`pattern` нь RegExp эх (JSON-д `\` давхар: `"\\s*"`), `flags` заавал биш.

- `{ "type": "htmlIncludes" | "cssIncludes" | "jsIncludes", "pattern", "flags?", "message" }`
- `{ "type": "allOf", "checks": [ ...дээрхүүд ] }` — бүгд давах ёстой

Exercise-ийн нэмэлт талбар: `hint` (эхний зөвлөгөө), `hint2` (илүү тодорхой 2-р зөвлөгөө),
`solution` (`{html, css, js}` — бүрэн хариулт).

## Quiz — олон асуулт

Нэг quiz блок дотор `more: [{ question, options, answer, explain? }]` массиваар нэмэлт
асуулт тавьж болно (үндсэн асуулт дээр залгагдана).

## Жишээ

[`json/html-headings.json`](./json/html-headings.json) — бүрэн жишээ. Ачаалах:

```ts
import { lessonFromJson } from "@/lib/lessons/fromJson";
import raw from "@/lib/lessons/json/html-headings.json";

export const HTML_HEADINGS = lessonFromJson(raw);
```

Бүх блокийн төрлийг харуулсан 3 нэмэлт жишээ (тусдаа, `LESSONS`-д ачаалагдаагүй):

- [`json/example-css-color.json`](./json/example-css-color.json) — `code`, `allOf` шалгалт, `hint2`, `solution`
- [`json/example-js-variables.json`](./json/example-js-variables.json) — `playground`, `jsIncludes`, `quiz` + `more`
- [`json/example-html-links.json`](./json/example-html-links.json) — `film` блок, `htmlIncludes` + `flags`

Эдгээр нь `lessons.test.ts`-д `lessonFromJson`-оор автоматаар баталгаажна.

## Зохиогчийн checklist

1. `id` өвөрмөц, зөвхөн жижиг латин/тоо/зураас (хичээл бүрд тогтвортой).
2. JSON-д `\` давхар бичнэ (`"\\s*"`), мөр таслалт `\n`, хашилт `\"`.
3. Дасгалд `check` заавал байх ба сурагчийн **буруу** хариултыг зөв тэмдэглэхгүй эсэхийг Playground дээр туршина.
4. `film.href` зөвхөн `/`-ээр эхэлсэн дотоод зам (гадны холбоос зөвшөөрөгдөхгүй).
5. `npm test` ба `next build` давсны дараа л нэм.

Шинэ хичээл нэмэх: `json/<id>.json` үүсгээд `data.ts`-д `lessonFromJson`-оор ачаалж
`LESSONS` массивт нэм.
