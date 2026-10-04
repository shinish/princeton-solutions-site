"use client";

import { useMemo, useState } from "react";
import { frameworks } from "../content";

const ALL = "All";

/**
 * Interactive standards index. Filtering is real work on real data, not
 * decoration: it answers "do you cover X?" in one click. Not a card grid —
 * hairline-ruled register rows with a mono annotation column.
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
      <div className="flex flex-wrap gap-x-7 gap-y-3 pb-7">
        {tabs.map((t) => {
          const on = t === active;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setActive(t)}
              aria-pressed={on}
              className={`
                inline-flex items-center gap-2.5 min-h-[36px]
                font-mono text-[11px] tracking-[.14em] uppercase
                transition-colors
                ${on ? "text-accent-ink" : "text-muted hover:text-ink"}
              `}
            >
              <span
                aria-hidden="true"
                className={`block h-[2px] w-[18px] transition-all duration-200 motion-reduce:transition-none ${
                  on ? "bg-accent" : "bg-rule"
                }`}
              />
              {t}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {count} of {total} standards.
      </p>

      <div className="border-t border-ink">
        {shown.map((f) => (
          <div
            key={f.title}
            className="grid gap-x-10 gap-y-3 py-5 border-b border-rule md:grid-cols-[210px_minmax(0,1fr)]"
          >
            <h3 className="font-display font-bold uppercase tracking-[-.01em] text-[16px] leading-[1.2]">{f.title}</h3>
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {f.chips.map((c) => (
                <li key={c} className="inline-flex items-center gap-2.5">
                  <span aria-hidden="true" className="block w-[10px] h-[2px] bg-accent" />
                  <span className="font-mono text-[12.5px] tracking-[.02em]">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="pt-6 font-mono text-[11px] tracking-[.14em] uppercase text-muted">
        <span className="text-accent-ink">{count}</span> of {total} standards shown
      </p>
    </div>
  );
}
