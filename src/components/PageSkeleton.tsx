// Wireframe loading placeholder shown while a page's data loads — a shimmering
// skeleton of the real layout (hero, cards, list + aside) instead of a bare
// "loading…" line. Used by route-level loading.tsx and client pages' initial state.
export default function PageSkeleton({ label = "Ачаалж байна…" }: { label?: string }) {
  const pulse = "animate-pulse rounded-2xl border border-line bg-ink-3 motion-reduce:animate-none";
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6" role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">{label}</span>

      {/* hero banner */}
      <div className={`h-36 rounded-3xl ${pulse}`} />

      {/* three stat cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`h-24 ${pulse}`} style={{ animationDelay: `${i * 90}ms` }} />
        ))}
      </div>

      {/* main list + aside */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-16 ${pulse}`} style={{ animationDelay: `${i * 90}ms` }} />
          ))}
        </div>
        <div className="space-y-4">
          <div className={`h-44 rounded-3xl ${pulse}`} />
          <div className={`h-28 rounded-3xl ${pulse}`} />
        </div>
      </div>
    </main>
  );
}
