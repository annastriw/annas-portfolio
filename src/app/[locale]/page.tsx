import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, ArrowUpRightIcon, MapPinIcon } from '@phosphor-icons/react/dist/ssr';
import { identity, experience, capabilities } from '@/content/site';
import { featuredProjects } from '@/content/projects';
import { GitHubActivity } from '@/components/github-activity';
import { pageMetadata, siteUrl } from '@/lib/metadata';
import { isLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return pageMetadata(locale, '', 'Software Engineer', identity.headline[locale]);
}
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const id = locale === 'id';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${siteUrl}/${locale}/`,
    mainEntity: {
      '@type': 'Person',
      name: identity.name,
      jobTitle: identity.role,
      url: siteUrl,
      sameAs: [identity.github, identity.linkedin],
      image: `${siteUrl}/assets/photos/about.webp`,
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <section className="hero" aria-labelledby="hero-name">
        <picture className="hero-photo">
          <source media="(max-width: 700px)" srcSet="/assets/photos/hero-mobile.webp" />
          <img
            src="/assets/photos/hero.webp"
            alt=""
            width="1600"
            height="2400"
            fetchPriority="high"
          />
        </picture>
        <div className="hero-scrim" />
        <div className="hero-content">
          <p className="hero-greeting">
            {id ? 'Halo, saya' : 'Hello, I’m'}
            <br />
            <span>Software Engineer</span>
          </p>
          <p className="hero-statement">{identity.headline[locale]}</p>
          <p className="hero-description">{identity.supporting[locale]}</p>
          <div className="hero-actions">
            <Link className="button button-dark" href={`/${locale}/projects/`}>
              {id ? 'Jelajahi Karya' : 'Explore My Work'}
              <ArrowRightIcon size={21} />
            </Link>
            <Link className="hero-contact" href={`/${locale}/contact/`}>
              {id ? 'Mulai Percakapan' : 'Start a Conversation'}
            </Link>
          </div>
          <p className="hero-location">
            <MapPinIcon size={16} />
            {identity.location}
            <span>·</span>
            {id ? 'Terbuka untuk kolaborasi' : 'Open to collaboration'}
          </p>
        </div>
        <h1 id="hero-name" className="hero-name">
          Annas Tri Widagdo
        </h1>
      </section>
      <section className="section container selected-work" aria-labelledby="work-heading">
        <div className="section-label">
          <h2 className="eyebrow" id="work-heading">
            01 / {id ? 'Karya Pilihan' : 'Selected Work'}
          </h2>
          <span className="eyebrow">2025 — 2026</span>
        </div>
        {featuredProjects.map((p, i) => (
          <article key={p.slug} className="featured-project">
            <div className="featured-copy">
              <p className="eyebrow">
                0{i + 1} / {p.role}
              </p>
              <h3>
                <Link href={`/${locale}/projects/${p.slug}/`}>{p.title}</Link>
              </h3>
              <p className="featured-tagline">{p.tagline[locale]}</p>
              <p>{p.intro[locale]}</p>
              <Link className="text-link" href={`/${locale}/projects/${p.slug}/`}>
                {id ? 'Jelajahi Proyek' : 'Explore Project'}
                <ArrowRightIcon size={21} />
              </Link>
            </div>
            <Link
              className="featured-image"
              href={`/${locale}/projects/${p.slug}/`}
              aria-label={`${id ? 'Jelajahi' : 'Explore'} ${p.title}`}
            >
              <Image
                src={p.cover}
                width={1105}
                height={737}
                sizes="(max-width: 700px) 92vw, 58vw"
                alt={`${p.title} — ${id ? 'pratinjau aplikasi' : 'application preview'}`}
              />
              <span className="image-arrow">
                <ArrowUpRightIcon size={26} />
              </span>
            </Link>
          </article>
        ))}
        <div className="section-end">
          <span>
            {id
              ? 'Sepuluh proyek. Beragam persoalan.'
              : 'Ten projects. Different problems to solve.'}
          </span>
          <Link className="text-link" href={`/${locale}/projects/`}>
            {id ? 'Lihat Semua Proyek' : 'View All Projects'}
            <ArrowRightIcon size={22} />
          </Link>
        </div>
      </section>
      <section className="section container" aria-labelledby="experience-heading">
        <div className="section-label">
          <span className="eyebrow">02 / {id ? 'Pengalaman' : 'Experience'}</span>
          <Link href={`/${locale}/about/`} className="small-link">
            {id ? 'Tentang Saya' : 'More About Me'} <ArrowUpRightIcon size={14} />
          </Link>
        </div>
        <div className="section-intro">
          <h2 id="experience-heading">
            {id ? 'Dari kebutuhan, menjadi solusi.' : 'From understanding to building.'}
          </h2>
          <p>
            {id
              ? 'Pengalaman merancang, mengembangkan, dan menghadirkan software yang dapat digunakan.'
              : 'Experience designing, developing, and delivering usable software.'}
          </p>
        </div>
        <div className="experience-list">
          {experience.map((e, i) => (
            <article className="experience-row" key={e.role}>
              <div>
                <span className="eyebrow">0{i + 1}</span>
                <p className="small-text">{e.period[locale]}</p>
                <p className="small-text muted">{e.location[locale]}</p>
              </div>
              <div>
                <h3>{e.role}</h3>
                <p className="organization">{e.organization[locale]}</p>
              </div>
              <div>
                <p>{e.description[locale]}</p>
                {e.extra && <p>{e.extra[locale]}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section container capabilities" aria-labelledby="capabilities-heading">
        <div className="section-label">
          <span className="eyebrow">03 / {id ? 'Keahlian' : 'Capabilities'}</span>
        </div>
        <div className="section-intro">
          <h2 id="capabilities-heading">
            {id ? 'Bagian-bagian yang saya hubungkan.' : 'The pieces I bring together.'}
          </h2>
          <p>
            {id
              ? 'Dari antarmuka hingga sistem di baliknya.'
              : 'From the interface to the systems behind it.'}
          </p>
        </div>
        {capabilities.map((c, i) => (
          <details className="capability" key={c.title} open={i === 0}>
            <summary>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{c.title}</h3>
              <span className="expand-symbol" aria-hidden="true" />
            </summary>
            <div className="capability-content">
              <p>{c.description[locale]}</p>
              <p className="tool-list">{c.tools}</p>
            </div>
          </details>
        ))}
        <div
          className="brand-strip"
          aria-label={
            id ? 'Beberapa teknologi yang digunakan' : 'A selection of technologies I use'
          }
        >
          {[
            ['nextjs', 'Next.js'],
            ['react-mono', 'React'],
            ['typescript-mono', 'TypeScript'],
            ['python-mono', 'Python'],
            ['github-mono', 'GitHub'],
            ['vercel-mono', 'Vercel'],
          ].map(([file, name]) => (
            <span key={file}>
              <Image src={`/assets/icons/${file}.svg`} width={23} height={23} alt="" />
              {name}
            </span>
          ))}
        </div>
      </section>
      <GitHubActivity locale={locale} />
    </>
  );
}
