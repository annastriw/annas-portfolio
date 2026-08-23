"use client";

import { useState, useMemo } from "react";
import type { ProjectItem, ProjectCategory } from "@/content/projects/projects-types";
import type { Locale } from "@/lib/i18n/config";
import { ProjectCard } from "./project-card";

interface ProjectFilterProps {
  projects: ProjectItem[];
  locale: Locale;
}

type FilterCategory = "all" | ProjectCategory;

const filterCategories: Record<
  Locale,
  { key: FilterCategory; label: string }[]
> = {
  en: [
    { key: "all", label: "All Projects" },
    { key: "web-app", label: "Web Application" },
    { key: "ml", label: "Machine Learning" },
    { key: "mobile", label: "Mobile" },
    { key: "other", label: "Other" },
  ],
  id: [
    { key: "all", label: "Semua Proyek" },
    { key: "web-app", label: "Aplikasi Web" },
    { key: "ml", label: "Machine Learning" },
    { key: "mobile", label: "Aplikasi Mobile" },
    { key: "other", label: "Lainnya" },
  ],
};

export function ProjectFilter({ projects, locale }: ProjectFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const currentCategories = filterCategories[locale];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Category filter
      if (selectedCategory !== "all" && project.category !== selectedCategory) {
        return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = project.title[locale].toLowerCase().includes(query);
        const subtitleMatch = project.subtitle[locale].toLowerCase().includes(query);
        const roleMatch = project.role[locale].toLowerCase().includes(query);
        const stakeholderMatch =
          project.stakeholder?.[locale]?.toLowerCase().includes(query) ?? false;
        const techMatch = [
          ...project.techStack.core,
          ...project.techStack.architecture,
          ...project.techStack.qaOrDeployment,
        ].some((t) => t.toLowerCase().includes(query));

        return (
          titleMatch ||
          subtitleMatch ||
          roleMatch ||
          stakeholderMatch ||
          techMatch
        );
      }

      return true;
    });
  }, [projects, selectedCategory, searchQuery, locale]);

  return (
    <div className="project-filter-container">
      {/* Controls: Category pills & Search */}
      <div className="project-filter-toolbar">
        {/* Category Pills */}
        <div
          className="category-pill-group"
          role="group"
          aria-label={locale === "id" ? "Filter Kategori" : "Filter Category"}
        >
          {currentCategories.map((cat) => {
            const count =
              cat.key === "all"
                ? projects.length
                : projects.filter((p) => p.category === cat.key).length;
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
            ? `Menampilkan ${filteredProjects.length} dari ${projects.length} entri proyek terkurasi`
            : `Showing ${filteredProjects.length} of ${projects.length} curated archive projects`}
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
            />
          ))}
        </div>
      ) : (
        <div className="project-empty-state">
          <p className="empty-title">
            {locale === "id"
              ? "Tidak ada proyek yang cocok dengan kriteria pencarian."
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
