import Image from "next/image";
import {
  ArrowRight,
  Check,
  MousePointer2,
  CheckCircle2,
  GraduationCap,
  MessageCircle,
  PlayCircle,
  RefreshCw,
  School,
  ShoppingBag,
} from "lucide-react";
import PreorderForm from "@/components/PreorderForm";
import { PRESALE, audiences, faqs, fmt, modules, plans } from "@/lib/content";

const audienceIcons = [School, GraduationCap, ShoppingBag, RefreshCw];

const SPRITES = {
  cart: [442, 454], chart: [480, 458], code: [514, 536], desk: [954, 594], fly: [460, 436],
  flybig: [616, 548], laptop: [532, 442], sleep: [632, 474], tablet: [376, 438], wave: [390, 442], wink: [348, 458],
} as const;

function Sprite({ name, className = "", alt = "" }: { name: keyof typeof SPRITES; className?: string; alt?: string }) {
  const [w, h] = SPRITES[name];
  return (
    <Image
      src={`/kit/${name}.webp`}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      width={w}
      height={h}
      className={`pointer-events-none select-none drop-shadow-[0_18px_30px_rgba(91,76,240,0.18)] ${className}`}
    />
  );
}

function Nav() {
  return (
    <header className="glass sticky top-0 z-40 border-b border-line/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid size-8 place-items-center rounded-xl bg-brand text-sm shadow-md shadow-violet-500/30">S</span>
          Storxon
        </a>
        <nav className="hidden gap-7 text-sm text-muted md:flex">
          <a href="#about" className="hover:text-paper">Сургалтын тухай</a>
          <a href="#modules" className="hover:text-paper">Хөтөлбөр</a>
          <a href="#teacher" className="hover:text-paper">Багш</a>
          <a href="#pricing" className="hover:text-paper">Үнэ</a>
          <a href="#faq" className="hover:text-paper">FAQ</a>
        </nav>
        <a href="#register" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold shadow-md shadow-violet-500/25 hover:opacity-90">
          Бүртгүүлэх
        </a>
      </div>
    </header>
  );
}

function Banner() {
  return (
    <section className="relative overflow-hidden bg-[#2f5cf6]">
      <div className="relative mx-auto max-w-[1536px]">
        <Image
          src="/hero-banner.webp"
          alt="Storxon робот зөөврийн компьютер дээр онлайн дэлгүүр бүтээж байна"
          width={1536}
          height={891}
          priority
          sizes="100vw"
          className="h-auto w-full"
        />
        <div className="absolute inset-x-0 top-0 flex justify-end px-[4%] pt-[6%]">
          <div className="w-[46%] text-right text-white">
            <h1 className="text-[clamp(1.35rem,6.4vw,6rem)] font-black uppercase italic leading-[0.92] tracking-tight drop-shadow-[0_4px_18px_rgba(20,40,160,0.35)]">
              <span className="mr-[0.15em] inline-block text-[0.55em] align-[0.35em] not-italic">✦</span>
              Create
              <br />
              your store
            </h1>
            <p className="mt-[0.9em] text-[clamp(0.6rem,1.75vw,1.6rem)] font-medium uppercase leading-snug tracking-wide">
              AI × E-commerce
              <br />
              course
            </p>
            <p className="mt-[0.4em] text-[clamp(0.55rem,1.1vw,1rem)] text-white/85">Turn your ideas into reality.</p>
          </div>
        </div>
        <p className="absolute right-[3.5%] top-[49%] hidden -rotate-6 text-[clamp(0.8rem,1.7vw,1.5rem)] font-semibold italic leading-tight text-white/90 sm:block">
          Өөрийн
          <br />
          брэндээ
          <br />
          бүтээ!
        </p>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-b from-transparent to-white" />
      </div>
    </section>
  );
}

function CheckStrip() {
  const checks = ["100% практик", "0-ээс эхлэгчдэд", "AI туслахтай", "Өөрийн онлайн дэлгүүртэй болно"];
  return (
    <div className="bg-white">
      <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-5 text-sm sm:text-base">
        {checks.map((c) => (
          <li key={c} className="flex items-center gap-2">
            <span className="grid size-5 place-items-center rounded-full bg-brand">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -right-40 top-10 size-[38rem] rounded-full bg-violet-200/40 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_1.05fr] md:py-20">
        <div>
          <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-black leading-[0.95] tracking-tight">
            Hello,
            <span className="ml-2 inline-block align-top text-[0.45em] text-amber-400">✦</span>
            <br />
            <span className="relative my-2 mr-3 inline-block border-2 border-blue-500 px-3 py-1">
              <span className="text-brand">Storxon</span>
              {(["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 -bottom-1.5", "-right-1.5 -bottom-1.5"] as const).map((pos) => (
                <span key={pos} className={`absolute ${pos} size-2.5 rounded-[2px] border-2 border-blue-500 bg-white`} />
              ))}
              <MousePointer2 className="absolute -bottom-6 -right-5 size-7 fill-paper text-paper" />
            </span>
            is
            <br />
            coming
          </h2>
          <p className="mt-7 max-w-md text-xl leading-relaxed text-muted">
            Өөрийн онлайн дэлгүүрийг AI-тай хамт 0-ээс бүтээж сурах бүрэн сургалт удахгүй.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#register" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold shadow-lg shadow-violet-500/30 hover:opacity-90">
              Сургалтад бүртгүүлэх <ArrowRight className="size-4" />
            </a>
            <a href="#modules" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 font-semibold hover:border-violet-300">
              Хөтөлбөр үзэх <PlayCircle className="size-5 text-blue-600" />
            </a>
          </div>
          <p className="mt-8 text-sm text-muted">
            Эхний <span className="font-semibold text-paper">{PRESALE.seats} хүнд −50%</span> · урьдчилсан бүртгэл{" "}
            {PRESALE.closes} хүртэл
          </p>
        </div>
        <div className="relative">
          <Image
            src="/mascot-hello.webp"
            alt="Гараа даллаж буй Storxon робот"
            width={870}
            height={825}
            priority
            className="edge-fade animate-float mx-auto h-auto w-full max-w-xl select-none"
          />
        </div>
      </div>
    </section>
  );
}

function Stack() {
  const tools = ["Next.js", "Tailwind", "Supabase", "QPay", "Vercel", "Cursor / Claude"];
  return (
    <div className="border-y border-line/70 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-6 text-sm text-muted sm:px-6">
        <span className="text-xs uppercase tracking-widest text-muted/70">Ашиглах технологи</span>
        {tools.map((t) => (
          <span key={t} className="font-mono">{t}</span>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-4 inline-block rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-muted">{sub}</p>}
    </div>
  );
}

function Audience() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHead
        eyebrow="Хэнд зориулсан"
        title="Компьютер, интернэт, долоо хоногт 5-6 цаг"
        sub="Өмнөх мэдлэг шаардахгүй. Дараах хүмүүст хамгийн их үр дүн өгнө."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {audiences.map((a, i) => {
          const Icon = audienceIcons[i];
          return (
            <div key={a.title} className="rounded-3xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/10">
              <span className="mb-5 grid size-12 place-items-center rounded-2xl bg-brand shadow-md shadow-violet-500/25">
                <Icon className="size-6" />
              </span>
              <h3 className="text-lg font-bold">{a.title}</h3>
              <p className="mt-1 text-xs font-medium text-violet-700">{a.tag}</p>
              <p className="mt-3 text-sm text-muted">{a.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section id="modules" className="bg-ink-2">
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Sprite name="code" className="animate-float absolute right-4 top-10 hidden w-36 lg:block" />
        <Sprite name="cart" className="animate-float absolute left-4 top-16 hidden w-28 lg:block [animation-delay:-2s]" />
        <SectionHead
          eyebrow="Сургалтын хөтөлбөр · 10 модуль · ~20 цаг"
          title="Бүрэн, практик, алхам алхмаар"
          sub="Модуль бүр дэлгүүрийн нэг хэсгийг бүтээж дуусна. Эцэст нь таны домэйн дээр ажилладаг пүүзний дэлгүүр, бүрэн эх код үлдэнэ."
        />
        <ol className="grid gap-4 md:grid-cols-2">
          {modules.map((m) => (
            <li
              key={m.n}
              className={`flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm ${
                m.highlight ? "border-violet-300 ring-1 ring-violet-200" : "border-line"
              }`}
            >
              <span
                className={`grid size-10 shrink-0 place-items-center rounded-full font-mono text-sm font-bold ${
                  m.highlight ? "bg-brand shadow-md shadow-violet-500/30" : "bg-violet-50 text-violet-700"
                }`}
              >
                {String(m.n).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold">{m.title}</h3>
                <p className="mt-0.5 text-sm text-muted">{m.out}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Teacher() {
  const points = [
    "Сурах бичгийн жишээ биш, бодит бизнест ажиллаж буй код",
    "Анхлан суралцагчдад заасан их сургуулийн туршлага",
    "QPay интеграцийг алхам алхмаар заадаг цөөн сургалтын нэг",
  ];
  return (
    <section id="teacher" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-brand p-8 shadow-xl shadow-violet-500/20">
          {/* TODO: replace with teacher photo */}
          <div className="flex h-full flex-col justify-end">
            <p className="text-3xl font-black">Д. Бямбадолгор</p>
            <p className="mt-1 text-white/80">Багш · Хөгжүүлэгч · Botxon</p>
          </div>
          <Sprite name="tablet" className="absolute -bottom-2 right-6 w-[34%]" />
          <span className="glass absolute right-5 top-5 rounded-2xl px-4 py-3 text-sm font-semibold text-violet-700 shadow-md">
            AI · Next.js · QPay
          </span>
        </div>
        <div>
          <p className="mb-4 inline-block rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">Багшийн тухай</p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Бодит туршлагатай, ойлгомжтой заана</h2>
          <p className="mt-5 text-muted">
            Өдөр нь банкны зээлийн системийг хөгжүүлж, орой нь өөрийн AI бүтээгдэхүүн болох Botxon-ыг хөгжүүлдэг.
            Их сургуульд интернэт болон мобайл программчлал заадаг. Клиентэд e-commerce платформ бүтээж,
            өөрийн SaaS-ыг QPay-тэй холбож хэрэглэгчидтэй болгосон туршлагаа энэ сургалтад шингээсэн.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-blue-600" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="soft-bg overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Sprite name="flybig" className="animate-float absolute -left-6 top-6 hidden w-52 lg:block" />
        <Sprite name="chart" className="animate-float absolute right-2 top-14 hidden w-36 lg:block [animation-delay:-2.5s]" />
        <SectionHead
          eyebrow="Төлбөрийн сонголт"
          title="Өөрт тохирох багцаа сонго"
          sub={`Эхний ${PRESALE.seats} хүнд 50% хямдрал. Нэг удаагийн төлбөрөөр насан туршийн хандалт.`}
        />
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-3xl border bg-white p-8 shadow-sm ${
                p.featured ? "border-violet-400 shadow-xl shadow-violet-500/15" : "border-line"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-xs font-bold shadow-md">
                  Хамгийн их сонгосон
                </span>
              )}
              <h3 className="text-xl font-bold">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-brand text-4xl font-black">{fmt(p.presale)}</span>
                <span className="text-muted line-through">{fmt(p.price)}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm">
                    <CheckCircle2 className="size-4 shrink-0 text-blue-600" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#register"
                className={`mt-8 rounded-full px-5 py-3.5 text-center font-semibold ${
                  p.featured ? "bg-brand shadow-lg shadow-violet-500/30 hover:opacity-90" : "border border-line hover:border-violet-300"
                }`}
              >
                Сургалтад бүртгүүлэх
              </a>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-6 grid max-w-4xl gap-4 text-sm text-muted sm:grid-cols-2">
          <p className="rounded-2xl border border-line bg-white/70 p-4">
            <span className="font-semibold text-paper">Найзтайгаа:</span> 3 хүн хамт бүртгүүлбэл нэмэлт 20% хямдрал.
          </p>
          <p className="rounded-2xl border border-line bg-white/70 p-4">
            <span className="font-semibold text-paper">Баталгаа:</span> Эхний 2 модулийг үзээд таалагдаагүй бол 7
            хоногийн дотор мөнгөө бүтнээр нь буцааж авна.
          </p>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHead eyebrow="Түгээмэл асуулт" title="Түгээмэл асуултууд" />
      <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-line bg-white px-5 py-4 shadow-sm open:shadow-md">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
                {f.q}
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-violet-50 text-violet-700 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="soft-bg sticky top-24 overflow-hidden rounded-3xl border border-white p-6 text-center shadow-sm">
          <Sprite name="sleep" alt="Storxon робот" className="animate-float mx-auto w-60" />
          <h3 className="mt-2 text-xl font-bold">Асуулт байна уу?</h3>
          <p className="mt-2 text-sm text-muted">Instagram-аар бичээрэй, бид хурдан хариулна.</p>
          <a
            href="https://instagram.com/storxon"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-semibold shadow-lg shadow-violet-500/30 hover:opacity-90"
          >
            <MessageCircle className="size-4" /> Instagram-аар асуух
          </a>
        </div>
      </div>
    </section>
  );
}

function Register() {
  return (
    <section id="register" className="px-4 pb-20 sm:px-6">
      <div className="soft-bg relative mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-[2rem] border border-white p-6 shadow-sm sm:p-10 md:grid-cols-2">
        <div className="relative">
          <p className="mb-4 inline-block rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-violet-700">Урьдчилсан бүртгэл</p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Өөрийн онлайн дэлгүүрээ <span className="text-brand">өнөөдрөөс</span> бүтээж эхэл
          </h2>
          <p className="mt-5 text-muted">
            Бүртгүүлсний дараа QPay-ийн нэхэмжлэхийг утсаар чинь илгээнэ. Төлбөр хийгдсэнээр хямдралтай үнэ тань
            баталгаажна.
          </p>
          <dl className="mt-6 grid max-w-sm grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/80 p-4">
              <dt className="text-xs text-muted">Бүртгэл хаагдах</dt>
              <dd className="mt-1 font-semibold">{PRESALE.closes}</dd>
            </div>
            <div className="rounded-2xl bg-white/80 p-4">
              <dt className="text-xs text-muted">Эхний модуль</dt>
              <dd className="mt-1 font-semibold">{PRESALE.firstModules}</dd>
            </div>
          </dl>
          <Sprite name="laptop" alt="Зөөврийн компьютер дээр ажиллаж буй Storxon робот" className="animate-float mt-6 hidden w-64 md:block" />
        </div>
        <div className="glass relative rounded-3xl border border-white p-6 shadow-xl shadow-violet-500/10 sm:p-8">
          <PreorderForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <p>© 2026 Storxon</p>
        <div className="flex gap-6">
          <a href="https://instagram.com/storxon" className="hover:text-paper" target="_blank" rel="noreferrer">Instagram</a>
          <a href="#faq" className="hover:text-paper">FAQ</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Banner />
        <CheckStrip />
        <Hero />
        <Stack />
        <Audience />
        <Modules />
        <Teacher />
        <Pricing />
        <Faq />
        <Register />
      </main>
      <Footer />
    </>
  );
}
