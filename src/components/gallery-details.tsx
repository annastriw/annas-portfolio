'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import type { Locale } from '@/lib/i18n';
import type { GalleryCaption } from './gallery';

export function GalleryDetails({
  images,
  captions,
  locale,
  index,
  ready,
  go,
}: {
  images: string[];
  captions: Record<string, GalleryCaption>;
  locale: Locale;
  index: number;
  ready: boolean;
  go: (index: number) => void;
}) {
  const thumbnails = useRef<HTMLDivElement>(null);
  const id = locale === 'id';
  useLayoutEffect(() => {
    const strip = thumbnails.current;
    if (!strip) return;
    const reveal = () => {
      const selected = strip.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!selected) return;
      const bounds = strip.getBoundingClientRect();
      const target = selected.getBoundingClientRect();
      const delta =
        target.left < bounds.left
          ? target.left - bounds.left
          : target.right > bounds.right
            ? target.right - bounds.right
            : 0;
      if (Math.abs(delta) > 0.5)
        strip.scrollTo({
          left: strip.scrollLeft + delta,
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        });
    };
    reveal();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(reveal);
    observer?.observe(strip);
    if (!observer) window.addEventListener('resize', reveal);
    return () => {
      observer?.disconnect();
      if (!observer) window.removeEventListener('resize', reveal);
    };
  }, [index]);
  return (
    <>
      <div className="gallery-captions">
        {images.map(
          (src, i) =>
            captions[src] && (
              <p
                key={src}
                className="gallery-caption"
                data-active={i === index}
                aria-hidden={i !== index}
              >
                {captions[src].caption[locale]}
              </p>
            ),
        )}
      </div>
      <div className="gallery-controls">
        <p className="eyebrow" aria-live="polite" aria-atomic="true">
          {id ? 'Tampilan' : 'View'}{' '}
          <span className="gallery-current" key={index}>
            {String(index + 1).padStart(2, '0')}
          </span>
          {' / '}
          {String(images.length).padStart(2, '0')}
        </p>
        <div>
          <button
            className="icon-button"
            disabled={!ready || index === 0}
            aria-label={id ? 'Gambar sebelumnya' : 'Previous image'}
            onClick={() => go(index - 1)}
          >
            <ArrowLeftIcon data-motion-icon="left" size={23} />
          </button>
          <button
            className="icon-button"
            disabled={!ready || index === images.length - 1}
            aria-label={id ? 'Gambar berikutnya' : 'Next image'}
            onClick={() => go(index + 1)}
          >
            <ArrowRightIcon data-motion-icon="right" size={23} />
          </button>
        </div>
      </div>
      <p className="gallery-hint">
        {images.length > 1
          ? id
            ? 'Geser atau drag gambar · Klik untuk memperbesar'
            : 'Swipe or drag the image · Click to enlarge'
          : id
            ? 'Klik gambar untuk memperbesar'
            : 'Click the image to enlarge'}
      </p>
      <div
        className="gallery-thumbnails"
        role="group"
        ref={thumbnails}
        aria-label={id ? 'Pilih tampilan' : 'Choose a view'}
        onKeyDown={(event) => {
          const next =
            event.key === 'ArrowLeft'
              ? index - 1
              : event.key === 'ArrowRight'
                ? index + 1
                : event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? images.length - 1
                    : null;
          if (next === null || !ready) return;
          event.preventDefault();
          event.stopPropagation();
          const target = Math.max(0, Math.min(images.length - 1, next));
          go(target);
          thumbnails.current?.querySelectorAll('button')[target]?.focus({ preventScroll: true });
        }}
      >
        {images.map((src, i) => (
          <button
            key={src}
            aria-label={`${id ? 'Tampilkan gambar' : 'Show image'} ${i + 1}`}
            aria-pressed={i === index}
            disabled={!ready}
            onClick={() => go(i)}
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
    </>
  );
}
