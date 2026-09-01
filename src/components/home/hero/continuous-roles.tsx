"use client";

import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useSyncExternalStore,
} from "react";

import type { Locale } from "@/lib/i18n/config";
import { siteIdentity } from "@/content/site/identity";

const roles = [
  { id: "01", title: siteIdentity.roles[0] },
  { id: "02", title: siteIdentity.roles[1] },
  { id: "03", title: siteIdentity.roles[2] },
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

interface ContinuousRolesProps {
  locale?: Locale;
  roleIntro?: string;
}

export function ContinuousRoles({
  locale = "en",
  roleIntro,
}: ContinuousRolesProps) {
  const isId = locale === "id";
  const intro = roleIntro ?? (isId ? "Saya seorang" : "I'm a");
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
      className="hero-role-rail w-full border-y border-(--color-border) py-2 my-1"
      role="region"
      aria-label={isId ? "Peran Profesional" : "Professional Roles"}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Screen Reader Static Label */}
      <span className="sr-only">
        {isId
          ? `${intro}: [${activeRole.id}] ${activeRole.title}. Peran tersedia: [01] Software Engineer, [02] Full-Stack Web Developer, [03] Machine Learning Engineer.`
          : `${intro}: [${activeRole.id}] ${activeRole.title}. Available roles: [01] Software Engineer, [02] Full-Stack Web Developer, [03] Machine Learning Engineer.`}
      </span>

      <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
        {/* Left Area: Restrained Marker + I'M A + Active Role Name */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1" aria-hidden="true">
          <span className="text-(--color-accent) font-mono text-xs font-bold shrink-0">
            ■
          </span>
          <span className="font-mono text-xs text-(--color-muted) uppercase tracking-wider font-semibold shrink-0">
            {intro}
          </span>
          <span className="text-(--color-border) font-mono text-xs shrink-0">
            /
          </span>

          {/* Masked Active Role Reel */}
          <div className="hero-role-reel relative overflow-hidden h-6 min-w-0 flex-1 flex items-center">
            {roles.map((role, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <div
                  key={role.id}
                  className={`absolute inset-0 flex items-center font-sans font-semibold text-xs sm:text-sm md:text-base text-(--color-foreground) truncate transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    isCurrent
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : idx < currentIndex
                      ? "opacity-0 -translate-y-full pointer-events-none"
                      : "opacity-0 translate-y-full pointer-events-none"
                  }`}
                >
                  <span className="font-mono text-xs font-bold text-(--color-accent) mr-1.5 shrink-0">
                    [{role.id}]
                  </span>
                  <span className="truncate">{role.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Area: Dedicated 3 Indicators with >= 44px touch targets */}
        <div
          className="hero-role-indicators flex items-center gap-0.5 shrink-0 pl-2 border-l border-(--color-border)/70"
          role="group"
          aria-label={isId ? "Pemilih peran" : "Role selector"}
        >
          {roles.map((role, idx) => {
            const isActive = idx === currentIndex;
            const label = isId
              ? `Tampilkan peran ${role.title}`
              : `Show ${role.title} role`;

            return (
              <button
                key={role.id}
                type="button"
                aria-pressed={isActive}
                aria-label={label}
                onClick={() => selectRole(idx)}
                className="group relative flex items-center justify-center w-7 sm:w-11 min-h-[44px] -my-2.5 cursor-pointer rounded-none transition-colors focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-1"
              >
                <span
                  className={`block rounded-full transition-all duration-300 motion-reduce:transition-none ${
                    isActive
                      ? "w-3 sm:w-3.5 h-1.5 bg-(--color-accent)"
                      : "w-1.5 h-1.5 bg-(--color-border) group-hover:bg-(--color-muted)"
                  }`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
