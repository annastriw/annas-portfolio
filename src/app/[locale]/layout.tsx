import { notFound } from "next/navigation";
import {
  isLocale,
  supportedLocales,
  type Locale,
} from "@/lib/i18n/config";

const skipLinkLabels: Record<Locale, string> = {
  en: "Skip to content",
  id: "Lewati ke konten",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="site-shell" lang={locale}>
      <a className="skip-link" href="#main-content">
        {skipLinkLabels[locale]}
      </a>
      {children}
    </div>
  );
}
