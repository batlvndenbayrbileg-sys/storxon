import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin";

/** Who is signed in, and do they have course access (a paid enrollment, or admin). */
export async function GET() {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  // RLS lets a user read only their own enrollment row.
  const { data: enr } = await sb.from("enrollments").select("plan").maybeSingle<{ plan: string }>();
  const admin = isAdmin(user.email);

  // Their name lives on the order they paid with (orders is service-role only).
  let name: string | null = null;
  const email = (user.email || "").toLowerCase();
  if (email) {
    try {
      const { data: ord } = await supabaseAdmin()
        .from("orders").select("name").eq("email", email)
        .order("created_at", { ascending: false }).limit(1).maybeSingle<{ name: string }>();
      name = ord?.name?.trim() || null;
    } catch { /* name is optional */ }
  }

  return NextResponse.json(
    { email: user.email, name, plan: enr?.plan ?? null, enrolled: !!enr || admin, isAdmin: admin },
    { headers: { "cache-control": "private, no-store" } }
  );
}
