import "server-only";
import { createClient } from "@supabase/supabase-js";

/** Service-role client: bypasses RLS. Import ONLY from server code (route handlers). */
export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env is missing (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
