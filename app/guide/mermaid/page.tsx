import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { ToolPageShell } from "@/components/shared/ToolPageShell";
import { MermaidGuideContent } from "./MermaidGuideContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Mermaid Diagram Syntax Guide — Complete Reference",
  description:
    "The complete Mermaid diagram syntax guide. Learn flowcharts, sequence diagrams, class diagrams, state diagrams, ER diagrams, Gantt charts, pie charts, git graphs, and mindmaps with practical examples.",
  keywords: [
    "mermaid diagram syntax",
    "mermaid flowchart",
    "mermaid tutorial",
    "mermaid sequence diagram",
    "mermaid js guide",
    "mermaid class diagram",
    "mermaid state diagram",
    "mermaid er diagram",
    "mermaid gantt chart",
    "mermaid pie chart",
    "mermaid git graph",
    "mermaid mindmap",
    "mermaid cheat sheet",
    "mermaid syntax reference",
    "mermaid diagram examples",
    "mermaid online guide",
  ],
  alternates: { canonical: "/guide/mermaid" },
};

export default function MermaidGuidePage() {
  return (
    <>
      <JsonLd
        name="Mermaid Diagram Syntax Guide"
        description="The complete Mermaid diagram syntax guide covering flowcharts, sequence diagrams, class diagrams, state diagrams, ER diagrams, Gantt charts, pie charts, git graphs, and mindmaps."
        url="/guide/mermaid"
      />
      <ToolPageShell
        title="Mermaid Diagram Syntax Guide"
        description="A comprehensive reference for every Mermaid diagram type. Each section includes syntax, examples, and a link to try it live in the editor."
      >
        <MermaidGuideContent />
      </ToolPageShell>
    </>
  );
}
