import type { Locale } from "@/lib/i18n/config";

export interface NavItem {
  key: string;
  label: string;
  href: string;
  isExternal?: boolean;
  index: string;
}

export interface SocialLink {
  key: string;
  label: string;
  href: string;
  username?: string;
  isExternal: boolean;
}

export interface NavigationConfig {
  mainNav: NavItem[];
  socialLinks: SocialLink[];
  labels: {
    menu: string;
    closeMenu: string;
    switchLanguage: string;
    navigation: string;
    connect: string;
    system: string;
    theme: string;
    skipToContent: string;
  };
}

export type LocaleNavigation = Record<Locale, NavigationConfig>;
