"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Bookmark } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

const LINKS = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-ink/95 backdrop-blur">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/assets/logo.png" alt="FitLog logo" width={22} height={22} priority />
          <span className="font-display text-lg font-bold uppercase tracking-wide text-white">
            Fit<span className="text-accent">Log</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-bold uppercase tracking-[0.14em] transition ${
                  active ? "text-accent" : "text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/my-plan"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink transition hover:bg-accent-soft"
          >
            <Dumbbell className="h-3.5 w-3.5" aria-hidden="true" />
            Plan
            <span className="rounded-full bg-ink/15 px-1.5 py-0.5 text-[11px]">{plan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:border-accent hover:text-accent"
          >
            <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
            Saved
            <span className="rounded-full border border-line px-1.5 py-0.5 text-[11px]">{saved.length}</span>
          </Link>
        </div>
      </div>

      <nav className="scrollbar-none flex gap-6 overflow-x-auto border-t border-line-soft px-4 py-2 sm:hidden">
        {LINKS.map((link) => {
          const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 text-[12px] font-bold uppercase tracking-[0.14em] ${
                active ? "text-accent" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
