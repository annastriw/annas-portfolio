"use client";

import { useState, useEffect, useRef, useId, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/lib/i18n/config";
import {
  capabilitiesCategories,
  type CapabilityCategory,
  type CapabilityItem,
} from "@/content/capabilities/capabilities-data";
import { TechItem } from "./tech-item";
import { TechLogo } from "./tech-logo";

interface TechDirectoryProps {
  locale: Locale;
}

const STORAGE_KEY = "annas-home-capability-category";

const listeners = new Set<() => void>();
function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribeCategory(callback: () => void) {
  listeners.add(callback);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback();
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }
  return () => {
    listeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function getClientCategory(): string {
  if (typeof window === "undefined") return capabilitiesCategories[0].id;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const matched = capabilitiesCategories.find(
        (c) => c.id === saved || c.index === saved
      );
      if (matched) return matched.id;
    }
  } catch {
    // Gracefully ignore storage failures
  }
  return capabilitiesCategories[0].id;
}

function getServerCategory(): string {
  return capabilitiesCategories[0].id;
}

export function TechDirectory({ locale }: TechDirectoryProps) {
  // Synchronized category state with deterministic server/first paint fallback (Category 01)
  const selectedCategoryId = useSyncExternalStore(
    subscribeCategory,
    getClientCategory,
    getServerCategory
  );

  const [selectedRecord, setSelectedRecord] = useState<{
    item: CapabilityItem;
    category: CapabilityCategory;
  } | null>(null);
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const triggerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const baseId = useId();

  const isId = locale === "id";

  const handleSelectCategory = (categoryId: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, categoryId);
    } catch {
      // Gracefully ignore storage failures
    }
    emitChange();
  };

  const handleSelectItem = (
    item: CapabilityItem,
    category: CapabilityCategory
  ) => {
    if (category.isFundamental || item.isFundamental) return;
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

  const activeCategory =
    capabilitiesCategories.find((c) => c.id === selectedCategoryId) ??
    capabilitiesCategories[0];

  return (
    <div
      className="tech-directory-container flex flex-col"
      role="region"
      aria-label={
        isId ? "Direktori Kapabilitas Teknis" : "Technical Capabilities Directory"
      }
    >
      {/* =========================================================================
          1. Desktop / Laptop Master–Detail Layout (lg+)
          ========================================================================= */}
      <div className="hidden lg:grid lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-8 xl:gap-12 items-start">
        {/* Left Column: Master Category Index (Sticky within Section) */}
        <nav
          className="sticky top-24 border border-(--color-border) bg-(--color-background) p-2 rounded-[2px] flex flex-col gap-1 max-h-[calc(100vh-8rem)] overflow-y-auto"
          aria-label={
            isId ? "Daftar kategori kapabilitas" : "Capability category index"
          }
        >
          {capabilitiesCategories.map((category) => {
            const isSelected = category.id === selectedCategoryId;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleSelectCategory(category.id)}
                aria-current={isSelected ? "true" : undefined}
                className={`w-full text-left flex items-center justify-between p-2.5 rounded-[2px] transition-all duration-150 cursor-pointer min-h-[44px] focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-1 ${
                  isSelected
                    ? "bg-(--color-surface-subtle,var(--color-background)) border-l-2 border-(--color-accent) text-(--color-foreground) font-semibold pl-3"
                    : "text-(--color-muted) hover:text-(--color-foreground) hover:bg-(--color-surface-subtle) font-normal border-l-2 border-transparent"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`font-mono text-xs shrink-0 ${
                      isSelected
                        ? "text-(--color-accent) font-semibold"
                        : "text-(--color-muted)"
                    }`}
                  >
                    [{category.index}]
                  </span>
                  <span className="font-mono text-xs truncate">
                    {category.title}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-(--color-muted) shrink-0 ml-2">
                  ({category.items.length})
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Column: Active Category Detail Panel */}
        <div
          key={activeCategory.id}
          className="flex flex-col gap-6 animate-editorial-fade motion-reduce:animate-none"
        >
          {/* Panel Header */}
          <div className="flex flex-col gap-1 border-b border-(--color-border) pb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-(--color-muted)">
              <span className="text-(--color-accent) font-semibold">
                [{activeCategory.code}]
              </span>
              <span className="text-(--color-border)" aria-hidden="true">
                /
              </span>
              <span className="uppercase tracking-wider">
                {activeCategory.items.length}{" "}
                {activeCategory.isFundamental
                  ? isId
                    ? "Prinsip Dasar"
                    : "Fundamentals"
                  : isId
                  ? "Teknologi"
                  : "Capabilities"}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-(--color-foreground) m-0">
              {activeCategory.title}
            </h3>
          </div>

          {/* Panel Item Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3"
            role="list"
          >
            {activeCategory.items.map((item) =>
              activeCategory.isFundamental || item.isFundamental ? (
                <div
                  key={item.index}
                  className="flex items-center gap-3 p-3 min-h-[50px] border border-(--color-border) bg-(--color-background) rounded-[2px]"
                  role="listitem"
                >
                  <span
                    className="font-mono text-xs font-semibold text-(--color-accent) shrink-0"
                    aria-hidden="true"
                  >
                    {item.index}
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-medium text-(--color-foreground)">
                    {item.name}
                  </span>
                </div>
              ) : (
                <TechItem
                  key={item.index}
                  item={item}
                  locale={locale}
                  onSelect={(selected) =>
                    handleSelectItem(selected, activeCategory)
                  }
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. Tablet View (md to lg)
          ========================================================================= */}
      <div className="hidden md:flex lg:hidden flex-col gap-6">
        {/* Horizontally Scrollable Category Rail */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 border-b border-(--color-border)"
          role="tablist"
          aria-label={
            isId ? "Kategori kapabilitas" : "Capability category navigator"
          }
        >
          {capabilitiesCategories.map((category) => {
            const isSelected = category.id === selectedCategoryId;
            return (
              <button
                key={category.id}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => handleSelectCategory(category.id)}
                className={`font-mono text-xs whitespace-nowrap px-3.5 py-2.5 rounded-[2px] transition-colors shrink-0 cursor-pointer min-h-[44px] flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-(--color-accent) ${
                  isSelected
                    ? "border border-(--color-accent) bg-(--color-surface-subtle,var(--color-background)) text-(--color-foreground) font-semibold"
                    : "border border-(--color-border) bg-(--color-background) text-(--color-muted) hover:text-(--color-foreground)"
                }`}
              >
                <span
                  className={
                    isSelected
                      ? "text-(--color-accent) font-semibold"
                      : "text-(--color-muted)"
                  }
                >
                  [{category.index}]
                </span>
                <span>{category.title}</span>
                <span className="text-[11px] text-(--color-muted)">
                  ({category.items.length})
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Panel for Tablet */}
        <div
          key={`tab-panel-${activeCategory.id}`}
          className="flex flex-col gap-6 animate-editorial-fade motion-reduce:animate-none"
        >
          <div className="flex flex-col gap-1 border-b border-(--color-border) pb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-(--color-muted)">
              <span className="text-(--color-accent) font-semibold">
                [{activeCategory.code}]
              </span>
              <span className="text-(--color-border)" aria-hidden="true">
                /
              </span>
              <span className="uppercase tracking-wider">
                {activeCategory.items.length}{" "}
                {activeCategory.isFundamental
                  ? isId
                    ? "Prinsip Dasar"
                    : "Fundamentals"
                  : isId
                  ? "Teknologi"
                  : "Capabilities"}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-(--color-foreground) m-0">
              {activeCategory.title}
            </h3>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3"
            role="list"
          >
            {activeCategory.items.map((item) =>
              activeCategory.isFundamental || item.isFundamental ? (
                <div
                  key={item.index}
                  className="flex items-center gap-3 p-3 min-h-[50px] border border-(--color-border) bg-(--color-background) rounded-[2px]"
                  role="listitem"
                >
                  <span
                    className="font-mono text-xs font-semibold text-(--color-accent) shrink-0"
                    aria-hidden="true"
                  >
                    {item.index}
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-medium text-(--color-foreground)">
                    {item.name}
                  </span>
                </div>
              ) : (
                <TechItem
                  key={item.index}
                  item={item}
                  locale={locale}
                  onSelect={(selected) =>
                    handleSelectItem(selected, activeCategory)
                  }
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. Mobile & Small Mobile View (< md): Editorial Accordion
          ========================================================================= */}
      <div
        className="flex md:hidden flex-col border-t border-(--color-border)"
        role="region"
        aria-label={
          isId
            ? "Akordeon Kapabilitas Teknis"
            : "Technical Capabilities Accordion"
        }
      >
        {capabilitiesCategories.map((category) => {
          const isOpen = category.id === selectedCategoryId;
          const headerId = `${baseId}-acc-hdr-${category.id}`;
          const panelId = `${baseId}-acc-pnl-${category.id}`;

          return (
            <div key={category.id} className="border-b border-(--color-border)">
              {/* Accordion Header */}
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleSelectCategory(category.id)}
                className="w-full text-left flex items-center justify-between gap-3 py-3.5 px-1 hover:text-(--color-accent) transition-colors cursor-pointer min-h-[48px] focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-1"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono text-xs font-semibold text-(--color-accent) shrink-0">
                    [{category.index}]
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-tight text-(--color-foreground) truncate">
                    {category.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[11px] text-(--color-muted) uppercase">
                    ({category.items.length})
                  </span>
                  <span
                    className="font-mono text-sm text-(--color-accent) font-bold"
                    aria-hidden="true"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </div>
              </button>

              {/* Accordion Content Panel (Only One Expanded at a Time) */}
              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className="pb-4 pt-1 flex flex-col gap-2.5 animate-editorial-fade motion-reduce:animate-none"
                >
                  <div
                    className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-2"
                    role="list"
                  >
                    {category.items.map((item) =>
                      category.isFundamental || item.isFundamental ? (
                        <div
                          key={item.index}
                          className="flex items-center gap-2.5 p-2.5 min-h-[44px] border border-(--color-border) bg-(--color-background) rounded-[2px]"
                          role="listitem"
                        >
                          <span
                            className="font-mono text-xs font-semibold text-(--color-accent) shrink-0"
                            aria-hidden="true"
                          >
                            {item.index}
                          </span>
                          <span className="font-mono text-xs font-medium text-(--color-foreground)">
                            {item.name}
                          </span>
                        </div>
                      ) : (
                        <TechItem
                          key={item.index}
                          item={item}
                          locale={locale}
                          onSelect={(selected) =>
                            handleSelectItem(selected, category)
                          }
                        />
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          4. Accessible Technical Record Modal Dialog (Portaled to document.body for viewport-level centering)
          ========================================================================= */}
      {selectedRecord &&
        isMounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="tech-dialog-overlay fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
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
              className="tech-dialog-content relative w-full max-w-[540px] max-h-[min(90vh,calc(100dvh-2rem))] overflow-y-auto border border-(--color-border) bg-(--color-background) p-5 sm:p-7 rounded-[2px] shadow-2xl flex flex-col gap-4 animate-editorial-fade motion-reduce:animate-none"
            >
              {/* Header: Category Metadata & Close Action */}
              <div className="flex items-center justify-between gap-3 border-b border-(--color-border) pb-3.5">
                <div className="flex items-center gap-2 font-mono text-xs text-(--color-muted) min-w-0">
                  <span className="text-(--color-accent) font-semibold shrink-0">
                    [05 // CAPABILITIES]
                  </span>
                  <span className="text-(--color-border)" aria-hidden="true">
                    /
                  </span>
                  <span className="uppercase tracking-wider font-semibold text-(--color-foreground) truncate">
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
                  className="font-mono text-xs text-(--color-muted) hover:text-(--color-foreground) min-h-[44px] min-w-[44px] px-3 py-2 border border-(--color-border) hover:border-(--color-accent) rounded-[2px] cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-1 flex items-center justify-center shrink-0"
                >
                  ✕ ESC
                </button>
              </div>

              {/* Content: Technology Name, Monogram & Index */}
              <div className="flex items-center gap-3.5 pt-1">
                <TechLogo
                  slug={selectedRecord.item.slug}
                  name={selectedRecord.item.name}
                  monogram={selectedRecord.item.monogram ?? ""}
                  size="large"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[11px] text-(--color-accent) font-semibold">
                    RECORD // {selectedRecord.item.index}
                  </span>
                  <h3
                    id="tech-dialog-title"
                    className="font-serif text-2xl sm:text-3xl font-normal text-(--color-foreground) m-0 truncate"
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
                  {selectedRecord.item.description?.[locale]}
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
          </div>,
          document.body
        )}
    </div>
  );
}

