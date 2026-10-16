import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRightIcon, CaretRightIcon } from '@phosphor-icons/react/dist/ssr';
import { projects } from '@/content/projects';
import { Gallery, type GalleryCaption } from '@/components/gallery';
import galleryCaptions from '@/content/gallery.json';
import { isLocale, type Locale } from '@/lib/i18n';
import { pageMetadata, siteUrl } from '@/lib/metadata';
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) return {};
  return pageMetadata(locale, `projects/${slug}`, p.title, p.intro[locale], p.cover);
}
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const id = locale === 'id';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: id ? 'Proyek' : 'Projects',
        item: `${siteUrl}/${locale}/projects/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: p.title,
        item: `${siteUrl}/${locale}/projects/${slug}/`,
      },
    ],
  };
  return (
    <article className="container detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href={`/${locale}/projects/`}>{id ? 'Proyek' : 'Projects'}</Link>
        <CaretRightIcon size={13} />
        <span aria-current="page">{p.title}</span>
      </nav>
      <div className="detail-heading">
        <p className="eyebrow">{p.context[locale]}</p>
        <h1>{p.title}</h1>
        <p className="detail-tagline">{p.tagline[locale]}</p>
        <p className="detail-intro">{p.intro[locale]}</p>
      </div>
      <div className="project-facts">
        <div>
          <span className="eyebrow">{id ? 'Peran' : 'Role'}</span>
          <p>{p.role}</p>
        </div>
        <div>
          <span className="eyebrow">{id ? 'Periode' : 'Period'}</span>
          <p>{p.period[locale]}</p>
        </div>
        <div>
          <span className="eyebrow">Status</span>
          <p>
            <span className="status-dot" />
            {id
              ? ({
                  'Live Production': 'Digunakan',
                  'Completed Prototype': 'Prototipe selesai',
                  'Completed Application': 'Aplikasi selesai',
                }[p.status] ?? p.status)
              : p.status}
          </p>
        </div>
        <div className="project-links">
          {p.links.map((link) => (
            <a
              className="text-link"
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              {link.label[locale]}
              <ArrowUpRightIcon size={18} />
            </a>
          ))}
        </div>
      </div>
      <div className="detail-cover">
        <Image
          src={p.cover}
          width={1600}
          height={1067}
          sizes="(max-width: 700px) 92vw, 88vw"
          alt={`${p.title} — ${id ? 'pratinjau aplikasi' : 'application preview'}`}
          preload
        />
      </div>
      <section className="detail-story">
        <div>
          <h2>{id ? 'Yang saya kerjakan' : 'My contribution'}</h2>
          <p>{p.contribution[locale]}</p>
        </div>
        <div>
          <h2>{id ? 'Yang dihadirkan' : 'What it brings together'}</h2>
          <p>{p.scope[locale]}</p>
        </div>
        <div className="detail-stack">
          <h2>{id ? 'Teknologi' : 'Built with'}</h2>
          <ul className="tag-list">
            {p.technologies.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {p.note && <p className="project-note">{p.note[locale]}</p>}
        </div>
      </section>
      <section className="detail-gallery">
        <div className="section-label">
          <h2 className="eyebrow">{id ? 'Lihat Lebih Dekat' : 'A Closer Look'}</h2>
          <span className="eyebrow">
            {p.gallery.length} {id ? 'tampilan' : 'views'}
          </span>
        </div>
        <Gallery
          images={p.gallery}
          title={p.title}
          locale={locale}
          captions={Object.fromEntries(
            p.gallery.map((src) => [src, (galleryCaptions as Record<string, GalleryCaption>)[src]]),
          )}
        />
      </section>
    </article>
  );
}
