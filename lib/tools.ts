import {
  Wand2,
  FileCode2,
  Table2,
  ArrowLeftRight,
  FileDown,
  Hash,
  GitCompare,
  Link2,
  Workflow,
  Presentation,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Tool {
  slug: string;
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
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
    icon: Wand2,
    keywords: ["markdown formatter", "prettier markdown", "format markdown online", "markdown beautifier", "clean up markdown"],
    color: "purple",
  },
  {
    slug: "to-html",
    href: "/to-html",
    title: "Markdown to HTML",
    description:
      "Convert markdown to clean, semantic HTML. Copy the output or download as an .html file ready to use.",
    icon: FileCode2,
    keywords: ["markdown to html", "convert markdown to html", "html export", "markdown html converter", "md to html"],
    color: "green",
  },
  {
    slug: "to-pdf",
    href: "/to-pdf",
    title: "Markdown to PDF",
    description:
      "Render your markdown as a beautifully styled document and save it as a PDF via your browser's print dialog.",
    icon: FileDown,
    keywords: ["markdown to pdf", "export markdown as pdf", "print markdown", "markdown pdf converter", "md to pdf"],
    color: "red",
  },
  {
    slug: "mermaid-editor",
    href: "/mermaid-editor",
    title: "Mermaid Live Editor",
    description:
      "Write Mermaid diagrams with a live preview. Export as PNG or SVG, copy to clipboard, zoom, choose background, and toggle hand-drawn style.",
    icon: Workflow,
    keywords: ["mermaid live editor", "mermaid to png", "mermaid to svg", "mermaid diagram export", "mermaid online"],
    color: "pink",
  },
  {
    slug: "table-formatter",
    href: "/table-formatter",
    title: "Table Formatter",
    description:
      "Paste messy markdown tables and get back perfectly aligned GFM-compatible table syntax.",
    icon: Table2,
    keywords: ["markdown table formatter", "align markdown table", "gfm table", "markdown table generator", "format markdown table"],
    color: "orange",
  },
  {
    slug: "html-to-markdown",
    href: "/html-to-markdown",
    title: "HTML to Markdown",
    description:
      "Paste raw HTML and convert it to clean, readable markdown. Great for migrating content from websites or CMSs.",
    icon: ArrowLeftRight,
    keywords: ["html to markdown", "convert html to markdown", "html to md", "html markdown converter", "webpage to markdown"],
    color: "teal",
  },
  {
    slug: "word-count",
    href: "/word-count",
    title: "Word Count & Stats",
    description:
      "Paste your markdown and instantly see word count, character count, reading time, heading structure, and more.",
    icon: Hash,
    keywords: ["markdown word count", "reading time estimator", "text statistics", "character count", "word counter online"],
    color: "indigo",
  },
  {
    slug: "diff",
    href: "/diff",
    title: "Markdown Diff",
    description:
      "Compare two markdown documents side-by-side. Highlights additions, deletions, and changes line by line.",
    icon: GitCompare,
    keywords: ["markdown diff", "compare markdown files", "text diff online", "markdown comparison tool", "side by side diff"],
    color: "yellow",
  },
  {
    slug: "url-to-markdown",
    href: "/url-to-markdown",
    title: "URL to Markdown",
    description:
      "Enter any public URL and fetch the page content as clean, readable markdown. Perfect for saving articles.",
    icon: Link2,
    keywords: ["url to markdown", "web page to markdown", "website to markdown", "fetch url as markdown", "convert webpage to markdown"],
    color: "cyan",
  },
  {
    slug: "slide-editor",
    href: "/slide-editor",
    title: "Marp Slide Editor",
    description:
      "Write Marp markdown and get a live slide preview. Navigate slides, choose themes, and export as a self-contained HTML presentation.",
    icon: Presentation,
    keywords: ["marp editor", "markdown slides", "markdown presentation", "marp online", "markdown to slides", "presentation maker"],
    color: "violet",
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export const siteUrl = "https://meetmarkdown.com";
