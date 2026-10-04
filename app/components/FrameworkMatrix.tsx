"use client";

import { useMemo, useState } from "react";
import { frameworks } from "../content";

const ALL = "All";

/**
 * Standards register with a working filter. Not a card grid: grouped rows of
 * angled chips that share the buttons' 14.57deg lean, so the shape language is
 * consistent across the site.
 */
export default function FrameworkMatrix() {
  const [active, setActive] = useState<string>(ALL);

  const shown = useMemo(
    () => (active === ALL ? frameworks : frameworks.filter((f) => f.title === active)),
    [active],
  );
  const count = shown.reduce((n, f) => n + f.chips.length, 0);
  const total = frameworks.reduce((n, f) => n + f.chips.length, 0);
  const tabs = [ALL, ...frameworks.map((f) => f.title)];

  return (
    <div>
      {/* filter */}
      <div className="flex flex-wrap items-center gap-3">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t)}
            aria-pressed={t === active}
            className="chip-ang"
          >
            <span>{t}</span>
          </button>
        ))}
      </div>

      {/* readout — the live region announces it, so the visual copy is hidden
          from assistive tech to avoid it being read twice */}
      <p aria-live="polite" className="sr-only">
        Showing {count} of {total} standards.
      </p>
      <div
        aria-hidden="true"
        className="mt-9 flex items-baseline justify-between gap-4 border-b border-ink pb-3"
      >
        <span className="font-mono text-[10.5px] tracking-[.2em] uppercase text-muted">
          {active === ALL ? "Full coverage" : active}
        </span>
        <span className="font-display font-extrabold tabular-nums text-[clamp(22px,2.6vw,32px)] leading-none tracking-[-.02em]">
          <span className="text-accent-ink">{String(count).padStart(2, "0")}</span>
          <span className="text-muted"> / {total}</span>
        </span>
      </div>

      <div>
        {shown.map((f) => (
          <div
            key={f.title}
            className="grid gap-x-10 gap-y-4 py-7 border-b border-rule md:grid-cols-[240px_minmax(0,1fr)]"
          >
            <h3 className="font-display font-bold uppercase tracking-[-.01em] text-[15px] leading-[1.25] text-muted">
              {f.title}
            </h3>
            <ul className="flex flex-wrap gap-2.5">
              {f.chips.map((c) => (
                <li key={c}>
                  <span className="chip-ang chip-ang-static">
                    <span>{c}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
