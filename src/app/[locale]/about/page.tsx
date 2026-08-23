import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import { AboutHero } from "@/components/about/about-hero";
import { AboutBiography } from "@/components/about/about-biography";
import { AboutEducation } from "@/components/about/about-education";
import { AboutCertificates } from "@/components/about/about-certificates";
import { AboutPrinciples } from "@/components/about/about-principles";
import { AboutTechMatrix } from "@/components/about/about-tech-matrix";
import { AboutConnect } from "@/components/about/about-connect";
import { JsonLd } from "@/components/seo/json-ld";
import { generateProfilePageJsonLd } from "@/lib/seo/schema-generators";

interface PageProps {
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
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const isId = locale === "id";
  const title = isId
    ? "Tentang - Annas Tri Widagdo"
    : "About - Annas Tri Widagdo";
  const description = isId
    ? "Profil rekayasa perangkat lunak, latar belakang teknik komputer Universitas Diponegoro, sertifikasi Cisco & Oracle, prinsip rekayasa, dan taksonomi teknologi Annas Tri Widagdo."
    : "Software engineering profile, Diponegoro University computer engineering foundation, Cisco & Oracle credentials, core engineering manifesto, and technical taxonomy of Annas Tri Widagdo.";

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

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="about-page">
      <div className="about-page-container">
        <JsonLd schema={generateProfilePageJsonLd(locale as Locale)} />

        {/* 01. About Hero Header */}
        <AboutHero locale={locale as Locale} />

        {/* 02. Narrative Biography & Quick Specs */}
        <AboutBiography locale={locale as Locale} />

        {/* 03. Academic Foundation */}
        <AboutEducation locale={locale as Locale} />

        {/* 04. Verified Credentials & Certifications */}
        <AboutCertificates locale={locale as Locale} />

        {/* 05. Core Engineering Principles */}
        <AboutPrinciples locale={locale as Locale} />

        {/* 06. Technical Capabilities & Taxonomy */}
        <AboutTechMatrix locale={locale as Locale} />

        {/* 07. Collaboration & Connect */}
        <AboutConnect locale={locale as Locale} />
      </div>
    </div>
  );
}
