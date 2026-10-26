"use client";

import { useEffect, useState } from "react";
import { modules, PRESALE } from "@/lib/content";

type Me = { email: string; plan: string | null; enrolled: boolean; isAdmin: boolean };

// The course player (private/course.html) marks finished lessons in localStorage["sx-done"].
const TOTAL_LESSONS = 71;
const QUOTES = [
  "Том амжилт бага багаар бүтдэг.",
  "Өнөөдрийн жижиг алхам ирээдүйн том ялалт болдог.",
  "Хийж эхэлсэн хүн л дуусгадаг.",
];

function readDone(): number {
  try {
    const raw = localStorage.getItem("sx-done");
    if (!raw) return 0;
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? Object.keys(obj).length : 0;
  } catch {
    return 0;
  }
}

function firstName(email: string) {
  const n = email.split("@")[0].replace(/[._-]+/g, " ").trim();
  return n ? n[0].toUpperCase() + n.slice(1) : "сурагч";
}

function Ring({ pct, size = 120 }: { pct: number; size?: number }) {
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-line)" strokeWidth="10" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#g)" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset .8s ease" }}
      />
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-brand-from)" />
          <stop offset="1" stopColor="var(--color-brand-to)" />
        </linearGradient>
      </defs>
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="fill-paper font-black" style={{ fontSize: size * 0.22 }}>
        {pct}%
      </text>
    </svg>
  );
}

const NAV = [
  { label: "Самбар", href: "/dashboard", icon: "M3 11l9-8 9 8M5 10v10h14V10", active: true },
  { label: "Сургалт", href: "/learn", icon: "M4 6h16M4 12h16M4 18h10" },
  { label: "Үнэ", href: "/#pricing", icon: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" },
];

function NavLink({ label, href, icon, active }: { label: string; href: string; icon: string; active?: boolean }) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
        active ? "bg-brand" : "text-muted hover:bg-ink-3 hover:text-paper"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d={icon} />
      </svg>
      {label}
    </a>
  );
}

export default function Dashboard() {
  const [me, setMe] = useState<Me | null>(null);
  const [err, setErr] = useState<"none" | "noaccess" | "fail">("none");
  const [done, setDone] = useState(0);
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    setDone(readDone());
    setQuote(QUOTES[Math.floor(Date.now() / 86400000) % QUOTES.length]);
    (async () => {
      try {
        const r = await fetch("/api/me", { cache: "no-store" });
        if (r.status === 401) { location.assign("/login?next=/dashboard"); return; }
        if (!r.ok) { setErr("fail"); return; }
        const data: Me = await r.json();
        if (!data.enrolled) { setErr("noaccess"); setMe(data); return; }
        setMe(data);
      } catch {
        setErr("fail");
      }
    })();
  }, []);

  if (err === "fail") {
    return <main className="grid min-h-screen place-items-center bg-ink-2 px-4 text-muted">Ачаалж чадсангүй. Дахин оролдоно уу.</main>;
  }

  if (err === "noaccess") {
    return (
      <main className="soft-bg grid min-h-screen place-items-center px-4">
        <div className="glass max-w-md rounded-3xl border border-white p-8 text-center shadow-xl shadow-violet-500/10">
          <p className="text-2xl font-black">Сургалтын эрх алга</p>
          <p className="mt-3 text-muted">Таны {me?.email} хаягт сургалтын эрх олгогдоогүй байна. Багцаа аваад эхлээрэй.</p>
          <a href="/#register" className="mt-5 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold">Сургалтад бүртгүүлэх</a>
          <a href="/logout" className="mt-3 block text-sm font-semibold text-muted">Гарах</a>
        </div>
      </main>
    );
  }

  if (!me) {
    return <main className="grid min-h-screen place-items-center bg-ink-2 px-4 text-muted">Ачаалж байна…</main>;
  }

  const pct = Math.round((Math.min(done, TOTAL_LESSONS) / TOTAL_LESSONS) * 100);
  const started = done > 0;
  const finished = done >= TOTAL_LESSONS;
  const planLabel = me.plan === "pro" ? "Pro" : me.plan === "standard" ? "Стандарт" : me.isAdmin ? "Админ" : "—";

  return (
    <div className="min-h-screen bg-ink-2 text-paper">
      {/* sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-line bg-ink p-4 lg:flex">
        <a href="/" className="flex items-center gap-2 px-2 py-1 font-black tracking-tight">
          <span className="grid size-9 place-items-center rounded-xl bg-brand text-sm shadow-md shadow-violet-500/30">S</span>
          Storxon
        </a>
        <nav className="mt-6 flex flex-col gap-1">
          {NAV.map((n) => <NavLink key={n.href} {...n} />)}
          {me.isAdmin && <NavLink label="Админ" href="/admin" icon="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" />}
        </nav>
        <a href="/account" className="mt-auto block rounded-2xl border border-line bg-ink-2 p-3 transition hover:border-violet-300">
          <p className="truncate text-sm font-semibold">{firstName(me.email)}</p>
          <p className="truncate text-xs text-muted">{me.email}</p>
        </a>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <a href="/account" className="rounded-lg border border-line bg-ink px-3 py-1.5 text-center text-xs font-semibold text-muted hover:text-paper">Профайл</a>
          <a href="/logout" className="rounded-lg border border-line bg-ink px-3 py-1.5 text-center text-xs font-semibold text-muted hover:text-paper">Гарах</a>
        </div>
      </aside>

      <div className="lg:pl-60">
        {/* top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line bg-ink/85 px-4 py-3 backdrop-blur sm:px-6">
          <a href="/" className="flex items-center gap-2 font-black tracking-tight lg:hidden">
            <span className="grid size-8 place-items-center rounded-xl bg-brand text-sm">S</span>
            Storxon
          </a>
          <span className="hidden text-sm font-semibold text-muted lg:block">Сурагчийн самбар</span>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-line bg-ink-2 px-3 py-1 text-xs font-bold text-volt">{planLabel}</span>
            <a href="/account" title="Профайл" className="grid size-8 place-items-center rounded-full bg-brand text-xs font-bold">{firstName(me.email)[0]}</a>
            <a href="/logout" className="rounded-full border border-line bg-ink px-3 py-1.5 text-xs font-semibold text-muted hover:text-paper lg:hidden">Гарах</a>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 xl:grid-cols-[1fr_320px]">
          {/* main column */}
          <main className="min-w-0 space-y-6">
            {/* hero */}
            <section className="soft-bg relative overflow-hidden rounded-3xl border border-white p-6 shadow-sm sm:p-8">
              <div className="relative z-10 max-w-xl">
                <p className="text-sm font-semibold text-violet-700">Сайн байна уу,</p>
                <h1 className="mt-1 flex flex-wrap items-center gap-3 text-3xl font-black tracking-tight sm:text-4xl">
                  {firstName(me.email)}
                  <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-volt">{planLabel}</span>
                </h1>
                <p className="mt-3 text-muted">Мөрөөдлийнхөө төлөө өнөөдрийн эхний алхмаа хийцгээе.</p>

                <div className="mt-6 rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{finished ? "Сургалт дууслаа 🎉" : started ? "Үргэлжлүүлэх" : "Эхний хичээлээ эхлүүлээрэй"}</p>
                      <p className="text-xs text-muted">{done} / {TOTAL_LESSONS} видео хичээл · {pct}%</p>
                    </div>
                    <a href="/learn" className="shrink-0 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold shadow-md shadow-violet-500/25 hover:opacity-90">
                      {started ? "Үргэлжлүүлэх →" : "Эхлэх →"}
                    </a>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink-3">
                    <div className="h-full rounded-full bg-brand transition-[width] duration-700" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/kit/wave.webp" alt="" aria-hidden className="animate-float pointer-events-none absolute -right-4 -bottom-3 hidden w-40 select-none sm:block md:w-48" />
            </section>

            {/* curriculum */}
            <section>
              <div className="mb-3 flex items-end justify-between">
                <h2 className="text-lg font-black tracking-tight">Хөтөлбөр · {modules.length} модуль</h2>
                <a href="/learn" className="text-sm font-semibold text-volt">Бүгдийг үзэх →</a>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {modules.map((m) => (
                  <a
                    key={m.n}
                    href="/learn"
                    className={`group flex items-start gap-4 rounded-2xl border bg-ink p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                      m.highlight ? "border-violet-300" : "border-line"
                    }`}
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand font-black">
                      {String(m.n).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold leading-snug">{m.title}</span>
                      <span className="mt-0.5 block text-sm text-muted">{m.out}</span>
                    </span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="size-5 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-volt">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </a>
                ))}
              </div>
            </section>
          </main>

          {/* aside */}
          <aside className="space-y-6">
            <section className="rounded-3xl border border-line bg-ink p-6 text-center shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wide text-muted">Миний ахиц</h2>
              <div className="mt-4 grid place-items-center">
                <Ring pct={pct} />
              </div>
              <p className="mt-4 text-sm text-muted">
                {finished ? "Бүх хичээлээ дуусгалаа. Гайхалтай! 🎉" : `${TOTAL_LESSONS - done} хичээл үлдлээ. Үргэлжлүүлээрэй.`}
              </p>
            </section>

            <section className="relative overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 to-blue-50 p-6 shadow-sm">
              <p className="relative z-10 pr-16 text-lg font-black leading-snug">“{quote}”</p>
              <p className="relative z-10 mt-2 text-sm font-semibold text-violet-700">— Storxon</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/kit/wow.webp" alt="" aria-hidden className="animate-float pointer-events-none absolute -right-2 -bottom-2 w-20 select-none opacity-80" />
            </section>

            <section className="rounded-3xl border border-line bg-ink p-6 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wide text-muted">Бүртгэл</h2>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3"><dt className="text-muted">Имэйл</dt><dd className="truncate font-semibold">{me.email}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-muted">Багц</dt><dd className="font-semibold text-volt">{planLabel}</dd></div>
              </dl>
              <a href="/logout" className="mt-4 block rounded-xl border border-line px-4 py-2.5 text-center text-sm font-semibold text-muted hover:text-paper">Гарах</a>
              <p className="mt-3 text-center text-xs text-muted">Урьдчилсан бүртгэл {PRESALE.closes} хүртэл</p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
