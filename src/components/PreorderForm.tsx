"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

export default function PreorderForm({ defaultPlan = "standard" }: { defaultPlan?: "standard" | "pro" }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Алдаа гарлаа. Дахин оролдоно уу.");
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Алдаа гарлаа.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-volt/40 bg-volt/10 p-6 text-center">
        <p className="text-lg font-semibold text-volt">Бүртгэл амжилттай!</p>
        <p className="mt-2 text-sm text-muted">
          24 цагийн дотор төлбөрийн мэдээллийг утсаар чинь илгээнэ.
        </p>
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
          <option value="standard">Стандарт — 145,000₮</option>
          <option value="pro">Pro — 345,000₮</option>
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
        className="w-full rounded-xl bg-volt px-5 py-3.5 font-semibold text-volt-ink transition hover:brightness-95 disabled:opacity-60"
      >
        {status === "sending" ? "Илгээж байна…" : "Урьдчилж бүртгүүлэх"}
      </button>
      {status === "error" && <p className="text-sm text-ember" role="alert">{message}</p>}
      <p className="text-xs text-muted">
        Таны мэдээллийг зөвхөн бүртгэл баталгаажуулахад ашиглана.
      </p>
    </form>
  );
}
