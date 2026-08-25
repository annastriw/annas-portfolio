import type { Locale } from "@/lib/i18n/config";
import { navigationConfig } from "@/data/navigation";
import type { NavItem, SocialLink, NavigationConfig } from "@/types/navigation";
import { siteIdentity } from "./identity";
import { siteContact } from "./contact";

export interface SiteConfig {
  brand: string;
  name: string;
  positioning: {
    en: string;
    id: string;
  };
  documentTitle: {
    en: string;
    id: string;
  };
  documentDescription: {
    en: string;
    id: string;
  };
  contact: {
    email: string;
    linkedIn: string;
    linkedInUrl: string;
    gitHub: string;
    gitHubUrl: string;
    location: string;
    timezone: string;
    status: string;
  };
  mainNav: Record<Locale, NavItem[]>;
  socialLinks: SocialLink[];
  labels: Record<Locale, NavigationConfig["labels"]>;
}

export const siteConfig: SiteConfig = {
  brand: siteIdentity.brand,
  name: siteIdentity.name,
  positioning: siteIdentity.positioning,
  documentTitle: siteIdentity.documentTitle,
  documentDescription: siteIdentity.documentDescription,
  contact: {
    email: siteContact.email,
    linkedIn: siteContact.linkedIn,
    linkedInUrl: siteContact.linkedInUrl,
    gitHub: siteContact.gitHub,
    gitHubUrl: siteContact.gitHubUrl,
    location: siteContact.location,
    timezone: siteContact.timezone,
    status: siteContact.status.en,
  },
  mainNav: {
    en: navigationConfig.en.mainNav,
    id: navigationConfig.id.mainNav,
  },
  socialLinks: navigationConfig.en.socialLinks,
  labels: {
    en: navigationConfig.en.labels,
    id: navigationConfig.id.labels,
  },
};
