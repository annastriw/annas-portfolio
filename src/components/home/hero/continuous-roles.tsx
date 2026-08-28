"use client";

import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useSyncExternalStore,
} from "react";

const roles = [
  { id: "01", title: "Software Engineer" },
  { id: "02", title: "Full-Stack Web Developer" },
  { id: "03", title: "Machine Learning Engineer" },
] as const;

const CYCLE_INTERVAL_MS = 4000;

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function ContinuousRoles() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (prefersReducedMotion || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    }, CYCLE_INTERVAL_MS);
  }, [isPaused, prefersReducedMotion]);

  const selectRole = (index: number) => {
    setCurrentIndex(index);
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const activeRole = roles[currentIndex];

  return (
    <div
      className="hero-roles-module flex flex-wrap items-center gap-2.5 sm:gap-3 py-1"
      role="region"
      aria-label="Professional Roles"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Screen Reader Static Label */}
      <span className="sr-only">
        Active role: [{activeRole.id}] {activeRole.title}. Available roles: [01] Software Engineer, [02] Full-Stack Web Developer, [03] Machine Learning Engineer.
      </span>

      {/* Main Single Active Role Ticker / Reel */}
      <div
        className="hero-role-display inline-flex items-center gap-2.5 sm:gap-3 px-3 sm:px-3.5 py-2 min-h-[44px] border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) rounded-none"
        aria-hidden="true"
      >
        <span className="font-mono text-xs font-bold text-(--color-accent) shrink-0">
          [{activeRole.id}]
        </span>
        <span className="text-(--color-border) text-xs" aria-hidden="true">
          /
        </span>

        {/* Masked Vertical Reel for Active Role (No layout shift, longest title fits) */}
        <div className="hero-role-reel relative overflow-hidden h-6 sm:h-7 min-w-[170px] sm:min-w-[240px] md:min-w-[260px] flex items-center">
          {roles.map((role, idx) => {
            const isCurrent = idx === currentIndex;
            return (
              <div
                key={role.id}
                className={`absolute inset-0 flex items-center font-sans font-medium text-xs sm:text-sm md:text-base text-(--color-foreground) whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  isCurrent
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : idx < currentIndex
                    ? "opacity-0 -translate-y-2 pointer-events-none"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                {role.title}
              </div>
            );
          })}
        </div>

        {/* Live Active Accent Dot */}
        <span
          className="w-1.5 h-1.5 rounded-full bg-(--color-accent) shrink-0 ml-0.5"
          aria-hidden="true"
        />
      </div>

      {/* Manual Role Selector Controls */}
      <div
        className="hero-role-manual-controls inline-flex items-center gap-1 border border-(--color-border) bg-(--color-background) p-0.5 rounded-none"
        role="group"
        aria-label="Direct role selection"
      >
        {roles.map((role, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={role.id}
              type="button"
              aria-pressed={isActive}
              aria-label={`Select role ${role.id}: ${role.title}`}
              onClick={() => selectRole(idx)}
              className={`hero-role-manual-btn inline-flex items-center justify-center px-2.5 py-1 min-h-[38px] min-w-[38px] font-mono text-xs font-semibold rounded-none cursor-pointer transition-all duration-150 focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-1 ${
                isActive
                  ? "bg-(--color-accent) text-white dark:text-[#0c0e11] shadow-2xs"
                  : "text-(--color-muted) hover:text-(--color-foreground) hover:bg-(--color-surface-subtle)"
              }`}
            >
              <span>[{role.id}]</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
