import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales } from "@/lib/i18n/config";
import {
  getAllProjectMetadata,
  getProjectAssets,
} from "@/lib/projects/project-content";
import { HeroSection } from "@/components/home/hero-section";
import { SelectedProjects } from "@/components/home/selected-projects";
import { ExperienceSection } from "@/components/home/experience-section";
import { TechStackSection } from "@/components/home/tech-stack-section";
import { GitHubSignal } from "@/components/home/github-signal";
import { ContactSection } from "@/components/home/contact-section";
import { JsonLd } from "@/components/seo/json-ld";
import {
  generatePersonJsonLd,
  generateWebSiteJsonLd,
} from "@/lib/seo/schema-generators";

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const isId = locale === "id";
  const title = isId
    ? "Annas Tri Widagdo — Software Engineer & Praktisi AI"
    : "Annas Tri Widagdo — Software Engineer & AI Practitioner";
  const description = isId
    ? "Portofolio profesional Annas Tri Widagdo. Rekayasa perangkat lunak, aplikasi fullstack, model klasifikasi machine learning, dan sistem digital berbasis bukti implementasi nyata."
    : "Professional portfolio of Annas Tri Widagdo. Software engineering, fullstack web applications, machine learning classification prototypes, and evidence-driven digital products.";

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

export default async function LocalizedHomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const projects = await getAllProjectMetadata();

  // Load first thumbnail for featured projects
  const thumbnails: Record<string, string | null> = {};
  await Promise.all(
    projects.map(async (p) => {
      const assets = await getProjectAssets(p.slug);
      thumbnails[p.slug] = assets.length > 0 ? assets[0] : null;
    })
  );

  return (
    <div className="home-landing-page">
      <JsonLd schema={[generatePersonJsonLd(), generateWebSiteJsonLd()]} />

      {/* 01. Hero & Profile Introduction */}
      <HeroSection locale={locale} />

      {/* 02. Selected Work / Featured Projects Preview */}
      <SelectedProjects
        projects={projects}
        thumbnails={thumbnails}
        locale={locale}
      />

      {/* 03. Professional History & Internship Timeline */}
      <ExperienceSection locale={locale} />

      {/* 04. Technical Capabilities & Taxonomy */}
      <TechStackSection locale={locale} />

      {/* 05. Open Source & GitHub Contribution Signal */}
      <GitHubSignal locale={locale} />

      {/* 06. Contact Paths & Transmission Initiation */}
      <ContactSection locale={locale} />
    </div>
  );
}
