import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/home/HeroSection";
import { ToolGrid } from "@/components/home/ToolGrid";
import { ApiBanner } from "@/components/home/ApiBanner";
import { JsonLdWebSite, JsonLdItemList } from "@/components/shared/JsonLd";
import { tools, siteUrl } from "@/lib/tools";

export const metadata: Metadata = {
  title: "MeetMarkdown – Free Online Markdown Tools | Markdown Tools Online",
  description:
    "Free online markdown tools — live editor, Mermaid diagrams, formatter, HTML/PDF export, and more. No sign-up, no tracking. Use markdown tools online today.",
  keywords: [
    "markdown tools online",
    "markdown tools",
    "markdown editor online",
    "mermaid diagram editor",
    "markdown formatter",
    "markdown to html",
    "markdown to pdf",
    "free markdown tools",
    "online markdown editor",
    "markdown api",
    "markdown tools api",
  ],
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLdWebSite />
      <JsonLdItemList
        items={tools.map((t) => ({ name: t.title, description: t.description, url: `${siteUrl}${t.href}` }))}
      />
      <HeroSection />
      <ToolGrid />
      <ApiBanner />
    </>
  );
}
