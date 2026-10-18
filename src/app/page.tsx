import PreorderForm from "@/components/PreorderForm";
import { PRESALE, audiences, faqs, fmt, modules, plans } from "@/lib/content";

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid size-7 place-items-center rounded-lg bg-brand text-sm text-volt-ink">S</span>
          Storxon
        </a>
        <nav className="hidden gap-7 text-sm text-muted md:flex">
          <a href="#modules" className="hover:text-paper">Хөтөлбөр</a>
          <a href="#teacher" className="hover:text-paper">Багш</a>
          <a href="#pricing" className="hover:text-paper">Үнэ</a>
          <a href="#faq" className="hover:text-paper">Асуулт</a>
        </nav>
        <a href="#register" className="rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink hover:bg-brand hover:text-white">
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
    { name: "Tuul Court", price: "199,000₮", hue: "from-sky-400/60 to-sky-400/5" },
  ];
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-volt/10 blur-3xl" />
      <div className="overflow-hidden rounded-2xl border border-line bg-ink shadow-2xl shadow-violet-500/10">
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-ember/80" />
          <span className="size-2.5 rounded-full bg-volt/80" />
          <span className="size-2.5 rounded-full bg-muted/50" />
          <span className="ml-3 truncate rounded-md bg-ink-3 px-3 py-1 font-mono text-xs text-muted">
            tanii-delguur.mn
          </span>
        </div>
        <div className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold">STEPPE KICKS</span>
            <span className="rounded-full bg-ink-3 px-2.5 py-1 text-xs text-muted">Сагс · 2</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {items.map((it) => (
              <div key={it.name} className="rounded-xl border border-line bg-ink-3 p-3">
                <div className={`mb-3 aspect-[4/3] rounded-lg bg-gradient-to-br ${it.hue}`} />
                <p className="truncate text-xs font-medium">{it.name}</p>
                <p className="text-xs text-muted">{it.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between rounded-xl border border-volt/30 bg-volt/10 px-3 py-2.5">
            <span className="text-xs text-paper">QPay-ээр төлөх</span>
            <span className="font-mono text-xs font-semibold text-brand">538,000₮</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="grain border-b border-line/60">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.1fr_1fr] md:py-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-muted">
            <span className="size-1.5 rounded-full bg-brand" />
            Урьдчилсан бүртгэл · эхний {PRESALE.seats} хүнд −50%
          </p>
          <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Өөрийн онлайн дэлгүүрийг{" "}
            <span className="text-brand">6 долоо хоногт</span>{" "}
            <span className="whitespace-nowrap">0-ээс бүтээ</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Програмчлалын мэдлэггүй ч болно. AI туслахтай хамт код бичиж, QPay-ээр бодит төлбөр авдаг,
            өөрийн домэйнтой дэлгүүрийг интернэтэд гаргана.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#register" className="rounded-xl bg-brand px-6 py-3.5 font-semibold hover:opacity-90">
              Урьдчилж бүртгүүлэх −50%
            </a>
            <a href="#modules" className="rounded-xl border border-line px-6 py-3.5 font-semibold hover:border-paper">
              Хөтөлбөр үзэх
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <li>Их сургуулийн программчлалын багш</li>
            <li>Банкны системийн хөгжүүлэгч</li>
            <li>SaaS бүтээгдэхүүний үүсгэн байгуулагч</li>
          </ul>
        </div>
        <StoreMock />
      </div>
    </section>
  );
}

function Stack() {
  const tools = ["Next.js", "Tailwind", "Supabase", "QPay", "Vercel", "Cursor / Claude"];
  return (
    <div className="border-b border-line/60">
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
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-muted">{sub}</p>}
    </div>
  );
}

function Audience() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHead
        eyebrow="Хэнд зориулсан"
        title="Компьютер, интернэт, долоо хоногт 5-6 цаг. Өөр юу ч хэрэггүй."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {audiences.map((a) => (
          <div key={a.title} className="rounded-2xl border border-line bg-ink-2 p-6">
            <p className="mb-3 inline-block rounded-full bg-ink-3 px-2.5 py-1 text-xs text-muted">{a.tag}</p>
            <h3 className="text-lg font-bold">{a.title}</h3>
            <p className="mt-2 text-muted">{a.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section id="modules" className="border-y border-line/60 bg-ink-2/50">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHead
          eyebrow="Хөтөлбөр · 10 модуль · ~20 цаг"
          title="Модуль бүр дэлгүүрийн нэг хэсгийг бүтээж дуусна"
          sub="Сургалтын эцэст таны домэйн дээр ажилладаг, QPay-ээр төлбөр авдаг пүүзний дэлгүүр, бүрэн эх код, мөн жижиг бизнесүүдэд ийм дэлгүүр хийж өгөх чадвар үлдэнэ."
        />
        <ol className="grid gap-3 md:grid-cols-2">
          {modules.map((m) => (
            <li
              key={m.n}
              className={`flex items-start gap-4 rounded-2xl border p-5 ${
                m.highlight ? "border-volt/40 bg-volt/[0.06]" : "border-line bg-ink"
              }`}
            >
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-lg font-mono text-sm font-bold ${
                  m.highlight ? "bg-brand text-volt-ink" : "bg-ink-3 text-muted"
                }`}
              >
                {String(m.n).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-semibold">{m.title}</h3>
                <p className="mt-1 text-sm text-muted">→ {m.out}</p>
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
      <div className="grid items-start gap-10 md:grid-cols-[280px_1fr]">
        <div className="aspect-square w-full max-w-[280px] rounded-2xl bg-brand p-6 shadow-xl shadow-violet-500/20">
          <div className="flex h-full flex-col justify-end">
            <p className="text-2xl font-black">Д. Бямбадолгор</p>
            <p className="text-sm text-white/75">Багш · Хөгжүүлэгч · Botxon</p>
          </div>
        </div>
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">Багшийн тухай</p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Онол биш, өдөр бүр ашигладаг аргаа заана</h2>
          <p className="mt-5 text-muted">
            Өдөр нь банкны зээлийн системийг хөгжүүлж, орой нь өөрийн AI бүтээгдэхүүн болох Botxon-ыг хөгжүүлдэг.
            Их сургуульд интернэт болон мобайл программчлал заадаг. Клиентэд e-commerce платформ бүтээж,
            өөрийн SaaS-ыг QPay-тэй холбож хэрэглэгчидтэй болгосон туршлагаа энэ сургалтад шингээсэн.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand" />
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
    <section id="pricing" className="border-y border-line/60 bg-ink-2/50">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHead
          eyebrow="Үнэ"
          title={`Эхний ${PRESALE.seats} хүнд 50% хямдрал`}
          sub={`Урьдчилсан бүртгэл ${PRESALE.closes} хүртэл. Эхний 2 модуль ${PRESALE.firstModules} нээгдэнэ.`}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                p.featured ? "border-volt bg-ink" : "border-line bg-ink"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 right-6 rounded-full bg-brand px-3 py-1 text-xs font-bold text-volt-ink">
                  Хамгийн их сонгосон
                </span>
              )}
              <h3 className="text-xl font-bold">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-4xl font-black">{fmt(p.presale)}</span>
                <span className="text-muted line-through">{fmt(p.price)}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm">
                    <span className="text-brand">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#register"
                className={`mt-7 rounded-xl px-5 py-3.5 text-center font-semibold ${
                  p.featured ? "bg-brand hover:opacity-90" : "border border-line hover:border-paper"
                }`}
              >
                {p.name} багц сонгох
              </a>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 text-sm text-muted sm:grid-cols-2">
          <p className="rounded-xl border border-line p-4">
            <span className="font-semibold text-paper">Найзтайгаа:</span> 3 хүн хамт бүртгүүлбэл нэмэлт 20% хямдрал.
          </p>
          <p className="rounded-xl border border-line p-4">
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
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <SectionHead eyebrow="FAQ" title="Түгээмэл асуулт" />
      <div className="divide-y divide-line border-y border-line">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
              {f.q}
              <span className="text-xl text-muted transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Register() {
  return (
    <section id="register" className="grain border-t border-line/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">Урьдчилсан бүртгэл</p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Байраа одоо баталгаажуул</h2>
          <p className="mt-5 text-muted">
            Бүртгүүлсний дараа QPay-ийн төлбөрийн нэхэмжлэхийг утсаар чинь илгээнэ. Төлбөр хийгдсэнээр
            хямдралтай үнэ тань баталгаажна. Хямдрал эхний {PRESALE.seats} хүнд л хамаарна.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-line p-4">
              <dt className="text-xs text-muted">Бүртгэл хаагдах</dt>
              <dd className="mt-1 font-semibold">{PRESALE.closes}</dd>
            </div>
            <div className="rounded-xl border border-line p-4">
              <dt className="text-xs text-muted">Эхний модуль</dt>
              <dd className="mt-1 font-semibold">{PRESALE.firstModules}</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-8">
          <PreorderForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <p>© 2026 Storxon</p>
        <div className="flex gap-6">
          <a href="https://instagram.com/storxon" className="hover:text-paper" target="_blank" rel="noreferrer">Instagram</a>
          <a href="#faq" className="hover:text-paper">Асуулт</a>
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
