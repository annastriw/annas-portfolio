import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactPage } from "@/components/contact/contact-page";
import { isLocale, supportedLocales } from "@/lib/i18n/config";

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
    ? "Kontak | Annas Tri Widagdo"
    : "Contact | Annas Tri Widagdo";
  const description = isId
    ? "Hubungi Annas Tri Widagdo melalui email, LinkedIn, atau GitHub untuk proyek, peluang kerja, dan diskusi pengembangan software."
    : "Contact Annas Tri Widagdo by email, LinkedIn, or GitHub about projects, roles, and software development conversations.";
  const url = `https://annastriwidagdo.me/${locale}/contact`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: "https://annastriwidagdo.me/en/contact",
        id: "https://annastriwidagdo.me/id/contact",
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Annas Tri Widagdo Portfolio",
      locale: isId ? "id_ID" : "en_US",
      type: "website",
    },
  };
}

export default async function LocalizedContactPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <ContactPage locale={locale} />;
}
