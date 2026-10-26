import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";

/** Who is signed in, and do they have course access (a paid enrollment, or admin). */
export async function GET() {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  // RLS lets a user read only their own enrollment row.
  const { data: enr } = await sb.from("enrollments").select("plan").maybeSingle<{ plan: string }>();
  const admin = isAdmin(user.email);
  return NextResponse.json(
    { email: user.email, plan: enr?.plan ?? null, enrolled: !!enr || admin, isAdmin: admin },
    { headers: { "cache-control": "private, no-store" } }
  );
}
