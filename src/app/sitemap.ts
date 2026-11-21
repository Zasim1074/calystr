import type { MetadataRoute } from "next";
import { projects, services, site } from "@/data/data";
export default function sitemap():MetadataRoute.Sitemap{const routes=["","/services","/work","/about","/contact",...services.map(s=>`/services/${s.slug}`),...projects.map(p=>`/work/${p.slug}`)];return routes.map(route=>({url:`${site.url}${route}`,lastModified:new Date(),changeFrequency:route===""?"weekly":"monthly",priority:route===""?1:route.split("/").length>2?.7:.8}))}
