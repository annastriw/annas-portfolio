import type { TechEntry } from "./tech-item";
import { TechItem } from "./tech-item";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export interface TechCategoryData {
  id: string;
  code: string;
  title: string;
  items: TechEntry[];
}

interface TechCategoryProps {
  category: TechCategoryData;
  index?: number;
}

export function TechCategory({ category, index = 0 }: TechCategoryProps) {
  const delayMs = index * 100;

  return (
    <ScrollReveal delayMs={delayMs} animationClass="animate-editorial-fade">
      <div
        className="tech-directory-category flex flex-col gap-3 border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) p-4 sm:p-5 rounded-[2px] hover:border-(--color-accent) transition-colors duration-300"
        role="region"
        aria-label={category.title}
      >
        {/* Category Header */}
        <div className="flex flex-col gap-1 border-b border-(--color-border) pb-3">
          <div className="flex items-center justify-between font-mono text-[11px] text-(--color-muted)">
            <span className="text-(--color-accent) font-semibold">
              {category.code}
            </span>
            <span className="uppercase tracking-wider">
              {category.items.length} TECHNOLOGIES
            </span>
          </div>
          <h3 className="font-mono text-sm sm:text-base font-bold tracking-tight text-(--color-foreground) uppercase m-0">
            {category.title}
          </h3>
        </div>

        {/* Category Items List */}
        <div className="flex flex-col gap-1.5" role="list">
          {category.items.map((item) => (
            <TechItem key={`${category.id}-${item.slug}`} item={item} />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
