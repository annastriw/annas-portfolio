"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { educationData } from "@/content/about/about-data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface AboutEducationProps {
  locale: Locale;
}

export function AboutEducation({ locale }: AboutEducationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isId = locale === "id";
  const data = educationData;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Handle Escape key, focus trapping & body scroll lock for modal
  useEffect(() => {
    if (!isModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Set initial focus to close button
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsModalOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && modalContentRef.current) {
        const focusableElements = Array.from(
          modalContentRef.current.querySelectorAll<HTMLElement>(
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
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    triggerRef.current?.focus();
  };

  const copy = {
    metaLine: isId
      ? `IPK ${data.gpa} · ${data.positioning[locale]}`
      : `GPA ${data.gpa} · ${data.positioning[locale]}`,
  };

  return (
    <section
      className="about-education-section py-8 sm:py-12 md:py-14 border-b border-(--color-border)"
      aria-label={data.title[locale]}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
        {/* Section Header */}
        <ScrollReveal
          animationClass="animate-editorial-fade"
          className="flex flex-col gap-2 max-w-3xl"
        >
          <div className="section-header-meta flex items-center gap-3 font-mono text-xs text-(--color-muted)">
            <span className="font-semibold text-(--color-accent)">
              {isId ? "[02 // PENDIDIKAN]" : "[02 // EDUCATION]"}
            </span>
            <span className="text-(--color-border)" aria-hidden="true">
              /
            </span>
            <span className="uppercase tracking-wider">{data.subtag[locale]}</span>
          </div>
          <h2 className="section-title font-serif text-3xl sm:text-4xl text-(--color-foreground) font-normal m-0 tracking-tight">
            {data.title[locale]}
          </h2>
        </ScrollReveal>

        {/* Education Spread: Degree Metadata (Left) + Bachelor Certificate Document (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] xl:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-start">
          {/* Left Column: Academic Credentials Record */}
          <ScrollReveal
            animationClass="animate-editorial-fade"
            className="flex flex-col gap-4"
          >
            {/* Degree & Field of Study */}
            <div className="flex flex-col gap-1">
              <h3 className="font-serif text-2xl sm:text-3xl text-(--color-foreground) font-normal m-0 tracking-tight">
                {data.degree[locale]}
              </h3>
              <p className="font-sans text-base sm:text-lg font-medium text-(--color-foreground) m-0">
                {data.institution[locale]}
              </p>
            </div>

            {/* Concise Meta Row */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-(--color-muted)">
              <span>{data.period[locale]}</span>
              <span className="text-(--color-border)" aria-hidden="true">
                /
              </span>
              <span className="text-(--color-accent) font-semibold">
                {copy.metaLine}
              </span>
            </div>

            {/* Summary Note */}
            <p className="text-sm sm:text-base text-(--color-muted) leading-relaxed m-0 pt-1 max-w-xl">
              {data.summary[locale]}
            </p>
          </ScrollReveal>

          {/* Right Column: Bachelor Certificate Document Evidence */}
          <ScrollReveal
            animationClass="animate-editorial-fade"
            className="flex flex-col gap-2"
          >
            <div className="flex justify-between items-center font-mono text-[11px] text-(--color-muted) px-0.5">
              <span className="font-semibold text-(--color-foreground)">
                {data.figureLabel[locale]}
              </span>
              <span className="text-(--color-accent)">2026</span>
            </div>

            {/* Certificate Interactive Preview Card */}
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="group relative border border-(--color-border) bg-(--color-background) aspect-[16/11] overflow-hidden cursor-pointer hover:border-(--color-accent) transition-all duration-300 text-left p-0 w-full rounded-[2px]"
              aria-label={`${data.inspectLabel[locale]}: ${data.degree[locale]}`}
            >
              <Image
                src={data.certificateAsset}
                alt={`Bachelor Certificate · ${data.institution[locale]}`}
                width={700}
                height={480}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                className="object-contain w-full h-full p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />

              {/* Hover Inspection Overlay */}
              <div className="absolute inset-0 bg-(--color-foreground)/75 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1 text-(--color-background)">
                <span className="text-xl leading-none" aria-hidden="true">
                  ⊕
                </span>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                  {data.inspectLabel[locale]}
                </span>
              </div>
            </button>

            <figcaption className="font-mono text-[11px] text-(--color-muted) px-1">
              {data.documentCaption[locale]}
            </figcaption>
          </ScrollReveal>
        </div>
      </div>

      {/* Lightbox Modal for Bachelor Certificate */}
      {isModalOpen && (
        <div
          className="cert-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={typeof data.figureLabel[locale] === "string" ? data.figureLabel[locale] : "Certificate"}
          onClick={handleCloseModal}
        >
          <div
            ref={modalContentRef}
            className="cert-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cert-modal-header">
              <div className="cert-modal-title-group">
                <span className="cert-modal-badge">
                  {isId ? "DOKUMEN AKADEMIK" : "ACADEMIC RECORD"}
                </span>
                <h3 className="cert-modal-heading">
                  {data.degree[locale]}
                </h3>
                <p className="cert-modal-issuer">
                  {data.institution[locale]} · {data.period[locale]}
                </p>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                className="cert-modal-close"
                onClick={handleCloseModal}
                aria-label={isId ? "Tutup pratinjau Bachelor Certificate" : "Close Bachelor Certificate preview"}
              >
                ✕
              </button>
            </div>

            <div className="cert-modal-image-wrapper">
              <Image
                src={data.certificateAsset}
                alt={`Bachelor Certificate · ${data.institution[locale]}`}
                width={1600}
                height={1100}
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="cert-modal-img object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

