"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Dumbbell, Clock, Flame, Search } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import StatCard from "@/components/StatCard";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import EmptyState from "@/components/EmptyState";
import SortDropdown from "@/components/SortDropdown";
import { getTags, type PlanEntry, type PlanTab, type SortKey } from "@/lib/types";
import { matchesQuery, sortWorkouts } from "@/lib/format";
import { PLAN_LIMIT } from "@/lib/constants";

export default function MyPlanView() {
  const { plan, saved, hydrated, totals, removeFromPlan, removeFromSaved, toggleDone, pushToast } = usePlan();
  const [tab, setTab] = useState<PlanTab>("plan");
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");
  const [showLoading, setShowLoading] = useState(true);

  // Brief, deliberate loading state so the fetch-then-render sequence is visible,
  // even though plan/saved data is read from localStorage rather than the network.
  useEffect(() => {
    if (!hydrated) return;
    const timer = setTimeout(() => setShowLoading(false), 350);
    return () => clearTimeout(timer);
  }, [hydrated]);

  const activeList: PlanEntry[] = tab === "plan" ? plan : saved;

  const visible = useMemo(() => {
    const filtered = activeList.filter((workout) => matchesQuery(workout, query, getTags(workout)));
    return sortWorkouts(filtered, sortKey);
  }, [activeList, query, sortKey]);

  const loading = !hydrated || showLoading;

  function handleRemove(id: (typeof activeList)[number]["id"], name: string) {
    if (tab === "plan") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
    pushToast(`${name} removed`, "info");
  }

  function handleToggleDone(id: (typeof activeList)[number]["id"], name: string, wasDone: boolean) {
    toggleDone(id);
    pushToast(wasDone ? `${name} marked as not done` : `${name} marked as done`);
  }

  return (
    <div className="shell py-10 sm:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">FitLog Workspace</p>
          <h1 className="display-title mt-2 text-4xl text-white sm:text-5xl">My Plan</h1>
          <p className="mt-2 text-sm text-muted">Cap of five lifts for today. Finish them, then load more.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-line-soft bg-ink-soft px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
            {plan.length}/{PLAN_LIMIT} in today&apos;s plan
          </span>
          <Link
            href="/"
            className="rounded-full border border-line px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition hover:border-accent hover:text-accent"
          >
            Browse library
          </Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={Dumbbell} label="Exercises" value={totals.exercises} unit="lifts" />
        <StatCard icon={Clock} label="Minutes" value={totals.minutes} unit="min" />
        <StatCard icon={Flame} label="Calories" value={totals.calories} unit="kcal" />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-fit rounded-full border border-line bg-ink-soft p-1">
          <button
            type="button"
            onClick={() => setTab("plan")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] transition ${
              tab === "plan" ? "bg-accent text-ink" : "text-muted hover:text-white"
            }`}
          >
            Today&apos;s Plan
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                tab === "plan" ? "bg-ink/15" : "bg-panel-2"
              }`}
            >
              {plan.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setTab("saved")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] transition ${
              tab === "saved" ? "bg-accent text-ink" : "text-muted hover:text-white"
            }`}
          >
            Saved
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                tab === "saved" ? "bg-ink/15" : "bg-panel-2"
              }`}
            >
              {saved.length}
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-56">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-strong" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or tag"
              className="field w-full rounded-xl border border-line bg-ink-soft py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-muted-strong focus:border-accent focus:outline-none"
            />
          </div>
          <SortDropdown value={sortKey} onChange={setSortKey} />
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="card-panel flex flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-panel py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-line-soft border-t-accent" />
            <p className="text-sm text-muted">Loading workouts…</p>
          </div>
        ) : visible.length === 0 ? (
          activeList.length === 0 ? (
            tab === "plan" ? (
              <EmptyState />
            ) : (
              <EmptyState
                title="No saved lifts"
                description="Save a lift from the library to keep it here for later."
              />
            )
          ) : (
            <p className="py-16 text-center text-sm text-muted">No lifts match &quot;{query}&quot;.</p>
          )
        ) : (
          <div className="space-y-4">
            {visible.map((workout) => (
              <PlanWorkoutCard
                key={workout.id}
                workout={workout}
                variant={tab}
                onRemove={() => handleRemove(workout.id, workout.name)}
                onToggleDone={
                  tab === "plan" ? () => handleToggleDone(workout.id, workout.name, Boolean(workout.done)) : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
