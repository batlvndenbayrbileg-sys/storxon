import { NextResponse } from "next/server";
import { settle } from "@/lib/access";

/** Polled by the payment page every few seconds. Also settles the order if QPay's callback was missed. */
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!/^[0-9a-f-]{36}$/.test(id)) return NextResponse.json({ status: "cancelled" }, { status: 400 });
  try {
    return NextResponse.json({ status: await settle(id) });
  } catch {
    return NextResponse.json({ status: "pending" });
  }
}
