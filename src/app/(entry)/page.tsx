import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Annas Tri Widagdo — Software Engineer',
  alternates: { canonical: 'https://annastriwidagdo.me/en/' },
  robots: { index: false, follow: true },
};
export default function Entry() {
  return (
    <main className="entry-opening">
      <h1 className="opening-signature">Hola.</h1>
      <noscript>
        <p className="entry-fallback">
          <Link className="text-link" href="/en/" lang="en" prefetch={false}>
            Continue in English
          </Link>
          <Link className="text-link" href="/id/" lang="id" prefetch={false}>
            Lanjut dalam bahasa Indonesia
          </Link>
        </p>
      </noscript>
    </main>
  );
}
