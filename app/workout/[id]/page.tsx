import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Dumbbell, Star, Target } from "lucide-react";
import { getWorkoutById } from "@/lib/api";
import { getTags } from "@/lib/types";
import WorkoutDetailActions from "@/components/WorkoutDetailActions";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const workout = await getWorkoutById(id);
  return { title: workout ? `${workout.name} — FitLog` : "Workout not found — FitLog" };
}

const SPEC_ROWS = (workout: NonNullable<Awaited<ReturnType<typeof getWorkoutById>>>) => [
  { label: "Equipment", value: workout.equipment },
  { label: "Difficulty", value: workout.difficulty },
  { label: "Sets", value: String(workout.sets) },
  { label: "Reps", value: workout.reps },
  { label: "Duration", value: `${workout.duration} min` },
  { label: "Calories", value: `${workout.caloriesBurned} kcal` },
  { label: "Rating", value: workout.rating.toFixed(1) },
];

export default async function WorkoutDetailPage({ params }: PageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) notFound();

  const tags = getTags(workout);
  const instructions = workout.instructions ?? [];

  return (
    <div className="shell py-10 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted transition hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Back to library
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-ink-soft lg:aspect-auto lg:h-full">
          {workout.image ? (
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          ) : null}
          <span className="absolute bottom-4 left-4 rounded-full border border-line bg-ink/85 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
            {workout.difficulty}
          </span>
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1.5 text-[11px] font-bold text-ink">
            <Star className="h-3.5 w-3.5 fill-ink" aria-hidden="true" />
            {workout.rating.toFixed(1)}
          </span>
        </div>

        <div>
          <p className="eyebrow">Exercise Detail</p>
          <h1 className="display-title mt-2 text-3xl text-white sm:text-4xl lg:text-5xl">{workout.name}</h1>
          {workout.description ? (
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">{workout.description}</p>
          ) : null}

          {tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="card-panel mt-6 rounded-2xl border border-line bg-panel p-5">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              <Target className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              Key Specs
            </p>
            <dl>
              {SPEC_ROWS(workout).map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 border-b border-line-soft py-3 text-sm last:border-b-0"
                >
                  <dt className="font-semibold uppercase tracking-[0.1em] text-muted">{row.label}</dt>
                  <dd className="font-semibold text-white">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {instructions.length > 0 ? (
            <div className="mt-8">
              <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                <Dumbbell className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                Instructions
              </p>
              <ol className="space-y-4">
                {instructions.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-muted">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/60 text-[11px] font-bold text-accent">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed text-white/90">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          <div className="mt-8">
            <WorkoutDetailActions workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}
