import Hero from "@/components/Hero";
import LibrarySection from "@/components/LibrarySection";
import { getWorkouts } from "@/lib/api";

// Fetch the workout list at request time instead of baking API availability
// into Vercel's build-time static HTML.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <>
      <Hero />
      {workouts.length === 0 ? (
        <section className="shell py-16 text-center">
          <p className="text-sm text-muted">
            The workout library couldn&apos;t be loaded right now. Please
            refresh in a moment.
          </p>
        </section>
      ) : (
        <LibrarySection workouts={workouts} />
      )}
    </>
  );
}
