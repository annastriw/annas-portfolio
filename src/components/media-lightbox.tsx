'use client';
import { useSyncExternalStore } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import { ArrowLeftIcon, ArrowRightIcon, XIcon, PlusIcon, MinusIcon } from '@phosphor-icons/react';
import type { Locale } from '@/lib/i18n';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import './media-lightbox.css';
export type MediaSlide = { src: string; alt: string; title?: string; description?: string };
const subscribeMotion = (listener: () => void) => {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', listener);
  return () => media.removeEventListener('change', listener);
};
export default function MediaLightbox({
  open,
  index,
  slides,
  locale,
  close,
  onView,
  onExited,
}: {
  open: boolean;
  index: number;
  slides: MediaSlide[];
  locale: Locale;
  close: () => void;
  onView?: (index: number) => void;
  onExited: () => void;
}) {
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => true,
  );
  const id = locale === 'id';
  return (
    <Lightbox
      open={open}
      close={close}
      index={index}
      slides={slides}
      className="portfolio-lightbox"
      plugins={[Zoom, Captions]}
      carousel={{ finite: true, preload: 1 }}
      controller={{ closeOnBackdropClick: true, closeOnPullDown: false, closeOnPullUp: false }}
      zoom={{ maxZoomPixelRatio: 2, scrollToZoom: false }}
      captions={{ descriptionMaxLines: 2, showToggle: false }}
      animation={{
        fade: reduced ? 0 : 300,
        swipe: reduced ? 0 : 380,
        zoom: reduced ? 0 : 280,
        easing: {
          fade: 'ease-out',
          swipe: 'cubic-bezier(.22,1,.36,1)',
          navigation: 'cubic-bezier(.22,1,.36,1)',
        },
      }}
      on={{ view: ({ index: current }) => onView?.(current), exited: onExited }}
      labels={
        id
          ? {
              Close: 'Tutup',
              Next: 'Gambar berikutnya',
              Previous: 'Gambar sebelumnya',
              'Zoom in': 'Perbesar',
              'Zoom out': 'Perkecil',
              Lightbox: 'Pratinjau gambar',
              'Photo gallery': 'Galeri gambar',
            }
          : {}
      }
      render={{
        ...(slides.length === 1 ? { buttonPrev: () => null, buttonNext: () => null } : {}),
        iconClose: () => <XIcon size={25} />,
        iconPrev: () => <ArrowLeftIcon size={25} />,
        iconNext: () => <ArrowRightIcon size={25} />,
        iconZoomIn: () => <PlusIcon size={24} />,
        iconZoomOut: () => <MinusIcon size={24} />,
      }}
    />
  );
}
