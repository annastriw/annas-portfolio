import type { MetadataRoute } from "next";
import { projectCaseStudies } from "@/content/projects/project-case-studies";
import { blogArticles } from "@/content/blog";
import { SITE_URL } from "@/lib/seo/seo-types";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // 1. Root / Locale Landing Pages
  entries.push({
    url: `${SITE_URL}/en`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: {
        en: `${SITE_URL}/en`,
        id: `${SITE_URL}/id`,
      },
    },
  });

  entries.push({
    url: `${SITE_URL}/id`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: {
        en: `${SITE_URL}/en`,
        id: `${SITE_URL}/id`,
      },
    },
  });

  // 2. About Pages
  entries.push({
    url: `${SITE_URL}/en/about`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: {
      languages: {
        en: `${SITE_URL}/en/about`,
        id: `${SITE_URL}/id/about`,
      },
    },
  });

  entries.push({
    url: `${SITE_URL}/id/about`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: {
      languages: {
        en: `${SITE_URL}/en/about`,
        id: `${SITE_URL}/id/about`,
      },
    },
  });

  // 3. Contact Pages
  entries.push({
    url: `${SITE_URL}/en/contact`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: {
      languages: {
        en: `${SITE_URL}/en/contact`,
        id: `${SITE_URL}/id/contact`,
      },
    },
  });

  entries.push({
    url: `${SITE_URL}/id/contact`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: {
      languages: {
        en: `${SITE_URL}/en/contact`,
        id: `${SITE_URL}/id/contact`,
      },
    },
  });

  // 4. Projects Hub Pages
  entries.push({
    url: `${SITE_URL}/en/projects`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.9,
    alternates: {
      languages: {
        en: `${SITE_URL}/en/projects`,
        id: `${SITE_URL}/id/projects`,
      },
    },
  });

  entries.push({
    url: `${SITE_URL}/id/projects`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.9,
    alternates: {
      languages: {
        en: `${SITE_URL}/en/projects`,
        id: `${SITE_URL}/id/projects`,
      },
    },
  });

  // 5. Individual Project Detail Pages (10 curated projects)
  for (const project of projectCaseStudies) {
    entries.push({
      url: `${SITE_URL}/en/projects/${project.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/projects/${project.slug}`,
          id: `${SITE_URL}/id/projects/${project.slug}`,
        },
      },
    });

    entries.push({
      url: `${SITE_URL}/id/projects/${project.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/projects/${project.slug}`,
          id: `${SITE_URL}/id/projects/${project.slug}`,
        },
      },
    });
  }

  // 6. Blog Hub Pages
  entries.push({
    url: `${SITE_URL}/en/blog`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: {
        en: `${SITE_URL}/en/blog`,
        id: `${SITE_URL}/id/blog`,
      },
    },
  });

  entries.push({
    url: `${SITE_URL}/id/blog`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: {
        en: `${SITE_URL}/en/blog`,
        id: `${SITE_URL}/id/blog`,
      },
    },
  });

  // 7. Individual Blog Article Pages
  for (const article of blogArticles) {
    entries.push({
      url: `${SITE_URL}/en/blog/${article.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/blog/${article.slug}`,
          id: `${SITE_URL}/id/blog/${article.slug}`,
        },
      },
    });

    entries.push({
      url: `${SITE_URL}/id/blog/${article.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/blog/${article.slug}`,
          id: `${SITE_URL}/id/blog/${article.slug}`,
        },
      },
    });
  }

  return entries;
}
