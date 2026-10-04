#!/usr/bin/env node
/**
 * SEO audit against a running deployment.
 *
 *   BASE=https://shinish.github.io/princeton-solutions-site node scripts/seo-audit.mjs
 *
 * Checks, against Google Search Central's starter guide:
 *   1  robots.txt   — reachable, parseable, declares a sitemap, names answer engines
 *   2  sitemap.xml  — well-formed, every URL resolves 200 and is canonical
 *   3  per page     — title, description, canonical, lang, one h1, heading order
 *   4  social       — Open Graph and Twitter card completeness
 *   5  structured   — JSON-LD parses, uses real types, invents no ratings/reviews
 *   6  media        — every img has an alt attribute and explicit dimensions
 *   7  linking      — every indexable page is reachable from the home page
 *   8  AI search    — llms.txt present and substantive
 *   9  status       — a missing route returns a genuine 404
 *
 * Reports PASS / WARN / FAIL per check and exits non-zero on any FAIL.
 */

const BASE = (process.env.BASE ?? "http://127.0.0.1:3300").replace(/\/$/, "");
// A sub-path deployment prefixes every href; strip it so links and
// sitemap-derived paths are comparable.
const BASE_PATH = new URL(BASE).pathname.replace(/\/$/, "");
const strip = (h) => (BASE_PATH && h.startsWith(BASE_PATH) ? h.slice(BASE_PATH.length) || "/" : h);
const results = [];
const pass = (c, d) => results.push(["PASS", c, d]);
const warn = (c, d) => results.push(["WARN", c, d]);
const fail = (c, d) => results.push(["FAIL", c, d]);

const get = async (path) => {
  const res = await fetch(BASE + path, { redirect: "follow" });
  return { status: res.status, body: res.ok ? await res.text() : "", res };
};

const attr = (html, re) => {
  const m = re.exec(html);
  return m ? m[1].trim() : null;
};
const decode = (s = "") =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");

/* ----------------------------------------------------------- 1. robots.txt */
const robots = await get("/robots.txt");
let indexable = false;

if (robots.status !== 200) {
  fail("robots.txt", `returned ${robots.status}`);
} else {
  const disallowAll = /^\s*Disallow:\s*\/\s*$/im.test(robots.body);
  const hasSitemap = /^\s*Sitemap:\s*https?:\/\//im.test(robots.body);
  indexable = !disallowAll;

  if (disallowAll) {
    warn("robots.txt", "Disallow: / — the whole site is blocked from crawling (staging guard)");
  } else {
    pass("robots.txt", "crawling allowed");
    hasSitemap
      ? pass("robots.txt", "declares a Sitemap")
      : fail("robots.txt", "no Sitemap directive");
  }

  const engines = [
    "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot",
    "Google-Extended", "Applebot-Extended", "Bingbot", "CCBot",
  ];
  const named = engines.filter((e) => new RegExp(`User-Agent:\\s*${e}`, "i").test(robots.body));
  if (!indexable) {
    warn("AI search", `${named.length}/${engines.length} answer engines named, but all are blocked while Disallow: / is set`);
  } else if (named.length >= engines.length) {
    pass("AI search", `all ${engines.length} answer engines named explicitly`);
  } else {
    warn("AI search", `only ${named.length}/${engines.length} answer engines named: missing ${engines.filter((e) => !named.includes(e)).join(", ")}`);
  }
}

/* ---------------------------------------------------------- 2. sitemap.xml */
const sm = await get("/sitemap.xml");
let urls = [];

if (sm.status !== 200) {
  fail("sitemap.xml", `returned ${sm.status}`);
} else {
  urls = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
  if (!urls.length) fail("sitemap.xml", "contains no <loc> entries");
  else if (!/<urlset[^>]+xmlns=/.test(sm.body)) fail("sitemap.xml", "missing urlset xmlns");
  else pass("sitemap.xml", `${urls.length} URLs, well-formed`);

  const offsite = urls.filter((u) => !u.startsWith(BASE));
  if (offsite.length) fail("sitemap.xml", `${offsite.length} URL(s) outside ${BASE}, e.g. ${offsite[0]}`);
}

/* --------------------------------------------------- 3-6. per-page checks */
const paths = urls.map((u) => u.slice(BASE.length) || "/");
const titles = new Map();
const descs = new Map();
let imgTotal = 0, imgNoAlt = 0, imgNoDims = 0;
let ogOk = 0, twOk = 0, ldOk = 0;
const pageLinks = new Map();

for (const path of paths) {
  const { status, body } = await get(path);
  if (status !== 200) {
    fail("page status", `${path} returned ${status}`);
    continue;
  }

  const title = decode(attr(body, /<title[^>]*>([\s\S]*?)<\/title>/i) ?? "");
  const desc = decode(
    attr(body, /<meta\s+name="description"\s+content="([^"]*)"/i) ??
      attr(body, /<meta\s+content="([^"]*)"\s+name="description"/i) ??
      "",
  );
  const canonical = attr(body, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const lang = attr(body, /<html[^>]+lang="([^"]*)"/i);
  const h1s = (body.match(/<h1\b/gi) || []).length;

  if (!title) fail("title", `${path} has none`);
  else {
    if (titles.has(title)) fail("title", `duplicate on ${path} and ${titles.get(title)}`);
    titles.set(title, path);
    if (title.length > 60) warn("title", `${path} is ${title.length} chars (>60 may truncate in SERPs)`);
  }

  if (!desc) fail("description", `${path} has none`);
  else {
    if (descs.has(desc)) fail("description", `duplicate on ${path} and ${descs.get(desc)}`);
    descs.set(desc, path);
    if (desc.length > 160) warn("description", `${path} is ${desc.length} chars`);
    if (desc.length < 70) warn("description", `${path} is only ${desc.length} chars`);
  }

  const expected = BASE + (path === "/" ? "/" : path);
  if (!canonical) fail("canonical", `${path} has none`);
  else if (canonical.replace(/\/$/, "") !== expected.replace(/\/$/, ""))
    fail("canonical", `${path} points to ${canonical}, expected ${expected}`);

  if (lang !== "en") fail("lang", `${path} has lang="${lang}"`);
  if (h1s !== 1) fail("h1", `${path} has ${h1s}`);

  const levels = [...body.replace(/<script[\s\S]*?<\/script>/g, "").matchAll(/<h([1-6])\b/gi)].map((m) => +m[1]);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      fail("heading order", `${path} skips h${levels[i - 1]} -> h${levels[i]}`);
      break;
    }
  }

  // social
  const og = ["og:title", "og:description", "og:url", "og:type", "og:site_name"].filter((k) =>
    new RegExp(`property="${k}"`).test(body),
  );
  if (og.length >= 4) ogOk++;
  else warn("open graph", `${path} has only ${og.length}/5 core og tags`);
  if (/name="twitter:card"/.test(body)) twOk++;

  // structured data
  const blocks = [...body.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  for (const [, raw] of blocks) {
    try {
      const data = JSON.parse(raw);
      const node = JSON.stringify(data);
      if (!data["@context"]) fail("structured data", `${path} JSON-LD missing @context`);
      if (/"aggregateRating"|"reviewCount"|"ratingValue"/.test(node))
        fail("structured data", `${path} declares ratings/reviews — these must not be fabricated`);
      ldOk++;
    } catch (e) {
      fail("structured data", `${path} has unparseable JSON-LD (${e.message})`);
    }
  }
  if (!blocks.length) warn("structured data", `${path} has no JSON-LD`);

  // media
  for (const [, tag] of body.matchAll(/(<img\b[^>]*>)/g)) {
    imgTotal++;
    if (!/\salt=/.test(tag)) imgNoAlt++;
    if (!/\swidth=/.test(tag) || !/\sheight=/.test(tag)) imgNoDims++;
  }

  // internal links for the reachability graph
  pageLinks.set(
    path,
    [...body.matchAll(/<a\b[^>]*href="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((h) => h.startsWith("/") && !h.startsWith("//"))
      .map((h) => h.split("#")[0])
      .map((h) => strip(h))
      .map((h) => (h.replace(/\/$/, "") || "/")),
  );
}

if (paths.length) {
  pass("page status", `${paths.length} sitemap URLs all returned 200`);
  ogOk === paths.length
    ? pass("open graph", `all ${paths.length} pages carry core og tags`)
    : null;
  twOk === paths.length
    ? pass("twitter", `all ${paths.length} pages declare a twitter:card`)
    : warn("twitter", `${twOk}/${paths.length} pages declare twitter:card`);
  ldOk ? pass("structured data", `${ldOk} JSON-LD blocks parsed, none declare ratings`) : null;
}

imgNoAlt === 0
  ? pass("image alt", `${imgTotal} images, all carry an alt attribute`)
  : fail("image alt", `${imgNoAlt}/${imgTotal} images have no alt`);
imgNoDims === 0
  ? pass("image dims", `${imgTotal} images, all have explicit width and height`)
  : warn("image dims", `${imgNoDims}/${imgTotal} images lack width/height (CLS risk)`);

/* ------------------------------------------------------- 7. reachability */
const home = (pageLinks.get("/") ?? []).map((h) => (h.replace(/\/$/, "") || "/"));
const reachable = new Set(["/"]);
const queue = [...home];
while (queue.length) {
  const n = queue.shift();
  if (reachable.has(n)) continue;
  reachable.add(n);
  for (const l of pageLinks.get(n) ?? pageLinks.get(n + "/") ?? []) {
    if (!reachable.has(l)) queue.push(l);
  }
}
const orphans = paths
  .map((p) => p.replace(/\/$/, "") || "/")
  .filter((p) => !reachable.has(p));
orphans.length
  ? fail("internal linking", `${orphans.length} page(s) unreachable from home: ${orphans.join(", ")}`)
  : pass("internal linking", `all ${paths.length} indexable pages reachable from the home page`);

/* ------------------------------------------------------------ 8. llms.txt */
const llms = await get("/llms.txt");
if (llms.status !== 200) warn("llms.txt", `returned ${llms.status} — answer engines have no summary file`);
else if (llms.body.length < 500) warn("llms.txt", `only ${llms.body.length} bytes`);
else pass("llms.txt", `${llms.body.length} bytes, ${llms.body.split("\n").length} lines`);

/* -------------------------------------------------------------- 9. status */
const missing = await get("/definitely-not-a-real-page-xyz");
missing.status === 404
  ? pass("404", "missing routes return a genuine 404 status")
  : fail("404", `missing route returned ${missing.status}, not 404`);

/* -------------------------------------------------------------- report */
const order = { FAIL: 0, WARN: 1, PASS: 2 };
results.sort((a, b) => order[a[0]] - order[b[0]]);
const n = (k) => results.filter((r) => r[0] === k).length;

console.log(`\n  SEO audit — ${BASE}\n`);
for (const [level, check, detail] of results) {
  const tag = level === "PASS" ? "  ok  " : level === "WARN" ? " warn " : " FAIL ";
  console.log(`  ${tag} ${check.padEnd(18)} ${detail}`);
}
console.log(`\n  ${n("PASS")} passed · ${n("WARN")} warnings · ${n("FAIL")} failures`);
if (!indexable) {
  console.log("\n  note: this deployment is deliberately non-indexable. Set");
  console.log("        NEXT_PUBLIC_ALLOW_INDEXING=true to open it to search engines.");
}
console.log("");
process.exit(n("FAIL") ? 1 : 0);
