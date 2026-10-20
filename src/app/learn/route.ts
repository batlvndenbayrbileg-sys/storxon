import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * The course player. Served only to a signed-in user whose e-mail has a paid enrollment.
 * The HTML lives in /private (not /public), so it can't be fetched directly.
 */
export async function GET(req: Request) {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/login?next=/learn", req.url));

  // RLS policy "own enrollment" lets a user read only their own row
  const { data: enr } = await sb.from("enrollments").select("plan").maybeSingle<{ plan: string }>();
  if (!enr) return NextResponse.redirect(new URL("/#register", req.url));

  let html = await readFile(path.join(process.cwd(), "private", "course.html"), "utf8");
  const acct = `<a class="acct" href="/logout" title="${escapeHtml(user.email || "")}">Гарах</a>`;
  html = html.replace("<!--SX_ACCOUNT-->", acct).replace('href="https://storxon.online" target="_blank" rel="noopener"', 'href="/"');
  return new NextResponse(html, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "private, no-store" } });
}

function escapeHtml(s: string) { return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!)); }
