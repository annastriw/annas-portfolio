'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ArrowsOutIcon, XIcon } from '@phosphor-icons/react';
import type { Locale, Bilingual } from '@/lib/i18n';
export type GalleryCaption = { alt: Bilingual; caption: Bilingual };

export function Gallery({
  images,
  title,
  locale,
  captions,
}: {
  images: string[];
  title: string;
  locale: Locale;
  captions: Record<string, GalleryCaption>;
}) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const description = captions[images[index]];
  const change = (step: number) =>
    setIndex((current) => (current + step + images.length) % images.length);
  const controls = (
    <div className="gallery-controls">
      <p className="eyebrow" aria-live="polite">
        {locale === 'id' ? 'Tampilan' : 'View'} {String(index + 1).padStart(2, '0')} /{' '}
        {String(images.length).padStart(2, '0')}
      </p>
      <div>
        <button
          className="icon-button"
          disabled={images.length < 2}
          aria-label={locale === 'id' ? 'Gambar sebelumnya' : 'Previous image'}
          onClick={() => change(-1)}
        >
          <ArrowLeftIcon size={23} />
        </button>
        <button
          className="icon-button"
          disabled={images.length < 2}
          aria-label={locale === 'id' ? 'Gambar berikutnya' : 'Next image'}
          onClick={() => change(1)}
        >
          <ArrowRightIcon size={23} />
        </button>
      </div>
    </div>
  );
  return (
    <div
      className="gallery"
      onTouchStart={(e) => {
        touch.current = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
      }}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x;
        const dy = e.changedTouches[0].clientY - touch.current.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) change(dx > 0 ? -1 : 1);
        touch.current = null;
      }}
    >
      <button
        ref={trigger}
        className="gallery-main"
        onClick={() => dialog.current?.showModal()}
        aria-label={locale === 'id' ? 'Perbesar gambar' : 'Enlarge image'}
      >
        <Image
          src={images[index]}
          width={1600}
          height={1000}
          sizes="(max-width: 700px) 92vw, 88vw"
          alt={description?.alt[locale] ?? `${title} — ${index + 1}`}
        />
        <span className="enlarge">
          <ArrowsOutIcon size={22} />
        </span>
      </button>
      {description && <p className="gallery-caption">{description.caption[locale]}</p>}
      {controls}
      <div
        className="gallery-thumbnails"
        aria-label={locale === 'id' ? 'Pilih tampilan' : 'Choose a view'}
      >
        {images.map((src, i) => (
          <button
            key={src}
            aria-label={`${locale === 'id' ? 'Tampilkan gambar' : 'Show image'} ${i + 1}`}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
          >
            <Image
              src={src.replace('/documentation/', '/thumbnails/')}
              alt=""
              width={150}
              height={100}
              sizes="110px"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="image-dialog"
        aria-label={`${title} ${locale === 'id' ? 'galeri' : 'gallery'}`}
        onClose={() => trigger.current?.focus()}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            change(-1);
          }
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            change(1);
          }
        }}
      >
        <div className="lightbox-top">
          <span>{title}</span>
          <button
            className="icon-button"
            onClick={() => dialog.current?.close()}
            aria-label={locale === 'id' ? 'Tutup gambar' : 'Close image'}
          >
            <XIcon size={26} />
          </button>
        </div>
        {/* Only load full-screen media once the gallery is used; the same cached source is shared. */}
        <Image
          src={images[index]}
          width={1920}
          height={1200}
          alt={description?.alt[locale] ?? `${title} — ${index + 1}`}
          sizes="95vw"
        />
        {controls}
      </dialog>
    </div>
  );
}
