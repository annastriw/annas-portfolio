import type {
  CapabilityCategory,
  CapabilityItem,
} from "@/content/capabilities/capabilities-data";
import { TechItem } from "./tech-item";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface TechCategoryProps {
  category: CapabilityCategory;
  index?: number;
  onSelectItem: (item: CapabilityItem, category: CapabilityCategory) => void;
}

export function TechCategory({
  category,
  index = 0,
  onSelectItem,
}: TechCategoryProps) {
  const delayMs = index * 80;

  return (
    <ScrollReveal delayMs={delayMs} animationClass="animate-editorial-fade">
      <div
        className="tech-directory-category flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 py-5 sm:py-6 border-b border-(--color-border) last:border-b-0"
        role="region"
        aria-label={category.title}
      >
        {/* Left Column (Desktop): Category Index, Title, and Count */}
        <div className="flex flex-col gap-1 lg:w-64 shrink-0">
          <div className="flex items-center gap-2 font-mono text-xs text-(--color-muted)">
            <span className="font-semibold text-(--color-accent)">
              [{category.index}]
            </span>
            <span className="text-(--color-border)" aria-hidden="true">
              /
            </span>
            <span className="uppercase tracking-wider">
              {category.items.length} TECHNOLOGIES
            </span>
          </div>
          <h3 className="font-mono text-sm sm:text-base font-bold tracking-tight text-(--color-foreground) uppercase m-0">
            {category.title}
          </h3>
        </div>

        {/* Right Column: Responsive Grid of Technology Items */}
        <div
          className="grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
          role="list"
        >
          {category.items.map((item) => (
            <TechItem
              key={`${category.id}-${item.slug}`}
              item={item}
              onSelect={(selected) => onSelectItem(selected, category)}
            />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
