'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ProjectFilters } from './project-filters';
import { useArchiveMotion } from './use-archive-motion';
import { archiveSnapshot, captureArchive, settleArchiveEntry } from '@/lib/archive-navigation';
import type { ArchiveVisit } from '@/lib/navigation';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import type { Category, Project } from '@/content/projects';
import type { Locale } from '@/lib/i18n';

const subscribe = (notify: () => void) => {
  window.addEventListener('popstate', notify);
  window.addEventListener('portfolio-archive-reset', notify);
  return () => {
    window.removeEventListener('popstate', notify);
    window.removeEventListener('portfolio-archive-reset', notify);
  };
};
const serverSnapshot = () => '';

export function ProjectArchive({
  locale,
  items: projects,
}: {
  locale: Locale;
  items: Pick<Project, 'slug' | 'title' | 'category' | 'role' | 'tagline' | 'cover'>[];
}) {
  const path = `/${locale}/projects/`;
  const snapshot = useSyncExternalStore(subscribe, () => archiveSnapshot(path), serverSnapshot);
  const restored: ArchiveVisit | null = snapshot ? JSON.parse(snapshot) : null;
  const [selected, setFilter] = useState<Category | 'all' | null>(null);
  useEffect(() => {
    const reset = () => setFilter(null);
    window.addEventListener('portfolio-archive-reset', reset);
    return () => window.removeEventListener('portfolio-archive-reset', reset);
  }, []);
  const valid =
    restored &&
    projects.some(
      (p) =>
        p.slug === restored.slug && (restored.filter === 'all' || p.category === restored.filter),
    );
  const filter: Category | 'all' = selected ?? (valid ? restored.filter : 'all');
  const grid = useRef<HTMLDivElement>(null);
  const prepareMotion = useArchiveMotion(grid, filter);
  useLayoutEffect(() => {
    const visit = settleArchiveEntry(path);
    if (!visit) return;
    const card = document.getElementById(`project-${visit.slug}`);
    if (!card) return;
    // Use the card's new layout position rather than an old absolute scroll value.
    const offset = Math.min(Math.max(visit.offset, 100), window.innerHeight * 0.45);
    window.scrollTo({
      top: window.scrollY + card.getBoundingClientRect().top - offset,
      behavior: 'instant',
    });
  }, [path, snapshot]);
  useEffect(() => {
    document.dispatchEvent(new Event('portfolio-scenes-changed'));
  }, [filter]);
  function remember(slug: string) {
    const card = document.getElementById(`project-${slug}`);
    if (card)
      captureArchive(path, `${path}${slug}/`, {
        filter,
        slug,
        offset: card.getBoundingClientRect().top,
      });
  }
  const categories = [
    ['all', locale === 'id' ? 'Semua' : 'All'],
    ['web', 'Web'],
    ['ml', 'AI/ML'],
    ['mobile', 'Mobile'],
    ['interactive', locale === 'id' ? 'Interaktif' : 'Interactive'],
  ] as const;
  const visible = projects.filter((p) => filter === 'all' || p.category === filter);
  return (
    <>
      <div className="archive-toolbar">
        <ProjectFilters
          locale={locale}
          selected={filter}
          categories={categories.map(([value, label]) => ({
            value,
            label,
            count:
              value === 'all'
                ? projects.length
                : projects.filter((p) => p.category === value).length,
          }))}
          onSelect={(value) => {
            if (value === filter) return;
            prepareMotion();
            setFilter(value);
          }}
        />
        <p className="eyebrow" role="status">
          {visible.length} {locale === 'id' ? 'proyek' : 'projects'}
        </p>
      </div>
      <div className="project-grid" ref={grid}>
        {projects.map((p) => (
          <article
            className="project-card"
            data-scene="card"
            key={p.slug}
            id={`project-${p.slug}`}
            hidden={filter !== 'all' && p.category !== filter}
          >
            <Link
              href={`/${locale}/projects/${p.slug}/`}
              onNavigate={() => remember(p.slug)}
              className="project-image"
              aria-label={`${locale === 'id' ? 'Jelajahi' : 'Explore'} ${p.title}`}
            >
              <Image
                src={p.cover}
                alt={`${p.title} — ${locale === 'id' ? 'pratinjau aplikasi' : 'application preview'}`}
                width={1105}
                height={737}
                sizes="(max-width: 700px) 92vw, 46vw"
              />
              <span className="image-arrow" aria-hidden="true">
                <ArrowUpRightIcon data-motion-icon="diagonal" size={24} />
              </span>
            </Link>
            <div className="project-card-meta">
              <span className="eyebrow">{p.role}</span>
              <span className="eyebrow">
                {p.category === 'ml'
                  ? 'AI/ML'
                  : p.category === 'interactive'
                    ? 'Interactive'
                    : p.category}
              </span>
            </div>
            <h2>
              <Link href={`/${locale}/projects/${p.slug}/`} onNavigate={() => remember(p.slug)}>
                {p.title}
              </Link>
            </h2>
            <p>{p.tagline[locale]}</p>
          </article>
        ))}
      </div>
    </>
  );
}
