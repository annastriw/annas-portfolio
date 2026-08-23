"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { EditorialPlaceholder } from "@/components/ui/editorial-placeholder";

interface ProjectGalleryProps {
  assets: string[];
  title: string;
  locale: Locale;
}

export function ProjectGallery({
  assets,
  title,
  locale,
}: ProjectGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const isId = locale === "id";

  // Close modal on Escape
  useEffect(() => {
    if (!activeImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage]);

  return (
    <section className="project-gallery-section" aria-label="Visual Media & Evidence">
      <div className="gallery-section-header">
        <h2 className="gallery-section-title">
          {isId ? "[BUKTI VISUAL // DOKUMENTASI SISTEM]" : "[VISUAL EVIDENCE // DOCUMENTATION GALLERY]"}
        </h2>
        <span className="gallery-count">
          {assets && assets.length > 0
            ? `${assets.length} ${isId ? "GAMBAR DIVERIFIKASI" : "VERIFIED ASSETS"}`
            : isId
            ? "STATUS: BUKTI PENDING"
            : "STATUS: FIGURE PENDING"}
        </span>
      </div>

      {assets && assets.length > 0 ? (
        <div className="gallery-grid">
          {assets.map((assetPath, idx) => {
            const figureNum = String(idx + 1).padStart(2, "0");
            const filename = assetPath.split("/").pop() || `Asset ${idx + 1}`;

            return (
              <figure key={assetPath} className="gallery-item">
                <button
                  type="button"
                  className="gallery-item-btn"
                  onClick={() => setActiveImage(assetPath)}
                  aria-label={`Enlarge figure ${figureNum}: ${filename}`}
                >
                  <div className="gallery-img-wrapper aspect-[16/10] bg-(--color-surface-subtle) relative overflow-hidden">
                    <Image
                      src={assetPath}
                      alt={`${title} - Figure ${figureNum}`}
                      width={800}
                      height={500}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      className="gallery-img object-cover w-full h-full"
                      loading="lazy"
                    />
                    <div className="gallery-overlay">
                      <span className="gallery-zoom-icon" aria-hidden="true">
                        ⊕
                      </span>
                      <span className="gallery-zoom-text">
                        {isId ? "Perbesar" : "Enlarge"}
                      </span>
                    </div>
                  </div>
                  <figcaption className="gallery-caption">
                    <span className="figure-tag">FIG.{figureNum}</span>
                    <span className="figure-name">{filename}</span>
                  </figcaption>
                </button>
              </figure>
            );
          })}
        </div>
      ) : (
        <div className="gallery-pending-wrapper">
          <EditorialPlaceholder
            figureNumber="01"
            category="SYSTEM EVIDENCE"
            locale={locale}
          />
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {activeImage && (
        <div
          className="gallery-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Image Preview"
          onClick={() => setActiveImage(null)}
        >
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="gallery-modal-close"
              onClick={() => setActiveImage(null)}
              aria-label="Close image preview"
            >
              ✕
            </button>
            <div className="gallery-modal-image-container">
              <Image
                src={activeImage}
                alt={`${title} - Enlarged Preview`}
                width={1920}
                height={1080}
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="gallery-modal-img object-contain"
                priority
              />
            </div>
            <p className="gallery-modal-caption">
              {activeImage.split("/").pop()}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
