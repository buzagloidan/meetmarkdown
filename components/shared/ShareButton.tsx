"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildShareUrl } from "@/lib/share";
import { toast } from "sonner";

interface ShareButtonProps {
  /** The URL path for this tool, e.g. "/mermaid-editor" */
  path: string;
  /** The content to encode in the shareable link */
  content: string;
  /** Optional label override */
  label?: string;
}

export function ShareButton({ path, content, label = "Share" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function share() {
    if (!content.trim()) {
      toast.error("Nothing to share");
      return;
    }

    const url = buildShareUrl(path, content);

    // Check URL length — browsers typically support ~2000 chars in URL bar,
    // but hash fragments can be much longer. Warn over 100KB.
    if (url.length > 100_000) {
      toast.error("Content is too large to share via URL");
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Share link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select a hidden input
      toast.error("Could not copy to clipboard");
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={share} className="gap-1.5">
      {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
      {copied ? "Copied!" : label}
    </Button>
  );
}
