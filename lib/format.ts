import type { SortKey, Workout } from "@/lib/types";

export function formatMinutes(value: number): string {
  return `${value} min`;
}

export function formatCalories(value: number): string {
  return `${value} kcal`;
}

export function formatRating(value: number): string {
  return value.toFixed(1);
}

/** Sorts a workout list by the given key, descending for calories/rating, ascending for duration. */
export function sortWorkouts<T extends Workout>(workouts: T[], key: SortKey): T[] {
  const copy = [...workouts];
  switch (key) {
    case "duration":
      return copy.sort((a, b) => a.duration - b.duration);
    case "calories":
      return copy.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy;
  }
}

export function matchesQuery(workout: Workout, query: string, tags: string[]): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (workout.name.toLowerCase().includes(q)) return true;
  if (workout.equipment.toLowerCase().includes(q)) return true;
  return tags.some((tag) => tag.toLowerCase().includes(q));
}
