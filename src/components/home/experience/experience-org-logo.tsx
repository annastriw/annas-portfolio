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
        className="experience-org-logo aspect-square w-12 h-12 shrink-0 border border-(--color-border) bg-(--color-background) p-1.5 flex items-center justify-center relative overflow-hidden"
        aria-label={`${orgName} logo`}
      >
        <Image
          src={logoPath}
          alt={`${orgName} logo`}
          width={48}
          height={48}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Graceful editorial fallback monogram (1:1 aspect ratio)
  return (
    <div
      className="experience-org-logo aspect-square w-12 h-12 shrink-0 border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) flex flex-col items-center justify-center text-center select-none"
      aria-label={`${orgName} monogram`}
    >
      <span className="font-mono text-xs font-bold tracking-wider text-(--color-foreground)">
        {placeholder}
      </span>
      <span className="font-mono text-[9px] text-(--color-muted) leading-none mt-0.5">
        ORG
      </span>
    </div>
  );
}
