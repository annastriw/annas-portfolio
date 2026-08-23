import type { Locale } from "@/lib/i18n/config";

interface EditorialPlaceholderProps {
  figureNumber?: string;
  category?: string;
  locale: Locale;
  className?: string;
}

export function EditorialPlaceholder({
  figureNumber = "01",
  category = "PROJECT DOCUMENTATION",
  locale,
  className = "",
}: EditorialPlaceholderProps) {
  const isId = locale === "id";

  return (
    <div
      className={`editorial-placeholder-frame aspect-[3/2] w-full border border-dashed border-(--color-border) bg-(--color-surface-subtle) flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
      role="img"
      aria-label={
        isId
          ? `Gambar dokumentasi proyek sedang disiapkan (Fig.${figureNumber})`
          : `Project documentation visual pending (Fig.${figureNumber})`
      }
    >
      <div className="flex flex-col items-center gap-2 text-(--color-text-muted)">
        <span className="font-mono text-xs tracking-widest uppercase">
          {`[FIG.${figureNumber} // ${category.toUpperCase()}]`}
        </span>
        <div className="w-8 h-[1px] bg-(--color-border) my-1" aria-hidden="true" />
        <p className="font-mono text-sm font-semibold text-(--color-text-primary) tracking-wider">
          {isId ? "BUKTI VISUAL SEDANG DISIAPKAN" : "FIGURE PENDING"}
        </p>
        <p className="font-mono text-[11px] text-(--color-text-secondary) tracking-wide uppercase">
          {isId ? "ASET DOKUMENTASI SISTEM" : "DOCUMENTATION ASSET"}
        </p>
        <p className="font-mono text-[10px] text-(--color-text-muted) tracking-widest uppercase">
          {isId ? "BELUM TERSEDIA" : "NOT YET PROVIDED"}
        </p>
      </div>
    </div>
  );
}
