"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";

/** Only a same-site path is an acceptable post-signup destination. */
function safeNext(raw: string | null) {
  const n = raw || "/dashboard";
  return /^\/(?![/\\])/.test(n) ? n : "/learn";
}

function SignupForm() {
  const params = useSearchParams();
  const prefillEmail = params.get("email") || "";
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [check, setCheck] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim().toLowerCase();
    const password = String(fd.get("password") || "");
    if (password.length < 6) {
      setErr("Нууц үг дор хаяж 6 тэмдэгт байна.");
      return;
    }
    setBusy(true);
    const next = safeNext(params.get("next"));
    const { data, error } = await supabaseBrowser().auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    setBusy(false);
    if (error) {
      setErr(
        /registered|exists/i.test(error.message)
          ? "Энэ имэйлээр бүртгэл аль хэдийн үүссэн байна. Нэвтэрнэ үү."
          : "Бүртгэл үүсгэж чадсангүй. Дахин оролдоно уу."
      );
      return;
    }
    // Email confirmation OFF → a session comes back immediately; ON → ask them to confirm.
    if (data.session) location.assign(next);
    else setCheck(true);
  }

  if (check) {
    return (
      <div className="mt-8 text-center">
        <p className="text-2xl font-black">Имэйлээ баталгаажуулна уу</p>
        <p className="mt-3 text-muted">Баталгаажуулах холбоос илгээлээ. Холбоос дээр дарсны дараа нэвтэрч видео хичээлүүд нээгдэнэ.</p>
        <p className="mt-2 text-sm text-muted">Ирэхгүй бол Spam хавтсаа шалгаарай.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-4">
      <div>
        <h1 className="text-2xl font-black tracking-tight">Бүртгэл үүсгэх</h1>
        <p className="mt-2 text-sm text-muted">Төлбөр төлсөн имэйлээрээ бүртгэл үүсгэнэ үү. Үүний дараа видео хичээлүүд нээгдэнэ.</p>
      </div>
      <input
        name="email"
        type="email"
        required
        defaultValue={prefillEmail}
        autoComplete="email"
        placeholder="you@gmail.com"
        className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-paper outline-none transition focus:border-volt"
      />
      <input
        name="password"
        type="password"
        required
        minLength={6}
        autoComplete="new-password"
        placeholder="Нууц үг (дор хаяж 6 тэмдэгт)"
        className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-paper outline-none transition focus:border-volt"
      />
      {err && <p className="text-sm text-ember" role="alert">{err}</p>}
      <button disabled={busy} className="w-full rounded-xl bg-brand px-5 py-3.5 font-semibold transition hover:opacity-90 disabled:opacity-60">
        {busy ? "Үүсгэж байна…" : "Бүртгэл үүсгэх"}
      </button>
      <p className="text-center text-sm text-muted">
        Бүртгэлтэй юу? <a href="/login" className="font-semibold text-violet-700">Нэвтрэх</a>
      </p>
    </form>
  );
}

export default function Signup() {
  return (
    <main className="soft-bg grid min-h-screen place-items-center px-4 py-16">
      <div className="glass w-full max-w-md rounded-3xl border border-white p-8 shadow-xl shadow-violet-500/10">
        <a href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid size-8 place-items-center rounded-xl bg-brand text-sm shadow-md shadow-violet-500/30">S</span>
          Storxon
        </a>
        <Suspense>
          <SignupForm />
        </Suspense>
      </div>
    </main>
  );
}
