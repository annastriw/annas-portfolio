import type { Locale } from "@/lib/i18n/config";

export interface ContactInfo {
  email: string;
  emailUrl: string;
  linkedIn: string;
  linkedInUrl: string;
  gitHub: string;
  gitHubUrl: string;
  location: string;
  timezone: string;
  status: Record<Locale, string>;
  colophon: Record<
    Locale,
    {
      title: string;
      positioning: string;
      location: string;
      timezone: string;
      copyright: string;
    }
  >;
}

export const siteContact: ContactInfo = {
  email: "annastriw23@gmail.com",
  emailUrl: "mailto:annastriw23@gmail.com",
  linkedIn: "linkedin.com/in/annastriw",
  linkedInUrl: "https://www.linkedin.com/in/annastriw",
  gitHub: "github.com/annastriw",
  gitHubUrl: "https://github.com/annastriw",
  location: "Klaten, Central Java, Indonesia",
  timezone: "Asia/Jakarta (UTC+7)",
  status: {
    en: "OPEN TO COLLABORATION",
    id: "TERSEDIA UNTUK KOLABORASI",
  },
  colophon: {
    en: {
      title: "Annas Tri Widagdo",
      positioning: "Software Engineer · Full-Stack Developer · Machine Learning Engineer",
      location: "Klaten, Central Java, Indonesia",
      timezone: "UTC+7",
      copyright: "© 2026 Annas Tri Widagdo. All rights reserved.",
    },
    id: {
      title: "Annas Tri Widagdo",
      positioning: "Software Engineer · Full-Stack Developer · Machine Learning Engineer",
      location: "Klaten, Jawa Tengah, Indonesia",
      timezone: "WIB (UTC+7)",
      copyright: "© 2026 Annas Tri Widagdo. Hak cipta dilindungi.",
    },
  },
};
