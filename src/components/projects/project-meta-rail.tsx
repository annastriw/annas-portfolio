import type { ProjectMetadata } from "@/lib/projects/project-types";
import type { Locale } from "@/lib/i18n/config";

interface ProjectMetaRailProps {
  metadata: ProjectMetadata;
  locale: Locale;
}

export function ProjectMetaRail({ metadata, locale }: ProjectMetaRailProps) {
  const raw = metadata.raw;
  const isId = locale === "id";

  const metaItems = [
    {
      label: isId ? "PERAN" : "ROLE",
      value: metadata.role,
    },
    {
      label: isId ? "KLIEN / STAKEHOLDER" : "STAKEHOLDER",
      value: metadata.stakeholder,
    },
    {
      label: isId ? "STATUS" : "STATUS",
      value: metadata.status,
    },
    {
      label: isId ? "PERIODE" : "PERIOD",
      value: metadata.period,
    },
    {
      label: isId ? "DURASI" : "DURATION",
      value: metadata.duration,
    },
    {
      label: isId ? "LOKASI" : "LOCATION",
      value: metadata.location,
    },
    {
      label: isId ? "TIM / STRUKTUR" : "TEAM",
      value: typeof raw.tim === "string" ? raw.tim : null,
    },
    {
      label: isId ? "DIVISI" : "DIVISION",
      value: typeof raw.divisi === "string" ? raw.divisi : null,
    },
    {
      label: isId ? "PLATFORM" : "PLATFORM",
      value: typeof raw.platform === "string" ? raw.platform : null,
    },
    {
      label: isId ? "BAHASA UTAMA" : "CORE LANGUAGE",
      value: typeof raw.bahasa_utama === "string" ? raw.bahasa_utama : null,
    },
    {
      label: isId ? "MODEL UTAMA" : "CORE MODEL",
      value: typeof raw.model_utama === "string" ? raw.model_utama : null,
    },
    {
      label: isId ? "PRIMARY TOOLS" : "PRIMARY TOOLS",
      value: typeof raw.primary_tool === "string" ? raw.primary_tool : null,
    },
  ].filter((item) => Boolean(item.value));

  const liveDomain =
    typeof raw.live_domain === "string" && raw.live_domain.trim()
      ? raw.live_domain.trim()
      : null;

  return (
    <aside className="project-meta-rail" aria-label="Project Technical Specifications">
      <div className="meta-rail-header">
        <span className="meta-rail-tag">[SPECS // 01]</span>
        <h2 className="meta-rail-title">
          {isId ? "SPESIFIKASI TEKNIS" : "TECHNICAL SPECIFICATIONS"}
        </h2>
      </div>

      <dl className="meta-rail-list">
        {metaItems.map((item) => (
          <div key={item.label} className="meta-rail-row">
            <dt className="meta-rail-dt">{item.label}</dt>
            <dd className="meta-rail-dd">{item.value}</dd>
          </div>
        ))}

        {liveDomain && (
          <div className="meta-rail-row meta-rail-live">
            <dt className="meta-rail-dt">{isId ? "DOMAIN LIVE" : "LIVE DOMAIN"}</dt>
            <dd className="meta-rail-dd">
              <a
                href={
                  liveDomain.startsWith("http")
                    ? liveDomain
                    : `https://${liveDomain}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="live-domain-link"
              >
                <span>{liveDomain}</span>
                <span className="live-domain-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </dd>
          </div>
        )}
      </dl>
    </aside>
  );
}
