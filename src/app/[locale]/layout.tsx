import { notFound } from "next/navigation";
import {
  isLocale,
  supportedLocales,
  type Locale,
} from "@/lib/i18n/config";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { InitialSplash } from "@/components/ui/initial-splash";
import { RouteTransitBar } from "@/components/ui/route-transit-bar";

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
      <InitialSplash locale={locale} />
      <RouteTransitBar locale={locale} />
      <a className="skip-link" href="#main-content">
        {skipLinkLabels[locale]}
      </a>
      <Header locale={locale} />
      <main id="main-content" className="site-main" tabIndex={-1}>
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
}
