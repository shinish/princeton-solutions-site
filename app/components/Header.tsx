"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { nav2, SITE } from "../content";
import Image from "next/image";
import { ButtonLink } from "./Button";

export default function Header() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  // Native <dialog> provides focus trapping, Escape-to-close and an inert
  // background — no hand-rolled focus trap.
  const openMenu = () => { dialogRef.current?.showModal(); setOpen(true); };
  const closeMenu = () => dialogRef.current?.close();

  useEffect(() => { if (dialogRef.current?.open) dialogRef.current.close(); }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-dark/95 backdrop-blur-[8px] border-b border-rule-dark text-white">
      <div className="w-full px-[var(--gutter)] h-[72px] flex items-center justify-between gap-6">
        {/* Supplied artwork, recoloured for dark surfaces: the near-black
            wordmark is lifted to white while the gradient shield is left
            untouched, so it sits on the dark bar with no plate behind it. */}
        <Link href="/" className="flex items-center no-underline shrink-0 transition-opacity duration-200 hover:opacity-80">
          <Image
            src="/logo-nav-light.png"
            alt={`${SITE.name} — IT risk, cybersecurity and AI governance`}
            width={880}
            height={217}
            priority
            sizes="(max-width: 1024px) 190px, 230px"
            className="block w-[190px] lg:w-[230px] h-auto"
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-6">
          {nav2.map((n, i) => {
            const active = pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <Fragment key={n.href}>
                {i > 0 && <span aria-hidden="true" className="nav-sep text-white" />}
                <Link
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={`link-ul font-mono text-[11.5px] tracking-[.14em] uppercase no-underline ${
                    active ? "text-accent" : "text-white/80 hover:text-accent"
                  }`}
                >
                  {n.label}
                </Link>
              </Fragment>
            );
          })}
          <span aria-hidden="true" className="nav-sep text-white" />
          <ButtonLink href="/contact" variant="primary">Request a consultation</ButtonLink>
        </nav>

        <button
          type="button"
          onClick={openMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="lg:hidden inline-flex items-center gap-2.5 min-h-[44px] px-2 -mr-2 text-white"
        >
          <span className="font-mono text-[11px] tracking-[.16em] uppercase">Menu</span>
          <span aria-hidden="true" className="grid gap-[5px]"><span className="block w-[22px] h-[1.5px] bg-white" /><span className="block w-[22px] h-[1.5px] bg-white" /></span>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        onClose={() => setOpen(false)}
        aria-label="Site menu"
        className="m-0 w-full max-w-none h-full max-h-none bg-dark text-white backdrop:bg-black/60 p-0"
      >
        <div className="flex flex-col h-full px-[var(--gutter)] py-5">
          <div className="flex items-center justify-between h-[52px]">
            <Image
              src="/logo-nav-light.png"
              alt=""
              width={880}
              height={217}
              className="block w-[150px] h-auto"
            />
            <button type="button" onClick={closeMenu} className="inline-flex items-center gap-2 min-h-[44px] px-2 -mr-2 font-mono text-[11px] tracking-[.16em] uppercase">
              Close <span aria-hidden="true" className="text-[17px] leading-none">×</span>
            </button>
          </div>
          <nav aria-label="Site" className="mt-5 border-t border-rule-dark">
            {nav2.map((n, i) => (
              <Link key={n.href} href={n.href} onClick={closeMenu}
                className="flex items-baseline gap-4 py-4 border-b border-rule-dark no-underline text-white">
                <span className="font-mono text-[10.5px] text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display font-extrabold uppercase text-[clamp(26px,7.5vw,34px)] leading-none tracking-[-.02em]">{n.label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-6">
            <ButtonLink href="/contact" variant="primary" className="w-full">Request a consultation</ButtonLink>
            <p className="mt-4 font-mono text-[10.5px] tracking-[.14em] uppercase text-white/60">{SITE.region}</p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
