import type { Locale } from "@/lib/i18n/config";

export type Localized<T> = Record<Locale, T>;

export interface BlogProseBlock {
  type: "prose";
  paragraphs: Localized<string[]>;
}

export interface BlogListBlock {
  type: "list";
  style: "ordered" | "unordered";
  items: Localized<string[]>;
}

export interface BlogFlowBlock {
  type: "flow";
  items: Localized<string[]>;
}

export interface BlogNoteBlock {
  type: "note";
  label: Localized<string>;
  text: Localized<string>;
}

export interface BlogMetricsBlock {
  type: "metrics";
  items: Array<{
    label: Localized<string>;
    value: string;
  }>;
}

export interface BlogFigureBlock {
  type: "figure";
  src: string;
  format: "wide" | "mobile";
  alt: Localized<string>;
  caption: Localized<string>;
}

export type BlogBlock =
  | BlogProseBlock
  | BlogListBlock
  | BlogFlowBlock
  | BlogNoteBlock
  | BlogMetricsBlock
  | BlogFigureBlock;

export interface BlogSection {
  id: string;
  title: Localized<string>;
  blocks: BlogBlock[];
}

export interface BlogArticle {
  index: string;
  slug: string;
  category: Localized<string>;
  title: Localized<string>;
  abstract: Localized<string>;
  tags: string[];
  sourceProjectSlugs: string[];
  projectPeriod?: Localized<string>;
  sections: BlogSection[];
}
