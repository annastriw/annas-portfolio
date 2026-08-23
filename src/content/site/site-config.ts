import type { Locale } from "@/lib/i18n/config";

export interface NavItem {
  key: string;
  label: string;
  href: string;
  index: string;
}

export interface SocialLink {
  key: string;
  label: string;
  href: string;
  username: string;
  isExternal: boolean;
}

export interface ColophonConfig {
  title: string;
  positioning: string;
  location: string;
  timezone: string;
  status: string;
  copyright: string;
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
  colophon: Record<Locale, ColophonConfig>;
  labels: Record<
    Locale,
    {
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
  >;
}

export const siteConfig: SiteConfig = {
  brand: "annastriwidagdo.me",
  name: "Annas Tri Widagdo",
  positioning: {
    en: "Software Engineer · Full-Stack Developer · Machine Learning Engineer",
    id: "Software Engineer · Full-Stack Developer · Machine Learning Engineer",
  },
  documentTitle: {
    en: "Annas Tri Widagdo — Software Engineer, Full-Stack Developer & Machine Learning Engineer",
    id: "Annas Tri Widagdo — Software Engineer, Full-Stack Developer & Machine Learning Engineer",
  },
  documentDescription: {
    en: "Technical editorial archive of Annas Tri Widagdo. Fullstack web applications, machine learning integration, and robust software architectures grounded in verified implementation evidence.",
    id: "Arsip editorial teknis Annas Tri Widagdo. Aplikasi web fullstack, integrasi machine learning, dan arsitektur perangkat lunak andal berlandaskan bukti implementasi terverifikasi.",
  },
  contact: {
    email: "annastriw23@gmail.com",
    linkedIn: "linkedin.com/in/annastriw",
    linkedInUrl: "https://www.linkedin.com/in/annastriw",
    gitHub: "github.com/annastriw",
    gitHubUrl: "https://github.com/annastriw",
    location: "Klaten, Central Java, Indonesia",
    timezone: "Asia/Jakarta (UTC+7)",
    status: "OPEN TO COLLABORATION",
  },
  mainNav: {
    en: [
      { key: "home", label: "Home", href: "/", index: "01" },
      { key: "about", label: "About", href: "/about", index: "02" },
      { key: "projects", label: "Projects", href: "/projects", index: "03" },
      { key: "blog", label: "Blog", href: "/blog", index: "04" },
      { key: "contact", label: "Contact", href: "/#contact", index: "05" },
    ],
    id: [
      { key: "home", label: "Beranda", href: "/", index: "01" },
      { key: "about", label: "Tentang", href: "/about", index: "02" },
      { key: "projects", label: "Proyek", href: "/projects", index: "03" },
      { key: "blog", label: "Blog", href: "/blog", index: "04" },
      { key: "contact", label: "Kontak", href: "/#contact", index: "05" },
    ],
  },
  socialLinks: [
    {
      key: "github",
      label: "GitHub",
      href: "https://github.com/annastriw",
      username: "annastriw",
      isExternal: true,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/annastriw",
      username: "annastriw",
      isExternal: true,
    },
    {
      key: "email",
      label: "Email",
      href: "mailto:annastriw23@gmail.com",
      username: "annastriw23@gmail.com",
      isExternal: false,
    },
  ],
  colophon: {
    en: {
      title: "Annas Tri Widagdo",
      positioning: "Software Engineer · Full-Stack Developer · Machine Learning Engineer",
      location: "Klaten, Central Java, Indonesia",
      timezone: "UTC+7",
      status: "OPEN TO COLLABORATION",
      copyright: "© 2026 Annas Tri Widagdo. All rights reserved.",
    },
    id: {
      title: "Annas Tri Widagdo",
      positioning: "Software Engineer · Full-Stack Developer · Machine Learning Engineer",
      location: "Klaten, Jawa Tengah, Indonesia",
      timezone: "WIB (UTC+7)",
      status: "TERSEDIA UNTUK KOLABORASI",
      copyright: "© 2026 Annas Tri Widagdo. Hak cipta dilindungi.",
    },
  },
  labels: {
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
  },
};
