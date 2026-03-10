import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { MermaidEditorClient } from "./MermaidEditorClient";

export const metadata: Metadata = {
  title: "Mermaid Live Editor",
  description:
    "Write Mermaid diagrams with a live preview. Export as PNG or SVG, copy to clipboard, zoom, choose background, and toggle hand-drawn style.",
  keywords: ["mermaid live editor", "mermaid to png", "mermaid to svg", "mermaid diagram export", "mermaid online"],
  alternates: { canonical: "/mermaid-editor" },
};

export default function MermaidEditorPage() {
  return (
    <>
      <JsonLd
        name="Mermaid Live Editor"
        description="Write Mermaid diagrams with a live preview. Export as PNG or SVG, copy to clipboard, zoom, choose background, and toggle hand-drawn style."
        url="/mermaid-editor"
      />
      <div className="flex flex-col overflow-hidden" style={{ height: "calc(100vh - 81px)" }}>
        <MermaidEditorClient />
      </div>
    </>
  );
}
