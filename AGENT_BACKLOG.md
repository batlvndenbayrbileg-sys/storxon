# Agent backlog — Storxon

Автомат сайжруулалтын дараалал. `/loop` агент нэг удаад **ганц** тэмдэглэгдээгүй
ажлыг авч, салбар дээр, build амжилттай болсон тохиолдолд, **PR болгон** нээнэ
(main руу хэзээ ч шууд push хийхгүй).

## Build gate (PR-ээс өмнө заавал)
`storxon/storxon` дотроос ажиллуул:

```
SUPABASE_URL=x SUPABASE_SERVICE_ROLE_KEY=x NEXT_PUBLIC_SUPABASE_URL=https://x.supabase.co NEXT_PUBLIC_SUPABASE_ANON_KEY=x BOTXON_API_KEY=x BOTXON_WEBHOOK_SECRET=x npx next build
```

Зөвхөн exit 0 бол үргэлжлүүл.

## Дүрэм
- Нэг удаад ганц ажил; жижиг, фокустай, буцаах боломжтой, брэндэд нийцсэн.
- **Хэзээ ч бүү гар хүр:** төлбөр (checkout/botxon), нэвтрэлт (auth/login/signup),
  env, Vercel тохиргоо, `supabase/schema.sql`.
- Салбар: `agent/<slug>`. PR base: `main`. main руу push хийхгүй.
- `gh pr create` амжилтгүй (нэвтрээгүй) бол салбараа push-доод орхи, PR-ийг хүн
  GitHub дээр нээнэ гэдгийг тэмдэглэ.

## Ажлууд
- [ ] Teacher хэсгийн placeholder-ийг зураггүй ч гоё харагдах эхний үсгийн аватар/чимэглэлээр солих
- [ ] Landing-д "Сэтгэгдэл / итгэл" (social proof) статик хэсэг нэмэх (3-4 ишлэл карт)
- [ ] Landing мобайл дээр хөвөгч "Бүртгүүлэх" CTA товч нэмэх (доод буланд)
- [ ] Landing-д "Дээш" (back-to-top) товч нэмэх, гүйлгэхэд гарч ирдэг
- [ ] FAQ-г нэг дор ганц нь нээгддэг accordion болгох
- [ ] Хүртээмж (a11y): бүх зураг/товчны alt, aria-label-ийг нягтлаад дутууг нь нөхөх; "skip to content" холбоос нэмэх
- [ ] /dashboard, /admin ачаалж байх үед гоё skeleton харуулах
- [ ] Register хэсэгт "QPay-ээр аюулгүй төлбөр" гэх мэт итгэлийн жижиг мөр нэмэх (зөвхөн UI, логик хөндөхгүй)
- [ ] OpenGraph/Twitter share зургийг metadata-д тодорхой заах (одоо байгаа hero-banner.webp ашиглаж болно)
- [ ] Landing секц хоорондын зай/үсгийн шатлалыг жигдлэх жижиг polish
- [ ] Course самбарын (dashboard) "Үргэлжлүүлэх" товчны hover/press эффектийг жигдлэх
- [ ] README-д орчны хувьсагч, deploy, админ тохиргооны алхмыг цэгцлэх
