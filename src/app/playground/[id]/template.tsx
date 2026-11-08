// Keyed to the [id] segment: remounts on every lesson → lesson jump, replaying
// the `sx-page-enter` animation so moving through lessons feels smooth.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="sx-page-enter">{children}</div>;
}
