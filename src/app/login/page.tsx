"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

/** Only a same-site path is an acceptable post-login destination. */
function safeNext() {
  const n = new URLSearchParams(location.search).get("next") || "/learn";
  return /^\/(?![/\\])/.test(n) ? n : "/learn";
}

export default function Login() {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim().toLowerCase();
    const password = String(fd.get("password") || "");
    const { error } = await supabaseBrowser().auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      setErr("Имэйл эсвэл нууц үг буруу байна. Эсвэл бүртгэлээ хараахан үүсгээгүй байж магадгүй.");
      return;
    }
    location.assign(safeNext());
  }

  return (
    <main className="soft-bg grid min-h-screen place-items-center px-4 py-16">
      <div className="glass w-full max-w-md rounded-3xl border border-white p-8 shadow-xl shadow-violet-500/10">
        <a href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid size-8 place-items-center rounded-xl bg-brand text-sm shadow-md shadow-violet-500/30">S</span>
          Storxon
        </a>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Сурагч нэвтрэх</h1>
            <p className="mt-2 text-sm text-muted">Төлбөр төлсөн имэйл, нууц үгээрээ нэвтэрнэ үү.</p>
          </div>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@gmail.com"
            className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-paper outline-none transition focus:border-volt"
          />
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Нууц үг"
            className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-paper outline-none transition focus:border-volt"
          />
          {err && <p className="text-sm text-ember" role="alert">{err}</p>}
          <button disabled={busy} className="w-full rounded-xl bg-brand px-5 py-3.5 font-semibold transition hover:opacity-90 disabled:opacity-60">
            {busy ? "Нэвтэрч байна…" : "Нэвтрэх"}
          </button>
          <p className="text-center text-sm text-muted">
            Төлбөр төлсөн ч бүртгэл үүсгээгүй юу?{" "}
            <a href="/signup" className="font-semibold text-violet-700">Бүртгэл үүсгэх</a>
          </p>
        </form>
      </div>
    </main>
  );
}
