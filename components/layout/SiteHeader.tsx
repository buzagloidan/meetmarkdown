import Link from "next/link";
import { tools } from "@/lib/tools";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-lg tracking-tight">
            MeetMarkdown
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
