import type { Locale } from "@/lib/i18n/config";

export const professionalRoles = [
  "Software Engineer",
  "Full-Stack Web Developer",
  "AI & Machine Learning Enthusiast",
] as const;

export type ProfessionalRole = (typeof professionalRoles)[number];

export interface SiteIdentity {
  brand: string;
  name: string;
  primaryJobTitle: string;
  roles: typeof professionalRoles;
  positioning: Record<Locale, string>;
  location: string;
  locationMetadata: string;
  timezone: string;
  documentTitle: Record<Locale, string>;
  documentDescription: Record<Locale, string>;
}

export const siteIdentity: SiteIdentity = {
  brand: "annastriwidagdo.me",
  name: "Annas Tri Widagdo",
  primaryJobTitle: "Software Engineer",
  roles: professionalRoles,
  positioning: {
    en: "Software Engineer · Full-Stack Web Developer · AI & Machine Learning Enthusiast",
    id: "Software Engineer · Full-Stack Web Developer · AI & Machine Learning Enthusiast",
  },
  location: "Jakarta, Indonesia",
  locationMetadata: "JAKARTA, INDONESIA · UTC+7",
  timezone: "Asia/Jakarta (UTC+7)",
  documentTitle: {
    en: "Annas Tri Widagdo | Software Engineer",
    id: "Annas Tri Widagdo | Software Engineer",
  },
  documentDescription: {
    en: "Software engineering portfolio of Annas Tri Widagdo, featuring full-stack web development, machine learning, and practical software projects.",
    id: "Portfolio Annas Tri Widagdo yang menampilkan pengalaman dalam software engineering, full-stack web development, machine learning, dan berbagai project software.",
  },
};
