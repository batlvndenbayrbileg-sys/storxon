# Storxon — landing page

storxon.online-ийн урьдчилсан бүртгэлийн landing page. Next.js 16 (App Router) + Tailwind v4.

## Ажиллуулах

```bash
npm install
cp .env.example .env.local   # Supabase түлхүүрээ бөглө
npm run dev                  # http://localhost:3000
```

## Supabase тохиргоо

1. Supabase дээр шинэ төсөл үүсгэнэ.
2. SQL Editor дээр `supabase/schema.sql`-ийг ажиллуулна.
3. Project Settings → API хэсгээс `URL` болон `service_role` түлхүүрийг `.env.local`-д хуулна.

Service role түлхүүр зөвхөн сервер талд ашиглагдана. Browser руу хэзээ ч гарахгүй.

Төлбөрийг **Botxon Gateway** (botxon.chat) дамжуулна. QPay merchant данс/түлхүүр хэрэггүй — зөвхөн merchant-ийн `BOTXON_API_KEY` + `BOTXON_WEBHOOK_SECRET`. Botxon дотроо QPay-тэй холбогдож төлбөрийг тухайн merchant-ийн данс руу шууд оруулна.

Бүртгэлүүдийг Supabase-ийн Table Editor → `preorders` дээрээс харна. `status` баганыг `new → invoiced → paid` гэж гараар шинэчилнэ.

## Агуулга засах

Бүх текст, үнэ, огноо, модулийн жагсаалт `src/lib/content.ts`-д байна.

## Deploy (Vercel)

1. Repo-г GitHub руу push хийнэ.
2. Vercel → New Project → repo сонгоно.
3. Environment Variables хэсэгт `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` нэмнэ.
4. Domains хэсэгт `storxon.online`-ийг холбоно.

## Видео хичээл ба төлбөр (QPay → имэйл → /learn)

```
#register форм   нэр, имэйл, утас, багц → /api/checkout → Botxon Gateway QR (үнийг ЗӨВХӨН server тооцоолно)
/api/botxon/webhook  Botxon дуудна → HMAC гарын үсэг шалгаад төлбөрийг Botxon-оос ДАХИН шалгана
/api/orders/:id      форм 4 сек тутам асууна (webhook алдагдсан ч ажиллана)
төлбөр орсон         enrollments-д имэйл нэмэгдэнэ (эрхийн эх сурвалж)
/signup              төлбөр төлсөн имэйлээрээ нууц үгтэй бүртгэл үүсгэнэ
/login               имэйл + нууц үгээр нэвтэрнэ
/learn               видео хичээлүүд: нэвтэрсэн + төлбөртэй (enrollments-тэй) хүнд л нээгдэнэ (private/course.html)
/logout
```

### Тохиргоо
1. Supabase SQL Editor дээр `supabase/schema.sql`-ийг дахин ажиллуул (orders, enrollments нэмэгдэнэ; preorders хэвээр).
2. Supabase → Authentication → Providers → Email: **Confirm email-ийг УНТРАА**. Тэгвэл бүртгэл үүсмэгц шууд нэвтэрнэ (SMTP хэрэггүй). Хэрэв асаалттай орхивол Supabase → Authentication → Emails дээр SMTP холбох шаардлагатай.
3. Supabase → Authentication → URL Configuration: Site URL `https://storxon.online` (имэйл баталгаажуулалт асаалттай үед Redirect URL `https://storxon.online/auth/callback`).
4. Vercel → Environment Variables: `.env.example` дахь бүх утга (Supabase anon + service_role, `BOTXON_API_KEY`, `BOTXON_WEBHOOK_SECRET`, `NEXT_PUBLIC_SITE_URL`). Botxon → Gateway → тухайн merchant дээр webhook URL-ээ `https://www.storxon.online/api/botxon/webhook` болгож тохируул, webhook secret-ийг хуулж ав.
5. Хамгийн хямд багцаар өөрөө нэг удаа төлж, тэр имэйлээрээ `/signup` дээр бүртгэл үүсгэж, `/learn` нээгдэхийг шалга.

### Видео хичээлийг шинэчлэх
Курсын тоглуулагч нэг HTML файл: `private/course.html` (public биш, шууд хаягаар нээгдэхгүй).
Шинэ хувилбараа энэ файлаар солиод push хийнэ. Маскотын зургууд `public/kit/` дотор.

### Гараар хийх
- Буцаалт: QPay дээрээс буцааж, Supabase → `enrollments`-аас тэр имэйлийн мөрийг устга.
- `PRESALE=false` болгосны дараа Redeploy.

## Дараагийн алхам

- [ ] Багшийн фото зураг оруулах (`Teacher` хэсэг)
- [ ] Демо пүүзний дэлгүүрийн бодит дэлгэцийн зургаар `StoreMock`-ийг солих
- [x] Бүртгэл бүрт QPay нэхэмжлэх автоматаар үүсгэх, төлбөр орвол видео хичээл нээх
