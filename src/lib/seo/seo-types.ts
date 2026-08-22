export const SITE_URL = "https://annastriwidagdo.me";
export const DEFAULT_AUTHOR = "Annas Tri Widagdo";

export interface JsonLdPerson {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  url: string;
  jobTitle: string;
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
  mainEntity: JsonLdPerson;
}

export interface JsonLdItemList {
  "@context": "https://schema.org";
  "@type": "ItemList";
  name: string;
  url: string;
  numberOfItems: number;
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    url: string;
  }>;
}

export interface JsonLdSoftwareSourceCode {
  "@context": "https://schema.org";
  "@type": "SoftwareSourceCode" | "CreativeWork";
  name: string;
  description: string;
  url: string;
  author: {
    "@type": "Person";
    name: string;
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
  datePublished: string;
  inLanguage: string;
  author: {
    "@type": "Person";
    name: string;
    url: string;
  };
  keywords?: string;
}
