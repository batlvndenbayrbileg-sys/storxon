// Remounts when the lesson list ↔ a lesson changes under /playground, so the
// page-enter animation plays on those navigations too (the root template only
// remounts when the top-level segment changes).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="sx-page-enter">{children}</div>;
}
