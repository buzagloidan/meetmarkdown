import { siteUrl } from "@/lib/tools";

interface JsonLdProps {
  name: string;
  description: string;
  url: string;
}

// Safe: content is JSON.stringify of a controlled object, not user input
export function JsonLd({ name, description, url }: JsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: `${siteUrl}${url}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  // JSON.stringify output is safe for script[type=application/ld+json]
  const jsonString = JSON.stringify(schema);

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
