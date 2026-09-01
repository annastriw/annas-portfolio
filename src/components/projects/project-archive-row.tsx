import Image from "next/image";
import Link from "next/link";

import {
  projectArchiveCategories,
  projectArchiveCopy,
  type ProjectArchiveItem,
  type ProjectArchiveLocale,
} from "@/content/projects/project-archive";

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
  const categoryDef = projectArchiveCategories.find(
    (c) => c.key === project.category,
  );
  const categoryLabel = categoryDef
    ? categoryDef.label[locale]
    : project.category;

  return (
    <li className={styles.rowShell}>
      <article className={styles.row} aria-label={project.title[locale]}>
        {/* Mobile Header: 1. number + category */}
        <div className={styles.mobileMeta} aria-hidden="true">
          <span className={styles.mobileIndexNumber}>[{project.index}]</span>
          <span className={styles.mobileIndexSlash}>{"//"}</span>
          <span className={styles.mobileCategory}>{categoryLabel}</span>
        </div>

        {/* 1. Desktop Archive Number Column */}
        <div className={styles.indexCol} aria-hidden="true">
          <span className={styles.indexNumber}>[{project.index}]</span>
        </div>

        {/* 2. Thumbnail Column (Static Frame, Non-clickable) */}
        <div className={styles.thumbnailCol}>
          <div className={styles.thumbnailFrame}>
            <Image
              src={project.coverImage}
              alt={project.coverAlt[locale]}
              fill
              loading={project.index === "01" || project.index === "02" ? "eager" : "lazy"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 240px, 260px"
              className={`${styles.thumbnailImage} ${
                project.coverPosition === "top"
                  ? styles.imageTop
                  : styles.imageCenter
              }`}
            />
          </div>
        </div>

        {/* 3. Information Column: Title + Context (Summary, Stack) */}
        <div className={styles.infoCol}>
          {/* Static Title (Not clickable) */}
          <h3 className={styles.title}>{project.title[locale]}</h3>

          {/* Role and Status (Mobile & Tablet Inline view) */}
          <div className={styles.mobileRoleStatus}>
            <span className={styles.roleText}>{project.role[locale]}</span>
            <span className={styles.metaDivider} aria-hidden="true">
              /
            </span>
            <span className={styles.statusText}>{project.status[locale]}</span>
          </div>

          {/* Short Localized Summary */}
          <p className={styles.summary}>{project.summary[locale]}</p>

          {/* Primary Technologies Stack */}
          <div className={styles.stack}>
            <span className={styles.stackLabel} aria-hidden="true">
              STACK //
            </span>
            <span className={styles.stackList}>
              {project.primaryTechnologies.slice(0, 6).join(" · ")}
            </span>
          </div>
        </div>

        {/* 4. Desktop Metadata Column: Category, Role, Status */}
        <div className={styles.metaCol}>
          <div className={styles.metaItem}>
            <span className={styles.metaItemLabel} aria-hidden="true">
              CAT //
            </span>
            <span className={styles.metaItemValue}>{categoryLabel}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaItemLabel} aria-hidden="true">
              ROLE //
            </span>
            <span className={styles.metaItemValue}>{project.role[locale]}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaItemLabel} aria-hidden="true">
              STATUS //
            </span>
            <span className={styles.statusText}>{project.status[locale]}</span>
          </div>
        </div>

        {/* 5. Far Edge: Explicit Detail Link (Only interactive element) */}
        <div className={styles.actionCol}>
          <Link
            href={detailHref}
            className="project-row-link editorial-action-link"
            aria-label={`${ctaText}: ${project.title[locale]}`}
          >
            <span className="action-link-label">{ctaText}</span>
            <span className="action-link-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </article>
    </li>
  );
}
