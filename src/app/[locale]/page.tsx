import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/content/site/site-config";
import { HeroSection } from "@/components/home/hero-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { GitHubSignal } from "@/components/home/github-signal";
import { SelectedProjects } from "@/components/home/selected-projects";
import { TechStackSection } from "@/components/home/tech-stack-section";
import { getGitHubTelemetry } from "@/lib/github/github-data";
import { JsonLd } from "@/components/seo/json-ld";
import {
  generatePersonJsonLd,
  generateWebSiteJsonLd,
  createPageMetadata,
} from "@/lib/seo";

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

  return createPageMetadata({
    locale,
    path: "",
    title: siteConfig.documentTitle[locale],
    description: siteConfig.documentDescription[locale],
    type: "website",
  });
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const telemetry = await getGitHubTelemetry();

  return (
    <div className="home-landing-page">
      <JsonLd schema={[generatePersonJsonLd(), generateWebSiteJsonLd()]} />

      {/* 01. Professional Summary */}
      <HeroSection locale={locale as Locale} />

      {/* 02. Experience */}
      <ExperienceSection locale={locale as Locale} />

      {/* 03. GitHub Activity */}
      <GitHubSignal locale={locale as Locale} telemetry={telemetry} />

      {/* 04. Selected Projects */}
      <SelectedProjects locale={locale as Locale} />

      {/* 05. Technical Capabilities */}
      <TechStackSection locale={locale as Locale} />
    </div>
  );
}
