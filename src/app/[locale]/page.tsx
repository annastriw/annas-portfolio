import { notFound } from "next/navigation";
import { ThemeControl } from "@/components/theme/theme-control";
import { isLocale, type Locale } from "@/lib/i18n/config";

const foundationCopy: Record<
  Locale,
  { localeLabel: string; status: string }
> = {
  en: {
    localeLabel: "English locale",
    status: "Portfolio foundation in progress.",
  },
  id: {
    localeLabel: "Bahasa Indonesia",
    status: "Fondasi portofolio sedang disiapkan.",
  },
};

export default async function LocalizedHomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = foundationCopy[locale];

  return (
    <main className="foundation-page" id="main-content" tabIndex={-1}>
      <p className="foundation-label">{copy.localeLabel}</p>
      <h1>Annas Tri Widagdo</h1>
      <p className="foundation-status">{copy.status}</p>
      <ThemeControl locale={locale} />
    </main>
  );
}
