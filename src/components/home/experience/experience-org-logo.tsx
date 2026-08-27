import Image from "next/image";

interface ExperienceOrgLogoProps {
  logoPath?: string | null;
  placeholder: string;
  orgName: string;
}

export function ExperienceOrgLogo({
  logoPath,
  placeholder,
  orgName,
}: ExperienceOrgLogoProps) {
  if (logoPath) {
    return (
      <div
        className="experience-org-logo aspect-square w-8 h-8 sm:w-9 sm:h-9 shrink-0 border border-(--color-border) bg-(--color-background) p-1 flex items-center justify-center relative overflow-hidden rounded-[2px]"
        aria-label={`${orgName} logo`}
      >
        <Image
          src={logoPath}
          alt={`${orgName} logo`}
          width={36}
          height={36}
          sizes="36px"
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Graceful editorial fallback monogram with square corners
  return (
    <div
      className="experience-org-logo aspect-square w-8 h-8 sm:w-9 sm:h-9 shrink-0 border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) flex items-center justify-center text-center select-none rounded-[2px]"
      aria-label={`${orgName} monogram`}
    >
      <span className="font-mono text-[11px] sm:text-xs font-bold tracking-tight text-(--color-foreground)">
        {placeholder}
      </span>
    </div>
  );
}
