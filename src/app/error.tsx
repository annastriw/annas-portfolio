"use client";

import { useEffect } from "react";
import Link from "next/link";
import { defaultLocale } from "@/lib/i18n/config";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log unexpected runtime errors locally
    console.error("Runtime application error caught by boundary:", error);
  }, [error]);

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <header className="not-found-header">
          <div className="not-found-meta">
            <span className="not-found-pill">[STATUS // 500]</span>
            <span className="not-found-pill not-found-pill-accent">
              RUNTIME EXCEPTION // EXECUTION FAULT
            </span>
          </div>

          <h1 className="not-found-title">System Interruption</h1>

          <p className="not-found-lead">
            An unexpected error occurred during page rendering. The application
            has isolated the failure to prevent cascading system faults.
          </p>

          {error.digest && (
            <p className="error-digest">
              <code>Error Digest: {error.digest}</code>
            </p>
          )}
        </header>

        <div className="not-found-actions">
          <button type="button" onClick={() => reset()} className="hero-btn-primary">
            <span>↺ Retry Transmission</span>
          </button>
          <Link href={`/${defaultLocale}`} className="hero-btn-secondary">
            <span>Return to Home Base</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
