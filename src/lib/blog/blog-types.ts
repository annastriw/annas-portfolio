import type { Locale } from "@/lib/i18n/config";

/**
 * Raw YAML frontmatter structure for Markdown blog articles.
 */
export interface RawBlogFrontmatter {
  title?: string;
  judul?: string;
  slug?: string;
  date?: string;
  tanggal?: string;
  category?: string;
  kategori?: string;
  description?: string;
  deskripsi?: string;
  tags?: string[];
  reading_time?: string;
  waktu_baca?: string;
  featured?: boolean;
  author?: string;
  [key: string]: unknown;
}

/**
 * Normalized domain model for blog post metadata.
 */
export interface BlogMetadata {
  slug: string;
  locale: Locale;
  title: string;
  date: string;
  formattedDate: string;
  category: string;
  description: string;
  tags: string[];
  readingTime: string;
  featured: boolean;
  author: string;
  raw: RawBlogFrontmatter;
}

/**
 * Full domain model for a blog post including its markdown body.
 */
export interface BlogPost {
  slug: string;
  locale: Locale;
  metadata: BlogMetadata;
  content: string;
}

/**
 * Content validation issue representation.
 */
export interface BlogValidationIssue {
  filename: string;
  locale: Locale;
  field?: string;
  message: string;
}

/**
 * Result of blog content validation.
 */
export interface BlogValidationResult {
  valid: boolean;
  total: number;
  posts: BlogMetadata[];
  issues: BlogValidationIssue[];
}
