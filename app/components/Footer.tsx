import Link from "next/link";
import Image from "next/image";
import { footerNav, SITE, footer as footerCopy } from "../content";
import { ButtonLink } from "./Button";

export default function Footer() {
  return (
    <footer className="mt-auto bg-dark text-surface">
      <div className="w-full px-[var(--gutter)] py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-16 pb-12 border-b border-surface/20">
          <div>
            <h2 className="font-display font-extrabold uppercase leading-[.98] tracking-[-.02em] text-[clamp(26px,3.6vw,42px)] max-w-[13ch]">
              Prove your controls work.
            </h2>
            <p className="mt-4 text-[15px] leading-[1.55] text-surface/70 max-w-[42ch]">
              Tell us about your audit, exam or governance need. We reply within two business days with a proposed scope.
            </p>
            <div className="mt-7">
              <ButtonLink href="/contact" variant="on-dark">Start a conversation</ButtonLink>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h3 className="font-mono text-[10px] tracking-[.2em] uppercase text-accent pb-3 border-b border-surface/20">{col.heading}</h3>
                <ul className="mt-3 grid gap-2">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="link-ul text-[13.5px] leading-[1.4] text-surface/80 no-underline hover:text-surface">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="pt-10 grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
          {/* Shield mark on transparent ground — sits directly on the dark
              footer, so no light plate is needed behind it. */}
          <Link
            href="/"
            className="justify-self-start inline-block no-underline transition-opacity hover:opacity-80"
            aria-label={`${SITE.name} — home`}
          >
            <Image
              src="/logo-shield.png"
              alt=""
              width={512}
              height={480}
              sizes="76px"
              className="block w-[68px] h-auto"
            />
          </Link>

          <p className="justify-self-start md:justify-self-center font-display italic text-[15px] text-surface/70">
            &ldquo;Trust through Governance&rdquo;
          </p>

          <p className="font-mono text-[10px] tracking-[.14em] uppercase text-surface/60 md:text-right">
            © {new Date().getFullYear()} {footerCopy.copy}<br />
            {SITE.region} · {SITE.entity}
          </p>
        </div>
      </div>
    </footer>
  );
}
