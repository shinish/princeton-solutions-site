import Link from "next/link";
import { SITE } from "../content";

export default function Breadcrumbs({
  trail,
  onDark = false,
}: {
  trail: { href: string; label: string }[];
  onDark?: boolean;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.label,
      item: `${SITE.origin}${t.href}`,
    })),
  };
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[.12em] uppercase ${onDark ? "text-white/60" : "text-muted"}`}>
          {trail.map((t, i) => (
            <li key={t.href} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true" className="bands text-accent-ink" />}
              {i === trail.length - 1 ? (
                <span aria-current="page" className={onDark ? "text-white" : "text-ink"}>{t.label}</span>
              ) : (
                <Link href={t.href} className="link-ul no-underline hover:text-accent">
                  {t.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </>
  );
}
