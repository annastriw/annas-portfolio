import type { Locale } from "@/lib/i18n/config";

export interface BlogSection {
  heading: Record<Locale, string>;
  paragraphs?: Record<Locale, string[]>;
  codeBlock?: {
    language: string;
    code: string;
    caption?: string;
  };
  list?: {
    ordered?: boolean;
    items: Record<Locale, string[]>;
  };
  callout?: {
    type: "note" | "tip" | "important";
    content: Record<Locale, string>;
  };
}

export interface BlogPostItem {
  slug: string;
  date: string;
  category: Record<Locale, string>;
  readingTime: Record<Locale, string>;
  featured: boolean;
  tags: string[];
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  sections: BlogSection[];
}
