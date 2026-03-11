interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Zero-overhead component that injects JSON-LD structured data into the page.
 * Use inside any Server Component page — renders a <script> tag with no client JS.
 */
export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
