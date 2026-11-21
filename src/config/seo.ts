const rawProductionUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");

function normalizeUrl(value: string) {
  return value.replace(/\/+$/, "");
}

const configuredSiteUrl = rawProductionUrl ? normalizeUrl(rawProductionUrl) : null;
const isProductionDeployment = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

export const seoConfig = {
  siteName: "Calystr Studio",
  shortName: "CALYSTR",
  legalName: "Calystr Studio",
  siteUrl: configuredSiteUrl ?? "http://localhost:3000",
  hasConfiguredProductionUrl: Boolean(configuredSiteUrl),
  isIndexable: Boolean(configuredSiteUrl) && isProductionDeployment,
  language: "en",
  locale: "en_IN",
  titleTemplate: "%s | Calystr Studio",
  defaultTitle: "Calystr Studio | Web, Software & AI Development",
  defaultDescription: "Calystr Studio designs and engineers high-performance websites, custom software, mobile applications and reliable AI-powered business systems.",
  defaultOgImage: "/og-card.svg",
  twitterCard: "summary_large_image" as const,
  organization: {
    description: "A two-person technology studio building websites, applications and reliable AI-powered business systems for organizations in India and worldwide.",
    telephone: "+91 9555917856",
    location: { city: "Delhi", region: "Delhi", country: "IN" },
  },
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${seoConfig.siteUrl}/`).toString();
}

export function canonicalPath(path: string) {
  const cleanPath = path.split(/[?#]/, 1)[0] || "/";
  return cleanPath === "/" ? "/" : cleanPath.replace(/\/+$/, "");
}
