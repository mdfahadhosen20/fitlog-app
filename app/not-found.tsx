import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="shell flex flex-col items-center justify-center gap-4 py-28 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="display-title text-5xl text-white sm:text-6xl">
        Lift not <span className="text-accent">found</span>
      </h1>
      <p className="max-w-sm text-sm text-muted">
        That page doesn&apos;t exist. It may have been moved, or the link is broken.
      </p>
      <Link
        href="/"
        className="btn btn-accent mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-accent-soft"
      >
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
        Back to the library
      </Link>
    </div>
  );
}
