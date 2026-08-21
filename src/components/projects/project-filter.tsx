"use client";

import { useState, useMemo } from "react";
import type { ProjectMetadata } from "@/lib/projects/project-types";
import type { Locale } from "@/lib/i18n/config";
import { ProjectCard } from "./project-card";

interface ProjectFilterProps {
  projects: ProjectMetadata[];
  thumbnails: Record<string, string | null>;
  locale: Locale;
}

type CategoryKey = "all" | "web" | "ai" | "mobile" | "internship";

const categories: Record<
  Locale,
  { key: CategoryKey; label: string; countPredicate: (p: ProjectMetadata) => boolean }[]
> = {
  en: [
    { key: "all", label: "All Projects", countPredicate: () => true },
    {
      key: "web",
      label: "Web & Fullstack",
      countPredicate: (p) =>
        /web|fullstack|laravel|next|frontend|backend/i.test(p.projectType) ||
        /fullstack|frontend/i.test(p.role),
    },
    {
      key: "ai",
      label: "AI & Machine Learning",
      countPredicate: (p) =>
        /machine learning|ai|classification|speech/i.test(p.projectType) ||
        /machine learning|ai/i.test(p.role),
    },
    {
      key: "mobile",
      label: "Mobile & Systems",
      countPredicate: (p) =>
        /mobile|flutter|android|printer|game/i.test(p.projectType) ||
        /flutter|android|game/i.test(p.role),
    },
    {
      key: "internship",
      label: "Internships",
      countPredicate: (p) => p.kind === "Internship" || /intern/i.test(p.role),
    },
  ],
  id: [
    { key: "all", label: "Semua Proyek", countPredicate: () => true },
    {
      key: "web",
      label: "Web & Fullstack",
      countPredicate: (p) =>
        /web|fullstack|laravel|next|frontend|backend/i.test(p.projectType) ||
        /fullstack|frontend/i.test(p.role),
    },
    {
      key: "ai",
      label: "AI & Machine Learning",
      countPredicate: (p) =>
        /machine learning|ai|classification|speech/i.test(p.projectType) ||
        /machine learning|ai/i.test(p.role),
    },
    {
      key: "mobile",
      label: "Mobile & Sistem",
      countPredicate: (p) =>
        /mobile|flutter|android|printer|game/i.test(p.projectType) ||
        /flutter|android|game/i.test(p.role),
    },
    {
      key: "internship",
      label: "Magang",
      countPredicate: (p) => p.kind === "Internship" || /intern/i.test(p.role),
    },
  ],
};

export function ProjectFilter({
  projects,
  thumbnails,
  locale,
}: ProjectFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const currentCategories = categories[locale];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Category check
      const currentCategoryObj = currentCategories.find(
        (c) => c.key === selectedCategory
      );
      if (currentCategoryObj && !currentCategoryObj.countPredicate(project)) {
        return false;
      }

      // 2. Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = project.title.toLowerCase().includes(query);
        const typeMatch = project.projectType.toLowerCase().includes(query);
        const roleMatch = project.role.toLowerCase().includes(query);
        const stakeholderMatch =
          project.stakeholder?.toLowerCase().includes(query) ?? false;
        const toolMatch =
          typeof project.raw.primary_tool === "string" &&
          project.raw.primary_tool.toLowerCase().includes(query);
        const langMatch =
          typeof project.raw.bahasa_utama === "string" &&
          project.raw.bahasa_utama.toLowerCase().includes(query);

        return (
          titleMatch ||
          typeMatch ||
          roleMatch ||
          stakeholderMatch ||
          toolMatch ||
          langMatch
        );
      }

      return true;
    });
  }, [projects, selectedCategory, searchQuery, currentCategories]);

  return (
    <div className="project-filter-container">
      {/* Controls: Search & Category pills */}
      <div className="project-filter-toolbar">
        {/* Category Pills */}
        <div
          className="category-pill-group"
          role="group"
          aria-label={locale === "id" ? "Filter Kategori" : "Filter Category"}
        >
          {currentCategories.map((cat) => {
            const count = projects.filter(cat.countPredicate).length;
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                className={`category-pill ${isSelected ? "category-pill-active" : ""}`}
                onClick={() => setSelectedCategory(cat.key)}
                aria-pressed={isSelected}
              >
                <span>{cat.label}</span>
                <span className="category-pill-count">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="project-search-wrapper">
          <label htmlFor="project-search-input" className="sr-only">
            {locale === "id" ? "Cari proyek" : "Search projects"}
          </label>
          <input
            id="project-search-input"
            type="search"
            className="project-search-input"
            placeholder={
              locale === "id"
                ? "Cari nama, teknologi, atau peran..."
                : "Search by title, stack, or role..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="project-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label={locale === "id" ? "Hapus pencarian" : "Clear search"}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Result Status Bar */}
      <div className="project-results-status">
        <span className="results-count-label">
          {locale === "id"
            ? `Menampilkan ${filteredProjects.length} dari ${projects.length} entri proyek`
            : `Showing ${filteredProjects.length} of ${projects.length} archived projects`}
        </span>
        {(selectedCategory !== "all" || searchQuery) && (
          <button
            type="button"
            className="reset-filter-btn"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
          >
            {locale === "id" ? "Reset filter" : "Reset filters"}
          </button>
        )}
      </div>

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <div className="project-card-grid">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              index={idx}
              thumbnail={thumbnails[project.slug]}
            />
          ))}
        </div>
      ) : (
        <div className="project-empty-state">
          <p className="empty-title">
            {locale === "id"
              ? "Tidak ada proyek yang cocok dengan filter."
              : "No projects match your filter criteria."}
          </p>
          <p className="empty-subtitle">
            {locale === "id"
              ? "Coba gunakan kata kunci pencarian yang berbeda atau reset filter kategori."
              : "Try adjusting your search query or reset category filters."}
          </p>
          <button
            type="button"
            className="reset-filter-action"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
          >
            {locale === "id" ? "Tampilkan semua proyek" : "Show all projects"}
          </button>
        </div>
      )}
    </div>
  );
}
