export default function PageSkeleton({ label = "Ачаалж байна…" }: { label?: string }) {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10" role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">{label}</span>
      <div className="h-8 w-56 animate-pulse rounded-lg bg-ink-3" />
      <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-ink-3" />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl border border-line bg-ink-2" />
        ))}
      </div>
      <div className="mt-6 space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-14 animate-pulse rounded-2xl border border-line bg-ink-2" />
        ))}
      </div>
    </main>
  );
}
