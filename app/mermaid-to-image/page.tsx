import type { Metadata } from "next";
import { MermaidToImageRedirect } from "./MermaidToImageRedirect";

export const metadata: Metadata = {
  alternates: { canonical: "/mermaid-editor" },
  robots: { index: false, follow: false },
};

export default function MermaidToImagePage() {
  return <MermaidToImageRedirect />;
}
