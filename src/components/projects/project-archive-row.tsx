import Image from "next/image";
import Link from "next/link";

import {
  projectArchiveCopy,
  type ProjectArchiveItem,
  type ProjectArchiveLocale,
} from "@/content/projects/project-archive";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

import styles from "./project-archive.module.css";

interface ProjectArchiveRowProps {
  project: ProjectArchiveItem;
  locale: ProjectArchiveLocale;
}

export function ProjectArchiveRow({
  project,
  locale,
}: ProjectArchiveRowProps) {
  const detailHref = `/${locale}/projects/${project.slug}`;
  const ctaText = projectArchiveCopy.cta[locale];

  return (
    <li className={styles.rowShell}>
      <ScrollReveal animationClass="animate-editorial-fade" threshold={0.04}>
        <article className={styles.row} aria-label={project.title[locale]}>
          {/* 1. Large Desktop Index Column */}
          <div className={styles.indexCol} aria-hidden="true">
            <span className={styles.indexNumber}>{project.index}</span>
            <span className={styles.indexSlash}>{"//"}</span>
          </div>

          {/* 2. Thumbnail Column (Preview Frame with Full Image Presentation) */}
          <div className={styles.thumbnailCol}>
            {/* Mobile-Only Reading Order 1: Archive Index */}
            <div className={styles.mobileIndex} aria-hidden="true">
              <span className={styles.mobileIndexNumber}>{project.index}</span>
              <span className={styles.mobileIndexSlash}>{"//"}</span>
            </div>

            {/* Mobile-Only Reading Order 2: Thumbnail */}
            <Link
              href={detailHref}
              className={styles.thumbnailLink}
              aria-label={`${ctaText}: ${project.title[locale]}`}
            >
              <div className={styles.thumbnailFrame}>
                <Image
                  src={project.coverImage}
                  alt={project.coverAlt[locale]}
                  fill
                  loading={project.index === "01" ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 35vw, 360px"
                  className={`${styles.thumbnailImage} ${
                    project.coverPosition === "top"
                      ? styles.imageTop
                      : styles.imageCenter
                  }`}
                />
              </div>
            </Link>
          </div>

          {/* 3. Information Column */}
          <div className={styles.infoCol}>
            {/* Tablet-Only Archive Index (above title to free horizontal space) */}
            <div className={styles.tabletIndex} aria-hidden="true">
              <span className={styles.tabletIndexNumber}>{project.index}</span>
              <span className={styles.tabletIndexSlash}>{"//"}</span>
            </div>

            {/* Hierarchy 1: Title */}
            <h3 className={styles.title}>
              <Link href={detailHref} className={styles.titleLink}>
                {project.title[locale]}
              </Link>
            </h3>

            {/* Hierarchy 2: Role and Status (Plain Text Metadata) */}
            <div className={styles.roleStatus}>
              <span className={styles.roleText}>{project.role[locale]}</span>
              <span className={styles.metaDivider} aria-hidden="true">
                /
              </span>
              <span className={styles.statusText}>{project.status[locale]}</span>
            </div>

            {/* Hierarchy 3: Short Localized Summary */}
            <p className={styles.summary}>{project.summary[locale]}</p>

            {/* Hierarchy 4: Stack (Up to six technologies, plain wrapping text) */}
            <div className={styles.stack}>
              <span className={styles.stackLabel} aria-hidden="true">
                STACK //
              </span>
              <span className={styles.stackList}>
                {project.primaryTechnologies.slice(0, 6).join(" · ")}
              </span>
            </div>

            {/* Hierarchy 5: Explore Project CTA (Editorial text link with arrow) */}
            <div className={styles.actionWrapper}>
              <Link
                href={detailHref}
                className={styles.actionLink}
                aria-label={`${ctaText}: ${project.title[locale]}`}
              >
                <span>{ctaText}</span>
                <span className={styles.actionArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </article>
      </ScrollReveal>
    </li>
  );
}
