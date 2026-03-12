import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { MermaidTemplatesClient } from "./MermaidTemplatesClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Mermaid Diagram Templates — Flowcharts, Sequence, ER & More",
  description:
    "Browse ready-to-use Mermaid diagram templates: flowcharts, sequence diagrams, ER diagrams, class diagrams, state diagrams, Gantt charts, mindmaps, and git graphs. Open any template in the live editor instantly.",
  keywords: [
    "mermaid diagram templates",
    "mermaid examples",
    "sequence diagram example",
    "er diagram example",
    "flowchart template",
    "class diagram example",
    "state diagram template",
    "gantt chart mermaid",
    "mermaid mindmap",
    "git graph mermaid",
  ],
  alternates: { canonical: "/templates/mermaid" },
};

export default function MermaidTemplatesPage() {
  return (
    <>
      <JsonLd
        name="Mermaid Diagram Templates"
        description="Browse ready-to-use Mermaid diagram templates: flowcharts, sequence diagrams, ER diagrams, class diagrams, state diagrams, Gantt charts, mindmaps, and git graphs."
        url="/templates/mermaid"
      />
      <MermaidTemplatesClient />
    </>
  );
}
