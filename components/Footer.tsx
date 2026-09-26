import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-line-soft bg-ink-soft">
      <div className="shell flex flex-col items-center gap-3 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2">
          <Image src="/assets/logo.png" alt="FitLog logo" width={18} height={18} />
          <span className="font-display text-sm font-bold uppercase tracking-wide text-white">
            Fit<span className="text-accent">Log</span>
          </span>
        </div>
        <p className="text-xs text-muted-strong">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
