'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { ArrowsOutIcon, XIcon } from '@phosphor-icons/react';
import type { Locale } from '@/lib/i18n';

export function CertificateGallery({ items, locale }: { items: string[][]; locale: Locale }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
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
            aria-label={`${locale === 'id' ? 'Lihat sertifikat' : 'View certificate'}: ${title}`}
            onClick={(event) => {
              trigger.current = event.currentTarget;
              setSelected(index);
              dialog.current?.showModal();
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
              <span className="certificate-title">
                {title}
                <ArrowsOutIcon size={20} />
              </span>
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="image-dialog certificate-dialog"
        aria-labelledby="certificate-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onClose={() => {
          setSelected(null);
          trigger.current?.focus();
        }}
      >
        <div className="lightbox-top">
          <h3 id="certificate-dialog-title">
            {certificate?.[0] ?? (locale === 'id' ? 'Sertifikat' : 'Certificate')}
          </h3>
          <button
            className="icon-button"
            onClick={() => dialog.current?.close()}
            aria-label={locale === 'id' ? 'Tutup sertifikat' : 'Close certificate'}
          >
            <XIcon size={26} />
          </button>
        </div>
        {certificate && (
          <>
            <Image
              src={`/assets/certificates/${certificate[3]}.webp`}
              width={1600}
              height={1100}
              sizes="95vw"
              alt={`${locale === 'id' ? 'Sertifikat' : 'Certificate'} ${certificate[0]}`}
              loading="eager"
            />
            <p className="small-text">
              {certificate[1]} · {certificate[2]}
            </p>
          </>
        )}
      </dialog>
    </>
  );
}
