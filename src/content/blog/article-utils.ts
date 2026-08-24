import type { Locale } from "@/lib/i18n/config";
import type { BlogArticle, BlogBlock } from "./article-types.ts";

function getBlockText(block: BlogBlock, locale: Locale): string[] {
  switch (block.type) {
    case "prose":
      return block.paragraphs[locale];
    case "list":
    case "flow":
      return block.items[locale];
    case "note":
      return [block.label[locale], block.text[locale]];
    case "metrics":
      return block.items.flatMap((item) => [item.label[locale], item.value]);
    case "figure":
      return [block.alt[locale], block.caption[locale]];
  }
}

export function getLocalizedArticleText(
  article: BlogArticle,
  locale: Locale,
): string {
  const content = [
    article.title[locale],
    article.abstract[locale],
    article.category[locale],
    article.projectPeriod?.[locale] ?? "",
  ];

  for (const section of article.sections) {
    content.push(section.title[locale]);
    for (const block of section.blocks) {
      content.push(...getBlockText(block, locale));
    }
  }

  return content.filter(Boolean).join(" ");
}

export function calculateArticleReadingTime(
  article: BlogArticle,
  locale: Locale,
): string {
  const wordCount = getLocalizedArticleText(article, locale)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));

  return locale === "id" ? `${minutes} menit baca` : `${minutes} min read`;
}
