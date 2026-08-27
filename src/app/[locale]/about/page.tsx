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
    ? "Tentang & Profil Rekayasa - Annas Tri Widagdo"
    : "About & Engineering Profile - Annas Tri Widagdo";
  const description = isId
    ? "Profil rekayasa perangkat lunak, latar belakang teknik komputer Universitas Diponegoro (IPK 3.79), dan sertifikasi Cisco, Huawei & Oracle karya Annas Tri Widagdo."
    : "Software engineering profile, Diponegoro University computer engineering foundation (GPA 3.79), and Cisco, Huawei & Oracle credentials of Annas Tri Widagdo.";

  return createPageMetadata({
    locale,
    path: "about",
    title,
    description,
    type: "profile",
    images: [
      {
        url: "/assets/me/pas-foto.webp",
        width: 800,
        height: 1067,
        alt: isId
          ? "Pas foto profil Annas Tri Widagdo"
          : "Portrait photo of Annas Tri Widagdo",
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

      {/* 01. [02 // ABOUT] Personal Profile & Narrative */}
      <AboutProfile locale={locale as Locale} />

      {/* 02. [01 // EDUCATION] Academic Foundation & Bachelor Certificate Evidence */}
      <AboutEducation locale={locale as Locale} />

      {/* 03. [02 // CREDENTIALS] Technical Certifications Archive (8 Verified Credentials) */}
      <AboutCertificates locale={locale as Locale} />
    </div>
  );
}
