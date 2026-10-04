import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import { ButtonLink } from "../components/Button";
import { wrap, section, h1, h2, lede } from "../components/ui";
import { faqs, SITE } from "../content";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "How engagements are scoped and run, which standards we work against, whether we co-source with internal audit, and how to start.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <section className="border-b border-ink">
        <div className={`${wrap} pt-8 pb-[clamp(32px,4vw,56px)]`}>
          <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/faq", label: "FAQ" }]} />
          <h1 className={`${h1} mt-7 max-w-[16ch]`}>Questions we get asked</h1>
          <p className={`${lede} mt-6 max-w-[56ch]`}>
            Everything below restates what the service and engagement pages already describe. If
            your question is not here, ask it directly.
          </p>
        </div>
      </section>

      <section className={section}>
        <div className={`${wrap} grid gap-10 lg:grid-cols-[minmax(0,.55fr)_minmax(0,1.45fr)] lg:gap-16`}>
          <div>
            <p className="label">Reference</p>
            <p className="mt-4 text-[15px] leading-[1.6] text-muted max-w-[34ch]">
              {faqs.length} questions covering scope, delivery, standards coverage and how to
              begin.
            </p>
            <div className="mt-7">
              <ButtonLink href="/contact">Ask a question</ButtonLink>
            </div>
          </div>

          <div className="border-t border-ink">
            {faqs.map((f, i) => (
              <details key={f.q} name="faq" className="group border-b border-rule">
                <summary className="list-none cursor-pointer select-none grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-5 hover:text-accent-ink [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-[10.5px] text-accent-ink tabular-nums pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display font-bold text-[clamp(16px,2vw,21px)] leading-[1.25] tracking-[-.01em]">
                    {f.q}
                  </h2>
                  <span aria-hidden="true" className="mt-1.5 relative block w-[14px] h-[14px] flex-none">
                    <span className="absolute left-0 top-[6px] w-[14px] h-[2px] bg-ink group-hover:bg-accent" />
                    <span className="absolute left-[6px] top-0 w-[2px] h-[14px] bg-ink group-hover:bg-accent transition-transform duration-300 group-open:scale-y-0 motion-reduce:transition-none" />
                  </span>
                </summary>
                <p className="pb-6 pl-0 sm:pl-[44px] pr-0 sm:pr-10 text-[15px] leading-[1.65] text-muted max-w-[70ch]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
