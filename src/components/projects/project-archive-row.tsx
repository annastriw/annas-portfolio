import Image from "next/image";
import Link from "next/link";

import type {
  ProjectArchiveItem,
  ProjectArchiveLocale,
} from "@/content/projects/project-archive";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

import styles from "./project-archive.module.css";

interface ProjectArchiveRowProps {
  project: ProjectArchiveItem;
  locale: ProjectArchiveLocale;
}

const categoryLabels: Record<
  ProjectArchiveItem["category"],
  Record<ProjectArchiveLocale, string>
> = {
  "web-app": { en: "Web Application", id: "Aplikasi Web" },
  ml: { en: "Machine Learning", id: "Machine Learning" },
  mobile: { en: "Mobile", id: "Mobile" },
  other: { en: "Other", id: "Lainnya" },
};

export function ProjectArchiveRow({
  project,
  locale,
}: ProjectArchiveRowProps) {
  const isId = locale === "id";
  const detailHref = `/${locale}/projects/${project.slug}`;

  return (
    <li className={styles.rowShell}>
      <ScrollReveal animationClass="animate-editorial-fade" threshold={0.04}>
        <article className={styles.row}>
          {/* Large Master Index */}
          <div className={styles.indexCol}>
            <span className={styles.indexNumber}>{project.index}</span>
            <span className={styles.indexDot} aria-hidden="true">
              {"//"}
            </span>
          </div>

          {/* Narrative Column: Category, Title, Short Summary, Action Links */}
          <div className={styles.narrativeCol}>
            {/* Mobile-Only Header */}
            <div className={styles.mobileHeader}>
              <div className={styles.mobileIndexGroup}>
                <span className={styles.mobileIndex}>{project.index}</span>
                <span className={styles.mobileCategory}>
                  {categoryLabels[project.category][locale]}
                </span>
              </div>
              <span className={styles.mobileStatusBadge}>
                {project.status[locale]}
              </span>
            </div>

            {/* Desktop Category Subtag */}
            <div className={styles.categoryBadge}>
              <span>{categoryLabels[project.category][locale]}</span>
            </div>

            <h3 className={styles.title}>
              <Link href={detailHref} className={styles.titleLink}>
                {project.title[locale]}
              </Link>
            </h3>

            <p className={styles.summary}>{project.summary[locale]}</p>

            <div className={styles.actions}>
              <Link
                href={detailHref}
                className={styles.actionPrimary}
                aria-label={`${isId ? "Lihat studi kasus lengkap" : "View complete case study"}: ${project.title[locale]}`}
              >
                <span>{isId ? "Lihat Studi Kasus" : "View Case Study"}</span>
                <span className={styles.actionArrow} aria-hidden="true">
                  →
                </span>
              </Link>

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionSecondary}
                  aria-label={`${isId ? "Buka sistem live di tab baru" : "Visit live system in new tab"}: ${project.title[locale]}`}
                >
                  <span>{isId ? "Sistem Live" : "Live System"}</span>
                  <span className={styles.actionArrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              ) : null}
            </div>
          </div>

          {/* 3:2 Visual Evidence Column with Caption */}
          <div className={styles.evidenceCol}>
            <Link
              href={detailHref}
              className={styles.evidenceLink}
              aria-label={`${isId ? "Buka studi kasus dan bukti visual" : "Open case study and visual evidence"}: ${project.title[locale]}`}
            >
              <div className={styles.evidenceMedia}>
                <Image
                  src={project.coverImage}
                  alt={project.coverAlt[locale]}
                  fill
                  loading={project.index === "01" ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 380px"
                  className={`${styles.evidenceImage} ${
                    project.coverPosition === "top"
                      ? styles.imageTop
                      : styles.imageCenter
                  }`}
                />
              </div>
              <div className={styles.evidenceCaption}>
                <span className={styles.figureTag}>
                  {`FIG.${project.index} // ${project.title[locale].toUpperCase()}`}
                </span>
                <span className={styles.statusDot}>
                  {`● ${project.status[locale]}`}
                </span>
              </div>
            </Link>
          </div>

          {/* Metadata Rail: Role, Status, Primary Technologies */}
          <dl className={styles.metaRail}>
            <div className={styles.metaItem}>
              <dt className={styles.metaLabel}>{isId ? "Peran" : "Role"}</dt>
              <dd className={styles.metaValue}>{project.role[locale]}</dd>
            </div>

            <div className={styles.metaItem}>
              <dt className={styles.metaLabel}>Status</dt>
              <dd className={styles.metaValue}>{project.status[locale]}</dd>
            </div>

            <div className={styles.metaItem}>
              <dt className={styles.metaLabel}>
                {isId ? "Teknologi Utama" : "Primary Stack"}
              </dt>
              <dd className={styles.metaValue}>
                <div className={styles.techStackList}>
                  {project.primaryTechnologies.map((technology) => (
                    <span key={technology} className={styles.techBadge}>
                      {technology}
                    </span>
                  ))}
                </div>
              </dd>
            </div>
          </dl>
        </article>
      </ScrollReveal>
    </li>
  );
}
