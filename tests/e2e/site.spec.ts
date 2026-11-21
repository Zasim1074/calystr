import { expect, test } from "@playwright/test";

test("home page exposes its primary content and navigation", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  await page.goto("/");
  await expect(page).toHaveTitle(/CALYSTR/i);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Engineering beyond expectations");
  await expect(page.getByRole("link", { name: "Discuss your project" })).toBeVisible();
  await expect(page.locator("main")).toHaveAttribute("id", "main");
  expect(consoleErrors).toEqual([]);
});

test("header logo returns to the top of the homepage", async ({ page }) => {
  const logo = page.getByRole("banner").getByRole("link", { name: "Calystr Studio home" });
  await page.goto("/contact");
  await logo.click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Engineering beyond expectations");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);

  await page.goto("/#work");
  await logo.click();
  await expect(page).toHaveURL("/");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("desktop fixed navigation scrolls to homepage sections without changing routes", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Desktop navigation only");
  await page.goto("/");
  const header = page.locator(".site-header");
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
  const headerTop = await header.evaluate((element) => element.getBoundingClientRect().top);
  expect(headerTop).toBe(0);
});

test("primary routes render headings without horizontal overflow", async ({ page }) => {
  for (const route of ["/services", "/work", "/about", "/contact"]) {
    await page.goto(route);
    await expect(page.locator("h1, h2").first()).toBeVisible();
    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(hasOverflow, `${route} should not overflow horizontally`).toBe(false);
  }
});

test("compact navigation opens with an opaque panel and scrolls to a section", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "desktop-chromium", "Compact navigation only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(navigation).toBeVisible();
  await expect(navigation).toHaveCSS("background-color", "rgb(3, 4, 7)");
  await navigation.getByRole("link", { name: /Services/ }).click();
  await expect(page).toHaveURL(/\/#services$/);
  await expect(page.locator("#services")).toBeInViewport();
  expect(await page.locator(".site-header").evaluate((element) => element.getBoundingClientRect().top)).toBe(0);
});

test("Hotel Sanwariya appears in work and has a case-study route", async ({ page }) => {
  await page.goto("/#work");
  await expect(page.getByRole("heading", { name: "Hotel Sanwariya" })).toBeVisible();
  await page.getByRole("link", { name: "Read the case study" }).first().click();
  await expect(page).toHaveURL(/\/work\/hotel-sanwariya$/);
  await expect(page.getByRole("heading", { level: 1, name: "Hotel Sanwariya" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Hotel Sanwariya landing page" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Visit live website/ })).toHaveAttribute("href", "https://sanwariyahotel.com/");
});

test("contact form has accessible labels and validates required input", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByLabel("Name", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Email", { exact: true })).toHaveAttribute("type", "email");
  await page.getByRole("button", { name: /Send inquiry/ }).click();
  await expect(page.getByLabel("Name", { exact: true })).toBeFocused();
});

test("WhatsApp contact links include a prefilled project inquiry", async ({ page }) => {
  await page.goto("/about");
  const link = page.locator(".founder-grid-large article").filter({ hasText: "Jaseem Quraishi" }).getByRole("link", { name: "Message Jaseem Quraishi on WhatsApp" });
  const href = await link.getAttribute("href");
  expect(href).not.toBeNull();
  const url = new URL(href ?? "");
  expect(url.hostname).toBe("wa.me");
  expect(url.pathname).toBe("/919555917856");
  expect(url.searchParams.get("text")).toBe("Hi, I came across your profile and I'm looking for freelance services. Could we discuss a project?");
});

test("email contact links include a personalized project inquiry", async ({ page }) => {
  await page.goto("/about");
  const link = page.locator(".founder-grid-large article").filter({ hasText: "Jaseem Quraishi" }).getByRole("link", { name: "Email Jaseem Quraishi" });
  const href = await link.getAttribute("href");
  expect(href).not.toBeNull();
  const url = new URL(href ?? "");
  expect(url.protocol).toBe("mailto:");
  expect(url.pathname).toBe("jaseem1quraishi@gmail.com");
  expect(url.searchParams.get("subject")).toBe("Freelance project inquiry for Jaseem Quraishi");
  expect(url.searchParams.get("body")).toBe("Hi Jaseem Quraishi,\n\nI came across your profile and am looking for freelance services. I'd like to discuss a project with you. Could you share a good time to connect?\n\nThanks");
});

test("metadata, crawl files, and unknown routes are available", async ({ page, request }) => {
  await page.goto("/services");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/services$/);
  expect((await request.get("/sitemap.xml")).ok()).toBe(true);
  expect((await request.get("/robots.txt")).ok()).toBe(true);
  expect((await request.get("/og-card.svg")).ok()).toBe(true);
  await page.goto("/route-that-does-not-exist");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("doesn’t exist");
});
