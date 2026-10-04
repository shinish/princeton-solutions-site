import Link from "next/link";
import { services, slugify } from "../content";

/**
 * Card-free services index: full-bleed hairline rows that expand in place.
 *
 * Uses the native exclusive-accordion (`<details name="...">`), so only one row
 * is open at a time with no JavaScript, no ARIA to hand-maintain, and keyboard
 * plus screen-reader support for free.
 */
export default function ServiceLedger({ limit }: { limit?: number }) {
  const rows = limit ? services.slice(0, limit) : services;

  return (
    <div className="border-t border-ink">
      {rows.map((s, i) => {
        const slug = slugify(s.title);
        return (
          <details
            key={s.title}
            name="service-ledger"
            className="slide group border-b border-rule"
          >
            <summary
              className="
                list-none cursor-pointer select-none
                grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 sm:gap-x-8
                py-4 sm:py-5
                transition-colors
                hover:text-accent-ink
                [&::-webkit-details-marker]:hidden
              "
            >
              <span className="font-mono text-[11px] text-accent-ink tabular-nums pt-2">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0">
                <span
                  className="
                    block font-display font-extrabold uppercase leading-[1.02]
                    text-[clamp(21px,3.4vw,38px)]
                    tracking-[-.02em]
                  "
                >
                  {s.title}
                </span>
                <span className="mt-2 block font-mono text-[11px] tracking-[.14em] uppercase text-muted">
                  {s.tag}
                </span>
              </span>

              <span
                aria-hidden="true"
                className="
                  mt-3 relative block w-[16px] h-[16px] flex-none
                "
              >
                <span className="absolute left-0 top-[7px] w-[16px] h-[2px] bg-ink group-hover:bg-accent" />
                <span className="absolute left-[7px] top-0 w-[2px] h-[16px] bg-ink group-hover:bg-accent transition-transform duration-300 ease-out group-open:scale-y-0 motion-reduce:transition-none" />
              </span>
            </summary>

            <div className="pb-8 grid gap-8 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-16 pl-0 sm:pl-[52px]">
              <div>
                <p className="rv-glow text-[16px] leading-[1.6] text-ink max-w-[46ch]">{s.blurb}</p>
                <Link
                  href={`/services/${slug}`}
                  className="rv link-ul mt-6 inline-flex items-center gap-2.5 text-[15px] font-semibold text-accent-ink no-underline"
                  style={{ "--i": 2 } as React.CSSProperties}
                >
                  Read the full scope
                  <span aria-hidden="true" className="bands text-accent-ink" />
                </Link>
              </div>

              <ul className="grid gap-0 border-t border-rule">
                {s.bullets.map((b, bi) => (
                  <li
                    key={b}
                    style={{ "--i": bi + 3 } as React.CSSProperties}
                    className="rv grid grid-cols-[auto_1fr] gap-3.5 items-baseline py-3.5 border-b border-rule text-[14.5px] leading-[1.5] text-muted"
                  >
                    <span aria-hidden="true" className="block w-[10px] h-[2px] bg-accent mt-[9px]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        );
      })}
    </div>
  );
}
