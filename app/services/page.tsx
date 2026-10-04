import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import ServiceLedger from "../components/ServiceLedger";
import { ButtonLink } from "../components/Button";
import { wrap, section, lede } from "../components/ui";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Eight service lines across IT audit, GRC, cybersecurity risk, regulatory compliance, SOX and SOC support, third-party risk, GRC automation and cloud governance.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-ink">
        <div className={`${wrap} pt-10 pb-[clamp(40px,6vw,76px)]`}>
          <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }]} />
          <h1 className="mt-9 font-display leading-[.96] tracking-[-.03em] text-[clamp(42px,8vw,96px)] max-w-[13ch]">
            Eight service lines, one control set.
          </h1>
          <p className={`${lede} mt-8 max-w-[56ch]`}>
            Each line is led by a credentialed senior practitioner. Open a row for the scope, or
            read the full detail page. Overlapping requirements map to one control set, so a
            single test can satisfy several obligations.
          </p>
        </div>
      </section>

      <section className={section}>
        <div className={wrap}>
          <ServiceLedger />
          <div className="mt-16 flex flex-wrap items-center gap-6">
            <ButtonLink href="/contact">Discuss an engagement</ButtonLink>
            <p className="font-mono text-[11px] tracking-[.1em] uppercase text-muted">
              Reply within two business days
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
