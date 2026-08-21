import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";

const foundationCopy: Record<
  Locale,
  { localeLabel: string; status: string; subStatus: string }
> = {
  en: {
    localeLabel: "SIGNAL / ARCHIVE // 2026",
    status: "Annas Tri Widagdo",
    subStatus:
      "Software Engineer & AI Practitioner building robust web systems, intelligent products, and technical editorial solutions.",
  },
  id: {
    localeLabel: "SIGNAL / ARCHIVE // 2026",
    status: "Annas Tri Widagdo",
    subStatus:
      "Software Engineer & Praktisi AI yang membangun sistem web yang tangguh, produk cerdas, dan solusi technical editorial.",
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
    <div className="foundation-page">
      <div className="foundation-header-meta">
        <span className="foundation-meta-tag">[LOC: {locale.toUpperCase()}]</span>
        <span className="foundation-meta-tag">{copy.localeLabel}</span>
      </div>
      <h1 className="foundation-name">{copy.status}</h1>
      <p className="foundation-status">{copy.subStatus}</p>
    </div>
  );
}
