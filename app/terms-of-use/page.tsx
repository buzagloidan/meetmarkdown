import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for MeetMarkdown — acceptable use rules, prohibited activities, and user responsibilities.",
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Terms of Use</h1>
      <p className="text-muted-foreground text-sm mb-12">Last updated: March 2026</p>

      <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-10">

        <section>
          <h2>1. Overview</h2>
          <p>
            These Terms of Use govern how you may use MeetMarkdown and its tools. They complement
            our{" "}
            <Link href="/terms" className="text-primary underline underline-offset-2">
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary underline underline-offset-2">
              Privacy Policy
            </Link>
            . By using any MeetMarkdown tool, you agree to follow the rules set out here.
          </p>
        </section>

        <section>
          <h2>2. Permitted Use</h2>
          <p>
            You may use MeetMarkdown for any personal, educational, or commercial purpose that is
            lawful and consistent with these Terms of Use. All tools are free to use with no
            account required.
          </p>
          <p>Examples of permitted use include:</p>
          <ul>
            <li>Writing, editing, and formatting markdown documents for personal or professional use.</li>
            <li>Exporting markdown as HTML, PDF, or image formats for distribution.</li>
            <li>Creating and exporting Mermaid diagrams for documentation, presentations, or publications.</li>
            <li>Converting web pages to markdown for personal archiving or offline reading.</li>
            <li>Embedding converted content in your own projects, documentation, or publications.</li>
          </ul>
        </section>

        <section>
          <h2>3. Prohibited Activities</h2>
          <p>
            The following activities are strictly prohibited when using MeetMarkdown:
          </p>

          <h3>3.1 Unlawful or Harmful Content</h3>
          <ul>
            <li>
              Creating, processing, or distributing content that is unlawful, defamatory,
              fraudulent, obscene, harassing, threatening, or that infringes any third-party
              intellectual property rights.
            </li>
            <li>
              Using the Service to produce spam, phishing materials, malware, or any other
              malicious content.
            </li>
            <li>
              Generating content that constitutes illegal hate speech or incites violence against
              any person or group.
            </li>
          </ul>

          <h3>3.2 Infrastructure Abuse</h3>
          <ul>
            <li>
              Attempting to gain unauthorised access to any part of the Service, its hosting
              infrastructure, or systems connected to the Service.
            </li>
            <li>
              Launching denial-of-service attacks or otherwise degrading the Service&apos;s
              availability for other users.
            </li>
            <li>
              Using automated bots, crawlers, or scrapers to access the Service in a way that
              places an excessive or unreasonable load on our infrastructure.
            </li>
            <li>
              Attempting to probe, scan, or test the vulnerability of the Service without explicit
              written authorisation from us.
            </li>
          </ul>

          <h3>3.3 Intellectual Property Violations</h3>
          <ul>
            <li>
              Reproducing, distributing, modifying, or creating derivative works of any part of the
              Service — including its code, design, or branding — without our prior written consent,
              except where such use is expressly permitted by an applicable open-source licence.
            </li>
            <li>
              Using MeetMarkdown&apos;s name, logo, or trademarks in any way that implies
              endorsement, partnership, or affiliation without our written consent.
            </li>
            <li>
              Reverse engineering, decompiling, or disassembling any component of the Service that
              is not already publicly available as open-source code.
            </li>
          </ul>

          <h3>3.4 Misuse of the URL to Markdown Tool</h3>
          <ul>
            <li>
              Fetching content from URLs where you do not have permission to do so, or where the
              target site&apos;s terms of service prohibit automated access.
            </li>
            <li>
              Using the tool to access paywalled, private, or confidential content in violation of
              the content owner&apos;s rights.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Your Responsibility for Content</h2>
          <p>
            Because all tools process content locally within your browser, MeetMarkdown never
            sees, stores, or controls what you create. You bear sole responsibility for:
          </p>
          <ul>
            <li>Ensuring your content does not infringe copyright, trade secrets, or other IP rights.</li>
            <li>Complying with any confidentiality obligations before pasting sensitive content into our tools.</li>
            <li>The accuracy and legality of content you publish or distribute after using our tools.</li>
          </ul>
          <p>
            The sole exception is the <strong>URL to Markdown</strong> tool, which makes a
            server-side request to fetch the URL you provide. We do not log or store the content
            retrieved — it is returned directly to your browser — but you are responsible for
            ensuring the fetch is lawful.
          </p>
        </section>

        <section>
          <h2>5. Copyright Compliance</h2>
          <p>
            If you believe that content made accessible via any MeetMarkdown feature infringes your
            copyright, please contact us at{" "}
            <a href="mailto:hello@meetmarkdown.com">hello@meetmarkdown.com</a> with:
          </p>
          <ul>
            <li>A description of the copyrighted work you claim has been infringed.</li>
            <li>The specific URL or feature where the alleged infringement occurs.</li>
            <li>Your contact information and a statement of good-faith belief.</li>
          </ul>
          <p>
            We will respond to valid notices in accordance with applicable law.
          </p>
        </section>

        <section>
          <h2>6. Access Restriction</h2>
          <p>
            We reserve the right to restrict or block access to the Service — for any IP address,
            region, or usage pattern — at any time, without notice, if we reasonably believe the
            Service is being used in violation of these Terms of Use or our{" "}
            <Link href="/terms" className="text-primary underline underline-offset-2">
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </section>

        <section>
          <h2>7. Changes</h2>
          <p>
            We may update these Terms of Use at any time. The &ldquo;Last updated&rdquo; date at
            the top reflects the most recent revision. Continued use of the Service after changes
            are posted constitutes your acceptance.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>
            Questions? Reach out at{" "}
            <a href="mailto:hello@meetmarkdown.com">hello@meetmarkdown.com</a>.
          </p>
        </section>

      </div>
    </div>
  );
}
