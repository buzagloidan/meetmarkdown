import { diffLines, type Change } from "diff";

export interface DiffResult {
  changes: Change[];
  added: number;
  removed: number;
}

export function diffMarkdown(original: string, modified: string): DiffResult {
  const changes = diffLines(original, modified);
  const added = changes.filter((c) => c.added).reduce((n, c) => n + (c.count ?? 0), 0);
  const removed = changes.filter((c) => c.removed).reduce((n, c) => n + (c.count ?? 0), 0);
  return { changes, added, removed };
}
