import type { Locale } from "@/lib/i18n/config";
import type { ProjectItem } from "@/content/projects/projects-types";
import type { BlogPostItem } from "@/content/blog/blog-types";
import { siteConfig } from "@/content/site/site-config";
import {
  SITE_URL,
  DEFAULT_AUTHOR,
  type JsonLdPerson,
  type JsonLdWebSite,
  type JsonLdProfilePage,
  type JsonLdItemList,
  type JsonLdSoftwareSourceCode,
  type JsonLdBlogPosting,
} from "./seo-types";

/**
 * Generates factual Schema.org Person JSON-LD for Annas Tri Widagdo.
 */
export function generatePersonJsonLd(): JsonLdPerson {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: SITE_URL,
    jobTitle: "Software Engineer, Full-Stack Developer & Machine Learning Engineer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universitas Diponegoro",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Klaten, Central Java",
      addressCountry: "Indonesia",
    },
    sameAs: [
      siteConfig.contact.gitHubUrl,
      siteConfig.contact.linkedInUrl,
    ],
    knowsAbout: [
      "Software Engineering",
      "Next.js",
      "TypeScript",
      "React",
      "Fullstack Web Architecture",
      "NestJS",
      "Laravel",
      "Machine Learning",
      "Python",
      "Scikit-learn",
      "Android & Hardware Printing Integration",
    ],
  };
}

/**
 * Generates Schema.org WebSite JSON-LD.
 */
export function generateWebSiteJsonLd(): JsonLdWebSite {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Annas Tri Widagdo Portfolio",
    url: SITE_URL,
    inLanguage: ["en", "id"],
    description: siteConfig.documentDescription.en,
    publisher: {
      "@type": "Person",
      name: DEFAULT_AUTHOR,
    },
  };
}

/**
 * Generates Schema.org ProfilePage JSON-LD for the About page.
 */
export function generateProfilePageJsonLd(locale: Locale): JsonLdProfilePage {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name:
      locale === "id"
        ? "Tentang & Profil Rekayasa — Annas Tri Widagdo"
        : "About & Engineering Profile — Annas Tri Widagdo",
    url: `${SITE_URL}/${locale}/about`,
    mainEntity: generatePersonJsonLd(),
  };
}

/**
 * Generates Schema.org ItemList JSON-LD for project or blog listings.
 */
export function generateItemListJsonLd(
  items: Array<{ title: string; url: string }>,
  listName: string,
  listUrl: string,
): JsonLdItemList {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    url: listUrl,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: item.url,
    })),
  };
}

/**
 * Generates Schema.org SoftwareSourceCode / CreativeWork JSON-LD for a Project Detail page.
 */
export function generateProjectJsonLd(
  project: ProjectItem,
  locale: Locale,
): JsonLdSoftwareSourceCode {
  const language = project.techStack.core[0] || undefined;
  const keywords = [
    project.category,
    project.projectType[locale],
    project.role[locale],
    project.stakeholder?.[locale],
    ...project.techStack.core,
  ].filter((k): k is string => Boolean(k) && k !== "-");

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title[locale],
    description: project.summary[locale],
    url: `${SITE_URL}/${locale}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: DEFAULT_AUTHOR,
    },
    ...(language ? { programmingLanguage: language } : {}),
    ...(keywords.length > 0 ? { keywords } : {}),
    ...(project.liveUrl ? { relatedLink: project.liveUrl } : {}),
  };
}

/**
 * Generates Schema.org BlogPosting JSON-LD for a Blog Article Detail page.
 */
export function generateBlogPostingJsonLd(
  post: BlogPostItem,
  locale: Locale,
): JsonLdBlogPosting {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[locale],
    description: post.description[locale],
    url: `${SITE_URL}/${locale}/blog/${post.slug}`,
    datePublished: post.date,
    inLanguage: locale === "id" ? "id" : "en",
    author: {
      "@type": "Person",
      name: DEFAULT_AUTHOR,
      url: SITE_URL,
    },
    ...(post.tags.length > 0 ? { keywords: post.tags.join(", ") } : {}),
  };
}
