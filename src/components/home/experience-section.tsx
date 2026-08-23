import type { Locale } from "@/lib/i18n/config";
import { experiencesData } from "@/content/experience/experience-data";

interface ExperienceSectionProps {
  locale: Locale;
}

export function ExperienceSection({ locale }: ExperienceSectionProps) {
  const isId = locale === "id";

  return (
    <section className="home-experience-section" aria-label="Professional Experience">
      <div className="home-experience-container">
        {/* Section Header */}
        <div className="home-section-header">
          <div className="section-header-meta">
            <span className="section-meta-tag">[02 // TRACK RECORD]</span>
            <span className="section-meta-tag">
              {isId ? "PENGALAMAN & REKAM JEJAK" : "EXPERIENCE & REPUTATION"}
            </span>
          </div>
          <h2 className="section-title">
            {isId ? "Pengalaman & Riwayat Rekayasa" : "Engineering & Professional Experience"}
          </h2>
          <p className="section-subtitle">
            {isId
              ? "Riwayat keterlibatan dalam rekayasa perangkat lunak, peran magang institusi, dan pengembangan sistem nyata berlandaskan bukti otentik."
              : "Documented history in software engineering, institutional developer internship, and applied system architectures grounded in authentic evidence."}
          </p>
        </div>

        {/* Timeline List */}
        <div className="experience-timeline">
          {experiencesData.map((exp, idx) => {
            const indexFormatted = String(idx + 1).padStart(2, "0");

            return (
              <article key={exp.id} className="timeline-item">
                <div className="timeline-meta-col">
                  <span className="timeline-index">[{indexFormatted}]</span>
                  <span className="timeline-period">{exp.period}</span>
                  <span className="timeline-type">{exp.type}</span>
                </div>

                <div className="timeline-content-col">
                  <div className="timeline-header">
                    <h3 className="timeline-role">{exp.role[locale]}</h3>
                    <p className="timeline-org">{exp.organization[locale]}</p>
                    <span className="timeline-loc">{exp.location}</span>
                  </div>

                  <p className="timeline-desc">{exp.description[locale]}</p>

                  <ul className="timeline-highlights">
                    {exp.highlights[locale].map((h, i) => (
                      <li key={i} className="timeline-highlight-item">
                        <span className="highlight-bullet" aria-hidden="true">
                          ▸
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technology Tags */}
                  <div className="timeline-tech-tags flex flex-wrap gap-2 pt-3">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="tech-pill tech-pill-subtle text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
