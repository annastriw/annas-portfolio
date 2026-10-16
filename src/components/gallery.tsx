'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ArrowsOutIcon, XIcon } from '@phosphor-icons/react';
import type { Locale, Bilingual } from '@/lib/i18n';
import { swipeStep } from '@/lib/gallery-gesture';
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
  const root = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ id: number; x: number; y: number; stage: HTMLElement } | null>(null);
  const suppressClick = useRef(false);
  const direction = useRef(1);
  const firstRender = useRef(true);
  const description = captions[images[index]];
  const change = useCallback(
    (step: number) => {
      direction.current = step;
      setIndex((current) => (current + step + images.length) % images.length);
    },
    [images.length],
  );
  function resetDrag() {
    if (pointer.current) {
      pointer.current.stage.style.removeProperty('--gallery-drag');
      delete pointer.current.stage.dataset.dragging;
    }
    pointer.current = null;
  }
  const gestures = {
    onPointerDown(event: PointerEvent<HTMLDivElement>) {
      if (!event.isPrimary || event.button !== 0 || images.length < 2) return;
      suppressClick.current = false;
      pointer.current = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        stage: event.currentTarget,
      };
      const capture = (event.target as Element).closest('button') ?? event.currentTarget;
      try {
        capture.setPointerCapture(event.pointerId);
      } catch {
        /* A cancelled pointer may no longer be active. */
      }
    },
    onPointerMove(event: PointerEvent<HTMLDivElement>) {
      const start = pointer.current;
      if (!start || start.id !== event.pointerId) return;
      const dx = event.clientX - start.x,
        dy = event.clientY - start.y;
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) suppressClick.current = true;
      if (Math.abs(dx) > Math.abs(dy) * 1.4) {
        const limit = start.stage.clientWidth * 0.3;
        start.stage.style.setProperty(
          '--gallery-drag',
          `${Math.max(-limit, Math.min(limit, dx))}px`,
        );
        start.stage.dataset.dragging = 'true';
      }
    },
    onPointerUp(event: PointerEvent<HTMLDivElement>) {
      const start = pointer.current;
      if (!start || start.id !== event.pointerId) return;
      const dx = event.clientX - start.x,
        dy = event.clientY - start.y;
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) suppressClick.current = true;
      const step = swipeStep(dx, dy, start.stage.clientWidth);
      resetDrag();
      if (step) change(step);
    },
    onPointerCancel() {
      resetDrag();
    },
  };
  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const animations = Array.from(root.current?.querySelectorAll('.gallery-visual') ?? [])
      .filter((element) => element.getClientRects().length)
      .map((element) =>
        element.animate(
          [
            { opacity: 0.5, transform: `translateX(${direction.current > 0 ? 24 : -24}px)` },
            { opacity: 1, transform: 'translateX(0)' },
          ],
          { duration: 260, easing: 'cubic-bezier(.22,1,.36,1)' },
        ),
      );
    return () => animations.forEach((animation) => animation.cancel());
  }, [index]);
  useEffect(() => {
    const stages = Array.from(root.current?.querySelectorAll<HTMLElement>('.gallery-stage') ?? []);
    let accumulated = 0,
      lastEvent = 0,
      lastSlide = 0;
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY) * 1.4) return;
      event.preventDefault();
      const now = Date.now();
      if (now - lastSlide < 450) return;
      if (now - lastEvent > 180) accumulated = 0;
      lastEvent = now;
      accumulated += event.deltaX;
      if (Math.abs(accumulated) > 55) {
        change(accumulated > 0 ? 1 : -1);
        accumulated = 0;
        lastSlide = now;
      }
    };
    stages.forEach((stage) => stage.addEventListener('wheel', wheel, { passive: false }));
    return () => stages.forEach((stage) => stage.removeEventListener('wheel', wheel));
  }, [change]);
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
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} ${locale === 'id' ? 'galeri' : 'gallery'}`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          change(-1);
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          change(1);
        }
        if (event.key === 'Home') {
          event.preventDefault();
          direction.current = -1;
          setIndex(0);
        }
        if (event.key === 'End') {
          event.preventDefault();
          direction.current = 1;
          setIndex(images.length - 1);
        }
      }}
    >
      <div className="gallery-stage" {...gestures}>
        <button
          ref={trigger}
          className="gallery-main"
          onClick={() => {
            if (suppressClick.current) {
              suppressClick.current = false;
              return;
            }
            dialog.current?.showModal();
          }}
          aria-label={locale === 'id' ? 'Perbesar gambar' : 'Enlarge image'}
        >
          <Image
            className="gallery-visual"
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
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
      </div>
      {description && <p className="gallery-caption">{description.caption[locale]}</p>}
      {controls}
      <p className="gallery-hint">
        {locale === 'id'
          ? 'Geser atau drag gambar · Klik untuk memperbesar'
          : 'Swipe or drag the image · Click to enlarge'}
      </p>
      <div
        className="gallery-thumbnails"
        aria-label={locale === 'id' ? 'Pilih tampilan' : 'Choose a view'}
      >
        {images.map((src, i) => (
          <button
            key={src}
            aria-label={`${locale === 'id' ? 'Tampilkan gambar' : 'Show image'} ${i + 1}`}
            aria-pressed={i === index}
            onClick={() => {
              direction.current = i > index ? 1 : -1;
              setIndex(i);
            }}
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
        onClose={() => {
          resetDrag();
          trigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
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
        <div className="gallery-stage lightbox-stage" {...gestures}>
          <Image
            className="gallery-visual"
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
            src={images[index]}
            width={1920}
            height={1200}
            alt={description?.alt[locale] ?? `${title} — ${index + 1}`}
            sizes="95vw"
          />
        </div>
        {controls}
        <p className="gallery-hint">
          {locale === 'id'
            ? 'Geser gambar, drag, atau gunakan tombol panah.'
            : 'Swipe, drag, or use the arrow keys.'}
        </p>
      </dialog>
    </div>
  );
}
