import "server-only";

/**
 * Botxon Gateway client (botxon.chat).
 * Botxon wraps QPay: one API key per merchant — no QPay username/password/invoice
 * code is needed. Botxon issues the QR and routes the payment straight to that
 * merchant's own bank account. Configure the merchant's webhook to POST to
 * /api/botxon/webhook; polling (/api/orders/:id) re-checks here too.
 */
const BASE = (process.env.BOTXON_BASE_URL || "https://botxon.chat/api/gateway/v1").replace(/\/$/, "");

async function call<T>(path: string, init: RequestInit): Promise<T> {
  const key = process.env.BOTXON_API_KEY;
  if (!key) throw new Error("BOTXON_API_KEY is missing");
  const r = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...(init.headers || {}) },
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`Botxon ${path} failed: ${r.status} ${await r.text()}`);
  return (await r.json()) as T;
}

export type GwInvoice = {
  invoiceId: string;
  qrText?: string;
  qrImage: string; // base64 PNG or a URL
  shortUrl?: string;
  urls?: { name: string; logo?: string; link: string }[];
  amount: number;
  orderRef: string;
};

export type GwStatus = { status: "pending" | "paid"; amount: number; orderRef: string; paidAt: string | null };

/** The amount is decided server-side (priceOf); the browser never sends it. */
export function createInvoice(o: { amount: number; description: string; orderRef: string }) {
  return call<GwInvoice>("/invoices", { method: "POST", body: JSON.stringify(o) });
}

/** The source of truth: ask Botxon whether this invoice is paid. */
export function getInvoice(invoiceId: string) {
  return call<GwStatus>(`/invoices/${encodeURIComponent(invoiceId)}`, { method: "GET" });
}
