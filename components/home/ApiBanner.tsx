import Link from "next/link";
import { Code2, Bot, Zap, Terminal } from "lucide-react";

export function ApiBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-20">
      <div className="relative rounded-2xl border bg-gradient-to-br from-primary/5 via-background to-primary/5 p-8 sm:p-12 overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Bot className="h-3.5 w-3.5" />
              Agent-Friendly
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl font-normal mb-4 leading-tight"
            style={{
              fontFamily: "var(--font-serif)",
              letterSpacing: "-0.02em",
            }}
          >
            Built for humans.{" "}
            <span className="text-primary">Ready for AI agents.</span>
          </h2>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            Every tool on MeetMarkdown is available as a free REST API. Let your
            AI agents format markdown, convert between formats, analyze
            documents, and diff changes — all with a single HTTP call. No API
            key needed.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">6 API Endpoints</p>
                <p className="text-xs text-muted-foreground">Format, convert, diff, analyze</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Code2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">OpenAPI Spec</p>
                <p className="text-xs text-muted-foreground">Auto-discover via standard spec</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Terminal className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Claude Code Skill</p>
                <p className="text-xs text-muted-foreground">One command install</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/developers"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Code2 className="h-4 w-4" />
              View API Docs
            </Link>
            <Link
              href="/developers#claude-code-skill"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              <Terminal className="h-4 w-4" />
              Claude Code Skill
            </Link>
            <a
              href="/.well-known/openapi.json"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              OpenAPI Spec
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
