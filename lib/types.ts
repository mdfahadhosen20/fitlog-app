/** Shape returned by the FitLog API. */
export type Workout = {
  id: number | string;
  name: string;
  image: string;
  muscleGroups?: string[];
  category?: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description?: string;
  instructions?: string[];
};

/** Normalizes a workout's category tags regardless of which field the API used. */
export function getTags(workout: Workout): string[] {
  if (workout.muscleGroups && workout.muscleGroups.length)
    return workout.muscleGroups;
  if (workout.category && workout.category.length) return workout.category;
  return [];
}

/** A workout once it's living in the plan/saved store — carries a completion flag. */
export type PlanEntry = Workout & { done?: boolean };

export type SortKey = "duration" | "calories" | "rating";

export type PlanTab = "plan" | "saved";

export type PlanTotals = {
  exercises: number;
  minutes: number;
  calories: number;
};

export type ToastKind = "success" | "info";

export type ToastMessage = {
  id: string;
  message: string;
  kind: ToastKind;
};
