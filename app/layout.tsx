import type { Metadata } from "next";
import Script from "next/script";
import { Source_Sans_3, Source_Code_Pro, Fraunces } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JsonLdOrganization } from "@/components/shared/JsonLd";
import { FeedbackButton } from "@/components/shared/FeedbackButton";
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

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meetmarkdown.com"),
  title: {
    default: "MeetMarkdown – Free Online Markdown Tools | Markdown Tools Online",
    template: "%s | MeetMarkdown",
  },
  description:
    "Free online markdown tools — live editor, Mermaid diagrams, formatter, HTML/PDF export, and more. No sign-up, no tracking. Use markdown tools online today.",
  openGraph: {
    type: "website",
    siteName: "MeetMarkdown",
    images: ["/og-image.png"],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZKD3TWEDVK" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            'analytics_storage': 'granted'
          });
          gtag('config', 'G-ZKD3TWEDVK');
        `}
      </Script>
      <body className={`${sourceSans.variable} ${sourceCode.variable} ${fraunces.variable} antialiased`}>
        <JsonLdOrganization />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          <main className="min-h-[calc(100vh-56px)] pt-6">{children}</main>
          <SiteFooter />
          <FeedbackButton />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
