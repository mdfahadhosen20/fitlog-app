"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";
import { getTags, type SortKey, type Workout } from "@/lib/types";
import { matchesQuery, sortWorkouts } from "@/lib/format";

export default function LibrarySection({ workouts }: { workouts: Workout[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const filtered = workouts.filter((workout) => matchesQuery(workout, query, getTags(workout)));
    return sortWorkouts(filtered, sortKey);
  }, [workouts, query, sortKey]);

  return (
    <section id="library" className="scroll-mt-20 border-b border-line-soft py-12 sm:py-16">
      <div className="shell">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Workout Library</p>
            <h2 className="display-title mt-2 text-3xl text-white sm:text-4xl">The Library</h2>
            <p className="mt-2 text-sm text-muted">Twelve lifts covering every major muscle group.</p>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-strong">
            Showing {visible.length} of {workouts.length} lifts
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-strong" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, tag or equipment"
              className="field w-full rounded-xl border border-line bg-ink-soft py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-muted-strong focus:border-accent focus:outline-none"
            />
          </div>
          <SortDropdown value={sortKey} onChange={setSortKey} />
        </div>

        {visible.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted">No lifts match &quot;{query}&quot;.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
