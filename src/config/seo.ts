const productionSiteUrl = "https://calyster.vercel.app";
const isProductionDeployment = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

export const seoConfig = {
  siteName: "Calystr Studio",
  shortName: "CALYSTR",
  legalName: "Calystr Studio",
  tagline: "Engineering beyond expectations.",
  siteUrl: productionSiteUrl,
  logoPath: "/favicon.svg",
  defaultOgImage: "/og-card.png",
  socialProfiles: [] as string[],
  serviceAreas: ["India"] as const,
  isIndexable: isProductionDeployment,
  language: "en",
  locale: "en_IN",
  titleTemplate: "%s | Calystr Studio",
  defaultTitle: "Calystr Studio | Web, Software & AI Development",
  defaultDescription: "Calystr Studio designs and engineers high-performance websites, custom software, mobile applications and AI-powered business systems for businesses in India.",
  twitterCard: "summary_large_image" as const,
  publicContact: {
    email: null,
    telephone: null,
  },
  organization: {
    description: "A two-person technology studio designing and engineering websites, applications and AI-powered business systems for businesses in India.",
  },
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${seoConfig.siteUrl}/`).toString();
}

export function canonicalPath(path: string) {
  const cleanPath = path.split(/[?#]/, 1)[0] || "/";
  return cleanPath === "/" ? "/" : cleanPath.replace(/\/+$/, "");
}
