import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { wrap, section, h1 } from "./ui";
import { sitePractices } from "../content";

/** Shared chrome for the three policy pages — identical shell, different body. */
export default function LegalPage({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="aurora text-white border-b border-rule-dark relative overflow-hidden">
        <div aria-hidden="true" className="dotgrid absolute inset-0 text-white pointer-events-none" />
        <div className={`${wrap} relative pt-8 pb-[clamp(32px,4vw,60px)]`}>
          <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href, label: title }]} onDark />
          <h1 className={`${h1} mt-7 max-w-[15ch] text-white`}>{title}</h1>
          <p className="mt-5 font-mono text-[11px] tracking-[.16em] uppercase text-white/60">
            Last updated {sitePractices.lastUpdated}
          </p>
        </div>
      </section>

      <section className={section}>
        <div
          className={`${wrap} max-w-[78ch]
            [&_h2]:font-display [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:tracking-[-.01em]
            [&_h2]:text-[clamp(20px,2.4vw,28px)] [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-ink
            [&_h2:first-child]:mt-0
            [&_p]:text-[15.5px] [&_p]:leading-[1.7] [&_p]:text-muted [&_p]:mb-4
            [&_li]:text-[15.5px] [&_li]:leading-[1.7] [&_li]:text-muted
            [&_ul]:mb-5 [&_ul]:grid [&_ul]:gap-2.5 [&_ul]:pl-0
            [&_li]:grid [&_li]:grid-cols-[auto_1fr] [&_li]:gap-3 [&_li]:items-baseline
            [&_a]:text-accent-ink [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2
            [&_strong]:text-ink [&_code]:font-mono [&_code]:text-[13.5px] [&_code]:text-ink`}
        >
          {children}
        </div>
      </section>
    </>
  );
}

/** List item with the square bullet motif. */
export function LI({ children }: { children: ReactNode }) {
  return (
    <li>
      <span aria-hidden="true" className="bands bg-accent-ink mt-[7px]" />
      <span>{children}</span>
    </li>
  );
}
