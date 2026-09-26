import Link from "next/link";
import { ArrowRight, Dumbbell } from "lucide-react";

export default function EmptyState({
  title = "Nothing here yet",
  description = "Browse the library and add a lift to get today moving.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="card-panel flex flex-col items-center gap-4 rounded-2xl border border-line bg-panel px-6 py-16 text-center">
      <span className="icon-chip inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-ink-soft text-accent">
        <Dumbbell className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <h3 className="font-display text-xl font-bold uppercase text-white">{title}</h3>
        <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
      </div>
      <Link
        href="/"
        className="btn btn-accent inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-accent-soft"
      >
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
        Go to workouts
      </Link>
    </div>
  );
}
