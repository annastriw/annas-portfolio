import type { Locale } from "@/lib/i18n/config";
import type { Project } from "@/lib/projects/project-types";
import type { BlogPost } from "@/lib/blog/blog-types";
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
    name: DEFAULT_AUTHOR,
    url: SITE_URL,
    jobTitle: "Software Engineer & AI Practitioner",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universitas Diponegoro",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Semarang",
      addressCountry: "Indonesia",
    },
    sameAs: [
      "https://github.com/annastriw",
      "https://www.linkedin.com/in/annastriw",
    ],
    knowsAbout: [
      "Software Engineering",
      "Next.js",
      "TypeScript",
      "React",
      "Fullstack Web Architecture",
      "Applied Artificial Intelligence",
      "Machine Learning",
      "IoT & Hardware Interfacing",
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
    description:
      "Technical editorial portfolio of Annas Tri Widagdo, software engineer and AI practitioner.",
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
  project: Project,
  locale: Locale,
): JsonLdSoftwareSourceCode {
  const language =
    (typeof project.metadata.raw.bahasa_utama === "string" &&
      project.metadata.raw.bahasa_utama) ||
    (typeof project.metadata.raw.primary_tool === "string" &&
      project.metadata.raw.primary_tool) ||
    undefined;

  const keywords = [
    project.metadata.kind,
    project.metadata.projectType,
    project.metadata.role,
    project.metadata.stakeholder,
  ].filter((k): k is string => Boolean(k) && k !== "-");

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.metadata.title,
    description: `${project.metadata.projectType} developed by Annas Tri Widagdo. ${
      project.metadata.stakeholder ? `Developed for ${project.metadata.stakeholder}.` : ""
    }`.trim(),
    url: `${SITE_URL}/${locale}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: DEFAULT_AUTHOR,
    },
    ...(language ? { programmingLanguage: language } : {}),
    ...(keywords.length > 0 ? { keywords } : {}),
    ...(project.metadata.liveUrl ? { relatedLink: project.metadata.liveUrl } : {}),
  };
}

/**
 * Generates Schema.org BlogPosting JSON-LD for a Blog Article Detail page.
 */
export function generateBlogPostingJsonLd(
  post: BlogPost,
  locale: Locale,
): JsonLdBlogPosting {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    url: `${SITE_URL}/${locale}/blog/${post.slug}`,
    datePublished: post.metadata.date,
    inLanguage: locale === "id" ? "id" : "en",
    author: {
      "@type": "Person",
      name: post.metadata.author || DEFAULT_AUTHOR,
      url: SITE_URL,
    },
    ...(post.metadata.tags.length > 0
      ? { keywords: post.metadata.tags.join(", ") }
      : {}),
  };
}
