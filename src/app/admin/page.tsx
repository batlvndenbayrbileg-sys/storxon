"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/admin/data", { cache: "no-store" });
        if (r.status === 401) { location.assign("/login?next=/admin"); return; }
        if (r.status === 403) { setErr("Энэ хаягт админ эрх алга."); return; }
        if (!r.ok) { setErr("Ачаалж чадсангүй."); return; }
        setData(await r.json());
      } catch {
        setErr("Ачаалж чадсангүй.");
      }
    })();
  }, []);

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

  return (
    <main className="soft-bg min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Админ самбар</h1>
            <p className="text-sm text-muted">{data.email}</p>
          </div>
          <div className="flex gap-2">
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
          <Table head={["Огноо", "Имэйл", "Багц"]}>
            {data.enrollments.map((e) => (
              <tr key={e.email} className="border-t border-line">
                <Td>{dt(e.created_at)}</Td><Td>{e.email}</Td><Td>{e.plan}</Td>
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
          {head.map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 text-paper">{children}</td>;
}
