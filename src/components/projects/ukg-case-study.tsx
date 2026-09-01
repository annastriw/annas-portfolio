"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type {
  ProjectCaseStudy,
  ProjectCaseStudyLocale,
  ProjectGallerySlide,
} from "@/content/projects/project-case-studies";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useGalleryAutoplay } from "./use-gallery-autoplay";

import styles from "./ukg-case-study.module.css";

interface UkgCaseStudyViewProps {
  project: ProjectCaseStudy;
  locale: ProjectCaseStudyLocale;
}

export function UkgCaseStudyView({ project, locale }: UkgCaseStudyViewProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeTriggerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Touch tracking refs to enable mobile swipe gestures without hijacking vertical scroll
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isSwipingRef = useRef(false);

  const isId = locale === "id";
  const projectsHref = `/${locale}/projects`;

  const copy = {
    breadcrumbProjects: isId ? "Proyek" : "Projects",
    breadcrumbAria: isId ? "Navigasi breadcrumb" : "Breadcrumb navigation",
    client: isId ? "Klien" : "Client",
    role: isId ? "Peran" : "Role",
    period: isId ? "Periode" : "Period",
    status: "Status",
    liveCta: isId ? "Buka Website" : "Live Website",
    newTabCue: isId ? "buka di tab baru" : "opens in new tab",
    repoNotice: isId ? "Private Repository" : "Private Repository",
    galleryTitle: isId ? "Galeri Proyek" : "Project Gallery",
    carouselAria: isId
      ? "Galeri tangkapan layar sistem UKG"
      : "UKG System screenshot gallery carousel",
    prevSlide: isId
      ? "Slide sebelumnya (Panah Kiri)"
      : "Previous slide (Left Arrow)",
    nextSlide: isId
      ? "Slide berikutnya (Panah Kanan)"
      : "Next slide (Right Arrow)",
    inspect: isId ? "Perbesar Bukti" : "Inspect Figure",
    closeLightbox: isId ? "Tutup" : "Close",
    overviewTitle: isId ? "Ringkasan Project" : "Project Overview",
    contributionTitle: isId ? "Kontribusi Saya" : "My Contribution",
    scopeTitle: isId ? "Cakupan Sistem" : "System Scope",
    modulesSubtag: isId ? "Modul Terintegrasi" : "Integrated Modules",
    techSubtag: isId ? "Kelompok Teknologi" : "Technology Groups",
  };

  // Authoritative 9-slide gallery dataset from project content
  const slides: readonly ProjectGallerySlide[] =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [
          {
            slide: "01",
            src: project.cover.src,
            format: "cover",
            alt: project.cover.alt,
            caption: {
              en: "[UKG_CAPTION_01_EN] Add a short description of this screenshot.",
              id: "[UKG_CAPTION_01_ID] Tambahkan deskripsi singkat tentang tampilan ini.",
            },
          },
        ];

  // Shared 4-second autoplay with crossfade, hover/focus/lightbox pause, and reduced-motion compliance
  const {
    activeIndex,
    goToNext,
    goToPrev,
    containerRef,
    containerProps,
  } = useGalleryAutoplay({
    slideCount: slides.length,
    intervalMs: 4000,
    isLightboxOpen,
  });

  const currentSlide = slides[activeIndex] ?? slides[0];

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    isSwipingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    if (Math.abs(deltaX) > 10) {
      isSwipingRef.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // Only trigger horizontal slide navigation if horizontal swipe exceeds 40px and dominates vertical movement
    if (absX > 40 && absX > absY) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    // Reset swipe flag after a short delay so click event won't trigger inspection
    setTimeout(() => {
      isSwipingRef.current = false;
      touchStartRef.current = null;
    }, 60);
  };

  const handleFrameClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isSwipingRef.current) return;
    activeTriggerRef.current = e.currentTarget;
    setIsLightboxOpen(true);
  };

  const handleCarouselKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activeTriggerRef.current = e.currentTarget as HTMLElement;
      setIsLightboxOpen(true);
    }
  };

  const handleCloseLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    activeTriggerRef.current?.focus();
  }, []);

  // Lightbox keyboard accessibility, focus trap, and background scroll handling
  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseLightbox();
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
        return;
      }

      if (e.key === "Tab" && lightboxRef.current) {
        const focusableElements = Array.from(
          lightboxRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, handleCloseLightbox, goToNext, goToPrev]);

  return (
    <article className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumb} aria-label={copy.breadcrumbAria}>
          <Link href={projectsHref} className={styles.breadcrumbLink}>
            {copy.breadcrumbProjects}
          </Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">
            /
          </span>
          <span className={styles.breadcrumbCurrent} aria-current="page">
            {project.title[locale]}
          </span>
        </nav>

        {/* Opening Section */}
        <ScrollReveal animationClass="animate-editorial-fade">
          <header className={styles.opening}>
            <div className={styles.openingHeader}>
              <span className={styles.categoryLabel}>
                {project.categoryLabel[locale]}
              </span>
              <h1 className={styles.title}>{project.title[locale]}</h1>
              {project.lead ? (
                <p className={styles.lead}>{project.lead[locale]}</p>
              ) : null}
            </div>

            {/* Semantic Label / Value Metadata */}
            <dl className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <dt>{copy.client}</dt>
                <dd>{project.client?.[locale] ?? "—"}</dd>
              </div>
              <div className={styles.metaItem}>
                <dt>{copy.role}</dt>
                <dd>{project.role[locale]}</dd>
              </div>
              <div className={styles.metaItem}>
                <dt>{copy.period}</dt>
                <dd>{project.period?.[locale] ?? "—"}</dd>
              </div>
              <div className={styles.metaItem}>
                <dt>{copy.status}</dt>
                <dd>{project.status[locale]}</dd>
              </div>
            </dl>

            {/* Actions: Live CTA & Private Repository Notice */}
            <div className={styles.openingActions}>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.liveCta}
                  aria-label={`${copy.liveCta}: ${project.title[locale]} (${copy.newTabCue})`}
                >
                  <span>{copy.liveCta}</span>
                  <span className={styles.liveArrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              ) : null}

              {project.repositoryNotice ? (
                <span className={styles.repoNotice}>
                  <span className={styles.repoDot} aria-hidden="true">
                    ■
                  </span>
                  <span>{project.repositoryNotice[locale]}</span>
                </span>
              ) : null}
            </div>
          </header>
        </ScrollReveal>

        {/* Section 01: Project Gallery / Galeri Proyek */}
        <ScrollReveal animationClass="animate-editorial-fade">
          <section
            className={styles.section}
            aria-labelledby="ukg-section-01-title"
          >
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIndex}>[01]</span>
              <h2 id="ukg-section-01-title" className={styles.sectionTitle}>
                {copy.galleryTitle}
              </h2>
            </div>
            <div className={styles.sectionBody}>
              <figure
                className={styles.galleryFigure}
                role="region"
                aria-roledescription="carousel"
                aria-label={copy.carouselAria}
                ref={containerRef}
                {...containerProps}
              >
                {/* Stable Responsive Display Frame with Subtle Crossfade Layers */}
                <div
                  className={styles.galleryFrame}
                  onClick={handleFrameClick}
                  onKeyDown={handleCarouselKeyDown}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  tabIndex={0}
                  role="button"
                  aria-label={`${copy.inspect}: Slide ${currentSlide.slide} — ${currentSlide.alt[locale]}`}
                  aria-roledescription="slide"
                >
                  {slides.map((slide, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <div
                        key={slide.slide}
                        className={`${styles.gallerySlideLayer} ${
                          isActive
                            ? styles.gallerySlideActive
                            : styles.gallerySlideInactive
                        }`}
                        aria-hidden={!isActive}
                      >
                        <Image
                          src={slide.src}
                          alt={slide.alt[locale]}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1536px) calc(100vw - 4rem), 1440px"
                          className={styles.galleryImage}
                        />
                      </div>
                    );
                  })}
                  <div
                    className={styles.galleryInspectOverlay}
                    aria-hidden="true"
                  >
                    <span className={styles.inspectBadge}>
                      🔍 {copy.inspect}
                    </span>
                  </div>
                </div>

                {/* Caption on Left, Counter & Arrow Controls on Right (Stacked on Mobile) */}
                <div className={styles.galleryBottomBar}>
                  <figcaption className={styles.galleryCaption}>
                    <span className={styles.galleryCaptionId}>
                      [{currentSlide.slide}]
                    </span>
                    <span className={styles.galleryCaptionText}>
                      {currentSlide.caption[locale]}
                    </span>
                  </figcaption>

                  <div className={styles.galleryControls}>
                    <span
                      className={styles.galleryCounter}
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {String(activeIndex + 1).padStart(2, "0")} /{" "}
                      {String(slides.length).padStart(2, "0")}
                    </span>
                    <div className={styles.galleryNav}>
                      <button
                        type="button"
                        onClick={goToPrev}
                        className={styles.galleryNavBtn}
                        aria-label={copy.prevSlide}
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={goToNext}
                        className={styles.galleryNavBtn}
                        aria-label={copy.nextSlide}
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>
              </figure>
            </div>
          </section>
        </ScrollReveal>

        {/* Section 02: Project Overview / Ringkasan Project */}
        <ScrollReveal animationClass="animate-editorial-fade">
          <section
            className={styles.section}
            aria-labelledby="ukg-section-02-title"
          >
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIndex}>[02]</span>
              <h2 id="ukg-section-02-title" className={styles.sectionTitle}>
                {copy.overviewTitle}
              </h2>
            </div>
            <div className={styles.sectionBody}>
              <div className={styles.overviewGrid}>
                {project.overview[locale].map((paragraph, index) => (
                  <p key={index} className={styles.overviewParagraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Section 03: My Contribution / Kontribusi Saya */}
        <ScrollReveal animationClass="animate-editorial-fade">
          <section
            className={styles.section}
            aria-labelledby="ukg-section-03-title"
          >
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIndex}>[03]</span>
              <h2 id="ukg-section-03-title" className={styles.sectionTitle}>
                {copy.contributionTitle}
              </h2>
            </div>
            <div className={styles.sectionBody}>
              <ul className={styles.contributionList}>
                {project.contributions[locale].map((item, index) => (
                  <li key={index} className={styles.contributionItem}>
                    <span
                      className={styles.contributionIndex}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {project.contributionLearning ? (
                <p className={styles.contributionLearning}>
                  {project.contributionLearning[locale]}
                </p>
              ) : null}
            </div>
          </section>
        </ScrollReveal>

        {/* Section 04: System Scope / Cakupan Sistem */}
        <ScrollReveal animationClass="animate-editorial-fade">
          <section
            className={styles.section}
            aria-labelledby="ukg-section-04-title"
          >
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIndex}>[04]</span>
              <h2 id="ukg-section-04-title" className={styles.sectionTitle}>
                {copy.scopeTitle}
              </h2>
            </div>
            <div className={styles.sectionBody}>
              {/* Sub-block 1: Eight Modules */}
              {project.modules && project.modules.length > 0 ? (
                <div className={styles.scopeSubBlock}>
                  <div className={styles.subBlockHeader}>
                    <span className={styles.subBlockHeaderTag}>■</span>
                    <span>{copy.modulesSubtag}</span>
                  </div>
                  <ol className={styles.modulesGrid}>
                    {project.modules.map((moduleName, index) => (
                      <li key={moduleName} className={styles.moduleItem}>
                        <span className={styles.moduleNum} aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{moduleName}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}

              {/* Sub-block 2: Five Approved Technology Groups */}
              {project.technologyGroups &&
              project.technologyGroups.length > 0 ? (
                <div className={styles.scopeSubBlock}>
                  <div className={styles.subBlockHeader}>
                    <span className={styles.subBlockHeaderTag}>■</span>
                    <span>{copy.techSubtag}</span>
                  </div>
                  <ul className={styles.techGroupsList}>
                    {project.technologyGroups.map((group) => (
                      <li key={group.category} className={styles.techGroupItem}>
                        <span className={styles.techGroupCategory}>
                          {group.category}
                        </span>
                        <span className={styles.techGroupValues}>
                          {group.technologies.join(", ")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>
        </ScrollReveal>
      </div>

      {/* Accessible Lightbox Inspection Dialog with Synchronized Navigation */}
      {isLightboxOpen ? (
        <div
          ref={lightboxRef}
          className={styles.lightboxOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={`${copy.inspect}: [${currentSlide.slide}] ${currentSlide.caption[locale]}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseLightbox();
            }
          }}
        >
          <div className={styles.lightboxHeader}>
            <div className="flex items-center gap-2">
              <span className={styles.lightboxBadge}>
                [{currentSlide.slide}]
              </span>
              <span className={styles.lightboxTitle}>
                {project.title[locale]}
              </span>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={handleCloseLightbox}
              className={styles.lightboxCloseBtn}
              aria-label={copy.closeLightbox}
            >
              <span>✕ {copy.closeLightbox}</span>
              <kbd className="opacity-60 text-xs">[ESC]</kbd>
            </button>
          </div>

          <div className={styles.lightboxMain}>
            <button
              type="button"
              onClick={goToPrev}
              className={styles.lightboxNavBtn}
              aria-label={copy.prevSlide}
            >
              ←
            </button>

            <div className={styles.lightboxMediaWrapper}>
              <Image
                src={currentSlide.src}
                alt={currentSlide.alt[locale]}
                fill
                priority
                className={styles.lightboxImage}
                sizes="90vw"
              />
            </div>

            <button
              type="button"
              onClick={goToNext}
              className={styles.lightboxNavBtn}
              aria-label={copy.nextSlide}
            >
              →
            </button>
          </div>

          <div className={styles.lightboxFooter}>
            <p className="m-0">{currentSlide.caption[locale]}</p>
            <span className={styles.lightboxCounter}>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      ) : null}
    </article>
  );
}
