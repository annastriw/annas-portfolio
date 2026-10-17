import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { PageMotion } from '@/components/page-motion';
import { openingBootstrap } from '@/lib/opening';
import { isLocale, locales } from '@/lib/i18n';
import { siteUrl } from '@/lib/metadata';
import '../globals.css';

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Annas Tri Widagdo — Software Engineer',
  icons: { icon: '/favicon.svg' },
};
const themeScript = `try{var t=localStorage.getItem('portfolio-theme');if(['light','dark','system'].includes(t))document.documentElement.dataset.theme=t}catch(e){}`;
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} data-theme="system" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: openingBootstrap }} />
        <link
          rel="preload"
          href="/assets/fonts/geist-regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/instrument-serif.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {locale === 'id' ? 'Langsung ke konten' : 'Skip to content'}
        </a>
        <PageMotion />
        <SiteHeader locale={locale} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
