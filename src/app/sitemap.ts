import type { MetadataRoute } from "next";
import { projectCaseStudies } from "../content/projects/project-case-studies.ts";
import { blogArticles } from "../content/blog/index.ts";
import { SITE_URL } from "../lib/seo/seo-types.ts";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Helper to build bilingual hreflang alternates with x-default
  const createAlternates = (path: string = "") => ({
    languages: {
      en: `${SITE_URL}/en${path}`,
      id: `${SITE_URL}/id${path}`,
      "x-default": `${SITE_URL}/en${path}`,
    },
  });

  // 1. Root / Locale Landing Pages
  entries.push({
    url: `${SITE_URL}/en`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: createAlternates(),
  });

  entries.push({
    url: `${SITE_URL}/id`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: createAlternates(),
  });

  // 2. About Pages
  entries.push({
    url: `${SITE_URL}/en/about`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: createAlternates("/about"),
  });

  entries.push({
    url: `${SITE_URL}/id/about`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: createAlternates("/about"),
  });

  // 3. Contact Pages
  entries.push({
    url: `${SITE_URL}/en/contact`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: createAlternates("/contact"),
  });

  entries.push({
    url: `${SITE_URL}/id/contact`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: createAlternates("/contact"),
  });

  // 4. Projects Hub Pages
  entries.push({
    url: `${SITE_URL}/en/projects`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.9,
    alternates: createAlternates("/projects"),
  });

  entries.push({
    url: `${SITE_URL}/id/projects`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.9,
    alternates: createAlternates("/projects"),
  });

  // 5. Individual Project Detail Pages (10 curated projects)
  for (const project of projectCaseStudies) {
    const projectPath = `/projects/${project.slug}`;

    entries.push({
      url: `${SITE_URL}/en${projectPath}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: createAlternates(projectPath),
    });

    entries.push({
      url: `${SITE_URL}/id${projectPath}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: createAlternates(projectPath),
    });
  }

  // 6. Blog Hub Pages
  entries.push({
    url: `${SITE_URL}/en/blog`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: createAlternates("/blog"),
  });

  entries.push({
    url: `${SITE_URL}/id/blog`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: createAlternates("/blog"),
  });

  // 7. Individual Blog Article Pages (4 curated technical articles)
  for (const article of blogArticles) {
    const blogPath = `/blog/${article.slug}`;

    entries.push({
      url: `${SITE_URL}/en${blogPath}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: createAlternates(blogPath),
    });

    entries.push({
      url: `${SITE_URL}/id${blogPath}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: createAlternates(blogPath),
    });
  }

  return entries;
}
