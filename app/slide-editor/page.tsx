import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { SlideEditorClient } from "./SlideEditorClient";

export const metadata: Metadata = {
  title: "Marp Slide Editor – Markdown Presentations Online",
  description:
    "Write Marp markdown and get a live slide preview. Navigate slides, choose themes, and export as a self-contained HTML presentation.",
  keywords: [
    "marp editor",
    "markdown slides",
    "markdown presentation",
    "marp online",
    "markdown to slides",
    "presentation maker",
  ],
  alternates: { canonical: "/slide-editor" },
};

export default function SlideEditorPage() {
  return (
    <>
      <JsonLd
        name="Marp Slide Editor"
        description="Write Marp markdown and get a live slide preview. Navigate slides, choose themes, and export as a self-contained HTML presentation."
        url="/slide-editor"
      />
      <div
        className="flex flex-col overflow-hidden"
        style={{ height: "calc(100vh - 81px)" }}
      >
        <SlideEditorClient />
      </div>
    </>
  );
}
