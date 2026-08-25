import type { BlogArticle } from "./article-types";
import { multiBranchErpArticle } from "./articles/building-a-multi-branch-erp.ts";
import { speechToTextPipelineArticle } from "./articles/building-a-practical-speech-to-text-pipeline.ts";
import { androidPrintFrameworkArticle } from "./articles/from-android-print-framework.ts";
import { integratingMachineLearningArticle } from "./articles/integrating-machine-learning.ts";

export type {
  BlogArticle,
  BlogBlock,
  BlogFigureBlock,
  BlogSection,
  Localized,
} from "./article-types";
export {
  calculateArticleReadingTime,
  getLocalizedArticleText,
} from "./article-utils.ts";

export const blogArticles: readonly BlogArticle[] = [
  multiBranchErpArticle,
  integratingMachineLearningArticle,
  androidPrintFrameworkArticle,
  speechToTextPipelineArticle,
];

export function getBlogArticle(slug: string): BlogArticle | null {
  return blogArticles.find((article) => article.slug === slug) ?? null;
}

export function getAdjacentBlogArticles(slug: string): {
  previous: BlogArticle | null;
  next: BlogArticle | null;
} {
  const currentIndex = blogArticles.findIndex((article) => article.slug === slug);
  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? blogArticles[currentIndex - 1] : null,
    next: currentIndex < blogArticles.length - 1 ? blogArticles[currentIndex + 1] : null,
  };
}
