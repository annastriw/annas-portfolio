"use client";

import { useState } from "react";
import Image from "next/image";

interface TechLogoProps {
  slug?: string;
  name?: string;
  monogram: string;
  logoPath?: string | null;
  size?: "default" | "large";
}

export function TechLogo({
  slug,
  monogram,
  logoPath,
  size = "default",
}: TechLogoProps) {
  const [hasError, setHasError] = useState(false);
  const resolvedPath =
    logoPath ?? (slug ? `/assets/technologies/${slug}/logo.svg` : null);

  const isLarge = size === "large";
  const frameClass = isLarge
    ? "tech-logo-frame aspect-square w-12 h-12 sm:w-14 sm:h-14 shrink-0 border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) flex items-center justify-center select-none rounded-[2px] p-1.5 sm:p-2 relative overflow-hidden"
    : "tech-logo-frame aspect-square w-9 h-9 sm:w-10 sm:h-10 shrink-0 border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) flex items-center justify-center select-none rounded-[2px] p-1 sm:p-1.5 relative overflow-hidden";

  const imageDim = isLarge ? 56 : 40;
  const imageSizes = isLarge
    ? "(max-width: 640px) 48px, 56px"
    : "(max-width: 640px) 36px, 40px";

  const monogramClass = isLarge
    ? "font-mono text-sm sm:text-base font-bold text-(--color-foreground) leading-none"
    : "font-mono text-xs sm:text-[13px] font-bold text-(--color-foreground) leading-none";

  if (resolvedPath && !hasError) {
    return (
      <div className={frameClass} aria-hidden="true">
        <Image
          src={resolvedPath}
          alt=""
          width={imageDim}
          height={imageDim}
          sizes={imageSizes}
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
      className={
        isLarge
          ? "tech-logo-frame aspect-square w-12 h-12 sm:w-14 sm:h-14 shrink-0 border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) flex items-center justify-center select-none rounded-[2px]"
          : "tech-logo-frame aspect-square w-9 h-9 sm:w-10 sm:h-10 shrink-0 border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) flex items-center justify-center select-none rounded-[2px]"
      }
      aria-hidden="true"
    >
      <span className={monogramClass}>{monogram}</span>
    </div>
  );
}
