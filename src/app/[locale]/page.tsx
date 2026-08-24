import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import { projectArchive } from "@/content/projects/project-archive";
import { siteConfig } from "@/content/site/site-config";
import { HeroSection } from "@/components/home/hero-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { GitHubSignal } from "@/components/home/github-signal";
import { SelectedProjects } from "@/components/home/selected-projects";
import { TechStackSection } from "@/components/home/tech-stack-section";
import { JsonLd } from "@/components/seo/json-ld";
import {
  generatePersonJsonLd,
  generateWebSiteJsonLd,
} from "@/lib/seo/schema-generators";

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
  const title = siteConfig.documentTitle[locale as Locale];
  const description = siteConfig.documentDescription[locale as Locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://annastriwidagdo.me/${locale}`,
      languages: {
        en: "https://annastriwidagdo.me/en",
        id: "https://annastriwidagdo.me/id",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://annastriwidagdo.me/${locale}`,
      siteName: "Annas Tri Widagdo Portfolio",
      locale: isId ? "id_ID" : "en_US",
      type: "website",
    },
  };
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="home-landing-page">
      <JsonLd schema={[generatePersonJsonLd(), generateWebSiteJsonLd()]} />

      {/* 01. Hero & Profile Introduction */}
      <HeroSection locale={locale as Locale} />

      {/* 02. Professional History & Engineering Experience Timeline */}
      <ExperienceSection locale={locale as Locale} />

      {/* 03. Open Source & GitHub Contribution Telemetry */}
      <GitHubSignal locale={locale as Locale} />

      {/* 04. Selected Work / 4 Featured Case Studies Preview */}
      <SelectedProjects
        projects={projectArchive}
        locale={locale as Locale}
      />

      {/* 05. Cartesian Technical Capabilities Matrix */}
      <TechStackSection locale={locale as Locale} />
    </div>
  );
}
