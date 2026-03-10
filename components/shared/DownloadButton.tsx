"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadButtonProps {
  content: string;
  filename: string;
  mimeType?: string;
}

export function DownloadButton({
  content,
  filename,
  mimeType = "text/plain",
}: DownloadButtonProps) {
  function download() {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button variant="outline" size="sm" onClick={download} className="gap-1.5">
      <Download className="h-3.5 w-3.5" />
      Download
    </Button>
  );
}
