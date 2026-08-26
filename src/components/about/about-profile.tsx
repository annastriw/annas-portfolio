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
  const specs = data.metadata;

  return (
    <section
      className="about-profile-section py-8 sm:py-12 md:py-14 border-b border-(--color-border)"
      aria-label={isId ? "Profil Pribadi & Rekayasa" : "Personal & Engineering Profile"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] xl:grid-cols-[1fr_1.8fr] gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: Portrait Evidence & Open Metadata Records */}
          <ScrollReveal
            animationClass="animate-editorial-fade"
            className="flex flex-col gap-6"
          >
            {/* Portrait Figure */}
            <figure className="m-0 flex flex-col gap-2 w-full max-w-[340px] mx-auto lg:mx-0">
              <div className="border border-(--color-border) p-1.5 bg-(--color-background) aspect-[4/5] relative overflow-hidden shadow-xs hover:border-(--color-accent) transition-colors duration-300">
                <Image
                  src={data.portrait.assetPath}
                  alt={data.portrait.alt[locale]}
                  width={340}
                  height={425}
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                  className="object-cover object-top w-full h-full transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
              <figcaption className="flex justify-between items-center font-mono text-[11px] text-(--color-muted) px-1">
                <span className="font-semibold text-(--color-foreground)">
                  {data.portrait.figureLabel}
                </span>
                <span className="text-(--color-accent)">KLATEN, ID</span>
              </figcaption>
            </figure>

            {/* Open Profile Record (Thin dividers, high-contrast typography) */}
            <div className="border-t border-(--color-border) pt-4 flex flex-col gap-1 max-w-[340px] mx-auto lg:mx-0 w-full">
              <dl className="m-0 flex flex-col divide-y divide-(--color-border) text-xs">
                <div className="py-2.5 flex justify-between items-baseline gap-2">
                  <dt className="font-mono text-(--color-muted) uppercase tracking-wider text-[11px]">
                    {isId ? "Peran" : "Role"}
                  </dt>
                  <dd className="m-0 font-medium text-(--color-foreground) text-right">
                    {specs.role[locale]}
                  </dd>
                </div>

                <div className="py-2.5 flex justify-between items-baseline gap-2">
                  <dt className="font-mono text-(--color-muted) uppercase tracking-wider text-[11px]">
                    {isId ? "Pendidikan" : "Education"}
                  </dt>
                  <dd className="m-0 font-medium text-(--color-foreground) text-right">
                    {specs.education[locale]}
                  </dd>
                </div>

                <div className="py-2.5 flex justify-between items-baseline gap-2">
                  <dt className="font-mono text-(--color-muted) uppercase tracking-wider text-[11px]">
                    {isId ? "IPK" : "GPA"}
                  </dt>
                  <dd className="m-0 font-mono font-bold text-(--color-accent) text-right">
                    {specs.gpa}
                  </dd>
                </div>

                <div className="py-2.5 flex justify-between items-baseline gap-2">
                  <dt className="font-mono text-(--color-muted) uppercase tracking-wider text-[11px]">
                    {isId ? "Status" : "Status"}
                  </dt>
                  <dd className="m-0 font-medium text-(--color-foreground) text-right">
                    {specs.status[locale]}
                  </dd>
                </div>

                <div className="py-2.5 flex justify-between items-baseline gap-2">
                  <dt className="font-mono text-(--color-muted) uppercase tracking-wider text-[11px]">
                    {isId ? "Lokasi" : "Location"}
                  </dt>
                  <dd className="m-0 text-(--color-muted) text-right">
                    {specs.location[locale]}
                  </dd>
                </div>
              </dl>
            </div>
          </ScrollReveal>

          {/* Right Column: Section Header, Headline, and Narrative */}
          <div className="flex flex-col gap-6 pt-1">
            {/* Section Tag & Subtag */}
            <ScrollReveal
              animationClass="animate-editorial-fade"
              className="flex items-center gap-3 font-mono text-xs text-(--color-muted)"
            >
              <span className="font-semibold text-(--color-accent)">
                {isId ? "[02 // TENTANG]" : "[02 // ABOUT]"}
              </span>
              <span className="text-(--color-border)" aria-hidden="true">
                /
              </span>
              <span className="uppercase tracking-wider">
                {data.subtag[locale]}
              </span>
            </ScrollReveal>

            {/* Name & Title Block */}
            <ScrollReveal
              delayMs={100}
              animationClass="animate-editorial-fade"
              className="flex flex-col gap-2"
            >
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-(--color-foreground) font-normal m-0 tracking-tight leading-[1.1]">
                {data.name}
              </h1>
              <p className="font-mono text-xs sm:text-sm font-semibold text-(--color-accent) uppercase tracking-wider m-0">
                {data.headline[locale]}
              </p>
            </ScrollReveal>

            {/* Concise Lead Statement */}
            <ScrollReveal
              delayMs={150}
              animationClass="animate-editorial-fade"
            >
              <p className="text-base sm:text-lg text-(--color-foreground) font-medium leading-relaxed m-0 max-w-2xl">
                {data.lead[locale]}
              </p>
            </ScrollReveal>

            {/* 2-Paragraph Narrative */}
            <ScrollReveal
              delayMs={200}
              animationClass="animate-editorial-fade"
              className="flex flex-col gap-4 text-sm sm:text-base text-(--color-muted) leading-relaxed max-w-2xl"
            >
              {data.paragraphs[locale].map((p, idx) => (
                <p key={idx} className="m-0">
                  {p}
                </p>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
