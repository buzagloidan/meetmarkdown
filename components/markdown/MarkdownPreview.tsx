"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
// Dark-mode override: github-dark applied via .dark scope in globals.css
import { CodeBlock } from "./CodeBlock";

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none px-4 py-4 h-full overflow-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          code: CodeBlock as React.ComponentType<React.HTMLAttributes<HTMLElement>>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
