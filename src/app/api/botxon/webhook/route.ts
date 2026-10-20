import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { settle } from "@/lib/access";

/**
 * Botxon posts here on payment: { event:"invoice.paid", invoiceId, orderRef, amount, paymentId }
 * with header X-Botxon-Signature: sha256=HMAC(body, webhook secret).
 * We verify the signature, then settle() re-checks the invoice with Botxon — a forged
 * body can never open the course on its own. Polling (/api/orders/:id) is the backup.
 */
export async function POST(req: Request) {
  const secret = process.env.BOTXON_WEBHOOK_SECRET;
  if (!secret) {
    console.error("botxon webhook: BOTXON_WEBHOOK_SECRET not set");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const raw = await req.text();
  const sig = req.headers.get("x-botxon-signature") || "";
  const expected = "sha256=" + createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(sig), b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return NextResponse.json({ ok: false }, { status: 403 });

  let body: { event?: string; orderRef?: string };
  try { body = JSON.parse(raw); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  if (body.event === "invoice.paid" && body.orderRef && /^[0-9a-f-]{36}$/.test(body.orderRef)) {
    const status = await settle(body.orderRef);
    return NextResponse.json({ ok: true, status });
  }
  return NextResponse.json({ ok: true });
}
