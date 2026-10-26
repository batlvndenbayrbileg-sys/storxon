"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

type Me = { email: string; plan: string | null; enrolled: boolean; isAdmin: boolean };

export default function Account() {
  const [me, setMe] = useState<Me | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/me", { cache: "no-store" });
      if (r.status === 401) { location.assign("/login?next=/account"); return; }
      if (r.ok) setMe(await r.json());
    })().catch(() => {});
  }, []);

  async function changePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    const fd = new FormData(e.currentTarget);
    const pw = String(fd.get("password") || "");
    const pw2 = String(fd.get("confirm") || "");
    if (pw.length < 6) { setMsg({ ok: false, text: "Нууц үг дор хаяж 6 тэмдэгт байна." }); return; }
    if (pw !== pw2) { setMsg({ ok: false, text: "Нууц үг таарахгүй байна." }); return; }
    setBusy(true);
    const { error } = await supabaseBrowser().auth.updateUser({ password: pw });
    setBusy(false);
    if (error) { setMsg({ ok: false, text: "Шинэчилж чадсангүй. Дахин нэвтэрч үзээрэй." }); return; }
    (e.currentTarget as HTMLFormElement).reset();
    setMsg({ ok: true, text: "Нууц үг шинэчлэгдлээ." });
  }

  const planLabel = me?.plan === "pro" ? "Pro" : me?.plan === "standard" ? "Стандарт" : me?.isAdmin ? "Админ" : "—";
  const input = "w-full rounded-xl border border-line bg-ink px-4 py-3 text-paper outline-none transition focus:border-volt";

  return (
    <main className="soft-bg min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-lg">
        <div className="flex items-center justify-between">
          <a href="/dashboard" className="flex items-center gap-2 text-sm font-semibold text-muted hover:text-paper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="size-4"><path d="M15 6l-6 6 6 6" /></svg>
            Самбар
          </a>
          <a href="/logout" className="text-sm font-semibold text-muted hover:text-paper">Гарах</a>
        </div>

        <h1 className="mt-6 text-2xl font-black tracking-tight">Миний бүртгэл</h1>

        <section className="mt-5 rounded-3xl border border-line bg-ink p-6 shadow-sm">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-3"><dt className="text-muted">Имэйл</dt><dd className="truncate font-semibold">{me?.email ?? "…"}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-muted">Багц</dt><dd className="font-semibold text-volt">{planLabel}</dd></div>
          </dl>
        </section>

        <section className="mt-5 rounded-3xl border border-line bg-ink p-6 shadow-sm">
          <h2 className="font-bold">Нууц үг солих</h2>
          <form onSubmit={changePassword} className="mt-4 space-y-3">
            <input name="password" type="password" required minLength={6} autoComplete="new-password" placeholder="Шинэ нууц үг" className={input} />
            <input name="confirm" type="password" required minLength={6} autoComplete="new-password" placeholder="Шинэ нууц үг (дахин)" className={input} />
            {msg && <p className={`text-sm font-semibold ${msg.ok ? "text-green-600" : "text-ember"}`} role="alert">{msg.text}</p>}
            <button disabled={busy} className="w-full rounded-xl bg-brand px-5 py-3 font-semibold transition hover:opacity-90 disabled:opacity-60">
              {busy ? "Хадгалж байна…" : "Нууц үг хадгалах"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
