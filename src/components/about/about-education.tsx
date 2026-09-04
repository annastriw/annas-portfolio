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
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  // Handle Escape key, focus trapping & body scroll lock for modal
  useEffect(() => {
    if (!isModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Reset scroll position to top
    if (imageWrapperRef.current) {
      imageWrapperRef.current.scrollTop = 0;
    }

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

  return (
    <section
      className="about-education-section py-6 sm:py-8 md:py-10 lg:py-12 border-b border-(--color-border)"
      aria-label={isId ? "Pendidikan & Rekayasa Akademik" : "Education & Academic Record"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5 sm:gap-6">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col gap-2 max-w-3xl">
          <div className="section-header-meta flex items-center gap-3 font-mono text-xs text-(--color-muted)">
            <span className="font-semibold text-(--color-accent)">
              {isId ? "[02 // PENDIDIKAN]" : "[02 // EDUCATION]"}
            </span>
          </div>
          <h2 className="section-title font-serif text-3xl sm:text-4xl text-(--color-foreground) font-normal m-0 tracking-tight">
            {data.title[locale]}
          </h2>
        </ScrollReveal>

        {/* Education Spread: Academic Record & Thesis (Left) + Bachelor Certificate (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] xl:grid-cols-[1.4fr_1fr] gap-6 lg:gap-10 items-start">
          {/* Left Column: Academic Credentials Record & Thesis */}
          <ScrollReveal
            delayMs={100}
            className="flex flex-col gap-4 sm:gap-5"
          >
            {/* Degree & Institution */}
            <div className="flex flex-col gap-1.5">
              <h3 className="font-serif text-2xl sm:text-3xl text-(--color-foreground) font-normal m-0 tracking-tight leading-snug">
                {data.degree[locale]}
              </h3>
              <p className="font-sans text-base sm:text-lg font-medium text-(--color-foreground) m-0">
                {data.institution[locale]}
              </p>
            </div>

            {/* Editorial Metadata Row with Thin Rules */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-(--color-muted) py-2 border-y border-(--color-border)">
              <span>{data.period[locale]}</span>
              <span className="text-(--color-border)" aria-hidden="true">
                /
              </span>
              <span>{isId ? `IPK ${data.gpa}` : `GPA ${data.gpa}`}</span>
              <span className="text-(--color-border)" aria-hidden="true">
                /
              </span>
              <span className="text-(--color-accent) font-semibold">
                {data.status[locale]}
              </span>
            </div>

            {/* Approved Education Summary */}
            <p className="text-sm sm:text-base text-(--color-muted) leading-relaxed m-0 max-w-[65ch]">
              {data.summary[locale]}
            </p>

            {/* Full Bilingual Undergraduate Thesis Record */}
            <div className="flex flex-col gap-2 pt-4 sm:pt-5 border-t border-(--color-border) max-w-[65ch]">
              <span className="font-mono text-xs font-semibold text-(--color-accent) uppercase tracking-wider">
                {data.thesis.label[locale]}
              </span>
              <h4 className="font-serif text-lg sm:text-xl text-(--color-foreground) font-normal m-0 tracking-tight leading-snug">
                {data.thesis.title[locale]}
              </h4>
            </div>
          </ScrollReveal>

          {/* Right Column: Bachelor Certificate Document Evidence */}
          <ScrollReveal
            delayMs={150}
            className="flex flex-col gap-2"
          >
            <figure className="m-0 flex flex-col gap-2 w-full">
              <div className="flex justify-between items-center font-mono text-[11px] text-(--color-muted) px-0.5">
                <span className="font-semibold text-(--color-foreground)">
                  {data.bachelorCertificate.figureLabel}
                </span>
                <span className="text-(--color-accent)">
                  {data.bachelorCertificate.year}
                </span>
              </div>

              {/* Certificate Interactive Preview Card */}
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="group relative border border-(--color-border) bg-(--color-background) aspect-[16/11] overflow-hidden cursor-pointer hover:border-(--color-accent) active:scale-[0.99] active:opacity-85 transition-all duration-150 text-left p-0 w-full rounded-[2px]"
                aria-label={`${data.bachelorCertificate.inspectLabel[locale]}: ${data.degree[locale]}`}
              >
                <Image
                  src={data.bachelorCertificate.assetPath}
                  alt={data.bachelorCertificate.alt[locale]}
                  width={700}
                  height={480}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                  className="object-contain w-full h-full p-2 transition-transform duration-200 group-hover:scale-[1.01]"
                  loading="lazy"
                />

                {/* Hover Inspection Overlay */}
                <div className="absolute inset-0 bg-(--color-foreground)/75 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 flex flex-col items-center justify-center gap-1 text-(--color-background)">
                  <span className="text-xl leading-none" aria-hidden="true">
                    ⊕
                  </span>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                    {data.bachelorCertificate.inspectLabel[locale]}
                  </span>
                </div>
              </button>
            </figure>
          </ScrollReveal>
        </div>
      </div>

      {/* Accessible Dialog Modal for Bachelor Certificate */}
      {isModalOpen && (
        <div
          className="cert-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bachelor-cert-dialog-heading"
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
                  {data.bachelorCertificate.badge[locale]}
                </span>
                <h3
                  id="bachelor-cert-dialog-heading"
                  className="cert-modal-heading"
                >
                  Bachelor Certificate
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
                aria-label={data.bachelorCertificate.closeLabel[locale]}
              >
                ✕
              </button>
            </div>

            <div
              ref={imageWrapperRef}
              className="cert-modal-image-wrapper"
              tabIndex={0}
              role="region"
              aria-label={
                isId
                  ? "Pratinjau sertifikat sarjana yang dapat digulir"
                  : "Scrollable preview of bachelor certificate"
              }
            >
              <Image
                src={data.bachelorCertificate.assetPath}
                alt={data.bachelorCertificate.alt[locale]}
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
