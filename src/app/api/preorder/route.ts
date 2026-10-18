import { NextResponse } from "next/server";

const PLANS = new Set(["standard", "pro"]);
const SEGMENTS = new Set(["highschool", "student", "business", "career", "other"]);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Буруу хүсэлт." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 80);
  const phone = String(body.phone ?? "").replace(/\D/g, "");
  const plan = String(body.plan ?? "");
  const segment = String(body.segment ?? "other");

  if (name.length < 2) return NextResponse.json({ error: "Нэрээ оруулна уу." }, { status: 400 });
  if (!/^\d{8}$/.test(phone)) return NextResponse.json({ error: "8 оронтой утасны дугаар оруулна уу." }, { status: 400 });
  if (!PLANS.has(plan)) return NextResponse.json({ error: "Багцаа сонгоно уу." }, { status: 400 });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("preorder: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set");
    return NextResponse.json({ error: "Бүртгэл түр ажиллахгүй байна. Удахгүй дахин оролдоно уу." }, { status: 503 });
  }

  const res = await fetch(`${url}/rest/v1/preorders`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name,
      phone,
      plan,
      segment: SEGMENTS.has(segment) ? segment : "other",
    }),
  });

  if (res.status === 409) {
    return NextResponse.json({ error: "Энэ дугаараар аль хэдийн бүртгүүлсэн байна." }, { status: 409 });
  }
  if (!res.ok) {
    console.error("preorder insert failed", res.status, await res.text());
    return NextResponse.json({ error: "Алдаа гарлаа. Дахин оролдоно уу." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
