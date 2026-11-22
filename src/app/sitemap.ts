import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/seo";
import { projects, services } from "@/data/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/services",
    "/work",
    "/about",
    "/contact",
    ...services.map((service) => `/services/${service.slug}`),
    ...projects.map((project) => `/work/${project.slug}`),
  ];

  return routes.map((route) => ({ url: absoluteUrl(route) }));
}
