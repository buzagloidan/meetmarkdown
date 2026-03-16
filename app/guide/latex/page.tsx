import type { Metadata } from "next";
import { JsonLdArticle } from "@/components/shared/JsonLd";
import { ToolPageShell } from "@/components/shared/ToolPageShell";
import { LaTeXGuideContent } from "./LaTeXGuideContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "LaTeX Math in Markdown — Complete Guide",
  description:
    "Learn how to write LaTeX math equations in markdown. Covers inline and display math, Greek letters, fractions, integrals, matrices, aligned equations, and more with live examples.",
  keywords: [
    "latex in markdown",
    "math in markdown",
    "katex markdown",
    "latex equations",
    "markdown math syntax",
    "latex math tutorial",
    "inline math markdown",
    "display math markdown",
    "latex fractions",
    "latex matrices",
    "latex integrals",
    "latex symbols",
    "latex greek letters",
    "math equation editor",
    "latex cheat sheet",
  ],
  alternates: { canonical: "/guide/latex" },
};

export default function LaTeXGuidePage() {
  return (
    <>
      <JsonLdArticle
        title="LaTeX Math in Markdown — Complete Guide"
        description="Learn how to write LaTeX math equations in markdown with live examples. Covers inline math, display equations, Greek letters, fractions, integrals, matrices, and more."
        url="/guide/latex"
      />
      <ToolPageShell
        title="LaTeX Math in Markdown"
        description="A comprehensive guide to writing math equations in markdown using LaTeX syntax. Every example can be tried instantly in the editor."
        href="/guide/latex"
      >
        <LaTeXGuideContent />
      </ToolPageShell>
    </>
  );
}
