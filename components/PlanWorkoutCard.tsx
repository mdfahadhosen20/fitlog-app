"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Flame, RotateCcw, Star, X } from "lucide-react";
import type { PlanEntry } from "@/lib/types";
import { formatCalories, formatMinutes, formatRating } from "@/lib/format";

export default function PlanWorkoutCard({
  workout,
  variant,
  onRemove,
  onToggleDone,
}: {
  workout: PlanEntry;
  variant: "plan" | "saved";
  onRemove: () => void;
  onToggleDone?: () => void;
}) {
  const done = Boolean(workout.done);

  return (
    <div
      className={`card-panel flex flex-col gap-4 rounded-2xl border bg-panel p-4 transition sm:flex-row sm:items-center ${
        done ? "border-accent/60" : "border-line"
      }`}
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-ink-soft">
        {workout.image ? (
          <Image src={workout.image} alt={workout.name} fill sizes="80px" className="object-cover" />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`font-display text-base font-bold uppercase text-white ${
              done ? "text-muted-strong line-through" : ""
            }`}
          >
            {workout.name}
          </h3>
          {done ? (
            <span className="rounded-full border border-accent/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
              Done
            </span>
          ) : null}
        </div>
        <p className="mt-0.5 truncate text-xs text-muted">{workout.equipment}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {formatMinutes(workout.duration)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {formatCalories(workout.caloriesBurned)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {formatRating(workout.rating)}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="btn btn-outline rounded-full border border-line px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition hover:border-accent hover:text-accent"
        >
          View details
        </Link>
        {variant === "plan" && onToggleDone ? (
          <button
            type="button"
            onClick={onToggleDone}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.1em] transition ${
              done
                ? "border-line-soft bg-ink-soft text-muted hover:text-white"
                : "border-line text-white hover:border-accent hover:text-accent"
            }`}
          >
            {done ? <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> : <Check className="h-3.5 w-3.5" aria-hidden="true" />}
            {done ? "Undo" : "Mark as done"}
          </button>
        ) : null}
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="icon-btn inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-soft bg-ink-soft text-muted transition hover:border-red-500/60 hover:text-red-400"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
