"use client";

import { useState, useMemo } from "react";
import { type Change } from "diff";
import { diffMarkdown } from "@/lib/diff";
import { cn } from "@/lib/cn";

const SAMPLE_A = `# Project README

## Installation

Run the following command to install:

\`\`\`bash
npm install my-package
\`\`\`

## Usage

Import and use the module in your project.
`;

const SAMPLE_B = `# Project README

## Installation

Run the following command to install dependencies:

\`\`\`bash
npm install my-package@latest
\`\`\`

## Usage

Import and use the module in your project.

## Contributing

Pull requests are welcome!
`;

export function DiffClient() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const { changes, added, removed } = useMemo(() => {
    if (!left && !right) return { changes: [] as Change[], added: 0, removed: 0 };
    return diffMarkdown(left, right);
  }, [left, right]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Original</label>
            <button
              onClick={() => { setLeft(SAMPLE_A); setRight(SAMPLE_B); }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Load example
            </button>
          </div>
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            placeholder="Paste the original document..."
            className="w-full h-64 resize-none rounded-lg border bg-background font-mono text-sm p-3 outline-none focus:ring-2 focus:ring-ring"
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Modified</label>
          <textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            placeholder="Paste the modified document..."
            className="w-full h-64 resize-none rounded-lg border bg-background font-mono text-sm p-3 outline-none focus:ring-2 focus:ring-ring"
            spellCheck={false}
          />
        </div>
      </div>

      {changes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-muted-foreground">{added} line{added !== 1 ? "s" : ""} added</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-muted-foreground">{removed} line{removed !== 1 ? "s" : ""} removed</span>
            </span>
          </div>

          <div className="rounded-lg border overflow-auto font-mono text-sm">
            {changes.map((change, i) => {
              const lines = change.value.split("\n").filter((_, idx, arr) =>
                idx < arr.length - 1 || arr[arr.length - 1] !== ""
              );
              return lines.map((line, j) => (
                <div
                  key={`${i}-${j}`}
                  className={cn(
                    "px-4 py-0.5 flex gap-3 min-w-0",
                    change.added && "bg-green-500/10 text-green-700 dark:text-green-400",
                    change.removed && "bg-red-500/10 text-red-700 dark:text-red-400",
                    !change.added && !change.removed && "text-muted-foreground"
                  )}
                >
                  <span className="select-none w-4 shrink-0 text-right opacity-50">
                    {change.added ? "+" : change.removed ? "−" : " "}
                  </span>
                  <span className="truncate">{line || " "}</span>
                </div>
              ));
            })}
          </div>
        </div>
      )}

      {!changes.length && (left || right) && (
        <p className="text-sm text-muted-foreground">No differences found.</p>
      )}
    </div>
  );
}
