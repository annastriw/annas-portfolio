import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr';
export const metadata: Metadata = {
  title: 'Annas Tri Widagdo — Software Engineer',
  alternates: { canonical: 'https://annastriwidagdo.me/en/' },
  robots: { index: false, follow: true },
};
export default function Entry() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/en/" />
      <main className="entry-page">
        <p className="eyebrow">Software Engineer</p>
        <h1>Annas Tri Widagdo</h1>
        <Link className="text-link" href="/en/">
          Explore my work <ArrowRightIcon size={20} />
        </Link>
        <Link className="text-link" href="/id/" lang="id">
          Lihat karya saya <ArrowRightIcon size={20} />
        </Link>
      </main>
    </>
  );
}
