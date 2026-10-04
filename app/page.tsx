import Link from "next/link";
import type { Metadata } from "next";
import { ButtonLink, Bands } from "./components/Button";
import { ThreeLines } from "./components/Logo";
import ServiceLedger from "./components/ServiceLedger";
import FrameworkMatrix from "./components/FrameworkMatrix";
import { wrap, section, h1, h2, h3, lede } from "./components/ui";
import {
  controlRecord,
  credentials,
  differentiators,
  facts,
  industries,
  models,
  steps,
} from "./content";

export const metadata: Metadata = {
  title: "Independent IT audit, GRC, cybersecurity and AI governance",
  description:
    "IT audit, GRC, third-party risk and AI governance for regulated organizations — independent assurance that stands up to regulators, auditors and boards.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* ─────────────────────────── hero (dark) ─────────────────────────── */}
      <section className="relative aurora text-white overflow-hidden border-b border-rule-dark">
        <div aria-hidden="true" className="dotgrid absolute inset-0 text-white pointer-events-none" />
        <div className={`${wrap} relative pt-[clamp(56px,9vw,132px)] pb-[clamp(48px,7vw,104px)]`}>
          <p className="label label-on-dark">
            <span className="bands" />
            Trust through governance · Est. 2012
          </p>
          <h1 className={`${h1} mt-6 max-w-[17ch] text-white`}>
            Independent assurance for technology, security and{" "}
            <span className="text-accent">AI</span>
          </h1>

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16 lg:items-end">
            <p className="text-[clamp(16px,1.35vw,19px)] leading-[1.6] text-white/75 max-w-[58ch]">
              We help regulated organizations prove their controls work. IT audit, governance,
              risk and compliance, third-party risk and AI governance — delivered by senior
              practitioners, evidenced to the standard regulators and external auditors expect.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact">Discuss an engagement</ButtonLink>
              <ButtonLink href="/services" variant="on-dark">View services</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── fact band (light) ───────────────── */}
      <section className="bg-surface-alt border-b border-rule">
        <div className={`${wrap} grid sm:grid-cols-2 lg:grid-cols-4`}>
          {facts.map((f, i) => (
            <div
              key={f.value}
              className={`py-9 lg:py-11 lg:px-9 first:lg:pl-0 last:lg:pr-0 ${
                i < facts.length - 1 ? "lg:border-r border-rule" : ""
              }`}
            >
              <p className="font-display font-extrabold text-[clamp(30px,3.8vw,52px)] leading-none tracking-[-.025em]">
                {f.value}
              </p>
              <p className="mt-3 text-[13.5px] leading-[1.45] text-muted max-w-[26ch]">
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────── three lines + control record ───────────────── */}
      <section className={`${section} border-b border-ink`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16`}>
          <div>
            <p className="label">The three lines</p>
            <h2 className={`${h2} mt-4 max-w-[12ch]`}>Work that fits your model</h2>
            <p className="mt-5 text-[15.5px] leading-[1.6] text-muted max-w-[44ch]">
              First line, risk and internal audit each need different evidence from the same
              control set. We test once and report in the language each line is accountable for.
            </p>
            <ThreeLines className="mt-8 w-[132px] h-auto" />
          </div>

          <div>
            <p className="label flex items-center gap-3">
              <Bands className="text-accent-ink" />
              Sample control test record
            </p>
            <dl className="mt-5 border-t border-ink">
              {controlRecord.rows.map((row) => (
                <div
                  key={row.dt}
                  className="grid grid-cols-[84px_minmax(0,1fr)] gap-x-5 py-3.5 border-b border-rule"
                >
                  <dt className="font-mono text-[10px] tracking-[.16em] uppercase text-muted pt-1">
                    {row.dt}
                  </dt>
                  <dd className="m-0 text-[14.5px] leading-[1.5]">
                    {"tag" in row && (
                      <>
                        <span className="font-mono text-[11.5px] text-accent-ink">{row.tag}</span>
                        {`  ${row.text}`}
                      </>
                    )}
                    {"text" in row && !("tag" in row) && row.text}
                    {"ticks" in row && (
                      <span className="flex flex-wrap gap-x-5 gap-y-1">
                        {row.ticks.map((t) => (
                          <span key={t} className="inline-flex items-center gap-2">
                            <Bands className="text-accent-ink" />
                            {t}
                          </span>
                        ))}
                      </span>
                    )}
                    {"status" in row && (
                      <span className="inline-flex items-center gap-2.5 font-semibold text-accent-ink">
                        <Bands />
                        {row.status}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ───────────────────────── services ───────────────────────── */}
      <section id="services" className={`${section} border-b border-ink`}>
        <div className={wrap}>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:items-end pb-9">
            <div>
              <p className="label">Services</p>
              <h2 className={`${h2} mt-4`}>What we do</h2>
            </div>
            <p className={`${lede} max-w-[48ch]`}>
              Eight service lines, each led by a credentialed senior practitioner. Open a row for
              the scope. Engage one, or combine several into an integrated assurance program.
            </p>
          </div>
          <ServiceLedger />
        </div>
      </section>

      {/* ───────────────────────── approach ───────────────────────── */}
      <section className={`${section} border-b border-ink bg-surface-alt`}>
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6 pb-9">
            <div>
              <p className="label">Approach</p>
              <h2 className={`${h2} mt-4 max-w-[13ch]`}>How an engagement runs</h2>
            </div>
            <p className={`${lede} max-w-[38ch]`}>
              A familiar audit discipline, applied with enough flexibility to fit your calendar
              and your teams.
            </p>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-ink">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className={`py-7 lg:px-7 first:lg:pl-0 last:lg:pr-0 border-b border-rule ${
                  i < steps.length - 1 ? "lg:border-r" : ""
                }`}
              >
                <span className="font-mono text-[10.5px] tracking-[.16em] uppercase text-accent-ink tabular-nums">
                  Phase {i + 1}
                </span>
                <h3 className={`${h3} mt-3`}>{s.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.55] text-muted">{s.blurb}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────────────────── frameworks ───────────────────────── */}
      <section id="frameworks" className={`${section} border-b border-ink`}>
        <div className={wrap}>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:items-end pb-8">
            <div>
              <p className="label">Frameworks</p>
              <h2 className={`${h2} mt-4 max-w-[16ch]`}>Standards we work against</h2>
            </div>
            <p className={`${lede} max-w-[48ch]`}>
              We map overlapping requirements to one control set, so a single test can satisfy
              several obligations. Filter to check coverage.
            </p>
          </div>
          <FrameworkMatrix />
        </div>
      </section>

      {/* ──────────────── engagement models ──────────────── */}
      <section className={`${section} border-b border-ink`}>
        <div className={wrap}>
          <p className="label">Engagement models</p>
          <h2 className={`${h2} mt-4 mb-8 max-w-[16ch]`}>Ways to work with us</h2>
          <ul className="border-t border-ink">
            {models.map((m) => (
              <li
                key={m.title}
                className="grid gap-x-8 gap-y-2 py-5 border-b border-rule md:grid-cols-[130px_minmax(0,180px)_minmax(0,1fr)] md:items-baseline"
              >
                <span className="font-mono text-[10.5px] tracking-[.16em] uppercase text-accent-ink">
                  {m.tag}
                </span>
                <h3 className={h3}>{m.title}</h3>
                <p className="m-0 text-[15px] leading-[1.55] text-muted max-w-[56ch]">
                  {m.blurb}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ──────────────── industries + why ──────────────── */}
      <section className={`${section} border-b border-ink`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <p className="label">Industries</p>
            <h2 className={`${h2} mt-4 mb-6`}>Who we serve</h2>
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
            <p className="label">Why Princeton Solutions</p>
            <h2 className={`${h2} mt-4 mb-6`}>What sets us apart</h2>
            <ul className="border-t border-ink">
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

      {/* ───────────────────────── credentials ───────────────────────── */}
      <section className={`${section} bg-dark text-surface`}>
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label label-on-dark">Credentials</p>
              <h2 className={`${h2} mt-4 max-w-[18ch] text-surface`}>
                Engagements are led by certified professionals
              </h2>
            </div>
            <p className="text-[14px] text-surface/70 max-w-[34ch]">
              Professional memberships include ISACA and the Institute of Internal Auditors (IIA).
            </p>
          </div>
          <ul className="mt-9 grid sm:grid-cols-2 lg:grid-cols-4 border-t border-surface/25">
            {credentials.map((c) => (
              <li
                key={c.abbr}
                className="py-5 lg:px-6 first:lg:pl-0 border-b border-surface/15 lg:border-r lg:last:border-r-0"
              >
                <span className="block font-mono text-[13px] tracking-[.04em] text-accent">
                  {c.abbr}
                </span>
                <span className="mt-1.5 block text-[13.5px] leading-[1.4] text-surface/70">
                  {c.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────────────────── CTA ───────────────────────── */}
      <section className={section}>
        <div className={`${wrap} grid gap-7 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16 lg:items-end`}>
          <div>
            <p className="label flex items-center gap-3">
              <Bands className="text-accent-ink" />
              Contact
            </p>
            <h2 className={`${h2} mt-4 max-w-[13ch]`}>Start with a conversation</h2>
            <p className={`${lede} mt-5 max-w-[50ch]`}>
              Tell us about your audit, exam or governance need. We reply within two business
              days with a proposed scope.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <ButtonLink href="/contact">Request a consultation</ButtonLink>
            <Link
              href="/faq"
              className="link-ul inline-flex items-center gap-2.5 text-[14.5px] font-semibold text-accent-ink no-underline"
            >
              Read the FAQ
              <Bands />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
