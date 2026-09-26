import { FITLOG_API_URL } from "@/lib/constants";
import type { Workout } from "@/lib/types";

const REVALIDATE_SECONDS = 300;
const ALTERNATIVE_API_URL = "https://api.api-store.workers.dev/api/fitlog";
const ORIGINAL_API_URL = "https://api.abcz.workers.dev/api/fitlog";

function getApiUrls(): string[] {
  return [...new Set([FITLOG_API_URL, ALTERNATIVE_API_URL, ORIGINAL_API_URL])];
}

function parseWorkoutList(data: unknown): Workout[] {
  if (Array.isArray(data)) return data as Workout[];
  if (
    data &&
    typeof data === "object" &&
    Array.isArray((data as { data?: unknown }).data)
  ) {
    return (data as { data: Workout[] }).data;
  }
  return [];
}

function parseWorkout(data: unknown): Workout | null {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const wrapped = (data as { data?: unknown }).data;
  const workout =
    wrapped && typeof wrapped === "object" && !Array.isArray(wrapped)
      ? wrapped
      : data;
  return workout as Workout;
}

/**
 * Fetches the whole FitLog library. Never throws: if the API is unreachable
 * this resolves to an empty array so the UI can render a friendly fallback
 * instead of crashing the page.
 */
export async function getWorkouts(): Promise<Workout[]> {
  for (const url of getApiUrls()) {
    try {
      const response = await fetch(url, {
        next: { revalidate: REVALIDATE_SECONDS },
      });
      if (!response.ok) continue;

      const workouts = parseWorkoutList(await response.json());
      if (workouts.length > 0) return workouts;
    } catch (error) {
      console.error(`FitLog: failed to load workouts from ${url}`, error);
    }
  }

  return [];
}

/**
 * Fetches a single workout by id. Resolves to null for unknown ids or
 * network failures, which lets the detail page call notFound().
 */
export async function getWorkoutById(id: string): Promise<Workout | null> {
  for (const url of getApiUrls()) {
    try {
      const response = await fetch(`${url}/${encodeURIComponent(id)}`, {
        next: { revalidate: REVALIDATE_SECONDS },
      });
      if (!response.ok) continue;

      const workout = parseWorkout(await response.json());
      if (workout) return workout;
    } catch (error) {
      console.error(`FitLog: failed to load workout ${id} from ${url}`, error);
    }
  }

  return null;
}
