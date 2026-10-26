"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function Forgot() {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const email = String(new FormData(e.currentTarget).get("email") || "").trim().toLowerCase();
    // After the user clicks the e-mailed link, /auth/callback signs them in and sends them
    // to /account, where they set a new password.
    const { error } = await supabaseBrowser().auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback?next=/account`,
    });
    setBusy(false);
    if (error) { setErr("Илгээж чадсангүй. Дахин оролдоно уу."); return; }
    setSent(true);
  }

  return (
    <main className="soft-bg grid min-h-screen place-items-center px-4 py-16">
      <div className="glass w-full max-w-md rounded-3xl border border-white p-8 shadow-xl shadow-violet-500/10">
        <a href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid size-8 place-items-center rounded-xl bg-brand text-sm shadow-md shadow-violet-500/30">S</span>
          Storxon
        </a>
        {sent ? (
          <div className="mt-8 text-center">
            <p className="text-2xl font-black">Имэйлээ шалгана уу</p>
            <p className="mt-3 text-muted">Нууц үг сэргээх холбоос илгээлээ. Холбоос дээр дарж шинэ нууц үгээ тохируулна уу.</p>
            <p className="mt-2 text-sm text-muted">Ирэхгүй бол Spam хавтсаа шалгаарай.</p>
            <a href="/login" className="mt-5 inline-block text-sm font-semibold text-violet-700">Нэвтрэх рүү буцах</a>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight">Нууц үг сэргээх</h1>
              <p className="mt-2 text-sm text-muted">Имэйлээ оруулбал нууц үг сэргээх холбоос илгээнэ.</p>
            </div>
            <input name="email" type="email" required autoComplete="email" placeholder="you@gmail.com"
              className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-paper outline-none transition focus:border-volt" />
            {err && <p className="text-sm text-ember" role="alert">{err}</p>}
            <button disabled={busy} className="w-full rounded-xl bg-brand px-5 py-3.5 font-semibold transition hover:opacity-90 disabled:opacity-60">
              {busy ? "Илгээж байна…" : "Холбоос илгээх"}
            </button>
            <p className="text-center text-sm text-muted"><a href="/login" className="font-semibold text-violet-700">Нэвтрэх рүү буцах</a></p>
          </form>
        )}
      </div>
    </main>
  );
}
