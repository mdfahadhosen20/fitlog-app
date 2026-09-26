import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { getTags, type Workout } from "@/lib/types";
import { formatCalories, formatMinutes, formatRating } from "@/lib/format";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const tags = getTags(workout);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="card-panel group flex flex-col overflow-hidden rounded-2xl border border-line bg-panel transition hover:border-accent/60"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-soft">
        {workout.image ? (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-ink/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-accent px-2 py-1 text-[11px] font-bold text-ink">
          <Star className="h-3 w-3 fill-ink" aria-hidden="true" />
          {formatRating(workout.rating)}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-display text-lg font-bold uppercase leading-tight text-white">
            {workout.name}
          </h3>
          <p className="mt-1 text-xs text-muted">{workout.equipment}</p>
        </div>

        <div className="mt-auto flex items-center gap-4 border-t border-line-soft pt-3 text-xs font-semibold text-muted">
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
    </Link>
  );
}
