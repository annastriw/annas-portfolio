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
    en: "Software Engineer · Full-Stack Developer · Machine Learning Engineer",
    id: "Software Engineer · Full-Stack Developer · Machine Learning Engineer",
  },
  documentTitle: {
    en: "Annas Tri Widagdo - Software Engineer",
    id: "Annas Tri Widagdo - Software Engineer",
  },
  documentDescription: {
    en: "Technical editorial archive of Annas Tri Widagdo. Fullstack web applications, machine learning integration, and robust software architectures grounded in verified implementation evidence.",
    id: "Arsip editorial teknis Annas Tri Widagdo. Aplikasi web fullstack, integrasi machine learning, dan arsitektur perangkat lunak andal berlandaskan bukti implementasi terverifikasi.",
  },
};
