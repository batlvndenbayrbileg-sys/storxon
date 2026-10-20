import "server-only";

/**
 * Minimal QPay Merchant API v2 client.
 * Paths and fields follow the QPay v2 merchant API: POST /auth/token (Basic auth),
 * POST /invoice, POST /payment/check (object_type "INVOICE").
 */
const BASE = process.env.QPAY_BASE_URL || "https://merchant.qpay.mn/v2";

let cached: { token: string; exp: number } | null = null;

async function token(): Promise<string> {
  if (cached && cached.exp > Date.now() + 60_000) return cached.token;
  const basic = Buffer.from(`${process.env.QPAY_USERNAME}:${process.env.QPAY_PASSWORD}`).toString("base64");
  const r = await fetch(`${BASE}/auth/token`, { method: "POST", headers: { Authorization: `Basic ${basic}` }, cache: "no-store" });
  if (!r.ok) throw new Error(`QPay auth failed: ${r.status}`);
  const j = (await r.json()) as { access_token: string; expires_in: number };
  // expires_in is a unix timestamp in seconds
  cached = { token: j.access_token, exp: j.expires_in * 1000 };
  return cached.token;
}

async function call<T>(path: string, body: unknown): Promise<T> {
  const r = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${await token()}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`QPay ${path} failed: ${r.status} ${await r.text()}`);
  return (await r.json()) as T;
}

export type QpayInvoice = {
  invoice_id: string;
  qr_text: string;
  qr_image: string; // base64 PNG
  qPay_shortUrl?: string;
  urls?: { name: string; description?: string; logo?: string; link: string }[];
};

export function createInvoice(o: { orderId: string; amount: number; description: string; callbackUrl: string; receiver: string }) {
  return call<QpayInvoice>("/invoice", {
    invoice_code: process.env.QPAY_INVOICE_CODE,
    sender_invoice_no: o.orderId,
    invoice_receiver_code: o.receiver,
    invoice_description: o.description,
    amount: o.amount,
    callback_url: o.callbackUrl,
  });
}

export type PaymentCheck = { count: number; paid_amount: number; rows: { payment_id: number | string; payment_status: "NEW" | "FAILED" | "PAID" | "REFUNDED"; payment_amount?: string | number }[] };

/** The source of truth: ask QPay whether this invoice is paid. Never trust the callback alone. */
export async function paidAmount(invoiceId: string): Promise<number> {
  const r = await call<PaymentCheck>("/payment/check", { object_type: "INVOICE", object_id: invoiceId, offset: { page_number: 1, page_limit: 100 } });
  return (r.rows || []).filter((x) => x.payment_status === "PAID").reduce((a, x) => a + Number(x.payment_amount ?? 0), 0) || (r.rows?.some((x) => x.payment_status === "PAID") ? Number(r.paid_amount) : 0);
}
