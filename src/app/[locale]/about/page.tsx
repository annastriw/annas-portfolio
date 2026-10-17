import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import { biography, certificates, thesis } from '@/content/site';
import { isLocale, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';
import { CertificateGallery } from '@/components/certificate-gallery';
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return pageMetadata(
    locale,
    'about',
    locale === 'id' ? 'Tentang Saya' : 'About',
    biography[0][locale],
    '/assets/photos/about.jpg',
  );
}
export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const id = locale === 'id';
  return (
    <div className="container page-space">
      <div className="page-heading">
        <p className="eyebrow">{id ? 'Di Balik Karya' : 'Behind the Work'}</p>
        <h1>{id ? 'Senang berkenalan.\nSaya Annas.' : 'Nice to meet you.\nI’m Annas.'}</h1>
      </div>
      <section className="about-intro">
        <div className="about-photo">
          <div className="about-photo-frame">
            <Image
              src="/assets/photos/about.jpg"
              width={2336}
              height={3504}
              sizes="(max-width: 700px) 92vw, 37vw"
              alt={
                id
                  ? 'Annas Tri Widagdo di Universitas Diponegoro'
                  : 'Annas Tri Widagdo at Diponegoro University'
              }
              preload
            />
          </div>
          <span className="eyebrow">Annas Tri Widagdo / Jakarta, ID</span>
        </div>
        <div className="about-biography">
          {biography.map((p, i) => (
            <p key={i}>{p[locale]}</p>
          ))}
        </div>
      </section>
      <section className="section education">
        <div className="section-label">
          <h2 className="eyebrow">01 / {id ? 'Pendidikan' : 'Education'}</h2>
        </div>
        <div className="education-heading">
          <h3>{id ? 'Universitas Diponegoro' : 'Diponegoro University'}</h3>
          <div>
            <p>{id ? 'Sarjana Teknik Komputer' : 'Bachelor of Computer Engineering'}</p>
            <p className="muted">
              {id ? 'Agustus 2022 — Juni 2026' : 'August 2022 — June 2026'}
              <br />
              {id ? 'IPK' : 'GPA'} 3.79 / 4.00 · Cum Laude
            </p>
          </div>
        </div>
        <div className="thesis">
          <p className="eyebrow">{id ? 'Skripsi' : 'Undergraduate Thesis'}</p>
          <div>
            <h4>{thesis.title[locale]}</h4>
            <p>{thesis.description[locale]}</p>
            <a className="text-link" href={thesis.url} target="_blank" rel="noreferrer">
              {id ? 'Baca Skripsi' : 'Read Thesis'}
              <ArrowUpRightIcon size={20} />
            </a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-label">
          <h2 className="eyebrow">02 / {id ? 'Sertifikat Pelatihan' : 'Training Certificates'}</h2>
          <span className="eyebrow">08</span>
        </div>
        <CertificateGallery items={certificates} locale={locale} />
      </section>
    </div>
  );
}
