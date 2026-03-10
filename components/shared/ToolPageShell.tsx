import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ToolPageShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ToolPageShell({ title, description, children }: ToolPageShellProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{title}</span>
      </nav>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>
      {children}
    </div>
  );
}
