import { tools } from "@/lib/tools";
import { ToolCard } from "@/components/shared/ToolCard";

export function ToolGrid() {
  return (
    <section id="tools" className="max-w-7xl mx-auto px-4 pb-20">
      <h2 className="text-2xl font-bold mb-8">All Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
