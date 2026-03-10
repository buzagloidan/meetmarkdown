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
    slug: "formatter",
    href: "/formatter",
    title: "Formatter",
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
  {
    slug: "html-to-markdown",
    href: "/html-to-markdown",
    title: "HTML to Markdown",
    description:
      "Paste raw HTML and convert it to clean, readable markdown. Great for migrating content from websites or CMSs.",
    icon: "🔄",
    keywords: ["html to markdown", "convert html", "html converter"],
    color: "teal",
  },
  {
    slug: "to-pdf",
    href: "/to-pdf",
    title: "Markdown to PDF",
    description:
      "Render your markdown as a beautifully styled document and save it as a PDF via your browser's print dialog.",
    icon: "📄",
    keywords: ["markdown to pdf", "export pdf", "print markdown"],
    color: "red",
  },
  {
    slug: "word-count",
    href: "/word-count",
    title: "Word Count & Stats",
    description:
      "Paste your markdown and instantly see word count, character count, reading time, heading structure, and more.",
    icon: "📈",
    keywords: ["markdown word count", "reading time", "text stats", "character count"],
    color: "indigo",
  },
  {
    slug: "diff",
    href: "/diff",
    title: "Markdown Diff",
    description:
      "Compare two markdown documents side-by-side. Highlights additions, deletions, and changes line by line.",
    icon: "🔍",
    keywords: ["markdown diff", "compare markdown", "text diff", "markdown compare"],
    color: "yellow",
  },
  {
    slug: "url-to-markdown",
    href: "/url-to-markdown",
    title: "URL to Markdown",
    description:
      "Enter any public URL and fetch the page content as clean, readable markdown. Perfect for saving articles.",
    icon: "🔗",
    keywords: ["url to markdown", "web to markdown", "webpage to markdown", "fetch url"],
    color: "cyan",
  },
  {
    slug: "mermaid-to-image",
    href: "/mermaid-to-image",
    title: "Mermaid to Image",
    description:
      "Paste Mermaid diagram code and export it as a PNG or JPG. Right-click the preview to copy or save directly.",
    icon: "🖼️",
    keywords: ["mermaid to png", "mermaid to image", "mermaid diagram export", "mermaid png download"],
    color: "pink",
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export const siteUrl = "https://meetmarkdown.com";
