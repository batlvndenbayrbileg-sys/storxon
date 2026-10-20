import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * Only a same-site path is allowed. "//evil.com" and "/\\evil.com" both start with "/"
 * but resolve to another origin, which would turn the magic link into a phishing redirect.
 */
function safeNext(raw: string | null) {
  return raw && /^\/(?![/\\])/.test(raw) ? raw : "/learn";
}

/** Magic-link landing: swaps the one-time code for a session cookie, then goes to `next`. */
export async function GET(req: Request) {
  const u = new URL(req.url), code = u.searchParams.get("code");
  const next = safeNext(u.searchParams.get("next"));
  if (code) {
    const sb = await supabaseServer();
    const { error } = await sb.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, req.url));
  }
  return NextResponse.redirect(new URL("/login?error=link", req.url));
}
