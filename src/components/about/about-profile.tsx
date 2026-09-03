import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { profileData } from "@/content/about/about-data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface AboutProfileProps {
  locale: Locale;
}

export function AboutProfile({ locale }: AboutProfileProps) {
  const isId = locale === "id";
  const data = profileData;

  return (
    <section
      className="about-profile-section py-6 sm:py-8 md:py-10 lg:py-12 border-b border-(--color-border)"
      aria-label={isId ? "Profil Pribadi & Rekayasa" : "Personal & Engineering Profile"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[360px_1fr] gap-6 lg:gap-10 xl:gap-14 items-start">
          {/* Identity Block: Tag, Name, Full Roles Headline, Lead (Mobile order: 1, Desktop: Col 2 Row 1) */}
          <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1 flex flex-col gap-5">
            <ScrollReveal className="flex flex-col gap-5 sm:gap-6">
              {/* Section Tag */}
              <div className="section-header-meta flex items-center gap-3 font-mono text-xs text-(--color-muted)">
                <span className="font-semibold text-(--color-accent)">
                  {isId ? "[01 // TENTANG]" : "[01 // ABOUT]"}
                </span>
              </div>

              {/* Name & Role Headline */}
              <div className="flex flex-col gap-2">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-(--color-foreground) font-normal m-0 tracking-tight leading-[1.08]">
                  {data.name}
                </h1>
                <p className="font-mono text-xs sm:text-sm font-semibold text-(--color-accent) uppercase tracking-wider m-0 leading-relaxed">
                  {data.headline[locale]}
                </p>
              </div>

              {/* Concise Approved Lead */}
              <p className="text-base sm:text-lg lg:text-xl text-(--color-foreground) font-medium leading-relaxed m-0 max-w-[65ch]">
                {data.lead[locale]}
              </p>
            </ScrollReveal>
          </div>

          {/* Portrait Figure Block (Mobile order: 2, Desktop: Col 1 Row 1-2) */}
          <div className="order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2 w-full max-w-[300px] sm:max-w-[340px] mx-auto lg:mx-0">
            <ScrollReveal delayMs={50}>
              <figure className="m-0 flex flex-col gap-2 w-full">
                <div className="border border-(--color-border) p-1.5 bg-(--color-background) aspect-[3/4] relative overflow-hidden shadow-2xs">
                  <Image
                    src={data.portrait.assetPath}
                    alt={data.portrait.alt[locale]}
                    width={360}
                    height={480}
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 340px, 340px"
                    className="object-cover object-top w-full h-full select-none"
                  />
                </div>
                <figcaption className="font-mono text-[11px] text-(--color-muted) flex justify-between items-center px-0.5 pt-1">
                  <span className="font-semibold text-(--color-foreground)">
                    {data.portrait.figureLabel}
                  </span>
                  <span className="text-(--color-accent)">JAKARTA, INDONESIA</span>
                </figcaption>
              </figure>
            </ScrollReveal>
          </div>

          {/* Narrative Paragraphs Block (Mobile order: 3, Desktop: Col 2 Row 2) */}
          <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2 flex flex-col gap-4 max-w-[65ch] pt-2 lg:pt-0">
            <ScrollReveal
              delayMs={100}
              className="flex flex-col gap-4"
            >
              <div className="border-t border-(--color-border) pt-4 sm:pt-5 flex flex-col gap-3.5 text-sm sm:text-base text-(--color-muted) leading-relaxed">
                {data.paragraphs[locale].map((p, idx) => (
                  <p key={idx} className="m-0">
                    {p}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
