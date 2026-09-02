import type { Locale } from "../i18n/config.ts";
import type { ProjectCaseStudy } from "../../content/projects/project-case-studies.ts";
import { getProjectCaseStudy } from "../../content/projects/project-case-studies.ts";
import type { BlogArticle } from "../../content/blog/index.ts";
import { siteConfig } from "../../content/site/site-config.ts";
import {
  SITE_URL,
  DEFAULT_AUTHOR,
  type JsonLdPerson,
  type JsonLdWebSite,
  type JsonLdProfilePage,
  type JsonLdContactPage,
  type JsonLdItemList,
  type JsonLdCollectionPage,
  type JsonLdSoftwareSourceCode,
  type JsonLdBlogPosting,
  type JsonLdBreadcrumbList,
} from "./seo-types.ts";

/**
 * Generates factual Schema.org Person JSON-LD for Annas Tri Widagdo.
 */
export function generatePersonJsonLd(): JsonLdPerson {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: SITE_URL,
    image: `${SITE_URL}/assets/profile/pas-foto.webp`,
    jobTitle: siteConfig.primaryJobTitle,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Diponegoro University",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "Indonesia",
    },
    sameAs: [
      siteConfig.contact.gitHubUrl,
      siteConfig.contact.linkedInUrl,
    ],
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Development",
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
      "Wav2Vec2 Speech-to-Text",
      "ERP Systems",
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
  const isId = locale === "id";
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: isId
      ? "Tentang Annas Tri Widagdo | Software Engineer"
      : "About Annas Tri Widagdo | Software Engineer",
    url: `${SITE_URL}/${locale}/about`,
    inLanguage: isId ? "id" : "en",
    mainEntity: generatePersonJsonLd(),
  };
}

/**
 * Generates Schema.org ContactPage JSON-LD for the Contact page.
 */
export function generateContactPageJsonLd(locale: Locale): JsonLdContactPage {
  const isId = locale === "id";
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: isId
      ? "Kontak | Annas Tri Widagdo"
      : "Contact | Annas Tri Widagdo",
    url: `${SITE_URL}/${locale}/contact`,
    description: isId
      ? "Hubungi Annas Tri Widagdo melalui email, LinkedIn, atau GitHub untuk proyek, peluang kerja, dan diskusi pengembangan software."
      : "Contact Annas Tri Widagdo by email, LinkedIn, or GitHub about projects, roles, and software development conversations.",
    inLanguage: isId ? "id" : "en",
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
 * Generates Schema.org CollectionPage JSON-LD for Projects/Blog Hubs.
 */
export function generateCollectionPageJsonLd(
  items: Array<{ title: string; url: string }>,
  listName: string,
  listUrl: string,
  description: string,
  locale: Locale,
): JsonLdCollectionPage {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: listName,
    url: listUrl,
    description,
    inLanguage: locale === "id" ? "id" : "en",
    mainEntity: generateItemListJsonLd(items, listName, listUrl),
  };
}

/**
 * Generates Schema.org SoftwareSourceCode / CreativeWork JSON-LD for a Project Detail page.
 */
export function generateProjectJsonLd(
  project: ProjectCaseStudy,
  locale: Locale,
): JsonLdSoftwareSourceCode {
  const techList = project.personalTechStack ?? project.techStack;
  const language = techList[0] || undefined;
  const rawKeywords: readonly string[] = project.keywords
    ? Array.isArray(project.keywords)
      ? project.keywords
      : (project.keywords as Record<Locale, readonly string[]>)[locale]
    : [project.category, project.role[locale], ...techList.slice(0, 6)];
  const keywords = rawKeywords.filter(
    (k: string): k is string => Boolean(k) && k !== "-",
  );

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title[locale],
    description: project.overview[locale].join(" "),
    url: `${SITE_URL}/${locale}/projects/${project.slug}`,
    image: `${SITE_URL}${project.cover.src}`,
    author: {
      "@type": "Person",
      name: DEFAULT_AUTHOR,
      url: SITE_URL,
    },
    ...(language ? { programmingLanguage: language } : {}),
    ...(keywords.length > 0 ? { keywords } : {}),
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    ...(project.liveUrl ? { relatedLink: project.liveUrl } : {}),
  };
}

/**
 * Generates Schema.org BlogPosting JSON-LD for a Blog Article Detail page.
 */
export function generateBlogPostingJsonLd(
  article: BlogArticle,
  locale: Locale,
): JsonLdBlogPosting {
  const isId = locale === "id";
  const primaryProject = article.sourceProjectSlugs[0]
    ? getProjectCaseStudy(article.sourceProjectSlugs[0])
    : null;
  const imageSrc = primaryProject
    ? `${SITE_URL}${primaryProject.cover.src}`
    : `${SITE_URL}/assets/profile/pas-foto.webp`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title[locale],
    description: article.abstract[locale],
    url: `${SITE_URL}/${locale}/blog/${article.slug}`,
    mainEntityOfPage: `${SITE_URL}/${locale}/blog/${article.slug}`,
    inLanguage: isId ? "id" : "en",
    image: imageSrc,
    author: {
      "@type": "Person",
      name: DEFAULT_AUTHOR,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: DEFAULT_AUTHOR,
      url: SITE_URL,
    },
    ...(article.tags.length > 0 ? { keywords: article.tags.join(", ") } : {}),
    about: article.sourceProjectSlugs.map((slug) => {
      const project = getProjectCaseStudy(slug);
      return {
        "@type": "CreativeWork",
        name: project ? project.title[locale] : slug,
        url: `${SITE_URL}/${locale}/projects/${slug}`,
      };
    }),
  };
}

/**
 * Generates Schema.org BreadcrumbList JSON-LD.
 */
export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
): JsonLdBreadcrumbList {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

