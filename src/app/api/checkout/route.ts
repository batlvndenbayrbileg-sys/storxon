import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createInvoice } from "@/lib/qpay";
import { priceOf, planName, type PlanId } from "@/lib/pricing";
import { site } from "@/lib/access";

const PLANS = new Set(["standard", "pro"]);
const SEGMENTS = new Set(["highschool", "student", "business", "career", "other"]);
const ALLOWED = new Set(["name", "email", "phone", "plan", "segment", "company"]);

// small per-instance limiter: 5 checkouts / minute / IP
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now(), arr = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  arr.push(now); hits.set(ip, arr); return arr.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (limited(ip)) return NextResponse.json({ error: "Хэт олон оролдлого. Нэг минутын дараа дахин оролдоно уу." }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Буруу хүсэлт." }, { status: 400 }); }
  // Only known fields. A browser-sent price (or anything else) is rejected, never used.
  if (Object.keys(body).some((k) => !ALLOWED.has(k))) return NextResponse.json({ error: "Буруу хүсэлт." }, { status: 400 });
  // Honeypot: bots fill hidden fields.
  if (typeof body.company === "string" && body.company.trim() !== "") return NextResponse.json({ error: "Буруу хүсэлт." }, { status: 400 });

  const name = String(body.name ?? "").trim().slice(0, 80);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 120);
  const phone = String(body.phone ?? "").replace(/\D/g, "");
  const plan = String(body.plan ?? "");
  const segment = String(body.segment ?? "other");

  if (name.length < 2) return NextResponse.json({ error: "Нэрээ оруулна уу." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return NextResponse.json({ error: "Имэйл хаягаа зөв оруулна уу. Сургалт руу нэвтрэх холбоос энэ хаяг руу очно." }, { status: 400 });
  if (!/^\d{8}$/.test(phone)) return NextResponse.json({ error: "8 оронтой утасны дугаар оруулна уу." }, { status: 400 });
  if (!PLANS.has(plan)) return NextResponse.json({ error: "Багцаа сонгоно уу." }, { status: 400 });

  const db = supabaseAdmin();
  const amount = priceOf(plan as PlanId);
  const callback_token = randomBytes(24).toString("hex");
  const { data: order, error } = await db.from("orders")
    .insert({ plan, name, email, phone, segment: SEGMENTS.has(segment) ? segment : "other", amount, callback_token })
    .select("id").single<{ id: string }>();
  if (error || !order) {
    console.error("order insert failed", error);
    return NextResponse.json({ error: "Алдаа гарлаа. Дахин оролдоно уу." }, { status: 500 });
  }

  try {
    const inv = await createInvoice({
      orderId: order.id,
      amount,
      description: `Storxon ${planName(plan as PlanId)} багц`,
      receiver: phone,
      callbackUrl: `${site()}/api/qpay/callback?order=${order.id}&t=${callback_token}`,
    });
    await db.from("orders").update({ qpay_invoice_id: inv.invoice_id }).eq("id", order.id);
    return NextResponse.json({ orderId: order.id, amount, qr: inv.qr_image, banks: (inv.urls || []).map((u) => ({ name: u.name, logo: u.logo ?? null, link: u.link })) });
  } catch (e) {
    await db.from("orders").update({ status: "cancelled" }).eq("id", order.id);
    console.error(e);
    return NextResponse.json({ error: "QPay нэхэмжлэх үүсгэж чадсангүй. Түр хүлээгээд дахин оролдоно уу." }, { status: 502 });
  }
}
