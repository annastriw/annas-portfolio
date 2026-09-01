export const SITE_URL = "https://annastriwidagdo.me";
export const DEFAULT_AUTHOR = "Annas Tri Widagdo";

export interface JsonLdPerson {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  url: string;
  jobTitle: string;
  image?: string;
  alumniOf?: {
    "@type": "CollegeOrUniversity";
    name: string;
  };
  address?: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressCountry: string;
  };
  sameAs: string[];
  knowsAbout: string[];
}

export interface JsonLdWebSite {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  inLanguage: string[];
  description: string;
  publisher: {
    "@type": "Person";
    name: string;
  };
}

export interface JsonLdProfilePage {
  "@context": "https://schema.org";
  "@type": "ProfilePage";
  name: string;
  url: string;
  inLanguage?: string;
  mainEntity: JsonLdPerson;
}

export interface JsonLdContactPage {
  "@context": "https://schema.org";
  "@type": "ContactPage";
  name: string;
  url: string;
  description: string;
  inLanguage?: string;
  mainEntity: JsonLdPerson;
}

export interface JsonLdListItem {
  "@type": "ListItem";
  position: number;
  name: string;
  url: string;
}

export interface JsonLdItemList {
  "@context": "https://schema.org";
  "@type": "ItemList";
  name: string;
  url: string;
  numberOfItems: number;
  itemListElement: JsonLdListItem[];
}

export interface JsonLdCollectionPage {
  "@context": "https://schema.org";
  "@type": "CollectionPage";
  name: string;
  url: string;
  description: string;
  inLanguage?: string;
  mainEntity: JsonLdItemList;
}

export interface JsonLdSoftwareSourceCode {
  "@context": "https://schema.org";
  "@type": "SoftwareSourceCode" | "CreativeWork";
  name: string;
  description: string;
  url: string;
  image?: string;
  author: {
    "@type": "Person";
    name: string;
    url?: string;
  };
  programmingLanguage?: string;
  keywords?: string[];
  relatedLink?: string;
}

export interface JsonLdBlogPosting {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  description: string;
  url: string;
  image?: string;
  inLanguage: string;
  mainEntityOfPage?: string;
  author: {
    "@type": "Person";
    name: string;
    url: string;
  };
  publisher?: {
    "@type": "Person";
    name: string;
    url: string;
  };
  keywords?: string;
  about?: Array<{
    "@type": "CreativeWork";
    name: string;
    url: string;
  }>;
}

export interface JsonLdBreadcrumbItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

export interface JsonLdBreadcrumbList {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: JsonLdBreadcrumbItem[];
}

