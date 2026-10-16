import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { locales } from '@/lib/i18n';
import { siteUrl } from '@/lib/metadata';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    'about/',
    'projects/',
    'contact/',
    ...projects.map((p) => `projects/${p.slug}/`),
  ].flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}/${path}`,
      alternates: { languages: { en: `${siteUrl}/en/${path}`, id: `${siteUrl}/id/${path}` } },
    })),
  );
}
