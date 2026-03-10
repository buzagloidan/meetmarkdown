import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "FAQ & Help",
  description: "Answers to common questions about MeetMarkdown tools — editor, formatter, PDF export, Mermaid diagrams, and more.",
  alternates: { canonical: "/faq" },
};

const faqs: { section: string; items: { q: string; a: React.ReactNode }[] }[] = [
  {
    section: "General",
    items: [
      {
        q: "Is MeetMarkdown really free?",
        a: "Yes, completely. All tools are free to use with no account required, no usage limits, and no hidden fees. We plan to keep the core tools free forever.",
      },
      {
        q: "Do you store my content?",
        a: "No. Every tool on MeetMarkdown runs entirely in your browser. Your markdown never leaves your device — it is never sent to or stored on our servers.",
      },
      {
        q: "Do I need to create an account?",
        a: "No. There is no sign-up, no login, and no account of any kind. Open a tool and start using it immediately.",
      },
      {
        q: "Does MeetMarkdown work offline?",
        a: "Once the page has loaded, most tools (Editor, Formatter, Table Formatter, Word Count, Diff, HTML↔MD) work entirely client-side and will continue to work if you lose internet. The URL to Markdown tool requires a network connection to fetch the target page.",
      },
      {
        q: "Which markdown flavour do you support?",
        a: "We use GitHub Flavored Markdown (GFM) as the base, which includes tables, strikethrough, task lists, and fenced code blocks. Mermaid diagram blocks are also supported in the Live Editor and PDF tool.",
      },
    ],
  },
  {
    section: "Live Editor",
    items: [
      {
        q: "How do I render a Mermaid diagram?",
        a: (
          <>
            Wrap your diagram code in a fenced code block with the language set to{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">mermaid</code>:
            <pre className="mt-2 text-xs bg-muted rounded p-3 overflow-x-auto">{`\`\`\`mermaid
flowchart TD
  A[Start] --> B[End]
\`\`\``}</pre>
            Supported diagram types include flowchart, sequence, class, state, ER, Gantt, pie, and more.
          </>
        ),
      },
      {
        q: "How do I format my markdown quickly?",
        a: (
          <>
            Press{" "}
            <kbd className="text-xs border rounded px-1.5 py-0.5 bg-muted">⌘⇧F</kbd> (Mac) or{" "}
            <kbd className="text-xs border rounded px-1.5 py-0.5 bg-muted">Ctrl+Shift+F</kbd>{" "}
            (Windows/Linux) in the editor. You can also click the <strong>Format</strong> button in the toolbar.
          </>
        ),
      },
      {
        q: "Can I use Tab to indent in the editor?",
        a: "Yes. Pressing Tab in the editor inserts two spaces. This makes it easy to write nested lists and indented code without the browser switching focus.",
      },
      {
        q: "Does the editor save my work?",
        a: "Not currently — the content lives in memory for the duration of your session. Use the Download button to save your work as a .md file. Persistent local save (localStorage) is planned for a future update.",
      },
    ],
  },
  {
    section: "Markdown to PDF",
    items: [
      {
        q: "How does the PDF export work?",
        a: 'Click "Print / Save as PDF". Your browser\'s native print dialog will open — select "Save as PDF" (or "Microsoft Print to PDF" on Windows) as the destination. This gives you full control over page size, margins, and orientation.',
      },
      {
        q: "The PDF looks different from the preview. Why?",
        a: 'Print rendering varies slightly between browsers. Chrome and Edge generally produce the best results. Try enabling "Background graphics" in the print dialog for correct code block colors.',
      },
      {
        q: "Can I control the page margins?",
        a: "Yes — in the browser print dialog you can set custom margins (none, minimum, default, or custom values). We recommend \"Minimum\" or \"Custom\" for a cleaner result.",
      },
    ],
  },
  {
    section: "URL to Markdown",
    items: [
      {
        q: "Why does some URL fetching fail?",
        a: "Some websites block server-side requests (Cloudflare protection, paywalls, login walls, or restrictive CORS/bot policies). There is no way to bypass these protections — only publicly accessible pages can be fetched.",
      },
      {
        q: "The output has a lot of junk — nav links, ads, etc.",
        a: "We automatically strip common boilerplate elements (nav, header, footer, aside, script, style). For heavily structured or non-standard pages some noise may remain. You can clean it up manually in the output box.",
      },
    ],
  },
  {
    section: "Formatter & Table Formatter",
    items: [
      {
        q: "What does the Formatter actually change?",
        a: "It runs your markdown through Prettier, which normalises heading styles, wraps long lines at 80 characters, ensures consistent list markers, removes trailing whitespace, and aligns table columns.",
      },
      {
        q: "Will the Formatter change my content?",
        a: "No — Prettier only changes whitespace and formatting. Your actual content (words, headings, links) is never modified.",
      },
      {
        q: "Can I format just a table without the full Formatter tool?",
        a: (
          <>
            Yes — use the dedicated{" "}
            <Link href="/table-formatter" className="text-primary underline underline-offset-2">
              Table Formatter
            </Link>{" "}
            tool. It also includes a blank-table generator so you can build tables from scratch.
          </>
        ),
      },
    ],
  },
  {
    section: "Privacy & Data",
    items: [
      {
        q: "What data do you collect?",
        a: (
          <>
            Almost nothing. See our{" "}
            <Link href="/privacy" className="text-primary underline underline-offset-2">
              Privacy Policy
            </Link>{" "}
            for the full details. The short version: we collect standard server access logs (via Vercel) and store your theme preference in localStorage. We do not use analytics or tracking cookies.
          </>
        ),
      },
      {
        q: "Can I use MeetMarkdown for sensitive or confidential documents?",
        a: "Yes. Since all processing happens locally in your browser and nothing is transmitted to our servers, it is safe to use with sensitive content. The only exception is the URL to Markdown tool, which makes a server-side request to fetch the target URL.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-3">FAQ & Help</h1>
        <p className="text-muted-foreground text-lg">
          Common questions about MeetMarkdown. Can&apos;t find what you need?{" "}
          <a href="mailto:hello@meetmarkdown.com" className="text-primary underline underline-offset-2">
            Email us
          </a>
          .
        </p>
      </div>

      {/* Quick jump links */}
      <nav className="flex flex-wrap gap-2 mb-12">
        {faqs.map((section) => (
          <a
            key={section.section}
            href={`#${section.section.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
            className="text-sm px-3 py-1.5 rounded-full border hover:bg-accent transition-colors"
          >
            {section.section}
          </a>
        ))}
      </nav>

      <div className="space-y-16">
        {faqs.map((section) => (
          <section
            key={section.section}
            id={section.section.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}
          >
            <h2 className="text-xl font-bold mb-6 pb-2 border-b">{section.section}</h2>
            <div className="space-y-6">
              {section.items.map((item) => (
                <div key={item.q}>
                  <h3 className="font-semibold mb-2">{item.q}</h3>
                  <div className="text-muted-foreground text-sm leading-relaxed">{item.a}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Tool quick links at bottom */}
      <div className="mt-16 pt-8 border-t">
        <h2 className="text-lg font-bold mb-4">Jump to a tool</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-accent text-sm transition-colors"
            >
              <span>{tool.icon}</span>
              <span>{tool.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
