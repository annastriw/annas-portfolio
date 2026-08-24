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
      ? `${visibleProjects.length} proyek ditampilkan`
      : `${visibleProjects.length} ${visibleProjects.length === 1 ? "project" : "projects"} in view`;

  return (
    <section
      className={styles.archive}
      aria-label={isId ? "Arsip proyek" : "Project archive"}
    >
      <div className={styles.filterBlock}>
        <div className={styles.filterHeader}>
          <span>{isId ? "Filter berdasarkan bidang" : "Filter by discipline"}</span>
          <span aria-live="polite">{visibleProjectLabel}</span>
        </div>

        <div
          className={styles.filterGroup}
          role="group"
          aria-label={isId ? "Filter kategori proyek" : "Project category filters"}
        >
          {projectArchiveCategories.map((category) => {
            const count =
              category.key === "all"
                ? projects.length
                : projects.filter(
                    (project) => project.category === category.key,
                  ).length;
            const isActive = activeFilter === category.key;

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
                <span>{category.label[locale]}</span>
                <span className={styles.filterCount} aria-hidden="true">
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.groups}>
        {visibleGroups.map((group) => (
          <section
            key={group.key}
            className={styles.group}
            aria-labelledby={`archive-group-${group.key}`}
          >
            <header className={styles.groupHeader}>
              <span className={styles.groupCode} aria-hidden="true">
                {group.key === "all" ? "" : groupCodes[group.key]}
              </span>
              <h2
                id={`archive-group-${group.key}`}
                className={styles.groupTitle}
              >
                {group.label[locale]}
              </h2>
              <span className={styles.groupCount}>
                {String(group.projects.length).padStart(2, "0")} {isId
                  ? "entri"
                  : group.projects.length === 1
                    ? "entry"
                    : "entries"}
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
