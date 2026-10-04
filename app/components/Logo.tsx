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

/** The three-lines-of-defence block from the logo, as a reusable motif. */
export function ThreeLines({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 112"
      className={className}
      role="img"
      aria-label="Governance, risk and compliance across the three lines of defence"
    >
      <g fontFamily="var(--f-mono)" fontSize="15" fontWeight="600" textAnchor="middle">
        <rect x="0" y="0" width="38" height="26" fill="#3A3A4A" />
        <rect x="41" y="0" width="38" height="26" fill="#0B0B12" />
        <rect x="82" y="0" width="38" height="26" fill="#C9CBD6" />
        <text x="19" y="18" fill="#fff">G</text>
        <text x="60" y="18" fill="#FF2D78">R</text>
        <text x="101" y="18" fill="#fff">C</text>

        <rect x="0" y="29" width="120" height="24" fill="#3A3A4A" />
        <text x="60" y="46" fill="#fff">L1</text>
        <rect x="0" y="56" width="120" height="24" fill="#0B0B12" />
        <text x="60" y="73" fill="#fff">L2</text>
        <rect x="0" y="83" width="120" height="24" fill="#C9CBD6" />
        <text x="60" y="100" fill="#0B0B12">L3</text>

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
