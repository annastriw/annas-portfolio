import Image from "next/image";

interface TechLogoProps {
  name: string;
  monogram: string;
  logoPath?: string | null;
}

export function TechLogo({ name, monogram, logoPath }: TechLogoProps) {
  if (logoPath) {
    return (
      <div
        className="tech-logo-frame w-7 h-7 shrink-0 border border-(--color-border) bg-(--color-background) p-1 flex items-center justify-center relative overflow-hidden"
        aria-label={`${name} logo`}
      >
        <Image
          src={logoPath}
          alt={`${name} icon`}
          width={24}
          height={24}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Restrained editorial fallback monogram (e.g. NX, TS, PY)
  return (
    <div
      className="tech-logo-frame w-7 h-7 shrink-0 border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) flex items-center justify-center select-none"
      aria-label={`${name} monogram`}
    >
      <span className="font-mono text-[10px] font-bold text-(--color-foreground) leading-none">
        {monogram}
      </span>
    </div>
  );
}
