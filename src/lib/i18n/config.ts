export const supportedLocales = ["en", "id"] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return supportedLocales.some((locale) => locale === value);
}
