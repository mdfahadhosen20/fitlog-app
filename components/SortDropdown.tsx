"use client";

import { ChevronDown } from "lucide-react";
import type { SortKey } from "@/lib/types";

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 rounded-xl border border-line bg-ink-soft px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
      Sort by
      <span className="relative inline-flex items-center">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as SortKey)}
          className="appearance-none bg-transparent pr-5 text-white outline-none"
          aria-label="Sort workouts by"
        >
          {OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="bg-ink-soft text-white">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 h-3.5 w-3.5 text-accent" aria-hidden="true" />
      </span>
    </label>
  );
}
