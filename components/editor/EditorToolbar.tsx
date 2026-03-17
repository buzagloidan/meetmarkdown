"use client";

import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Link2,
  Image,
  Quote,
  List,
  ListOrdered,
  ListChecks,
  Braces,
  Table,
  Minus,
} from "lucide-react";

interface EditorToolbarProps {
  onCommand: (command: string) => void;
}

const groups = [
  [
    { command: "h1", icon: Heading1, label: "Heading 1" },
    { command: "h2", icon: Heading2, label: "Heading 2" },
    { command: "h3", icon: Heading3, label: "Heading 3" },
  ],
  [
    { command: "bold", icon: Bold, label: "Bold (Ctrl+B)" },
    { command: "italic", icon: Italic, label: "Italic (Ctrl+I)" },
    { command: "strikethrough", icon: Strikethrough, label: "Strikethrough" },
  ],
  [
    { command: "link", icon: Link2, label: "Link (Ctrl+K)" },
    { command: "image", icon: Image, label: "Image" },
  ],
  [
    { command: "quote", icon: Quote, label: "Blockquote" },
    { command: "ul", icon: List, label: "Bullet List" },
    { command: "ol", icon: ListOrdered, label: "Ordered List" },
    { command: "task", icon: ListChecks, label: "Task List" },
  ],
  [
    { command: "code", icon: Code, label: "Inline Code" },
    { command: "codeBlock", icon: Braces, label: "Code Block" },
  ],
  [
    { command: "table", icon: Table, label: "Table" },
    { command: "hr", icon: Minus, label: "Horizontal Rule" },
  ],
];

export function EditorToolbar({ onCommand }: EditorToolbarProps) {
  return (
    <div className="flex items-center px-3 py-1 border-b gap-0.5 overflow-x-auto">
      {groups.map((group, gi) => (
        <div key={gi} className="flex items-center gap-0.5">
          {gi > 0 && <div className="w-px h-5 bg-border mx-1.5 flex-none" />}
          {group.map(({ command, icon: Icon, label }) => (
            <button
              key={command}
              title={label}
              onClick={(e) => {
                e.preventDefault();
                onCommand(command);
              }}
              className="p-1.5 rounded hover:bg-accent transition-colors text-muted-foreground hover:text-foreground flex-none"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
