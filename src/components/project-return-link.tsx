'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import { queueReturn, settleArchiveEntry } from '@/lib/archive-navigation';
import type { ArchiveVisit } from '@/lib/navigation';
import type { Locale } from '@/lib/i18n';
import { ArrowLeftIcon } from '@phosphor-icons/react';

export function ProjectReturnLink({ locale, slug }: { locale: Locale; slug: string }) {
  const visit = useRef<ArchiveVisit | null>(null);
  useLayoutEffect(() => {
    visit.current = settleArchiveEntry(`/${locale}/projects/${slug}/`);
  }, [locale, slug]);
  return (
    <Link
      href={`/${locale}/projects/`}
      scroll={false}
      aria-label={locale === 'id' ? 'Kembali ke daftar proyek' : 'Back to projects'}
      onNavigate={() => {
        if (visit.current) queueReturn(`/${locale}/projects/`, visit.current);
        else {
          try {
            sessionStorage.setItem('portfolio-scroll-top', 'true');
          } catch {
            /* Native fallback. */
          }
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }}
    >
      <ArrowLeftIcon data-motion-icon="left" size={18} aria-hidden="true" />
      {locale === 'id' ? 'Proyek' : 'Projects'}
    </Link>
  );
}
