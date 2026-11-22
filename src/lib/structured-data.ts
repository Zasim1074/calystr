import { absoluteUrl, seoConfig } from "@/config/seo";
import { founders, services } from "@/data/data";

type SchemaReference = { "@id": string };
export type BreadcrumbItem = { name: string; path: string };
const ids = {
  organization: absoluteUrl("/#organization"),
  website: absoluteUrl("/#website"),
};

export function globalSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ids.organization,
    name: seoConfig.siteName,
    legalName: seoConfig.legalName,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      "@id": absoluteUrl(`${seoConfig.logoPath}#logo`),
      url: absoluteUrl(seoConfig.logoPath),
      contentUrl: absoluteUrl(seoConfig.logoPath),
      width: 512,
      height: 512,
    },
    image: absoluteUrl(seoConfig.defaultOgImage),
    description: seoConfig.organization.description,
    areaServed: seoConfig.serviceAreas.map((name) => ({ "@type": "Country", name })),
    knowsAbout: services.map((service) => service.title),
    ...(seoConfig.publicContact.email ? { email: seoConfig.publicContact.email } : {}),
    ...(seoConfig.publicContact.telephone ? { telephone: seoConfig.publicContact.telephone } : {}),
    ...(seoConfig.socialProfiles.length ? { sameAs: seoConfig.socialProfiles } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ids.website,
    url: absoluteUrl("/"),
    name: seoConfig.siteName,
    description: seoConfig.defaultDescription,
    inLanguage: seoConfig.language,
    publisher: { "@id": ids.organization },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": absoluteUrl(`${items[items.length - 1]?.path ?? "/"}#breadcrumb`),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageSchema({
  type = "WebPage",
  path,
  name,
  description,
  mainEntity,
  about,
}: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  path: string;
  name: string;
  description: string;
  mainEntity?: SchemaReference;
  about?: SchemaReference;
}) {
  const canonicalUrl = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": absoluteUrl(`${path}#webpage`),
    url: canonicalUrl,
    name,
    description,
    inLanguage: seoConfig.language,
    isPartOf: { "@id": ids.website },
    publisher: { "@id": ids.organization },
    ...(mainEntity ? { mainEntity } : {}),
    ...(about ? { about } : {}),
  };
}

export function aboutPageSchema(
  path: string,
  name: string,
  description: string,
) {
  return {
    ...webPageSchema({
      type: "AboutPage",
      path,
      name,
      description,
      mainEntity: { "@id": ids.organization },
      about: { "@id": ids.organization },
    }),
    mentions: founders.map((founder) => ({
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
      worksFor: { "@id": ids.organization },
    })),
  };
}

export function serviceSchema(service: {
  slug: string;
  title: string;
  summary: string;
  audience: string;
  value: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name: service.title,
    description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    mainEntityOfPage: { "@id": absoluteUrl(`/services/${service.slug}#webpage`) },
    provider: { "@id": ids.organization },
    areaServed: seoConfig.serviceAreas.map((name) => ({ "@type": "Country", name })),
    audience: { "@type": "Audience", audienceType: service.audience },
    serviceOutput: { "@type": "Thing", name: service.value },
  };
}

export function projectSchema(project: {
  slug: string;
  title: string;
  summary: string;
  type: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": absoluteUrl(`/work/${project.slug}#project`),
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/work/${project.slug}`),
    mainEntityOfPage: { "@id": absoluteUrl(`/work/${project.slug}#webpage`) },
    image: project.image ? absoluteUrl(project.image) : undefined,
    genre: project.type,
    creator: { "@id": ids.organization },
  };
}
