import "server-only";
import { plans } from "@/lib/content";

export type PlanId = "standard" | "pro";
/** A price as the page must render it: `amount` is what will be charged. */
export type PlanPrice = { id: PlanId; name: string; amount: number; was: number | null };

/** Presale prices stay on until PRESALE=false. */
export const isPresale = () => process.env.PRESALE !== "false";

/** The ONLY place a charge amount is decided. The browser never sends an amount. */
export function priceOf(id: PlanId) {
  const p = plans.find((x) => x.id === id)!;
  return isPresale() ? p.presale : p.price;
}
export const planName = (id: PlanId) => plans.find((x) => x.id === id)!.name;

/**
 * Every price on the page comes from here, so the number a buyer reads is the number
 * /api/checkout charges. PRESALE is server-only (no NEXT_PUBLIC_), so server components
 * call this and hand the result to client components as a prop.
 */
export const priceList = (): PlanPrice[] =>
  plans.map((p) => ({ id: p.id, name: p.name, amount: priceOf(p.id), was: isPresale() ? p.price : null }));
