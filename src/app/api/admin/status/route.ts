import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin";
import type { PlanId } from "@/lib/pricing";

const STATUSES: Record<string, string[]> = {
  preorders: ["new", "invoiced", "paid", "cancelled"],
  orders: ["pending", "paid", "cancelled"],
};

async function requireAdmin(): Promise<boolean> {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  return isAdmin(user?.email);
}

/**
 * Admin changes a row's status by hand: POST { table, id, status }.
 * For an order flipped to "paid" we also stamp paid_at and grant the enrollment,
 * so an offline/manual payment opens /learn just like a QPay one.
 */
export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  let body: { table?: string; id?: string; status?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Буруу хүсэлт." }, { status: 400 }); }
  const table = String(body.table ?? "");
  const id = String(body.id ?? "");
  const status = String(body.status ?? "");
  if (!STATUSES[table] || !STATUSES[table].includes(status)) return NextResponse.json({ error: "Буруу утга." }, { status: 400 });
  if (!/^[0-9a-f-]{36}$/.test(id)) return NextResponse.json({ error: "Буруу id." }, { status: 400 });

  const db = supabaseAdmin();

  if (table === "orders" && status === "paid") {
    const { data: o } = await db.from("orders").select("email, plan").eq("id", id).maybeSingle<{ email: string; plan: PlanId }>();
    if (!o) return NextResponse.json({ error: "Олдсонгүй." }, { status: 404 });
    await db.from("orders").update({ status: "paid", paid_at: new Date().toISOString() }).eq("id", id);
    await db.from("enrollments").upsert({ email: o.email.toLowerCase(), plan: o.plan, order_id: id });
    return NextResponse.json({ ok: true });
  }

  const { error } = await db.from(table).update({ status }).eq("id", id);
  if (error) { console.error("admin status update failed", error); return NextResponse.json({ error: "Хадгалж чадсангүй." }, { status: 500 }); }
  return NextResponse.json({ ok: true });
}
