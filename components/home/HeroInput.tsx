"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";

const PLACEHOLDER = `# Welcome to MeetMarkdown

Write **bold**, *italic*, or \`code\` inline.

- Renders tables, diagrams, and syntax-highlighted code
- Paste your own markdown or start from scratch`;

export function HeroInput() {
  const [value, setValue] = useState("");
  const router = useRouter();

  function handleStart() {
    if (value.trim()) {
      sessionStorage.setItem("hero-markdown", value);
    }
    router.push("/editor");
  }

  return (
    <>
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
    </>
  );
}
