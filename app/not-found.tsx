import { ButtonLink } from "./components/Button";
import { wrap, h1 } from "./components/ui";
import { nav2 } from "./content";
import Link from "next/link";

export const metadata = {
  title: "Page not found",
  description: "That page could not be found. Browse services, about, FAQ or contact instead.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="aurora text-white relative overflow-hidden min-h-[70vh] flex items-center">
      <div aria-hidden="true" className="dotgrid absolute inset-0 text-white pointer-events-none" />
      <div className={`${wrap} relative py-20`}>
        <p className="label label-on-dark"><span className="bands" />Error 404</p>
        <h1 className={`${h1} mt-6 max-w-[16ch] text-white`}>
          That page is not in the <span className="text-accent">index</span>
        </h1>
        <p className="mt-6 text-[clamp(16px,1.35vw,19px)] leading-[1.6] text-white/75 max-w-[52ch]">
          The address may have changed, or the link that brought you here may be out of date.
          Everything on the site is reachable from the pages below.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="on-dark">Contact us</ButtonLink>
        </div>
        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule-dark pt-6">
          {nav2.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="link-ul font-mono text-[11.5px] tracking-[.14em] uppercase text-white/80 no-underline hover:text-accent">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
