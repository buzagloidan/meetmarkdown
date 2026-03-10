"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export function MermaidToImageRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/mermaid-editor"); }, [router]);
  return null;
}
