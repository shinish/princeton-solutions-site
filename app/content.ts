// All page copy, transcribed verbatim from the source artifact.
// Single source of truth: scripts/validate.mjs derives its expected counts from these arrays,
// so dropping a row fails validation rather than quietly shrinking both sides of the comparison.

export const meta = {
  title: "Princeton Solutions Inc.",
  description:
    "Independent IT audit, GRC, cybersecurity, regulatory compliance, third-party risk and AI governance for regulated organizations.",
};

export const brand = {
  name: "Princeton Solutions",
  sub: "Inc. · Est. 2012",
  homeLabel: "Princeton Solutions Inc. home",
};

export const nav = [
  { href: "#services", label: "Services" },
  { href: "#engagements", label: "Engagements" },
  { href: "#frameworks", label: "Frameworks" },
  { href: "#industries", label: "Industries" },
];

export const hero = {
  eyebrow: "IT Audit · GRC · Cybersecurity · AI Governance",
  lede: "Princeton Solutions helps regulated organizations prove their controls work. We deliver IT audit, governance, risk and compliance, third-party risk and AI governance services that stand up to regulators, external auditors and boards.",
  primary: { href: "#contact", label: "Discuss an engagement" },
  secondary: { href: "#services", label: "View services" },
};

export const controlRecord = {
  label: "Sample control test record",
  head: ["Control test record", "Sample"],
  rows: [
    {
      dt: "Control",
      tag: "AIG-06",
      text: "AI system risk assessment performed before deployment",
    },
    { dt: "Criteria", text: "ISO/IEC 42001 Cl. 6.1.2 · NIST AI RMF MAP 1.1" },
    {
      dt: "Procedure",
      text: "Inspected 25 of 25 production models for an approved risk assessment, owner sign-off and residual-risk rating.",
    },
    { dt: "Evidence", ticks: ["Model inventory", "Assessments", "Approvals"] },
    { dt: "Result", status: "Operating effectively" },
  ] as const,
};

export const facts = [
  { value: "2012", label: "Established in Pennsylvania" },
  { value: "20+ yrs", label: "Practitioner experience in regulated financial services" },
  { value: "3 regions", label: "Vendor audits across the Americas, Europe and Asia" },
  { value: "3 lines", label: "Work delivered for first-line, risk and internal audit teams" },
];

export const services = [
  {
    title: "AI Governance & Assurance",
    tag: "ISO 42001 · AI RMF",
    blurb:
      "Build and test the controls that make AI use defensible, from policy through model-level audit.",
    bullets: [
      "ISO/IEC 42001 readiness assessments and internal audits",
      "NIST AI RMF adoption and maturity assessments",
      "Trustworthy AI policy, charter and working-group design",
      "AI inventory, risk tiering and audit programs for AI/ML systems",
    ],
  },
  {
    title: "IT Audit & Internal Audit Support",
    tag: "ITGC · IIA",
    blurb: "Outsourced and co-sourced IT audit delivery across the full audit lifecycle.",
    bullets: [
      "Risk-based IT audit strategy and multi-year audit plans",
      "ITGC, application, IAM, data protection and IT asset management audits",
      "Security operations, infrastructure and cloud audits",
      "Audit committee and executive reporting",
    ],
  },
  {
    title: "Cybersecurity & Information Security Risk",
    tag: "ISO 27001 · NIST CSF",
    blurb: "Measure your security program against the frameworks your stakeholders expect.",
    bullets: [
      "ISO/IEC 27001 readiness, gap assessments and internal ISMS audits",
      "NIST CSF and NIST 800-53 control assessments",
      "Information security policy, standard and control hierarchy design",
      "NY DFS Part 500 cybersecurity compliance reviews",
    ],
  },
  {
    title: "Regulatory Compliance & Exam Readiness",
    tag: "OCC · FFIEC",
    blurb: "Prepare for examinations and close findings with evidence regulators accept.",
    bullets: [
      "OCC, FFIEC and CFPB examination readiness",
      "Independent validation of MRA and Consent Order remediation",
      "Examiner and external auditor request coordination",
      "GLBA, GDPR, CCPA and DORA requirement mapping",
    ],
  },
  {
    title: "SOX, SOC & Certification Audit Support",
    tag: "SOX 404 · SSAE 18",
    blurb:
      "Get audit-ready and stay that way, with organized evidence and tracked remediation.",
    bullets: [
      "IT SOX (302/404) ITGC design, walkthroughs and testing",
      "SOC 1 and SOC 2 readiness and evidence repositories",
      "Control gap analysis and corrective action tracking to closure",
      "Support for private-to-public company control transitions",
    ],
  },
  {
    title: "Third-Party & Vendor Risk Management",
    tag: "Global TPRM",
    blurb:
      "Verify that vendors and offshore delivery centers meet your security, privacy and contract terms.",
    bullets: [
      "TPRM program design, vendor tiering and due-diligence workflows",
      "On-site and remote audits of BPO, ITO and managed service providers",
      "Security and privacy clause review in vendor and customer contracts",
      "SOC report review and complementary user-entity control mapping",
    ],
  },
  {
    title: "GRC Program Design & Automation",
    tag: "RCM · CCM",
    blurb: "Reduce duplicate testing and give leadership a live view of control health.",
    bullets: [
      "Rationalized risk and control matrices mapped to a unified framework",
      "Three-lines-of-defense testing alignment and methodology",
      "GRC platform requirements and workflow design (ServiceNow, ProcessUnity)",
      "Continuous control monitoring and Power BI risk dashboards",
    ],
  },
  {
    title: "Cloud Governance, Privacy & Due Diligence",
    tag: "CSA CCM · Azure",
    blurb: "Address risk early, before a migration, integration or acquisition closes.",
    bullets: [
      "Pre-implementation reviews for cloud migrations on Microsoft Azure",
      "Cloud control assessments using the CSA Cloud Controls Matrix",
      "Data privacy risk evaluations and privacy-by-design reviews",
      "Technology and security due diligence for mergers and acquisitions",
    ],
  },
];

export const models = [
  {
    tag: "Fixed scope",
    title: "Assessments",
    blurb: "Readiness, gap and maturity assessments with a prioritized remediation roadmap.",
  },
  {
    tag: "Co-source",
    title: "Audit delivery",
    blurb:
      "Senior IT audit capacity that plugs into your internal audit plan and methodology.",
  },
  {
    tag: "Independent",
    title: "Validation",
    blurb:
      "Independent testing of remediation for regulatory findings, MRAs and audit issues.",
  },
  {
    tag: "Retainer",
    title: "Advisory",
    blurb: "Ongoing SME support for GRC, security, privacy and AI governance decisions.",
  },
];

export const steps = [
  {
    title: "Scope",
    blurb:
      "Agree objectives, criteria, frameworks and stakeholders. Confirm what evidence will satisfy each requirement.",
  },
  {
    title: "Assess",
    blurb: "Walk through processes, test controls and validate evidence with control owners.",
  },
  {
    title: "Report",
    blurb:
      "Deliver risk-rated findings, root causes and practical recommendations in plain language.",
  },
  {
    title: "Validate",
    blurb: "Track corrective actions and independently confirm remediation through closure.",
  },
];

export const frameworks = [
  {
    title: "Banking & financial regulation",
    chips: ["OCC", "FFIEC", "CFPB", "GLBA", "NY DFS Part 500", "SWIFT CSP", "DORA"],
  },
  {
    title: "Financial reporting & attestation",
    chips: ["SOX 302 / 404", "SSAE 18 SOC 1", "SOC 2", "COSO"],
  },
  {
    title: "Security & IT governance",
    chips: [
      "ISO/IEC 27001",
      "ISO/IEC 27032",
      "NIST CSF",
      "NIST 800-53",
      "CIS Controls",
      "COBIT",
      "ITIL",
      "CSA CCM",
      "UCF",
    ],
  },
  { title: "Privacy", chips: ["GDPR", "CCPA", "HIPAA"] },
  { title: "Artificial intelligence", chips: ["ISO/IEC 42001", "NIST AI RMF"] },
];

export const industries = [
  {
    term: "Banks and savings institutions",
    detail: "Federally and state-regulated institutions preparing for examinations.",
  },
  {
    term: "Mortgage servicing and lending",
    detail: "Servicers, sub-servicers and originators with heavy vendor and data obligations.",
  },
  {
    term: "Fintech and financial services providers",
    detail: "Firms that must evidence controls to bank partners and customers.",
  },
  {
    term: "BPO, ITO and managed service providers",
    detail: "Providers preparing for client audits and SOC reports.",
  },
  {
    term: "Healthcare and manufacturing",
    detail: "Organizations needing SOX, ITGC and application security assurance.",
  },
];

export const differentiators = [
  {
    term: "Senior practitioners on every engagement",
    detail: "The person who scopes your work is the person who delivers it.",
  },
  {
    term: "Regulator-tested experience",
    detail: "Our work has been shaped by OCC examinations, Consent Orders and Big-4 audits.",
  },
  {
    term: "Independence",
    detail: "We assess and advise. We do not resell software or implementation services.",
  },
  {
    term: "Global vendor reach",
    detail:
      "Audits of delivery centers in India, the Philippines, Malaysia, Singapore, Costa Rica and Europe.",
  },
  {
    term: "Built for small teams too",
    detail:
      "Right-sized engagements for organizations without a large audit or GRC function.",
  },
];

export const credentials = [
  { abbr: "CISA", name: "Certified Information Systems Auditor" },
  { abbr: "CISM", name: "Certified Information Security Manager" },
  { abbr: "CDPSE", name: "Certified Data Privacy Solutions Engineer" },
  { abbr: "CISSO", name: "Certified Information Systems Security Officer" },
  { abbr: "ISO 42001 LA", name: "Lead Auditor, AI Management Systems" },
  { abbr: "ISO 27001 LA", name: "Lead Auditor, Information Security" },
  { abbr: "ISO 27032", name: "Cybersecurity Manager" },
  { abbr: "Azure", name: "Microsoft Certified Cloud Solutions Architect" },
];

// Placeholder kept exactly as the source artifact ships it. Swap this one constant
// for the real business address when the site goes live.
export const CONTACT_EMAIL = "info@yourdomain.com";

export const contactMeta = [
  { dt: "Email", dd: CONTACT_EMAIL },
  { dt: "Based in", dd: "Pennsylvania, USA · Serving clients nationwide and remotely" },
  { dt: "Company", dd: "Princeton Solutions Inc. · Pennsylvania S corporation since 2012" },
];

export const topicOptions = [
  "AI governance & assurance",
  "IT audit & internal audit support",
  "Cybersecurity & information security risk",
  "Regulatory compliance & exam readiness",
  "SOX, SOC & certification audit support",
  "Third-party & vendor risk management",
  "GRC program design & automation",
  "Cloud governance, privacy & due diligence",
  "Something else",
];

export const footer = {
  copy: "Princeton Solutions Inc. All rights reserved.",
  tagline: "IT Audit · GRC · Cybersecurity · Compliance · AI Governance",
};

/* ===========================================================================
   Site structure added for the multi-page build.
   =========================================================================== */

/** Stable, readable URL slugs derived from titles — no parallel list to drift. */
export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const serviceSlugs = services.map((s) => slugify(s.title));
export const serviceBySlug = (slug: string) =>
  services.find((s) => slugify(s.title) === slug);

/**
 * Facts the site states about itself.
 *
 * `email` is still the placeholder the source artifact shipped. Everything that
 * renders it also renders a visible notice, and `npm run check:facts` fails the
 * build gate while any UNCONFIRMED value remains — so it cannot ship silently.
 */
export const SITE = {
  name: "Princeton Solutions Inc.",
  shortName: "Princeton Solutions",
  /** Replace before launch. Used in mailto:, JSON-LD and the policies. */
  email: CONTACT_EMAIL,
  emailConfirmed: false,
  region: "Pennsylvania, USA",
  regionNote: "Serving clients nationwide and remotely",
  entity: "Pennsylvania S corporation since 2012",
  founded: "2012",
  /** No street address is published: none was supplied and none may be invented. */
  streetAddress: null as string | null,
  /** Where the site is served. Used for canonicals, sitemap and OG URLs. */
  origin: process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://example.invalid",
  originConfirmed: Boolean(process.env.NEXT_PUBLIC_SITE_ORIGIN),
  /**
   * Indexing is opt-in and separate from the origin, so a preview deploy can
   * have correct canonical URLs while still being excluded from search.
   */
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
};

export const nav2 = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const footerNav = [
  {
    heading: "Services",
    links: services.slice(0, 4).map((s) => ({
      href: `/services/${slugify(s.title)}`,
      label: s.title,
    })),
  },
  {
    heading: "More services",
    links: services.slice(4).map((s) => ({
      href: `/services/${slugify(s.title)}`,
      label: s.title,
    })),
  },
  {
    heading: "Firm",
    links: [
      { href: "/about", label: "About" },
      { href: "/services", label: "All services" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
];

/** Answers restate what the service and engagement content already says. */
export const faqs = [
  {
    q: "What does an engagement actually produce?",
    a: "Every engagement has a defined deliverable and a senior practitioner accountable for it. Assessments produce a readiness, gap or maturity report with a prioritized remediation roadmap. Audit delivery produces workpapers and findings within your existing methodology. Validation produces independent confirmation that remediation closed the issue. Advisory is ongoing subject-matter support.",
  },
  {
    q: "How does an engagement run from start to finish?",
    a: "Four phases. Scope: agree objectives, criteria, frameworks and stakeholders, and confirm what evidence will satisfy each requirement. Assess: walk through processes, test controls and validate evidence with control owners. Report: deliver risk-rated findings, root causes and practical recommendations in plain language. Validate: track corrective actions and independently confirm remediation through closure.",
  },
  {
    q: "Which standards and regulations do you work against?",
    a: "Banking and financial regulation including OCC, FFIEC, CFPB, GLBA, NY DFS Part 500, SWIFT CSP and DORA. Financial reporting and attestation including SOX 302/404, SSAE 18 SOC 1, SOC 2 and COSO. Security and IT governance including ISO/IEC 27001, ISO/IEC 27032, NIST CSF, NIST 800-53, CIS Controls, COBIT, ITIL, CSA CCM and UCF. Privacy including GDPR, CCPA and HIPAA. Artificial intelligence including ISO/IEC 42001 and the NIST AI RMF.",
  },
  {
    q: "Do I have to buy a whole program?",
    a: "No. Engage one service line for a defined scope, or combine several into an integrated assurance program. Engagements are right-sized for organizations without a large audit or GRC function as well as for established internal audit teams.",
  },
  {
    q: "Can you work alongside our existing internal audit team?",
    a: "Yes. Co-sourced audit delivery provides senior IT audit capacity that plugs into your existing internal audit plan and methodology, rather than replacing it.",
  },
  {
    q: "Do you sell or implement the software you assess?",
    a: "No. We assess and advise. We do not resell software or implementation services, which is what keeps the assessment independent.",
  },
  {
    q: "Can you audit our offshore delivery centers?",
    a: "Yes, on-site and remote. Vendor and delivery-center audits have covered the Americas, Europe and Asia, including India, the Philippines, Malaysia, Singapore and Costa Rica.",
  },
  {
    q: "How do we start?",
    a: "Send a note describing your audit, exam or governance need. We reply within two business days with a proposed scope.",
  },
];

/** Verifiable statements about how THIS website behaves. Keep in sync with code. */
export const sitePractices = {
  cookies: false,
  analytics: false,
  trackers: false,
  serverForms: false,
  payments: false,
  accounts: false,
  fontsSelfHosted: true,
  lastUpdated: "2026-10-04",
};
