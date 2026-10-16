import { notFound } from 'next/navigation';
import { ProjectArchive } from '@/components/project-archive';
import { projects } from '@/content/projects';
import { isLocale, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return pageMetadata(
    locale,
    'projects',
    locale === 'id' ? 'Proyek' : 'Projects',
    locale === 'id'
      ? 'Sepuluh proyek: aplikasi web, integrasi AI/ML, Android, dan pengalaman interaktif.'
      : 'Ten projects across web applications, AI/ML integration, Android, and interactive experiences.',
  );
}
export default async function Projects({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const id = locale === 'id';
  return (
    <div className="container page-space">
      <div className="page-heading">
        <p className="eyebrow">{id ? 'Koleksi Karya' : 'Work Archive'} / 10</p>
        <h1>
          {id
            ? 'Beragam persoalan.\nSoftware sebagai jawaban.'
            : 'Different problems.\nSoftware as a solution.'}
        </h1>
        <p>
          {id
            ? 'Aplikasi web, integrasi AI/ML, mobile, dan pengalaman interaktif. Pilih proyek untuk melihat lebih dekat.'
            : 'Web applications, AI/ML integration, mobile, and interactive experiences. Pick a project to take a closer look.'}
        </p>
      </div>
      <ProjectArchive
        locale={locale}
        items={projects.map(({ slug, title, category, role, tagline, cover }) => ({
          slug,
          title,
          category,
          role,
          tagline,
          cover,
        }))}
      />
    </div>
  );
}
