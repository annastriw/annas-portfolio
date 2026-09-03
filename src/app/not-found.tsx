"use client";

import { useEffect, useState, useRef, useSyncExternalStore, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { notFoundCopy, getLocaleFromPathname } from "@/content/site/status-screens";
import styles from "@/components/ui/status-screen.module.css";

const REDIRECT_DURATION_MS = 6000;

function getClientLocaleSnapshot(): Locale {
  if (typeof window !== "undefined") {
    return getLocaleFromPathname(window.location.pathname);
  }
  return defaultLocale;
}

function getServerLocaleSnapshot(): Locale {
  return defaultLocale;
}

function subscribeNoop() {
  return () => {};
}

export default function NotFound() {
  const router = useRouter();
  const targetLocale = useSyncExternalStore(
    subscribeNoop,
    getClientLocaleSnapshot,
    getServerLocaleSnapshot
  );

  const [progress, setProgress] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasNavigatedRef = useRef<boolean>(false);

  const homeHref = `/${targetLocale}`;
  const projectsHref = `/${targetLocale}/projects`;
  const copy = notFoundCopy[targetLocale] || notFoundCopy[defaultLocale];
  const isId = targetLocale === "id";

  const cancelPendingRedirect = useCallback(() => {
    hasNavigatedRef.current = true;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    hasNavigatedRef.current = false;
    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / REDIRECT_DURATION_MS) * 100);
      setProgress(pct);

      if (elapsed >= REDIRECT_DURATION_MS) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 40);

    timerRef.current = setTimeout(() => {
      if (!hasNavigatedRef.current) {
        hasNavigatedRef.current = true;
        router.push(homeHref);
      }
    }, REDIRECT_DURATION_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [router, homeHref]);

  return (
    <main
      className={styles.page}
      role="main"
      aria-label={isId ? "404 Halaman Tidak Ditemukan" : "404 Page Not Found"}
    >
      <div className={styles.container}>
        {/* 1. 404 marker, 2. Main heading, 3. Description */}
        <header className={styles.header}>
          <span className={styles.marker}>{copy.marker}</span>
          <h1 className={styles.title}>{copy.title}</h1>
          <p className={styles.description}>{copy.description}</p>
        </header>

        {/* 4. Two actions (Back to Home, Explore Projects) */}
        <div className={styles.actions}>
          <Link
            href={homeHref}
            onClick={cancelPendingRedirect}
            className={styles.primaryAction}
          >
            <span>{copy.primaryAction}</span>
            <span aria-hidden="true" className={styles.actionArrow}>
              {"\u2192"}
            </span>
          </Link>
          <Link
            href={projectsHref}
            onClick={cancelPendingRedirect}
            className={styles.secondaryAction}
          >
            <span>{copy.secondaryAction}</span>
            <span aria-hidden="true" className={styles.actionArrow}>
              {"\u2192"}
            </span>
          </Link>
        </div>

        {/* 5. Small redirect notice, 6. Thin progress bar */}
        <div className={styles.progressSection}>
          <p className={styles.redirectNotice}>{copy.redirectNotice}</p>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-label={copy.redirectNotice}
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
