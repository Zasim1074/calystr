import type { Metadata } from "next";
import { absoluteUrl, canonicalPath, seoConfig } from "@/config/seo";

type PageMetadata = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
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
  imageAlt = `${seoConfig.siteName} — ${title}`,
  imageWidth = 1200,
  imageHeight = 630,
  type = "website",
  noIndex = false,
}: PageMetadata): Metadata {
  const canonical = canonicalPath(path);
  const canonicalUrl = absoluteUrl(canonical);
  const imageUrl = absoluteUrl(image);
  const robots = noIndex
    ? { index: false, follow: false, noarchive: true }
    : defaultRobots;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots,
    openGraph: {
      type,
      url: canonicalUrl,
      locale: seoConfig.locale,
      siteName: seoConfig.siteName,
      title: `${title} | ${seoConfig.siteName}`,
      description,
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: seoConfig.twitterCard,
      title: `${title} | ${seoConfig.siteName}`,
      description,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
  };
}

export function createRootMetadata(home: Pick<PageMetadata, "title" | "description">): Metadata {
  return {
    ...createPageMetadata({
      ...home,
      path: "/",
    }),
    metadataBase: new URL(seoConfig.siteUrl),
    title: {
      default: seoConfig.defaultTitle,
      template: seoConfig.titleTemplate,
    },
    description: home.description,
    applicationName: seoConfig.siteName,
    authors: [{ name: seoConfig.siteName, url: absoluteUrl("/") }],
    creator: seoConfig.siteName,
    publisher: seoConfig.siteName,
    category: "technology",
    icons: { icon: seoConfig.logoPath },
    formatDetection: { email: false, address: false, telephone: false },
  };
}

export function createNoIndexMetadata(title: string): Metadata {
  return {
    title,
    robots: {
      index: false,
      follow: false,
      noarchive: true,
      googleBot: { index: false, follow: false, noimageindex: true },
    },
  };
}
