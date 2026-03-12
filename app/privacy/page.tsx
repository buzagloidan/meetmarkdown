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
            MeetMarkdown is a collection of browser-based tools. All processing happens locally in
            your browser — we do not have a backend that receives or stores your content. We never
            see, log, or analyse anything you type into our tools.
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
          <h2>Shareable links</h2>
          <p>
            Some tools include a <strong>Share</strong> button that generates a URL containing
            your content encoded directly in the link itself (in the URL fragment / hash). When
            you create a shareable link:
          </p>
          <ul>
            <li>
              <strong>No content is sent to or stored on our servers.</strong> The encoded content
              lives entirely within the URL. URL fragments (the part after <code>#</code>) are
              never transmitted to web servers by browsers — this is defined by the HTTP
              specification.
            </li>
            <li>
              <strong>We have no record of shared links.</strong> Because the content is embedded
              in the URL itself, we cannot see, moderate, revoke, or track shared links. We do not
              maintain any database of shared content.
            </li>
            <li>
              <strong>You control distribution.</strong> A shareable link only reaches people you
              send it to. Treat it like any other content you share — once you send a link to
              someone, they can forward it to others.
            </li>
          </ul>
          <p>
            If you paste sensitive, confidential, or personal information into a tool and generate
            a shareable link, anyone who receives that link can view the content. Share responsibly.
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
