import type { LocaleNavigation } from "@/types/navigation";

export const navigationConfig: LocaleNavigation = {
  en: {
    mainNav: [
      {
        key: "projects",
        label: "Projects",
        href: "/projects",
        index: "01",
      },
      {
        key: "about",
        label: "About",
        href: "/about",
        index: "02",
      },
      {
        key: "blog",
        label: "Blog",
        href: "/blog",
        index: "03",
      },
      {
        key: "contact",
        label: "Contact",
        href: "/#contact",
        index: "04",
      },
    ],
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
        href: "mailto:annastriwidagdo@gmail.com",
        username: "annastriwidagdo@gmail.com",
        isExternal: false,
      },
    ],
    colophon: {
      title: "Annas Tri Widagdo",
      description:
        "Software engineer & AI practitioner building robust web systems, intelligent products, and technical editorial solutions.",
      location: "Semarang, Indonesia",
      timezone: "UTC+7",
      copyright: "© 2026 Annas Tri Widagdo. All rights reserved.",
    },
    labels: {
      menu: "Menu",
      closeMenu: "Close menu",
      switchLanguage: "Switch language",
      navigation: "Navigation",
      connect: "Connect",
      system: "System",
      theme: "Theme",
      skipToContent: "Skip to content",
    },
  },
  id: {
    mainNav: [
      {
        key: "projects",
        label: "Proyek",
        href: "/projects",
        index: "01",
      },
      {
        key: "about",
        label: "Tentang",
        href: "/about",
        index: "02",
      },
      {
        key: "blog",
        label: "Blog",
        href: "/blog",
        index: "03",
      },
      {
        key: "contact",
        label: "Kontak",
        href: "/#contact",
        index: "04",
      },
    ],
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
        href: "mailto:annastriwidagdo@gmail.com",
        username: "annastriwidagdo@gmail.com",
        isExternal: false,
      },
    ],
    colophon: {
      title: "Annas Tri Widagdo",
      description:
        "Software engineer & praktisi AI yang membangun sistem web yang tangguh, produk cerdas, dan solusi technical editorial.",
      location: "Semarang, Indonesia",
      timezone: "WIB (UTC+7)",
      copyright: "© 2026 Annas Tri Widagdo. Hak cipta dilindungi.",
    },
    labels: {
      menu: "Menu",
      closeMenu: "Tutup menu",
      switchLanguage: "Ganti bahasa",
      navigation: "Navigasi",
      connect: "Terhubung",
      system: "Sistem",
      theme: "Tema",
      skipToContent: "Lewati ke konten",
    },
  },
};
