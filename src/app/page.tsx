import Image from "next/image";
import {
  ArrowRight,
  Bot,
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

function Mascot({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/mascot.webp"
      alt="Storxon-ий mascot робот"
      width={980}
      height={1020}
      priority={priority}
      className={`mascot-fade select-none ${className}`}
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

function StoreMock() {
  const items = [
    { name: "Air Steppe 01", price: "289,000₮", hue: "from-blue-500/80 to-blue-300/20" },
    { name: "Gobi Runner", price: "315,000₮", hue: "from-violet-500/80 to-violet-300/20" },
    { name: "Khangai Low", price: "249,000₮", hue: "from-indigo-500/70 to-indigo-200/20" },
    { name: "Tuul Court", price: "199,000₮", hue: "from-sky-400/70 to-sky-200/20" },
  ];
  return (
    <div className="overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-2xl shadow-violet-500/15">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-rose-400" />
        <span className="size-2.5 rounded-full bg-amber-300" />
        <span className="size-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 truncate rounded-md bg-ink-3 px-3 py-1 font-mono text-xs text-muted">tanii-delguur.mn</span>
      </div>
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold">STEPPE KICKS</span>
          <span className="rounded-full bg-ink-3 px-2.5 py-1 text-xs text-muted">Сагс · 2</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {items.map((it) => (
            <div key={it.name} className="rounded-2xl border border-line bg-ink-2 p-3">
              <div className={`mb-3 aspect-[4/3] rounded-xl bg-gradient-to-br ${it.hue}`} />
              <p className="truncate text-xs font-medium">{it.name}</p>
              <p className="text-xs text-muted">{it.price}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-brand px-3 py-2.5">
          <span className="text-xs">QPay-ээр төлөх</span>
          <span className="font-mono text-xs font-semibold">538,000₮</span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const checks = ["100% практик", "0-ээс эхлэгчдэд", "AI туслахтай", "QPay-ээр бодит төлбөр"];
  return (
    <section className="soft-bg relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 md:grid-cols-[1.05fr_1fr] md:pt-20">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/70 px-3 py-1 text-xs font-medium text-violet-700">
            <Bot className="size-3.5" />
            AI + Код · E-commerce сургалт
          </p>
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.6rem]">
            Өөрийн онлайн дэлгүүрийг <span className="text-brand">AI-тай хамт</span>{" "}
            <span className="whitespace-nowrap">0-ээс бүтээ</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Програмчлалын мэдлэггүй ч болно. 6 долоо хоногт QPay-ээр төлбөр авдаг, өөрийн домэйнтой
            дэлгүүрийг алхам алхмаар бүтээж сурна.
          </p>
          <ul className="mt-6 grid max-w-md grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {checks.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-blue-600" />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#register" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold shadow-lg shadow-violet-500/30 hover:opacity-90">
              Урьдчилж бүртгүүлэх −50% <ArrowRight className="size-4" />
            </a>
            <a href="#modules" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 font-semibold hover:border-violet-300">
              Хөтөлбөр үзэх <PlayCircle className="size-4 text-violet-600" />
            </a>
          </div>
          <p className="mt-8 text-sm text-muted">
            Эхний <span className="font-semibold text-paper">{PRESALE.seats} хүнд</span> урьдчилсан үнэ ·
            бүртгэл {PRESALE.closes} хүртэл
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="absolute -inset-10 -z-0 rounded-full bg-violet-300/30 blur-3xl" />
          <div className="relative ml-auto w-[82%]">
            <StoreMock />
          </div>
          <div className="animate-float absolute -bottom-14 -left-2 w-[50%] sm:-left-16">
            <Mascot priority />
          </div>
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
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
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
    <section id="pricing" className="soft-bg">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
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
          <Mascot className="animate-float mx-auto w-52" />
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
          <Mascot className="animate-float mt-4 hidden w-56 md:block" />
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
