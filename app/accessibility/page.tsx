import type { Metadata } from "next";
import LegalPage, { LI } from "../components/LegalPage";
import { CONTACT_EMAIL } from "../content";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Our accessibility commitment, the WCAG 2.2 AA target, what has actually been tested, known limitations, and how to report a barrier.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility" href="/accessibility">
      <p>
        We want this site to be usable by everyone, including people browsing with a keyboard, a
        screen reader, magnification, or reduced motion enabled.
      </p>

      <h2>Target</h2>
      <p>
        We aim to meet <strong>WCAG 2.2 Level AA</strong>. That is a target we work to, not a
        certification. This statement describes the current state honestly rather than claiming full
        conformance.
      </p>

      <h2>What has been done</h2>
      <ul>
        <LI>
          Every text and interface colour pair was measured against its real background before the
          palette was adopted. One candidate accent was rejected for landing at 3.11:1 on the light
          surface, and magenta fills take dark labels because white on magenta measures only 3.56:1.
        </LI>
        <LI>
          Pages use landmark regions and one ordered heading structure per page, with a skip link to
          the main content as the first focusable element.
        </LI>
        <LI>
          All interactive controls are reachable and operable by keyboard. Angular button shapes are
          painted on a pseudo-element so the focus ring is never clipped and the hit area stays a
          full 50px.
        </LI>
        <LI>
          The mobile menu uses the native <code>&lt;dialog&gt;</code> element, so focus is trapped,
          Escape closes it, and background content is inert — no hand-rolled focus trap.
        </LI>
        <LI>
          Expanding sections use native disclosure elements, which assistive technology announces
          without custom ARIA.
        </LI>
        <LI>
          Form fields have persistent visible labels. Errors are announced, tied to their field by{" "}
          <code>aria-describedby</code>, and focus moves to the first problem on submit.
        </LI>
        <LI>
          Motion is limited and every transition is disabled under{" "}
          <code>prefers-reduced-motion</code>.
        </LI>
        <LI>Layouts are checked from 360px upward and at 200% zoom without horizontal scrolling.</LI>
      </ul>

      <h2>Known limitations</h2>
      <ul>
        <LI>
          The site has not been tested with assistive technology by disabled users. Automated checks
          and keyboard testing are not a substitute for that, and we do not claim otherwise.
        </LI>
        <LI>
          It has not been verified against specific screen readers such as VoiceOver, NVDA or JAWS.
        </LI>
        <LI>No third-party accessibility audit or certification has been obtained.</LI>
        <LI>
          The decorative background gradient on dark sections has not been evaluated for every
          possible text overlay position at every viewport width.
        </LI>
      </ul>

      <h2>Report a barrier</h2>
      <p>
        If something here blocks you, tell us and we will fix it. Write to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> describing the page and what
        happened. We aim to respond within two business days.
      </p>
    </LegalPage>
  );
}
