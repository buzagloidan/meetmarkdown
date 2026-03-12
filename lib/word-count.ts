export interface MarkdownStats {
  words: number;
  chars: number;
  charsNoSpaces: number;
  lines: number;
  paragraphs: number;
  readingTime: string;
  headings: { level: number; text: string }[];
  codeBlocks: number;
  links: number;
  images: number;
}

export function analyzeMarkdown(md: string): MarkdownStats {
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
