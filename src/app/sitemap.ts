import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/projects/project-content";
import { getBlogSlugs } from "@/lib/blog/blog-content";
import { SITE_URL } from "@/lib/seo/seo-types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // 3. Projects Hub Pages
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

  // 4. Individual Project Detail Pages
  const projectSlugs = await getProjectSlugs();
  for (const slug of projectSlugs) {
    entries.push({
      url: `${SITE_URL}/en/projects/${slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/projects/${slug}`,
          id: `${SITE_URL}/id/projects/${slug}`,
        },
      },
    });

    entries.push({
      url: `${SITE_URL}/id/projects/${slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/projects/${slug}`,
          id: `${SITE_URL}/id/projects/${slug}`,
        },
      },
    });
  }

  // 5. Blog Hub Pages
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

  // 6. Individual Blog Article Pages
  const enBlogSlugs = await getBlogSlugs("en");
  const idBlogSlugs = await getBlogSlugs("id");
  const allBlogSlugs = Array.from(new Set([...enBlogSlugs, ...idBlogSlugs])).sort();

  for (const slug of allBlogSlugs) {
    const hasEn = enBlogSlugs.includes(slug);
    const hasId = idBlogSlugs.includes(slug);

    if (hasEn) {
      entries.push({
        url: `${SITE_URL}/en/blog/${slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            en: `${SITE_URL}/en/blog/${slug}`,
            ...(hasId ? { id: `${SITE_URL}/id/blog/${slug}` } : {}),
          },
        },
      });
    }

    if (hasId) {
      entries.push({
        url: `${SITE_URL}/id/blog/${slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            ...(hasEn ? { en: `${SITE_URL}/en/blog/${slug}` } : {}),
            id: `${SITE_URL}/id/blog/${slug}`,
          },
        },
      });
    }
  }

  return entries;
}
