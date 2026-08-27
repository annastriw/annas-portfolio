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

  const nextRole = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % roles.length);
  }, []);

  const selectRole = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (prefersReducedMotion || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextRole();
    }, CYCLE_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, prefersReducedMotion, nextRole]);

  return (
    <div
      className="hero-roles-controls flex flex-wrap items-center gap-2 sm:gap-2.5"
      role="tablist"
      aria-label="Professional Roles"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {roles.map((role, idx) => {
        const isActive = idx === currentIndex;
        return (
          <button
            key={role.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => selectRole(idx)}
            className={`hero-role-btn group inline-flex items-center gap-2 px-3 py-1.5 border font-mono text-xs sm:text-sm font-medium rounded-[2px] transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-2 ${
              isActive
                ? "border-(--color-accent) bg-(--color-surface-subtle,rgba(49,94,251,0.05)) text-(--color-foreground) shadow-2xs"
                : "border-(--color-border) bg-(--color-background) text-(--color-muted) hover:text-(--color-foreground) hover:border-(--color-accent)/60"
            }`}
          >
            <span
              className={`text-xs font-semibold font-mono transition-colors duration-200 ${
                isActive
                  ? "text-(--color-accent)"
                  : "text-(--color-muted) group-hover:text-(--color-accent)"
              }`}
            >
              [{role.id}]
            </span>
            <span className="overflow-hidden inline-block">
              <span
                key={isActive ? `active-${role.id}` : `inactive-${role.id}`}
                className={`inline-block ${
                  isActive && !prefersReducedMotion
                    ? "animate-editorial-fade"
                    : ""
                }`}
              >
                {role.title}
              </span>
            </span>
            {isActive && (
              <span
                className="w-1.5 h-1.5 rounded-full bg-(--color-accent) shrink-0 ml-0.5"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}

      {/* Static screen reader summary */}
      <span className="sr-only">
        Active role: [{roles[currentIndex].id}] {roles[currentIndex].title}. All
        roles: {roles.map((r) => `[${r.id}] ${r.title}`).join(", ")}.
      </span>
    </div>
  );
}
