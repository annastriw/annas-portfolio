'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import type { Category, Project } from '@/content/projects';
import type { Locale } from '@/lib/i18n';

export function ProjectArchive({
  locale,
  items: projects,
}: {
  locale: Locale;
  items: Pick<Project, 'slug' | 'title' | 'category' | 'role' | 'tagline' | 'cover'>[];
}) {
  const [filter, setFilter] = useState<Category | 'all'>('all');
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
        <div
          className="filter-list"
          role="group"
          aria-label={locale === 'id' ? 'Filter proyek' : 'Filter projects'}
        >
          {categories.map(([value, label]) => (
            <button key={value} onClick={() => setFilter(value)} aria-pressed={filter === value}>
              {label}
              <span>
                {value === 'all'
                  ? projects.length
                  : projects.filter((p) => p.category === value).length}
              </span>
            </button>
          ))}
        </div>
        <p className="eyebrow" role="status">
          {visible.length} {locale === 'id' ? 'proyek' : 'projects'}
        </p>
      </div>
      <div className="project-grid">
        {visible.map((p) => (
          <article className="project-card" key={p.slug}>
            <Link href={`/${locale}/projects/${p.slug}/`} className="project-image">
              <Image
                src={p.cover}
                alt={`${p.title} — ${locale === 'id' ? 'pratinjau aplikasi' : 'application preview'}`}
                width={1105}
                height={737}
                sizes="(max-width: 700px) 92vw, 46vw"
              />
              <span className="image-arrow">
                <ArrowUpRightIcon size={24} />
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
              <Link href={`/${locale}/projects/${p.slug}/`}>{p.title}</Link>
            </h2>
            <p>{p.tagline[locale]}</p>
          </article>
        ))}
      </div>
    </>
  );
}
