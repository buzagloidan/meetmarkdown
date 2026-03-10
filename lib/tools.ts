export interface Tool {
  slug: string;
  href: string;
  title: string;
  description: string;
  icon: string;
  keywords: string[];
  color: string;
}

export const tools: Tool[] = [
  {
    slug: "editor",
    href: "/editor",
    title: "Live Editor",
    description:
      "Write and preview markdown in real-time. Renders Mermaid diagrams, tables, and syntax-highlighted code inline.",
    icon: "✏️",
    keywords: ["markdown editor", "live preview", "mermaid diagrams", "online editor"],
    color: "blue",
  },
  {
    slug: "formatter",
    href: "/formatter",
    title: "Markdown Formatter",
    description:
      "Paste your markdown and get it back perfectly formatted — consistent spacing, wrapped prose, and aligned tables.",
    icon: "✨",
    keywords: ["markdown formatter", "prettier markdown", "format markdown online"],
    color: "purple",
  },
  {
    slug: "to-html",
    href: "/to-html",
    title: "Markdown to HTML",
    description:
      "Convert markdown to clean, semantic HTML. Copy the output or download as an .html file ready to use.",
    icon: "🌐",
    keywords: ["markdown to html", "convert markdown", "html export"],
    color: "green",
  },
  {
    slug: "table-formatter",
    href: "/table-formatter",
    title: "Table Formatter",
    description:
      "Paste messy markdown tables and get back perfectly aligned GFM-compatible table syntax.",
    icon: "📊",
    keywords: ["markdown table", "table formatter", "gfm table", "align markdown table"],
    color: "orange",
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export const siteUrl = "https://meetmarkdown.com";
