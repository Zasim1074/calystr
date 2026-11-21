import type { Metadata } from "next";
import { absoluteUrl, canonicalPath, seoConfig } from "@/config/seo";

type PageMetadata = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

const defaultRobots: Metadata["robots"] = seoConfig.isIndexable
  ? {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    }
  : {
      index: false,
      follow: false,
      noarchive: true,
      googleBot: { index: false, follow: false, noimageindex: true },
    };

export function createPageMetadata({
  title,
  description,
  path,
  image = seoConfig.defaultOgImage,
  type = "website",
  noIndex = false,
}: PageMetadata): Metadata {
  const canonical = canonicalPath(path);
  const robots = noIndex
    ? { index: false, follow: false, noarchive: true }
    : defaultRobots;
  return {
    title,
    description,
    alternates: { canonical },
    robots,
    openGraph: {
      type,
      url: canonical,
      locale: seoConfig.locale,
      siteName: seoConfig.siteName,
      title: `${title} | ${seoConfig.siteName}`,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${seoConfig.siteName} — ${title}`,
        },
      ],
    },
    twitter: {
      card: seoConfig.twitterCard,
      title: `${title} | ${seoConfig.siteName}`,
      description,
      images: [image],
    },
  };
}

export function createRootMetadata(): Metadata {
  return {
    ...createPageMetadata({
      title: "Web, Software & AI Development Studio",
      description: seoConfig.defaultDescription,
      path: "/",
    }),
    metadataBase: new URL(seoConfig.siteUrl),
    title: {
      default: seoConfig.defaultTitle,
      template: seoConfig.titleTemplate,
    },
    description: seoConfig.defaultDescription,
    applicationName: seoConfig.siteName,
    authors: [{ name: seoConfig.siteName, url: absoluteUrl("/") }],
    creator: seoConfig.siteName,
    publisher: seoConfig.siteName,
    category: "technology",
    icons: { icon: "/favicon.svg" },
    formatDetection: { email: false, address: false, telephone: false },
  };
}

export function createNoIndexMetadata(title: string): Metadata {
  return { title, robots: { index: false, follow: false, noarchive: true } };
}
