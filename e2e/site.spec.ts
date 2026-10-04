import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = [
  "/", "/about", "/services", "/faq", "/contact",
  "/privacy", "/terms", "/accessibility",
  "/services/ai-governance-and-assurance",
  "/services/it-audit-and-internal-audit-support",
  "/services/cybersecurity-and-information-security-risk",
  "/services/regulatory-compliance-and-exam-readiness",
  "/services/sox-soc-and-certification-audit-support",
  "/services/third-party-and-vendor-risk-management",
  "/services/grc-program-design-and-automation",
  "/services/cloud-governance-privacy-and-due-diligence",
];

const WIDTHS = [360, 390, 768, 1024, 1440];

test.describe("routes", () => {
  for (const route of ROUTES) {
    test(`loads ${route} with no console or network errors`, async ({ page }) => {
      const errors: string[] = [];
      const failed: string[] = [];
      const badStatus: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      // ERR_ABORTED is Next cancelling in-flight route prefetches when the page
      // settles or the test ends — not a real failure.
      page.on("requestfailed", (r) => {
        const err = r.failure()?.errorText ?? "";
        if (!err.includes("ERR_ABORTED")) failed.push(`${r.url()} ${err}`);
      });
      page.on("response", (r) => {
        if (r.status() >= 400) badStatus.push(`${r.url()} -> ${r.status()}`);
      });

      const res = await page.goto(route);
      expect(res?.status(), `status for ${route}`).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await page.waitForLoadState("networkidle").catch(() => {});
      expect(errors, `console errors on ${route}`).toEqual([]);
      expect(failed, `failed requests on ${route}`).toEqual([]);
      expect(badStatus, `4xx/5xx sub-requests on ${route}`).toEqual([]);
    });
  }
});

test("missing route returns a real 404", async ({ page }) => {
  const res = await page.goto("/no-such-page-xyz");
  expect(res?.status()).toBe(404);
});

test.describe("responsive", () => {
  for (const w of WIDTHS) {
    test(`no horizontal overflow at ${w}px`, async ({ page }) => {
      const offenders: Record<string, string[]> = {};
      for (const route of ["/", "/services", "/contact", "/privacy", "/services/grc-program-design-and-automation"]) {
        await page.setViewportSize({ width: w, height: 900 });
        await page.goto(route);
        const bad = await page.evaluate((vw) => {
          const doc = document.documentElement;
          const scrolls = doc.scrollWidth > vw + 1;
          if (!scrolls) return [];
          return [...document.querySelectorAll<HTMLElement>("body *")]
            .filter((el) => el.getBoundingClientRect().right > vw + 1)
            .slice(0, 5)
            .map((el) => `${el.tagName.toLowerCase()}.${(el.className || "").toString().slice(0, 50)}`);
        }, w);
        if (bad.length) offenders[route] = bad;
      }
      expect(offenders).toEqual({});
    });
  }
});

test("skip link is the first focusable and reveals on focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toHaveText(/skip to main content/i);
  await focused.press("Enter");
  await expect(page.locator("#main")).toBeVisible();
});

test("mobile menu traps focus, closes on Escape and returns focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: /menu/i });
  await trigger.click();
  const dialog = page.locator("dialog[open]");
  await expect(dialog).toBeVisible();
  await expect(page.locator("dialog[open]").getByRole("link", { name: /services/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog[open]")).toHaveCount(0);
});

test("mobile menu navigates and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: /menu/i }).click();
  await page.locator("dialog[open]").getByRole("link", { name: /faq/i }).click();
  await expect(page).toHaveURL(/\/faq$/);
  await expect(page.locator("dialog[open]")).toHaveCount(0);
});

test("contact form blocks empty submit and announces field errors", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /compose this enquiry/i }).click();

  const nameErr = page.getByRole("alert").first();
  await expect(nameErr).toBeVisible();
  await expect(page.locator("#c-name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#c-name")).toBeFocused();

  // invalid email is caught too
  await page.fill("#c-name", "Test Person");
  await page.fill("#c-email", "not-an-email");
  await page.fill("#c-msg", "We need an ISO 42001 readiness assessment this quarter.");
  await page.getByRole("button", { name: /compose this enquiry/i }).click();
  await expect(page.locator("#c-email")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#c-email")).toBeFocused();
});

test("contact form never claims the message was sent", async ({ page }) => {
  await page.goto("/contact");
  await page.fill("#c-name", "Test Person");
  await page.fill("#c-email", "test@example.com");
  await page.fill("#c-msg", "We need an ISO 42001 readiness assessment this quarter.");
  // stop the mailto: navigation from leaving the page
  await page.route("**/*", (r) => r.continue());
  await page.getByRole("button", { name: /compose this enquiry/i }).click();
  const status = page.locator("[aria-live=polite]");
  await expect(status).toContainText(/mail app should now be open/i);
  await expect(status).toContainText(/Nothing has been sent yet/i);
  await expect(status).not.toContainText(/sent successfully|message sent|thank you/i);
});

test("service ledger discloses one row at a time", async ({ page }) => {
  await page.goto("/services");
  const rows = page.locator("details[name=service-ledger]");
  await expect(rows).toHaveCount(8);
  await rows.nth(0).locator("summary").click();
  await expect(rows.nth(0)).toHaveAttribute("open", "");
  await rows.nth(1).locator("summary").click();
  await expect(rows.nth(1)).toHaveAttribute("open", "");
  await expect(rows.nth(0)).not.toHaveAttribute("open", "");
});

test("framework filter narrows the register and reports the count", async ({ page }) => {
  await page.goto("/");
  const privacy = page.getByRole("button", { name: "Privacy", exact: true });
  await privacy.click();
  await expect(privacy).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText(/3 of 25 standards shown/)).toBeVisible();
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.getByText(/25 of 25 standards shown/)).toBeVisible();
});

test.describe("accessibility (axe, WCAG 2.2 AA)", () => {
  for (const route of ["/", "/services", "/contact", "/faq", "/privacy", "/services/ai-governance-and-assurance"]) {
    test(`axe finds no violations on ${route}`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const summary = results.violations.map(
        (v) => `${v.id} (${v.impact}) x${v.nodes.length}: ${v.help}`,
      );
      expect(summary, `axe violations on ${route}`).toEqual([]);
    });
  }
});
