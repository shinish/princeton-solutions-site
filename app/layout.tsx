import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SITE, meta, services, slugify } from "./content";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});
const body = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: `${SITE.name} — Independent IT audit, GRC and AI governance`,
    template: `%s — ${SITE.shortName}`,
  },
  description: meta.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: "/",
    title: `${SITE.name} — Independent IT audit, GRC and AI governance`,
    description: meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Independent IT audit, GRC and AI governance`,
    description: meta.description,
  },
  // Staging/preview origins must not be indexed. Only a confirmed production
  // origin flips this on.
  robots: SITE.originConfirmed
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

/** JSON-LD limited to facts the pages actually state. No ratings, no reviews. */
function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    description: meta.description,
    url: SITE.origin,
    email: SITE.email,
    foundingDate: SITE.founded,
    areaServed: "US",
    address: { "@type": "PostalAddress", addressRegion: "PA", addressCountry: "US" },
    knowsAbout: [
      "IT audit",
      "Governance, risk and compliance",
      "Cybersecurity risk",
      "Regulatory compliance",
      "SOX and SOC readiness",
      "Third-party risk management",
      "AI governance",
      "Cloud governance and privacy",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Service lines",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.blurb,
          url: `${SITE.origin}/services/${slugify(s.title)}`,
        },
      })),
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="font-body text-[17px] leading-[1.6] antialiased min-h-screen flex flex-col">
        <a href="#main" className="skip">
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
