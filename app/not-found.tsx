import Link from "next/link";
import { tools } from "@/lib/tools";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-bold text-muted-foreground/30 mb-4">404</p>
      <h1 className="text-2xl font-bold mb-3">Page not found</h1>
      <p className="text-muted-foreground mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex flex-wrap gap-3 justify-center mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Go home
        </Link>
        <Link
          href="/editor"
          className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
        >
          Open Editor
        </Link>
      </div>

      <div className="border-t pt-10">
        <p className="text-sm text-muted-foreground mb-4">Or jump to a tool:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-accent text-sm transition-colors text-left"
            >
              <tool.icon className="h-4 w-4 text-primary shrink-0" />
              <span>{tool.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
