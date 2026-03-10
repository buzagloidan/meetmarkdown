import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://meetmarkdown.com"),
  title: {
    default: "MeetMarkdown — Free Online Markdown Tools",
    template: "%s | MeetMarkdown",
  },
  description:
    "Free online markdown tools: live editor with Mermaid diagrams, formatter, HTML converter, and table formatter. No sign-up required.",
  openGraph: {
    type: "website",
    siteName: "MeetMarkdown",
    images: ["/og-image.png"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          <main className="min-h-[calc(100vh-56px)]">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
