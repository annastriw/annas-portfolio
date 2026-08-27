import { TechLogo } from "./tech-logo";
import type { CapabilityItem } from "@/content/capabilities/capabilities-data";

interface TechItemProps {
  item: CapabilityItem;
  onSelect: (item: CapabilityItem) => void;
}

export function TechItem({ item, onSelect }: TechItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="tech-directory-row group w-full text-left flex items-center justify-between gap-2.5 p-2 sm:p-2.5 border border-(--color-border) bg-(--color-background) hover:border-(--color-accent) transition-all duration-200 rounded-[2px] cursor-pointer focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-1"
      aria-haspopup="dialog"
      aria-label={`View technical record for ${item.name}`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <TechLogo name={item.name} monogram={item.monogram} />
        <span className="font-mono text-xs sm:text-sm font-medium text-(--color-foreground) group-hover:text-(--color-accent) transition-colors duration-150 truncate">
          {item.name}
        </span>
      </div>

      <span
        className="font-mono text-xs text-(--color-muted) group-hover:text-(--color-accent) transition-transform duration-150 group-hover:translate-x-0.5 select-none shrink-0"
        aria-hidden="true"
      >
        ↗
      </span>
    </button>
  );
}
