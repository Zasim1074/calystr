import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { services } from "@/data/data";
import { pageSeo } from "@/config/seo-content";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({ ...pageSeo.services, path: "/services" });

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Engineering capability, focused on business outcomes."
        copy="From a high-performing website to a custom operating system, we design the experience and engineer the system behind it."
        breadcrumbs={breadcrumbs}
      />
      <section className="section services-catalog">
        <Container>
          <div className="catalog-intro">
            <span className="eyebrow">Eight connected capabilities</span>
            <p>Engage us for one focused requirement or for the full path from product definition to deployment and ongoing care.</p>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <article className={`service-card service-card-${(index % 4) + 1}`} key={service.slug}>
                <div className="service-card-head">
                  <span>0{index + 1}</span>
                  <Link href={`/services/${service.slug}`} aria-label={`Explore ${service.title}`}>
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
                <h2>{service.title}</h2>
                <p>{service.summary}</p>
                <div className="service-commercial">
                  <div><b>Problem</b><span>{service.problems[0]}</span></div>
                  <div><b>Value</b><span>{service.value}</span></div>
                  <div><b>Includes</b><span>{service.deliverables.slice(0, 2).join(" · ")}</span></div>
                </div>
                <div className="chips">
                  {service.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                <ButtonLink href={`/services/${service.slug}`} variant="ghost">Explore this service</ButtonLink>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <ContactBlock />
      <JsonLd
        data={[
          webPageSchema({
            type: "CollectionPage",
            path: "/services",
            name: pageSeo.services.title,
            description: pageSeo.services.description,
          }),
          breadcrumbSchema(breadcrumbs),
        ]}
      />
    </>
  );
}
