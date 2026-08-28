import { TechLogo } from "./tech-logo";
import type { CapabilityItem } from "@/content/capabilities/capabilities-data";
import type { Locale } from "@/lib/i18n/config";

interface TechItemProps {
  item: CapabilityItem;
  locale?: Locale;
  onSelect: (item: CapabilityItem) => void;
}

export function TechItem({ item, locale = "en", onSelect }: TechItemProps) {
  const isId = locale === "id";

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="tech-directory-row group w-full text-left flex items-center justify-between gap-2.5 p-2.5 sm:p-3 min-h-[44px] border border-(--color-border) bg-(--color-background) hover:border-(--color-accent) transition-all duration-200 rounded-[2px] cursor-pointer focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-1"
      aria-haspopup="dialog"
      aria-label={
        isId
          ? `Buka detail teknis ${item.name}`
          : `View technical record for ${item.name}`
      }
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <TechLogo slug={item.slug} name={item.name} monogram={item.monogram} />
        <span className="font-mono text-xs sm:text-sm font-medium text-(--color-foreground) group-hover:text-(--color-accent) transition-colors duration-150 truncate">
          {item.name}
        </span>
      </div>

      <span
        className="font-mono text-xs text-(--color-muted) group-hover:text-(--color-accent) transition-transform duration-150 group-hover:translate-x-0.5 select-none shrink-0 motion-reduce:transform-none"
        aria-hidden="true"
      >
        ↗
      </span>
    </button>
  );
}
