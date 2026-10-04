import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";
import { ButtonLink, Bands } from "../../components/Button";
import { wrap, section, h2, lede } from "../../components/ui";
import { SITE, serviceBySlug, serviceSlugs, services, slugify } from "../../content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.blurb,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${s.title} — ${SITE.shortName}`,
      description: s.blurb,
      url: `/services/${slug}`,
    },
  };
}

export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const others = services.filter((o) => o.title !== s.title).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.blurb,
    url: `${SITE.origin}/services/${slug}`,
    provider: { "@type": "ProfessionalService", name: SITE.name, url: SITE.origin },
    areaServed: "US",
    serviceType: s.tag,
  };

  return (
    <>
      <section className="border-b border-ink">
        <div className={`${wrap} pt-10 pb-[clamp(40px,6vw,72px)]`}>
          <Breadcrumbs
            trail={[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: `/services/${slug}`, label: s.title },
            ]}
          />
          <p className="label mt-9 flex items-center gap-3">
            <Bands className="text-accent-ink" />
            {s.tag}
          </p>
          <h1 className="mt-5 font-display leading-[.98] tracking-[-.03em] text-[clamp(38px,7vw,88px)] max-w-[14ch]">
            {s.title}
          </h1>
          <p className={`${lede} mt-7 max-w-[54ch]`}>{s.blurb}</p>
        </div>
      </section>

      <section className={`${section} border-b border-ink`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-20`}>
          <div>
            <h2 className="label">What this covers</h2>
            <p className="mt-5 text-[16px] leading-[1.6] text-muted max-w-[40ch]">
              Scope is agreed up front, including the criteria and the evidence that will satisfy
              each requirement. Every engagement has a defined deliverable and a senior
              practitioner accountable for it.
            </p>
          </div>
          <ul className="border-t border-ink">
            {s.bullets.map((b) => (
              <li
                key={b}
                className="grid grid-cols-[auto_1fr] gap-5 items-baseline py-6 border-b border-rule"
              >
                <Bands className="text-accent-ink" />
                <span className="text-[clamp(17px,2vw,21px)] leading-[1.45]">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${section} border-b border-ink bg-surface-alt`}>
        <div className={`${wrap} flex flex-wrap items-end justify-between gap-8`}>
          <div>
            <h2 className={`${h2} max-w-[16ch]`}>Talk through a {s.title.toLowerCase()} scope</h2>
            <p className={`${lede} mt-5 max-w-[46ch]`}>
              Tell us where you are and what you must evidence. We reply within two business days
              with a proposed scope.
            </p>
          </div>
          <ButtonLink href="/contact">Request a consultation</ButtonLink>
        </div>
      </section>

      <section className={section}>
        <div className={wrap}>
          <h2 className="label">Other service lines</h2>
          <ul className="mt-7 border-t border-ink">
            {others.map((o) => (
              <li key={o.title} className="border-b border-rule">
                <Link
                  href={`/services/${slugify(o.title)}`}
                  className="group grid grid-cols-[1fr_auto] items-center gap-6 py-6 no-underline text-ink hover:text-accent-ink transition-colors"
                >
                  <span className="font-display text-[clamp(20px,3vw,30px)] leading-[1.15] tracking-[-.01em]">
                    {o.title}
                  </span>
                  <Bands className="text-accent-ink" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
