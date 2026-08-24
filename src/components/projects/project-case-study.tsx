import Image from "next/image";
import Link from "next/link";

import type { ProjectCaseStudy, ProjectCaseStudyLocale } from "@/content/projects/project-case-studies";
import styles from "./project-case-study.module.css";

interface ProjectCaseStudyViewProps {
  project: ProjectCaseStudy;
  locale: ProjectCaseStudyLocale;
  previous: ProjectCaseStudy | null;
  next: ProjectCaseStudy | null;
}

function EditorialList({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.editorialList}>
      {items.map((item, index) => (
        <li key={item} className={styles.editorialListItem}>
          <span className={styles.listIndex} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectCaseStudyView({ project, locale, previous, next }: ProjectCaseStudyViewProps) {
  const isId = locale === "id";
  const projectsHref = `/${locale}/projects`;
  const copy = {
    back: isId ? "Kembali ke Proyek" : "Back to Projects",
    overview: isId ? "Ringkasan" : "Overview",
    contribution: isId ? "Kontribusi Saya" : "My Contribution",
    technical: isId ? "Catatan Teknis Utama" : "Key Technical Notes",
    evidence: isId ? "Bukti Visual" : "Visual Evidence",
    stack: "Tech Stack",
    status: isId ? "Status & Tautan" : "Status & Link",
    role: isId ? "Peran" : "Role",
    period: isId ? "Periode" : "Period",
    verifiedStatus: isId ? "Status terverifikasi" : "Verified status",
    openLive: isId ? "Buka sistem live" : "Visit live system",
    noPublicLink: isId ? "Tidak ada tautan publik terverifikasi." : "No verified public link is available.",
    previous: isId ? "Proyek sebelumnya" : "Previous project",
    next: isId ? "Proyek berikutnya" : "Next project",
    start: isId ? "Awal arsip" : "Start of archive",
    end: isId ? "Akhir arsip" : "End of archive",
    claim: isId ? "Batas klaim" : "Claim boundary",
  };

  return (
    <article className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label={copy.back}>
          <Link href={projectsHref} className={styles.backLink}>
            <span aria-hidden="true">←</span><span>{copy.back}</span>
          </Link>
          <span className={styles.routePath} aria-hidden="true">/ {locale.toUpperCase()} / PROJECTS / {project.slug}</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.headerIndex} aria-hidden="true">{project.index}</div>
          <div className={styles.headerNarrative}>
            <p className={styles.category}>{project.categoryLabel[locale]}</p>
            <h1 className={styles.title}>{project.title[locale]}</h1>
            <ul className={styles.compactStack} aria-label={copy.stack}>
              {project.techStack.slice(0, 5).map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          </div>
          <dl className={styles.headerMeta}>
            <div className={styles.metaRow}><dt>{copy.role}</dt><dd>{project.role[locale]}</dd></div>
            {project.period ? <div className={styles.metaRow}><dt>{copy.period}</dt><dd>{project.period[locale]}</dd></div> : null}
            <div className={styles.metaRow}><dt>{copy.verifiedStatus}</dt><dd>{project.status[locale]}</dd></div>
          </dl>
        </header>

        <figure className={styles.coverFigure}>
          <div className={styles.coverFrame}>
            <Image src={project.cover.src} alt={project.cover.alt[locale]} fill priority sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1536px) calc(100vw - 4rem), 1440px" className={`${styles.coverImage} ${project.cover.position === "top" ? styles.imageTop : styles.imageCenter}`} />
          </div>
          <figcaption className={styles.coverCaption}><span>PROJECT COVER</span><span>{project.title[locale]}</span></figcaption>
        </figure>

        <div className={styles.caseStudy}>
          <section className={`${styles.section} ${styles.overviewSection}`}>
            <div className={styles.sectionLabel}><span>01</span><h2>{copy.overview}</h2></div>
            <div className={styles.overviewCopy}>
              {project.overview[locale].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {project.claimBoundary ? <aside className={styles.claimBoundary}><span>{copy.claim}</span><p>{project.claimBoundary[locale]}</p></aside> : null}
            </div>
          </section>

          <div className={styles.splitSections}>
            <section className={styles.section}>
              <div className={styles.sectionLabel}><span>02</span><h2>{copy.contribution}</h2></div>
              <EditorialList items={project.contributions[locale]} />
            </section>
            <section className={styles.section}>
              <div className={styles.sectionLabel}><span>03</span><h2>{copy.technical}</h2></div>
              <EditorialList items={project.technicalNotes[locale]} />
            </section>
          </div>

          <section className={`${styles.section} ${styles.evidenceSection}`}>
            <div className={styles.sectionLabel}><span>04</span><h2>{copy.evidence}</h2></div>
            <div className={`${styles.evidenceGrid} ${project.evidence.every((figure) => figure.format === "mobile") ? styles.mobileEvidenceGrid : ""}`}>
              {project.evidence.map((figure) => (
                <figure key={figure.id} className={styles.evidenceFigure}>
                  <div className={`${styles.evidenceFrame} ${figure.format === "mobile" ? styles.mobileFrame : styles.wideFrame}`}>
                    <Image src={figure.src} alt={figure.alt[locale]} fill loading="lazy" sizes={figure.format === "mobile" ? "(max-width: 767px) 70vw, 360px" : "(max-width: 767px) calc(100vw - 2rem), (max-width: 1200px) calc(100vw - 4rem), 1200px"} className={styles.evidenceImage} />
                  </div>
                  <figcaption className={styles.figureCaption}><span className={styles.figureId}>{figure.id}</span><span>{figure.caption[locale]}</span></figcaption>
                </figure>
              ))}
            </div>
          </section>

          <div className={styles.closingGrid}>
            <section className={styles.section}>
              <div className={styles.sectionLabel}><span>05</span><h2>{copy.stack}</h2></div>
              <ul className={styles.stackDirectory}>{project.techStack.map((technology) => <li key={technology}>{technology}</li>)}</ul>
            </section>
            <section className={styles.section}>
              <div className={styles.sectionLabel}><span>06</span><h2>{copy.status}</h2></div>
              <div className={styles.statusBlock}>
                <p>{project.status[locale]}</p>
                {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.liveLink}><span>{copy.openLive}</span><span aria-hidden="true">↗</span></a> : <span className={styles.noLink}>{copy.noPublicLink}</span>}
              </div>
            </section>
          </div>
        </div>

        <nav className={styles.adjacentNav} aria-label={`${copy.previous} / ${copy.next}`}>
          <div className={styles.adjacentSlot}>
            {previous ? <Link href={`/${locale}/projects/${previous.slug}`} className={styles.adjacentLink}><span>← {copy.previous}</span><strong>{previous.title[locale]}</strong></Link> : <span className={styles.adjacentDisabled}>{copy.start}</span>}
          </div>
          <Link href={projectsHref} className={styles.archiveLink}>{copy.back}</Link>
          <div className={`${styles.adjacentSlot} ${styles.adjacentNext}`}>
            {next ? <Link href={`/${locale}/projects/${next.slug}`} className={styles.adjacentLink}><span>{copy.next} →</span><strong>{next.title[locale]}</strong></Link> : <span className={styles.adjacentDisabled}>{copy.end}</span>}
          </div>
        </nav>
      </div>
    </article>
  );
}
