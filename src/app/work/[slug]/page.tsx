import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { absoluteUrl } from "@/config/seo";
import { projects } from "@/data/data";
import { createNoIndexMetadata, createPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, projectSchema, webPageSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return createNoIndexMetadata("Project not found | Calystr Studio");

  return createPageMetadata({
    title: `${project.title} — ${project.type}`,
    description: project.summary,
    path: `/work/${project.slug}`,
    image: project.image,
    imageAlt: project.imageAlt,
    imageWidth: project.imageWidth,
    imageHeight: project.imageHeight,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Selected work", path: "/work" },
    { name: project.title, path: `/work/${project.slug}` },
  ];

  return (
    <>
      <section className="detail-hero project-detail-hero">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          <span className="eyebrow">{project.status} · {project.type}</span>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          {project.liveUrl && (
            <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
              Visit live website <ArrowUpRight aria-hidden="true" size={17}/>
            </a>
          )}
        </Container>
      </section>
      <Container><ProjectVisual project={project} priority={Boolean(project.image)}/></Container>
      <section className="section case-body">
        <Container>
          <article><span className="eyebrow">Business problem</span><h2>{project.problem}</h2></article>
          <div className="case-grid">
            <article><span className="eyebrow">Engineering challenge</span><p>{project.challenge}</p></article>
            <article><span className="eyebrow">Approach</span><p>{project.solution}</p></article>
          </div>
          <article className="case-architecture">
            <span className="eyebrow">Technical architecture</span>
            <p>{project.architecture}</p>
          </article>
          <div className="implementation">
            <span className="eyebrow">Key features</span>
            <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          </div>
          <div className="implementation">
            <span className="eyebrow">Technical implementation</span>
            <ul>{project.implementation.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="chips">{project.technologies.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
          <p className="case-note">No verified commercial or performance figures are published for this project.</p>
        </Container>
      </section>
      <ContactBlock/>
      <JsonLd
        data={[
          projectSchema(project),
          webPageSchema({
            path: `/work/${project.slug}`,
            name: `${project.title} — ${project.type}`,
            description: project.summary,
            mainEntity: { "@id": absoluteUrl(`/work/${project.slug}#project`) },
            about: { "@id": absoluteUrl(`/work/${project.slug}#project`) },
          }),
          breadcrumbSchema(breadcrumbs),
        ]}
      />
    </>
  );
}
