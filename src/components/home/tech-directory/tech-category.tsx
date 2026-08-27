import type {
  CapabilityCategory,
  CapabilityItem,
} from "@/content/capabilities/capabilities-data";
import { TechItem } from "./tech-item";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

import type { Locale } from "@/lib/i18n/config";

interface TechCategoryProps {
  category: CapabilityCategory;
  index?: number;
  locale?: Locale;
  onSelectItem: (item: CapabilityItem, category: CapabilityCategory) => void;
}

export function TechCategory({
  category,
  index = 0,
  locale = "en",
  onSelectItem,
}: TechCategoryProps) {
  const delayMs = index * 60;

  return (
    <ScrollReveal delayMs={delayMs} animationClass="animate-editorial-fade">
      <div
        className="tech-directory-category grid grid-cols-1 lg:grid-cols-[50px_220px_1fr] gap-3 lg:gap-6 items-start py-5 sm:py-6 border-b border-(--color-border)"
        role="region"
        aria-label={category.title}
      >
        {/* Column 1: Category Number */}
        <div className="font-mono text-xs font-semibold text-(--color-accent) shrink-0 pt-0.5">
          [{category.index}]
        </div>

        {/* Column 2: Category Title & Count */}
        <div className="flex flex-col gap-0.5 shrink-0">
          <h3 className="font-mono text-sm font-bold tracking-tight text-(--color-foreground) uppercase m-0">
            {category.title}
          </h3>
          <span className="font-mono text-[11px] text-(--color-muted) uppercase tracking-wider">
            {category.items.length} TECHNOLOGIES
          </span>
        </div>

        {/* Column 3: Responsive Grid of Technology Items */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-2.5 w-full pt-1 lg:pt-0"
          role="list"
        >
          {category.items.map((item) => (
            <TechItem
              key={`${category.id}-${item.slug}`}
              item={item}
              locale={locale}
              onSelect={(selected) => onSelectItem(selected, category)}
            />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
