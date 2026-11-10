# Agent backlog — Storxon

Автомат сайжруулалтын дараалал. Cloud агент нэг удаад **ганц** тэмдэглэгдээгүй
`- [ ]` ажлыг авч, build амжилттай бол **шууд main-д push** хийнэ (PR-гүй).

## Build gate (push-аас өмнө заавал)
`storxon/storxon` дотроос ажиллуул:

```
SUPABASE_URL=x SUPABASE_SERVICE_ROLE_KEY=x NEXT_PUBLIC_SUPABASE_URL=https://x.supabase.co NEXT_PUBLIC_SUPABASE_ANON_KEY=x BOTXON_API_KEY=x BOTXON_WEBHOOK_SECRET=x npx next build
```

Зөвхөн exit 0 бол push хий. Next 16 — код бичихээс өмнө `node_modules/next/dist/docs/`-г хар (AGENTS.md).

## Дүрэм
- Нэг удаад ганц ажил; жижиг, фокустай, буцаах боломжтой, брэндэд нийцсэн.
- **Хэзээ ч бүү гар хүр:** төлбөр (checkout/botxon), нэвтрэлт (login/signup/account/forgot,
  lib/supabase, api/me, access.ts), env, Vercel тохиргоо, `supabase/schema.sql`.
- Зөвхөн доорх `- [ ]` ажлаас сонго. `## 🔒` хэсгийн зүйлсийг (checkbox-гүй) **битгий хий** —
  тэдгээр нь DB/auth/security хөнддөг, хүн хянана.

---

# 🎯 Sprint: Интерактив код сурах платформ

Storxon бол видео LMS биш — сурагч **унших → код засах → ажиллуулах → үр дүн харах →
дасгал хийх** платформ. Доорх ажлууд энэ туршлагыг барьна.

## Суурь (хийгдсэн, хянагдсан)
- [x] Бүтэцлэгдсэн хичээлийн загвар: `src/lib/lessons/types.ts` (блок: theory/code/playground/exercise/quiz, deterministic `runCheck`)
- [x] Аюулгүй sandbox playground: `src/components/learn/Playground.tsx` — `iframe sandbox="allow-scripts"` (same-origin ҮГҮЙ → null origin, апп-ын cookie/session/API-д хүрэхгүй), console relay postMessage-ээр
- [x] Хичээл үзүүлэгч: `src/components/learn/LessonView.tsx` — бүх блокийг рендерлэх, дасгалын шалгалт (товч дарсан дангаараа дуусгадаггүй), quiz
- [x] Жишээ хичээл + демо: `src/lib/lessons/data.ts`, `src/app/playground/page.tsx`

## P1 — интерактив туршлага (frontend, агент хийнэ)
- [x] LessonView-д зүүн sidebar нэм: модуль ба хичээлийн жагсаалт, идэвхтэй хичээл, дууссаны тэмдэг (localStorage `sx-learn`-ээс)
- [x] Хичээл хооронд Өмнөх/Дараах навигаци ба хичээлийн маршрут (`src/app/playground/[id]`, динамик params нь Promise — Next 16)
- [x] Playground editor-т мөрийн дугаар ба табаар шилжихэд идэвхтэй табыг тодруулах (нэмэлт dependency-гүй)
- [x] CSS-ийн үндэс хичээл нэм (`data.ts`): theory + playground + 1 дасгал (`cssIncludes` шалгалт) + quiz
- [x] JavaScript-ийн үндэс хичээл нэм (`data.ts`): theory + playground + 1 дасгал (`jsIncludes`) + quiz
- [x] `allOf` олон шалгууртай 2 дасгал нэм (жишээ: h1 ба p хоёуланг шаардах)
- [x] Mobile: editor/preview-г явцуу дэлгэцэнд босоо давхарлаж, fullscreen-ийг гар утсанд тохируулах
- [x] Хичээлийн ерөнхий явцын хураангуй (N/M хичээл дууссан) `LessonView`-ийн толгойд ба демо хуудсанд
- [x] Theory блокт зураг/диаграмм дэмжих (next/image, public/kit ашиглах), жишээ хичээлд нэг зураг нэм
- [x] Playground-д "Хуулах" (copy code) ба алдаа гарвал console-ийг улаанаар онцлох сайжруулалт
- [x] a11y: editor textarea-д label, товчдод aria-label, фокусын харагдах байдал

## P2 — багшийн багаж ба контент
- [x] Хичээлийг цэвэр JSON-оор тодорхойлох бүтцийг баримтжуулах (`src/lib/lessons/README.md`) + нэг хичээлийг JSON-оос ачаалах жишээ
- [x] Одоогийн `private/course.html`-ийг устгалгүй "film/lecture" блок болгон LessonView-оос холбох (контент хадгалагдана)
- [x] 4-5 модулийн араг ясыг (гарчиг, зорилго, хоосон блокууд) `data.ts`-д бэлдэх
- [x] React playground (эхлэлийн хувилбар): зөвхөн тодорхой заавартай, sandbox дотор

## 🔒 Шалгалт шаардсан — АВТОМАТ АГЕНТ БҮҮ ХИЙ (хүн хянана)
Эдгээр auth/DB/schema/security хөнддөг тул checkbox-гүй:
- `supabase/schema.sql`: `lesson_progress` (user_id, lesson_id, status, completed_at) ба
  `workspaces` (user_id, lesson_id, code jsonb, updated_at) хүснэгт + RLS (зөвхөн эзэн нь унших/бичих)
- Server/Supabase: сурагчийн код ба явцыг хадгалах (autosave debounce, сүлжээ тасрахад хамгаалах)
- `/learn` gating-д интерактив хичээлийг нэгтгэх (enrollment шалгасан хэвээр)
- Sandbox-ийн аюулгүй байдлыг эцэслэн penetration review хийх, баримтжуулах
- Instructor authoring UI (DB-backed), Artifact import workflow

---

# Backlog — landing polish (доод зэрэглэл)
- [x] Landing мобайл дээр хөвөгч "Бүртгүүлэх" CTA товч (доод буланд)
- [x] Landing-д "Дээш" (back-to-top) товч, гүйлгэхэд гарч ирдэг
- [x] FAQ-г нэг дор ганц нь нээгддэг accordion болгох
- [x] Хүртээмж: зураг/товчны alt, aria-label нягтлах; "skip to content" холбоос
- [x] /dashboard, /admin ачаалж байх үед skeleton харуулах
- [x] OpenGraph/Twitter share зургийг metadata-д тодорхой заах (hero-banner.webp)
- [x] Landing секц хоорондын зай/үсгийн шатлалыг жигдлэх polish
- [x] README-д орчны хувьсагч, deploy, админ тохиргооны алхмыг цэгцлэх

---

# 🚀 Sprint 2 — 7 хоногийн гүнзгийрүүлэлт (tech-lead roadmap)

Зорилго: Storxon-г **жинхэнэ бүрэн курс** болгох — HTML/CSS/JS/React-ийн гүнзгий
контент, олон дасгал, хүчирхэг playground, суралцах урам зориг (gamification),
хурд/SEO/хүртээмж. Бүгд frontend/контент, нэг удаад ганц ажил, `next build` exit 0
бол шууд main-д push. **Хориотой бүс хэвээр:** төлбөр, нэвтрэлт, env, Vercel,
`supabase/schema.sql`, `src/lib/lessons/progress.ts`-ийн **бичих** зам (унших зүгээр).
Шинэ хичээл нэмэхдээ `src/lib/lessons/data.ts` эсвэл JSON (`lessonFromJson`) ашигла;
React/JS/DOM код зөвхөн sandbox iframe дотор, React нь `createElement`-only.

## A. Контент — модулиудыг бодит хичээлээр дүүргэх (хамгийн өндөр ач холбогдол)
- [x] HTML: "Жагсаалт ба холбоос" хичээл (`ul/ol/li`, `a href`) — theory+playground+дасгал(`htmlIncludes`)+quiz
- [x] HTML: "Зураг ба медиа" хичээл (`img` + `alt`, `figure/figcaption`) — бүрэн блокуудтай
- [x] HTML: "Хүснэгт" хичээл (`table/tr/td/th`) — дасгал + quiz
- [x] HTML: "Форм ба оролт" хичээл (`form/input/label/button`) — `allOf` дасгал
- [x] HTML: "Семантик тэгүүд" хичээл (`header/nav/main/footer/section`)
- [x] CSS: "Өнгө ба фон" хичээл (`color`, `background`, hex/rgb)
- [x] CSS: "Box model" хичээл (`margin/padding/border`) — playground-д тод жишээ
- [x] CSS: "Текст ба фонт" хичээл (`font-size/weight`, `text-align`)
- [x] CSS: "Flexbox зэрэгцүүлэлт" хичээл (`display:flex`, `justify/align`) — `allOf` дасгал
- [x] CSS: "Grid үндэс" хичээл (`display:grid`, `grid-template`)
- [x] CSS: "Responsive ба @media" хичээл (гар утас/дэлгэц)
- [x] CSS: "Hover ба transition" хичээл (энгийн анимэйшн)
- [x] JS: "Хувьсагч ба төрөл" хичээл (`let/const`, string/number/boolean)
- [x] JS: "Нөхцөл (if/else)" хичээл — `jsIncludes` дасгал
- [x] JS: "Давталт (for/while)" хичээл — дасгал + quiz
- [x] JS: "Функц" хичээл (зарлах, дуудах, параметр, return)
- [x] JS: "Массив" хичээл (push, length, индекс) — `allOf` дасгал
- [x] JS: "Объект" хичээл (key/value, цэгийн нотаци)
- [x] JS: "DOM унших/бичих" хичээл (`querySelector`, `textContent`) — sandbox дотор
- [x] JS: "Үйл явдал (events)" хичээл (`addEventListener`, onclick) — sandbox дотор
- [x] React: "Props дамжуулах" хичээл (`createElement`-only, sandbox)
- [x] React: "useState төлөв" хичээл (`createElement`-only, sandbox)
- [x] React: "Жагсаалт render (map)" хичээл (`createElement`-only)
- [x] MODULE_SKELETONS-ийн модуль 4–8-ыг бодит гарчиг/зорилго/эхний theory-оор дүүргэж `LESSONS`-д холбох

## B. Дасгал ба үнэлгээ
- [x] Одоо 1 дасгалтай хичээл бүрт 2 дахь дасгал нэмэх (гүнзгийрүүлсэн)
- [x] Дасгалын "Сануулга"-г 2 түвшний progressive hint болгох (нэг нэгээр нээгдэх)
- [x] `runCheck` буруу үед яагаад болохыг тодорхой, зөөлөн мессежээр заах (бүх төрөлд)
- [x] Quiz-д нэг блокт 2–3 асуулт дэмжих, эсвэл олон quiz блокийг цувралаар
- [x] Quiz хариулсны дараа `explain` тайлбарыг үргэлж харуулж, зөв/бурууг өнгөөр ялгах
- [x] "Код шалгах"-ын өмнө console-д алдаа байвал дасгалыг амжилтгүй гэж үзэх логик
- [x] Хичээлийн төгсгөлд бүх дасгал/quiz-ийн дүгнэлт карт (хэдийг зөв хийсэн)

## C. Playground хөдөлгүүр
- [x] "Эхлэлд буцаах" (reset to starter) товч — одоогийн кодыг starter-аар солино
- [x] `Ctrl/Cmd+Enter`-ээр кодыг ажиллуулах keyboard shortcut
- [x] Автомат live preview сонголт (debounced), toggle-тэй — анхдагчаар унтраалттай
- [x] Console relay-д объект/массивыг гоё форматлаж хэвлэх (JSON.stringify indent)
- [x] Editor-т `Tab` дарахад 2 зай оруулах, урт мөрөнд хэвтээ гүйлт
- [x] Кодыг бие даасан `.html` файл болгон татаж авах товч
- [x] Preview-г шинэ табд нээх товч (sandbox blob URL)
- [x] Editor-ийн фонтыг томруулах/жижигрүүлэх (A+/A−) товч, localStorage-д сонголт хадгалах
- [x] Код жишээ (`code` блок)-т энгийн syntax highlighting (гадны dependency-гүй, token split)

## D. Суралцах туршлага / UX
- [x] Sidebar-т хичээл хайх/шүүх input (гарчигаар)
- [x] Хичээл бүрт "~X минут" уншиж/хийх хугацааны тэмдэг (блокоос тооцоол)
- [x] Breadcrumb навигаци (Модуль → Хичээл) LessonView-ийн толгойд
- [x] Гар утсанд sidebar-г хаашаа тийш гарч ирдэг drawer болгох (overlay + Esc)
- [x] Хичээлийн доод талд "Дараагийн хичээл" preview карт (гарчиг+зорилго)
- [x] Хичээл хэсгийн гарчигт тухайн модулийн нийт явцын жижиг progress bar
- [x] prefers-color-scheme-д тохирсон dark горим хичээл/playground-д (хэрэв theme байхгүй бол CSS-ээр)
- [x] "Дээш/Эхлэл рүү" товч урт хичээлд
- [x] Код хуулах/ажиллуулахад жижиг "хийгдлээ" toast (гар утсанд ээлтэй)

## E. Урам зориг / gamification (ЗӨВХӨН localStorage, DB БИШ)
- [x] Өдрийн дараалсан streak тоолуур (шинэ `sx-streak` localStorage key) — sidebar-т badge
- [x] Хичээл дуусгах бүрт XP/оноо, нийт оноог харуулах (`sx-xp` localStorage, явцыг унших)
- [x] Модуль бүрэн дуусгахад баяр хүргэсэн тэмдэг + confetti анимэйшн (reduced-motion хүндэтгэх)
- [x] Нийт явцыг дугуй progress ring-ээр толгойд харуулах
- [x] "Өнөөдрийн зорилго: 1 хичээл" маягийн жижиг идэвхжүүлэгч самбар

## F. Гүйцэтгэл · SEO · хүртээмж
- [x] Хичээл бүрт тусдаа `metadata` (title/description) — `/playground/[id]` дээр
- [x] Playground iframe-г viewport-д ороход lazy ачаалах (IntersectionObserver)
- [x] Хичээлийн том контентыг `dynamic import`-оор код хуваах
- [x] Бүх зурагт тодорхой `width/height` (layout shift/CLS багасгах)
- [x] `prefers-reduced-motion`-г бүх анимэйшнд хүндэтгэх
- [x] Бүх интерактив элементэд keyboard навигаци + modal/drawer-т focus trap
- [x] Өнгөний контраст (WCAG AA) нягталж засах
- [x] Learn/playground хуудсанд JSON-LD (Course/LearningResource) structured data

## G. Код чанар · баримт · тест
- [x] `runCheck`, `lessonFromJson`-д unit test нэмэх (vitest тохируулах; build-д нөлөөлөхгүй)
- [x] Хичээл зохиогчийн гарын авлага (`README.md`)-г өргөтгөх + 3 жишээ JSON хичээл
- [x] `types.ts`, `progress.ts` (унших хэсэг)-т JSDoc тайлбар нэмэх
- [x] LessonView/Playground-ийн урт хэсгийг жижиг дэд компонент болгон refactor (зан төлөв өөрчлөхгүй)
- [x] Хичээлийн өгөгдлийг (data.ts) модуль тус бүрээр файл болгон задлах, дахин экспортлох

## H. Landing / marketing (доод зэрэглэл)
- [x] Landing дээр "Хэрхэн ажилладаг" секц — жижиг амьд playground preview
- [x] Сурагчдын жишээ ажлын галерей секц (статик)
- [x] FAQ-д интерактив хичээлийн талаарх 2–3 асуулт нэмэх
- [x] Footer-ийг цэгцлэх (холбоос, нийгмийн сүлжээ, зохиогчийн эрх)
- [x] 404/not-found хуудсыг брэндэд нийцүүлэн сайжруулах
- [x] Landing-д "Яагаад Storxon" давуу талын секц (3–4 карт)

---

# 🧪 Sprint 3 — Дэвшилтэт сэдэв, төсөл ба гэрчилгээ

Storxon-г **анхан → дунд → төсөл бүтээх** түвшинд хүргэнэ: дэвшилтэт JS/CSS/React,
олон алхамт удирдамжтай төслүүд, хэвлэх гэрчилгээ, платформын 2-р шатны боломжууд.
Дүрэм өөрчлөгдөөгүй: нэг удаад ганц ажил, `next build` exit 0 бол шууд main-д push.
**Хориотой бүс:** төлбөр, нэвтрэлт, env, Vercel, `supabase/schema.sql`,
`src/lib/lessons/progress.ts`-ийн **бичих** зам (унших зүгээр). Шинэ хичээл `data.ts`/JSON-оор;
код зөвхөн sandbox iframe дотор, React нь `createElement`-only; аливаа хадгалалт зөвхөн
**localStorage** (DB биш, progress.ts-ийн DB зам руу бичихгүй).

## A. Дэвшилтэт JavaScript
- [x] JS: ES6 — template literal, arrow function, destructuring хичээл
- [x] JS: Хувьсагчийн scope ба closure хичээл
- [x] JS: map/filter/reduce гүнзгий хичээл (`allOf` дасгал)
- [x] JS: Promise ба async/await хичээл (sandbox дотор setTimeout жишээ)
- [x] JS: fetch ба JSON хичээл (CORS-той нийтийн API эсвэл mock)
- [x] JS: Алдаа барих (try/catch/finally) хичээл
- [x] JS: localStorage-той ажиллах хичээл (sandbox дотор)
- [x] JS: setTimeout/setInterval ба таймер хичээл

## B. Дэвшилтэт CSS
- [x] CSS: Position (relative/absolute/fixed/sticky) хичээл
- [x] CSS: Transform ба @keyframes анимэйшн хичээл
- [x] CSS: Custom properties (хувьсагч) хичээл
- [x] CSS: Pseudo-class/element (:hover, ::before/::after) хичээл
- [x] CSS: Gradient ба shadow хичээл
- [x] CSS: Grid дэвшилтэт (areas, auto-fit/minmax) хичээл

## C. Дэвшилтэт React (createElement-only, sandbox)
- [x] React: useEffect ба амьдралын мөчлөг хичээл
- [x] React: Форм ба controlled input хичээл
- [x] React: Нөхцөлт render ба жагсаалтын `key` хичээл
- [x] React: Компонент задлах ба дахин ашиглах хичээл
- [x] React: useRef ба DOM хандалт хичээл
- [x] React: Энгийн custom hook хичээл

## D. Удирдамжтай төслүүд (олон алхамт, бодит бүтээл)
- [x] Төсөл: "Миний танилцуулга хуудас" (HTML+CSS, алхам алхмаар)
- [x] Төсөл: "Тооны машин" (JS — UI + логик)
- [x] Төсөл: "To-do жагсаалт" (JS + localStorage)
- [x] Төсөл: "Тоглоом: асуулт хариулт (quiz)" (JS)
- [x] Төсөл: "Цаг/таймер апп" (JS)
- [x] Төсөл: "Жижиг React тоолуур/тоглуулагч" (createElement)
- [x] Төсөл бүрийн төгсгөлд "дараагийн алхам" өргөтгөх санаанууд

## E. Шинэ платформ боломжууд (UI / зөвхөн localStorage)
- [x] Хэвлэх боломжтой "Гэрчилгээ" (нэр оруулах, localStorage, `@media print`)
- [x] Хичээл хадгалах (bookmark) — sidebar-т одоор тэмдэглэх (`sx-fav`)
- [x] "Үргэлжлүүлэх" — сүүлд үзсэн хичээл рүү үсрэх товч (`sx-last`)
- [x] Бүх явцыг JSON export/import (зөвхөн localStorage, DB руу бичихгүй)
- [x] Кодыг URL-д encode хийж хуваалцах холбоос (query param, backend-гүй)
- [x] Хичээлийн хүндийн зэрэг badge (хялбар/дунд/хүнд)
- [x] Курсын дуусгалтын хувь + "X хичээл үлдлээ" самбар
- [x] Keyboard shortcut тусламжийн панел (`?` товчоор нээх)
- [x] Хэвлэхэд ээлтэй хичээлийн харагдац (`@media print`)
- [x] Бүрэн dark/light toggle (гараар, `sx-theme` localStorage)

## F. Playground хөдөлгүүр — 2-р шат
- [x] Кодыг цэгцлэх (format/indent) энгийн товч (dependency-гүй)
- [x] Алдааны мөрийг editor-т улаанаар тодруулах
- [ ] Preview хэмжээг responsive (утас/таблет/дэлгэц) харах toggle
- [ ] Console-д `console.table` энгийн дэмжлэг
- [ ] Зураг/asset-г data URL-ээр нэмэх туршилт
- [ ] Хадгалсан ноорог байвал "сэргээх" дохио (зөвхөн localStorage draft)

## G. Контентын чанар
- [ ] Хичээл бүрт "гол санаа" (summary) блок
- [ ] Нэр томьёоны толь (glossary) хуудас
- [ ] Хичээлүүдэд "түгээмэл алдаа/зөвлөмж" блок
- [ ] Дасгалын шийдлийн "яагаад" тайлбар
- [ ] Хичээлийн төгсгөлд "хэр хэцүү байсан" санал асуулга (localStorage)

## H. Perf / SEO / чанар — 2-р шат
- [ ] sitemap-д бүх /playground хичээлийг оруулах
- [ ] Хичээл бүрт OpenGraph зураг (статик эсвэл динамик)
- [ ] Шинэ util-уудад vitest тест нэмж хамралт өсгөх
- [ ] Performance polish (ашиглагдаагүй CSS, font-display: swap)
- [ ] Playground-д алдааны хил (error boundary) нэмэх

## I. Дизайн ба UX polish (хичээл/playground харагдац)
- [ ] prev/next навигацийг sidebar-тай адил **модулийн дарааллаар** явуулах (одоо LESSONS эрэмбээр үсэрдэг)
- [ ] Хичээлийн контентын typography polish: мөр хоорондын зай, гарчгийн шатлал, уншихад тохиромжтой мөрийн өргөн
- [ ] Theory доторх inline код (`<h1>`, `color:` г.м.)-ийг ялгаатай фон/өнгөөр тодруулах
- [ ] Sidebar дахь идэвхтэй хичээлийг илүү тод (зүүн талын өнгөт зураас + фон)
- [ ] Дууссан хичээлийг ✓ ногоон дугуйгаар, үлдсэнийг саарал цагираг тэмдэгээр жигд харуулах
- [ ] Дээд bar-т гар утсанд одоогийн хичээлийн гарчгийг товчоор харуулах (хаана байгаа нь ойлгомжтой)
- [ ] Гар утсанд доод талд тогтмол prev/next bar (том дарагдах товчтой)
- [ ] Exercise/quiz картуудын амжилт/алдааны өнгө, зай, хүрээг илүү тод, нэгдсэн
- [ ] Код блок (`code`)-т хэлний шошго (HTML/CSS/JS) ба өнгөт зураас
- [ ] Playground tab-уудын идэвхтэй/hover төлвийг илүү тод, гулсах animation (reduced-motion хүндэтгэнэ)
- [ ] Хичээл уншсан явцын дээд талын нимгэн scroll progress зураас
- [ ] Хичээлийн толгойд модуль тус бүрийн өнгөт accent (визуал ялгаа)
- [ ] Loading skeleton-уудыг брэндэд нийцүүлэн илүү гоё болгох
- [ ] Focus/hover төлвүүдийг бүх интерактив элементэд нэгдсэн болгох (ring, өнгө)
- [ ] Хоосон/0% явцын үед урам зоригтой "эхлэх" чиглүүлэгч харагдац
