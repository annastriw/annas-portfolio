import type { BlogPostItem } from "./types";
import { buildingDeterministicFrontendArticle } from "./articles/building-deterministic-frontend-architectures";
import { offlineFirstTelemetryArticle } from "./articles/offline-first-telemetry-thermal-printing";

export * from "./types";
export * from "./articles/building-deterministic-frontend-architectures";
export * from "./articles/offline-first-telemetry-thermal-printing";

export const blogArticles: BlogPostItem[] = [
  buildingDeterministicFrontendArticle,
  offlineFirstTelemetryArticle,
];

/**
 * Helper to fetch all blog posts deterministically.
 */
export function getAllBlogPosts(): BlogPostItem[] {
  return [...blogArticles].sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Helper to fetch a single blog post by slug.
 */
export function getBlogPostBySlug(slug: string): BlogPostItem | null {
  return blogArticles.find((p) => p.slug === slug) || null;
}

/**
 * Helper to fetch adjacent blog posts (prev & next).
 */
export function getAdjacentBlogPosts(slug: string): {
  prev: BlogPostItem | null;
  next: BlogPostItem | null;
} {
  const sorted = getAllBlogPosts();
  const index = sorted.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

/**
 * Helper to get unique blog categories.
 */
export function getAllBlogCategories(locale: "en" | "id"): string[] {
  const categories = new Set<string>();
  for (const post of blogArticles) {
    categories.add(post.category[locale]);
  }
  return Array.from(categories).sort();
}
