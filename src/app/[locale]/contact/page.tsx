import { notFound } from 'next/navigation';
import { ArrowUpRightIcon, ArrowRightIcon } from '@phosphor-icons/react/dist/ssr';
import { CopyEmail } from '@/components/contact-actions';
import { identity } from '@/content/site';
import { isLocale, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return pageMetadata(
    locale,
    'contact',
    locale === 'id' ? 'Kontak' : 'Contact',
    locale === 'id'
      ? 'Punya peluang atau proyek yang ingin dibicarakan? Hubungi Annas Tri Widagdo.'
      : 'Have an opportunity or project in mind? Get in touch with Annas Tri Widagdo.',
  );
}
export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const id = locale === 'id';
  return (
    <section className="contact-page container page-space">
      <div className="page-heading">
        <p className="eyebrow">{id ? 'Mari Bicara' : 'Let’s Talk'}</p>
        <h1>{id ? 'Apa yang ingin\nAnda bangun?' : 'What would you\nlike to build?'}</h1>
        <p>
          {id
            ? 'Punya peluang, ide proyek, atau ingin mengenal karya saya lebih jauh? Mari mulai percakapan.'
            : 'Have an opportunity, a project idea, or want to know more about my work? Let’s start a conversation.'}
        </p>
      </div>
      <div className="contact-body" data-scene="story">
        <div>
          <p className="eyebrow">Email</p>
          <a className="contact-email" href={`mailto:${identity.email}`}>
            {identity.email}
            <ArrowUpRightIcon data-motion-icon="diagonal" weight="light" />
          </a>
          <div className="contact-actions">
            <a className="button" href={`mailto:${identity.email}`}>
              {id ? 'Kirim Email' : 'Send an Email'}
              <ArrowRightIcon data-motion-icon="right" size={22} />
            </a>
            <CopyEmail locale={locale} />
          </div>
        </div>
        <div className="contact-socials" data-scene="social">
          <a href={identity.linkedin} target="_blank" rel="noreferrer">
            <span>
              LinkedIn<small>Annas Tri Widagdo</small>
            </span>
            <ArrowUpRightIcon data-motion-icon="diagonal" size={25} />
          </a>
          <a href={identity.github} target="_blank" rel="noreferrer">
            <span>
              GitHub<small>@annastriw</small>
            </span>
            <ArrowUpRightIcon data-motion-icon="diagonal" size={25} />
          </a>
          <p className="eyebrow">Jakarta, Indonesia</p>
        </div>
      </div>
    </section>
  );
}
