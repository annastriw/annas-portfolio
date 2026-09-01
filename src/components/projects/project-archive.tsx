"use client";

import { useMemo, useState, useRef } from "react";

import {
  filterProjectArchive,
  projectArchiveCategories,
  projectArchiveCopy,
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
  const filterGroupRef = useRef<HTMLDivElement>(null);

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
  const visibleProjectLabel = isId
    ? `${visibleProjects.length} dari ${projects.length} proyek ditampilkan`
    : `Showing ${visibleProjects.length} of ${projects.length} projects`;

  const ensureButtonVisible = (buttonElement: HTMLElement) => {
    const container = filterGroupRef.current;
    if (!container) return;

    const buttonRect = buttonElement.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    if (buttonRect.left < containerRect.left) {
      container.scrollLeft += buttonRect.left - containerRect.left - 12;
    } else if (buttonRect.right > containerRect.right) {
      container.scrollLeft += buttonRect.right - containerRect.right + 12;
    }
  };

  const handleFilterSelect = (
    categoryKey: ProjectArchiveFilter,
    buttonElement: HTMLElement,
  ) => {
    setActiveFilter(categoryKey);
    ensureButtonVisible(buttonElement);
  };

  return (
    <section
      className={styles.archive}
      aria-label={projectArchiveCopy.title[locale]}
    >
      {/* Editorial Index Filter Bar with Text-Based Tabs */}
      <div className={styles.filterBlock}>
        <div className={styles.filterHeader}>
          <div className={styles.filterHeaderTag}>
            <span className={styles.filterHeaderDot}>●</span>
            <span>{projectArchiveCopy.filterHeading[locale]}</span>
          </div>
          <span
            className={styles.filterStatus}
            aria-live="polite"
            aria-atomic="true"
          >
            {visibleProjectLabel}
          </span>
        </div>

        <div
          ref={filterGroupRef}
          className={styles.filterGroup}
          role="tablist"
          aria-label={projectArchiveCopy.filterHeading[locale]}
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
                role="tab"
                aria-selected={isActive}
                tabIndex={0}
                className={`${styles.filterButton} ${
                  isActive ? styles.filterButtonActive : ""
                }`}
                onClick={(e) =>
                  handleFilterSelect(category.key, e.currentTarget)
                }
                onFocus={(e) => ensureButtonVisible(e.currentTarget)}
              >
                <span className={styles.filterButtonPrefix}>{prefix}</span>
                <span className={styles.filterButtonLabel}>
                  {category.label[locale]}
                </span>
                <span className={styles.filterCount} aria-hidden="true">
                  [{String(count).padStart(2, "0")}]
                </span>
                {isActive && (
                  <span
                    className={styles.activeUnderline}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categorized Archive Entries (Transition as one controlled group) */}
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
                {group.projects.length}{" "}
                {isId
                  ? "proyek"
                  : group.projects.length === 1
                    ? "project"
                    : "projects"}
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
