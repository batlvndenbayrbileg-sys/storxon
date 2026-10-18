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

Service role түлхүүр зөвхөн сервер талын `/api/preorder` route-д ашиглагдана. Browser руу хэзээ ч гарахгүй.

Бүртгэлүүдийг Supabase-ийн Table Editor → `preorders` дээрээс харна. `status` баганыг `new → invoiced → paid` гэж гараар шинэчилнэ.

## Агуулга засах

Бүх текст, үнэ, огноо, модулийн жагсаалт `src/lib/content.ts`-д байна.

## Deploy (Vercel)

1. Repo-г GitHub руу push хийнэ.
2. Vercel → New Project → repo сонгоно.
3. Environment Variables хэсэгт `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` нэмнэ.
4. Domains хэсэгт `storxon.online`-ийг холбоно.

## Дараагийн алхам

- [ ] Багшийн фото зураг оруулах (`Teacher` хэсэг)
- [ ] Демо пүүзний дэлгүүрийн бодит дэлгэцийн зургаар `StoreMock`-ийг солих
- [ ] Бүртгэл бүрт QPay нэхэмжлэх автоматаар үүсгэх (өөрийн gateway-тэй холбох)
