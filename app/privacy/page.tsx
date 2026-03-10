import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "MeetMarkdown privacy policy — what data we collect (spoiler: almost none).",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Privacy Policy</h1>
      <p className="text-muted-foreground text-sm mb-12">Last updated: March 2026</p>

      <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-10">

        <section>
          <h2>The short version</h2>
          <p>
            MeetMarkdown is a collection of browser-based tools. Your markdown never leaves your
            device — everything is processed locally in your browser. We don&apos;t have a backend
            that receives or stores your content.
          </p>
        </section>

        <section>
          <h2>What we collect</h2>
          <p>We collect the absolute minimum required to operate the site:</p>
          <ul>
            <li>
              <strong>Nothing you type.</strong> All markdown you write, paste, or format stays in
              your browser tab and is never transmitted to our servers.
            </li>
            <li>
              <strong>Theme preference.</strong> Your light/dark mode choice is stored in your
              browser&apos;s <code>localStorage</code>. It never leaves your device.
            </li>
            <li>
              <strong>Basic server logs.</strong> Like any website, our hosting provider
              (Vercel) automatically records standard HTTP request logs (IP address, browser
              type, page visited, timestamp). These are retained for a short period for security
              and performance purposes and are not linked to any personal profile.
            </li>
          </ul>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            We do not use tracking cookies, advertising cookies, or any third-party analytics
            cookies. The only browser storage we use is <code>localStorage</code> for your theme
            preference.
          </p>
        </section>

        <section>
          <h2>Third-party services</h2>
          <p>
            MeetMarkdown is hosted on <strong>Vercel</strong>. When you visit the site, your
            request goes through Vercel&apos;s CDN infrastructure. Vercel&apos;s own privacy
            policy governs any data collected at the infrastructure level.
          </p>
          <p>
            We do not use Google Analytics, Meta Pixel, or any other third-party tracking or
            advertising service.
          </p>
        </section>

        <section>
          <h2>Your content</h2>
          <p>
            Any markdown you write or paste into our tools is processed entirely within your
            browser using JavaScript. It is never uploaded, stored, or analysed by us. You
            retain full ownership of your content.
          </p>
        </section>

        <section>
          <h2>Children&apos;s privacy</h2>
          <p>
            MeetMarkdown does not knowingly collect any information from children under 13. The
            site contains no registration forms and collects no personal data, making it safe
            for users of all ages.
          </p>
        </section>

        <section>
          <h2>Changes to this policy</h2>
          <p>
            If we ever make meaningful changes to this policy, we will update the date at the
            top of this page. Continued use of MeetMarkdown after any changes constitutes
            acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about this policy? Reach out at{" "}
            <a href="mailto:hello@meetmarkdown.com">hello@meetmarkdown.com</a>.
          </p>
        </section>

      </div>
    </div>
  );
}
