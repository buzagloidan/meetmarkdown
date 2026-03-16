import type { Metadata } from "next";
import { ToolPageShell } from "@/components/shared/ToolPageShell";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact – MeetMarkdown",
  description: "Get in touch with the MeetMarkdown team. Send us a message and we'll get back to you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <ToolPageShell
      title="Contact Us"
      description="Have a question, suggestion, or found a bug? We'd love to hear from you."
      href="/contact"
    >
      <ContactClient />
    </ToolPageShell>
  );
}
