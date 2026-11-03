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
- [ ] Хичээлийг цэвэр JSON-оор тодорхойлох бүтцийг баримтжуулах (`src/lib/lessons/README.md`) + нэг хичээлийг JSON-оос ачаалах жишээ
- [ ] Одоогийн `private/course.html`-ийг устгалгүй "film/lecture" блок болгон LessonView-оос холбох (контент хадгалагдана)
- [ ] 4-5 модулийн араг ясыг (гарчиг, зорилго, хоосон блокууд) `data.ts`-д бэлдэх
- [ ] React playground (эхлэлийн хувилбар): зөвхөн тодорхой заавартай, sandbox дотор

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
- [ ] Landing мобайл дээр хөвөгч "Бүртгүүлэх" CTA товч (доод буланд)
- [ ] Landing-д "Дээш" (back-to-top) товч, гүйлгэхэд гарч ирдэг
- [ ] FAQ-г нэг дор ганц нь нээгддэг accordion болгох
- [ ] Хүртээмж: зураг/товчны alt, aria-label нягтлах; "skip to content" холбоос
- [ ] /dashboard, /admin ачаалж байх үед skeleton харуулах
- [ ] OpenGraph/Twitter share зургийг metadata-д тодорхой заах (hero-banner.webp)
- [ ] Landing секц хоорондын зай/үсгийн шатлалыг жигдлэх polish
- [ ] README-д орчны хувьсагч, deploy, админ тохиргооны алхмыг цэгцлэх
