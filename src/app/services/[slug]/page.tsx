import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { absoluteUrl } from "@/config/seo";
import { serviceSeo } from "@/config/seo-content";
import { projects, services } from "@/data/data";
import { createNoIndexMetadata, createPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema, webPageSchema } from "@/lib/structured-data";

const deliveryStageLabels = ["Understand", "Plan", "Build", "Validate"];

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return createNoIndexMetadata("Service not found | Calystr Studio");

  const seo = serviceSeo[service.slug];
  return createPageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const relatedProjects = projects.filter((project) =>
    service.relatedProjectSlugs.includes(project.slug),
  );
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <section className="detail-hero">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          <span className="eyebrow">Service</span>
          <h1>{service.title}</h1>
          <p>{service.summary}</p>
          <ButtonLink href="/contact">Discuss this service</ButtonLink>
        </Container>
      </section>
      <section className="section detail-body">
        <Container>
          <div>
            <span className="eyebrow">Who it’s for</span>
            <h2>{service.audience}</h2>
          </div>
          <aside className="value-statement">
            <span className="eyebrow">Business value</span>
            <p>{service.value}</p>
          </aside>
          <div className="detail-columns">
            <article>
              <span className="eyebrow">Problems we solve</span>
              <ul>{service.problems.map((problem) => <li key={problem}>{problem}</li>)}</ul>
            </article>
            <article>
              <span className="eyebrow">What you receive</span>
              <ul>{service.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}</ul>
            </article>
          </div>
          <div className="technology-band">
            <span className="eyebrow">Technical capabilities</span>
            <div className="chips">
              {service.technologies.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
            <ButtonLink href="/contact">Start with a requirements call</ButtonLink>
          </div>
        </Container>
      </section>
      <section className="section process-section">
        <Container>
          <div className="section-heading">
            <span className="eyebrow">Delivery approach</span>
            <h2>A considered path from problem to production.</h2>
          </div>
          <ol>
            {service.deliverySteps.map((step, index) => (
              <li key={step}>
                <span>0{index + 1}</span>
                <h3>{deliveryStageLabels[index] ?? "Deliver"}</h3>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="section">
        <Container>
          <div className="section-heading">
            <span className="eyebrow">Project evidence</span>
            <h2>Related work</h2>
            <p>Examples are labeled by their actual status; concept work is not presented as a client result.</p>
          </div>
          {relatedProjects.length > 0 ? (
            <div className="work-grid">
              {relatedProjects.map((project) => (
                <article className="work-card" key={project.slug}>
                  <Link href={`/work/${project.slug}`} aria-label={`Read the ${project.title} project`}>
                    <ProjectVisual project={project} />
                  </Link>
                  <span className="eyebrow">{project.status}</span>
                  <h3><Link href={`/work/${project.slug}`}>{project.title}</Link></h3>
                  <p>{project.summary}</p>
                </article>
              ))}
            </div>
          ) : (
            <p>No directly relevant public case study is published for this capability yet.</p>
          )}
        </Container>
      </section>
      <section className="section faq-section">
        <Container>
          <div className="section-heading">
            <span className="eyebrow">Frequently asked questions</span>
            <h2>Before we begin</h2>
          </div>
          <div className="faq-list">
            {service.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
      <ContactBlock />
      <JsonLd
        data={[
          serviceSchema(service),
          webPageSchema({
            path: `/services/${service.slug}`,
            name: service.title,
            description: service.summary,
            mainEntity: { "@id": absoluteUrl(`/services/${service.slug}#service`) },
            about: { "@id": absoluteUrl(`/services/${service.slug}#service`) },
          }),
          breadcrumbSchema(breadcrumbs),
        ]}
      />
    </>
  );
}
