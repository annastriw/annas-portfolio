import Link from "next/link";
import { defaultLocale } from "@/lib/i18n/config";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        {/* Header Rail */}
        <header className="not-found-header">
          <div className="not-found-meta">
            <span className="not-found-pill">[STATUS // 404]</span>
            <span className="not-found-pill not-found-pill-accent">
              SIGNAL LOST // TRANSMISSION UNRESOLVED
            </span>
          </div>

          <h1 className="not-found-title">Index Not Found</h1>

          <p className="not-found-lead">
            The requested archive record or transmission path does not exist,
            has been relocated, or is unavailable in the current index.
          </p>
        </header>

        {/* Recovery Navigation Grid */}
        <section className="not-found-recovery" aria-label="Available archive routes">
          <h2 className="recovery-heading">AVAILABLE ARCHIVE DESTINATIONS</h2>

          <div className="recovery-grid">
            <Link href={`/${defaultLocale}`} className="recovery-card">
              <span className="recovery-index">[00]</span>
              <div className="recovery-info">
                <span className="recovery-title">Home Landing</span>
                <span className="recovery-desc">Primary overview & selected work</span>
              </div>
              <span className="recovery-arrow" aria-hidden="true">→</span>
            </Link>

            <Link href={`/${defaultLocale}/projects`} className="recovery-card">
              <span className="recovery-index">[01]</span>
              <div className="recovery-info">
                <span className="recovery-title">Projects Archive</span>
                <span className="recovery-desc">Complete index of software systems</span>
              </div>
              <span className="recovery-arrow" aria-hidden="true">→</span>
            </Link>

            <Link href={`/${defaultLocale}/about`} className="recovery-card">
              <span className="recovery-index">[02]</span>
              <div className="recovery-info">
                <span className="recovery-title">About & Profile</span>
                <span className="recovery-desc">Academic background & verified credentials</span>
              </div>
              <span className="recovery-arrow" aria-hidden="true">→</span>
            </Link>

            <Link href={`/${defaultLocale}/blog`} className="recovery-card">
              <span className="recovery-index">[03]</span>
              <div className="recovery-info">
                <span className="recovery-title">Dispatches & Notes</span>
                <span className="recovery-desc">Technical essays & architecture notes</span>
              </div>
              <span className="recovery-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* Footer Return Action */}
        <div className="not-found-actions">
          <Link href={`/${defaultLocale}`} className="hero-btn-primary">
            <span>← Return to Home Base</span>
          </Link>
          <Link href={`/${defaultLocale}/#contact`} className="hero-btn-secondary">
            <span>Report Transmission Issue</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
