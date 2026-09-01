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
      className="hero-roles-module inline-flex max-w-full"
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

      {/* Main Single Role Box with Integrated Three Dot Indicators */}
      <div className="hero-role-display inline-flex items-center justify-between gap-2.5 sm:gap-3.5 px-3 sm:px-3.5 py-1.5 sm:py-2 min-h-[40px] sm:min-h-[44px] border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) rounded-none max-w-full">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0" aria-hidden="true">
          <span className="font-mono text-xs font-bold text-(--color-accent) shrink-0">
            [{activeRole.id}]
          </span>
          <span className="text-(--color-border) text-xs" aria-hidden="true">
            /
          </span>

          {/* Masked Vertical Reel for Active Role */}
          <div className="hero-role-reel relative overflow-hidden h-6 sm:h-7 min-w-[165px] sm:min-w-[200px] md:min-w-[230px] flex items-center">
            {roles.map((role, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <div
                  key={role.id}
                  className={`absolute inset-0 flex items-center font-sans font-medium text-xs sm:text-sm md:text-base text-(--color-foreground) whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    isCurrent
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : idx < currentIndex
                      ? "opacity-0 -translate-y-full pointer-events-none"
                      : "opacity-0 translate-y-full pointer-events-none"
                  }`}
                >
                  {role.title}
                </div>
              );
            })}
          </div>
        </div>

        {/* Integrated Three Dot Indicators */}
        <div
          className="hero-role-dots flex items-center gap-0.5 shrink-0 pl-1.5 sm:pl-2 border-l border-(--color-border)/70"
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
                className="group relative flex items-center justify-center min-w-[44px] min-h-[44px] sm:min-w-[36px] sm:min-h-[36px] cursor-pointer rounded-none transition-colors focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-1"
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
