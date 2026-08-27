"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { CertificateData } from "@/content/about/about-data";
import { certificatesData } from "@/content/about/about-data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface AboutCertificatesProps {
  locale: Locale;
}

type CertFilterCategory = "all" | "cisco-systems" | "ai-databases";

export function AboutCertificates({ locale }: AboutCertificatesProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CertFilterCategory>("all");
  const [activeCertificate, setActiveCertificate] =
    useState<CertificateData | null>(null);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const isId = locale === "id";

  const categories: { key: CertFilterCategory; label: { en: string; id: string } }[] =
    [
      {
        key: "all",
        label: { en: "All Credentials", id: "Semua Sertifikasi" },
      },
      {
        key: "cisco-systems",
        label: { en: "Cisco & Systems", id: "Cisco & Sistem" },
      },
      {
        key: "ai-databases",
        label: { en: "AI & Databases", id: "AI & Basis Data" },
      },
    ];

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

  const copy = {
    tag: isId ? "[02 // SERTIFIKASI]" : "[02 // CREDENTIALS]",
    subtag: isId ? "SERTIFIKASI TEKNIS" : "TECHNICAL CERTIFICATIONS",
    title: isId ? "Sertifikasi Teknis" : "Technical Certifications",
    subtitle: isId
      ? "Delapan sertifikasi teknis terverifikasi di bidang jaringan komputer, kecerdasan buatan, basis data, hardware, dan IoT."
      : "Eight verified technical certifications covering computer networking, artificial intelligence, databases, hardware, and IoT.",
    filterLabel: "[FILTER]:",
    inspectText: isId ? "Lihat Kredensial" : "Inspect Credential",
  };

  return (
    <section
      className="about-certificates-section py-8 sm:py-12 md:py-14"
      aria-label={copy.title}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
        {/* Section Header */}
        <ScrollReveal
          animationClass="animate-editorial-fade"
          className="flex flex-col gap-2 max-w-3xl"
        >
          <div className="section-header-meta flex items-center gap-3 font-mono text-xs text-(--color-muted)">
            <span className="font-semibold text-(--color-accent)">{copy.tag}</span>
            <span className="text-(--color-border)" aria-hidden="true">
              /
            </span>
            <span className="uppercase tracking-wider">{copy.subtag}</span>
          </div>

          <h2 className="section-title font-serif text-3xl sm:text-4xl text-(--color-foreground) font-normal m-0 tracking-tight">
            {copy.title}
          </h2>

          <p className="section-subtitle text-sm sm:text-base text-(--color-muted) leading-relaxed m-0">
            {copy.subtitle}
          </p>
        </ScrollReveal>

        {/* Category Filter Controls */}
        <div
          className="flex flex-wrap items-center gap-3 font-mono text-xs"
          role="group"
          aria-label="Filter certificates"
        >
          <span className="text-(--color-muted)">{copy.filterLabel}</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count =
                cat.key === "all"
                  ? certificatesData.length
                  : certificatesData.filter((c) => c.category === cat.key).length;

              const isSelected = selectedCategory === cat.key;

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  aria-pressed={isSelected}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 border font-mono text-xs rounded-[2px] transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-(--color-foreground) bg-(--color-foreground) text-(--color-background) font-semibold"
                      : "border-(--color-border) bg-(--color-background) text-(--color-muted) hover:text-(--color-foreground) hover:border-(--color-foreground)"
                  }`}
                >
                  <span>{cat.label[locale]}</span>
                  <span className="text-[11px] opacity-80">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredCertificates.map((cert, idx) => {
            const figureNum = String(idx + 1).padStart(2, "0");

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
                  aria-label={`View certificate ${cert.title[locale]}`}
                  className="flex flex-col w-full h-full text-left p-0 border-0 bg-transparent cursor-pointer group"
                >
                  {/* Image Preview */}
                  <div className="relative w-full aspect-[16/11] bg-(--color-surface-subtle) border-b border-(--color-border) overflow-hidden">
                    <Image
                      src={cert.assetPath}
                      alt={cert.title[locale]}
                      width={600}
                      height={420}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      className="object-contain w-full h-full p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />

                    {/* Hover Zoom Overlay */}
                    <div className="absolute inset-0 bg-(--color-foreground)/75 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1 text-(--color-background)">
                      <span className="text-xl leading-none" aria-hidden="true">
                        ⊕
                      </span>
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                        {copy.inspectText}
                      </span>
                    </div>

                    {/* Issuer Floating Badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-(--color-background)/90 border border-(--color-border) text-(--color-foreground) font-mono text-[10px] font-semibold tracking-wider rounded-[2px] backdrop-blur-xs">
                      <span>{cert.badge}</span>
                    </div>
                  </div>

                  {/* Card Body (Simplified: FIG, Issuer, Title) */}
                  <div className="p-4 sm:p-5 flex flex-col gap-1.5 flex-grow">
                    <div className="flex justify-between items-center font-mono text-[11px] text-(--color-muted)">
                      <span className="text-(--color-accent) font-semibold">
                        FIG.{figureNum}
                      </span>
                      <span className="font-medium">{cert.issuer}</span>
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
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeCertificate && (
        <div
          className="cert-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={activeCertificate.title[locale]}
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
                  {activeCertificate.badge}
                </span>
                <h3 className="cert-modal-heading">
                  {activeCertificate.title[locale]}
                </h3>
                <p className="cert-modal-issuer">
                  {activeCertificate.issuer}
                </p>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                className="cert-modal-close"
                onClick={handleCloseModal}
                aria-label="Close certificate preview"
              >
                ✕
              </button>
            </div>

            <div className="cert-modal-image-wrapper">
              <Image
                src={activeCertificate.assetPath}
                alt={activeCertificate.title[locale]}
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

