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

import styles from "./project-detail.module.css";

export interface ProjectDetailViewProps {
  project: ProjectCaseStudy;
  locale: ProjectCaseStudyLocale;
}

const SHARED_PROJECT_DETAIL_SLUGS = new Set([
  "ukg-system",
  "ihealth-edu",
  "dialisis-connect-edu",
  "nusa-dakwah",
  "simastok",
  "ml-for-heart-attack-risk-prediction",
  "speech-to-text-system",
  "thermal-printer-service",
  "footy-standings",
  "panoramic-virtual-tour",
]);

/**
 * Isolated compatibility boundary determining whether a project
 * renders via the Unified Editorial System shared template.
 */
export function isSharedProjectDetail(project: ProjectCaseStudy): boolean {
  return SHARED_PROJECT_DETAIL_SLUGS.has(project.slug);
}

/**
 * Resolves gallery slides for a project from explicit gallery definition
 * or authentic visual evidence figures.
 */
export function getProjectGallerySlides(
  project: ProjectCaseStudy,
): readonly ProjectGallerySlide[] {
  if (project.gallery && project.gallery.length > 0) {
    return project.gallery;
  }
  if (project.evidence && project.evidence.length > 0) {
    return project.evidence.map((item, index) => ({
      slide: String(index + 1).padStart(2, "0"),
      src: item.src,
      format: item.format,
      alt: item.alt,
      caption: item.caption,
    }));
  }
  return [];
}

interface MetaEntry {
  readonly label: string;
  readonly value: string;
}

function getProjectMetaEntries(
  project: ProjectCaseStudy,
  locale: ProjectCaseStudyLocale,
): readonly MetaEntry[] {
  const isId = locale === "id";
  const entries: MetaEntry[] = [];

  // Client or Stakeholder
  if (project.client) {
    const defaultLabel = isId ? "Klien" : "Client";
    const clientLabel = project.clientLabel?.[locale] ?? defaultLabel;
    entries.push({
      label: clientLabel,
      value: project.client[locale],
    });
  }

  // Role
  if (project.role) {
    entries.push({
      label: isId ? "Peran" : "Role",
      value: project.role[locale],
    });
  }

  // Working Model (if present and distinct from period)
  if (project.workingModel && !project.period) {
    entries.push({
      label: isId ? "Model Kerja" : "Working Model",
      value: project.workingModel[locale],
    });
  }

  // Period
  if (project.period) {
    entries.push({
      label: isId ? "Periode" : "Period",
      value: project.period[locale],
    });
  }

  // Status
  if (project.status) {
    entries.push({
      label: "Status",
      value: project.status[locale],
    });
  }

  return entries;
}

export function ProjectDetailView({ project, locale }: ProjectDetailViewProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeTriggerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Touch tracking refs for mobile swipe gestures without hijacking vertical scroll
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null,
  );
  const isSwipingRef = useRef(false);

  const isId = locale === "id";
  const projectsHref = `/${locale}/projects`;

  const copy = {
    breadcrumbProjects: isId ? "Proyek" : "Projects",
    breadcrumbAria: isId ? "Navigasi breadcrumb" : "Breadcrumb navigation",
    client: isId ? "Klien" : "Client",
    stakeholder: isId ? "Stakeholder" : "Stakeholder",
    role: isId ? "Peran" : "Role",
    period: isId ? "Periode" : "Period",
    workingModel: isId ? "Model Kerja" : "Working Model",
    status: "Status",
    liveCta:
      project.slug === "ihealth-edu"
        ? isId
          ? "Buka Website"
          : "Visit Live Website"
        : isId
          ? "Buka Website"
          : "Live Website",
    frontendRepo: isId
      ? "Lihat Repositori Frontend"
      : "View Frontend Repository",
    backendRepo: isId
      ? "Lihat Repositori Backend"
      : "View Backend Repository",
    repo: isId ? "Lihat Repositori" : "View Repository",
    newTabCue: isId ? "buka di tab baru" : "opens in new tab",
    repoNotice: isId ? "Private Repository" : "Private Repository",
    galleryTitle: isId ? "Galeri Proyek" : "Project Gallery",
    carouselAria: isId
      ? `Galeri antarmuka platform ${project.title[locale]}`
      : `${project.title[locale]} interface gallery carousel`,
    thumbnailRailAria: isId
      ? "Pilihan thumbnail galeri"
      : "Gallery thumbnail selector",
    prevSlide: isId
      ? "Slide sebelumnya (Panah Kiri)"
      : "Previous slide (Left Arrow)",
    nextSlide: isId
      ? "Slide berikutnya (Panah Kanan)"
      : "Next slide (Right Arrow)",
    inspect: isId ? "Perbesar Bukti" : "Inspect Figure",
    closeLightbox: isId ? "Tutup" : "Close",
    overviewTitle:
      project.sectionTitles?.overview?.[locale] ??
      (isId
        ? project.slug === "ihealth-edu"
          ? "Gambaran Proyek"
          : "Ringkasan Project"
        : "Project Overview"),
    claimBoundaryTag: isId
      ? "[BATAS KLAIM // DECISION SUPPORT MEDIS]"
      : "[CLAIM BOUNDARY // MEDICAL DECISION SUPPORT]",
    contributionTitle:
      project.sectionTitles?.contribution?.[locale] ??
      (isId ? "Kontribusi Saya" : "My Contribution"),
    personalStackTag: isId
      ? "Stack Teknologi Personal"
      : "Personal Technology Stack",
    scopeTitle:
      project.sectionTitles?.scope?.[locale] ??
      (isId ? "Cakupan Sistem" : "System Scope"),
    modulesSubtag: isId ? "Modul Terintegrasi" : "Integrated Modules",
    techSubtag: isId ? "Kelompok Teknologi" : "Technology Groups",
    scopeRolesHeader: isId ? "01 // Peran Pengguna" : "01 // User Roles",
    scopeScreeningHeader: isId
      ? "02 // Screening & Edukasi"
      : "02 // Screening & Education",
    screeningModulesLabel: isId ? "Modul Screening" : "Screening Modules",
    educationAreasLabel: isId ? "Topik Edukasi" : "Education Tracks",
    learningSequenceLabel: isId
      ? "Alur Pembelajaran"
      : "Learning Sequence",
    scopePatientDataHeader: isId ? "03 // Data Pasien" : "03 // Patient Data",
    scopeIntegrationHeader: isId
      ? "04 // Integrasi Sistem"
      : "04 // System Integrations",
    architectureNote: isId
      ? "Arsitektur mencakup integrasi IoT dan ML ke dalam antarmuka Next.js; pengembangan frontend dan integrasi UI merupakan lingkup kontribusi Annas."
      : "Architecture includes backend, IoT, and ML services integrated into the Next.js interface; Annas's direct contribution focuses on UI/UX, frontend engineering, and client-level integrations.",
    techNotesSubtag: isId ? "Catatan Teknis Utama" : "Key Technical Notes",
    techStackSubtag: isId ? "Stack Teknologi" : "Technology Stack",
    videoDemo: isId ? "Rekaman Demonstrasi Video" : "Video Demonstration Record",
    videoTag: "[04.V // VIDEO DEMO]",
    videoDesc: isId
      ? "Demonstrasi alur pencetakan Android PrintService menuju thermal printer Bluetooth ESC/POS."
      : "Demonstration of the Android PrintService workflow output to a Bluetooth ESC/POS thermal printer.",
  };

  // Section presence detection & sequential dynamic numbering (0 gaps)
  let sectionCounter = 0;

  const slides: readonly ProjectGallerySlide[] = getProjectGallerySlides(project);
  const hasGallery = slides.length > 0;
  const galleryIndex = hasGallery
    ? String(++sectionCounter).padStart(2, "0")
    : null;

  const hasOverview = Boolean(
    project.overview?.[locale] && project.overview[locale].length > 0,
  );
  const overviewIndex = hasOverview
    ? String(++sectionCounter).padStart(2, "0")
    : null;

  const hasContribution = Boolean(
    project.contributions?.[locale] && project.contributions[locale].length > 0,
  );
  const contributionIndex = hasContribution
    ? String(++sectionCounter).padStart(2, "0")
    : null;

  const hasScope = Boolean(
    (project.modules && project.modules.length > 0) ||
      (project.technologyGroups && project.technologyGroups.length > 0) ||
      project.systemScope ||
      (project.technicalNotes?.[locale] &&
        project.technicalNotes[locale].length > 0) ||
      (project.techStack &&
        project.techStack.length > 0 &&
        !project.technologyGroups &&
        !project.personalTechStack &&
        project.slug !== "ihealth-edu"),
  );
  const scopeIndex = hasScope
    ? String(++sectionCounter).padStart(2, "0")
    : null;

  // Shared 4-second autoplay with crossfade, hover/focus/lightbox pause, and reduced motion safety
  const {
    activeIndex,
    goToNext,
    goToPrev,
    goToIndex,
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

    if (absX > 40 && absX > absY) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

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

  const metaEntries = getProjectMetaEntries(project, locale);

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

        {/* Standard Opening: breadcrumb -> category -> title -> metadata -> lead -> links */}
        <ScrollReveal animationClass="animate-editorial-fade">
          <header className={styles.opening}>
            <div className={styles.openingSplit}>
              {/* Left Column: Category, Title, Metadata Grid */}
              <div className={styles.openingLeft}>
                <span className={styles.categoryLabel}>
                  {project.categoryLabel[locale]}
                </span>
                <h1 className={styles.title}>{project.title[locale]}</h1>

                <dl className={styles.metaGrid}>
                  {metaEntries.map((item) => (
                    <div key={item.label} className={styles.metaItem}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Right Column: Lead Narrative & Explicit Actions */}
              <div className={styles.openingRight}>
                {project.lead ? (
                  <p className={styles.lead}>{project.lead[locale]}</p>
                ) : null}

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
                      <span className={styles.linkArrow} aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  ) : null}

                  {project.frontendRepoUrl ? (
                    <a
                      href={project.frontendRepoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.repoLink}
                      aria-label={`${copy.frontendRepo}: ${project.title[locale]} (${copy.newTabCue})`}
                    >
                      <span>{copy.frontendRepo}</span>
                      <span className={styles.linkArrow} aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  ) : null}

                  {project.backendRepoUrl ? (
                    <a
                      href={project.backendRepoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.repoLink}
                      aria-label={`${copy.backendRepo}: ${project.title[locale]} (${copy.newTabCue})`}
                    >
                      <span>{copy.backendRepo}</span>
                      <span className={styles.linkArrow} aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  ) : null}

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.repoLink}
                      aria-label={`${copy.repo}: ${project.title[locale]} (${copy.newTabCue})`}
                    >
                      <span>{copy.repo}</span>
                      <span className={styles.linkArrow} aria-hidden="true">
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
              </div>
            </div>
          </header>
        </ScrollReveal>

        {/* Section 01: Project Gallery (when gallery evidence exists) */}
        {hasGallery && currentSlide ? (
          <ScrollReveal animationClass="animate-editorial-fade">
            <section
              className={styles.section}
              aria-labelledby="section-gallery-title"
            >
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIndex}>[{galleryIndex}]</span>
                <h2
                  id="section-gallery-title"
                  className={styles.sectionTitle}
                >
                  {copy.galleryTitle}
                </h2>
              </div>
              <div className={styles.sectionBody}>
                <figure
                  className={styles.galleryFigure}
                  role={slides.length > 1 ? "region" : undefined}
                  aria-roledescription={
                    slides.length > 1 ? "carousel" : undefined
                  }
                  aria-label={
                    slides.length > 1 ? copy.carouselAria : undefined
                  }
                  ref={containerRef}
                  {...(slides.length > 1 ? containerProps : {})}
                >
                  {/* Stable Responsive Display Frame with Subtle Crossfade Layers */}
                  <div
                    className={styles.galleryFrame}
                    onClick={handleFrameClick}
                    onKeyDown={
                      slides.length > 1 ? handleCarouselKeyDown : undefined
                    }
                    onTouchStart={
                      slides.length > 1 ? handleTouchStart : undefined
                    }
                    onTouchMove={
                      slides.length > 1 ? handleTouchMove : undefined
                    }
                    onTouchEnd={
                      slides.length > 1 ? handleTouchEnd : undefined
                    }
                    tabIndex={0}
                    role="button"
                    aria-label={`${copy.inspect}: Slide ${currentSlide.slide} — ${currentSlide.alt[locale]}`}
                    aria-roledescription={
                      slides.length > 1 ? "slide" : undefined
                    }
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

                  {/* Horizontal Thumbnail Rail (when project enables thumbnail navigation) */}
                  {project.galleryThumbnails && slides.length > 1 ? (
                    <div
                      className={styles.thumbnailRail}
                      role="tablist"
                      aria-label={copy.thumbnailRailAria}
                    >
                      {slides.map((slide, index) => {
                        const isActive = index === activeIndex;
                        return (
                          <button
                            key={slide.slide}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-current={isActive ? "true" : undefined}
                            aria-label={`${isId ? "Lihat slide" : "View slide"} ${slide.slide} — ${slide.alt[locale]}`}
                            onClick={() => goToIndex(index)}
                            className={`${styles.thumbnailBtn} ${
                              isActive ? styles.thumbnailActive : ""
                            }`}
                          >
                            <div className={styles.thumbnailMediaWrapper}>
                              <Image
                                src={slide.src}
                                alt=""
                                fill
                                sizes="(max-width: 767px) 80px, 140px"
                                className={styles.thumbnailImage}
                              />
                              <span className={styles.thumbnailNumber}>
                                {slide.slide}
                              </span>
                              {isActive ? (
                                <span
                                  className={styles.thumbnailActiveIndicator}
                                  aria-hidden="true"
                                >
                                  ■
                                </span>
                              ) : null}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}

                  {/* Caption on Left, Counter & Arrow Controls on Right */}
                  <div className={styles.galleryBottomBar}>
                    <figcaption className={styles.galleryCaption}>
                      <span className={styles.galleryCaptionId}>
                        [{currentSlide.slide}]
                      </span>
                      <span className={styles.galleryCaptionText}>
                        {currentSlide.caption[locale]}
                      </span>
                    </figcaption>

                    {slides.length > 1 ? (
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
                    ) : null}
                  </div>

                  {/* Optional Project Video Demonstration */}
                  {project.videoSrc ? (
                    <div className={styles.videoCard}>
                      <div className={styles.videoHeader}>
                        <span className={styles.videoTag}>{copy.videoTag}</span>
                        <span>{copy.videoDemo}</span>
                      </div>
                      <video
                        controls
                        preload="metadata"
                        poster={project.cover.src}
                        className={styles.videoPlayer}
                      >
                        <source src={project.videoSrc} type="video/webm" />
                        Your browser does not support HTML5 video playback.
                      </video>
                      <p className={styles.videoCaption}>{copy.videoDesc}</p>
                    </div>
                  ) : null}
                </figure>
              </div>
            </section>
          </ScrollReveal>
        ) : null}

        {/* Section 02: Project Overview */}
        {hasOverview ? (
          <ScrollReveal animationClass="animate-editorial-fade">
            <section
              className={styles.section}
              aria-labelledby="section-overview-title"
            >
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIndex}>[{overviewIndex}]</span>
                <h2
                  id="section-overview-title"
                  className={styles.sectionTitle}
                >
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

                {project.claimBoundary ? (
                  <div className={styles.claimBoundaryCard}>
                    <div className={styles.claimBoundaryTag}>
                      <span aria-hidden="true">■</span>
                      <span>
                        {project.claimBoundaryTag?.[locale] ??
                          copy.claimBoundaryTag}
                      </span>
                    </div>
                    <p className={styles.claimBoundaryText}>
                      {project.claimBoundary[locale]}
                    </p>
                  </div>
                ) : null}
              </div>
            </section>
          </ScrollReveal>
        ) : null}

        {/* Section 03: My Contribution */}
        {hasContribution ? (
          <ScrollReveal animationClass="animate-editorial-fade">
            <section
              className={styles.section}
              aria-labelledby="section-contribution-title"
            >
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIndex}>
                  [{contributionIndex}]
                </span>
                <h2
                  id="section-contribution-title"
                  className={styles.sectionTitle}
                >
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

                {project.personalTechStack ||
                (project.slug === "ihealth-edu" && project.techStack) ? (
                  <div className={styles.personalStackBlock}>
                    <span className={styles.subBlockLabel}>
                      <span aria-hidden="true">■</span>
                      <span>
                        {project.personalStackTag?.[locale] ??
                          copy.personalStackTag}
                      </span>
                    </span>
                    <ul className={styles.personalStackList}>
                      {(
                        project.personalTechStack ?? project.techStack
                      ).map((tech) => (
                        <li key={tech} className={styles.stackBadge}>
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          </ScrollReveal>
        ) : null}

        {/* Section 04: System Scope */}
        {hasScope ? (
          <ScrollReveal animationClass="animate-editorial-fade">
            <section
              className={styles.section}
              aria-labelledby="section-scope-title"
            >
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIndex}>[{scopeIndex}]</span>
                <h2
                  id="section-scope-title"
                  className={styles.sectionTitle}
                >
                  {copy.scopeTitle}
                </h2>
              </div>
              <div className={styles.sectionBody}>
                {/* 1. Integrated Modules */}
                {project.modules && project.modules.length > 0 ? (
                  <div className={styles.scopeSubBlock}>
                    <div className={styles.subBlockHeader}>
                      <span className={styles.subBlockHeaderTag}>■</span>
                      <span>{copy.modulesSubtag}</span>
                    </div>
                    <ol className={styles.modulesGrid}>
                      {project.modules.map((moduleName, index) => (
                        <li key={moduleName} className={styles.moduleItem}>
                          <span
                            className={styles.moduleNum}
                            aria-hidden="true"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{moduleName}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}

                {/* 2. Technology Groups */}
                {project.technologyGroups &&
                project.technologyGroups.length > 0 ? (
                  <div className={styles.scopeSubBlock}>
                    <div className={styles.subBlockHeader}>
                      <span className={styles.subBlockHeaderTag}>■</span>
                      <span>{copy.techSubtag}</span>
                    </div>
                    <ul className={styles.techGroupsList}>
                      {project.technologyGroups.map((group) => (
                        <li
                          key={group.category}
                          className={styles.techGroupItem}
                        >
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

                {/* 3. System Scope Detailed Composite Groups */}
                {project.systemScope ? (
                  <div className={styles.systemScopeGrid}>
                    {/* User Roles */}
                    {project.systemScope.userRoles &&
                    project.systemScope.userRoles.length > 0 ? (
                      <div className={styles.scopeGroup}>
                        <div className={styles.scopeGroupHeader}>
                          <span className={styles.scopeGroupHeaderTag}>■</span>
                          <span>{copy.scopeRolesHeader}</span>
                        </div>
                        <div className={styles.scopeGroupBody}>
                          <ul className={styles.roleList}>
                            {project.systemScope.userRoles.map((role) => (
                              <li
                                key={role.name.en}
                                className={styles.roleItem}
                              >
                                <span className={styles.roleName}>
                                  {role.name[locale]}
                                </span>
                                <p className={styles.roleDescription}>
                                  {role.description[locale]}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : null}

                    {/* Screening & Education */}
                    {project.systemScope.screeningEducation ? (
                      <div className={styles.scopeGroup}>
                        <div className={styles.scopeGroupHeader}>
                          <span className={styles.scopeGroupHeaderTag}>■</span>
                          <span>{copy.scopeScreeningHeader}</span>
                        </div>
                        <div className={styles.scopeGroupBody}>
                          <div className={styles.scopeSubSection}>
                            <span className={styles.subSectionTitle}>
                              {copy.screeningModulesLabel}
                            </span>
                            <div className={styles.tagRow}>
                              {project.systemScope.screeningEducation.screeningModules.map(
                                (mod) => (
                                  <span key={mod} className={styles.tagPill}>
                                    {mod}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>

                          <div className={styles.scopeSubSection}>
                            <span className={styles.subSectionTitle}>
                              {copy.educationAreasLabel}
                            </span>
                            <div className={styles.tagRow}>
                              {project.systemScope.screeningEducation.educationAreas[
                                locale
                              ].map((area) => (
                                <span key={area} className={styles.tagPill}>
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className={styles.scopeSubSection}>
                            <span className={styles.subSectionTitle}>
                              {copy.learningSequenceLabel}
                            </span>
                            <div className={styles.learningFlow}>
                              {
                                project.systemScope.screeningEducation
                                  .learningSequence[locale]
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {/* Patient Data */}
                    {project.systemScope.patientData &&
                    project.systemScope.patientData.length > 0 ? (
                      <div className={styles.scopeGroup}>
                        <div className={styles.scopeGroupHeader}>
                          <span className={styles.scopeGroupHeaderTag}>■</span>
                          <span>{copy.scopePatientDataHeader}</span>
                        </div>
                        <div className={styles.scopeGroupBody}>
                          <div className={styles.dataGroupList}>
                            {project.systemScope.patientData.map(
                              (dataGroup) => (
                                <div
                                  key={dataGroup.title.en}
                                  className={styles.dataGroupItem}
                                >
                                  <span className={styles.dataGroupTitle}>
                                    {dataGroup.title[locale]}
                                  </span>
                                  <p className={styles.dataGroupValues}>
                                    {dataGroup.items[locale].join(", ")}
                                  </p>
                                  {dataGroup.note ? (
                                    <p className={styles.dataGroupNote}>
                                      {dataGroup.note[locale]}
                                    </p>
                                  ) : null}
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {/* System Integrations */}
                    {project.systemScope.integrationFlows &&
                    project.systemScope.integrationFlows.length > 0 ? (
                      <div className={styles.scopeGroup}>
                        <div className={styles.scopeGroupHeader}>
                          <span className={styles.scopeGroupHeaderTag}>■</span>
                          <span>{copy.scopeIntegrationHeader}</span>
                        </div>
                        <div className={styles.scopeGroupBody}>
                          <div className={styles.flowList}>
                            {project.systemScope.integrationFlows.map(
                              (flow, index) => (
                                <div key={index} className={styles.flowItem}>
                                  {flow.label ? (
                                    <span className={styles.flowLabel}>
                                      {flow.label[locale]}
                                    </span>
                                  ) : null}
                                  <div className={styles.flowContainer}>
                                    {flow.steps.map((step, sIdx) => (
                                      <span
                                        key={sIdx}
                                        className="inline-flex items-center gap-1.5"
                                      >
                                        <span className={styles.flowStep}>
                                          {step}
                                        </span>
                                        {sIdx < flow.steps.length - 1 ? (
                                          <span
                                            className={styles.flowArrow}
                                            aria-hidden="true"
                                          >
                                            →
                                          </span>
                                        ) : null}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                          <p className={styles.architectureNote}>
                            {copy.architectureNote}
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {/* 4. Key Technical Notes */}
                {project.technicalNotes?.[locale] &&
                project.technicalNotes[locale].length > 0 &&
                !project.systemScope &&
                !project.modules ? (
                  <div className={styles.scopeSubBlock}>
                    <div className={styles.subBlockHeader}>
                      <span className={styles.subBlockHeaderTag}>■</span>
                      <span>{copy.techNotesSubtag}</span>
                    </div>
                    <ol className={styles.techNotesGrid}>
                      {project.technicalNotes[locale].map((note, index) => (
                        <li key={index} className={styles.techNoteItem}>
                          <span className={styles.techNoteNum} aria-hidden="true">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className={styles.techNoteText}>{note}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}

                {/* 5. Tech Stack Directory */}
                {project.techStack &&
                project.techStack.length > 0 &&
                !project.technologyGroups &&
                !project.personalTechStack &&
                project.slug !== "ihealth-edu" ? (
                  <div className={styles.scopeSubBlock}>
                    <div className={styles.subBlockHeader}>
                      <span className={styles.subBlockHeaderTag}>■</span>
                      <span>{copy.techStackSubtag}</span>
                    </div>
                    <ul className={styles.techStackBadges}>
                      {project.techStack.map((tech) => (
                        <li key={tech} className={styles.stackBadge}>
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          </ScrollReveal>
        ) : null}
      </div>

      {/* Synchronized Accessible Lightbox Inspection Dialog */}
      {isLightboxOpen && currentSlide ? (
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
            {slides.length > 1 ? (
              <button
                type="button"
                onClick={goToPrev}
                className={styles.lightboxNavBtn}
                aria-label={copy.prevSlide}
              >
                ←
              </button>
            ) : null}

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

            {slides.length > 1 ? (
              <button
                type="button"
                onClick={goToNext}
                className={styles.lightboxNavBtn}
                aria-label={copy.nextSlide}
              >
                →
              </button>
            ) : null}
          </div>

          <div className={styles.lightboxFooter}>
            <p className="m-0">{currentSlide.caption[locale]}</p>
            {slides.length > 1 ? (
              <span className={styles.lightboxCounter}>
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
    </article>
  );
}

// Aliases to preserve backward compatibility if imported elsewhere
export const UkgCaseStudyView = ProjectDetailView;
export const IHealthCaseStudyView = ProjectDetailView;
