import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, ArrowUpRightIcon, MapPinIcon } from '@phosphor-icons/react/dist/ssr';
import { identity, experience, capabilities } from '@/content/site';
import { featuredProjects } from '@/content/projects';
import { GitHubActivity } from '@/components/github-activity';
import { TechBadge } from '@/components/tech-badge';
import { TechReel } from '@/components/tech-reel';
import { CapabilityExplorer } from '@/components/capability-explorer';
import { capabilityTechnologies } from '@/content/technologies';
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
      image: `${siteUrl}/assets/photos/about.jpg`,
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <section className="hero" data-scene="hero" aria-labelledby="hero-name">
        <picture className="hero-photo">
          <source
            media="(max-width: 700px)"
            sizes="100vw"
            srcSet="/assets/photos/hero-mobile-640.jpg 640w, /assets/photos/hero-mobile-960.jpg 960w, /assets/photos/hero-mobile-1280.jpg 1280w, /assets/photos/hero-mobile-1600.jpg 1600w, /assets/photos/hero-mobile.jpg 2336w"
          />
          <img
            src="/assets/photos/hero.jpg"
            srcSet="/assets/photos/hero-1280.jpg 1280w, /assets/photos/hero-1920.jpg 1920w, /assets/photos/hero.jpg 3504w"
            sizes="100vw"
            alt=""
            width="3504"
            height="2336"
            fetchPriority="high"
          />
        </picture>
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-name-stage">
          <h1 id="hero-name" className="hero-name">
            <span className="hero-name-part">Annas Tri</span>{' '}
            <span className="hero-name-part">Widagdo</span>
          </h1>
        </div>
        <div className="hero-content">
          <p className="hero-greeting">Software Engineer</p>
          <p className="hero-statement">{identity.headline[locale]}</p>
          <p className="hero-description">{identity.supporting[locale]}</p>
          <div className="hero-actions">
            <Link className="button hero-primary" href={`/${locale}/projects/`}>
              {id ? 'Jelajahi Karya' : 'Explore My Work'}
              <ArrowUpRightIcon size={21} />
            </Link>
            <Link className="hero-contact" href={`/${locale}/contact/`}>
              {id ? 'Mulai Percakapan' : 'Start a Conversation'}
              <ArrowUpRightIcon size={16} />
            </Link>
          </div>
          <p className="hero-location">
            <MapPinIcon size={16} />
            {identity.location}
            <span>·</span>
            {id ? 'Terbuka untuk kolaborasi' : 'Open to collaboration'}
          </p>
        </div>
      </section>
      <section className="section selected-work" aria-labelledby="work-heading">
        <div className="container">
          <div className="section-label">
            <h2 id="work-heading" className="eyebrow">
              01 / {id ? 'Karya Pilihan' : 'Selected Work'}
            </h2>
            <span className="eyebrow">2025 — 2026</span>
          </div>
          {featuredProjects.map((p, i) => (
            <article
              key={p.slug}
              className="featured-project"
              data-scene="work"
              aria-labelledby={`featured-${p.slug}`}
            >
              <div className="featured-copy">
                <p className="eyebrow">
                  <span className="featured-index">0{i + 1}</span>
                  <span>{p.role}</span>
                </p>
                <h3 id={`featured-${p.slug}`} className="scene-heading">
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
                  sizes="(max-width: 700px) 90vw, (max-width: 1000px) 54vw, 760px"
                  alt={`${p.title} — ${id ? 'pratinjau proyek dalam mockup laptop' : 'project preview in a laptop mockup'}`}
                />
                <span className="image-arrow" aria-hidden="true">
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
        </div>
      </section>
      <section
        className="section container experience-section"
        aria-labelledby="experience-heading"
      >
        <div className="section-label">
          <span className="eyebrow">02 / {id ? 'Pengalaman' : 'Experience'}</span>
          <Link href={`/${locale}/about/`} className="small-link">
            {id ? 'Tentang Saya' : 'More About Me'} <ArrowUpRightIcon size={14} />
          </Link>
        </div>
        <div className="section-intro" data-scene="heading">
          <h2 id="experience-heading" className="scene-heading">
            {id ? 'Dari kebutuhan, menjadi solusi.' : 'From understanding to building.'}
          </h2>
          <p>
            {id
              ? 'Pengalaman merancang, mengembangkan, dan menghadirkan software yang dapat digunakan.'
              : 'Experience designing, developing, and delivering usable software.'}
          </p>
        </div>
        <ol className="experience-timeline">
          {experience.map((e, i) => (
            <li className="timeline-item" data-scene="experience" key={e.role}>
              <div className="timeline-marker" aria-hidden="true">
                <span className="timeline-number">0{i + 1}</span>
              </div>
              <div className="timeline-meta">
                <p className="timeline-period">{e.period[locale]}</p>
                <p className="timeline-location">{e.location[locale]}</p>
              </div>
              <article className="timeline-entry">
                <h3 className="scene-heading">{e.role}</h3>
                <p className="organization">{e.organization[locale]}</p>
                <div className="timeline-description">
                  <p>{e.description[locale]}</p>
                  {e.extra && <p>{e.extra[locale]}</p>}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>
      <section className="section container capabilities" aria-labelledby="capabilities-heading">
        <div className="section-label">
          <span className="eyebrow">03 / {id ? 'Keahlian' : 'Capabilities'}</span>
        </div>
        <div className="section-intro" data-scene="heading">
          <h2 id="capabilities-heading" className="scene-heading">
            {id ? 'Bagian-bagian yang saya hubungkan.' : 'The pieces I bring together.'}
          </h2>
          <p>
            {id
              ? 'Dari antarmuka hingga sistem di baliknya.'
              : 'From the interface to the systems behind it.'}
          </p>
        </div>
        <p className="interaction-hint">
          {id
            ? 'Pilih bidang untuk melihat pendekatan dan teknologi yang saya gunakan.'
            : 'Select an area to explore my approach and technologies.'}
        </p>
        <CapabilityExplorer
          locale={locale}
          items={capabilities.map((c) => ({
            title: c.title,
            description: c.description[locale],
            tools: c.tools.split('\u00b7').map((tool) => tool.trim()),
          }))}
        />
        <TechReel locale={locale}>
          {capabilityTechnologies.map((name) => (
            <li key={name}>
              <TechBadge name={name} />
            </li>
          ))}
        </TechReel>
      </section>
      <GitHubActivity locale={locale} />
    </>
  );
}
