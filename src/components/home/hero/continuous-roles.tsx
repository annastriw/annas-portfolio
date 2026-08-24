"use client";

import { useEffect, useState } from "react";

const roles = [
  { id: "01", title: "Software Engineer" },
  { id: "02", title: "Full-Stack Developer" },
  { id: "03", title: "ML Engineer" },
];

const CYCLE_INTERVAL_MS = 3000;

export function ContinuousRoles() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % roles.length);
        setIsTransitioning(false);
      }, 500); // 500ms vertical mask transition
    }, CYCLE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const currentRole = roles[currentIndex];

  return (
    <div
      className="hero-roles-wrapper inline-flex items-center"
      aria-label="Professional Roles"
    >
      {/* Continuous masked editorial role ticker with fixed height to prevent CLS */}
      <div
        className="hero-role-ticker inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 border border-(--color-border) bg-(--color-background) rounded-[2px]"
        aria-live="polite"
      >
        <span className="font-mono text-xs font-semibold text-(--color-accent)">
          [{currentRole.id}]
        </span>
        <div className="overflow-hidden h-5 sm:h-6 flex items-center min-w-[150px] sm:min-w-[185px]">
          <span
            className={`font-mono text-xs sm:text-sm font-semibold text-(--color-foreground) transition-all duration-500 ease-out transform ${
              isTransitioning
                ? "-translate-y-3 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            {currentRole.title}
          </span>
        </div>
      </div>

      {/* Screen-reader static fallback */}
      <span className="sr-only">
        {roles.map((r) => r.title).join(" · ")}
      </span>
    </div>
  );
}
