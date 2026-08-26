import Image from "next/image";
import type { BlogArticle, BlogBlock } from "@/content/blog";
import type { Locale } from "@/lib/i18n/config";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface BlogArticleBodyProps {
  article: BlogArticle;
  locale: Locale;
}

function renderBlock(
  block: BlogBlock,
  locale: Locale,
  key: string,
  eagerFigure = false,
) {
  switch (block.type) {
    case "prose":
      return (
        <div className="blog-prose" key={key}>
          {block.paragraphs[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      );
    case "list": {
      const List = block.style === "ordered" ? "ol" : "ul";
      return (
        <List className={`blog-list blog-list-${block.style}`} key={key}>
          {block.items[locale].map((item, index) => (
            <li key={item}>
              {block.style === "ordered" && (
                <span className="blog-list-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <span>{item}</span>
            </li>
          ))}
        </List>
      );
    }
    case "flow":
      return (
        <ol className="blog-flow" key={key}>
          {block.items[locale].map((item, index) => (
            <li key={item}>
              <span className="blog-flow-step" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="blog-flow-text">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "note":
      return (
        <aside className="blog-note" key={key}>
          <strong>{block.label[locale]}</strong>
          <p>{block.text[locale]}</p>
        </aside>
      );
    case "metrics":
      return (
        <dl className="blog-metrics" key={key}>
          {block.items.map((item) => (
            <div key={`${item.label[locale]}-${item.value}`}>
              <dt>{item.label[locale]}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      );
    case "figure":
      return (
        <figure
          className={`blog-figure blog-figure-${block.format}`}
          key={key}
        >
          <div className="blog-figure-media">
            <Image
              src={block.src}
              alt={block.alt[locale]}
              fill
              loading={eagerFigure ? "eager" : "lazy"}
              sizes={
                block.format === "mobile"
                  ? "(max-width: 767px) 82vw, 360px"
                  : "(max-width: 767px) calc(100vw - 2rem), 1024px"
              }
            />
          </div>
          <figcaption>{block.caption[locale]}</figcaption>
        </figure>
      );
  }
}

export function BlogArticleBody({ article, locale }: BlogArticleBodyProps) {
  const firstFigureKey = article.sections
    .flatMap((section) =>
      section.blocks.map((block, index) => ({
        key: `${section.id}-${block.type}-${index}`,
        type: block.type,
      })),
    )
    .find((block) => block.type === "figure")?.key;

  return (
    <div className="blog-article-body">
      {article.sections.map((section, secIdx) => (
        <ScrollReveal key={section.id} delayMs={secIdx * 40}>
          <section id={section.id} className="blog-section">
            <div className="blog-section-header">
              <span className="blog-section-num" aria-hidden="true">
                [{String(secIdx + 1).padStart(2, "0")}]
              </span>
              <h2>{section.title[locale]}</h2>
            </div>
            {section.blocks.map((block, index) => {
              const blockKey = `${section.id}-${block.type}-${index}`;
              return renderBlock(
                block,
                locale,
                blockKey,
                blockKey === firstFigureKey,
              );
            })}
          </section>
        </ScrollReveal>
      ))}
    </div>
  );
}
