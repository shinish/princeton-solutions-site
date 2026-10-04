import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import { ButtonLink, Bands } from "../components/Button";
import { ThreeLines } from "../components/Logo";
import { wrap, section, h1, h2, h3, lede } from "../components/ui";
import { credentials, differentiators, industries, steps, SITE } from "../content";

export const metadata: Metadata = {
  title: "About the firm",
  description:
    "Princeton Solutions is an independent IT audit, GRC and AI governance practice established in Pennsylvania in 2012, led by credentialed senior practitioners.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-ink">
        <div className={`${wrap} pt-8 pb-[clamp(32px,4vw,56px)]`}>
          <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/about", label: "About" }]} />
          <p className="label mt-7 flex items-center gap-3"><Bands className="text-accent-ink" />Trust through governance</p>
          <h1 className={`${h1} mt-4 max-w-[17ch]`}>An independent practice, not a reseller</h1>
          <p className={`${lede} mt-6 max-w-[58ch]`}>
            Princeton Solutions Inc. is a {SITE.entity.toLowerCase()}, serving regulated
            organizations across the United States and remotely. We assess and advise. We do not
            resell software or implementation services — which is what keeps the assessment
            independent.
          </p>
        </div>
      </section>

      <section className={`${section} border-b border-ink`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16`}>
          <div>
            <p className="label">Operating model</p>
            <h2 className={`${h2} mt-4 max-w-[12ch]`}>Across the three lines</h2>
            <ThreeLines className="mt-7 w-[140px] h-auto" />
          </div>
          <div>
            <p className="text-[16px] leading-[1.65] text-muted max-w-[58ch]">
              Governance, risk and compliance obligations land differently on each line of
              defence. First-line owners need controls they can actually operate. Risk functions
              need coverage they can challenge. Internal audit needs evidence that withstands
              independent review — and so do your examiners and external auditors.
            </p>
            <p className="mt-5 text-[16px] leading-[1.65] text-muted max-w-[58ch]">
              We map overlapping requirements onto a single control set, test once, and report in
              the language each line is accountable for. That is what keeps a multi-framework
              program from turning into duplicated testing.
            </p>
            <ul className="mt-8 border-t border-ink">
              {differentiators.map((d) => (
                <li key={d.term} className="py-4 border-b border-rule flex gap-3.5">
                  <Bands className="text-accent-ink mt-2" />
                  <div>
                    <h3 className="text-[15.5px] font-semibold leading-[1.35]">{d.term}</h3>
                    <p className="mt-1 text-[14px] leading-[1.5] text-muted">{d.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${section} border-b border-ink bg-surface-alt`}>
        <div className={wrap}>
          <p className="label">Method</p>
          <h2 className={`${h2} mt-4 mb-8 max-w-[14ch]`}>How an engagement runs</h2>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-ink">
            {steps.map((s, i) => (
              <li key={s.title} className={`py-7 lg:px-7 first:lg:pl-0 last:lg:pr-0 border-b border-rule ${i < steps.length - 1 ? "lg:border-r" : ""}`}>
                <span className="font-mono text-[10.5px] tracking-[.16em] uppercase text-accent-ink">Phase {i + 1}</span>
                <h3 className={`${h3} mt-3`}>{s.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.55] text-muted">{s.blurb}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${section} border-b border-ink`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <p className="label">Who we serve</p>
            <h2 className={`${h2} mt-4 mb-6`}>Industries</h2>
            <ul className="border-t border-ink">
              {industries.map((i) => (
                <li key={i.term} className="py-4 border-b border-rule">
                  <h3 className="text-[15.5px] font-semibold leading-[1.35]">{i.term}</h3>
                  <p className="mt-1 text-[14px] leading-[1.5] text-muted">{i.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label">Credentials</p>
            <h2 className={`${h2} mt-4 mb-6`}>Who leads the work</h2>
            <ul className="border-t border-ink">
              {credentials.map((c) => (
                <li key={c.abbr} className="grid grid-cols-[130px_minmax(0,1fr)] gap-4 py-3.5 border-b border-rule items-baseline">
                  <span className="font-mono text-[13px] text-accent-ink">{c.abbr}</span>
                  <span className="text-[14px] text-muted">{c.name}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[14px] text-muted">
              Professional memberships include ISACA and the Institute of Internal Auditors (IIA).
            </p>
          </div>
        </div>
      </section>

      <section className={section}>
        <div className={`${wrap} flex flex-wrap items-end justify-between gap-7`}>
          <h2 className={`${h2} max-w-[15ch]`}>Talk to a senior practitioner</h2>
          <ButtonLink href="/contact">Request a consultation</ButtonLink>
        </div>
      </section>
    </>
  );
}
