import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Reusable React Server Component for rendering Markdown content safely and semantically.
 * Styled to align with the SIGNAL / ARCHIVE editorial design tokens.
 */
export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose-editorial ${className}`.trim()}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl sm:text-3xl font-serif font-normal text-[var(--foreground)] tracking-tight mt-8 mb-4 border-b border-[var(--border)] pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-serif font-normal text-[var(--foreground)] tracking-tight mt-8 mb-3 border-b border-[var(--border)] pb-1.5">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg sm:text-xl font-sans font-semibold text-[var(--foreground)] tracking-tight mt-6 mb-2">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-sans font-semibold text-[var(--foreground)] mt-4 mb-2">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-[0.9375rem] leading-relaxed text-[var(--foreground)] mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-5 mb-4 space-y-1.5 text-[0.9375rem] text-[var(--foreground)]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-5 mb-4 space-y-1.5 text-[0.9375rem] text-[var(--foreground)]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed pl-1">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[var(--accent)] pl-4 my-4 italic text-[var(--muted)]">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[var(--foreground)]">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-[var(--foreground)]">
              {children}
            </em>
          ),
          hr: () => (
            <hr className="my-8 border-t border-[var(--border)]" />
          ),
          code: ({ children, className: codeClassName }) => {
            const isInline = !codeClassName;
            if (isInline) {
              return (
                <code className="font-mono text-[0.8125rem] px-1.5 py-0.5 rounded-sm bg-[var(--border)]/30 text-[var(--foreground)] border border-[var(--border)]">
                  {children}
                </code>
              );
            }
            return (
              <code className="block font-mono text-[0.8125rem] p-3 rounded-sm bg-[var(--border)]/20 text-[var(--foreground)] border border-[var(--border)] overflow-x-auto">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-4 overflow-x-auto rounded-sm">
              {children}
            </pre>
          ),
          a: ({ href, children }) => {
            const isExternal = href?.startsWith("http://") || href?.startsWith("https://");
            return (
              <a
                href={href}
                className="text-[var(--accent)] underline underline-offset-4 hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2 transition-colors duration-150"
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
