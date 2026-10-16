import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr';
export default function NotFound() {
  return (
    <section className="container page-space">
      <p className="eyebrow">404</p>
      <h1 className="error-heading">A little off the path.</h1>
      <p>Halaman tidak ditemukan. / This page could not be found.</p>
      <Link className="text-link" href="/en/">
        Back to home <ArrowRightIcon size={20} />
      </Link>
    </section>
  );
}
