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
- [ ] CSS: "Өнгө ба фон" хичээл (`color`, `background`, hex/rgb)
- [ ] CSS: "Box model" хичээл (`margin/padding/border`) — playground-д тод жишээ
- [ ] CSS: "Текст ба фонт" хичээл (`font-size/weight`, `text-align`)
- [ ] CSS: "Flexbox зэрэгцүүлэлт" хичээл (`display:flex`, `justify/align`) — `allOf` дасгал
- [ ] CSS: "Grid үндэс" хичээл (`display:grid`, `grid-template`)
- [ ] CSS: "Responsive ба @media" хичээл (гар утас/дэлгэц)
- [ ] CSS: "Hover ба transition" хичээл (энгийн анимэйшн)
- [ ] JS: "Хувьсагч ба төрөл" хичээл (`let/const`, string/number/boolean)
- [ ] JS: "Нөхцөл (if/else)" хичээл — `jsIncludes` дасгал
- [ ] JS: "Давталт (for/while)" хичээл — дасгал + quiz
- [ ] JS: "Функц" хичээл (зарлах, дуудах, параметр, return)
- [ ] JS: "Массив" хичээл (push, length, индекс) — `allOf` дасгал
- [ ] JS: "Объект" хичээл (key/value, цэгийн нотаци)
- [ ] JS: "DOM унших/бичих" хичээл (`querySelector`, `textContent`) — sandbox дотор
- [ ] JS: "Үйл явдал (events)" хичээл (`addEventListener`, onclick) — sandbox дотор
- [ ] React: "Props дамжуулах" хичээл (`createElement`-only, sandbox)
- [ ] React: "useState төлөв" хичээл (`createElement`-only, sandbox)
- [ ] React: "Жагсаалт render (map)" хичээл (`createElement`-only)
- [ ] MODULE_SKELETONS-ийн модуль 4–8-ыг бодит гарчиг/зорилго/эхний theory-оор дүүргэж `LESSONS`-д холбох

## B. Дасгал ба үнэлгээ
- [ ] Одоо 1 дасгалтай хичээл бүрт 2 дахь дасгал нэмэх (гүнзгийрүүлсэн)
- [ ] Дасгалын "Сануулга"-г 2 түвшний progressive hint болгох (нэг нэгээр нээгдэх)
- [ ] `runCheck` буруу үед яагаад болохыг тодорхой, зөөлөн мессежээр заах (бүх төрөлд)
- [ ] Quiz-д нэг блокт 2–3 асуулт дэмжих, эсвэл олон quiz блокийг цувралаар
- [ ] Quiz хариулсны дараа `explain` тайлбарыг үргэлж харуулж, зөв/бурууг өнгөөр ялгах
- [ ] "Код шалгах"-ын өмнө console-д алдаа байвал дасгалыг амжилтгүй гэж үзэх логик
- [ ] Хичээлийн төгсгөлд бүх дасгал/quiz-ийн дүгнэлт карт (хэдийг зөв хийсэн)

## C. Playground хөдөлгүүр
- [ ] "Эхлэлд буцаах" (reset to starter) товч — одоогийн кодыг starter-аар солино
- [ ] `Ctrl/Cmd+Enter`-ээр кодыг ажиллуулах keyboard shortcut
- [ ] Автомат live preview сонголт (debounced), toggle-тэй — анхдагчаар унтраалттай
- [ ] Console relay-д объект/массивыг гоё форматлаж хэвлэх (JSON.stringify indent)
- [ ] Editor-т `Tab` дарахад 2 зай оруулах, урт мөрөнд хэвтээ гүйлт
- [ ] Кодыг бие даасан `.html` файл болгон татаж авах товч
- [ ] Preview-г шинэ табд нээх товч (sandbox blob URL)
- [ ] Editor-ийн фонтыг томруулах/жижигрүүлэх (A+/A−) товч, localStorage-д сонголт хадгалах
- [ ] Код жишээ (`code` блок)-т энгийн syntax highlighting (гадны dependency-гүй, token split)

## D. Суралцах туршлага / UX
- [ ] Sidebar-т хичээл хайх/шүүх input (гарчигаар)
- [ ] Хичээл бүрт "~X минут" уншиж/хийх хугацааны тэмдэг (блокоос тооцоол)
- [ ] Breadcrumb навигаци (Модуль → Хичээл) LessonView-ийн толгойд
- [ ] Гар утсанд sidebar-г хаашаа тийш гарч ирдэг drawer болгох (overlay + Esc)
- [ ] Хичээлийн доод талд "Дараагийн хичээл" preview карт (гарчиг+зорилго)
- [ ] Хичээл хэсгийн гарчигт тухайн модулийн нийт явцын жижиг progress bar
- [ ] prefers-color-scheme-д тохирсон dark горим хичээл/playground-д (хэрэв theme байхгүй бол CSS-ээр)
- [ ] "Дээш/Эхлэл рүү" товч урт хичээлд
- [ ] Код хуулах/ажиллуулахад жижиг "хийгдлээ" toast (гар утсанд ээлтэй)

## E. Урам зориг / gamification (ЗӨВХӨН localStorage, DB БИШ)
- [ ] Өдрийн дараалсан streak тоолуур (шинэ `sx-streak` localStorage key) — sidebar-т badge
- [ ] Хичээл дуусгах бүрт XP/оноо, нийт оноог харуулах (`sx-xp` localStorage, явцыг унших)
- [ ] Модуль бүрэн дуусгахад баяр хүргэсэн тэмдэг + confetti анимэйшн (reduced-motion хүндэтгэх)
- [ ] Нийт явцыг дугуй progress ring-ээр толгойд харуулах
- [ ] "Өнөөдрийн зорилго: 1 хичээл" маягийн жижиг идэвхжүүлэгч самбар

## F. Гүйцэтгэл · SEO · хүртээмж
- [ ] Хичээл бүрт тусдаа `metadata` (title/description) — `/playground/[id]` дээр
- [ ] Playground iframe-г viewport-д ороход lazy ачаалах (IntersectionObserver)
- [ ] Хичээлийн том контентыг `dynamic import`-оор код хуваах
- [ ] Бүх зурагт тодорхой `width/height` (layout shift/CLS багасгах)
- [ ] `prefers-reduced-motion`-г бүх анимэйшнд хүндэтгэх
- [ ] Бүх интерактив элементэд keyboard навигаци + modal/drawer-т focus trap
- [ ] Өнгөний контраст (WCAG AA) нягталж засах
- [ ] Learn/playground хуудсанд JSON-LD (Course/LearningResource) structured data

## G. Код чанар · баримт · тест
- [ ] `runCheck`, `lessonFromJson`-д unit test нэмэх (vitest тохируулах; build-д нөлөөлөхгүй)
- [ ] Хичээл зохиогчийн гарын авлага (`README.md`)-г өргөтгөх + 3 жишээ JSON хичээл
- [ ] `types.ts`, `progress.ts` (унших хэсэг)-т JSDoc тайлбар нэмэх
- [ ] LessonView/Playground-ийн урт хэсгийг жижиг дэд компонент болгон refactor (зан төлөв өөрчлөхгүй)
- [ ] Хичээлийн өгөгдлийг (data.ts) модуль тус бүрээр файл болгон задлах, дахин экспортлох

## H. Landing / marketing (доод зэрэглэл)
- [ ] Landing дээр "Хэрхэн ажилладаг" секц — жижиг амьд playground preview
- [ ] Сурагчдын жишээ ажлын галерей секц (статик)
- [ ] FAQ-д интерактив хичээлийн талаарх 2–3 асуулт нэмэх
- [ ] Footer-ийг цэгцлэх (холбоос, нийгмийн сүлжээ, зохиогчийн эрх)
- [ ] 404/not-found хуудсыг брэндэд нийцүүлэн сайжруулах
- [ ] Landing-д "Яагаад Storxon" давуу талын секц (3–4 карт)
