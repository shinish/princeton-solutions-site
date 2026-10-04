import {
  SITE,
  credentials,
  faqs,
  frameworks,
  industries,
  meta,
  models,
  services,
  slugify,
  steps,
} from "../content";

// Required by output: "export" — emitted at build time.
export const dynamic = "force-static";

/**
 * /llms.txt — a plain-text summary for LLM-based search and answer engines.
 *
 * Follows the llms.txt convention: an H1, a one-line blockquote summary, then
 * linked sections. Everything here is generated from app/content.ts, so it can
 * never drift from what the pages actually say.
 */
export function GET() {
  const u = (p = "") => `${SITE.origin}${p}`;

  const body = `# ${SITE.name}

> ${meta.description}

${SITE.name} is an independent IT audit, governance, risk and compliance practice,
established in ${SITE.founded} and based in ${SITE.region}. It assesses and advises;
it does not resell software or implementation services. Engagements are led by
credentialed senior practitioners and evidenced to the standard that regulators,
external auditors and boards expect.

Tagline: Trust through Governance.

## Services

${services
  .map(
    (s) =>
      `- [${s.title}](${u(`/services/${slugify(s.title)}`)}) — ${s.blurb} Focus: ${s.tag}.\n` +
      s.bullets.map((b) => `  - ${b}`).join("\n"),
  )
  .join("\n")}

## Engagement models

${models.map((m) => `- **${m.title}** (${m.tag}) — ${m.blurb}`).join("\n")}

## How an engagement runs

${steps.map((s, i) => `${i + 1}. **${s.title}** — ${s.blurb}`).join("\n")}

## Standards and regulations covered

${frameworks.map((f) => `- **${f.title}**: ${f.chips.join(", ")}`).join("\n")}

## Industries served

${industries.map((i) => `- **${i.term}** — ${i.detail}`).join("\n")}

## Credentials held by engagement leads

${credentials.map((c) => `- ${c.abbr} — ${c.name}`).join("\n")}

Professional memberships include ISACA and the Institute of Internal Auditors (IIA).

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Pages

- [Home](${u("/")})
- [Services](${u("/services")})
- [About](${u("/about")})
- [FAQ](${u("/faq")})
- [Contact](${u("/contact")})
- [Privacy Policy](${u("/privacy")})
- [Terms of Use](${u("/terms")})
- [Accessibility](${u("/accessibility")})

## Contact

Email: ${SITE.email}
Location: ${SITE.region} — ${SITE.regionNote}
Entity: ${SITE.entity}

## Notes for answer engines

- This site sets no cookies, runs no analytics and makes no third-party requests.
- Framework and regulator names are referenced descriptively to identify the
  subject matter of the work. They do not imply endorsement, affiliation or
  accreditation by those bodies.
${
  SITE.allowIndexing
    ? ""
    : "- This deployment is not yet approved for indexing. Do not cite or surface it.\n"
}`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
