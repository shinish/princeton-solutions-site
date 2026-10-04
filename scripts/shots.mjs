import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const BASE = process.env.BASE ?? "http://127.0.0.1:3300";
const OUT = join(homedir(), "Desktop", "princeton-screenshots");
const ROUTES = [
  ["home", "/"], ["about", "/about"], ["services", "/services"], ["faq", "/faq"],
  ["contact", "/contact"], ["privacy", "/privacy"], ["terms", "/terms"],
  ["accessibility", "/accessibility"], ["404", "/no-such-page"],
  ["service-ai-governance", "/services/ai-governance-and-assurance"],
  ["service-it-audit", "/services/it-audit-and-internal-audit-support"],
  ["service-cybersecurity", "/services/cybersecurity-and-information-security-risk"],
  ["service-regulatory", "/services/regulatory-compliance-and-exam-readiness"],
  ["service-sox-soc", "/services/sox-soc-and-certification-audit-support"],
  ["service-third-party", "/services/third-party-and-vendor-risk-management"],
  ["service-grc-automation", "/services/grc-program-design-and-automation"],
  ["service-cloud-governance", "/services/cloud-governance-privacy-and-due-diligence"],
];

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
let n = 0;

for (const [label, size] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport: size, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  for (const [name, route] of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" }).catch(() => {});
    await page.waitForTimeout(350); // let fonts settle
    const file = join(OUT, `${label}-${name}.jpg`);
    await page.screenshot({ path: file, fullPage: true, type: "jpeg", quality: 90 });
    n++;
    process.stdout.write(`  ${label.padEnd(7)} ${route.padEnd(52)} ${file.replace(homedir(), "~")}\n`);
  }
  await ctx.close();
}
await browser.close();
console.log(`\n  ${n} JPGs written to ~/Desktop/princeton-screenshots\n`);
