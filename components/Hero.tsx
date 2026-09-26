import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="border-b border-line-soft">
      <div className="shell grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:py-20">
        <div>
          <div className="mb-5 flex items-center gap-2">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            <p className="eyebrow text-accent">Workout Library</p>
          </div>

          <h1 className="display-title text-4xl text-white sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            <span className="text-accent">Log every set.</span>
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s
            plan, and watch the week&apos;s work add up.
          </p>

          <div className="mt-8">
            <a
              href="#library"
              className="btn btn-accent inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-accent-soft"
            >
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
              Browse workouts
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            className="absolute inset-0 -z-10 rounded-full bg-accent/10 blur-3xl"
            aria-hidden="true"
          />
          <Image
            src="/assets/banner.png"
            alt="Illustration of an anatomical figure performing a resistance machine exercise"
            width={640}
            height={640}
            priority
            className="mx-auto h-auto w-full max-w-sm object-contain lg:max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
