"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import type { Locale } from "@/lib/i18n/config";

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

const SPLASH_TOTAL_DURATION_MS = 6000;
const TYPING_START_MS = 500;
const TYPING_DURATION_MS = 1500; // 500ms to 2000ms (~88ms per char)
const PROGRESS_START_MS = 1000;
const PROGRESS_DURATION_MS = 3300; // 1000ms to 4300ms
const HOLD_START_MS = 4300;
const TRANSIT_START_MS = 5000;
const REVEAL_PAGE_MS = 5500;

export function InitialSplash({ locale = "en" }: InitialSplashProps) {
  const isEligible = useSyncExternalStore(
    subscribe,
    getSplashEligibility,
    getServerSplashEligibility,
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
      document.documentElement.classList.remove("splash-active");
      document.documentElement.classList.add("splash-dismissed");
      return;
    }

    // Ensure splash-active is present on root while splash is playing
    document.documentElement.classList.add("splash-active");
    document.documentElement.classList.remove("splash-dismissed");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      const initTimer = setTimeout(() => {
        setTypedChars(fullText.length);
        setProgress(100);
        setStage("hold");
      }, 0);

      const revealTimer = setTimeout(() => {
        document.documentElement.classList.add("splash-revealing");
      }, 350);

      const transitTimer = setTimeout(() => {
        setStage("transit");
      }, 400);

      const doneTimer = setTimeout(() => {
        try {
          window.sessionStorage.setItem("annas_splash_shown", "1");
        } catch {
          // Ignored
        }
        document.documentElement.classList.remove("splash-active", "splash-revealing");
        document.documentElement.classList.add("splash-dismissed");
        setStage("done");
      }, 700);

      return () => {
        clearTimeout(initTimer);
        clearTimeout(revealTimer);
        clearTimeout(transitTimer);
        clearTimeout(doneTimer);
      };
    }

    // Standard 6-Second Editorial Folio Choreography (REV-02-E):
    // 0–500ms: Editorial folio canvas & masthead metadata appear (stage "init")
    // 500–2000ms: Controlled typesetting character reveal into stable baseline (~88ms/char, stage "typing")
    // 1000–4300ms: Thin publication folio progress rule advances calmly across the track
    // 2000–4300ms: Completed wordmark remains clearly visible while folio rule completes
    // 4300–5000ms: Editorial composition reaches complete state hold (stage "hold")
    // 5000–5900ms: Splash wordmark smoothly glides via FLIP to Header brand position (stage "transit")
    // 5500–6000ms: Page content and Header fade in seamlessly under the landing wordmark
    // 6000ms: Done and fully unmounted (stage "done")

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
    }, TYPING_START_MS);

    const progressStartTimeout = setTimeout(() => {
      const startTime = Date.now();

      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const rawProgress = Math.min(100, Math.round((elapsed / PROGRESS_DURATION_MS) * 100));
        setProgress(rawProgress);

        if (rawProgress >= 100) {
          clearInterval(progressInterval);
        }
      }, 30);
    }, PROGRESS_START_MS);

    const holdTimeout = setTimeout(() => {
      setStage("hold");
    }, HOLD_START_MS);

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

    const pageRevealTimeout = setTimeout(() => {
      document.documentElement.classList.add("splash-revealing");
    }, REVEAL_PAGE_MS);

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

    return () => {
      clearTimeout(typingStartTimeout);
      clearTimeout(progressStartTimeout);
      clearTimeout(holdTimeout);
      clearTimeout(transitTimeout);
      clearTimeout(pageRevealTimeout);
      clearTimeout(doneTimeout);
    };
  }, [isEligible]);

  if (!isEligible || stage === "done") {
    return null;
  }

  const displayedText = fullText.slice(0, typedChars);
  const formattedProgress = String(progress).padStart(2, "0");
  const isTransit = stage === "transit";
  const showCaret = stage === "typing" && typedChars < fullText.length;

  return (
    <div
      className={`initial-splash-overlay stage-${stage}`}
      role="status"
      aria-label="Editorial archive folio opening"
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
            <span className="splash-folio-edition">PORTFOLIO · 2026</span>
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
            <span>SOFTWARE ENGINEERING</span>
            <span className="splash-sub-sep">·</span>
            <span>FULL-STACK</span>
            <span className="splash-sub-sep">·</span>
            <span>MACHINE LEARNING</span>
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
              {isId ? "MEMBUKA ARSIP TEKNIKAL" : "OPENING TECHNICAL ARCHIVE"}
            </span>
            <span className="splash-folio-pagination">{formattedProgress}% · 01 / 01</span>
          </div>
          <div
            className="splash-folio-rule-track"
            role="progressbar"
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
