export default function WorkoutDetailLoading() {
  return (
    <div className="shell py-10 sm:py-14">
      <div className="h-4 w-32 animate-pulse rounded bg-panel" />
      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="aspect-square w-full animate-pulse rounded-2xl border border-line-soft bg-panel lg:aspect-auto lg:h-full" />
        <div className="space-y-4">
          <div className="h-4 w-28 animate-pulse rounded bg-panel" />
          <div className="h-10 w-2/3 animate-pulse rounded bg-panel" />
          <div className="h-16 w-full animate-pulse rounded bg-panel" />
          <div className="h-56 w-full animate-pulse rounded-2xl border border-line-soft bg-panel" />
        </div>
      </div>
    </div>
  );
}
