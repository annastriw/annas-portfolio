import type { Locale } from "@/lib/i18n/config";

interface ProjectClaimNoticeProps {
  notice?: Record<Locale, string>;
  locale: Locale;
}

export function ProjectClaimNotice({ notice, locale }: ProjectClaimNoticeProps) {
  if (!notice) return null;

  const content = notice[locale];
  if (!content) return null;

  const isId = locale === "id";

  return (
    <aside
      className="project-claim-notice"
      role="note"
      aria-label={isId ? "Batasan Klaim & Integritas Bukti" : "Claim Limitations & Evidence Boundary"}
    >
      <div className="claim-notice-header">
        <span className="claim-notice-marker" aria-hidden="true">
          ⚠
        </span>
        <span className="claim-notice-title">
          {isId ? "BATASAN KLAIM & INTEGRITAS FAKTA" : "CLAIM LIMITATIONS & EVIDENCE INTEGRITY"}
        </span>
      </div>
      <p className="claim-notice-text">{content}</p>
    </aside>
  );
}
