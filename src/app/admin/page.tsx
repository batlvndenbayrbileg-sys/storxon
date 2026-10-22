"use client";

import { useCallback, useEffect, useState } from "react";
import { fmt } from "@/lib/content";

type Preorder = { id: string; name: string; phone: string; plan: string; segment: string; status: string; created_at: string };
type Order = { id: string; email: string; name: string; phone: string; plan: string; amount: number; status: string; created_at: string; paid_at: string | null };
type Enrollment = { email: string; plan: string; created_at: string };
type Data = { email: string; preorders: Preorder[]; orders: Order[]; enrollments: Enrollment[] };

const dt = (s: string | null) => (s ? new Date(s).toLocaleString("en-CA", { hour12: false }).replace(",", "") : "—");

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-2xl font-black text-paper">{value}</p>
    </div>
  );
}

function Pill({ s }: { s: string }) {
  const tone =
    s === "paid" ? "bg-emerald-100 text-emerald-700"
    : s === "pending" || s === "new" ? "bg-amber-100 text-amber-700"
    : s === "invoiced" ? "bg-blue-100 text-blue-700"
    : "bg-zinc-200 text-zinc-600";
  return <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${tone}`}>{s}</span>;
}

export default function Admin() {
  const [data, setData] = useState<Data | null>(null);
  const [err, setErr] = useState("");

  // grant-access form
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("standard");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    const r = await fetch("/api/admin/data", { cache: "no-store" });
    if (r.status === 401) { location.assign("/login?next=/admin"); return; }
    if (r.status === 403) { setErr("Энэ хаягт админ эрх алга."); return; }
    if (!r.ok) { setErr("Ачаалж чадсангүй."); return; }
    setData(await r.json());
  }, []);

  useEffect(() => { load().catch(() => setErr("Ачаалж чадсангүй.")); }, [load]);

  async function grant(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setMsg("");
    try {
      const r = await fetch("/api/admin/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, plan }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Алдаа гарлаа.");
      setMsg(`${j.email} хүнд ${j.plan} эрх олголоо.`);
      setEmail("");
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Алдаа гарлаа.");
    } finally {
      setBusy(false);
    }
  }

  async function revoke(targetEmail: string) {
    if (!confirm(`${targetEmail} хүний эрхийг хасах уу?`)) return;
    await fetch(`/api/admin/enroll?email=${encodeURIComponent(targetEmail)}`, { method: "DELETE" });
    await load();
  }

  if (err) {
    return (
      <main className="soft-bg grid min-h-screen place-items-center px-4">
        <div className="glass rounded-3xl border border-white p-8 text-center">
          <p className="text-lg font-semibold text-ember">{err}</p>
          <a href="/login?next=/admin" className="mt-4 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-semibold">Нэвтрэх</a>
        </div>
      </main>
    );
  }

  if (!data) {
    return <main className="soft-bg grid min-h-screen place-items-center px-4 text-muted">Ачаалж байна…</main>;
  }

  const paidCount = data.orders.filter((o) => o.status === "paid").length;
  const revenue = data.orders.filter((o) => o.status === "paid").reduce((a, o) => a + o.amount, 0);
  const input = "rounded-xl border border-line bg-ink px-4 py-2.5 text-paper outline-none transition focus:border-volt";

  return (
    <main className="soft-bg min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Админ самбар</h1>
            <p className="text-sm text-muted">{data.email}</p>
          </div>
          <div className="flex gap-2">
            <a href="/learn" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold">Хичээл үзэх</a>
            <a href="/" className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold">Нүүр</a>
            <a href="/logout" className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold">Гарах</a>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Урьдчилсан бүртгэл" value={data.preorders.length} />
          <Stat label="Захиалга" value={data.orders.length} />
          <Stat label="Төлсөн" value={paidCount} />
          <Stat label="Орлого (төлсөн)" value={fmt(revenue)} />
        </div>

        {/* Grant access by hand */}
        <section className="mt-8 rounded-2xl border border-line bg-white p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted">Эрх гараар олгох</h2>
          <p className="mt-1 text-sm text-muted">Имэйлд сургалтын эрх нэмнэ. Тухайн хүн тэр имэйлээрээ бүртгэл үүсгээд (/signup) хичээлээ үзнэ.</p>
          <form onSubmit={grant} className="mt-4 flex flex-wrap items-center gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hayg@gmail.com"
              className={`${input} min-w-[240px] flex-1`}
            />
            <select value={plan} onChange={(e) => setPlan(e.target.value)} className={input}>
              <option value="standard">Стандарт</option>
              <option value="pro">Pro</option>
            </select>
            <button disabled={busy} className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold transition hover:opacity-90 disabled:opacity-60">
              {busy ? "Олгож байна…" : "Эрх олгох"}
            </button>
          </form>
          {msg && <p className="mt-3 text-sm text-paper">{msg}</p>}
        </section>

        <Section title={`Захиалга · ${data.orders.length}`}>
          <Table head={["Огноо", "Нэр", "Имэйл", "Утас", "Багц", "Дүн", "Төлөв", "Төлсөн"]}>
            {data.orders.map((o) => (
              <tr key={o.id} className="border-t border-line">
                <Td>{dt(o.created_at)}</Td><Td>{o.name}</Td><Td>{o.email}</Td><Td>{o.phone}</Td>
                <Td>{o.plan}</Td><Td>{fmt(o.amount)}</Td><Td><Pill s={o.status} /></Td><Td>{dt(o.paid_at)}</Td>
              </tr>
            ))}
          </Table>
        </Section>

        <Section title={`Урьдчилсан бүртгэл · ${data.preorders.length}`}>
          <Table head={["Огноо", "Нэр", "Утас", "Багц", "Сегмент", "Төлөв"]}>
            {data.preorders.map((p) => (
              <tr key={p.id} className="border-t border-line">
                <Td>{dt(p.created_at)}</Td><Td>{p.name}</Td><Td>{p.phone}</Td>
                <Td>{p.plan}</Td><Td>{p.segment}</Td><Td><Pill s={p.status} /></Td>
              </tr>
            ))}
          </Table>
        </Section>

        <Section title={`Сургалтын эрх (enrollments) · ${data.enrollments.length}`}>
          <Table head={["Огноо", "Имэйл", "Багц", ""]}>
            {data.enrollments.map((e) => (
              <tr key={e.email} className="border-t border-line">
                <Td>{dt(e.created_at)}</Td><Td>{e.email}</Td><Td>{e.plan}</Td>
                <Td>
                  <button onClick={() => revoke(e.email)} className="rounded-lg border border-line px-2.5 py-1 text-xs font-semibold text-ember hover:bg-ember/10">
                    Хасах
                  </button>
                </Td>
              </tr>
            ))}
          </Table>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">{title}</h2>
      <div className="overflow-x-auto rounded-2xl border border-line bg-white">{children}</div>
    </section>
  );
}

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <table className="w-full min-w-[640px] text-left text-sm">
      <thead>
        <tr className="text-xs text-muted">
          {head.map((h, i) => <th key={i} className="px-4 py-3 font-medium">{h}</th>)}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 text-paper">{children}</td>;
}
