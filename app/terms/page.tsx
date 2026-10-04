import type { Metadata } from "next";
import LegalPage, { LI } from "../components/LegalPage";
import { CONTACT_EMAIL, SITE } from "../content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing use of this website, including acceptable use, intellectual property, third-party marks and limits of liability.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" href="/terms">
      <p>
        These terms govern your use of this website. They cover the website only. Professional
        services are governed separately, by the engagement letter signed for that work.
      </p>

      <h2>Informational purpose</h2>
      <p>
        The content here describes services in general terms. It is not audit, legal, accounting,
        tax or security advice, and reading it does not create a client relationship. Do not act on
        it without advice specific to your circumstances. Standards, regulations and supervisory
        expectations change, so material may become out of date.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <LI>Do not use the site unlawfully, or in any way that damages or impairs it.</LI>
        <LI>Do not attempt to gain unauthorised access to the site or its hosting infrastructure.</LI>
        <LI>Do not scrape, republish or commercially redistribute the content without permission.</LI>
        <LI>Do not misrepresent an association with, or endorsement by, the firm.</LI>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The text, design, code and marks on this site belong to {SITE.name} or its licensors, except
        where third-party names appear.
      </p>
      <p>
        Framework, standard and regulator names — including ISO/IEC, NIST, COBIT, ITIL, COSO, SOC,
        CSA and others referenced across these pages — are the property of their respective owners
        and are used descriptively to identify the subject matter of our work.{" "}
        <strong>
          Their use does not imply endorsement, affiliation, accreditation or certification by those
          bodies.
        </strong>
      </p>

      <h2>Third-party links</h2>
      <p>
        Where we link to another site we do not control it, and we are not responsible for its
        content, availability or privacy practices.
      </p>

      <h2>Disclaimer and liability</h2>
      <p>
        The site is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without
        warranties of any kind, to the fullest extent permitted by law. We do not warrant that it
        will be uninterrupted or error-free. Nothing in these terms limits any liability that cannot
        be limited by law, including for death or personal injury caused by negligence, or for fraud.
      </p>

      <h2>Governing law</h2>
      <p>
        <strong>Not yet determined.</strong> Governing law and venue depend on where the firm is
        established and where it contracts. This clause is deliberately left open rather than
        guessed, and requires confirmation and legal review before publication.
      </p>

      <h2>What is still outstanding</h2>
      <ul>
        <LI>Governing law and jurisdiction for disputes.</LI>
        <LI>The registered entity name and address to bind these terms to.</LI>
        <LI>Whether a liability cap is appropriate, and at what level.</LI>
        <LI>Legal review of this page before it is published.</LI>
      </ul>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
