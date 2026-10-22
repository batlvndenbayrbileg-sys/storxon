import "server-only";

/**
 * Admin access is by e-mail allowlist. Set ADMIN_EMAILS (comma-separated) in the
 * environment; defaults to storxon@gmail.com. The matching account must exist in
 * Supabase Auth (create it in the Supabase dashboard, or via /signup) — this file
 * never stores a password.
 */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "storxon@gmail.com")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdmin(email: string | null | undefined): boolean {
  return !!email && adminEmails().includes(email.toLowerCase());
}
