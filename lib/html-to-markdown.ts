import TurndownService from "turndown";
// @ts-expect-error - turndown-plugin-gfm types not available
import { gfm } from "turndown-plugin-gfm";

export function htmlToMarkdown(html: string): string {
  const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
  td.use(gfm);
  return td.turndown(html);
}
