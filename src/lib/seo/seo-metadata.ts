import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { SITE_URL, DEFAULT_AUTHOR } from "./seo-types.ts";

export interface PageMetadataImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface PageMetadataOptions {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article" | "profile";
  images?: PageMetadataImage[];
  keywords?: string[];
  authors?: string[];
}

const DEFAULT_IMAGE: PageMetadataImage = {
  url: "/assets/profile/pas-foto.webp",
  width: 800,
  height: 1067,
  alt: "Annas Tri Widagdo - Software Engineer",
};

/**
 * Standardizes metadata generation across all portfolio routes.
 * Enforces canonical URL, multilingual hreflang with x-default, OpenGraph, and Twitter tags.
 */
export function createPageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  images,
  keywords,
  authors,
}: PageMetadataOptions): Metadata {
  const isId = locale === "id";
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const canonicalUrl = `${SITE_URL}/${locale}${cleanPath}`;
  const enUrl = `${SITE_URL}/en${cleanPath}`;
  const idUrl = `${SITE_URL}/id${cleanPath}`;

  const resolvedImages =
    images && images.length > 0 ? images : [DEFAULT_IMAGE];

  return {
    title,
    description,
    keywords,
    authors: authors
      ? authors.map((name) => ({ name, url: SITE_URL }))
      : [{ name: DEFAULT_AUTHOR, url: SITE_URL }],
    creator: DEFAULT_AUTHOR,
    publisher: DEFAULT_AUTHOR,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: enUrl,
        id: idUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Annas Tri Widagdo Portfolio",
      locale: isId ? "id_ID" : "en_US",
      alternateLocale: isId ? ["en_US"] : ["id_ID"],
      type,
      images: resolvedImages.map((img) => ({
        url: img.url,
        ...(img.width ? { width: img.width } : {}),
        ...(img.height ? { height: img.height } : {}),
        ...(img.alt ? { alt: img.alt } : {}),
      })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: resolvedImages.map((img) => img.url),
    },
  };
}
