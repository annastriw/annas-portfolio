import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales } from "@/lib/i18n/config";
import { AboutHero } from "@/components/about/about-hero";
import { AboutBiography } from "@/components/about/about-biography";
import { AboutEducation } from "@/components/about/about-education";
import { AboutCertificates } from "@/components/about/about-certificates";
import { AboutPrinciples } from "@/components/about/about-principles";
import { AboutTechMatrix } from "@/components/about/about-tech-matrix";
import { AboutConnect } from "@/components/about/about-connect";

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const isId = locale === "id";
  const title = isId
    ? "Tentang & Profil Rekayasa — Annas Tri Widagdo"
    : "About & Engineering Profile — Annas Tri Widagdo";
  const description = isId
    ? "Profil rekayasa perangkat lunak, latar belakang pendidikan Teknik Komputer Universitas Diponegoro (Wisudawan Terbaik), sertifikasi terverifikasi, dan filosofi kerja Annas Tri Widagdo."
    : "Engineering profile, Diponegoro University Computer Engineering background (Best Graduate), verified credentials, and software principles of Annas Tri Widagdo.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://annastriwidagdo.me/${locale}/about`,
      languages: {
        en: "https://annastriwidagdo.me/en/about",
        id: "https://annastriwidagdo.me/id/about",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://annastriwidagdo.me/${locale}/about`,
      siteName: "Annas Tri Widagdo Portfolio",
      locale: isId ? "id_ID" : "en_US",
      type: "profile",
    },
  };
}

export default async function AboutPage({
  params,
}: AboutPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="about-page">
      <div className="about-page-container">
        {/* 00. Page Header */}
        <AboutHero locale={locale} />

        {/* 01. Biographical Narrative & Spec Box */}
        <AboutBiography locale={locale} />

        {/* 02. Education & Academic Distinction */}
        <AboutEducation locale={locale} />

        {/* 03. Verified Credentials & Certifications Showcase */}
        <AboutCertificates locale={locale} />

        {/* 04. Core Engineering Principles Manifesto */}
        <AboutPrinciples locale={locale} />

        {/* 05. Technical Taxonomy & Stack Depth */}
        <AboutTechMatrix locale={locale} />

        {/* 06. Transmission / Contact Channels */}
        <AboutConnect locale={locale} />
      </div>
    </div>
  );
}
