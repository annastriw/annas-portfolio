import type { Metadata } from 'next';
import { MissingPage } from '@/components/missing-page';
import './globals.css';
import './motion.css';
export const metadata: Metadata = {
  title: '404 — Annas Tri Widagdo',
  robots: { index: false, follow: true },
};
export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="system">
      <body>
        <MissingPage />
      </body>
    </html>
  );
}
