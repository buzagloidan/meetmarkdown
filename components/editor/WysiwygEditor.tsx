"use client";

import { useRef, useEffect, useCallback } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import TurndownService from "turndown";
// @ts-expect-error — no type declarations available
import { gfm } from "turndown-plugin-gfm";
import DOMPurify from "dompurify";

async function markdownToHtml(md: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(md);
  return DOMPurify.sanitize(String(result));
}

function htmlToMarkdown(html: string): string {
  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });
  td.use(gfm);
  return td.turndown(html);
}

interface WysiwygEditorProps {
  initialContent: string;
  onChange: (markdown: string) => void;
}

export function WysiwygEditor({ initialContent, onChange }: WysiwygEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!editorRef.current) return;
    markdownToHtml(initialContent).then((html) => {
      if (editorRef.current) {
        editorRef.current.textContent = "";
        const template = document.createElement("template");
        template.innerHTML = html;
        editorRef.current.appendChild(template.content);
      }
    });
    // Only run on mount — initialContent is a snapshot
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Flush pending conversion on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        if (editorRef.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          const md = htmlToMarkdown(editorRef.current.innerHTML);
          onChangeRef.current(md);
        }
      }
    };
  }, []);

  const handleInput = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!editorRef.current) return;
      const md = htmlToMarkdown(editorRef.current.innerHTML);
      onChangeRef.current(md);
    }, 300);
  }, []);

  return (
    <div
      ref={editorRef}
      contentEditable
      suppressContentEditableWarning
      className="prose prose-sm sm:prose-base dark:prose-invert max-w-none px-6 py-4 h-full overflow-auto outline-none"
      onInput={handleInput}
      spellCheck={false}
    />
  );
}

export function execFormatCommand(command: string) {
  switch (command) {
    case "bold":
      document.execCommand("bold");
      break;
    case "italic":
      document.execCommand("italic");
      break;
    case "strikethrough":
      document.execCommand("strikeThrough");
      break;
    case "h1":
      document.execCommand("formatBlock", false, "h1");
      break;
    case "h2":
      document.execCommand("formatBlock", false, "h2");
      break;
    case "h3":
      document.execCommand("formatBlock", false, "h3");
      break;
    case "quote":
      document.execCommand("formatBlock", false, "blockquote");
      break;
    case "ul":
      document.execCommand("insertUnorderedList");
      break;
    case "ol":
      document.execCommand("insertOrderedList");
      break;
    case "code": {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
        const range = sel.getRangeAt(0);
        const code = document.createElement("code");
        range.surroundContents(code);
      }
      break;
    }
    case "link": {
      const url = prompt("Enter URL:");
      if (url) document.execCommand("createLink", false, url);
      break;
    }
    case "hr":
      document.execCommand("insertHorizontalRule");
      break;
  }
}
