import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin";

/**
 * Admin dashboard data. Gated twice: the caller must be signed in AND their
 * e-mail must be on the ADMIN_EMAILS allowlist. Only then do we read the tables
 * with the service-role client (which bypasses RLS).
 */
export async function GET() {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!isAdmin(user.email)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const db = supabaseAdmin();
  const [preorders, orders, enrollments] = await Promise.all([
    db.from("preorders").select("*").order("created_at", { ascending: false }).limit(500),
    db.from("orders").select("*").order("created_at", { ascending: false }).limit(500),
    db.from("enrollments").select("*").order("created_at", { ascending: false }).limit(500),
  ]);

  return NextResponse.json(
    {
      email: user.email,
      preorders: preorders.data || [],
      orders: orders.data || [],
      enrollments: enrollments.data || [],
    },
    { headers: { "cache-control": "private, no-store" } }
  );
}
