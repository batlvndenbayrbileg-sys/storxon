import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { settle } from "@/lib/access";

/**
 * QPay calls this URL after a payment. We never trust the call itself:
 * the token must match the order, and settle() re-checks the invoice with QPay.
 */
async function handle(req: Request) {
  const u = new URL(req.url), id = u.searchParams.get("order") || "", t = u.searchParams.get("t") || "";
  if (!/^[0-9a-f-]{36}$/.test(id) || !t) return NextResponse.json({ ok: false }, { status: 400 });

  const { data } = await supabaseAdmin().from("orders").select("callback_token").eq("id", id).maybeSingle<{ callback_token: string }>();
  const a = Buffer.from(data?.callback_token || ""), b = Buffer.from(t);
  if (!data || a.length !== b.length || !timingSafeEqual(a, b)) return NextResponse.json({ ok: false }, { status: 403 });

  const status = await settle(id);
  return NextResponse.json({ ok: true, status });
}

export const GET = handle;
export const POST = handle;
