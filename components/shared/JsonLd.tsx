import { siteUrl } from "@/lib/tools";

// Safe: all inputs are JSON.stringify of controlled objects, never user input
function JsonLdScript({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface JsonLdProps {
  name: string;
  description: string;
  url: string;
}

export function JsonLd({ name, description, url }: JsonLdProps) {
  return (
    <JsonLdScript
      schema={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name,
        description,
        url: `${siteUrl}${url}`,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }}
    />
  );
}

export function JsonLdWebSite() {
  return (
    <JsonLdScript
      schema={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "MeetMarkdown",
        url: siteUrl,
        description:
          "Free online markdown tools — live editor, Mermaid diagrams, formatter, HTML converter, PDF export, and more. No account required.",
      }}
    />
  );
}

export function JsonLdItemList({ items }: { items: { name: string; description: string; url: string }[] }) {
  return (
    <JsonLdScript
      schema={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "MeetMarkdown Tools",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          description: item.description,
          url: item.url,
        })),
      }}
    />
  );
}
