import { expect, test } from "@playwright/test";

const productionOrigin = "https://calyster.vercel.app";
const publicRoutes = [
  "/",
  "/services",
  "/work",
  "/about",
  "/contact",
  "/services/website-development",
  "/services/custom-software",
  "/services/web-applications",
  "/services/mobile-applications",
  "/services/ai-integration",
  "/services/agentic-ai-automation",
  "/services/api-backend-development",
  "/services/maintenance-deployment",
  "/work/hotel-sanwariya",
  "/work/trackhire",
  "/work/llm-reliability-lab",
];

type JsonLdNode = Record<string, unknown>;

function schemaNodes(value: unknown): JsonLdNode[] {
  if (Array.isArray(value)) return value.flatMap(schemaNodes);
  if (!value || typeof value !== "object") return [];

  const node = value as JsonLdNode;
  const graph = Array.isArray(node["@graph"]) ? node["@graph"].flatMap(schemaNodes) : [];
  return [node, ...graph];
}

function hasSchemaType(node: JsonLdNode, type: string) {
  const value = node["@type"];
  return value === type || (Array.isArray(value) && value.includes(type));
}

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
  await expect(page.getByRole("img", { name: "Hotel Sanwariya website preview" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Visit live website/ })).toHaveAttribute("href", "https://sanwariyahotel.com/");
});

test("founder profiles show portraits and contact links", async ({ page }) => {
  await page.goto("/about");
  const portraits = page.locator(".founder-grid-large .portrait img");
  await expect(portraits).toHaveCount(2);
  await expect(portraits.nth(0)).toHaveAttribute("alt", "Jaseem Quraishi");
  await expect(portraits.nth(1)).toHaveAttribute("alt", "Dhruv Moses Vats");
  await expect(page.getByText("Jaseem Quraishi", { exact: true })).toBeVisible();
  await expect(page.getByText("Dhruv Moses Vats", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Email Jaseem Quraishi" })).toHaveAttribute(
    "href",
    "mailto:jaseem1quraishi@gmail.com",
  );
  await expect(page.getByRole("link", { name: "Email Dhruv Moses Vats" })).toHaveAttribute(
    "href",
    "mailto:dhruvmoses15@gmail.com",
  );
  const jaseemLinkedIn = page.getByRole("link", {
    name: "LinkedIn profile for Jaseem Quraishi",
  });
  await expect(jaseemLinkedIn).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/jaseem-quraishi/",
  );
  await expect(jaseemLinkedIn).toHaveAttribute("target", "_blank");
  await expect(jaseemLinkedIn).toHaveAttribute("rel", "noopener noreferrer");
  await expect(page.getByRole("link", { name: "LinkedIn profile for Dhruv Moses Vats" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/dhruvmoses/",
  );
  await expect(
    page.getByText(/Jaseem leads technical direction from early architecture through production/),
  ).toBeVisible();
  await expect(
    page.getByText(/Dhruv leads business development and client discovery/),
  ).toBeVisible();
});

test("contact form has accessible labels and validates required input", async ({ page }) => {
  await page.goto("/contact");
  const contactBlock = page.locator(".contact-block");
  await expect(contactBlock.getByText("Your direct team")).toHaveCount(0);
  await expect(contactBlock.getByText("Jaseem Quraishi")).toHaveCount(0);
  await expect(contactBlock.getByText("Dhruv Moses Vats")).toHaveCount(0);
  await expect(
    contactBlock.locator(
      'a[href^="mailto:"], a[href^="tel:"], a[href^="https://wa.me/"]',
    ),
  ).toHaveCount(0);
  await expect(page.getByLabel("Name", { exact: true })).toHaveAttribute("required", "");
  await expect(page.getByLabel("Mobile number", { exact: true })).toHaveAttribute("required", "");
  await expect(page.getByLabel("Business name", { exact: true })).not.toHaveAttribute("required");
  await expect(page.getByLabel("Email", { exact: true })).toHaveAttribute("type", "email");
  await expect(page.getByLabel("Email", { exact: true })).not.toHaveAttribute("required");
  await expect(page.locator('input[name="services"]')).toHaveCount(8);
  await expect(page.locator('input[name="services"][required]')).toHaveCount(0);
  await expect(page.getByRole("group", { name: "Services" })).toBeVisible();
  await expect(page.locator('textarea[name="description"]')).not.toHaveAttribute("required");
  await expect(page.getByLabel("Estimated budget")).toHaveCount(0);
  await page.getByRole("button", { name: /Prepare WhatsApp messages/ }).click();
  await expect(page.getByLabel("Name", { exact: true })).toBeFocused();
  await page.getByLabel("Name", { exact: true }).fill("Alex Example");
  await page.getByRole("button", { name: /Prepare WhatsApp messages/ }).click();
  await expect(page.getByLabel("Mobile number", { exact: true })).toBeFocused();
});

test("name and phone alone can prepare a WhatsApp inquiry", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name", { exact: true }).fill("Alex Example");
  await page.getByLabel("Mobile number", { exact: true }).fill("+91 9876543210");
  await page.getByRole("button", { name: "Prepare WhatsApp messages" }).click();

  const href = await page.locator(".whatsapp-actions a").first().getAttribute("href");
  const text = new URL(href ?? "").searchParams.get("text") ?? "";
  expect(text).toContain("Name: Alex Example");
  expect(text).toContain("Phone: +91 9876543210");
  expect(text).not.toContain("Email:");
  expect(text).not.toContain("Service:");
  expect(text).not.toContain("Project description:");
});

test("contact form prepares the same WhatsApp inquiry for both founders", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name", { exact: true }).fill("Alex Example");
  await page.getByLabel("Business name", { exact: true }).fill("Example Co");
  await page.getByLabel("Email", { exact: true }).fill("alex@example.com");
  await page.getByLabel("Mobile number", { exact: true }).fill("+91 9876543210");
  await page.getByRole("checkbox", { name: "Website Development" }).check();
  await page.getByRole("checkbox", { name: "AI Integration" }).check();
  await page.getByLabel("Project description", { exact: true }).fill(
    "We need a responsive website to explain our service and help customers contact us.",
  );
  await page.getByRole("button", { name: "Prepare WhatsApp messages" }).click();

  await expect(page.getByRole("status")).toContainText("press Send in each");
  const links = page.locator(".whatsapp-actions a");
  await expect(links).toHaveCount(2);
  const hrefs = await links.evaluateAll((elements) =>
    elements.map((element) => (element as HTMLAnchorElement).href),
  );
  const jaseemUrl = new URL(hrefs[0]);
  const dhruvUrl = new URL(hrefs[1]);
  expect(jaseemUrl.pathname).toBe("/919555917856");
  expect(dhruvUrl.pathname).toBe("/919555985754");
  expect(jaseemUrl.searchParams.get("text")).toBe(dhruvUrl.searchParams.get("text"));
  expect(jaseemUrl.searchParams.get("text")).toContain("Name: Alex Example");
  expect(jaseemUrl.searchParams.get("text")).toContain(
    "Services: Website Development, AI Integration",
  );
  expect(jaseemUrl.searchParams.get("text")).toContain(
    "We need a responsive website to explain our service and help customers contact us.",
  );
});

test("footer contact links call both founders at their published numbers", async ({ page }) => {
  await page.goto("/about");
  const contacts = page.locator(".footer-contact");
  await expect(
    contacts.getByRole("link", {
      name: "Call Jaseem Quraishi at +91 9555917856",
    }),
  ).toHaveAttribute("href", "tel:+919555917856");
  await expect(
    contacts.getByRole("link", {
      name: "Call Dhruv Moses Vats at +91 9555985754",
    }),
  ).toHaveAttribute("href", "tel:+919555985754");
  await expect(contacts.locator('a[href^="tel:"]')).toHaveCount(2);
});

test("public routes have unique metadata, valid schema, and crawlable links", async ({ page, request }, testInfo) => {
  test.setTimeout(90_000);
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const internalPaths = new Set<string>();

  for (const route of publicRoutes) {
    await page.goto(route);
    const expectedUrl = route === "/" ? productionOrigin : `${productionOrigin}${route}`;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", expectedUrl);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", expectedUrl);
    await expect(page.locator('meta[property="og:title"]')).not.toHaveAttribute("content", "");
    await expect(page.locator('meta[name="twitter:title"]')).not.toHaveAttribute("content", "");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("meta[name='robots']")).not.toHaveAttribute("content", /noindex/);

    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(title.length, `${route} has no title`).toBeGreaterThan(0);
    expect(description?.length, `${route} has no description`).toBeGreaterThan(0);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", description ?? "");
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute("content", description ?? "");
    titles.add(title);
    descriptions.add(description ?? "");

    const imagePath = route === "/work/hotel-sanwariya"
      ? "/projects/hotel-sanwariya.png"
      : "/og-card.png";
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `${productionOrigin}${imagePath}`);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", `${productionOrigin}${imagePath}`);

    const missingAlt = await page.locator("img").evaluateAll((images) =>
      images.filter((image) => !image.hasAttribute("alt")),
    );
    expect(missingAlt, `${route} has images without alt attributes`).toHaveLength(0);

    const schemaTexts = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(schemaTexts.length, `${route} has no JSON-LD`).toBeGreaterThan(0);
    const schemas = schemaTexts.map((text) => JSON.parse(text) as unknown);
    const nodes = schemas.flatMap(schemaNodes);
    const schemaOutput = JSON.stringify(schemas);
    const schemaUrls = schemaOutput.match(/https?:\/\/[^"'\\\s]+/g) ?? [];
    expect(schemaUrls.every((url) =>
      url === "https://schema.org" || new URL(url).origin === productionOrigin,
    )).toBe(true);
    expect(schemaOutput).not.toContain("ProfessionalService");
    expect(schemaOutput).not.toContain("Worldwide");
    expect(schemaOutput).not.toContain("jaseem1quraishi@gmail.com");
    expect(schemaOutput).not.toContain("dhruvmoses15@gmail.com");

    const organization = nodes.find((node) => hasSchemaType(node, "Organization"));
    expect(organization?.url).toBe(`${productionOrigin}/`);
    expect(organization).not.toHaveProperty("email");
    expect(organization).not.toHaveProperty("telephone");
    expect(organization).not.toHaveProperty("address");
    const servedRegions = organization?.areaServed;
    expect(servedRegions).toEqual([{ "@type": "Country", name: "India" }]);
    const websiteCount = nodes.filter((node) => hasSchemaType(node, "WebSite")).length;
    expect(websiteCount).toBe(route === "/" ? 1 : 0);

    if (route.startsWith("/services/")) {
      const service = nodes.find((node) => hasSchemaType(node, "Service"));
      expect(service).toBeDefined();
      expect(service?.serviceOutput).toMatchObject({ "@type": "Thing" });
      expect(service?.provider).toMatchObject({ "@id": `${productionOrigin}/#organization` });
      expect(nodes.some((node) => hasSchemaType(node, "BreadcrumbList"))).toBe(true);
    }

    if (route.startsWith("/work/")) {
      const project = nodes.find((node) => hasSchemaType(node, "CreativeWork"));
      expect(project).toBeDefined();
      expect(project).not.toHaveProperty("sameAs");
      expect(nodes.some((node) => hasSchemaType(node, "BreadcrumbList"))).toBe(true);
    }

    const internalHrefs = await page.locator("a[href]").evaluateAll((anchors) =>
      anchors
        .map((anchor) => anchor.getAttribute("href"))
        .filter((href): href is string => href !== null),
    );
    for (const href of new Set(internalHrefs)) {
      const target = new URL(href, page.url());
      if (target.origin !== new URL(page.url()).origin) continue;
      internalPaths.add(`${target.pathname}${target.search}`);
    }
  }

  if (testInfo.project.name === "desktop-chromium") {
    await Promise.all([...internalPaths].map(async (path) => {
      const response = await request.get(path);
      expect(response.status(), `Broken internal link ${path}`).toBeLessThan(400);
    }));
  }

  expect(titles.size).toBe(publicRoutes.length);
  expect(descriptions.size).toBe(publicRoutes.length);

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  const sitemap = await sitemapResponse.text();
  const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(sitemapUrls.sort()).toEqual(publicRoutes.map((route) => `${productionOrigin}${route}`).sort());
  expect(sitemap).not.toContain("localhost");

  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.ok()).toBe(true);
  expect(await robotsResponse.text()).toContain(`Sitemap: ${productionOrigin}/sitemap.xml`);
  expect(await robotsResponse.text()).toContain("Disallow: /api/");
  expect((await request.get("/og-card.png")).ok()).toBe(true);
  const missingRoute = await page.goto("/route-that-does-not-exist");
  expect(missingRoute?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("doesn’t exist");
  const missingRouteRobots = await page.locator('meta[name="robots"]').evaluateAll((tags) =>
    tags.map((tag) => tag.getAttribute("content") ?? ""),
  );
  expect(missingRouteRobots.length).toBeGreaterThan(0);
  expect(missingRouteRobots.every((content) => content.includes("noindex"))).toBe(true);
});
