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

## Жишээ

[`json/html-headings.json`](./json/html-headings.json) — бүрэн жишээ. Ачаалах:

```ts
import { lessonFromJson } from "@/lib/lessons/fromJson";
import raw from "@/lib/lessons/json/html-headings.json";

export const HTML_HEADINGS = lessonFromJson(raw);
```

Шинэ хичээл нэмэх: `json/<id>.json` үүсгээд `data.ts`-д `lessonFromJson`-оор ачаалж
`LESSONS` массивт нэм.
