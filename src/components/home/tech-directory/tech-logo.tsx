interface TechLogoProps {
  name?: string;
  monogram: string;
}

export function TechLogo({ monogram }: TechLogoProps) {
  return (
    <div
      className="tech-logo-frame w-7 h-7 shrink-0 border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) flex items-center justify-center select-none rounded-[2px]"
      aria-hidden="true"
    >
      <span className="font-mono text-[10px] font-bold text-(--color-foreground) leading-none">
        {monogram}
      </span>
    </div>
  );
}
