"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import type {
  ProjectCaseStudy,
  ProjectCaseStudyLocale,
} from "@/content/projects/project-case-studies";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  ProjectDetailView,
  isSharedProjectDetail,
} from "./project-detail-view";

import styles from "./project-case-study.module.css";

interface ProjectCaseStudyViewProps {
  project: ProjectCaseStudy;
  locale: ProjectCaseStudyLocale;
  previous: ProjectCaseStudy | null;
  next: ProjectCaseStudy | null;
}

interface MediaItem {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
  readonly format: "cover" | "wide" | "mobile";
}

function EditorialList({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.editorialList}>
      {items.map((item, index) => (
        <li key={item} className={styles.editorialListItem}>
          <span className={styles.listIndex} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function StandardCaseStudyView({
  project,
  locale,
  previous,
  next,
}: ProjectCaseStudyViewProps) {
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);
  const activeTriggerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const isId = locale === "id";
  const projectsHref = `/${locale}/projects`;

  const copy = {
    back: isId ? "Kembali ke Proyek" : "Back to Projects",
    overview: isId ? "Ringkasan" : "Overview",
    contribution: isId ? "Kontribusi Saya" : "My Contribution",
    technical: isId ? "Catatan Teknis Utama" : "Key Technical Notes",
    evidence: isId ? "Bukti Visual" : "Visual Evidence",
    stack: "Tech Stack",
    status: isId ? "Status & Tautan" : "Status & Link",
    role: isId ? "Peran" : "Role",
    period: isId ? "Periode" : "Period",
    verifiedStatus: isId ? "Status terverifikasi" : "Verified status",
    openLive: isId ? "Buka sistem live" : "Visit live system",
    noPublicLink: isId
      ? "Kode sumber atau sistem bersifat internal/tertutup."
      : "Source repository or production deployment is private.",
    previous: isId ? "Proyek sebelumnya" : "Previous project",
    next: isId ? "Proyek berikutnya" : "Next project",
    start: isId ? "Awal arsip" : "Start of archive",
    end: isId ? "Akhir arsip" : "End of archive",
    claim: isId ? "Batas klaim" : "Claim boundary",
    inspect: isId ? "Perbesar Bukti" : "Inspect Figure",
    inspectHint: isId ? "Klik untuk melihat resolusi penuh" : "Click to inspect in full resolution",
    closeLightbox: isId ? "Tutup" : "Close",
    videoDemo: isId ? "Rekaman Demonstrasi Video" : "Video Demonstration Record",
    videoTag: isId ? "[04.V // VIDEO DEMO]" : "[04.V // VIDEO DEMO]",
    videoDesc: isId
      ? "Demonstrasi alur pencetakan Android PrintService menuju thermal printer Bluetooth ESC/POS."
      : "Demonstration of the Android PrintService workflow output to a Bluetooth ESC/POS thermal printer.",
  };

  // Compile full inspectable media list (Cover + Figures)
  const mediaItems = useMemo<MediaItem[]>(() => {
    const items: MediaItem[] = [
      {
        id: "COVER",
        src: project.cover.src,
        alt: project.cover.alt[locale],
        caption: `${project.title[locale]} · ${project.cover.alt[locale]}`,
        format: "cover",
      },
    ];

    for (const figure of project.evidence) {
      items.push({
        id: figure.id,
        src: figure.src,
        alt: figure.alt[locale],
        caption: `${figure.id}: ${figure.caption[locale]}`,
        format: figure.format,
      });
    }

    return items;
  }, [project, locale]);

  const handleCloseLightbox = () => {
    setActiveMediaIndex(null);
    activeTriggerRef.current?.focus();
  };

  // Handle Lightbox keyboard shortcuts, focus trap & body scroll lock
  useEffect(() => {
    if (activeMediaIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Set initial focus on close button
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseLightbox();
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveMediaIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : mediaItems.length - 1,
        );
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveMediaIndex((prev) =>
          prev !== null && prev < mediaItems.length - 1 ? prev + 1 : 0,
        );
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
  }, [activeMediaIndex, mediaItems.length]);

  const activeMedia =
    activeMediaIndex !== null ? mediaItems[activeMediaIndex] : null;

  return (
    <article className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumb} aria-label={copy.back}>
          <Link href={projectsHref} className={styles.backLink}>
            <span className={styles.backArrow} aria-hidden="true">
              ←
            </span>
            <span>{copy.back}</span>
          </Link>
          <span className={styles.routePath} aria-hidden="true">
            [INDEX // {project.index}] / {locale.toUpperCase()} / PROJECTS /{" "}
            {project.slug}
          </span>
        </nav>

        {/* Project Header Masthead */}
        <ScrollReveal animationClass="animate-editorial-fade">
          <header className={styles.header}>
            <div className={styles.headerIndex} aria-hidden="true">
              {project.index}
            </div>
            <div className={styles.headerNarrative}>
              <div className={styles.categoryTag}>
                <span className={styles.categoryTagDot} aria-hidden="true">
                  ●
                </span>
                <span>
                  [{project.index} {"//"} {project.categoryLabel[locale]}]
                </span>
              </div>
              <h1 className={styles.title}>{project.title[locale]}</h1>
              <ul className={styles.compactStack} aria-label={copy.stack}>
                {project.techStack.map((technology) => (
                  <li key={technology} className={styles.compactStackTag}>
                    {technology}
                  </li>
                ))}
              </ul>
            </div>
            <dl className={styles.headerMeta}>
              <div className={styles.metaRow}>
                <dt>{copy.role}</dt>
                <dd>{project.role[locale]}</dd>
              </div>
              {project.period ? (
                <div className={styles.metaRow}>
                  <dt>{copy.period}</dt>
                  <dd>{project.period[locale]}</dd>
                </div>
              ) : null}
              <div className={styles.metaRow}>
                <dt>{copy.verifiedStatus}</dt>
                <dd>{project.status[locale]}</dd>
              </div>
            </dl>
          </header>
        </ScrollReveal>

        {/* Hero Cover Frame (3:2 Aspect Ratio) */}
        <ScrollReveal animationClass="animate-editorial-fade" delayMs={50}>
          <figure className={styles.coverFigure}>
            <div
              className={styles.coverFrame}
              onClick={(e) => {
                activeTriggerRef.current = e.currentTarget;
                setActiveMediaIndex(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  activeTriggerRef.current = e.currentTarget;
                  setActiveMediaIndex(0);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${copy.inspect}: ${project.title[locale]} Cover`}
            >
              <Image
                src={project.cover.src}
                alt={project.cover.alt[locale]}
                fill
                priority
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1536px) calc(100vw - 4rem), 1440px"
                className={`${styles.coverImage} ${
                  project.cover.position === "top"
                    ? styles.imageTop
                    : styles.imageCenter
                }`}
              />
              <div className={styles.coverInspectOverlay} aria-hidden="true">
                <span className={styles.inspectBadge}>
                  🔍 {copy.inspect}
                </span>
              </div>
            </div>
            <figcaption className={styles.coverCaption}>
              <span>[COVER]</span>
              <span>{project.cover.alt[locale]}</span>
            </figcaption>
          </figure>
        </ScrollReveal>

        {/* Case Study Core Body */}
        <div className={styles.caseStudy}>
          {/* Section 01: Overview & Claim Boundaries */}
          <ScrollReveal animationClass="animate-editorial-fade">
            <section
              className={`${styles.section} ${styles.overviewSection}`}
              aria-labelledby="section-01-title"
            >
              <div className={styles.sectionLabel}>
                <span>[01]</span>
                <h2 id="section-01-title">{copy.overview}</h2>
              </div>
              <div className={styles.overviewCopy}>
                {project.overview[locale].map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {project.claimBoundary ? (
                  <aside
                    className={styles.claimBoundary}
                    role="note"
                    aria-label={copy.claim}
                  >
                    <span>{copy.claim}</span>
                    <p>{project.claimBoundary[locale]}</p>
                  </aside>
                ) : null}
              </div>
            </section>
          </ScrollReveal>

          {/* Section 02 & 03: Contribution & Key Technical Notes */}
          <ScrollReveal animationClass="animate-editorial-fade">
            <div className={styles.splitSections}>
              <section
                className={styles.section}
                aria-labelledby="section-02-title"
              >
                <div className={styles.sectionLabel}>
                  <span>[02]</span>
                  <h2 id="section-02-title">{copy.contribution}</h2>
                </div>
                <EditorialList items={project.contributions[locale]} />
              </section>

              <section
                className={styles.section}
                aria-labelledby="section-03-title"
              >
                <div className={styles.sectionLabel}>
                  <span>[03]</span>
                  <h2 id="section-03-title">{copy.technical}</h2>
                </div>
                <EditorialList items={project.technicalNotes[locale]} />
              </section>
            </div>
          </ScrollReveal>

          {/* Section 04: Visual Evidence Gallery & Optional Video Record */}
          <ScrollReveal animationClass="animate-editorial-fade">
            <section
              className={`${styles.section} ${styles.evidenceSection}`}
              aria-labelledby="section-04-title"
            >
              <div className={styles.evidenceSectionHeader}>
                <div className={styles.sectionLabel}>
                  <span>[04]</span>
                  <h2 id="section-04-title">{copy.evidence}</h2>
                </div>
                <span className={styles.evidenceHint} aria-hidden="true">
                  {copy.inspectHint}
                </span>
              </div>

              <div
                className={`${styles.evidenceGrid} ${
                  project.evidence.every((figure) => figure.format === "mobile")
                    ? styles.mobileEvidenceGrid
                    : ""
                }`}
              >
                {project.evidence.map((figure, idx) => {
                  const mediaIndex = idx + 1; // index 0 is cover
                  return (
                    <figure key={figure.id} className={styles.evidenceFigure}>
                      <div
                        className={`${styles.evidenceFrame} ${
                          figure.format === "mobile"
                            ? styles.mobileFrame
                            : styles.wideFrame
                        }`}
                        onClick={(e) => {
                          activeTriggerRef.current = e.currentTarget;
                          setActiveMediaIndex(mediaIndex);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            activeTriggerRef.current = e.currentTarget;
                            setActiveMediaIndex(mediaIndex);
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={`${copy.inspect}: ${figure.id} ${figure.alt[locale]}`}
                      >
                        <Image
                          src={figure.src}
                          alt={figure.alt[locale]}
                          fill
                          loading="lazy"
                          sizes={
                            figure.format === "mobile"
                              ? "(max-width: 767px) 85vw, 380px"
                              : "(max-width: 767px) calc(100vw - 2rem), (max-width: 1280px) calc(100vw - 4rem), 1280px"
                          }
                          className={styles.evidenceImage}
                        />
                      </div>
                      <figcaption className={styles.figureCaption}>
                        <span className={styles.figureId}>{figure.id}</span>
                        <span>{figure.caption[locale]}</span>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>

              {/* Optional Thermal Printer Service Video Demonstration */}
              {project.videoSrc ? (
                <div className={styles.videoEvidenceCard}>
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
            </section>
          </ScrollReveal>

          {/* Section 05 & 06: Tech Stack & Verified Status */}
          <ScrollReveal animationClass="animate-editorial-fade">
            <div className={styles.closingGrid}>
              <section
                className={styles.section}
                aria-labelledby="section-05-title"
              >
                <div className={styles.sectionLabel}>
                  <span>[05]</span>
                  <h2 id="section-05-title">{copy.stack}</h2>
                </div>
                <ul className={styles.stackDirectory}>
                  {project.techStack.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </section>

              <section
                className={styles.section}
                aria-labelledby="section-06-title"
              >
                <div className={styles.sectionLabel}>
                  <span>[06]</span>
                  <h2 id="section-06-title">{copy.status}</h2>
                </div>
                <div className={styles.statusBlock}>
                  <p>{project.status[locale]}</p>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.liveLink}
                      aria-label={`${copy.openLive}: ${project.title[locale]} (external)`}
                    >
                      <span>{copy.openLive}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className={styles.noLink}>{copy.noPublicLink}</span>
                  )}
                </div>
              </section>
            </div>
          </ScrollReveal>
        </div>

        {/* Adjacent Project Navigation (Deterministic 01–10 Archive Order) */}
        <ScrollReveal animationClass="animate-editorial-fade">
          <nav
            className={styles.adjacentNav}
            aria-label={`${copy.previous} / ${copy.next}`}
          >
            <div className={styles.adjacentSlot}>
              {previous ? (
                <Link
                  href={`/${locale}/projects/${previous.slug}`}
                  className={styles.adjacentLink}
                >
                  <span>← {copy.previous}</span>
                  <strong>{previous.title[locale]}</strong>
                </Link>
              ) : (
                <span className={styles.adjacentDisabled}>
                  [01 {"//"} {copy.start}]
                </span>
              )}
            </div>

            <Link href={projectsHref} className={styles.archiveLink}>
              {copy.back}
            </Link>

            <div className={`${styles.adjacentSlot} ${styles.adjacentNext}`}>
              {next ? (
                <Link
                  href={`/${locale}/projects/${next.slug}`}
                  className={styles.adjacentLink}
                >
                  <span>{copy.next} →</span>
                  <strong>{next.title[locale]}</strong>
                </Link>
              ) : (
                <span className={styles.adjacentDisabled}>
                  [10 {"//"} {copy.end}]
                </span>
              )}
            </div>
          </nav>
        </ScrollReveal>
      </div>

      {/* Interactive Lightbox Inspection Dialog */}
      {activeMedia ? (
        <div
          ref={lightboxRef}
          className={styles.lightboxOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={`${copy.inspect}: ${activeMedia.caption}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseLightbox();
            }
          }}
        >
          {/* Lightbox Top Header */}
          <div className={styles.lightboxHeader}>
            <div className="flex items-center gap-2">
              <span className={styles.lightboxBadge}>
                [{activeMedia.id}]
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

          {/* Lightbox Center Media Canvas */}
          <div className={styles.lightboxMain}>
            <button
              type="button"
              onClick={() =>
                setActiveMediaIndex((prev) =>
                  prev !== null && prev > 0
                    ? prev - 1
                    : mediaItems.length - 1,
                )
              }
              className={styles.lightboxNavBtn}
              aria-label="Previous figure (Left arrow)"
            >
              ←
            </button>

            <div className={styles.lightboxMediaWrapper}>
              <Image
                src={activeMedia.src}
                alt={activeMedia.alt}
                fill
                priority
                className={styles.lightboxImage}
                sizes="90vw"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setActiveMediaIndex((prev) =>
                  prev !== null && prev < mediaItems.length - 1
                    ? prev + 1
                    : 0,
                )
              }
              className={styles.lightboxNavBtn}
              aria-label="Next figure (Right arrow)"
            >
              →
            </button>
          </div>

          {/* Lightbox Bottom Footer Caption */}
          <div className={styles.lightboxFooter}>
            <p className="m-0">{activeMedia.caption}</p>
            <span className={styles.lightboxCounter}>
              {activeMediaIndex !== null ? activeMediaIndex + 1 : 1} /{" "}
              {mediaItems.length}
            </span>
          </div>
        </div>
      ) : null}
    </article>
  );
}

export function ProjectCaseStudyView({
  project,
  locale,
  previous,
  next,
}: ProjectCaseStudyViewProps) {
  if (isSharedProjectDetail(project)) {
    return <ProjectDetailView project={project} locale={locale} />;
  }

  return (
    <StandardCaseStudyView
      project={project}
      locale={locale}
      previous={previous}
      next={next}
    />
  );
}

