// Wraps every page and remounts on each top-level route change, replaying the
// `sx-page-enter` animation (fade + gentle slide-up) defined in globals.css.
// This is what makes navigation between sections feel smooth instead of a hard cut.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="sx-page-enter">{children}</div>;
}
