import Link from "next/link";
import type { Tool } from "@/lib/tools";
import { ArrowRight } from "lucide-react";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={tool.href}
      className="group flex flex-col gap-3 p-6 rounded-xl border bg-card hover:bg-accent/30 hover:border-primary/30 transition-all"
    >
      <div className="flex items-start justify-between">
        <tool.icon className="h-7 w-7 text-primary" />
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
      </div>
      <div>
        <h3 className="font-semibold text-base mb-1">{tool.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
      </div>
    </Link>
  );
}
