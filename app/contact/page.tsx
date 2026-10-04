import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import ContactForm from "../components/ContactForm";
import { wrap, section, h1, h2, lede } from "../components/ui";
import { CONTACT_EMAIL, SITE, contactMeta, steps } from "../content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your audit, exam or governance need. We reply within two business days with a proposed scope.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="aurora text-white border-b border-rule-dark relative overflow-hidden">
        <div aria-hidden="true" className="dotgrid absolute inset-0 text-white pointer-events-none" />
        <div className={`${wrap} relative pt-8 pb-[clamp(36px,5vw,72px)]`}>
          <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/contact", label: "Contact" }]} onDark />
          <h1 className={`${h1} mt-7 max-w-[14ch] text-white`}>Start with a conversation</h1>
          <p className="mt-6 text-[clamp(16px,1.35vw,19px)] leading-[1.6] text-white/75 max-w-[54ch]">
            Tell us about your audit, exam or governance need. We reply within two business days
            with a proposed scope.
          </p>
        </div>
      </section>

      <section className={section}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-20`}>
          <div>
            <p className="label"><span className="bands" />Details</p>
            <dl className="mt-6 border-t border-ink">
              {contactMeta.map((m) => (
                <div key={m.dt} className="row-hover py-4 border-b border-rule">
                  <dt className="font-mono text-[10px] tracking-[.18em] uppercase text-muted">{m.dt}</dt>
                  <dd className="mt-1.5 m-0 text-[15.5px] leading-[1.5]">
                    {m.dt === "Email" ? (
                      <a href={`mailto:${CONTACT_EMAIL}`} className="link-ul text-accent-ink font-semibold">{m.dd}</a>
                    ) : m.dd}
                  </dd>
                </div>
              ))}
            </dl>

            {!SITE.emailConfirmed && (
              <p className="mt-6 border border-accent-ink/40 bg-accent-ink/5 p-4 text-[13.5px] leading-[1.55] text-muted">
                <strong className="text-accent-ink">Placeholder address.</strong> This is still the
                sample address from the original template. Replace <code className="font-mono">CONTACT_EMAIL</code>{" "}
                in <code className="font-mono">app/content.ts</code> before launch.
              </p>
            )}

            <h2 className="label mt-10"><span className="bands" />What happens next</h2>
            <ol className="mt-5 border-t border-ink">
              {steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[52px_minmax(0,1fr)] gap-3 py-3.5 border-b border-rule">
                  <span className="font-mono text-[10px] tracking-[.14em] uppercase text-accent-ink pt-1">0{i + 1}</span>
                  <span className="text-[14.5px] leading-[1.5]"><strong>{s.title}.</strong> {s.blurb}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="label"><span className="bands" />Send an enquiry</h2>
            <p className="mt-4 mb-7 text-[14.5px] leading-[1.6] text-muted max-w-[52ch]">
              This form composes the message in your own mail application — nothing is submitted
              to a server, and nothing is sent until you press send there.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
