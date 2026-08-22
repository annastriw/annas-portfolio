"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { CertificateCategory, CertificateItem } from "@/types/about";
import { certificatesData } from "@/data/about";

interface AboutCertificatesProps {
  locale: Locale;
}

export function AboutCertificates({ locale }: AboutCertificatesProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CertificateCategory>("all");
  const [activeCertificate, setActiveCertificate] =
    useState<CertificateItem | null>(null);

  const isId = locale === "id";

  const categories: { key: CertificateCategory; label: { en: string; id: string } }[] =
    [
      {
        key: "all",
        label: { en: "All Credentials", id: "Semua Sertifikasi" },
      },
      {
        key: "networking",
        label: { en: "Cisco & Systems", id: "Cisco & Sistem" },
      },
      {
        key: "ai-data",
        label: { en: "AI & Databases", id: "AI & Basis Data" },
      },
      {
        key: "academic-experience",
        label: { en: "Academic & Internship", id: "Akademik & Magang" },
      },
    ];

  const filteredCertificates = useMemo(() => {
    if (selectedCategory === "all") return certificatesData;
    return certificatesData.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  // Handle Escape key to close modal
  useEffect(() => {
    if (!activeCertificate) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveCertificate(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCertificate]);

  return (
    <section
      className="about-certificates-section"
      aria-label="Verified Credentials & Certifications"
    >
      <div className="about-section-header">
        <div className="section-header-meta">
          <span className="section-meta-tag">[02 // VERIFIED CREDENTIALS]</span>
          <span className="section-meta-tag">
            {isId ? "SERTIFIKASI & KOMPETENSI" : "CERTIFICATIONS & COMPETENCIES"}
          </span>
        </div>
        <div className="section-title-row">
          <h2 className="section-title">
            {isId ? "Arsip Sertifikasi & Kredensial" : "Certifications & Credentials Archive"}
          </h2>
          <span className="cert-total-count">
            [{certificatesData.length} {isId ? "KREDENSIAL TERVERIFIKASI" : "VERIFIED CREDENTIALS"}]
          </span>
        </div>
        <p className="section-subtitle">
          {isId
            ? "Kredensial profesional dan akademik yang telah diverifikasi dari Cisco Networking Academy, Huawei, Oracle Academy, dan Universitas Diponegoro."
            : "Verified professional and academic credentials from Cisco Networking Academy, Huawei, Oracle Academy, and Diponegoro University."}
        </p>
      </div>

      {/* Category Filter Controls */}
      <div className="cert-filter-bar" role="group" aria-label="Filter certificates">
        <span className="cert-filter-label">[FILTER]:</span>
        <div className="cert-filter-options">
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
                className={`cert-filter-btn ${isSelected ? "cert-filter-btn-active" : ""}`}
                onClick={() => setSelectedCategory(cat.key)}
                aria-pressed={isSelected}
              >
                <span>{cat.label[locale]}</span>
                <span className="cert-filter-count">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Certificate Cards Grid */}
      <div className="cert-grid">
        {filteredCertificates.map((cert, idx) => {
          const figureNum = String(idx + 1).padStart(2, "0");

          return (
            <article key={cert.id} className="cert-card">
              <button
                type="button"
                className="cert-card-btn"
                onClick={() => setActiveCertificate(cert)}
                aria-label={`View certificate ${cert.title[locale]}`}
              >
                <div className="cert-card-preview-wrapper">
                  <Image
                    src={cert.assetPath}
                    alt={cert.title[locale]}
                    width={600}
                    height={420}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="cert-card-img"
                    loading="lazy"
                  />
                  <div className="cert-card-overlay">
                    <span className="cert-zoom-icon" aria-hidden="true">
                      ⊕
                    </span>
                    <span className="cert-zoom-text">
                      {isId ? "Lihat Kredensial" : "Inspect Credential"}
                    </span>
                  </div>
                  <div className="cert-badge-floating">
                    <span>{cert.badge}</span>
                  </div>
                </div>

                <div className="cert-card-body">
                  <div className="cert-card-meta">
                    <span className="cert-index">FIG.{figureNum}</span>
                    <span className="cert-issuer">{cert.issuer}</span>
                  </div>

                  <h3 className="cert-card-title">{cert.title[locale]}</h3>

                  {cert.credentialNote && (
                    <p className="cert-card-note">
                      {cert.credentialNote[locale]}
                    </p>
                  )}
                </div>
              </button>
            </article>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeCertificate && (
        <div
          className="cert-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={activeCertificate.title[locale]}
          onClick={() => setActiveCertificate(null)}
        >
          <div
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
                type="button"
                className="cert-modal-close"
                onClick={() => setActiveCertificate(null)}
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
                className="cert-modal-img"
                priority
              />
            </div>

            {activeCertificate.credentialNote && (
              <div className="cert-modal-footer">
                <p className="cert-modal-description">
                  {activeCertificate.credentialNote[locale]}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
