import type { Metadata } from "next";
import LegalPage, { LI } from "../components/LegalPage";
import { CONTACT_EMAIL, SITE } from "../content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How this website handles personal information. The site sets no cookies, runs no analytics and makes no third-party requests.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" href="/privacy">
      <p>
        This policy describes how <strong>{SITE.name}</strong> handles personal information on this
        website. It describes what this site actually does — it is not a generic template.
      </p>

      <h2>What this website collects</h2>
      <p>
        <strong>Nothing, automatically.</strong> This site is a set of static files. It sets no
        cookies, runs no analytics or tag manager, embeds no advertising or social pixels, and loads
        no third-party scripts, fonts or iframes. Typefaces are served from this site&rsquo;s own
        domain, so opening a page makes no request to any other company.
      </p>
      <p>
        Because there is nothing to consent to, no cookie banner is shown. If analytics, embedded
        media or any third-party tooling is added later, this policy must be updated and a consent
        mechanism added at the same time.
      </p>

      <h2>The contact form</h2>
      <p>
        The enquiry form does not submit anything to a server. It assembles what you type into a
        message and opens it in your own email application. Nothing leaves your device until you
        press send there, and it reaches us as an ordinary email.
      </p>
      <p>
        Email you send is processed so we can reply and, if we proceed, to run the engagement. We
        keep correspondence for as long as that requires and as professional and legal
        record-keeping obligations demand.
      </p>

      <h2>Hosting and server logs</h2>
      <p>
        As with most websites, the server delivering these pages may keep short-lived technical logs
        — IP address, timestamp, user agent — for security and reliability. Those logs sit with the
        hosting provider.{" "}
        <strong>
          The hosting arrangement for this site is not yet confirmed, so the provider and its
          retention period are deliberately not named here.
        </strong>{" "}
        Both must be stated before this page is published.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, delete or restrict use
        of personal information we hold, and to object to certain processing. To exercise any of
        them, write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <p>
        Exactly which regimes apply — and the identity of the data controller and any required
        representative — depends on where the firm is established and whom it serves. Those points
        need confirmation from the firm and a legal review before publication.
      </p>

      <h2>What is still outstanding</h2>
      <ul>
        <LI>The hosting provider and its log retention period.</LI>
        <LI>The named data controller and a postal contact address.</LI>
        <LI>Which privacy regimes apply (for example GDPR, CCPA) given the client base.</LI>
        <LI>Legal review of this page before it is published.</LI>
      </ul>

      <h2>Changes</h2>
      <p>
        Material changes will appear here with a revised date. Questions about this policy:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
