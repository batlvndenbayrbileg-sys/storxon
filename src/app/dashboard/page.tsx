"use client";

import { useEffect, useState } from "react";
import { modules } from "@/lib/content";

type Me = { email: string; name: string | null; plan: string | null; enrolled: boolean; isAdmin: boolean };

// The course player (private/course.html) marks finished lessons in localStorage["sx-done"].
const TOTAL_LESSONS = 71;

// One soft, layered shadow used across every card — hairline + lift, no hard borders.
const CARD = "rounded-[22px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_14px_34px_-22px_rgba(17,17,26,0.22)]";
const ACCENT = "#6d48f0";

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

const isoDay = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Records today in localStorage["sx-days"] and returns the current streak + this week. */
function computeStreak(): { week: boolean[]; days: number; weekCount: number } {
  let days: string[] = [];
  try { const raw = localStorage.getItem("sx-days"); const p = raw ? JSON.parse(raw) : []; if (Array.isArray(p)) days = p; } catch {}
  const today = new Date(), t = isoDay(today);
  if (!days.includes(t)) { days = [...days, t].slice(-400); try { localStorage.setItem("sx-days", JSON.stringify(days)); } catch {} }
  const set = new Set(days);
  let streak = 0; const cur = new Date(today);
  while (set.has(isoDay(cur))) { streak++; cur.setDate(cur.getDate() - 1); }
  const dow = (today.getDay() + 6) % 7, monday = new Date(today); monday.setDate(today.getDate() - dow);
  const week: boolean[] = [];
  for (let i = 0; i < 7; i++) { const dd = new Date(monday); dd.setDate(monday.getDate() + i); week.push(set.has(isoDay(dd))); }
  return { week, days: streak, weekCount: week.filter(Boolean).length };
}

function Ring({ pct, size = 128 }: { pct: number; size?: number }) {
  const r = (size - 14) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ececf1" strokeWidth="7" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={ACCENT} strokeWidth="7" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset .9s cubic-bezier(.2,.7,.2,1)" }}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill="#1d1d1f" fontWeight="600" style={{ fontSize: size * 0.24, letterSpacing: "-0.02em" }}>
        {pct}%
      </text>
    </svg>
  );
}

const PlayIcon = ({ className = "size-[18px]" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" /></svg>
);

const NAV = [
  { label: "Нүүр", href: "/dashboard", active: true, icon: "M3 10.5 12 3l9 7.5M5.5 9.5V20a1 1 0 0 0 1 1H10v-5h4v5h3.5a1 1 0 0 0 1-1V9.5" },
  { label: "Сургалт", href: "/learn", icon: "M4 5.5h16M4 12h16M4 18.5h11" },
  { label: "Үнэ", href: "/#pricing", icon: "M12 3v18M16.5 6.5H9.75a3.25 3.25 0 0 0 0 6.5h4.5a3.25 3.25 0 0 1 0 6.5H7" },
];

function NavLink({ label, href, icon, active }: { label: string; href: string; icon: string; active?: boolean }) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition ${
        active ? "bg-[#6d48f0]/10 text-volt" : "text-[#6e6e73] hover:bg-black/[0.04] hover:text-[#1d1d1f]"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-[19px]">
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
  const [streak, setStreak] = useState<{ week: boolean[]; days: number; weekCount: number } | null>(null);

  useEffect(() => {
    setDone(readDone());
    setStreak(computeStreak());
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
    return <main className="grid min-h-screen place-items-center bg-[#f5f5f7] px-4 text-[#6e6e73]">Ачаалж чадсангүй. Дахин оролдоно уу.</main>;
  }

  if (err === "noaccess") {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f5f7] px-4">
        <div className={`${CARD} max-w-md p-9 text-center`}>
          <h1 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">Сургалтын эрх алга</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[#6e6e73]">{me?.email} хаягт сургалтын эрх олгогдоогүй байна. Багцаа аваад эхлээрэй.</p>
          <a href="/#register" className="mt-6 inline-block rounded-full bg-volt px-6 py-3 text-[15px] font-medium text-white transition hover:bg-[#5b39e0]">Сургалтад бүртгүүлэх</a>
          <a href="/logout" className="mt-3 block text-sm font-medium text-[#6e6e73] hover:text-[#1d1d1f]">Гарах</a>
        </div>
      </main>
    );
  }

  if (!me) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f5f7]">
        <div className="size-7 animate-spin rounded-full border-2 border-black/10 border-t-[#6d48f0]" aria-label="Ачаалж байна" />
      </main>
    );
  }

  const pct = Math.round((Math.min(done, TOTAL_LESSONS) / TOTAL_LESSONS) * 100);
  const started = done > 0;
  const finished = done >= TOTAL_LESSONS;
  const planLabel = me.plan === "pro" ? "Pro" : me.plan === "standard" ? "Стандарт" : me.isAdmin ? "Админ" : "—";
  const displayName = (me.name && me.name.trim()) || firstName(me.email);
  const ctaText = finished ? "Дахин үзэх" : started ? "Үргэлжлүүлэх" : "Эхлэх";

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      {/* sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-white/70 px-4 py-5 backdrop-blur-xl lg:flex">
        <a href="/" className="flex items-center gap-2.5 px-2 text-[17px] font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-[10px] bg-volt text-sm font-bold text-white">S</span>
          Storxon
        </a>
        <nav className="mt-8 flex flex-col gap-1">
          {NAV.map((n) => <NavLink key={n.href} {...n} />)}
          {me.isAdmin && <NavLink label="Админ" href="/admin" icon="M12 3l7.5 3v5.5c0 4.5-3.2 7.3-7.5 9-4.3-1.7-7.5-4.5-7.5-9V6L12 3z" />}
        </nav>
        <a href="/account" className="mt-auto flex items-center gap-3 rounded-2xl p-2.5 transition hover:bg-black/[0.04]">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-volt/10 text-sm font-semibold text-volt">{displayName[0]}</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium">{displayName}</span>
            <span className="block truncate text-xs text-[#6e6e73]">Профайл</span>
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-4 text-[#b0b0b8]"><path d="M9 6l6 6-6 6" /></svg>
        </a>
      </aside>

      <div className="lg:pl-64">
        {/* top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-black/[0.06] bg-[#f5f5f7]/80 px-5 py-3.5 backdrop-blur-xl sm:px-7">
          <a href="/" className="flex items-center gap-2 text-[16px] font-semibold tracking-tight lg:hidden">
            <span className="grid size-7 place-items-center rounded-lg bg-volt text-xs font-bold text-white">S</span>
            Storxon
          </a>
          <span className="hidden text-[15px] font-medium text-[#6e6e73] lg:block">Нүүр</span>
          <div className="flex items-center gap-2.5">
            <span className="rounded-full bg-volt/10 px-3 py-1 text-xs font-semibold text-volt">{planLabel}</span>
            <a href="/account" title="Профайл" className="grid size-8 place-items-center rounded-full bg-volt/10 text-xs font-semibold text-volt">{displayName[0]}</a>
            <a href="/logout" className="rounded-full px-2.5 py-1.5 text-sm font-medium text-[#6e6e73] hover:text-[#1d1d1f] lg:hidden">Гарах</a>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1180px] gap-5 px-5 py-7 sm:px-7 sm:py-9 xl:grid-cols-[1fr_340px]">
          {/* main column */}
          <main className="min-w-0 space-y-5">
            {/* hero + primary action */}
            <section className={`${CARD} p-7 sm:p-9`}>
              <p className="text-[15px] text-[#6e6e73]">Сайн байна уу</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-3">
                <h1 className="text-[34px] font-semibold leading-none tracking-[-0.02em] sm:text-[40px]">{displayName}</h1>
                <span className="rounded-full bg-volt/10 px-3 py-1 text-[13px] font-semibold text-volt">{planLabel}</span>
              </div>
              <p className="mt-3.5 max-w-md text-[15px] leading-relaxed text-[#6e6e73]">
                Видео хичээлээ үргэлжлүүл. Явцаа энэ хуудаснаас хараарай.
              </p>

              <div className="mt-7 flex flex-col gap-5 rounded-[18px] bg-[#f5f5f7] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-[#6e6e73]">
                    {finished ? "Бүх хичээл дууслаа" : started ? "Дараагийн алхам" : "Эндээс эхэл"}
                  </p>
                  <p className="mt-0.5 text-[17px] font-semibold tracking-tight">
                    {finished ? "Хүссэн үедээ эргэн үзээрэй" : started ? "Видео хичээлээ үргэлжлүүл" : "Эхний видео хичээл"}
                  </p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/[0.07]">
                    <div className="h-full rounded-full bg-volt transition-[width] duration-700" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mt-2 text-[13px] text-[#86868b]">{done} / {TOTAL_LESSONS} хичээл · {pct}%</p>
                </div>
                <a href="/learn" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-volt px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(109,72,240,0.7)] transition hover:bg-[#5b39e0] active:scale-[0.98]">
                  <PlayIcon />
                  {ctaText}
                </a>
              </div>
            </section>

            {/* how it works — clear at a glance */}
            <section className="grid gap-4 sm:grid-cols-3">
              {[
                { n: "01", t: "Видео хичээлээ үз", d: "AI туслахтай, алхам алхмаар." },
                { n: "02", t: "Дэлгүүрээ бүтээ", d: "Хичээл бүр нэг хэсгийг нь хийнэ." },
                { n: "03", t: "Интернэтэд гаргая", d: "Домэйн холбож, захиалга авна." },
              ].map((x) => (
                <div key={x.n} className={`${CARD} p-5`}>
                  <span className="text-[13px] font-semibold tracking-wide text-volt">{x.n}</span>
                  <p className="mt-2 text-[15px] font-semibold tracking-tight">{x.t}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-[#6e6e73]">{x.d}</p>
                </div>
              ))}
            </section>

            {/* curriculum */}
            <section>
              <div className="flex items-end justify-between px-1">
                <h2 className="text-[19px] font-semibold tracking-tight">Хөтөлбөр</h2>
                <a href="/learn" className="text-[14px] font-medium text-volt hover:opacity-80">Бүгдийг үзэх</a>
              </div>
              <p className="mt-1 px-1 text-[13.5px] text-[#86868b]">Картан дээр дарвал видео хичээл нээгдэнэ.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {modules.map((m) => (
                  <a key={m.n} href="/learn" className={`${CARD} group flex items-center gap-4 p-4 transition hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-20px_rgba(17,17,26,0.3)]`}>
                    <span className="grid size-10 shrink-0 place-items-center rounded-[13px] bg-volt/10 text-[14px] font-semibold text-volt">
                      {String(m.n).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-semibold tracking-tight">{m.title}</span>
                      <span className="mt-0.5 block truncate text-[13px] text-[#86868b]">{m.out}</span>
                    </span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-[18px] shrink-0 text-[#c7c7cc] transition group-hover:translate-x-0.5 group-hover:text-volt"><path d="M9 6l6 6-6 6" /></svg>
                  </a>
                ))}
              </div>
            </section>
          </main>

          {/* aside */}
          <aside className="space-y-5">
            <section className={`${CARD} p-7 text-center`}>
              <h2 className="text-[13px] font-semibold tracking-wide text-[#86868b]">Нийт явц</h2>
              <div className="mt-5 grid place-items-center">
                <Ring pct={pct} />
              </div>
              <p className="mt-5 text-[14px] leading-relaxed text-[#6e6e73]">
                {finished ? "Бүх хичээлээ дуусгалаа." : `Дахин ${TOTAL_LESSONS - done} хичээл үзэхэд дуусна.`}
              </p>
            </section>

            {streak && (
              <section className={`${CARD} p-6`}>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-[13px] font-semibold tracking-wide text-[#86868b]">Идэвх</h2>
                  <span className="text-[15px] font-semibold text-[#1d1d1f]">{streak.days} <span className="text-[#86868b]">өдөр</span></span>
                </div>
                <div className="mt-5 flex justify-between">
                  {streak.week.map((on, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <span className={`size-7 rounded-full transition ${on ? "bg-volt" : "bg-black/[0.06]"}`} />
                      <span className="text-[11px] text-[#86868b]">{["Да", "Мя", "Лх", "Пү", "Ба", "Бя", "Ня"][i]}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className={`${CARD} p-6`}>
              <h2 className="text-[13px] font-semibold tracking-wide text-[#86868b]">Бүртгэл</h2>
              <dl className="mt-4 space-y-3 text-[14px]">
                <div className="flex items-center justify-between gap-3"><dt className="text-[#86868b]">Имэйл</dt><dd className="truncate font-medium">{me.email}</dd></div>
                <div className="flex items-center justify-between gap-3"><dt className="text-[#86868b]">Багц</dt><dd className="font-semibold text-volt">{planLabel}</dd></div>
              </dl>
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <a href="/account" className="rounded-xl bg-black/[0.04] px-4 py-2.5 text-center text-[13.5px] font-medium text-[#1d1d1f] transition hover:bg-black/[0.07]">Профайл</a>
                <a href="/logout" className="rounded-xl bg-black/[0.04] px-4 py-2.5 text-center text-[13.5px] font-medium text-[#6e6e73] transition hover:bg-black/[0.07]">Гарах</a>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
