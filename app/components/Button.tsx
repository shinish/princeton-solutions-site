import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "accent" | "on-dark";

/**
 * Angular button. The parallelogram is painted by a ::before in globals.css, so
 * the element stays rectangular — the focus outline is never clipped and the hit
 * area stays a full 48px. The label is a plain horizontal span, never skewed.
 */
function classes(variant: Variant, className = "") {
  return `btn btn-${variant} ${className}`.trim();
}

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className,
  ...rest
}: { href: string; variant?: Variant; children: ReactNode; className?: string } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className" | "children"
>) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) {
    return (
      <a href={href} className={classes(variant, className)}>
        <span>{children}</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes(variant, className)} {...rest}>
      <span>{children}</span>
    </Link>
  );
}

export function Button({
  variant = "primary",
  children,
  className,
  loading = false,
  ...rest
}: { variant?: Variant; loading?: boolean } & ComponentProps<"button">) {
  return (
    <button
      className={classes(variant, className)}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
}

/** The three-lines motif, lifted from the GRC / L1-L2-L3 block in the logo. */
export function Bands({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`bands ${className}`}>
      <i /><i /><i />
    </span>
  );
}
