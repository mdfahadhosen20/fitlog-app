import { FITLOG_API_URL } from "@/lib/constants";
import type { Workout } from "@/lib/types";

const REVALIDATE_SECONDS = 300;

/**
 * Fetches the whole FitLog library. Never throws: if the API is unreachable
 * this resolves to an empty array so the UI can render a friendly fallback
 * instead of crashing the page.
 */
export async function getWorkouts(): Promise<Workout[]> {
  try {
    const response = await fetch(FITLOG_API_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) return [];

    const data: unknown = await response.json();

    if (Array.isArray(data)) return data as Workout[];
    if (data && typeof data === "object" && Array.isArray((data as { data?: unknown }).data)) {
      return (data as { data: Workout[] }).data;
    }
    return [];
  } catch (error) {
    console.error("FitLog: failed to load the workout library", error);
    return [];
  }
}

/**
 * Fetches a single workout by id. Resolves to null for unknown ids or
 * network failures, which lets the detail page call notFound().
 */
export async function getWorkoutById(id: string): Promise<Workout | null> {
  try {
    const response = await fetch(`${FITLOG_API_URL}/${id}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) return null;

    const data: unknown = await response.json();

    if (!data || typeof data !== "object" || Array.isArray(data)) return null;

    return data as Workout;
  } catch (error) {
    console.error(`FitLog: failed to load workout ${id}`, error);
    return null;
  }
}
