interface JsonLdProps {
  schema: object | Array<object>;
}

/**
 * Reusable React Server Component for rendering structured JSON-LD scripts safely.
 */
export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
