import Hero from "@/components/Hero";
import LibrarySection from "@/components/LibrarySection";
import { getWorkouts } from "@/lib/api";

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <>
      <Hero />
      {workouts.length === 0 ? (
        <section className="shell py-16 text-center">
          <p className="text-sm text-muted">
            The workout library couldn&apos;t be loaded right now. Please refresh in a moment.
          </p>
        </section>
      ) : (
        <LibrarySection workouts={workouts} />
      )}
    </>
  );
}
