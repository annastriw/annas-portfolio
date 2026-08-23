import type { ProjectItem } from "@/content/projects/projects-types";
import type { Locale } from "@/lib/i18n/config";

interface ProjectMetaRailProps {
  project: ProjectItem;
  locale: Locale;
}

export function ProjectMetaRail({ project, locale }: ProjectMetaRailProps) {
  const isId = locale === "id";

  const metaItems = [
    {
      label: isId ? "PERAN" : "ROLE",
      value: project.role[locale],
    },
    {
      label: isId ? "KLIEN / MITRA" : "STAKEHOLDER",
      value: project.stakeholder?.[locale] ?? null,
    },
    {
      label: isId ? "STATUS" : "STATUS",
      value: project.status[locale],
    },
    {
      label: isId ? "PERIODE" : "PERIOD",
      value: project.period[locale],
    },
    {
      label: isId ? "KATEGORI" : "CATEGORY",
      value:
        project.category === "web-app"
          ? isId ? "Aplikasi Web" : "Web Application"
          : project.category === "ml"
          ? "Machine Learning"
          : project.category === "mobile"
          ? isId ? "Aplikasi Mobile" : "Mobile Application"
          : isId ? "Lainnya" : "Other",
    },
  ].filter((item) => Boolean(item.value));

  return (
    <aside className="project-meta-rail" aria-label="Project Technical Specifications">
      {/* 01. Specifications Header */}
      <div className="meta-rail-header">
        <span className="meta-rail-tag">[SPECS // 01]</span>
        <h2 className="meta-rail-title">
          {isId ? "SPESIFIKASI TEKNIS" : "TECHNICAL SPECIFICATIONS"}
        </h2>
      </div>

      {/* Meta Item Key-Values */}
      <dl className="meta-rail-list">
        {metaItems.map((item) => (
          <div key={item.label} className="meta-rail-row">
            <dt className="meta-rail-dt">{item.label}</dt>
            <dd className="meta-rail-dd">{item.value}</dd>
          </div>
        ))}

        {/* Live Domain URL */}
        {project.liveUrl && (
          <div className="meta-rail-row meta-rail-live">
            <dt className="meta-rail-dt">{isId ? "URL PRODUKSI" : "PRODUCTION URL"}</dt>
            <dd className="meta-rail-dd">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="live-domain-link"
              >
                <span>{project.liveUrl.replace(/^https?:\/\//, "")}</span>
                <span className="live-domain-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </dd>
          </div>
        )}

        {/* GitHub Repository URL */}
        {project.githubUrl && (
          <div className="meta-rail-row meta-rail-live">
            <dt className="meta-rail-dt">{isId ? "KODE REPOSITORI" : "SOURCE CODE"}</dt>
            <dd className="meta-rail-dd">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="live-domain-link"
              >
                <span>{project.githubUrl.replace(/^https?:\/\//, "")}</span>
                <span className="live-domain-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </dd>
          </div>
        )}
      </dl>

      {/* 02. Verified Metrics Box */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="meta-rail-metrics-section">
          <div className="meta-rail-header">
            <span className="meta-rail-tag">[METRICS // 02]</span>
            <h3 className="meta-rail-title">
              {isId ? "TOLOK UKUR TERVERIFIKASI" : "VERIFIED BENCHMARKS"}
            </h3>
          </div>
          <div className="metrics-grid">
            {project.metrics.map((m, i) => (
              <div key={i} className="metric-box">
                <span className="metric-label">{m.label[locale]}</span>
                <span className="metric-val">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 03. Technology Matrix Rail */}
      <div className="meta-rail-tech-section">
        <div className="meta-rail-header">
          <span className="meta-rail-tag">[STACK // 03]</span>
          <h3 className="meta-rail-title">
            {isId ? "TEKNOLOGI & INFRASTRUKTUR" : "STACK & INFRASTRUCTURE"}
          </h3>
        </div>

        <div className="tech-group-block">
          <span className="tech-group-label">{isId ? "Core Stack" : "Core Stack"}:</span>
          <div className="tech-tag-cloud">
            {project.techStack.core.map((t) => (
              <span key={t} className="tech-pill">
                {t}
              </span>
            ))}
          </div>
        </div>

        {project.techStack.architecture && project.techStack.architecture.length > 0 && (
          <div className="tech-group-block">
            <span className="tech-group-label">{isId ? "Arsitektur Sistem" : "System Architecture"}:</span>
            <div className="tech-tag-cloud">
              {project.techStack.architecture.map((t) => (
                <span key={t} className="tech-pill tech-pill-secondary">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.techStack.qaOrDeployment && project.techStack.qaOrDeployment.length > 0 && (
          <div className="tech-group-block">
            <span className="tech-group-label">{isId ? "QA & Deployment" : "QA & Deployment"}:</span>
            <div className="tech-tag-cloud">
              {project.techStack.qaOrDeployment.map((t) => (
                <span key={t} className="tech-pill tech-pill-subtle">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
