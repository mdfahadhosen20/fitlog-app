"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { PLAN_LIMIT, PLAN_STORAGE_KEY } from "@/lib/constants";
import type { PlanEntry, PlanTotals, ToastKind, ToastMessage, Workout } from "@/lib/types";

type StoredState = {
  plan: PlanEntry[];
  saved: PlanEntry[];
};

type PlanContextValue = {
  plan: PlanEntry[];
  saved: PlanEntry[];
  hydrated: boolean;
  isInPlan: (id: Workout["id"]) => boolean;
  isSaved: (id: Workout["id"]) => boolean;
  planIsFull: boolean;
  totals: PlanTotals;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: Workout["id"]) => void;
  removeFromSaved: (id: Workout["id"]) => void;
  toggleDone: (id: Workout["id"]) => void;
  toasts: ToastMessage[];
  pushToast: (message: string, kind?: ToastKind) => void;
  dismissToast: (id: string) => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);

const EMPTY_STATE: StoredState = { plan: [], saved: [] };

function readStoredState(): StoredState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(PLAN_STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<StoredState>;
    return {
      plan: Array.isArray(parsed.plan) ? parsed.plan : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
    };
  } catch {
    return EMPTY_STATE;
  }
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanEntry[]>([]);
  const [saved, setSaved] = useState<PlanEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const toastTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const stored = readStoredState();
    setPlan(stored.plan);
    setSaved(stored.saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify({ plan, saved }));
  }, [plan, saved, hydrated]);

  const pushToast = useCallback((message: string, kind: ToastKind = "success") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setToasts((current) => [...current, { id, message, kind }]);
    const timer = setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
      toastTimers.current.delete(id);
    }, 3200);
    toastTimers.current.set(id, timer);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timer = toastTimers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      toastTimers.current.delete(id);
    }
  }, []);

  useEffect(() => {
    const timers = toastTimers.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const isInPlan = useCallback((id: Workout["id"]) => plan.some((w) => w.id === id), [plan]);
  const isSaved = useCallback((id: Workout["id"]) => saved.some((w) => w.id === id), [saved]);

  const addToPlan = useCallback(
    (workout: Workout) => {
      setPlan((current) => {
        if (current.some((w) => w.id === workout.id)) return current;
        if (current.length >= PLAN_LIMIT) return current;
        return [...current, { ...workout, done: false }];
      });
    },
    [],
  );

  const addToSaved = useCallback((workout: Workout) => {
    setSaved((current) => {
      if (current.some((w) => w.id === workout.id)) return current;
      return [...current, { ...workout }];
    });
  }, []);

  const removeFromPlan = useCallback((id: Workout["id"]) => {
    setPlan((current) => current.filter((w) => w.id !== id));
  }, []);

  const removeFromSaved = useCallback((id: Workout["id"]) => {
    setSaved((current) => current.filter((w) => w.id !== id));
  }, []);

  const toggleDone = useCallback((id: Workout["id"]) => {
    setPlan((current) =>
      current.map((w) => (w.id === id ? { ...w, done: !w.done } : w)),
    );
  }, []);

  const totals: PlanTotals = useMemo(() => {
    return plan.reduce(
      (acc, w) => ({
        exercises: acc.exercises + 1,
        minutes: acc.minutes + (Number(w.duration) || 0),
        calories: acc.calories + (Number(w.caloriesBurned) || 0),
      }),
      { exercises: 0, minutes: 0, calories: 0 },
    );
  }, [plan]);

  const value: PlanContextValue = {
    plan,
    saved,
    hydrated,
    isInPlan,
    isSaved,
    planIsFull: plan.length >= PLAN_LIMIT,
    totals,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
    toasts,
    pushToast,
    dismissToast,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan(): PlanContextValue {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within a PlanProvider");
  return context;
}
