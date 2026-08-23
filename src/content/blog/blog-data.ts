import {
  blogArticles,
  getAllBlogPosts,
  getBlogPostBySlug,
  getAdjacentBlogPosts,
  getAllBlogCategories,
} from "./index";
import type { BlogPostItem } from "./types";

export const blogPostsData: BlogPostItem[] = blogArticles;
export const getAllBlogPostsData = getAllBlogPosts;
export const getBlogPostDataBySlug = getBlogPostBySlug;
export const getAdjacentBlogPostsData = getAdjacentBlogPosts;
export const getAllBlogCategoriesData = getAllBlogCategories;

export * from "./index";
