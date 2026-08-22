"use client";

import { useState, useMemo } from "react";
import type { BlogMetadata } from "@/lib/blog/blog-types";
import type { Locale } from "@/lib/i18n/config";
import { BlogCard } from "./blog-card";
import { BlogEmptyState } from "./blog-empty-state";

interface BlogFilterProps {
  posts: BlogMetadata[];
  categories: string[];
  locale: Locale;
}

export function BlogFilter({ posts, categories, locale }: BlogFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isId = locale === "id";

  const allCategories = useMemo(() => {
    return [
      { key: "all", label: isId ? "Semua Tulisan" : "All Dispatches" },
      ...categories.map((cat) => ({ key: cat, label: cat })),
    ];
  }, [categories, isId]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // 1. Category check
      if (selectedCategory !== "all" && post.category !== selectedCategory) {
        return false;
      }

      // 2. Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = post.title.toLowerCase().includes(query);
        const descMatch = post.description.toLowerCase().includes(query);
        const catMatch = post.category.toLowerCase().includes(query);
        const tagMatch = post.tags.some((tag) => tag.toLowerCase().includes(query));

        return titleMatch || descMatch || catMatch || tagMatch;
      }

      return true;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="blog-filter-container">
      {/* Controls: Category Pills & Search */}
      <div className="blog-filter-toolbar">
        {/* Category Pills */}
        <div
          className="blog-category-pill-group"
          role="group"
          aria-label={isId ? "Filter Kategori Tulisan" : "Filter Dispatch Categories"}
        >
          {allCategories.map((cat) => {
            const count =
              cat.key === "all"
                ? posts.length
                : posts.filter((p) => p.category === cat.key).length;
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
        <div className="blog-search-wrapper">
          <label htmlFor="blog-search-input" className="sr-only">
            {isId ? "Cari tulisan teknis" : "Search dispatches"}
          </label>
          <input
            id="blog-search-input"
            type="search"
            className="blog-search-input"
            placeholder={
              isId
                ? "Cari judul, topik, atau tag..."
                : "Search by title, topic, or tag..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="blog-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label={isId ? "Hapus pencarian" : "Clear search"}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Results Status Bar */}
      <div className="blog-results-status">
        <span className="results-count-label">
          {isId
            ? `Menampilkan ${filteredPosts.length} dari ${posts.length} catatan teknis`
            : `Showing ${filteredPosts.length} of ${posts.length} technical dispatches`}
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
            {isId ? "Reset filter" : "Reset filters"}
          </button>
        )}
      </div>

      {/* Blog Cards Stream or Empty State */}
      {filteredPosts.length > 0 ? (
        <div className="blog-card-list">
          {filteredPosts.map((post, idx) => (
            <BlogCard
              key={post.slug}
              post={post}
              locale={locale}
              index={idx}
            />
          ))}
        </div>
      ) : (
        <BlogEmptyState
          locale={locale}
          mode="empty-filter"
          onResetFilter={() => {
            setSelectedCategory("all");
            setSearchQuery("");
          }}
        />
      )}
    </div>
  );
}
