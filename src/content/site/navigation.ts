import type { Locale } from "@/lib/i18n/config";

export interface NavItem {
  key: string;
  label: string;
  href: string;
  index: string;
}

export interface NavigationLabels {
  menu: string;
  closeMenu: string;
  switchLanguage: string;
  navigation: string;
  connect: string;
  system: string;
  theme: string;
  skipToContent: string;
  backToTop: string;
}

export const mainNavigation: Record<Locale, NavItem[]> = {
  en: [
    { key: "home", label: "Home", href: "/", index: "01" },
    { key: "about", label: "About", href: "/about", index: "02" },
    { key: "projects", label: "Projects", href: "/projects", index: "03" },
    { key: "blog", label: "Blog", href: "/blog", index: "04" },
    { key: "contact", label: "Contact", href: "/contact", index: "05" },
  ],
  id: [
    { key: "home", label: "Beranda", href: "/", index: "01" },
    { key: "about", label: "Tentang", href: "/about", index: "02" },
    { key: "projects", label: "Proyek", href: "/projects", index: "03" },
    { key: "blog", label: "Blog", href: "/blog", index: "04" },
    { key: "contact", label: "Kontak", href: "/contact", index: "05" },
  ],
};

export const navigationLabels: Record<Locale, NavigationLabels> = {
  en: {
    menu: "Menu",
    closeMenu: "Close menu",
    switchLanguage: "Switch language",
    navigation: "Navigation",
    connect: "Connect",
    system: "System",
    theme: "Theme",
    skipToContent: "Skip to content",
    backToTop: "Back to top",
  },
  id: {
    menu: "Menu",
    closeMenu: "Tutup menu",
    switchLanguage: "Ganti bahasa",
    navigation: "Navigasi",
    connect: "Terhubung",
    system: "Sistem",
    theme: "Tema",
    skipToContent: "Lewati ke konten",
    backToTop: "Kembali ke atas",
  },
};
