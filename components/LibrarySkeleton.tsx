export default function LibrarySkeleton() {
  return (
    <section className="border-b border-line-soft py-12 sm:py-16">
      <div className="shell">
        <div className="skeleton-block h-8 w-48 animate-pulse rounded-lg border border-line-soft bg-panel" />
        <p className="mt-4 text-sm text-muted-strong">Loading workouts…</p>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="skeleton-block h-80 animate-pulse rounded-2xl border border-line-soft bg-panel"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
