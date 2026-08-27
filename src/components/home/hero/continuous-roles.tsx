"use client";

import { useEffect, useState, useCallback } from "react";

const roles = [
  { id: "01", title: "Software Engineer" },
  { id: "02", title: "Full-Stack Web Developer" },
  { id: "03", title: "Machine Learning Engineer" },
];

const CYCLE_INTERVAL_MS = 4000;

export function ContinuousRoles() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const nextRole = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
      setIsTransitioning(false);
    }, 400);
  }, []);

  const selectRole = (index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 200);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || isPaused) return;

    const timer = setInterval(() => {
      nextRole();
    }, CYCLE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isPaused, nextRole]);

  const currentRole = roles[currentIndex];

  return (
    <div
      className="hero-roles-wrapper inline-flex items-center"
      aria-label="Professional Roles"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Continuous masked editorial role ticker with manual role controls */}
      <div
        className="hero-role-ticker inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 border border-(--color-border) bg-(--color-background) rounded-[2px]"
        aria-hidden="true"
      >
        <span className="font-mono text-xs font-semibold text-(--color-accent)">
          [{currentRole.id}]
        </span>
        <div className="overflow-hidden h-5 sm:h-6 flex items-center min-w-[170px] sm:min-w-[220px]">
          <span
            className={`font-mono text-xs sm:text-sm font-semibold text-(--color-foreground) transition-all duration-400 ease-out transform ${
              isTransitioning
                ? "-translate-y-2 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            {currentRole.title}
          </span>
        </div>

        {/* Minimal dot indicators for manual role selection */}
        <div className="flex items-center gap-1 pl-1 border-l border-(--color-border)">
          {roles.map((r, idx) => (
            <button
              key={r.id}
              type="button"
              tabIndex={-1}
              onClick={() => selectRole(idx)}
              aria-label={`Select ${r.title}`}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                idx === currentIndex
                  ? "bg-(--color-accent) scale-125"
                  : "bg-(--color-border) hover:bg-(--color-muted)"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Screen-reader static fallback */}
      <span className="sr-only">
        {roles.map((r) => `[${r.id}] ${r.title}`).join(" · ")}
      </span>
    </div>
  );
}
