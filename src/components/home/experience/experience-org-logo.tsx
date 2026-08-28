"use client";

import { useState } from "react";
import Image from "next/image";

interface ExperienceOrgLogoProps {
  logoPath?: string | null;
  placeholder: string;
  orgName?: string;
}

export function ExperienceOrgLogo({
  logoPath,
  placeholder,
}: ExperienceOrgLogoProps) {
  const [hasError, setHasError] = useState(false);

  if (logoPath && !hasError) {
    return (
      <div
        className="experience-org-logo aspect-square w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 shrink-0 border border-(--color-border) bg-(--color-background) p-1 sm:p-1.5 flex items-center justify-center relative overflow-hidden rounded-[2px]"
        aria-hidden="true"
      >
        <Image
          src={logoPath}
          alt=""
          width={56}
          height={56}
          sizes="(max-width: 640px) 44px, 56px"
          loading="lazy"
          unoptimized
          onError={() => setHasError(true)}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Graceful editorial fallback monogram with square corners
  return (
    <div
      className="experience-org-logo aspect-square w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 shrink-0 border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) flex items-center justify-center text-center select-none rounded-[2px]"
      aria-hidden="true"
    >
      <span className="font-mono text-xs sm:text-sm md:text-base font-bold tracking-tight text-(--color-foreground)">
        {placeholder}
      </span>
    </div>
  );
}
