import { MermaidDiagram } from "./MermaidDiagram";

interface CodeBlockProps {
  className?: string;
  children?: React.ReactNode;
}

export function CodeBlock({ className, children }: CodeBlockProps) {
  const language = /language-(\w+)/.exec(className ?? "")?.[1];

  if (language === "mermaid") {
    const code = String(children).replace(/\n$/, "");
    return <MermaidDiagram code={code} />;
  }

  return <code className={className}>{children}</code>;
}
