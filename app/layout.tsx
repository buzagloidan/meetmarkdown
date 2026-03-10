import type { Metadata } from "next";
import { Source_Sans_3, Source_Code_Pro } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sourceCode = Source_Code_Pro({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

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
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sourceSans.variable} ${sourceCode.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          <main className="min-h-[calc(100vh-56px)] pt-6">{children}</main>
          <SiteFooter />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
