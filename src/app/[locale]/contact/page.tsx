import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactPage } from "@/components/contact/contact-page";
import { isLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import { JsonLd } from "@/components/seo/json-ld";
import { generateContactPageJsonLd, createPageMetadata } from "@/lib/seo";

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

  return createPageMetadata({
    locale,
    path: "contact",
    title,
    description,
    type: "website",
    images: [
      {
        url: "/assets/profile/pas-foto.webp",
        width: 800,
        height: 1067,
        alt: isId
          ? "Kontak Annas Tri Widagdo"
          : "Contact Annas Tri Widagdo",
      },
    ],
  });
}

export default async function LocalizedContactPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <>
      <JsonLd schema={generateContactPageJsonLd(locale as Locale)} />
      <ContactPage locale={locale} />
    </>
  );
}
