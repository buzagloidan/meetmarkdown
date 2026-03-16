import type { Metadata } from "next";
import { ToolPageShell } from "@/components/shared/ToolPageShell";
import { JsonLdArticle } from "@/components/shared/JsonLd";
import { CheatsheetContent } from "./CheatsheetContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Markdown Cheat Sheet",
  description:
    "A comprehensive markdown cheat sheet with syntax examples, output previews, and one-click editor links. Covers headings, lists, tables, code blocks, images, footnotes, and more.",
  keywords: [
    "markdown cheat sheet",
    "markdown syntax",
    "markdown reference",
    "markdown guide",
    "markdown syntax cheat sheet",
    "markdown quick reference",
    "markdown formatting guide",
    "markdown table syntax",
    "markdown code block syntax",
    "markdown link syntax",
    "markdown image syntax",
    "markdown bold italic",
    "github flavored markdown cheat sheet",
    "gfm cheat sheet",
    "markdown examples",
    "learn markdown",
    "markdown tutorial",
    "markdown basics",
  ],
  alternates: { canonical: "/cheatsheet" },
};

export default function CheatsheetPage() {
  return (
    <>
      <JsonLdArticle
        title="Markdown Cheat Sheet"
        description="A comprehensive markdown cheat sheet with syntax examples, output previews, and one-click editor links."
        url="/cheatsheet"
      />
      <ToolPageShell
        title="Markdown Cheat Sheet"
        description="Every markdown syntax element in one place — with examples you can try instantly in the editor."
        href="/cheatsheet"
      >
        <CheatsheetContent />
      </ToolPageShell>
    </>
  );
}
