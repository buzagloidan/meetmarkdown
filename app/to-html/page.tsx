import type { Metadata } from "next";
import { ToolPageShell } from "@/components/shared/ToolPageShell";
import { JsonLd } from "@/components/shared/JsonLd";
import { getToolBySlug } from "@/lib/tools";
import { ToHtmlClient } from "./ToHtmlClient";

const tool = getToolBySlug("to-html")!;

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  keywords: tool.keywords,
  alternates: { canonical: tool.href },
};

export default function ToHtmlPage() {
  return (
    <>
      <JsonLd name={tool.title} description={tool.description} url={tool.href} />
      <ToolPageShell title={tool.title} description={tool.description}>
        <ToHtmlClient />
      </ToolPageShell>
    </>
  );
}
