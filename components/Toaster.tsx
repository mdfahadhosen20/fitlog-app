"use client";

import { CheckCircle2, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function Toaster() {
  const { toasts, dismissToast } = usePlan();

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border border-line bg-panel-2 px-4 py-3 shadow-lg shadow-black/40 animate-[fadeIn_0.2s_ease-out]"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          <p className="flex-1 text-sm text-white">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 text-muted transition hover:text-white"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
