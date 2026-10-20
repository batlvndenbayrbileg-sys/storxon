import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/** Per-request client that reads/writes the user's auth cookies (anon key, RLS applies). */
export async function supabaseServer() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch { /* called from a Server Component: ignore */ }
      },
    },
  });
}
