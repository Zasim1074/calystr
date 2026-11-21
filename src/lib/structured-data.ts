import { absoluteUrl, seoConfig } from "@/config/seo";
import { founders, services } from "@/data/data";

export type BreadcrumbItem = { name: string; path: string };
const ids = {
  organization: absoluteUrl("/#organization"),
  website: absoluteUrl("/#website"),
};

export function globalSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ids.organization,
        name: seoConfig.siteName,
        legalName: seoConfig.legalName,
        url: absoluteUrl("/"),
        logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.svg") },
        image: absoluteUrl(seoConfig.defaultOgImage),
        description: seoConfig.organization.description,
        telephone: seoConfig.organization.telephone,
        address: {
          "@type": "PostalAddress",
          addressLocality: seoConfig.organization.location.city,
          addressRegion: seoConfig.organization.location.region,
          addressCountry: seoConfig.organization.location.country,
        },
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "Place", name: "Worldwide" },
        ],
        knowsAbout: services.map((service) => service.title),
      },
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: absoluteUrl("/"),
        name: seoConfig.siteName,
        description: seoConfig.defaultDescription,
        inLanguage: seoConfig.language,
        publisher: { "@id": ids.organization },
      },
    ],
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
}: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": absoluteUrl(`${path}#webpage`),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: seoConfig.language,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.organization },
    provider: { "@id": ids.organization },
  };
}

export function aboutPageSchema(
  path: string,
  name: string,
  description: string,
) {
  return {
    ...webPageSchema({ type: "AboutPage", path, name, description }),
    mainEntity: { "@id": ids.organization },
    mentions: founders.map((founder) => ({
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
      email: founder.email,
      telephone: founder.phone,
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
    provider: { "@id": ids.organization },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    audience: { "@type": "Audience", audienceType: service.audience },
    serviceOutput: service.value,
  };
}

export function projectSchema(project: {
  slug: string;
  title: string;
  summary: string;
  type: string;
  image?: string;
  liveUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": absoluteUrl(`/work/${project.slug}#project`),
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/work/${project.slug}`),
    image: project.image ? absoluteUrl(project.image) : undefined,
    sameAs: project.liveUrl,
    genre: project.type,
    creator: { "@id": ids.organization },
  };
}
