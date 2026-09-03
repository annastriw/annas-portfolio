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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (prefersReducedMotion) return;

    timerRef.current = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    }, CYCLE_INTERVAL_MS);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    startTimer();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        startTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [prefersReducedMotion, startTimer]);

  const activeIndex = prefersReducedMotion ? 0 : currentIndex;
  const activeRole = roles[activeIndex];

  const isThirdActive = activeIndex === 2;
  const isEnglishPrefix = intro === "I'm a" || intro === "I’m a";
  const activeIntro = isThirdActive && isEnglishPrefix
    ? intro === "I’m a" ? "I’m an" : "I'm an"
    : intro;

  return (
    <div
      className="hero-role-rail w-full border-y border-(--color-border) py-2 my-1"
      role="region"
      aria-label={isId ? "Peran Profesional" : "Professional Roles"}
    >
      {/* Screen Reader Static Label */}
      <span className="sr-only">
        {isId
          ? `${activeIntro}: ${activeRole.title}. Peran profesional: Software Engineer, Full-Stack Web Developer, AI & Machine Learning Enthusiast.`
          : `${activeIntro}: ${activeRole.title}. Professional roles: Software Engineer, Full-Stack Web Developer, AI & Machine Learning Enthusiast.`}
      </span>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 w-full">
        {/* Row 1 on mobile / Left group on desktop: Marker + Intro Prefix + Mobile Ellipsis */}
        <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-2.5 min-w-0" aria-hidden="true">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="text-(--color-accent) font-mono text-xs font-bold shrink-0">
              ■
            </span>
            <span
              className={`font-mono text-xs text-(--color-muted) uppercase tracking-wider font-semibold shrink-0 ${
                isEnglishPrefix ? "min-w-[6ch] inline-block" : ""
              }`}
            >
              {activeIntro}
            </span>
            <span
              className="hidden sm:inline text-(--color-border) font-mono text-xs shrink-0"
              aria-hidden="true"
            >
              /
            </span>
          </div>

          {/* Mobile-only 3-dot ellipsis (aligned right on Row 1) */}
          <div
            className="hero-role-ellipsis sm:hidden flex items-center gap-1 shrink-0 select-none pointer-events-none"
            aria-hidden="true"
          >
            {roles.map((role, idx) => {
              const isActive = idx === activeIndex;
              return (
                <span
                  key={role.id}
                  className={`block w-1.5 h-1.5 rounded-full transition-opacity duration-300 motion-reduce:transition-none ${
                    isActive
                      ? "bg-(--color-accent) opacity-100"
                      : "bg-(--color-muted) opacity-35"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Masked Active Role Reel (Row 2 on mobile, full width available, 0 truncation) */}
        <div
          className="hero-role-reel relative overflow-hidden h-6 min-w-0 flex-1 flex items-center"
          aria-hidden="true"
        >
          {roles.map((role, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <div
                key={role.id}
                className={`absolute inset-0 flex items-center font-sans font-semibold text-xs sm:text-sm md:text-base text-(--color-foreground) truncate transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  isCurrent
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : idx < activeIndex
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

        {/* Desktop 3-dot ellipsis (Far right) */}
        <div
          className="hero-role-ellipsis hidden sm:flex items-center gap-1 shrink-0 select-none pointer-events-none"
          aria-hidden="true"
        >
          {roles.map((role, idx) => {
            const isActive = idx === activeIndex;
            return (
              <span
                key={role.id}
                className={`block w-1.5 h-1.5 rounded-full transition-opacity duration-300 motion-reduce:transition-none ${
                  isActive
                    ? "bg-(--color-accent) opacity-100"
                    : "bg-(--color-muted) opacity-35"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
