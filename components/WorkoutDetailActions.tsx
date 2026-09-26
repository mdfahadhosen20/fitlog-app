"use client";

import { Bookmark, Plus } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/lib/types";
import { PLAN_LIMIT } from "@/lib/constants";

export default function WorkoutDetailActions({
  workout,
}: {
  workout: Workout;
}) {
  const { isInPlan, isSaved, planIsFull, addToPlan, addToSaved, pushToast } =
    usePlan();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const disablePlanAdd = inPlan || (planIsFull && !inPlan);

  function handleAddToPlan() {
    if (inPlan) {
      pushToast(`${workout.name} is already in today's plan`, "info");
      return;
    }
    if (planIsFull) {
      pushToast(
        `Today's plan is full (${PLAN_LIMIT} lifts). Remove one to add another.`,
        "info",
      );
      return;
    }
    addToPlan(workout);
    pushToast("Added to today's plan");
  }

  function handleSave() {
    if (saved) {
      pushToast(`${workout.name} is already saved`, "info");
      return;
    }
    addToSaved(workout);
    pushToast("Saved for later");
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={disablePlanAdd}
        title={
          planIsFull && !inPlan
            ? `Today's plan is full (${PLAN_LIMIT} lifts). Remove one to add another.`
            : undefined
        }
        className="btn btn-accent inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        {inPlan ? "In today's plan" : "Add to today's plan"}
      </button>
      {planIsFull && !inPlan && (
        <p className="basis-full text-sm text-muted" role="status">
          Today&apos;s plan is full ({PLAN_LIMIT} lifts). Remove a lift from My
          Plan to add this one.
        </p>
      )}
      <button
        type="button"
        onClick={handleSave}
        className="btn btn-outline inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition hover:border-accent hover:text-accent"
      >
        <Bookmark className="h-4 w-4" aria-hidden="true" />
        {saved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
