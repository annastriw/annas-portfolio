import type { Metadata } from 'next';
import { PageMotion } from '@/components/page-motion';
import { MissingPage } from '@/components/missing-page';
import './globals.css';
import './motion.css';
import './editorial.css';
export const metadata: Metadata = {
  title: '404 — Annas Tri Widagdo',
  robots: { index: false, follow: true },
};
export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="system" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.lang=location.pathname.startsWith('/id/')?'id':'en';try{const t=localStorage.getItem('portfolio-theme');if(['light','dark','system'].includes(t))document.documentElement.dataset.theme=t}catch{}`,
          }}
        />
      </head>
      <body>
        <PageMotion />
        <MissingPage />
      </body>
    </html>
  );
}
