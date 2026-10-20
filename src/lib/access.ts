import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getInvoice } from "@/lib/botxon";
import type { PlanId } from "@/lib/pricing";

export type OrderRow = { id: string; email: string; name: string; plan: PlanId; amount: number; status: "pending" | "paid" | "cancelled"; qpay_invoice_id: string | null; callback_token: string };

export const site = () => (process.env.NEXT_PUBLIC_SITE_URL || "https://storxon.online").replace(/\/$/, "");

/**
 * Re-checks the invoice with Botxon and, if paid, marks the order paid (once)
 * and records a paid enrollment for that e-mail (which is what opens /learn).
 * Safe to call many times (callback + polling): only the first pending→paid transition does work.
 */
export async function settle(orderId: string): Promise<OrderRow["status"]> {
  const db = supabaseAdmin();
  const { data: o } = await db.from("orders").select("*").eq("id", orderId).single<OrderRow>();
  if (!o) return "cancelled";
  if (o.status !== "pending" || !o.qpay_invoice_id) return o.status;

  const inv = await getInvoice(o.qpay_invoice_id);
  if (inv.status !== "paid" || Number(inv.amount) < o.amount) return "pending";

  // pending → paid exactly once (guards against callback + poll racing)
  const { data: flipped } = await db.from("orders").update({ status: "paid", paid_at: new Date().toISOString() }).eq("id", o.id).eq("status", "pending").select("id");
  if (!flipped?.length) return "paid";

  const email = o.email.toLowerCase();
  // keep the higher plan if someone upgrades
  const { data: prev } = await db.from("enrollments").select("plan").eq("email", email).maybeSingle<{ plan: PlanId }>();
  const plan: PlanId = prev?.plan === "pro" ? "pro" : o.plan;
  await db.from("enrollments").upsert({ email, plan, order_id: o.id });

  // Account + sign-in is email+password (/signup, /login); access to /learn is gated
  // by this enrollment row, so there is nothing to e-mail here.
  return "paid";
}
