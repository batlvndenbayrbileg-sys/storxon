import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { paidAmount } from "@/lib/qpay";
import type { PlanId } from "@/lib/pricing";

export type OrderRow = { id: string; email: string; name: string; plan: PlanId; amount: number; status: "pending" | "paid" | "cancelled"; qpay_invoice_id: string | null; callback_token: string };

export const site = () => (process.env.NEXT_PUBLIC_SITE_URL || "https://storxon.online").replace(/\/$/, "");

/**
 * Re-checks the invoice with QPay and, if fully paid, marks the order paid (once),
 * opens the course for that email and e-mails a sign-in link.
 * Safe to call many times (callback + polling): only the first pending→paid transition does work.
 */
export async function settle(orderId: string): Promise<OrderRow["status"]> {
  const db = supabaseAdmin();
  const { data: o } = await db.from("orders").select("*").eq("id", orderId).single<OrderRow>();
  if (!o) return "cancelled";
  if (o.status !== "pending" || !o.qpay_invoice_id) return o.status;

  const paid = await paidAmount(o.qpay_invoice_id);
  if (paid < o.amount) return "pending";

  // pending → paid exactly once (guards against callback + poll racing)
  const { data: flipped } = await db.from("orders").update({ status: "paid", paid_at: new Date().toISOString() }).eq("id", o.id).eq("status", "pending").select("id");
  if (!flipped?.length) return "paid";

  const email = o.email.toLowerCase();
  // keep the higher plan if someone upgrades
  const { data: prev } = await db.from("enrollments").select("plan").eq("email", email).maybeSingle<{ plan: PlanId }>();
  const plan: PlanId = prev?.plan === "pro" ? "pro" : o.plan;
  await db.from("enrollments").upsert({ email, plan, order_id: o.id });

  // magic link straight into the course
  await db.auth.signInWithOtp({ email, options: { emailRedirectTo: `${site()}/auth/callback?next=/learn`, shouldCreateUser: true } });
  return "paid";
}
