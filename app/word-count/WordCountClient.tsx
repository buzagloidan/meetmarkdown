"use client";

import { useMemo, useState } from "react";
import { Clock, FileText, Hash, Rows, AlignLeft, Heading } from "lucide-react";

function analyze(md: string) {
  const text = md.replace(/```[\s\S]*?```/g, "").replace(/`[^`]+`/g, "");
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = md.length;
  const charsNoSpaces = md.replace(/\s/g, "").length;
  const lines = md.split("\n").length;
  const paragraphs = md.split(/\n\n+/).filter((p) => p.trim().length > 0).length;
  const readingTimeSec = Math.ceil((words / 238) * 60);
  const readingTime =
    readingTimeSec < 60
      ? `${readingTimeSec}s`
      : `${Math.floor(readingTimeSec / 60)}m ${readingTimeSec % 60}s`;

  const headings = [...md.matchAll(/^(#{1,6})\s+(.+)/gm)].map((m) => ({
    level: m[1].length,
    text: m[2].trim(),
  }));

  const codeBlocks = [...md.matchAll(/```[\s\S]*?```/g)].length;
  const links = [...md.matchAll(/\[.+?\]\(.+?\)/g)].length;
  const images = [...md.matchAll(/!\[.+?\]\(.+?\)/g)].length;

  return { words, chars, charsNoSpaces, lines, paragraphs, readingTime, headings, codeBlocks, links, images };
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
        {icon}
        {label}
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export function WordCountClient() {
  const [content, setContent] = useState("");
  const stats = useMemo(() => analyze(content), [content]);

  return (
    <div className="space-y-8">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste your markdown here..."
        className="w-full h-56 resize-none rounded-lg border bg-background font-mono text-sm p-3 outline-none focus:ring-2 focus:ring-ring"
        spellCheck={false}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatCard icon={<FileText className="h-3.5 w-3.5" />} label="Words" value={stats.words} />
        <StatCard icon={<Hash className="h-3.5 w-3.5" />} label="Characters" value={stats.chars} />
        <StatCard icon={<AlignLeft className="h-3.5 w-3.5" />} label="No spaces" value={stats.charsNoSpaces} />
        <StatCard icon={<Rows className="h-3.5 w-3.5" />} label="Lines" value={stats.lines} />
        <StatCard icon={<Clock className="h-3.5 w-3.5" />} label="Reading time" value={stats.readingTime} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={<AlignLeft className="h-3.5 w-3.5" />} label="Paragraphs" value={stats.paragraphs} />
        <StatCard icon={<Heading className="h-3.5 w-3.5" />} label="Headings" value={stats.headings.length} />
        <StatCard icon={<Hash className="h-3.5 w-3.5" />} label="Code blocks" value={stats.codeBlocks} />
        <StatCard icon={<Hash className="h-3.5 w-3.5" />} label="Links" value={stats.links} />
      </div>

      {stats.headings.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3">Document outline</h3>
          <ul className="space-y-1 border rounded-lg p-4 bg-muted/20">
            {stats.headings.map((h, i) => (
              <li
                key={i}
                className="text-sm text-muted-foreground truncate"
                style={{ paddingLeft: `${(h.level - 1) * 16}px` }}
              >
                <span className="text-xs font-mono mr-2 text-primary">{"#".repeat(h.level)}</span>
                {h.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
