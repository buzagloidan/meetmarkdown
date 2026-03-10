"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { CodeBlock } from "./CodeBlock";
import React from "react";

interface MarkdownPreviewProps {
  content: string;
}

function PreBlock({ children }: { children?: React.ReactNode }) {
  // If the pre contains a mermaid code block, skip the <pre> wrapper entirely
  // so the prose dark background doesn't cover the diagram
  const child = React.Children.only(children) as React.ReactElement<{ className?: string }> | null;
  if (child && child.props?.className?.includes("language-mermaid")) {
    return <>{children}</>;
  }
  return <pre>{children}</pre>;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none px-4 py-4 h-full overflow-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          code: CodeBlock as React.ComponentType<React.HTMLAttributes<HTMLElement>>,
          pre: PreBlock as React.ComponentType<React.HTMLAttributes<HTMLElement>>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
