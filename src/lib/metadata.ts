import type { Metadata } from 'next';
import type { Locale } from './i18n.ts';
export const siteUrl = 'https://annastriwidagdo.me';
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  image = '/assets/photos/hero.jpg',
): Metadata {
  const suffix = path ? `${path}/` : '';
  const url = `${siteUrl}/${locale}/${suffix}`;
  return {
    title: `${title} | Annas Tri Widagdo`,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en/${suffix}`,
        id: `${siteUrl}/id/${suffix}`,
        'x-default': `${siteUrl}/en/${suffix}`,
      },
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: 'Annas Tri Widagdo',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      images: [{ url: image }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
