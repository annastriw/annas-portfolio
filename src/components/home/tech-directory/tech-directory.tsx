"use client";

import { useState, useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n/config";
import {
  capabilitiesCategories,
  type CapabilityCategory,
  type CapabilityItem,
} from "@/content/capabilities/capabilities-data";
import { TechCategory } from "./tech-category";
import { TechLogo } from "./tech-logo";

interface TechDirectoryProps {
  locale: Locale;
}

export function TechDirectory({ locale }: TechDirectoryProps) {
  const [selectedRecord, setSelectedRecord] = useState<{
    item: CapabilityItem;
    category: CapabilityCategory;
  } | null>(null);

  const triggerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const isId = locale === "id";

  const handleSelectItem = (
    item: CapabilityItem,
    category: CapabilityCategory
  ) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setSelectedRecord({ item, category });
  };

  const handleClose = () => {
    setSelectedRecord(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  // Keyboard trap, Escape listener, and body scroll lock
  useEffect(() => {
    if (!selectedRecord) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button initially
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements =
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedRecord]);

  return (
    <div
      className="tech-directory-container flex flex-col"
      role="region"
      aria-label="Technical Capabilities Directory"
    >
      {/* 6 Vertically Stacked Editorial Categories Separated by Thin Rules */}
      <div className="flex flex-col border-t border-(--color-border)">
        {capabilitiesCategories.map((category, idx) => (
          <TechCategory
            key={category.id}
            category={category}
            index={idx}
            locale={locale}
            onSelectItem={handleSelectItem}
          />
        ))}
      </div>

      {/* Accessible Technical Record Dialog */}
      {selectedRecord && (
        <div
          className="tech-dialog-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
          onClick={handleClose}
          aria-hidden="true"
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tech-dialog-title"
            aria-describedby="tech-dialog-desc"
            onClick={(e) => e.stopPropagation()}
            className="tech-dialog-content relative w-full max-w-[540px] max-h-[calc(100dvh-32px)] overflow-y-auto border border-(--color-border) bg-(--color-background) p-5 sm:p-7 rounded-[2px] shadow-2xl flex flex-col gap-4 animate-editorial-fade motion-reduce:animate-none"
          >
            {/* Header: Category Metadata & Close Action */}
            <div className="flex items-center justify-between gap-3 border-b border-(--color-border) pb-3.5">
              <div className="flex items-center gap-2 font-mono text-xs text-(--color-muted)">
                <span className="text-(--color-accent) font-semibold">
                  [05 // CAPABILITIES]
                </span>
                <span className="text-(--color-border)" aria-hidden="true">
                  /
                </span>
                <span className="uppercase tracking-wider font-semibold text-(--color-foreground)">
                  {selectedRecord.category.title}
                </span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                aria-label={
                  isId ? "Tutup detail teknis" : "Close technical record"
                }
                className="font-mono text-xs text-(--color-muted) hover:text-(--color-foreground) min-h-[44px] min-w-[44px] px-3 py-2 border border-(--color-border) hover:border-(--color-accent) rounded-[2px] cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-1 flex items-center justify-center"
              >
                ✕ ESC
              </button>
            </div>

            {/* Content: Technology Name, Monogram & Index */}
            <div className="flex items-center gap-3.5 pt-1">
              <TechLogo
                slug={selectedRecord.item.slug}
                name={selectedRecord.item.name}
                monogram={selectedRecord.item.monogram}
              />
              <div className="flex flex-col">
                <span className="font-mono text-[11px] text-(--color-accent) font-semibold">
                  RECORD // {selectedRecord.item.index}
                </span>
                <h3
                  id="tech-dialog-title"
                  className="font-serif text-2xl sm:text-3xl font-normal text-(--color-foreground) m-0"
                >
                  {selectedRecord.item.name}
                </h3>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-(--color-border)/60 pt-3">
              <p
                id="tech-dialog-desc"
                className="text-sm sm:text-base text-(--color-muted) leading-relaxed m-0"
              >
                {selectedRecord.item.description[locale]}
              </p>
            </div>

            {/* Dialog Footer Action */}
            <div className="flex items-center justify-between pt-3 border-t border-(--color-border) font-mono text-xs text-(--color-muted)">
              <span>{selectedRecord.category.code}</span>
              <button
                type="button"
                onClick={handleClose}
                className="font-mono text-xs font-semibold text-(--color-accent) hover:underline cursor-pointer min-h-[44px] inline-flex items-center px-2 focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-1 rounded-[2px]"
              >
                {isId ? "Tutup Dialog" : "Close Record"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
