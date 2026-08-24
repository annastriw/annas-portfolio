"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const REDIRECT_DURATION_MS = 6000;

function getClientLocaleSnapshot(): "en" | "id" {
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;
    if (pathname.startsWith("/id") || pathname.includes("/id/")) {
      return "id";
    }
  }
  return "en";
}

function subscribeNoop() {
  return () => {};
}

function getServerLocaleSnapshot(): "en" | "id" {
  return "en";
}

export default function NotFound() {
  const router = useRouter();
  const targetLocale = useSyncExternalStore(
    subscribeNoop,
    getClientLocaleSnapshot,
    getServerLocaleSnapshot
  );

  const [progress, setProgress] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(6);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startTime = Date.now();

    // Progress update interval
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / REDIRECT_DURATION_MS) * 100));
      const rem = Math.max(0, Math.ceil((REDIRECT_DURATION_MS - elapsed) / 1000));
      setProgress(pct);
      setSecondsRemaining(rem);

      if (elapsed >= REDIRECT_DURATION_MS) {
        clearInterval(interval);
      }
    }, 40);

    // Redirect timer
    timerRef.current = setTimeout(() => {
      router.push(`/${targetLocale}`);
    }, REDIRECT_DURATION_MS);

    return () => {
      clearInterval(interval);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [router, targetLocale]);

  const isId = targetLocale === "id";
  const homeHref = `/${targetLocale}`;

  const copy = {
    tag: isId ? "[404 // HALAMAN TIDAK DITEMUKAN]" : "[404 // PAGE NOT FOUND]",
    subtag: isId ? "STATUS DOKUMEN: TIDAK TERSEDIA" : "DOCUMENT STATUS: NOT FOUND",
    title: isId ? "Halaman Tidak Ditemukan" : "Document Not Found",
    description: isId
      ? "Halaman yang Anda cari tidak tersedia. Anda akan diarahkan kembali ke halaman utama."
      : "The document you requested could not be found. Returning you to the portfolio home page.",
    returningLabel: isId ? "MENGALIHKAN KE BERANDA" : "RETURNING TO HOME",
    manualCta: isId ? "Kembali ke Beranda Sekarang" : "Return Home Now",
    exploreCta: isId ? "Jelajahi Proyek" : "Browse Projects",
  };

  return (
    <main
      className="not-found-page min-h-[80vh] flex items-center justify-center py-16 px-4"
      role="main"
      aria-label="404 Page Not Found"
    >
      <div className="not-found-container w-full max-w-2xl mx-auto border border-(--color-border) bg-(--color-background) p-6 sm:p-10 flex flex-col gap-8 shadow-sm">
        {/* Header Rail */}
        <header className="not-found-header flex flex-col gap-3 border-b border-(--color-border) pb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-(--color-muted)">
            <span className="text-(--color-accent) font-semibold">{copy.tag}</span>
            <span>{copy.subtag}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-(--color-foreground) font-normal m-0 tracking-tight">
            {copy.title}
          </h1>

          <p className="text-sm sm:text-base text-(--color-muted) leading-relaxed m-0 max-w-xl">
            {copy.description}
          </p>
        </header>

        {/* 6-Second Redirect Progress Indicator */}
        <div
          className="not-found-progress-block flex flex-col gap-2.5 bg-(--color-surface-subtle,var(--color-background)) border border-(--color-border) p-4 sm:p-5"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="font-semibold text-(--color-foreground)">
              {copy.returningLabel}
            </span>
            <span className="text-(--color-accent) font-bold">
              {`${secondsRemaining}s (${progress}%)`}
            </span>
          </div>

          {/* Progress Rule */}
          <div
            className="not-found-progress-track w-full h-[2px] bg-(--color-border) relative overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="not-found-progress-fill absolute top-0 left-0 h-full bg-(--color-accent) transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between font-mono text-[11px] text-(--color-muted)">
            <span>INDEX 00</span>
            <span>HOME BASE {targetLocale.toUpperCase()}</span>
            <span>100%</span>
          </div>
        </div>

        {/* Actions Rail */}
        <div className="not-found-actions flex flex-wrap items-center gap-4 pt-2">
          <Link
            href={homeHref}
            className="hero-btn-primary inline-flex items-center gap-2 font-mono text-xs font-semibold px-5 py-3 border border-(--color-foreground) bg-(--color-foreground) text-(--color-background) hover:bg-(--color-accent) hover:border-(--color-accent) transition-colors"
          >
            <span>← {copy.manualCta}</span>
          </Link>
          <Link
            href={`/${targetLocale}/projects`}
            className="hero-btn-secondary inline-flex items-center gap-2 font-mono text-xs px-5 py-3 border border-(--color-border) bg-(--color-background) text-(--color-foreground) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
          >
            <span>{copy.exploreCta} →</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
