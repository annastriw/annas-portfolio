import type { LocaleNavigation } from "@/types/navigation";

const currentYear = new Date().getFullYear();

export const navigationConfig: LocaleNavigation = {
  en: {
    mainNav: [
      {
        key: "home",
        label: "Home",
        href: "/",
        index: "01",
      },
      {
        key: "about",
        label: "About",
        href: "/about",
        index: "02",
      },
      {
        key: "projects",
        label: "Projects",
        href: "/projects",
        index: "03",
      },
      {
        key: "blog",
        label: "Blog",
        href: "/blog",
        index: "04",
      },
      {
        key: "contact",
        label: "Contact",
        href: "/contact",
        index: "05",
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
        href: "mailto:annastriw23@gmail.com",
        username: "annastriw23@gmail.com",
        isExternal: false,
      },
    ],
    colophon: {
      title: "annastriwidagdo.me",
      description:
        "Software Engineer · Full-Stack Developer · ML Engineer building robust web systems, intelligent products, and technical editorial solutions.",
      location: "Klaten, Central Java, Indonesia",
      timezone: "UTC+7",
      copyright: `© ${currentYear} Annas Tri Widagdo. All rights reserved.`,
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
        key: "home",
        label: "Beranda",
        href: "/",
        index: "01",
      },
      {
        key: "about",
        label: "Tentang",
        href: "/about",
        index: "02",
      },
      {
        key: "projects",
        label: "Proyek",
        href: "/projects",
        index: "03",
      },
      {
        key: "blog",
        label: "Blog",
        href: "/blog",
        index: "04",
      },
      {
        key: "contact",
        label: "Kontak",
        href: "/contact",
        index: "05",
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
        href: "mailto:annastriw23@gmail.com",
        username: "annastriw23@gmail.com",
        isExternal: false,
      },
    ],
    colophon: {
      title: "annastriwidagdo.me",
      description:
        "Software Engineer · Full-Stack Developer · ML Engineer yang membangun sistem web yang tangguh, produk cerdas, dan solusi technical editorial.",
      location: "Klaten, Jawa Tengah, Indonesia",
      timezone: "UTC+7",
      copyright: `© ${currentYear} Annas Tri Widagdo. Hak cipta dilindungi.`,
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
