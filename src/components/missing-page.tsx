'use client';
import { ArrowLeftIcon } from '@phosphor-icons/react';

const messages = {
  id: {
    label: 'Halaman tidak ditemukan',
    title: 'Sepertinya salah arah.',
    description: 'Halaman ini tidak tersedia. Karya saya masih bisa Anda jelajahi dari beranda.',
    home: 'Kembali ke Beranda',
    projects: 'Jelajahi Proyek',
  },
  en: {
    label: 'Page not found',
    title: 'A little off the path.',
    description: 'This page isn’t here. There’s still plenty to explore back at home.',
    home: 'Back to Home',
    projects: 'Explore Projects',
  },
};

export function MissingPage({ embedded = false }: { embedded?: boolean }) {
  const Container = embedded ? 'section' : 'main';
  function returnHome() {
    try {
      sessionStorage.setItem('portfolio-replay-opening', 'true');
      sessionStorage.setItem('portfolio-scroll-top', 'true');
    } catch {
      /* Native home navigation also works without storage. */
    }
  }
  return (
    <Container className="container missing-page">
      {(['id', 'en'] as const).map((locale) => {
        const copy = messages[locale];
        return (
          <div className="missing-content" data-error-locale={locale} lang={locale} key={locale}>
            {!embedded && (
              <a className="wordmark" href={`/${locale}/?intro=1`} onClick={returnHome}>
                annastriwidagdo.me
              </a>
            )}
            <p className="eyebrow">404 / {copy.label}</p>
            <h1>{copy.title}</h1>
            <p>{copy.description}</p>
            <div className="missing-actions">
              <a className="text-link" href={`/${locale}/?intro=1`} onClick={returnHome}>
                <ArrowLeftIcon size={20} />
                {copy.home}
              </a>
              <a className="text-link" href={`/${locale}/projects/`}>
                {copy.projects}
              </a>
            </div>
          </div>
        );
      })}
    </Container>
  );
}
