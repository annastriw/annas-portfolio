import type { Locale } from "@/lib/i18n/config";
import {
  mainNavigation,
  navigationLabels,
  type NavItem,
  type NavigationLabels,
} from "./navigation";
import { siteIdentity } from "./identity";
import { siteContact } from "./contact";

export interface SocialLink {
  key: string;
  label: string;
  href: string;
  username: string;
  isExternal: boolean;
}

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
  labels: Record<Locale, NavigationLabels>;
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
  mainNav: mainNavigation,
  socialLinks: [
    {
      key: "github",
      label: "GitHub",
      href: siteContact.gitHubUrl,
      username: siteContact.gitHub,
      isExternal: true,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: siteContact.linkedInUrl,
      username: siteContact.linkedIn,
      isExternal: true,
    },
    {
      key: "email",
      label: "Email",
      href: siteContact.emailUrl,
      username: siteContact.email,
      isExternal: false,
    },
  ],
  labels: navigationLabels,
};
