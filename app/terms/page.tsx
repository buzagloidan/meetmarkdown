import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "MeetMarkdown terms of service — simple, fair, and to the point.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Terms of Service</h1>
      <p className="text-muted-foreground text-sm mb-12">Last updated: March 2026</p>

      <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-10">

        <section>
          <h2>1. Acceptance</h2>
          <p>
            By using MeetMarkdown (&quot;the Site&quot;, &quot;we&quot;, &quot;us&quot;), you agree
            to these terms. If you don&apos;t agree, please don&apos;t use the site. These terms
            are intentionally short and written in plain English.
          </p>
        </section>

        <section>
          <h2>2. What MeetMarkdown is</h2>
          <p>
            MeetMarkdown provides free, browser-based markdown utilities: a live editor, a
            formatter, a markdown-to-HTML converter, and a table formatter. All processing
            happens locally in your browser — no content is ever sent to our servers.
          </p>
        </section>

        <section>
          <h2>3. Free to use</h2>
          <p>
            All tools on MeetMarkdown are free to use with no account required. We reserve the
            right to introduce optional paid features in the future, but the core tools will
            always remain free.
          </p>
        </section>

        <section>
          <h2>4. Your content</h2>
          <p>
            Any content you write or paste into MeetMarkdown belongs entirely to you. We have no
            access to it, we don&apos;t store it, and we make no claim over it whatsoever.
          </p>
        </section>

        <section>
          <h2>5. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the site for any unlawful purpose or in violation of any applicable laws.</li>
            <li>
              Attempt to reverse-engineer, scrape at scale, or otherwise abuse the service in a
              way that degrades performance for other users.
            </li>
            <li>
              Use automated tools to hammer our infrastructure in a way that constitutes a denial
              of service attack.
            </li>
          </ul>
          <p>
            Since all processing is client-side, there is very little to abuse — but we reserve
            the right to block access if we detect malicious behaviour.
          </p>
        </section>

        <section>
          <h2>6. Intellectual property</h2>
          <p>
            The MeetMarkdown name, logo, and site design are our intellectual property. The
            underlying open-source libraries (Next.js, react-markdown, Mermaid, Prettier, etc.)
            are used under their respective open-source licences.
          </p>
        </section>

        <section>
          <h2>7. Disclaimer of warranties</h2>
          <p>
            MeetMarkdown is provided &quot;as is&quot; without any warranty of any kind. We do
            our best to keep the tools accurate and available, but we cannot guarantee
            uninterrupted access or error-free output. Use the tools at your own discretion.
          </p>
        </section>

        <section>
          <h2>8. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, MeetMarkdown shall not be liable for any
            indirect, incidental, or consequential damages arising from your use of the site,
            including but not limited to loss of data or profits.
          </p>
        </section>

        <section>
          <h2>9. Changes to these terms</h2>
          <p>
            We may update these terms from time to time. The &quot;Last updated&quot; date at the
            top will always reflect the most recent revision. Continued use of the site after
            changes are posted constitutes your acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>
            Questions about these terms? Email us at{" "}
            <a href="mailto:hello@meetmarkdown.com">hello@meetmarkdown.com</a>.
          </p>
        </section>

      </div>
    </div>
  );
}
