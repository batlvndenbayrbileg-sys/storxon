# Storxon

storxon.online — урьдчилсан бүртгэл, төлбөр (QPay → Botxon Gateway), видео хичээл (`/learn`), интерактив playground (`/playground`) ба админ самбар (`/admin`). Next.js 16 (App Router) + Tailwind v4 + Supabase.

> Next 16 нь өмнөх хувилбараас ялгаатай. Код бичихээс өмнө `node_modules/next/dist/docs/`-г хар (`AGENTS.md`).

## Агуулга

1. [Ажиллуулах](#ажиллуулах)
2. [Орчны хувьсагч](#орчны-хувьсагч)
3. [Supabase тохиргоо](#supabase-тохиргоо)
4. [Төлбөр ба хичээлийн урсгал](#төлбөр-ба-хичээлийн-урсгал)
5. [Deploy (Vercel)](#deploy-vercel)
6. [Админ самбар](#админ-самбар-admin)
7. [Контент засах](#контент-засах)
8. [Гараар хийх](#гараар-хийх)

## Ажиллуулах

```bash
npm install
cp .env.example .env.local   # утгуудаа бөглө
npm run dev                  # http://localhost:3000
npm run build                # production build шалгах
```

## Орчны хувьсагч

`.env.example`-ийг `.env.local` болгон хуулж бөглөнө. Vercel дээр мөн адил бүгдийг нэмнэ.

| Хувьсагч | Хаана | Тайлбар |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | public | Сайтын бүтэн хаяг (`https://storxon.online`) — callback, имэйлийн холбоос |
| `NEXT_PUBLIC_SUPABASE_URL` | public | Supabase → Project Settings → API → URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | Supabase anon key |
| `SUPABASE_URL` | server | Supabase URL (server талд ашиглана) |
| `SUPABASE_SERVICE_ROLE_KEY` | **нууц, server** | `NEXT_PUBLIC_` гэж хэзээ ч эхлүүлэхгүй. Browser руу гарахгүй |
| `BOTXON_API_KEY` | **нууц, server** | botxon.chat → Gateway → merchant-ийн API key |
| `BOTXON_WEBHOOK_SECRET` | **нууц, server** | Webhook-ийн HMAC гарын үсэг шалгах secret |
| `BOTXON_BASE_URL` | server, заавал биш | Gateway API хаяг (анхдагч: `https://botxon.chat/api/gateway/v1`) |
| `PRESALE` | server | Урьдчилсан үнэ асаах/унтраах (`true` / `false`) |
| `ADMIN_EMAILS` | server | `/admin` нээгдэх имэйлүүд, таслалаар |

QPay merchant данс/түлхүүр **хэрэггүй** — Botxon дотроо QPay-тэй холбогдож төлбөрийг merchant-ийн данс руу шууд оруулна.

## Supabase тохиргоо

1. Supabase дээр шинэ төсөл үүсгэнэ.
2. SQL Editor дээр `supabase/schema.sql`-ийг ажиллуулна (`preorders`, `orders`, `enrollments` гэх мэт). Схем өөрчлөгдөх бүрд дахин ажиллуулна.
3. Project Settings → API хэсгээс `URL`, `anon`, `service_role` түлхүүрийг орчны хувьсагчид хуулна.
4. Authentication → Providers → Email: **Confirm email-ийг УНТРАА**. Тэгвэл бүртгэл үүсмэгц шууд нэвтэрнэ (SMTP хэрэггүй). Асаалттай орхивол Authentication → Emails дээр SMTP холбох шаардлагатай.
5. Authentication → URL Configuration: Site URL `https://storxon.online` (имэйл баталгаажуулалт асаалттай үед Redirect URL `https://storxon.online/auth/callback`).

Урьдчилсан бүртгэлийг Table Editor → `preorders` дээрээс харна. `status` баганыг `new → invoiced → paid` гэж гараар шинэчилнэ.

## Төлбөр ба хичээлийн урсгал

```
#register форм       нэр, имэйл, утас, багц → /api/checkout → Botxon Gateway QR (үнийг ЗӨВХӨН server тооцоолно)
/api/botxon/webhook  Botxon дуудна → HMAC гарын үсэг шалгаад төлбөрийг Botxon-оос ДАХИН шалгана
/api/orders/:id      форм 4 сек тутам асууна (webhook алдагдсан ч ажиллана)
төлбөр орсон         enrollments-д имэйл нэмэгдэнэ (эрхийн эх сурвалж)
/signup              төлбөр төлсөн имэйлээрээ нууц үгтэй бүртгэл үүсгэнэ
/login               имэйл + нууц үгээр нэвтэрнэ
/learn               видео хичээл: нэвтэрсэн + төлбөртэй (enrollments-тэй) хүнд л нээгдэнэ (private/course.html)
/playground          интерактив хичээл ба sandbox (src/lib/lessons/README.md)
/logout
```

## Deploy (Vercel)

1. Repo-г GitHub руу push хийнэ.
2. Vercel → New Project → repo сонгоно.
3. Environment Variables хэсэгт [дээрх хүснэгт](#орчны-хувьсагч)-ийн бүх утгыг нэмнэ.
4. Botxon → Gateway → тухайн merchant дээр webhook URL-ийг `https://www.storxon.online/api/botxon/webhook` болгож тохируулж, webhook secret-ийг `BOTXON_WEBHOOK_SECRET`-д хуулна.
5. Domains хэсэгт `storxon.online`-ийг холбоно.
6. Хамгийн хямд багцаар өөрөө нэг удаа төлж, тэр имэйлээрээ `/signup` дээр бүртгэл үүсгэж, `/learn` нээгдэхийг шалгана.

Env өөрчилсний дараа Vercel дээр **Redeploy** хийнэ.

## Админ самбар (/admin)

`ADMIN_EMAILS` дахь имэйлээр нэвтэрсэн хүнд `/admin` нээгдэнэ — бүх захиалга, урьдчилсан бүртгэл, сургалтын эрхийг нэг дор харна.

1. Supabase → Authentication → Users → **Add user**: имэйл `storxon@gmail.com`, нууц үгээ өөрөө сонго, **Auto Confirm** асаа. (Эсвэл тэр имэйлээр `/signup` дээр бүртгэл үүсгэ.)
2. Vercel → Environment Variables: `ADMIN_EMAILS=storxon@gmail.com` (хэд хэдэн админ бол таслалаар).
3. `storxon.online/admin` руу ороод тэр имэйл/нууц үгээрээ нэвтэр.

## Контент засах

- Текст, үнэ, огноо, модулийн жагсаалт: `src/lib/content.ts`.
- Видео хичээл: нэг HTML файл `private/course.html` (public биш, шууд хаягаар нээгдэхгүй). Шинэ хувилбараа энэ файлаар солиод push хийнэ. Маскотын зургууд `public/kit/` дотор.
- Интерактив хичээл: `src/lib/lessons/` (бүтэц, JSON формат — `src/lib/lessons/README.md`).

## Гараар хийх

- Буцаалт: QPay дээрээс буцааж, Supabase → `enrollments`-аас тэр имэйлийн мөрийг устга.
- `PRESALE=false` болгосны дараа Redeploy.

## Дараагийн алхам

- [ ] Багшийн фото зураг оруулах (`Teacher` хэсэг)
- [ ] Демо пүүзний дэлгүүрийн бодит дэлгэцийн зургаар `StoreMock`-ийг солих
- [x] Бүртгэл бүрт QPay нэхэмжлэх автоматаар үүсгэх, төлбөр орвол видео хичээл нээх
