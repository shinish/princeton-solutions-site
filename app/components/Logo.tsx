/**
 * Princeton Solutions marks, rebuilt as scalable vector.
 *
 * This is an interpretation of the supplied artwork, not a tracing of it: the
 * shield, the PS monogram and the GRC / L1-L2-L3 block are redrawn as clean
 * geometry so they stay crisp at every size and can be recoloured by theme.
 * Review against the original before it goes anywhere public.
 */

let uid = 0;
const nextId = () => `psg${++uid}`;

export function LogoMark({
  className = "",
  size = 40,
  mono = false,
}: {
  className?: string;
  size?: number;
  mono?: boolean;
}) {
  const g = nextId();
  return (
    <svg
      width={size}
      height={(size * 112) / 100}
      viewBox="0 0 100 112"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {!mono && (
        <defs>
          <linearGradient id={g} x1="8" y1="100" x2="92" y2="8" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#1B4F8F" />
            <stop offset=".55" stopColor="#1E7FA8" />
            <stop offset="1" stopColor="#3FA65C" />
          </linearGradient>
        </defs>
      )}
      {/* shield */}
      <path
        d="M50 3 L95 20 V56 C95 82 74 99 50 109 C26 99 5 82 5 56 V20 Z"
        fill={mono ? "currentColor" : `url(#${g})`}
      />
      {/* knocked-out PS monogram */}
      <path
        d="M30 32 h20 a13 13 0 0 1 0 26 h-9 v22 h-11 Z M41 42 v6 h8 a3 3 0 0 0 0-6 Z"
        fill="#ffffff"
      />
      <path
        d="M72 36 a14 10 0 0 0-20 7 c0 11 19 8 19 15 a13 9 0 0 1-19 5 l-6 8 a21 13 0 0 0 32-10 c0-12-19-9-19-16 a9 6 0 0 1 12-3 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

/**
 * The GRC / L1-L2-L3 block from the logo.
 *
 * Each cell pulses to the accent in sequence. The cycle is slow and the
 * delta is small, so it reads as a pulse rather than a blink, and the global
 * prefers-reduced-motion rule renders it static.
 */
export function ThreeLines({ className = "" }: { className?: string }) {
  const cells = [
    { x: 0, y: 0, w: 38, h: 26, base: "#3A3A4A", label: "G", lx: 19, ly: 18, lb: "#fff", d: 0 },
    { x: 41, y: 0, w: 38, h: 26, base: "#0B0B12", label: "R", lx: 60, ly: 18, lb: "#FF2D78", d: 0.5 },
    { x: 82, y: 0, w: 38, h: 26, base: "#C9CBD6", label: "C", lx: 101, ly: 18, lb: "#0B0B12", d: 1 },
    { x: 0, y: 29, w: 120, h: 24, base: "#3A3A4A", label: "L1", lx: 60, ly: 46, lb: "#fff", d: 1.5 },
    { x: 0, y: 56, w: 120, h: 24, base: "#0B0B12", label: "L2", lx: 60, ly: 73, lb: "#fff", d: 2 },
    { x: 0, y: 83, w: 120, h: 24, base: "#C9CBD6", label: "L3", lx: 60, ly: 100, lb: "#0B0B12", d: 2.5 },
  ];

  return (
    <svg
      viewBox="0 0 120 112"
      className={className}
      role="img"
      aria-label="Governance, risk and compliance across the three lines of defence"
    >
      <g fontFamily="var(--f-mono)" fontSize="15" fontWeight="600" textAnchor="middle">
        {cells.map((c) => (
          <g key={c.label}>
            <rect
              className="grc-cell"
              x={c.x}
              y={c.y}
              width={c.w}
              height={c.h}
              style={
                {
                  "--cell-base": c.base,
                  animationDelay: `${c.d}s`,
                } as React.CSSProperties
              }
            />
            <text
              className="grc-label"
              x={c.lx}
              y={c.ly}
              style={
                {
                  "--label-base": c.lb,
                  animationDelay: `${c.d}s`,
                } as React.CSSProperties
              }
            >
              {c.label}
            </text>
          </g>
        ))}

        {/* vertical gutters that make the banded grid read as a matrix */}
        <rect x="38" y="29" width="3" height="78" fill="currentColor" />
        <rect x="79" y="29" width="3" height="78" fill="currentColor" />
      </g>
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`leading-none ${className}`}>
      <span className="block font-display text-[17px] font-semibold tracking-[.02em] uppercase">
        Princeton Solutions
      </span>
      <span className="block font-mono text-[8.5px] tracking-[.26em] uppercase text-current/55 mt-[4px]">
        IT Risk · Cybersecurity · AI Governance
      </span>
    </span>
  );
}
