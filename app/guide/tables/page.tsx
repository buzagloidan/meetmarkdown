import type { Metadata } from "next";
import { JsonLdArticle } from "@/components/shared/JsonLd";
import { ToolPageShell } from "@/components/shared/ToolPageShell";
import { TablesGuideContent } from "./TablesGuideContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Markdown Tables Guide — Syntax, Alignment & Examples",
  description:
    "Learn markdown table syntax with practical examples. Covers basic tables, column alignment, formatting in cells, multi-line content, wide tables, and common patterns like comparison tables, feature matrices, and API reference tables.",
  keywords: [
    "markdown table",
    "markdown table generator",
    "markdown table syntax",
    "gfm table",
    "markdown table alignment",
    "markdown table formatting",
    "markdown table example",
    "github flavored markdown table",
    "markdown table template",
    "markdown comparison table",
    "markdown feature matrix",
    "markdown table cheat sheet",
    "markdown table best practices",
    "markdown table guide",
  ],
  alternates: { canonical: "/guide/tables" },
};

export default function TablesGuidePage() {
  return (
    <>
      <JsonLdArticle
        title="Markdown Tables Guide"
        description="A comprehensive guide to markdown table syntax covering alignment, formatting, multi-line content, and ready-to-copy templates for comparison tables, feature matrices, and more."
        url="/guide/tables"
      />
      <ToolPageShell
        title="Markdown Tables Guide"
        description="Everything you need to know about markdown tables. Each section includes syntax, examples, and a link to try it live in the Table Formatter."
        href="/guide/tables"
      >
        <TablesGuideContent />
      </ToolPageShell>
    </>
  );
}
