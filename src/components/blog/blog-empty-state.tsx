import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface BlogEmptyStateProps {
  locale: Locale;
  mode?: "empty-archive" | "empty-filter";
  onResetFilter?: () => void;
}

export function BlogEmptyState({
  locale,
  mode = "empty-archive",
  onResetFilter,
}: BlogEmptyStateProps) {
  const isId = locale === "id";

  if (mode === "empty-filter") {
    return (
      <div className="blog-empty-state">
        <div className="blog-empty-meta">[SIGNAL // 00]</div>
        <h2 className="empty-title">
          {isId
            ? "Tidak ada tulisan yang cocok dengan kriteria pencarian."
            : "No dispatches match your search criteria."}
        </h2>
        <p className="empty-subtitle">
          {isId
            ? "Coba sesuaikan kata kunci pencarian atau reset filter kategori untuk melihat semua catatan teknis."
            : "Try adjusting your search query or resetting category filters to browse all technical notes."}
        </p>
        {onResetFilter && (
          <button
            type="button"
            className="reset-filter-action"
            onClick={onResetFilter}
          >
            {isId ? "Tampilkan Semua Tulisan" : "Show All Dispatches"}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="blog-empty-state blog-empty-archive">
      <div className="blog-empty-meta">[STATUS // COMPILING]</div>
      <h2 className="empty-title">
        {isId
          ? "Catatan Teknis Sedang Dipersiapkan"
          : "Dispatches Currently in Compilation"}
      </h2>
      <p className="empty-subtitle">
        {isId
          ? "Esai rekayasa sistem, catatan implementasi kecerdasan buatan, dan dokumentasi arsitektur sedang dalam tahap penulisan dan penyusunan."
          : "Systems engineering essays, applied AI implementation notes, and architectural post-mortems are currently being drafted and compiled."}
      </p>
      <div className="empty-actions">
        <Link href={`/${locale}/projects`} className="empty-btn-primary">
          {isId ? "Eksplorasi Arsip Proyek" : "Explore Projects Archive"}
        </Link>
        <Link href={`/${locale}/#contact`} className="empty-btn-secondary">
          {isId ? "Hubungi Penulis" : "Contact Author"}
        </Link>
      </div>
    </div>
  );
}
