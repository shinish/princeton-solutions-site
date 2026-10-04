#!/usr/bin/env node
/**
 * Build-output QA for the exported site.
 *
 *   A  content inventory — every service, framework, credential, industry and
 *      differentiator from app/content.ts still appears somewhere in the site.
 *      (Replaces the old artifact-replica diff, which the redesign made moot.)
 *   B  internal link graph — every internal href resolves to an exported file,
 *      every in-page #fragment resolves to an id on that page.
 *   C  per-page SEO — unique title + meta description, exactly one <h1>,
 *      canonical present, no heading-level skips.
 *   D  asset references — every local src/href asset exists in out/.
 *
 * Exits non-zero on any failure. No dependencies.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "out");

const failures = [];
const warnings = [];
const fail = (c, d) => failures.push(`${c}: ${d}`);
const warn = (c, d) => warnings.push(`${c}: ${d}`);

if (!existsSync(OUT)) {
  console.error("\n  No out/ directory. Run `next build` first.\n");
  process.exit(2);
}

/* ------------------------------------------------------------------ helpers */
const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "’", ldquo: "“", rdquo: "”" };
const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? m);

const stripNonText = (h) =>
  h
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");

const textOf = (h) => decode(stripNonText(h).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");

function walk(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    statSync(p).isDirectory() ? walk(p, acc) : acc.push(p);
  }
  return acc;
}

const files = walk(OUT);
const pages = files
  .filter((f) => f.endsWith(".html"))
  .map((f) => ({ file: f, route: "/" + relative(OUT, f).replace(/index\.html$/, "").replace(/\.html$/, "") }))
  .map((p) => ({ ...p, route: p.route.replace(/\/$/, "") || "/" }));

const corpus = pages.map((p) => textOf(readFileSync(p.file, "utf8"))).join(" \u0001 ");

/* --------------------------------------------------------- A: content kept */
const content = await import("../app/content.ts").catch((e) => {
  fail("A inventory", `could not import app/content.ts (${e.message})`);
  return null;
});

if (content) {
  const checks = [
    ["service title", content.services.map((s) => s.title)],
    ["service bullet", content.services.flatMap((s) => s.bullets)],
    ["framework standard", content.frameworks.flatMap((f) => f.chips)],
    ["credential", content.credentials.map((c) => c.abbr)],
    ["industry", content.industries.map((i) => i.term)],
    ["differentiator", content.differentiators.map((d) => d.term)],
    ["engagement model", content.models.map((m) => m.title)],
    ["phase", content.steps.map((s) => s.title)],
    ["FAQ question", content.faqs.map((f) => f.q)],
  ];
  for (const [kind, items] of checks) {
    const missing = items.filter((t) => !corpus.includes(decode(t).replace(/\s+/g, " ")));
    if (missing.length) {
      fail("A inventory", `${missing.length}/${items.length} ${kind}(s) missing from the built site:\n      - ` + missing.slice(0, 6).join("\n      - "));
    }
  }
}

/* ------------------------------------------------------ B: internal links */
// Routes in a sub-path build carry the basePath; strip it before resolving.
const BASE_PATH = process.env.PAGES_BASE_PATH || "";
const unbase = (h) =>
  BASE_PATH && h.startsWith(BASE_PATH) ? h.slice(BASE_PATH.length) || "/" : h;
const routeSet = new Set(pages.map((p) => p.route));
const fileSet = new Set(files.map((f) => "/" + relative(OUT, f)));
let linkCount = 0;
let fragCount = 0;

for (const p of pages) {
  const html = readFileSync(p.file, "utf8");
  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map((m) => m[1]));
  const hrefs = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map((m) => m[1]);

  for (const href of hrefs) {
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    linkCount++;
    if (href.startsWith("#")) {
      fragCount++;
      const id = href.slice(1);
      if (id && !ids.has(id)) fail("B links", `${p.route} -> ${href} (no matching id on the page)`);
      continue;
    }
    const [rawPath, frag] = href.split("#");
    const path = unbase(rawPath);
    const clean = path.replace(/\/$/, "") || "/";
    if (!routeSet.has(clean) && !fileSet.has(path)) {
      fail("B links", `${p.route} -> ${href} (no exported page or file)`);
    } else if (frag) {
      fragCount++;
      const targetFile = pages.find((x) => x.route === clean)?.file;
      if (targetFile) {
        const tIds = new Set([...readFileSync(targetFile, "utf8").matchAll(/\bid=["']([^"']+)["']/g)].map((m) => m[1]));
        if (!tIds.has(frag)) fail("B links", `${p.route} -> ${href} (no #${frag} on target)`);
      }
    }
  }
}

/* ------------------------------------------------------------- C: per-page SEO */
const titles = new Map();
const descs = new Map();

for (const p of pages) {
  const html = readFileSync(p.file, "utf8");
  const title = (/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html) || [])[1];
  const desc =
    (/<meta\s+name="description"\s+content="([^"]*)"/i.exec(html) || [])[1] ??
    (/<meta\s+content="([^"]*)"\s+name="description"/i.exec(html) || [])[1];
  const canonical = /<link\s+rel="canonical"/i.test(html);
  const h1s = (html.match(/<h1\b/gi) || []).length;
  const isError = p.route === "/_not-found" || p.route === "/404";
  // Next exports the not-found page twice (404.html and _not-found/index.html).
  // They are one page, so they are exempt from the uniqueness checks.

  if (!title) fail("C seo", `${p.route} has no <title>`);
  else {
    if (titles.has(title) && !isError) fail("C seo", `duplicate <title> on ${p.route} and ${titles.get(title)}`);
    if (!isError) titles.set(title, p.route);
  }

  if (!desc) {
    isError ? warn("C seo", `${p.route} has no meta description (error page — acceptable)`) : fail("C seo", `${p.route} has no meta description`);
  } else {
    if (descs.has(desc) && !isError) fail("C seo", `duplicate meta description on ${p.route} and ${descs.get(desc)}`);
    if (!isError) descs.set(desc, p.route);
    if (desc.length > 165) warn("C seo", `${p.route} meta description is ${desc.length} chars (>165 may truncate)`);
  }

  if (h1s !== 1) fail("C seo", `${p.route} has ${h1s} <h1> elements (expected exactly 1)`);
  if (!canonical && !isError) fail("C seo", `${p.route} has no canonical link`);

  // heading order: no level skipped going down
  const levels = [...stripNonText(html).matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      fail("C seo", `${p.route} skips from h${levels[i - 1]} to h${levels[i]}`);
      break;
    }
  }
}

/* --------------------------------------------- D: local assets + basePath */
// next/image does not prefix public/ paths with basePath. When the build
// targets a sub-path deployment, every local reference must carry it or the
// asset 404s in production while passing every local check.
const BASE = BASE_PATH;
let assetCount = 0;
for (const p of pages) {
  const html = readFileSync(p.file, "utf8");
  const refs = [
    ...[...html.matchAll(/<(?:img|script)\b[^>]*\bsrc=["']([^"']+)["']/gi)].map((m) => m[1]),
    ...[...html.matchAll(/<link\b[^>]*\bhref=["']([^"']+)["']/gi)].map((m) => m[1]),
  ];
  for (const r of refs) {
    if (/^(https?:|data:|mailto:)/.test(r)) continue;
    assetCount++;
    const clean = r.split("?")[0];
    if (BASE && !clean.startsWith(BASE + "/")) {
      fail("D assets", `${p.route} references ${r} without the ${BASE} basePath — it will 404 in production`);
      continue;
    }
    const onDisk = BASE ? clean.slice(BASE.length) : clean;
    if (!fileSet.has(onDisk)) fail("D assets", `${p.route} references missing asset ${r}`);
  }
}

/* -------------------------------------------------------------------- report */
console.log("");
console.log(`  pages        ${pages.length}`);
console.log(`  internal links checked  ${linkCount} (${fragCount} fragments)`);
console.log(`  local assets checked    ${assetCount}`);
console.log("");

for (const w of warnings) console.log(`  warn  ${w}`);
if (warnings.length) console.log("");

if (failures.length) {
  console.error(`  FAILED — ${failures.length} problem(s)\n`);
  for (const f of failures) console.error(`  ${f}\n`);
  process.exit(1);
}

console.log("  A inventory  all content.ts items present in the built site");
console.log("  B links      every internal link and fragment resolves");
console.log("  C seo        unique titles + descriptions, one h1, canonical, no heading skips");
console.log("  D assets     every referenced local asset exists");
console.log("\n  PASSED\n");
