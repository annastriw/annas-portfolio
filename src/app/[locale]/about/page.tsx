import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import { AboutProfile } from "@/components/about/about-profile";
import { AboutEducation } from "@/components/about/about-education";
import { AboutCertificates } from "@/components/about/about-certificates";
import { JsonLd } from "@/components/seo/json-ld";
import { generateProfilePageJsonLd, createPageMetadata } from "@/lib/seo";

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
    ? "Tentang Annas Tri Widagdo | Software Engineer"
    : "About Annas Tri Widagdo | Software Engineer";
  const description = isId
    ? "Kenali Annas Tri Widagdo, lulusan Teknik Komputer dengan pengalaman dalam software engineering, full-stack web development, dan machine learning."
    : "Learn about Annas Tri Widagdo, a Computer Engineering graduate with experience in software engineering, full-stack web development, and machine learning.";

  return createPageMetadata({
    locale,
    path: "about",
    title,
    description,
    type: "profile",
    images: [
      {
        url: "/assets/profile/pas-foto.webp",
        width: 800,
        height: 1067,
        alt: isId
          ? "Foto profil Annas Tri Widagdo"
          : "Portrait of Annas Tri Widagdo",
      },
    ],
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="about-page">
      <JsonLd schema={generateProfilePageJsonLd(locale as Locale)} />

      {/* 01. [01 // ABOUT] Personal Profile & Narrative */}
      <AboutProfile locale={locale as Locale} />

      {/* 02. [02 // EDUCATION] Academic Foundation & Bachelor Certificate Evidence */}
      <AboutEducation locale={locale as Locale} />

      {/* 03. [03 // CREDENTIALS] Technical Certifications Archive (8 Verified Credentials) */}
      <AboutCertificates locale={locale as Locale} />
    </div>
  );
}
