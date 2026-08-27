import type { Locale } from "@/lib/i18n/config";

export interface SiteIdentity {
  brand: string;
  name: string;
  positioning: Record<Locale, string>;
  documentTitle: Record<Locale, string>;
  documentDescription: Record<Locale, string>;
}

export const siteIdentity: SiteIdentity = {
  brand: "annastriwidagdo.me",
  name: "Annas Tri Widagdo",
  positioning: {
    en: "Software Engineer · Full-Stack Web Developer · Machine Learning Engineer",
    id: "Software Engineer · Full-Stack Web Developer · Machine Learning Engineer",
  },
  documentTitle: {
    en: "Annas Tri Widagdo | Software Engineer",
    id: "Annas Tri Widagdo | Software Engineer",
  },
  documentDescription: {
    en: "Software engineering portfolio of Annas Tri Widagdo, featuring full-stack web development, machine learning, and practical software projects.",
    id: "Portfolio Annas Tri Widagdo yang menampilkan pengalaman dalam software engineering, full-stack web development, machine learning, dan berbagai project software.",
  },
};
