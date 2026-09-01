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

import styles from "./ihealth-case-study.module.css";

interface IHealthCaseStudyViewProps {
  project: ProjectCaseStudy;
  locale: ProjectCaseStudyLocale;
}

export function IHealthCaseStudyView({
  project,
  locale,
}: IHealthCaseStudyViewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeTriggerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Touch tracking refs to enable mobile swipe gestures without hijacking vertical scroll
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null,
  );
  const isSwipingRef = useRef(false);

  const isId = locale === "id";
  const projectsHref = `/${locale}/projects`;

  const copy = {
    breadcrumbProjects: isId ? "Proyek" : "Projects",
    breadcrumbAria: isId ? "Navigasi breadcrumb" : "Breadcrumb navigation",
    stakeholder: isId ? "Stakeholder" : "Stakeholder",
    role: isId ? "Peran" : "Role",
    workingModel: isId ? "Model Kerja" : "Working Model",
    period: isId ? "Periode" : "Period",
    status: "Status",
    liveCta: isId ? "Buka Website" : "Visit Live Website",
    frontendRepo: isId
      ? "Lihat Repositori Frontend"
      : "View Frontend Repository",
    backendRepo: isId
      ? "Lihat Repositori Backend"
      : "View Backend Repository",
    newTabCue: isId ? "buka di tab baru" : "opens in new tab",
    galleryTitle: isId ? "Galeri Proyek" : "Project Gallery",
    carouselAria: isId
      ? "Galeri antarmuka platform iHealth Edu"
      : "iHealth Edu platform interface gallery carousel",
    prevSlide: isId
      ? "Slide sebelumnya (Panah Kiri)"
      : "Previous slide (Left Arrow)",
    nextSlide: isId
      ? "Slide berikutnya (Panah Kanan)"
      : "Next slide (Right Arrow)",
    inspect: isId ? "Perbesar Bukti" : "Inspect Figure",
    closeLightbox: isId ? "Tutup" : "Close",
    overviewTitle: isId ? "Gambaran Proyek" : "Project Overview",
    claimBoundaryTag: isId
      ? "[BATAS KLAIM // DECISION SUPPORT MEDIS]"
      : "[CLAIM BOUNDARY // MEDICAL DECISION SUPPORT]",
    contributionTitle: isId ? "Kontribusi Saya" : "My Contribution",
    personalStackTag: isId
      ? "Stack Teknologi Personal"
      : "Personal Technology Stack",
    scopeTitle: isId ? "Cakupan Sistem" : "System Scope",
    scopeRolesHeader: isId ? "01 // Peran Pengguna" : "01 // User Roles",
    scopeScreeningHeader: isId
      ? "02 // Screening & Edukasi"
      : "02 // Screening & Education",
    screeningModulesLabel: isId
      ? "Modul Screening"
      : "Screening Modules",
    educationAreasLabel: isId
      ? "Topik Edukasi"
      : "Education Tracks",
    learningSequenceLabel: isId
      ? "Alur Pembelajaran"
      : "Learning Sequence",
    scopePatientDataHeader: isId
      ? "03 // Data Pasien"
      : "03 // Patient Data",
    scopeIntegrationHeader: isId
      ? "04 // Integrasi Sistem"
      : "04 // System Integrations",
    architectureNote: isId
      ? "Arsitektur mencakup integrasi IoT dan ML ke dalam antarmuka Next.js; pengembangan frontend dan integrasi UI merupakan lingkup kontribusi Annas."
      : "Architecture includes backend, IoT, and ML services integrated into the Next.js interface; Annas's direct contribution focuses on UI/UX, frontend engineering, and client-level integrations.",
  };

  // Authoritative 8-slide gallery dataset from project content
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
              en: "TODO_IHEALTH_CAPTION_01_EN",
              id: "TODO_IHEALTH_CAPTION_01_ID",
            },
          },
        ];

  const currentSlide = slides[activeIndex] ?? slides[0];

  // Carousel navigation handlers with seamless wrap-around edge behavior
  const handlePrevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  }, [slides.length]);

  const handleNextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  }, [slides.length]);

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
        handleNextSlide();
      } else {
        handlePrevSlide();
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
      handlePrevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNextSlide();
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
        handlePrevSlide();
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextSlide();
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
  }, [isLightboxOpen, handleCloseLightbox, handleNextSlide, handlePrevSlide]);

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

        {/* Opening Section with Split Composition */}
        <ScrollReveal animationClass="animate-editorial-fade">
          <header className={styles.opening}>
            <div className={styles.openingSplit}>
              {/* Left: Category, Title, Metadata Grid */}
              <div className={styles.openingLeft}>
                <span className={styles.categoryLabel}>
                  {project.categoryLabel[locale]}
                </span>
                <h1 className={styles.title}>{project.title[locale]}</h1>

                <dl className={styles.metaGrid}>
                  <div className={styles.metaItem}>
                    <dt>{copy.stakeholder}</dt>
                    <dd>{project.client?.[locale] ?? "Puskesmas Padangsari"}</dd>
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
              </div>

              {/* Right: Lead & Project Links */}
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
                </div>
              </div>
            </div>
          </header>
        </ScrollReveal>

        {/* Section 01: Project Gallery / Galeri Proyek */}
        <ScrollReveal animationClass="animate-editorial-fade">
          <section
            className={styles.section}
            aria-labelledby="ihealth-section-01-title"
          >
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIndex}>[01]</span>
              <h2 id="ihealth-section-01-title" className={styles.sectionTitle}>
                {copy.galleryTitle}
              </h2>
            </div>
            <div className={styles.sectionBody}>
              <figure
                className={styles.galleryFigure}
                role="region"
                aria-roledescription="carousel"
                aria-label={copy.carouselAria}
              >
                {/* Responsive Display Frame */}
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
                  <Image
                    src={currentSlide.src}
                    alt={currentSlide.alt[locale]}
                    fill
                    priority={activeIndex === 0}
                    sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1536px) calc(100vw - 4rem), 1440px"
                    className={styles.galleryImage}
                  />
                  <div
                    className={styles.galleryInspectOverlay}
                    aria-hidden="true"
                  >
                    <span className={styles.inspectBadge}>
                      🔍 {copy.inspect}
                    </span>
                  </div>
                </div>

                {/* Bottom Bar: Caption on Left, Counter & Nav Controls on Right */}
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
                        onClick={handlePrevSlide}
                        className={styles.galleryNavBtn}
                        aria-label={copy.prevSlide}
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={handleNextSlide}
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

        {/* Section 02: Project Overview / Gambaran Proyek */}
        <ScrollReveal animationClass="animate-editorial-fade">
          <section
            className={styles.section}
            aria-labelledby="ihealth-section-02-title"
          >
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIndex}>[02]</span>
              <h2 id="ihealth-section-02-title" className={styles.sectionTitle}>
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

              {/* Visible Medical Decision Support Claim Boundary Notice */}
              {project.claimBoundary ? (
                <div className={styles.claimBoundaryCard}>
                  <div className={styles.claimBoundaryTag}>
                    <span aria-hidden="true">■</span>
                    <span>{copy.claimBoundaryTag}</span>
                  </div>
                  <p className={styles.claimBoundaryText}>
                    {project.claimBoundary[locale]}
                  </p>
                </div>
              ) : null}
            </div>
          </section>
        </ScrollReveal>

        {/* Section 03: My Contribution / Kontribusi Saya */}
        <ScrollReveal animationClass="animate-editorial-fade">
          <section
            className={styles.section}
            aria-labelledby="ihealth-section-03-title"
          >
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIndex}>[03]</span>
              <h2 id="ihealth-section-03-title" className={styles.sectionTitle}>
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

              {/* Personal Technology Stack */}
              <div className={styles.personalStackBlock}>
                <span className={styles.subBlockLabel}>
                  <span aria-hidden="true">■</span>
                  <span>{copy.personalStackTag}</span>
                </span>
                <ul className={styles.personalStackList}>
                  {project.techStack.map((tech) => (
                    <li key={tech} className={styles.stackBadge}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Section 04: System Scope / Cakupan Sistem */}
        <ScrollReveal animationClass="animate-editorial-fade">
          <section
            className={styles.section}
            aria-labelledby="ihealth-section-04-title"
          >
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIndex}>[04]</span>
              <h2 id="ihealth-section-04-title" className={styles.sectionTitle}>
                {copy.scopeTitle}
              </h2>
            </div>
            <div className={styles.sectionBody}>
              <div className={styles.systemScopeGrid}>
                {/* Group 1: User Roles */}
                {project.systemScope?.userRoles ? (
                  <div className={styles.scopeGroup}>
                    <div className={styles.scopeGroupHeader}>
                      <span className={styles.scopeGroupHeaderTag}>■</span>
                      <span>{copy.scopeRolesHeader}</span>
                    </div>
                    <div className={styles.scopeGroupBody}>
                      <ul className={styles.roleList}>
                        {project.systemScope.userRoles.map((role) => (
                          <li key={role.name.en} className={styles.roleItem}>
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

                {/* Group 2: Screening & Education */}
                {project.systemScope?.screeningEducation ? (
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

                {/* Group 3: Patient Data */}
                {project.systemScope?.patientData ? (
                  <div className={styles.scopeGroup}>
                    <div className={styles.scopeGroupHeader}>
                      <span className={styles.scopeGroupHeaderTag}>■</span>
                      <span>{copy.scopePatientDataHeader}</span>
                    </div>
                    <div className={styles.scopeGroupBody}>
                      <div className={styles.dataGroupList}>
                        {project.systemScope.patientData.map((dataGroup) => (
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
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Group 4: System Integrations */}
                {project.systemScope?.integrationFlows ? (
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
            </div>
          </section>
        </ScrollReveal>
      </div>

      {/* Accessible Lightbox Inspection Dialog */}
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
              onClick={handlePrevSlide}
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
              onClick={handleNextSlide}
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
