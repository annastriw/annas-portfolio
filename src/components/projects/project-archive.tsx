"use client";

import { useMemo, useState } from "react";

import {
  filterProjectArchive,
  projectArchiveCategories,
  type ProjectArchiveFilter,
  type ProjectArchiveItem,
  type ProjectArchiveLocale,
} from "@/content/projects/project-archive";

import styles from "./project-archive.module.css";
import { ProjectArchiveRow } from "./project-archive-row";

interface ProjectArchiveProps {
  projects: readonly ProjectArchiveItem[];
  locale: ProjectArchiveLocale;
}

const groupCodes: Record<Exclude<ProjectArchiveFilter, "all">, string> = {
  "web-app": "WEB",
  ml: "ML",
  mobile: "MOB",
  other: "OTH",
};

export function ProjectArchive({ projects, locale }: ProjectArchiveProps) {
  const [activeFilter, setActiveFilter] =
    useState<ProjectArchiveFilter>("all");

  const visibleProjects = useMemo(
    () => filterProjectArchive(projects, activeFilter),
    [activeFilter, projects],
  );

  const visibleGroups = useMemo(() => {
    const categoryDefinitions = projectArchiveCategories.filter(
      (category) => category.key !== "all",
    );

    return categoryDefinitions
      .map((category) => ({
        ...category,
        projects: visibleProjects.filter(
          (project) => project.category === category.key,
        ),
      }))
      .filter((group) => group.projects.length > 0);
  }, [visibleProjects]);

  const isId = locale === "id";
  const visibleProjectLabel =
    locale === "id"
      ? `${visibleProjects.length} dari ${projects.length} proyek ditampilkan`
      : `Showing ${visibleProjects.length} of ${projects.length} archived builds`;

  return (
    <section
      className={styles.archive}
      aria-label={isId ? "Arsip proyek terverifikasi" : "Verified project archive"}
    >
      {/* Editorial Index Filter Bar */}
      <div className={styles.filterBlock}>
        <div className={styles.filterHeader}>
          <div className={styles.filterHeaderTag}>
            <span className={styles.filterHeaderDot}>●</span>
            <span>{isId ? "Indeks Disiplin" : "Discipline Index"}</span>
          </div>
          <span className={styles.filterStatus} aria-live="polite">
            {visibleProjectLabel}
          </span>
        </div>

        <div
          className={styles.filterGroup}
          role="group"
          aria-label={isId ? "Filter kategori proyek" : "Project category filters"}
        >
          {projectArchiveCategories.map((category, idx) => {
            const count =
              category.key === "all"
                ? projects.length
                : projects.filter(
                    (project) => project.category === category.key,
                  ).length;
            const isActive = activeFilter === category.key;
            const prefix = `0${idx + 1}`;

            return (
              <button
                key={category.key}
                type="button"
                className={`${styles.filterButton} ${
                  isActive ? styles.filterButtonActive : ""
                }`}
                onClick={() => setActiveFilter(category.key)}
                aria-pressed={isActive}
              >
                <span className={styles.filterButtonPrefix}>{prefix}</span>
                <span className={styles.filterButtonLabel}>{category.label[locale]}</span>
                <span className={styles.filterCount} aria-hidden="true">
                  [{String(count).padStart(2, "0")}]
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categorized Archive Entries */}
      <div className={styles.groups}>
        {visibleGroups.map((group) => (
          <section
            key={group.key}
            className={styles.group}
            aria-labelledby={`archive-group-${group.key}`}
          >
            <header className={styles.groupHeader}>
              <div className={styles.groupTitleBlock}>
                <span className={styles.groupCode} aria-hidden="true">
                  [{group.key === "all" ? "ALL" : groupCodes[group.key]}]
                </span>
                <h2
                  id={`archive-group-${group.key}`}
                  className={styles.groupTitle}
                >
                  {group.label[locale]}
                </h2>
              </div>
              <span className={styles.groupCount}>
                {String(group.projects.length).padStart(2, "0")}{" "}
                {isId
                  ? "karya"
                  : group.projects.length === 1
                    ? "build"
                    : "builds"}
              </span>
            </header>

            <ol className={styles.list}>
              {group.projects.map((project) => (
                <ProjectArchiveRow
                  key={project.slug}
                  project={project}
                  locale={locale}
                />
              ))}
            </ol>
          </section>
        ))}
      </div>
    </section>
  );
}
