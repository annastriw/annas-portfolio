'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowsOutIcon } from '@phosphor-icons/react';
import type { Locale } from '@/lib/i18n';

const MediaLightbox = dynamic(() => import('./media-lightbox'), { ssr: false });
export function CertificateGallery({ items, locale }: { items: string[][]; locale: Locale }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const certificate = selected === null ? null : items[selected];
  return (
    <>
      <div className="certificate-grid">
        {items.map(([title, issuer, year, file], index) => (
          <button
            className="certificate"
            type="button"
            key={file}
            onClick={(event) => {
              trigger.current = event.currentTarget;
              setSelected(index);
              setOpen(true);
            }}
          >
            <span className="certificate-image">
              <Image
                src={`/assets/certificates/thumb-${file}.webp`}
                width={640}
                height={450}
                sizes="(max-width: 700px) 90vw, (max-width: 1000px) 43vw, 28vw"
                alt=""
              />
            </span>
            <span className="certificate-copy">
              <span className="eyebrow">
                {issuer} · {year}
              </span>
              <span className="certificate-title">{title}</span>
              <span className="certificate-action">
                {locale === 'id' ? 'Buka pratinjau' : 'Open preview'}
                <ArrowsOutIcon size={18} />
              </span>
            </span>
          </button>
        ))}
      </div>
      {certificate && (
        <MediaLightbox
          open={open}
          close={() => setOpen(false)}
          index={0}
          locale={locale}
          slides={[
            {
              src: `/assets/certificates/${certificate[3]}.webp`,
              alt: certificate[0],
              title: certificate[0],
              description: `${certificate[1]} · ${certificate[2]} · ${locale === 'id' ? 'Cubit / ketuk dua kali untuk zoom' : 'Pinch / double-tap to zoom'}`,
            },
          ]}
          onExited={() => {
            setSelected(null);
            trigger.current?.focus({ preventScroll: true });
          }}
        />
      )}
    </>
  );
}
