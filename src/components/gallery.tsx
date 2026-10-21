'use client';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowsOutIcon } from '@phosphor-icons/react';
import { GalleryDetails } from './gallery-details';
import type { Locale, Bilingual } from '@/lib/i18n';
import { swipeStep } from '@/lib/gallery-gesture';
const MediaLightbox = dynamic(() => import('./media-lightbox'), { ssr: false });
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
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [viewport, carousel] = useEmblaCarousel({ loop: false, duration: 28, dragThreshold: 5 });
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const id = locale === 'id';
  const go = useCallback(
    (next: number) => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      carousel?.scrollTo(next, reduced);
    },
    [carousel],
  );
  useEffect(() => {
    if (!carousel) return;
    const select = () => setIndex(carousel.selectedScrollSnap());
    const begin = () => {
      if (root.current) root.current.dataset.dragging = 'true';
    };
    const end = () => {
      if (root.current) delete root.current.dataset.dragging;
    };
    carousel.on('pointerDown', begin).on('pointerUp', end).on('settle', end);
    carousel.on('select', select).on('reInit', select);
    return () => {
      carousel.off('select', select).off('reInit', select);
      carousel.off('pointerDown', begin).off('pointerUp', end).off('settle', end);
      end();
    };
  }, [carousel]);
  useEffect(() => {
    const element = root.current?.querySelector('.gallery-viewport');
    if (!element || !carousel) return;
    let total = 0,
      last = 0,
      changed = 0;
    const wheel = (event: Event) => {
      const e = event as WheelEvent;
      if (e.ctrlKey || Math.abs(e.deltaX) <= Math.abs(e.deltaY) * 1.4) return;
      e.preventDefault();
      const now = Date.now();
      if (now - changed < 380) return;
      if (now - last > 160) total = 0;
      last = now;
      total += e.deltaX;
      const step = swipeStep(-total, 0, element.clientWidth);
      if (step) {
        go(carousel.selectedScrollSnap() + step);
        total = 0;
        changed = now;
      }
    };
    element.addEventListener('wheel', wheel, { passive: false });
    return () => element.removeEventListener('wheel', wheel);
  }, [carousel, go]);
  const hint = id
    ? 'Cubit atau ketuk dua kali untuk zoom · Drag saat diperbesar'
    : 'Pinch or double-tap to zoom · Drag to pan when enlarged';
  const slides = useMemo(
    () =>
      images.map((src, i) => ({
        src,
        alt: captions[src]?.alt[locale] ?? `${title} · ${i + 1}`,
        title: `${title} · ${i + 1} / ${images.length}`,
        description: hint,
      })),
    [images, captions, locale, title, hint],
  );
  return (
    <div
      className="gallery"
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} ${id ? 'galeri' : 'gallery'}`}
      aria-busy={!carousel}
      tabIndex={0}
      onKeyDown={(event) => {
        if (!carousel) return;
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
        if (next !== null) {
          event.preventDefault();
          go(next);
        }
      }}
    >
      <div className="gallery-viewport" ref={viewport}>
        <div className="gallery-track">
          {images.map((src, i) => (
            <div className="gallery-slide" key={src} aria-hidden={i !== index}>
              <button
                className="gallery-main"
                tabIndex={i === index ? 0 : -1}
                onClick={(event) => {
                  trigger.current = event.currentTarget;
                  setLoaded(true);
                  setOpen(true);
                }}
                aria-label={id ? 'Perbesar gambar' : 'Enlarge image'}
              >
                <Image
                  className="gallery-visual"
                  draggable={false}
                  src={src}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 700px) 92vw, 88vw"
                  alt={captions[src]?.alt[locale] ?? `${title} · ${i + 1}`}
                  loading="lazy"
                />
                <span className="enlarge">
                  <ArrowsOutIcon size={22} />
                  <span>{id ? 'Perbesar' : 'Enlarge'}</span>
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <GalleryDetails
        images={images}
        captions={captions}
        locale={locale}
        index={index}
        ready={!!carousel}
        go={go}
      />
      {loaded && (
        <MediaLightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          locale={locale}
          slides={slides}
          onView={go}
          onExited={() => {
            const current = root.current?.querySelector<HTMLButtonElement>(
              '.gallery-slide[aria-hidden="false"] .gallery-main',
            );
            (current ?? trigger.current)?.focus({ preventScroll: true });
          }}
        />
      )}
    </div>
  );
}
