import type { MetadataRoute } from "next";
import { SITE } from "./content";

// Required by output: "export" — these must be emitted at build time.
export const dynamic = "force-static";

/**
 * Until a production origin is confirmed via NEXT_PUBLIC_SITE_ORIGIN, this
 * disallows everything. That is deliberate: it stops a preview or staging
 * deploy being indexed under the wrong hostname. Set the env var to go live.
 */
export default function robots(): MetadataRoute.Robots {
  if (!SITE.allowIndexing) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  // Answer engines are named explicitly rather than relying on the wildcard:
  // several of these only honour a rule that names them, and being listed is
  // what makes the firm eligible to be surfaced and cited in AI answers.
  const answerEngines = [
    "GPTBot",            // OpenAI crawler
    "OAI-SearchBot",     // ChatGPT search index
    "ChatGPT-User",      // ChatGPT live browsing
    "ClaudeBot",         // Anthropic crawler
    "Claude-User",       // Claude live browsing
    "Claude-SearchBot",  // Claude search index
    "PerplexityBot",     // Perplexity index
    "Perplexity-User",   // Perplexity live fetch
    "Google-Extended",   // Gemini grounding
    "Applebot",          // Siri / Spotlight
    "Applebot-Extended", // Apple Intelligence
    "Amazonbot",         // Alexa
    "meta-externalagent",// Meta AI
    "Bingbot",           // powers Copilot
    "DuckAssistBot",     // DuckDuckGo AI
    "CCBot",             // Common Crawl, feeds many models
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...answerEngines.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: `${SITE.origin}/sitemap.xml`,
    host: SITE.origin,
  };
}
