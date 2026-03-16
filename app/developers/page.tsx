import type { Metadata } from "next";
import { ToolPageShell } from "@/components/shared/ToolPageShell";

export const metadata: Metadata = {
  title: "API for Developers & AI Agents – MeetMarkdown",
  description:
    "Free REST API to format, convert, diff, and analyze markdown. Built for developers and AI agents. No auth required. OpenAPI spec and llms.txt included.",
  alternates: { canonical: "/developers" },
};

const endpoints = [
  {
    method: "POST",
    path: "/api/v1/format",
    description: "Format markdown with consistent spacing and aligned tables.",
    input: '{ "markdown": "# Hello\\nworld" }',
    curl: `curl -X POST https://meetmarkdown.com/api/v1/format \\
  -H "Content-Type: application/json" \\
  -d '{"markdown":"# Hello\\nworld"}'`,
  },
  {
    method: "POST",
    path: "/api/v1/to-html",
    description: "Convert markdown to semantic HTML with syntax highlighting.",
    input: '{ "markdown": "# Hello\\n**bold**" }',
    curl: `curl -X POST https://meetmarkdown.com/api/v1/to-html \\
  -H "Content-Type: application/json" \\
  -d '{"markdown":"# Hello\\n**bold**"}'`,
  },
  {
    method: "POST",
    path: "/api/v1/html-to-markdown",
    description: "Convert HTML to clean, readable markdown.",
    input: '{ "html": "<h1>Hello</h1>" }',
    curl: `curl -X POST https://meetmarkdown.com/api/v1/html-to-markdown \\
  -H "Content-Type: application/json" \\
  -d '{"html":"<h1>Hello</h1>"}'`,
  },
  {
    method: "POST",
    path: "/api/v1/word-count",
    description:
      "Analyze markdown: word count, characters, reading time, headings, and more.",
    input: '{ "markdown": "# Hello\\nSome text here." }',
    curl: `curl -X POST https://meetmarkdown.com/api/v1/word-count \\
  -H "Content-Type: application/json" \\
  -d '{"markdown":"# Hello\\nSome text here."}'`,
  },
  {
    method: "POST",
    path: "/api/v1/diff",
    description: "Compare two markdown documents line by line.",
    input: '{ "original": "Hello", "modified": "Hello world" }',
    curl: `curl -X POST https://meetmarkdown.com/api/v1/diff \\
  -H "Content-Type: application/json" \\
  -d '{"original":"Hello","modified":"Hello world"}'`,
  },
  {
    method: "POST",
    path: "/api/v1/table-format",
    description: "Format and align GFM markdown tables.",
    input: '{ "markdown": "| A | B |\\n|---|---|\\n| 1 | 2 |" }',
    curl: `curl -X POST https://meetmarkdown.com/api/v1/table-format \\
  -H "Content-Type: application/json" \\
  -d '{"markdown":"| A | B |\\n|---|---|\\n| 1 | 2 |"}'`,
  },
];

export default function DevelopersPage() {
  return (
    <ToolPageShell
      title="API for Developers & AI Agents"
      description="Free REST API to format, convert, diff, and analyze markdown. Built for developers, scripts, and AI agents. No authentication required."
      href="/developers"
    >
      <div className="space-y-10">
        <section className="rounded-xl border bg-gradient-to-br from-primary/5 via-background to-primary/5 p-6 space-y-4">
          <h2 className="text-xl font-semibold">AI Agent Integration</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            MeetMarkdown is designed for AI agents out of the box. Your agent can discover
            our tools automatically and call them via standard REST.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="/llms.txt"
              className="rounded-lg border bg-background p-4 hover:bg-muted/50 transition-colors group"
            >
              <p className="text-sm font-semibold group-hover:text-primary transition-colors">llms.txt</p>
              <p className="text-xs text-muted-foreground mt-1">
                Emerging standard for AI-native site discovery. Point your agent
                at <code className="font-mono text-[11px]">/llms.txt</code> to
                learn what tools are available.
              </p>
            </a>
            <a
              href="/.well-known/openapi.json"
              className="rounded-lg border bg-background p-4 hover:bg-muted/50 transition-colors group"
            >
              <p className="text-sm font-semibold group-hover:text-primary transition-colors">OpenAPI 3.1 Spec</p>
              <p className="text-xs text-muted-foreground mt-1">
                Machine-readable API spec at{" "}
                <code className="font-mono text-[11px]">/.well-known/openapi.json</code>.
                Auto-generate clients in any language.
              </p>
            </a>
            <a
              href="/llms-full.txt"
              className="rounded-lg border bg-background p-4 hover:bg-muted/50 transition-colors group"
            >
              <p className="text-sm font-semibold group-hover:text-primary transition-colors">llms-full.txt</p>
              <p className="text-xs text-muted-foreground mt-1">
                Detailed reference with every endpoint&apos;s inputs, outputs,
                and examples — optimized for LLM context windows.
              </p>
            </a>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Quick start for agents</p>
            <pre className="overflow-x-auto text-xs font-mono">
{`# 1. Discover what's available
curl https://meetmarkdown.com/llms.txt

# 2. Get the full API spec
curl https://meetmarkdown.com/.well-known/openapi.json

# 3. Call any endpoint
curl -X POST https://meetmarkdown.com/api/v1/format \\
  -H "Content-Type: application/json" \\
  -d '{"markdown":"# Hello\\nworld"}'`}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Getting Started</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Base URL:{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">
                https://meetmarkdown.com/api/v1
              </code>
            </p>
            <p>All endpoints accept and return JSON. No authentication needed.</p>
            <p>Maximum input size: 100KB. Rate limit: 60 requests per minute per IP.</p>
            <p>CORS is enabled for all origins.</p>
          </div>
          <div className="flex gap-3 text-sm">
            <a
              href="/.well-known/openapi.json"
              className="rounded-lg border px-3 py-1.5 font-medium hover:bg-muted transition-colors"
            >
              OpenAPI Spec
            </a>
            <a
              href="/llms.txt"
              className="rounded-lg border px-3 py-1.5 font-medium hover:bg-muted transition-colors"
            >
              llms.txt
            </a>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Endpoints</h2>
          {endpoints.map((ep) => (
            <div key={ep.path} className="space-y-3 rounded-xl border p-5">
              <div className="flex items-center gap-2">
                <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                  {ep.method}
                </span>
                <code className="font-mono text-sm">{ep.path}</code>
              </div>
              <p className="text-sm text-muted-foreground">{ep.description}</p>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Example</p>
                <pre className="overflow-x-auto rounded-lg bg-muted/50 p-3 text-xs font-mono">
                  {ep.curl}
                </pre>
              </div>
            </div>
          ))}
        </section>

        <section id="claude-code-skill" className="scroll-mt-24 rounded-xl border bg-gradient-to-br from-primary/5 via-background to-primary/5 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Skill
            </span>
          </div>
          <h2 className="text-xl font-semibold">Claude Code Skill</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Use MeetMarkdown tools directly from Claude Code. Format markdown files,
            convert between formats, get word counts, and diff documents — all from
            your terminal.
          </p>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground">Install</p>
            <div className="rounded-lg border bg-muted/30 p-4">
              <pre className="overflow-x-auto text-xs font-mono">
{`# Copy the skill to your project
mkdir -p .claude/skills
curl -s https://meetmarkdown.com/skills/meetmarkdown-tools/SKILL.md \\
  -o .claude/skills/meetmarkdown-tools/SKILL.md --create-dirs

# Or install globally
curl -s https://meetmarkdown.com/skills/meetmarkdown-tools/SKILL.md \\
  -o ~/.claude/skills/meetmarkdown-tools/SKILL.md --create-dirs`}
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground">What you can do</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border bg-background p-3">
                <p className="text-xs font-mono text-muted-foreground mb-1">&quot;Format my README.md&quot;</p>
                <p className="text-xs text-muted-foreground">Consistent spacing, aligned tables, wrapped prose</p>
              </div>
              <div className="rounded-lg border bg-background p-3">
                <p className="text-xs font-mono text-muted-foreground mb-1">&quot;Convert this HTML to markdown&quot;</p>
                <p className="text-xs text-muted-foreground">Clean markdown from any HTML source</p>
              </div>
              <div className="rounded-lg border bg-background p-3">
                <p className="text-xs font-mono text-muted-foreground mb-1">&quot;How many words in docs/*.md?&quot;</p>
                <p className="text-xs text-muted-foreground">Word count, reading time, heading structure</p>
              </div>
              <div className="rounded-lg border bg-background p-3">
                <p className="text-xs font-mono text-muted-foreground mb-1">&quot;Diff README.md vs README.bak&quot;</p>
                <p className="text-xs text-muted-foreground">Line-by-line comparison with added/removed counts</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Error Responses</h2>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-4 py-2 text-left font-medium">Status</th>
                  <th className="px-4 py-2 text-left font-medium">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 font-mono">400</td>
                  <td className="px-4 py-2">Missing or invalid input</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-mono">413</td>
                  <td className="px-4 py-2">Input exceeds 100KB limit</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-mono">429</td>
                  <td className="px-4 py-2">
                    Rate limit exceeded (check <code className="font-mono">Retry-After</code>{" "}
                    header)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">500</td>
                  <td className="px-4 py-2">Internal server error</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </ToolPageShell>
  );
}
