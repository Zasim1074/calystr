import type { MetadataRoute } from "next";
import { absoluteUrl, seoConfig } from "@/config/seo";

export default function robots(): MetadataRoute.Robots {
  if (!seoConfig.isIndexable) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
