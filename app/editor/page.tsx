import type { Metadata } from "next";
import { ToolPageShell } from "@/components/shared/ToolPageShell";
import { JsonLd } from "@/components/shared/JsonLd";
import { EditorClient } from "./EditorClient";

export const metadata: Metadata = {
  title: "Markdown Live Editor",
  description:
    "Free online markdown editor with live preview. Renders Mermaid diagrams, tables, and syntax-highlighted code in real-time. No account needed.",
  keywords: [
    "markdown live editor",
    "online markdown editor",
    "markdown preview",
    "markdown editor with mermaid",
    "real-time markdown",
    "markdown editor free",
  ],
  alternates: { canonical: "/editor" },
};

export default function EditorPage() {
  return (
    <>
      <JsonLd
        name="Markdown Live Editor"
        description="Free online markdown editor with live preview. Renders Mermaid diagrams, tables, and syntax-highlighted code in real-time."
        url="/editor"
      />
      <ToolPageShell
        title="Markdown Live Editor"
        description="Write and preview markdown in real-time. Renders Mermaid diagrams, tables, and syntax-highlighted code inline."
      >
        <EditorClient />
      </ToolPageShell>
    </>
  );
}
