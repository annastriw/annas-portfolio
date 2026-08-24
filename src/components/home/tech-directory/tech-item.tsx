import { getTechLogoPathIfPresent } from "@/lib/assets/logo-detector";
import { TechLogo } from "./tech-logo";

export interface TechEntry {
  slug: string;
  name: string;
  monogram: string;
  index: string;
}

interface TechItemProps {
  item: TechEntry;
}

export function TechItem({ item }: TechItemProps) {
  const logoPath = getTechLogoPathIfPresent(item.slug);

  return (
    <div
      className="tech-directory-row group flex items-center justify-between gap-3 p-2 sm:p-2.5 border border-(--color-border) bg-(--color-background) hover:border-(--color-accent) transition-all duration-200 rounded-[2px]"
      role="listitem"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] text-(--color-accent) font-semibold transition-transform duration-200 group-hover:translate-x-0.5">
          {item.index}
        </span>
        <TechLogo
          name={item.name}
          monogram={item.monogram}
          logoPath={logoPath}
        />
        <span className="font-mono text-xs sm:text-sm font-medium text-(--color-foreground) group-hover:text-(--color-accent) transition-colors duration-150">
          {item.name}
        </span>
      </div>

      <span
        className="font-mono text-[10px] text-(--color-border) group-hover:text-(--color-accent) transition-colors duration-150 select-none"
        aria-hidden="true"
      >
        ■
      </span>
    </div>
  );
}
