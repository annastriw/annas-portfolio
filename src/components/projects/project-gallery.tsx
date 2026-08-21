"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

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

  if (!assets || assets.length === 0) {
    return null;
  }

  return (
    <section className="project-gallery-section" aria-label="Visual Media & Evidence">
      <div className="gallery-section-header">
        <h2 className="gallery-section-title">
          {locale === "id" ? "[BUKTI VISUAL // DOKUMENTASI]" : "[VISUAL EVIDENCE // GALLERY]"}
        </h2>
        <span className="gallery-count">
          {assets.length} {locale === "id" ? "GAMBAR DIVERIFIKASI" : "VERIFIED ASSETS"}
        </span>
      </div>

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
                <div className="gallery-img-wrapper">
                  <Image
                    src={assetPath}
                    alt={`${title} - Figure ${figureNum}`}
                    width={800}
                    height={480}
                    className="gallery-img"
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <span className="gallery-zoom-icon" aria-hidden="true">
                      ⊕
                    </span>
                    <span className="gallery-zoom-text">
                      {locale === "id" ? "Perbesar" : "Enlarge"}
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
                width={1600}
                height={1000}
                className="gallery-modal-img"
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
