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
          <span className={styles.index} aria-hidden="true">
            {project.index}
          </span>

          <div className={styles.narrative}>
            <span className={styles.category}>
              {categoryLabels[project.category][locale]}
            </span>
            <h3 className={styles.title}>
              <Link href={detailHref} className={styles.titleLink}>
                {project.title[locale]}
              </Link>
            </h3>
            <p className={styles.summary}>{project.summary[locale]}</p>

            <div className={styles.actions}>
              <Link
                href={detailHref}
                className={styles.actionLink}
                aria-label={`${isId ? "Lihat studi kasus" : "View case study"}: ${project.title[locale]}`}
              >
                <span>{isId ? "Lihat studi kasus" : "View case study"}</span>
                <span aria-hidden="true">→</span>
              </Link>

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionLink}
                  aria-label={`${isId ? "Buka sistem live" : "Visit live system"}: ${project.title[locale]}`}
                >
                  <span>{isId ? "Buka sistem live" : "Visit live system"}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </div>
          </div>

          <Link
            href={detailHref}
            className={styles.mediaLink}
            aria-label={`${isId ? "Lihat bukti visual" : "View visual evidence"}: ${project.title[locale]}`}
          >
            <div className={styles.media}>
              <Image
                src={project.coverImage}
                alt={project.coverAlt[locale]}
                fill
                loading={project.index === "01" ? "eager" : "lazy"}
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1100px) 38vw, 30vw"
                className={`${styles.image} ${
                  project.coverPosition === "top"
                    ? styles.imageTop
                    : styles.imageCenter
                }`}
              />
            </div>
          </Link>

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
                {isId ? "Teknologi utama" : "Primary technologies"}
              </dt>
              <dd className={styles.metaValue}>
                <ul className={styles.techList}>
                  {project.primaryTechnologies.map((technology) => (
                    <li key={technology} className={styles.techItem}>
                      {technology}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </article>
      </ScrollReveal>
    </li>
  );
}
