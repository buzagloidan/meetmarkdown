"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";

const PLACEHOLDER = `# Welcome to MeetMarkdown

Write **bold**, *italic*, or \`code\` inline.

- Renders tables, diagrams, and syntax-highlighted code
- Paste your own markdown or start from scratch`;

export function HeroSection() {
  const [value, setValue] = useState("");
  const router = useRouter();

  function handleStart() {
    if (value.trim()) {
      sessionStorage.setItem("hero-markdown", value);
    }
    router.push("/editor");
  }

  return (
    <section className="relative py-20 px-4 text-center overflow-hidden">
      {/* Subtle radial background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
        }}
      />

      <h1
        className="text-5xl sm:text-6xl lg:text-7xl font-normal mb-5 leading-[1.1] [font-variant-ligatures:common-ligatures] [font-feature-settings:'liga'_1,'dlig'_1]"
        style={{
          fontFamily: "var(--font-serif)",
          letterSpacing: "-0.02em",
        }}
      >
        Markdown anything
      </h1>

      <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto mb-10">
        Paste your markdown or start typing — edit, format, convert, and export
        right in the browser. No account needed.
      </p>

      {/* Input card */}
      <div className="max-w-2xl mx-auto rounded-2xl border bg-background shadow-sm p-4 text-left mb-6">
        <div className="flex items-start gap-3">
          <FileText className="mt-0.5 h-5 w-5 text-primary shrink-0" />
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={PLACEHOLDER}
            rows={7}
            spellCheck={false}
            className="w-full resize-none bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground/50 leading-relaxed overflow-hidden"
          />
        </div>
      </div>

      <button
        onClick={handleStart}
        className="inline-flex items-center justify-center h-11 px-7 rounded-xl bg-foreground text-background text-sm font-semibold transition-opacity hover:opacity-80"
      >
        Start editing
      </button>
    </section>
  );
}
