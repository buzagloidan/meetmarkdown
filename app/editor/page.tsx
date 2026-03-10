import type { Metadata } from "next";
import { ToolPageShell } from "@/components/shared/ToolPageShell";
import { JsonLd } from "@/components/shared/JsonLd";
import { EditorClient } from "./EditorClient";

export const metadata: Metadata = {
  title: "Live Editor",
  description:
    "Write and preview markdown in real-time. Renders Mermaid diagrams, tables, and syntax-highlighted code inline.",
  keywords: ["markdown editor", "live preview", "mermaid diagrams", "online editor"],
  alternates: { canonical: "/editor" },
};

export default function EditorPage() {
  return (
    <>
      <JsonLd
        name="Live Editor"
        description="Write and preview markdown in real-time. Renders Mermaid diagrams, tables, and syntax-highlighted code inline."
        url="/editor"
      />
      <ToolPageShell
        title="Live Editor"
        description="Write and preview markdown in real-time. Renders Mermaid diagrams, tables, and syntax-highlighted code inline."
      >
        <EditorClient />
      </ToolPageShell>
    </>
  );
}
