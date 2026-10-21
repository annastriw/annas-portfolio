import Link from 'next/link';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import { identity } from '@/content/site';
import type { Locale } from '@/lib/i18n';

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="footer-invite container" data-scene="footer">
        <p className="eyebrow">
          {locale === 'id' ? 'Percakapan berikutnya' : 'The next conversation'}
        </p>
        <Link href={`/${locale}/contact/`} className="footer-heading">
          {locale === 'id' ? 'Apa yang ingin Anda bangun?' : 'What would you like to build?'}
          <ArrowUpRightIcon data-motion-icon="diagonal" weight="light" aria-hidden="true" />
        </Link>
        <Link className="text-link" href={`/${locale}/contact/`}>
          {locale === 'id' ? 'Mari Bicara' : 'Let’s Talk'}
          <ArrowUpRightIcon data-motion-icon="diagonal" size={20} />
        </Link>
      </div>
      <div className="footer-meta container">
        <Link className="wordmark" href={`/${locale}/`}>
          annastriwidagdo.me
        </Link>
        <span>© {new Date().getFullYear()} Annas Tri Widagdo</span>
        <div>
          <a href={identity.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRightIcon data-motion-icon="diagonal" size={14} />
          </a>
          <a href={identity.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRightIcon data-motion-icon="diagonal" size={14} />
          </a>
        </div>
        <span>Jakarta, Indonesia</span>
      </div>
    </footer>
  );
}
