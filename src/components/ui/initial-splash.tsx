"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import type { Locale } from "@/lib/i18n/config";
import { siteIdentity } from "@/content/site/identity";

interface InitialSplashProps {
  locale?: Locale;
}

function subscribe() {
  return () => {};
}

function getSplashEligibility(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const alreadyShown = window.sessionStorage.getItem("annas_splash_shown");
    return !alreadyShown;
  } catch {
    return false;
  }
}

function getServerSplashEligibility(): boolean {
  return true;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerReducedMotion(): boolean {
  return false;
}

const SPLASH_TOTAL_DURATION_MS = 4000;
const TYPING_START_MS = 250;
const TYPING_DURATION_MS = 1400; // 250ms to 1650ms (~77ms per char)
const PROGRESS_START_MS = 400;
const PROGRESS_DURATION_MS = 2500; // 400ms to 2900ms
const HOLD_START_MS = 1650;
const TRANSIT_START_MS = 3100;
const REVEAL_PAGE_MS = 3500;

export function InitialSplash({ locale = "en" }: InitialSplashProps) {
  const isEligible = useSyncExternalStore(
    subscribe,
    getSplashEligibility,
    getServerSplashEligibility,
  );
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  const [stage, setStage] = useState<"init" | "typing" | "hold" | "transit" | "done">("init");
  const [typedChars, setTypedChars] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [transformStyle, setTransformStyle] = useState<React.CSSProperties>({});
  const splashWordmarkRef = useRef<HTMLDivElement>(null);

  const fullText = "annastriwidagdo.me";
  const isId = locale === "id";

  useEffect(() => {
    if (!isEligible) {
      document.documentElement.classList.remove("splash-active", "splash-revealing");
      document.documentElement.classList.add("splash-dismissed");
      return;
    }

    // Ensure splash-active is present on root while splash is active
    document.documentElement.classList.add("splash-active");
    document.documentElement.classList.remove("splash-dismissed");

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    if (isReducedMotion) {
      // 4-Second Reduced-Motion Static Folio:
      // Displays full static wordmark, static roles, and static progress representation
      // without typewriter, ticker, FLIP movement, or blinking animations.
      const pageRevealTimeout = setTimeout(() => {
        document.documentElement.classList.add("splash-revealing");
      }, REVEAL_PAGE_MS);
      timeouts.push(pageRevealTimeout);

      const doneTimeout = setTimeout(() => {
        try {
          window.sessionStorage.setItem("annas_splash_shown", "1");
        } catch {
          // Ignored
        }
        document.documentElement.classList.remove("splash-active", "splash-revealing");
        document.documentElement.classList.add("splash-dismissed");
        setStage("done");
      }, SPLASH_TOTAL_DURATION_MS);
      timeouts.push(doneTimeout);
    } else {
      // Standard 4-Second Editorial Folio Choreography (Global Shell 04):
      // 0–250ms: Editorial folio canvas & masthead metadata appear (stage "init")
      // 250–1650ms: Controlled typesetting character reveal into stable baseline (~77ms/char, stage "typing")
      // 400–2900ms: Thin publication folio progress rule advances smoothly across the track (0% -> 100%)
      // 1650–3100ms: Complete editorial composition holds with full wordmark & roles (stage "hold")
      // 3100–3650ms: Splash wordmark smoothly glides via FLIP to Header brand position (stage "transit")
      // 3500–4000ms: Page content and Header fade in seamlessly under the landing wordmark (splash-revealing)
      // 4000ms: Done and fully unmounted (stage "done")

      const typingStartTimeout = setTimeout(() => {
        setStage("typing");
        const totalChars = fullText.length;
        const typingIntervalMs = Math.floor(TYPING_DURATION_MS / totalChars);

        let charCount = 0;
        const typeTimer = setInterval(() => {
          charCount += 1;
          setTypedChars(charCount);
          if (charCount >= totalChars) {
            clearInterval(typeTimer);
          }
        }, typingIntervalMs);
        intervals.push(typeTimer);
      }, TYPING_START_MS);
      timeouts.push(typingStartTimeout);

      const progressStartTimeout = setTimeout(() => {
        const startTime = Date.now();

        const progressInterval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const rawProgress = Math.min(100, Math.round((elapsed / PROGRESS_DURATION_MS) * 100));
          setProgress(rawProgress);

          if (rawProgress >= 100) {
            clearInterval(progressInterval);
          }
        }, 25);
        intervals.push(progressInterval);
      }, PROGRESS_START_MS);
      timeouts.push(progressStartTimeout);

      const holdTimeout = setTimeout(() => {
        setStage("hold");
      }, HOLD_START_MS);
      timeouts.push(holdTimeout);

      const transitTimeout = setTimeout(() => {
        // Calculate FLIP transform from Splash wordmark to Header brand anchor
        const headerBrandEl = document.getElementById("site-header-brand");
        const splashBrandEl = splashWordmarkRef.current;

        if (headerBrandEl && splashBrandEl) {
          const targetRect = headerBrandEl.getBoundingClientRect();
          const sourceRect = splashBrandEl.getBoundingClientRect();

          const deltaX = targetRect.left - sourceRect.left;
          const deltaY = targetRect.top - sourceRect.top;
          const scaleX = targetRect.width / sourceRect.width;
          const scaleY = targetRect.height / sourceRect.height;

          setTransformStyle({
            transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleX}, ${scaleY})`,
            transformOrigin: "0 0",
          });
        }

        setStage("transit");
      }, TRANSIT_START_MS);
      timeouts.push(transitTimeout);

      const pageRevealTimeout = setTimeout(() => {
        document.documentElement.classList.add("splash-revealing");
      }, REVEAL_PAGE_MS);
      timeouts.push(pageRevealTimeout);

      const doneTimeout = setTimeout(() => {
        try {
          window.sessionStorage.setItem("annas_splash_shown", "1");
        } catch {
          // Ignored
        }
        document.documentElement.classList.remove("splash-active", "splash-revealing");
        document.documentElement.classList.add("splash-dismissed");
        setStage("done");
      }, SPLASH_TOTAL_DURATION_MS);
      timeouts.push(doneTimeout);
    }

    return () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [isEligible, isReducedMotion, fullText]);

  if (!isEligible || stage === "done") {
    return null;
  }

  const effectiveStage = isReducedMotion && stage === "init" ? "hold" : stage;
  const displayedText = isReducedMotion ? fullText : fullText.slice(0, typedChars);
  const effectiveProgress = isReducedMotion ? 100 : progress;
  const formattedProgress = String(effectiveProgress).padStart(2, "0");
  const isTransit = effectiveStage === "transit";
  const showCaret = !isReducedMotion && effectiveStage === "typing" && typedChars < fullText.length;

  return (
    <div
      className={`initial-splash-overlay stage-${effectiveStage}`}
      role="status"
      tabIndex={-1}
      aria-label={isId ? "Pembukaan arsip editorial" : "Editorial archive folio opening"}
    >
      <div className="splash-folio-container">
        {/* Top Editorial Masthead Meta */}
        <header
          className={`splash-folio-header ${isTransit ? "splash-element-fade" : ""}`}
          aria-hidden="true"
        >
          <div className="splash-folio-meta-left">
            <span className="splash-folio-author">ANNAS TRI WIDAGDO</span>
            <span className="splash-folio-sep">/</span>
            <span className="splash-folio-edition">PORTFOLIO · {new Date().getFullYear()}</span>
          </div>
          <div className="splash-folio-meta-right">
            <span className="splash-folio-index">VOL. 01 // TECHNICAL ARCHIVE</span>
          </div>
        </header>

        {/* Center-Left Dominant Typographic Section (Direct Canvas Placement) */}
        <div className="splash-folio-body">
          <div
            ref={splashWordmarkRef}
            className={`splash-editorial-brand ${isTransit ? "brand-in-transit" : ""}`}
            style={transformStyle}
          >
            <span className="brand-marker" aria-hidden="true">
              ■
            </span>
            <span className="brand-wordmark splash-editorial-wordmark">
              <span aria-hidden="true">{displayedText}</span>
              {showCaret && (
                <span className="splash-editorial-caret" aria-hidden="true">
                  _
                </span>
              )}
            </span>
            <span className="sr-only">annastriwidagdo.me</span>
          </div>

          <div
            className={`splash-editorial-subtitle ${isTransit ? "splash-element-fade" : ""}`}
            aria-hidden="true"
          >
            <span>{siteIdentity.roles[0].toUpperCase()}</span>
            <span className="splash-sub-sep">·</span>
            <span>{siteIdentity.roles[1].toUpperCase()}</span>
            <span className="splash-sub-sep">·</span>
            <span>{siteIdentity.roles[2].toUpperCase()}</span>
          </div>
        </div>

        {/* Bottom Publication Folio Progress Rule */}
        <footer
          className={`splash-folio-footer ${isTransit ? "splash-element-fade" : ""}`}
          aria-hidden="true"
        >
          <div className="splash-folio-rule-meta">
            <span className="splash-folio-entry">ENTRY 001</span>
            <span className="splash-folio-status">
              {isId ? "MEMBUKA ARSIP TEKNIS" : "OPENING TECHNICAL ARCHIVE"}
            </span>
            <span className="splash-folio-pagination">{formattedProgress}% · 01 / 01</span>
          </div>
          <div
            className="splash-folio-rule-track"
            role="progressbar"
            aria-label={isId ? "Kemajuan pembukaan arsip" : "Archive loading progress"}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="splash-folio-rule-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </footer>
      </div>
    </div>
  );
}
