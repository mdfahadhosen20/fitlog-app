import type { LucideIcon } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
  unit,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  unit: string;
}) {
  return (
    <div className="stat-tile flex items-center gap-4 rounded-2xl border border-line bg-panel px-4 py-5">
      <span className="icon-chip inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-ink-soft text-accent">
        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
        <p className="font-display text-2xl font-bold text-white">
          {value}
          <span className="ml-1 text-xs font-sans font-semibold uppercase text-muted-strong">{unit}</span>
        </p>
      </div>
    </div>
  );
}
