"use client";

import { useState, useEffect } from "react";
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

  // Handle Escape key to close modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const copy = {
    tag: isId ? "[01 // PENDIDIKAN]" : "[01 // EDUCATION]",
    subtag: isId ? "LATAR BELAKANG AKADEMIK" : "ACADEMIC FOUNDATION",
    title: isId ? "Pendidikan" : "Education",
    figLabel: isId ? "FIG.01 // SERTIFIKAT KELULUSAN" : "FIG.01 // BACHELOR CERTIFICATE",
    inspectLabel: isId ? "Lihat Dokumen" : "Inspect Document",
    docCaption: isId
      ? "Universitas Diponegoro · Teknik Komputer · 2026"
      : "Diponegoro University · Computer Engineering · 2026",
    metaLine: isId
      ? `IPK ${educationData.gpa} · ${educationData.positioning[locale]}`
      : `GPA ${educationData.gpa} · ${educationData.positioning[locale]}`,
  };

  return (
    <section
      className="about-education-section py-8 sm:py-12 md:py-14 border-b border-(--color-border)"
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
            <span>{copy.subtag}</span>
          </div>
          <h2 className="section-title font-serif text-3xl sm:text-4xl text-(--color-foreground) font-normal m-0 tracking-tight">
            {copy.title}
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
                {educationData.degree[locale]} — {educationData.fieldOfStudy[locale]}
              </h3>
              <p className="font-sans text-base sm:text-lg font-medium text-(--color-foreground) m-0">
                {educationData.institution[locale]}
              </p>
            </div>

            {/* Concise Meta Row */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-(--color-muted)">
              <span>{educationData.period[locale]}</span>
              <span className="text-(--color-border)" aria-hidden="true">
                /
              </span>
              <span className="text-(--color-accent) font-semibold">
                {copy.metaLine}
              </span>
            </div>

            {/* Location Meta */}
            <div className="flex items-center gap-2 font-mono text-xs text-(--color-muted)">
              <span className="text-(--color-accent)" aria-hidden="true">📍</span>
              <span>{educationData.location[locale]}</span>
            </div>
          </ScrollReveal>

          {/* Right Column: Bachelor Certificate Document Evidence */}
          <ScrollReveal
            animationClass="animate-editorial-fade"
            className="flex flex-col gap-2"
          >
            <div className="flex justify-between items-center font-mono text-[11px] text-(--color-muted) px-0.5">
              <span className="font-semibold text-(--color-foreground)">
                {copy.figLabel}
              </span>
              <span className="text-(--color-accent)">2026</span>
            </div>

            {/* Certificate Interactive Preview Card */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="group relative border border-(--color-border) bg-(--color-background) aspect-[16/11] overflow-hidden cursor-pointer hover:border-(--color-accent) transition-all duration-300 text-left p-0 w-full"
              aria-label={`${copy.inspectLabel}: ${educationData.degree[locale]}`}
            >
              <Image
                src={educationData.certificateAsset}
                alt={`Ijazah ${educationData.degree[locale]} — ${educationData.institution[locale]}`}
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
                  {copy.inspectLabel}
                </span>
              </div>
            </button>

            <figcaption className="font-mono text-[11px] text-(--color-muted) px-1">
              {copy.docCaption}
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
          aria-label={copy.figLabel}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="cert-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cert-modal-header">
              <div className="cert-modal-title-group">
                <span className="cert-modal-badge">
                  {isId ? "BUKTI AKADEMIK TERVERIFIKASI" : "VERIFIED ACADEMIC EVIDENCE"}
                </span>
                <h3 className="cert-modal-heading">
                  {educationData.degree[locale]} — {educationData.fieldOfStudy[locale]}
                </h3>
                <p className="cert-modal-issuer">
                  {educationData.institution[locale]} · {educationData.period[locale]}
                </p>
              </div>

              <button
                type="button"
                className="cert-modal-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close certificate preview"
              >
                ✕
              </button>
            </div>

            <div className="cert-modal-image-wrapper">
              <Image
                src={educationData.certificateAsset}
                alt={`Ijazah ${educationData.degree[locale]} — ${educationData.institution[locale]}`}
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
