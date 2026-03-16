import { siteUrl } from "@/lib/tools";

/**
 * Renders a JSON-LD <script> tag. All inputs are hardcoded strings or
 * JSON.stringify'd controlled objects — never user input — so there is
 * no XSS risk from dangerouslySetInnerHTML here.
 */
function JsonLdScript({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Shared publisher / organization reference ────────────────────────────────

const organizationRef = {
  "@type": "Organization",
  name: "MeetMarkdown",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
};

// ── Organization (used once in root layout) ──────────────────────────────────

export function JsonLdOrganization() {
  return (
    <JsonLdScript
      schema={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "MeetMarkdown",
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        description:
          "Free online markdown tools — live editor, Mermaid diagrams, formatter, HTML converter, PDF export, and more. No account required.",
        sameAs: [
          "https://twitter.com/meetmarkdown",
          "https://github.com/meetmarkdown",
        ],
      }}
    />
  );
}

// ── WebSite (homepage) ───────────────────────────────────────────────────────

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
        publisher: organizationRef,
      }}
    />
  );
}

// ── SoftwareApplication (tool pages) ─────────────────────────────────────────

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
        publisher: organizationRef,
      }}
    />
  );
}

// ── BreadcrumbList (tool & guide pages) ──────────────────────────────────────

export function JsonLdBreadcrumb({ items }: { items: { name: string; href: string }[] }) {
  return (
    <JsonLdScript
      schema={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          ...items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 2,
            name: item.name,
            item: `${siteUrl}${item.href}`,
          })),
        ],
      }}
    />
  );
}

// ── FAQPage (faq page) ──────────────────────────────────────────────────────

export function JsonLdFaq({ questions }: { questions: { question: string; answer: string }[] }) {
  return (
    <JsonLdScript
      schema={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: { "@type": "Answer", text: q.answer },
        })),
      }}
    />
  );
}

// ── Article (guide / content pages) ──────────────────────────────────────────

interface JsonLdArticleProps {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}

export function JsonLdArticle({ title, description, url, datePublished = "2025-01-01", dateModified }: JsonLdArticleProps) {
  return (
    <JsonLdScript
      schema={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url: `${siteUrl}${url}`,
        datePublished,
        ...(dateModified && { dateModified }),
        author: organizationRef,
        publisher: organizationRef,
      }}
    />
  );
}

// ── ItemList (homepage tool listing) ─────────────────────────────────────────

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
