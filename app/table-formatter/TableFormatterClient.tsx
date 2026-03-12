"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/CopyButton";
import { ShareButton } from "@/components/shared/ShareButton";
import { DownloadButton } from "@/components/shared/DownloadButton";
import { useSharedContent } from "@/lib/use-shared-content";
import { Loader2, TableIcon, Plus } from "lucide-react";

const SAMPLE_TABLE = `| Name | Role | Status |
|---|---|---|
| Alice | Developer | Active |
| Bob | Designer | On leave |
| Charlie | PM | Active |
`;

export function TableFormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  useSharedContent(useCallback((v: string) => setInput(v), []));

  async function format() {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    try {
      const { formatMarkdown } = await import("@/lib/prettier-format");
      const result = await formatMarkdown(input);
      setOutput(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Formatting failed");
    } finally {
      setLoading(false);
    }
  }

  function generateBlankTable() {
    const header = Array.from({ length: cols }, (_, i) => `Column ${i + 1}`).join(" | ");
    const separator = Array.from({ length: cols }, () => "---").join(" | ");
    const dataRow = Array.from({ length: cols }, () => "").join(" | ");
    const dataRows = Array.from({ length: rows }, () => `| ${dataRow} |`).join("\n");
    setInput(`| ${header} |\n| ${separator} |\n${dataRows}\n`);
    setOutput("");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 flex-wrap p-4 border rounded-lg bg-muted/20">
        <span className="text-sm font-medium">Generate blank table:</span>
        <div className="flex items-center gap-2">
          <label className="text-sm">Rows</label>
          <input
            type="number"
            min={1}
            max={20}
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            className="w-16 rounded border bg-background px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Columns</label>
          <input
            type="number"
            min={1}
            max={10}
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            className="w-16 rounded border bg-background px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button variant="outline" size="sm" onClick={generateBlankTable} className="gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          Generate
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Paste your table</label>
            <div className="flex gap-2">
              <ShareButton path="/table-formatter" content={input} />
              <Button variant="ghost" size="sm" onClick={() => { setInput(SAMPLE_TABLE); setOutput(""); }}>
                Load example
              </Button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={SAMPLE_TABLE}
            className="w-full h-64 resize-none rounded-lg border bg-background font-mono text-sm p-3 outline-none focus:ring-2 focus:ring-ring"
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Aligned output</label>
            <div className="flex gap-2">
              {output && <CopyButton text={output} />}
              {output && (
                <DownloadButton content={output} filename="table.md" mimeType="text/markdown" />
              )}
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Aligned table will appear here..."
            className="w-full h-64 resize-none rounded-lg border bg-muted/30 font-mono text-sm p-3 outline-none"
            spellCheck={false}
          />
        </div>
      </div>
      {error && <p className="text-sm text-destructive">Error: {error}</p>}
      <Button onClick={format} disabled={loading || !input.trim()} size="lg" className="gap-2">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <TableIcon className="h-4 w-4" />}
        Align Table
      </Button>
    </div>
  );
}
