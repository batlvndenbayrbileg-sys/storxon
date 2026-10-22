import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin";

/** True only for a signed-in user on the ADMIN_EMAILS allowlist. */
async function requireAdmin(): Promise<boolean> {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  return isAdmin(user?.email);
}

/** Grant (or upgrade) course access for an e-mail by hand. */
export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  let body: { email?: string; plan?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Буруу хүсэлт." }, { status: 400 }); }
  const email = String(body.email ?? "").trim().toLowerCase();
  const plan = String(body.plan ?? "standard");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return NextResponse.json({ error: "Имэйл хаягаа зөв оруулна уу." }, { status: 400 });
  if (!["standard", "pro"].includes(plan)) return NextResponse.json({ error: "Багц буруу." }, { status: 400 });

  const { error } = await supabaseAdmin().from("enrollments").upsert({ email, plan });
  if (error) { console.error("admin enroll failed", error); return NextResponse.json({ error: "Хадгалж чадсангүй." }, { status: 500 }); }
  return NextResponse.json({ ok: true, email, plan });
}

/** Revoke course access for an e-mail: DELETE /api/admin/enroll?email=... */
export async function DELETE(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const email = (new URL(req.url).searchParams.get("email") || "").trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "Буруу хүсэлт." }, { status: 400 });

  const { error } = await supabaseAdmin().from("enrollments").delete().eq("email", email);
  if (error) { console.error("admin revoke failed", error); return NextResponse.json({ error: "Устгаж чадсангүй." }, { status: 500 }); }
  return NextResponse.json({ ok: true });
}
