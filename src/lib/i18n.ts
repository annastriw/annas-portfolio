export const locales = ['en', 'id'] as const;
export type Locale = (typeof locales)[number];
export type Bilingual = Record<Locale, string>;
export const text = (en: string, id: string): Bilingual => ({ en, id });
export const isLocale = (value: string): value is Locale => value === 'en' || value === 'id';
export function localizePath(path: string, locale: Locale): string {
  const clean = path
    .split(/[?#]/)[0]
    .replace(/^\/(en|id)(?=\/|$)/, '')
    .replace(/\/$/, '');
  return `/${locale}${clean === '/' ? '' : clean}/`;
}
