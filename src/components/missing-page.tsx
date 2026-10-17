'use client';
import { useLayoutEffect, useSyncExternalStore } from 'react';
import { ArrowLeftIcon } from '@phosphor-icons/react';
const subscribe = () => () => {};
export function MissingPage() {
  const id = useSyncExternalStore(
    subscribe,
    () => location.pathname.startsWith('/id/'),
    () => false,
  );
  useLayoutEffect(() => {
    document.documentElement.lang = id ? 'id' : 'en';
    try {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'light' || saved === 'dark' || saved === 'system')
        document.documentElement.dataset.theme = saved;
    } catch {
      /* Fall back to the device theme. */
    }
  }, [id]);
  const home = id ? '/id/' : '/en/';
  function returnHome() {
    try {
      sessionStorage.setItem('portfolio-replay-opening', 'true');
      sessionStorage.setItem('portfolio-scroll-top', 'true');
    } catch {
      /* An unavailable storage also makes home treat this as a fresh visit. */
    }
  }
  return (
    <main className="container missing-page">
      <a className="wordmark" href={home} onClick={returnHome}>
        annastriwidagdo.me<span className="brand-dot">.</span>
      </a>
      <p className="eyebrow">404 / {id ? 'Halaman tidak ditemukan' : 'Page not found'}</p>
      <h1>{id ? 'Sepertinya salah arah.' : 'A little off the path.'}</h1>
      <p>
        {id
          ? 'Halaman ini tidak tersedia. Karya saya masih bisa Anda jelajahi dari beranda.'
          : 'This page isn’t here. There’s still plenty to explore back at home.'}
      </p>
      <div className="missing-actions">
        <a className="text-link" href={home} onClick={returnHome}>
          <ArrowLeftIcon size={20} />
          {id ? 'Kembali ke Beranda' : 'Back to Home'}
        </a>
        <a className="text-link" href={id ? '/id/projects/' : '/en/projects/'}>
          {id ? 'Jelajahi Proyek' : 'Explore Projects'}
        </a>
      </div>
    </main>
  );
}
