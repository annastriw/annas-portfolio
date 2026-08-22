import type { Locale } from "@/lib/i18n/config";
import type { BlogValidationIssue, RawBlogFrontmatter } from "./blog-types";

/**
 * Validates a single blog markdown record.
 */
export function validateBlogRecord(
  filename: string,
  locale: Locale,
  fm: RawBlogFrontmatter,
  content: string,
  knownSlugs: Set<string>,
): BlogValidationIssue[] {
  const issues: BlogValidationIssue[] = [];

  // 1. Required title
  const title = (fm.title || fm.judul || "").trim();
  if (!title) {
    issues.push({
      filename,
      locale,
      field: "title",
      message: 'Required field "title" (or "judul") is missing or empty.',
    });
  }

  // 2. Required slug
  const slug = (fm.slug || "").trim();
  if (!slug) {
    issues.push({
      filename,
      locale,
      field: "slug",
      message: 'Required field "slug" is missing or empty.',
    });
  } else {
    // Slug format validation
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      issues.push({
        filename,
        locale,
        field: "slug",
        message: `Slug "${slug}" must only contain lowercase alphanumeric characters and single hyphens.`,
      });
    }

    // Filename vs slug match
    const expectedFilename = `${slug}.md`;
    if (filename !== expectedFilename) {
      issues.push({
        filename,
        locale,
        field: "slug",
        message: `Filename mismatch: expected "${expectedFilename}", got "${filename}".`,
      });
    }

    // Duplicate slug check per locale
    const localeSlugKey = `${locale}:${slug}`;
    if (knownSlugs.has(localeSlugKey)) {
      issues.push({
        filename,
        locale,
        field: "slug",
        message: `Duplicate slug: "${slug}" already defined in locale "${locale}".`,
      });
    } else {
      knownSlugs.add(localeSlugKey);
    }
  }

  // 3. Date check
  const dateStr = (fm.date || fm.tanggal || "").trim();
  if (!dateStr) {
    issues.push({
      filename,
      locale,
      field: "date",
      message: 'Required field "date" is missing or empty.',
    });
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    issues.push({
      filename,
      locale,
      field: "date",
      message: `Date "${dateStr}" must match format YYYY-MM-DD.`,
    });
  }

  // 4. Category check
  const category = (fm.category || fm.kategori || "").trim();
  if (!category) {
    issues.push({
      filename,
      locale,
      field: "category",
      message: 'Required field "category" is missing or empty.',
    });
  }

  // 5. Description check
  const description = (fm.description || fm.deskripsi || "").trim();
  if (!description) {
    issues.push({
      filename,
      locale,
      field: "description",
      message: 'Required field "description" is missing or empty.',
    });
  }

  // 6. Markdown body check
  if (!content || content.trim().length === 0) {
    issues.push({
      filename,
      locale,
      field: "content",
      message: "Markdown body content is empty.",
    });
  }

  return issues;
}
