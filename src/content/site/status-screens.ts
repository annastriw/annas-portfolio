import { defaultLocale, supportedLocales, type Locale } from "../../lib/i18n/config.ts";

export interface NotFoundCopy {
  marker: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  redirectNotice: string;
}

export interface RuntimeErrorCopy {
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
}

export const notFoundCopy: Record<Locale, NotFoundCopy> = {
  en: {
    marker: "404",
    title: "Page Not Found",
    description: "The page you’re looking for isn’t available. You can return home or explore my projects.",
    primaryAction: "Back to Home",
    secondaryAction: "Explore Projects",
    redirectNotice: "Returning to Home automatically",
  },
  id: {
    marker: "404",
    title: "Halaman Tidak Ditemukan",
    description: "Halaman yang Anda cari tidak tersedia. Anda bisa kembali ke beranda atau menjelajahi project saya.",
    primaryAction: "Kembali ke Beranda",
    secondaryAction: "Jelajahi Proyek",
    redirectNotice: "Otomatis kembali ke beranda",
  },
};

export const runtimeErrorCopy: Record<Locale, RuntimeErrorCopy> = {
  en: {
    title: "Something Went Wrong",
    description: "This page couldn’t be displayed. Please try again or return home.",
    primaryAction: "Try Again",
    secondaryAction: "Back to Home",
  },
  id: {
    title: "Terjadi Kesalahan",
    description: "Halaman ini belum dapat ditampilkan. Silakan coba lagi atau kembali ke beranda.",
    primaryAction: "Coba Lagi",
    secondaryAction: "Kembali ke Beranda",
  },
};

/**
 * Resolves the locale from a given pathname string.
 * Strictly matches supported locale prefixes (/id, /id/..., /en, /en/...).
 * Unrelated prefixes (e.g. /identity) or unprefixed paths safely fall back to the default locale.
 */
export function getLocaleFromPathname(pathname: string | null | undefined): Locale {
  if (!pathname) return defaultLocale;

  const trimmed = pathname.trim();
  for (const locale of supportedLocales) {
    if (trimmed === `/${locale}` || trimmed.startsWith(`/${locale}/`)) {
      return locale;
    }
  }

  return defaultLocale;
}
