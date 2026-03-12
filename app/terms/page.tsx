import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms & Conditions for MeetMarkdown — the free, browser-based markdown tools suite.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Terms &amp; Conditions</h1>
      <p className="text-muted-foreground text-sm mb-12">Last updated: March 2026</p>

      <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-10">

        <section>
          <h2>1. Agreement</h2>
          <p>
            These Terms &amp; Conditions (&ldquo;Agreement&rdquo;) constitute a legally binding
            agreement between you and MeetMarkdown (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;) governing your access to and use of{" "}
            <strong>meetmarkdown.com</strong> and all associated tools and services
            (&ldquo;Service&rdquo;).
          </p>
          <p>
            By accessing or using the Service, you confirm that you have read, understood, and
            agree to be bound by this Agreement. If you do not agree, you must not use the Service.
          </p>
        </section>

        <section>
          <h2>2. The Service</h2>
          <p>
            MeetMarkdown provides a free suite of browser-based markdown utilities, including a live
            editor, Mermaid diagram editor, formatter, HTML converter, table formatter, and related
            tools. All processing occurs entirely within your browser — no content you enter is
            transmitted to or stored on our servers, except where explicitly noted (see the URL to
            Markdown tool in our{" "}
            <Link href="/terms-of-use" className="text-primary underline underline-offset-2">
              Terms of Use
            </Link>
            ).
          </p>
          <p>
            Certain tools offer a <strong>Share</strong> feature that encodes your content directly
            into a URL (in the URL fragment). Shared content is not transmitted to or stored on our
            servers — it exists solely within the URL itself. We have no ability to monitor, moderate,
            or remove content embedded in shared links. You are solely responsible for the content you
            share and for ensuring that any shared link complies with applicable law and these Terms.
          </p>
          <p>
            We reserve the right to modify, suspend, or discontinue any part of the Service —
            including the shareable links feature — at any time without notice. We will not be liable
            to you or any third party for any such modification, suspension, or discontinuance.
          </p>
        </section>

        <section>
          <h2>3. Intellectual Property</h2>
          <p>
            The MeetMarkdown name, logo, visual design, and all original source code are the
            exclusive intellectual property of MeetMarkdown and its contributors. All rights not
            expressly granted in this Agreement are reserved.
          </p>
          <p>
            Nothing in this Agreement grants you any right to use MeetMarkdown&apos;s trademarks,
            trade names, service marks, or logos without our prior written consent.
          </p>
          <p>
            The Service incorporates open-source software — including Next.js, Mermaid, Prettier,
            and react-markdown — each used in accordance with its respective open-source licence.
          </p>
        </section>

        <section>
          <h2>4. Your Content</h2>
          <p>
            You retain full ownership of any content you create, write, or process using the
            Service. Because all tool processing occurs locally in your browser, we do not receive,
            access, or store your content. We assert no intellectual property rights over it.
          </p>
          <p>
            You are solely responsible for the legality, accuracy, and appropriateness of any
            content you create, including any content you distribute via shareable links.
            MeetMarkdown accepts no liability for content you produce or share using the Service.
          </p>
          <p>
            When you use the Share or Embed features, you represent and warrant that: (a) you have
            the right to share the content; (b) the content does not violate any applicable law,
            regulation, or third-party right; and (c) you accept full responsibility for any
            consequences arising from the distribution of that content.
          </p>
        </section>

        <section>
          <h2>5. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT
            WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
          </p>
          <p>
            We do not warrant that the Service will be uninterrupted, secure, error-free, or free
            from harmful components. We do not warrant the accuracy, completeness, or reliability
            of any output produced by our tools. Your use of the Service is entirely at your own
            risk.
          </p>
        </section>

        <section>
          <h2>6. Limitation of Liability</h2>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, MEETMARKDOWN AND ITS OPERATORS,
            CONTRIBUTORS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL, OR PUNITIVE DAMAGES — INCLUDING LOSS OF DATA, LOSS OF REVENUE, LOSS OF
            PROFITS, OR BUSINESS INTERRUPTION — ARISING FROM YOUR USE OF OR INABILITY TO USE THE
            SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p>
            Because MeetMarkdown is provided free of charge with no account system or paid tier,
            our total aggregate liability for any claim arising under or in connection with this
            Agreement shall not exceed zero dollars (USD&nbsp;$0.00).
          </p>
        </section>

        <section>
          <h2>7. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless MeetMarkdown, its operators, and
            contributors from and against any and all claims, liabilities, damages, losses, costs,
            and expenses (including reasonable legal fees) arising from: (a) your access to or use
            of the Service; (b) any content you create or process using the Service; (c) your
            violation of this Agreement; or (d) your violation of any applicable law or the rights
            of any third party.
          </p>
        </section>

        <section>
          <h2>8. Third-Party Services</h2>
          <p>
            The Service is hosted on <strong>Vercel</strong>. Your use of the Service is subject
            to Vercel&apos;s infrastructure and data policies. We are not responsible for the
            availability, conduct, or privacy practices of any third-party service.
          </p>
          <p>
            The Service may contain links to external websites or resources. We do not endorse and
            are not responsible for the content, accuracy, or practices of any linked site.
          </p>
        </section>

        <section>
          <h2>9. Termination &amp; Access Restriction</h2>
          <p>
            This Agreement remains in effect for as long as you use the Service. We reserve the
            right to restrict, suspend, or block your access to the Service — in whole or in part
            — at any time, without prior notice, for any reason including breach of this Agreement
            or suspected abuse.
          </p>
        </section>

        <section>
          <h2>10. Governing Law</h2>
          <p>
            This Agreement is governed by and construed in accordance with applicable law. Any
            dispute that cannot be resolved informally shall be submitted to the exclusive
            jurisdiction of the courts of competent jurisdiction. You irrevocably waive any
            objection to the exercise of such jurisdiction.
          </p>
        </section>

        <section>
          <h2>11. Changes to this Agreement</h2>
          <p>
            We may revise this Agreement at any time by updating this page. The &ldquo;Last
            updated&rdquo; date at the top will reflect the most recent revision. Continued use of
            the Service after any changes are posted constitutes your acceptance of the revised
            Agreement.
          </p>
        </section>

        <section>
          <h2>12. Related Policies</h2>
          <p>This Agreement should be read alongside:</p>
          <ul>
            <li>
              <Link href="/terms-of-use" className="text-primary underline underline-offset-2">
                Terms of Use
              </Link>{" "}
              — acceptable use rules, prohibited activities, and user conduct.
            </li>
            <li>
              <Link href="/privacy" className="text-primary underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              — how we handle (or rather, don&apos;t handle) your data.
            </li>
          </ul>
        </section>

        <section>
          <h2>13. Contact</h2>
          <p>
            Questions about this Agreement? Contact us at{" "}
            <a href="mailto:hello@meetmarkdown.com">hello@meetmarkdown.com</a>.
          </p>
        </section>

      </div>
    </div>
  );
}
