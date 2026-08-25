import type { LocaleNavigation } from "@/types/navigation";
import { siteContact } from "./contact";

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
