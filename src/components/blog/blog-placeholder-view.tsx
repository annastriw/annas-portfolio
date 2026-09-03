import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface BlogPlaceholderViewProps {
  locale: Locale;
  isArticle?: boolean;
}

export function BlogPlaceholderView({
  locale,
  isArticle = false,
}: BlogPlaceholderViewProps) {
  const isId = locale === "id";

  return (
    <div className="py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Article-only Back Link */}
        {isArticle && (
          <nav
            aria-label={isId ? "Navigasi blog" : "Blog navigation"}
            className="mb-6 sm:mb-8 md:mb-10"
          >
            <Link
              href={`/${locale}/blog`}
              className="group inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-wider text-(--color-muted) hover:text-(--color-accent) transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-2"
              aria-label={isId ? "Kembali ke Blog" : "Back to Blog"}
            >
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-150 group-hover:-translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
              >
                ←
              </span>
              <span>{isId ? "Kembali ke Blog" : "Back to Blog"}</span>
            </Link>
          </nav>
        )}

        {/* Technical Editorial Header / Masthead */}
        <header className="max-w-4xl">
          <ScrollReveal animationClass="animate-editorial-fade">
            <div className="mb-2.5 flex items-center gap-3 font-mono text-xs text-(--color-muted)">
              <span className="font-semibold text-(--color-accent)">
                [04 // BLOG]
              </span>
            </div>

            <h1 className="m-0 font-serif text-[clamp(2.5rem,5.5vw,5rem)] font-normal leading-[0.96] tracking-[-0.04em] text-(--color-foreground)">
              {isId ? "Arsip Blog" : "Blog Archive"}
            </h1>
          </ScrollReveal>
        </header>

        {/* Thin Editorial Divider */}
        <hr className="my-6 sm:my-8 md:my-10 border-0 border-t border-(--color-border)" />

        {/* Under Construction Notice */}
        <ScrollReveal animationClass="animate-editorial-fade" delayMs={60}>
          <section aria-labelledby="blog-notice-heading" className="max-w-2xl">
            <h2
              id="blog-notice-heading"
              className="m-0 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-(--color-foreground)"
            >
              {isId ? "Sedang Disiapkan" : "Under Construction"}
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-(--color-muted)">
              {isId
                ? "Blog ini sedang disiapkan. Artikel akan tersedia di sini setelah siap dipublikasikan."
                : "This blog is being prepared. Articles will be available here once they’re ready."}
            </p>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
