"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { runtimeErrorCopy, getLocaleFromPathname } from "@/content/site/status-screens";
import styles from "@/components/ui/status-screen.module.css";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

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

export default function GlobalErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Preserve essential diagnostic logging without leaking technical details to UI
    console.error("Runtime application error caught by boundary:", error);
  }, [error]);

  const targetLocale = useSyncExternalStore(
    subscribeNoop,
    getClientLocaleSnapshot,
    getServerLocaleSnapshot
  );

  const homeHref = `/${targetLocale}`;
  const copy = runtimeErrorCopy[targetLocale] || runtimeErrorCopy[defaultLocale];
  const isId = targetLocale === "id";

  return (
    <main
      className={styles.page}
      role="main"
      aria-label={isId ? "Terjadi Kesalahan" : "Something Went Wrong"}
    >
      <div className={styles.container}>
        {/* 1. Main heading, 2. Short explanation */}
        <header className={styles.header}>
          <h1 className={styles.title}>{copy.title}</h1>
          <p className={styles.description}>{copy.description}</p>
        </header>

        {/* 3. Retry and Home actions */}
        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => reset()}
            className={styles.primaryAction}
          >
            <span>{copy.primaryAction}</span>
            <span aria-hidden="true" className={styles.actionArrow}>
              {"\u2192"}
            </span>
          </button>
          <Link href={homeHref} className={styles.secondaryAction}>
            <span>{copy.secondaryAction}</span>
            <span aria-hidden="true" className={styles.actionArrow}>
              {"\u2192"}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
