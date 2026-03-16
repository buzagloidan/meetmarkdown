import type { Metadata } from "next";
import { ToolPageShell } from "@/components/shared/ToolPageShell";
import { JsonLd } from "@/components/shared/JsonLd";
import { getToolBySlug } from "@/lib/tools";
import { LaTeXEditorClient } from "./LaTeXEditorClient";

const tool = getToolBySlug("latex-editor")!;

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  keywords: tool.keywords,
  alternates: { canonical: tool.href },
};

export default function LaTeXEditorPage() {
  return (
    <>
      <JsonLd name={tool.title} description={tool.description} url={tool.href} />
      <ToolPageShell title={tool.title} description={tool.description} href={tool.href}>
        <LaTeXEditorClient />
      </ToolPageShell>
    </>
  );
}
