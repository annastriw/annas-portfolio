import type { Locale } from "@/lib/i18n/config";
import type { BlogMetadata, RawBlogFrontmatter } from "./blog-types";

/**
 * Computes an estimated reading time from word count.
 */
export function calculateReadingTime(content: string, locale: Locale): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return locale === "id" ? `${minutes} menit baca` : `${minutes} min read`;
}

/**
 * Formats YYYY-MM-DD date string into editorial display string.
 */
export function formatBlogDate(dateStr: string, locale: Locale): string {
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch {
    return dateStr;
  }
}

/**
 * Normalizes raw YAML frontmatter into a clean BlogMetadata model.
 */
export function normalizeBlogFrontmatter(
  raw: RawBlogFrontmatter,
  content: string,
  locale: Locale,
): BlogMetadata {
  const slug = (raw.slug || "").trim();
  const title = (raw.title || raw.judul || "").trim();
  const date = (raw.date || raw.tanggal || "").trim();
  const category = (raw.category || raw.kategori || "Engineering").trim();
  const description = (raw.description || raw.deskripsi || "").trim();
  const featured = Boolean(raw.featured);
  const author = (raw.author || "Annas Tri Widagdo").trim();

  const tags = Array.isArray(raw.tags)
    ? raw.tags.map((t) => String(t).trim()).filter(Boolean)
    : [];

  const explicitReadingTime = (raw.reading_time || raw.waktu_baca || "").trim();
  const readingTime = explicitReadingTime || calculateReadingTime(content, locale);
  const formattedDate = formatBlogDate(date, locale);

  return {
    slug,
    locale,
    title,
    date,
    formattedDate,
    category,
    description,
    tags,
    readingTime,
    featured,
    author,
    raw,
  };
}
