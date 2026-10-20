"use client";

import { useEffect, useState } from "react";
import { fmt } from "@/lib/content";
import type { PlanPrice } from "@/lib/pricing";

type Status = "idle" | "sending" | "qr" | "paid" | "error";
type Invoice = { orderId: string; amount: number; qr: string; banks: { name: string; logo: string | null; link: string }[] };

/** `prices` comes from the server (priceList()) so the amount shown is the amount charged. */
export default function PreorderForm({ prices, defaultPlan = "standard" }: { prices: PlanPrice[]; defaultPlan?: "standard" | "pro" }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [inv, setInv] = useState<Invoice | null>(null);
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setEmail(String(data.email || "").trim().toLowerCase());
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Алдаа гарлаа. Дахин оролдоно уу.");
      setInv(json);
      setStatus("qr");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Алдаа гарлаа.");
    }
  }

  // After the QR is shown, ask the server every 4 s whether the gateway has the payment (stops after 15 min).
  useEffect(() => {
    if (status !== "qr" || !inv) return;
    const started = Date.now();
    const t = setInterval(async () => {
      if (Date.now() - started > 15 * 60_000) return clearInterval(t);
      try {
        const r = await fetch(`/api/orders/${inv.orderId}`, { cache: "no-store" });
        const j = await r.json();
        if (j.status === "paid") setStatus("paid");
      } catch {}
    }, 4000);
    return () => clearInterval(t);
  }, [status, inv]);

  if (status === "paid") {
    return (
      <div className="rounded-2xl border border-volt/40 bg-volt/10 p-6 text-center">
        <p className="text-lg font-semibold text-brand">Төлбөр амжилттай!</p>
        <p className="mt-2 text-sm text-muted">
          Одоо энэ имэйлээрээ бүртгэл үүсгэнэ үү. Нууц үгээ тохируулмагц видео хичээлүүд нээгдэнэ.
        </p>
        <a
          href={`/signup?email=${encodeURIComponent(email)}`}
          className="mt-5 inline-block rounded-full bg-brand px-5 py-3 text-sm font-semibold hover:opacity-90"
        >
          Бүртгэл үүсгэх
        </a>
        <p className="mt-3 text-xs text-muted">
          Бүртгэлтэй болсон бол <a href="/login" className="font-semibold text-violet-700">нэвтрэх</a>.
        </p>
      </div>
    );
  }

  if (status === "qr" && inv) {
    return (
      <div className="text-center">
        <p className="text-lg font-semibold">QPay-ээр төлөх · {fmt(inv.amount)}</p>
        <p className="mt-1 text-sm text-muted">Банкны аппаараа QR-ыг уншуулна уу.</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={inv.qr} alt="Төлбөрийн QR" className="mx-auto mt-4 size-56 rounded-2xl border border-line bg-white" />
        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted">
          <span className="size-2.5 animate-pulse rounded-full bg-amber-400" /> Төлбөр хүлээж байна…
        </p>
        {inv.banks.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {inv.banks.map((b) => (
              <a key={b.name} href={b.link} className="flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-1.5 text-xs font-semibold">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {b.logo && <img src={b.logo} alt="" className="size-5 rounded-md" />}
                {b.name}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  const input =
    "w-full rounded-xl border border-line bg-ink px-4 py-3 text-paper placeholder:text-muted/60 outline-none transition focus:border-volt";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-muted">Нэр</label>
        <input id="name" name="name" required maxLength={80} placeholder="Таны нэр" className={input} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-muted">Имэйл</label>
        <input id="email" name="email" type="email" required maxLength={120} placeholder="you@gmail.com" autoComplete="email" className={input} />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm text-muted">Утасны дугаар</label>
        <input
          id="phone"
          name="phone"
          required
          inputMode="numeric"
          pattern="[0-9]{8}"
          title="8 оронтой утасны дугаар"
          placeholder="99112233"
          className={input}
        />
      </div>
      <div>
        <label htmlFor="plan" className="mb-1 block text-sm text-muted">Багц</label>
        <select id="plan" name="plan" defaultValue={defaultPlan} className={input}>
          {prices.map((p) => (
            <option key={p.id} value={p.id}>{p.name} — {fmt(p.amount)}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="segment" className="mb-1 block text-sm text-muted">Та хэн бэ?</label>
        <select id="segment" name="segment" defaultValue="student" className={input}>
          <option value="highschool">Ахлах ангийн сурагч</option>
          <option value="student">Их сургуулийн оюутан</option>
          <option value="business">Бизнес эрхлэгч</option>
          <option value="career">Мэргэжлээ солихыг хүсэгч</option>
          <option value="other">Бусад</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl bg-brand px-5 py-3.5 font-semibold transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "QR үүсгэж байна…" : "Бүртгүүлээд QPay-ээр төлөх"}
      </button>
      {status === "error" && <p className="text-sm text-ember" role="alert">{message}</p>}
      <p className="text-xs text-muted">
        Төлбөр хийгдмэгц видео хичээл рүү нэвтрэх холбоос имэйлээр очно. Таны мэдээллийг зөвхөн бүртгэлд ашиглана.
      </p>
    </form>
  );
}
