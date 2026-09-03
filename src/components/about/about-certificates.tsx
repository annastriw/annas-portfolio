"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { CertificateData, CredentialFilter } from "@/content/about/about-data";
import {
  certificatesData,
  credentialFilters,
  credentialSectionCopy,
} from "@/content/about/about-data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface AboutCertificatesProps {
  locale: Locale;
}

type CertFilterCategory = CredentialFilter["key"];

export function AboutCertificates({ locale }: AboutCertificatesProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CertFilterCategory>("all");
  const [activeCertificate, setActiveCertificate] =
    useState<CertificateData | null>(null);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const isId = locale === "id";
  const copy = credentialSectionCopy;

  // Derive filter counts dynamically from authoritative data
  const filterOptions = useMemo(() => {
    return credentialFilters.map((f) => ({
      ...f,
      count:
        f.key === "all"
          ? certificatesData.length
          : certificatesData.filter((c) => c.category === f.key).length,
    }));
  }, []);

  const filteredCertificates = useMemo(() => {
    if (selectedCategory === "all") return certificatesData;
    return certificatesData.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  const handleCloseModal = () => {
    setActiveCertificate(null);
    activeTriggerRef.current?.focus();
  };

  // Handle Escape key, focus trapping & body scroll lock for modal
  useEffect(() => {
    if (!activeCertificate) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Set initial focus to close button
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseModal();
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
  }, [activeCertificate]);

  const filterGroupRef = useRef<HTMLDivElement>(null);

  const ensureButtonVisible = (buttonElement: HTMLElement) => {
    const container = filterGroupRef.current;
    if (!container) return;

    const buttonRect = buttonElement.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    if (buttonRect.left < containerRect.left) {
      container.scrollLeft += buttonRect.left - containerRect.left - 12;
    } else if (buttonRect.right > containerRect.right) {
      container.scrollLeft += buttonRect.right - containerRect.right + 12;
    }
  };

  const handleFilterSelect = (
    categoryKey: CertFilterCategory,
    buttonElement: HTMLElement,
  ) => {
    setSelectedCategory(categoryKey);
    ensureButtonVisible(buttonElement);
  };

  const visibleCertificateLabel = isId
    ? `${filteredCertificates.length} dari ${certificatesData.length} sertifikasi ditampilkan`
    : `Showing ${filteredCertificates.length} of ${certificatesData.length} certificates`;

  return (
    <section
      className="about-certificates-section py-6 sm:py-8 md:py-10 lg:py-12"
      aria-label={copy.title[locale]}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5 sm:gap-6">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col gap-2 max-w-3xl">
          <div className="section-header-meta flex items-center gap-3 font-mono text-xs text-(--color-muted)">
            <span className="font-semibold text-(--color-accent)">
              {isId ? "[03 // SERTIFIKASI]" : "[03 // CREDENTIALS]"}
            </span>
          </div>

          <h2 className="section-title font-serif text-3xl sm:text-4xl text-(--color-foreground) font-normal m-0 tracking-tight">
            {copy.title[locale]}
          </h2>

          <p className="section-subtitle text-sm sm:text-base text-(--color-muted) leading-relaxed m-0 max-w-[65ch]">
            {copy.summary[locale]}
          </p>
        </ScrollReveal>

        {/* Category Filter Controls: Projects Hub Text Tab Pattern */}
        <ScrollReveal delayMs={100}>
          <div className="border-b border-(--color-border) pb-0 mb-2">
            {/* Filter Header & Status */}
            <div className="flex items-center justify-between gap-4 pb-2 font-mono text-xs text-(--color-muted) tracking-wider uppercase">
              <div className="flex items-center gap-2 font-semibold text-(--color-foreground)">
                <span className="text-(--color-accent) text-[10px]">●</span>
                <span>{copy.accessibility.filterLabel[locale]}</span>
              </div>
              <span
                className="text-[11px] text-(--color-muted)"
                aria-live="polite"
                aria-atomic="true"
              >
                {visibleCertificateLabel}
              </span>
            </div>

            {/* Horizontally Scrollable Text Tabs */}
            <div
              ref={filterGroupRef}
              className="flex items-stretch gap-1 overflow-x-auto scrollbar-none -mx-1 px-1"
              role="tablist"
              aria-label={copy.accessibility.filterLabel[locale]}
            >
              {filterOptions.map((cat, idx) => {
                const isSelected = selectedCategory === cat.key;
                const prefix = `0${idx + 1}`;

                return (
                  <button
                    key={cat.key}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    tabIndex={0}
                    onClick={(e) => handleFilterSelect(cat.key, e.currentTarget)}
                    onFocus={(e) => ensureButtonVisible(e.currentTarget)}
                    className={`relative inline-flex items-center gap-2 px-3.5 py-2.5 min-h-[44px] border-0 bg-transparent font-mono text-xs transition-colors duration-150 cursor-pointer shrink-0 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-[-2px] active:scale-[0.98] ${
                      isSelected
                        ? "text-(--color-foreground) font-bold"
                        : "text-(--color-muted) hover:text-(--color-foreground) font-medium"
                    }`}
                  >
                    <span className="text-(--color-accent) text-[11px] font-semibold">
                      {prefix}
                    </span>
                    <span className="tracking-tight">{cat.label[locale]}</span>
                    <span className="text-[11px] opacity-75" aria-hidden="true">
                      [{String(cat.count).padStart(2, "0")}]
                    </span>
                    {isSelected && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-(--color-accent)"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Technical Editorial Archive Grid: Transition as one group */}
        <ScrollReveal delayMs={150}>
          <div
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 animate-editorial-fade motion-reduce:animate-none"
          >
            {filteredCertificates.map((cert) => {
              const masterIndex = certificatesData.findIndex(
                (c) => c.id === cert.id,
              );
              const figureNum = String(
                masterIndex >= 0 ? masterIndex + 1 : 1,
              ).padStart(2, "0");

              return (
                <article
                  key={cert.id}
                  className="border border-(--color-border) bg-(--color-background) flex flex-col hover:border-(--color-accent) transition-colors duration-200 rounded-[2px] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      activeTriggerRef.current = e.currentTarget;
                      setActiveCertificate(cert);
                    }}
                    aria-label={
                      isId
                        ? `Lihat sertifikat ${cert.title[locale]}`
                        : `Inspect certificate: ${cert.title[locale]}`
                    }
                    className="flex flex-col w-full h-full text-left p-0 border-0 bg-transparent cursor-pointer group focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-2 active:scale-[0.99] active:opacity-85 transition-all duration-150"
                  >
                    {/* Document Evidence Thumbnail */}
                    <div className="relative w-full aspect-[16/11] bg-(--color-surface-subtle) border-b border-(--color-border) overflow-hidden flex items-center justify-center">
                      <Image
                        src={cert.assetPath}
                        alt={
                          isId
                            ? `Sertifikat ${cert.title[locale]} - ${cert.issuer}`
                            : `Certificate for ${cert.title[locale]} issued by ${cert.issuer}`
                        }
                        width={600}
                        height={420}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain w-full h-full p-2 transition-transform duration-200 group-hover:scale-[1.02]"
                        loading="lazy"
                      />

                      {/* Subtle Hover Inspection Overlay */}
                      <div className="absolute inset-0 bg-(--color-foreground)/75 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 flex flex-col items-center justify-center gap-1.5 text-(--color-background)">
                        <span className="text-xl leading-none" aria-hidden="true">
                          ⊕
                        </span>
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                          {isId ? "Lihat Sertifikat" : "Inspect Certificate"}
                        </span>
                      </div>
                    </div>

                    {/* Card Body: Figure Number, Neutral Issuer, Official Title */}
                    <div className="p-4 sm:p-5 flex flex-col gap-2 flex-grow">
                      <div className="flex justify-between items-center font-mono text-[11px] text-(--color-muted)">
                        <span className="text-(--color-accent) font-semibold">
                          FIG.{figureNum}
                        </span>
                        <span className="font-medium text-(--color-foreground)/80">
                          {cert.issuer}
                        </span>
                      </div>

                      <h3 className="font-sans text-sm sm:text-base font-semibold text-(--color-foreground) leading-snug m-0">
                        {cert.title[locale]}
                      </h3>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        </ScrollReveal>
      </div>

      {/* Accessible Document Preview Modal */}
      {activeCertificate && (
        <div
          className="cert-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`cert-dialog-heading-${activeCertificate.id}`}
          onClick={handleCloseModal}
        >
          <div
            ref={modalContentRef}
            className="cert-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cert-modal-header">
              <div className="cert-modal-title-group">
                <span className="cert-modal-badge font-mono text-xs font-semibold text-(--color-accent) uppercase tracking-wider">
                  {activeCertificate.issuer}
                </span>
                <h3
                  id={`cert-dialog-heading-${activeCertificate.id}`}
                  className="cert-modal-heading font-serif text-xl sm:text-2xl text-(--color-foreground) font-normal m-0 tracking-tight"
                >
                  {activeCertificate.title[locale]}
                </h3>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                className="cert-modal-close"
                onClick={handleCloseModal}
                aria-label={copy.accessibility.closeLabel[locale]}
              >
                ✕
              </button>
            </div>

            <div className="cert-modal-image-wrapper">
              <Image
                src={activeCertificate.assetPath}
                alt={
                  isId
                    ? `Sertifikat ${activeCertificate.title[locale]} - ${activeCertificate.issuer}`
                    : `Certificate for ${activeCertificate.title[locale]} issued by ${activeCertificate.issuer}`
                }
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

