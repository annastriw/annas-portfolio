"use client";

import { useState } from "react";
import Image from "next/image";

interface TechLogoProps {
  slug?: string;
  name?: string;
  monogram: string;
  logoPath?: string | null;
}

export function TechLogo({ slug, monogram, logoPath }: TechLogoProps) {
  const [hasError, setHasError] = useState(false);
  const resolvedPath =
    logoPath ?? (slug ? `/assets/technologies/${slug}/logo.svg` : null);

  if (resolvedPath && !hasError) {
    return (
      <div
        className="tech-logo-frame aspect-square w-7 h-7 shrink-0 border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) flex items-center justify-center select-none rounded-[2px] p-0.5 relative overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src={resolvedPath}
          alt=""
          width={24}
          height={24}
          sizes="24px"
          loading="lazy"
          unoptimized
          onError={() => setHasError(true)}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className="tech-logo-frame aspect-square w-7 h-7 shrink-0 border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) flex items-center justify-center select-none rounded-[2px]"
      aria-hidden="true"
    >
      <span className="font-mono text-[10px] font-bold text-(--color-foreground) leading-none">
        {monogram}
      </span>
    </div>
  );
}
