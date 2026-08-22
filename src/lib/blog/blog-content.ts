import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n/config";
import { supportedLocales } from "@/lib/i18n/config";
import type {
  BlogMetadata,
  BlogPost,
  BlogValidationIssue,
  BlogValidationResult,
  RawBlogFrontmatter,
} from "./blog-types";
import { validateBlogRecord } from "./blog-schema";
import { normalizeBlogFrontmatter } from "./blog-normalizer";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");

const cachedBlogValidation = new Map<string, BlogValidationResult>();
const blogPostDetailCache = new Map<string, BlogPost | null>();

/**
 * Clears blog in-memory caches for testing or content re-validation.
 */
export function clearBlogContentCache(): void {
  cachedBlogValidation.clear();
  blogPostDetailCache.clear();
}

/**
 * Validates all markdown blog post files across all or a specific locale.
 */
export async function validateAllBlogPosts(targetLocale?: Locale): Promise<BlogValidationResult> {
  const cacheKey = targetLocale || "ALL";
  if (cachedBlogValidation.has(cacheKey)) {
    return cachedBlogValidation.get(cacheKey)!;
  }
  const localesToScan: Locale[] = targetLocale ? [targetLocale] : [...supportedLocales];
  const allIssues: BlogValidationIssue[] = [];
  const posts: BlogMetadata[] = [];
  const knownSlugs = new Set<string>();

  for (const locale of localesToScan) {
    const localeDir = path.join(BLOG_DIRECTORY, locale);

    let fileEntries;
    try {
      fileEntries = await fs.readdir(localeDir, { withFileTypes: true });
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "code" in err &&
        (err as { code: string }).code === "ENOENT"
      ) {
        // Empty directory is permissible
        continue;
      }
      throw err;
    }

    const mdFilenames = fileEntries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => entry.name)
      .sort();

    for (const filename of mdFilenames) {
      const filePath = path.join(localeDir, filename);
      const rawContent = await fs.readFile(filePath, "utf8");

      try {
        const parsed = matter(rawContent);
        const rawFm = parsed.data as RawBlogFrontmatter;
        const body = parsed.content;

        const issues = validateBlogRecord(
          filename,
          locale,
          rawFm,
          body,
          knownSlugs,
        );

        if (issues.length > 0) {
          allIssues.push(...issues);
        } else {
          const metadata = normalizeBlogFrontmatter(rawFm, body, locale);
          posts.push(metadata);
        }
      } catch (err: unknown) {
        allIssues.push({
          filename,
          locale,
          message: `Failed to parse YAML frontmatter: ${err instanceof Error ? err.message : String(err)}`,
        });
      }
    }
  }

  // Sort deterministically by date descending (newest first), then by slug
  posts.sort((a, b) => {
    const dateComparison = b.date.localeCompare(a.date);
    if (dateComparison !== 0) return dateComparison;
    return a.slug.localeCompare(b.slug);
  });

  const result = {
    valid: allIssues.length === 0,
    total: posts.length,
    posts,
    issues: allIssues,
  };

  cachedBlogValidation.set(cacheKey, result);
  return result;
}

/**
 * Returns all blog post slugs for a specific locale.
 */
export async function getBlogSlugs(locale: Locale): Promise<string[]> {
  const metadata = await getAllBlogMetadata(locale);
  return metadata.map((post) => post.slug);
}

/**
 * Returns all normalized blog metadata for a specific locale (sorted newest first).
 */
export async function getAllBlogMetadata(locale: Locale): Promise<BlogMetadata[]> {
  const result = await validateAllBlogPosts(locale);
  if (!result.valid) {
    const errorDetails = result.issues
      .map((i) => `[${locale}/${i.filename}${i.field ? `:${i.field}` : ""}]: ${i.message}`)
      .join("\n");
    throw new Error(`Blog content validation failed for locale "${locale}":\n${errorDetails}`);
  }
  return result.posts.filter((p) => p.locale === locale);
}

/**
 * Returns all full blog posts for a locale with markdown content.
 */
export async function getAllBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const metadataList = await getAllBlogMetadata(locale);
  const posts: BlogPost[] = [];

  for (const metadata of metadataList) {
    const post = await getBlogPostBySlug(metadata.slug, locale);
    if (post) {
      posts.push(post);
    }
  }

  return posts;
}

/**
 * Returns a single blog post by slug and locale, or null if not found.
 */
export async function getBlogPostBySlug(
  slug: string,
  locale: Locale,
): Promise<BlogPost | null> {
  if (!slug || typeof slug !== "string" || slug.includes("..") || slug.includes("/")) {
    return null;
  }

  const cacheKey = `${locale}/${slug}`;
  if (blogPostDetailCache.has(cacheKey)) {
    return blogPostDetailCache.get(cacheKey)!;
  }

  const filePath = path.join(BLOG_DIRECTORY, locale, `${slug}.md`);
  try {
    const rawContent = await fs.readFile(filePath, "utf8");
    const parsed = matter(rawContent);
    const rawFm = parsed.data as RawBlogFrontmatter;

    const issues = validateBlogRecord(
      `${slug}.md`,
      locale,
      rawFm,
      parsed.content,
      new Set<string>(),
    );

    if (issues.length > 0) {
      const errorDetails = issues
        .map((i) => `[${locale}/${i.filename}${i.field ? `:${i.field}` : ""}]: ${i.message}`)
        .join("\n");
      throw new Error(`Blog content validation failed for "${locale}/${slug}":\n${errorDetails}`);
    }

    const metadata = normalizeBlogFrontmatter(rawFm, parsed.content, locale);
    const post: BlogPost = {
      slug,
      locale,
      metadata,
      content: parsed.content,
    };
    blogPostDetailCache.set(cacheKey, post);
    return post;
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code: string }).code === "ENOENT"
    ) {
      blogPostDetailCache.set(cacheKey, null);
      return null;
    }
    throw err;
  }
}

/**
 * Returns adjacent (previous and next) blog posts for chronological navigation.
 */
export async function getAdjacentBlogPosts(
  slug: string,
  locale: Locale,
): Promise<{
  prev: BlogMetadata | null;
  next: BlogMetadata | null;
}> {
  const allPosts = await getAllBlogMetadata(locale);
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  // Newer post is prev in date-descending list; older post is next
  const prev = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const next = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return { prev, next };
}

/**
 * Extracts unique categories across all published posts for a locale.
 */
export async function getAllBlogCategories(locale: Locale): Promise<string[]> {
  const posts = await getAllBlogMetadata(locale);
  const categories = new Set<string>();
  for (const post of posts) {
    if (post.category) {
      categories.add(post.category);
    }
  }
  return Array.from(categories).sort();
}

/**
 * Extracts unique tags across all published posts for a locale.
 */
export async function getAllBlogTags(locale: Locale): Promise<string[]> {
  const posts = await getAllBlogMetadata(locale);
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}
