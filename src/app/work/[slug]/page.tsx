import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { Container } from "@/components/ui/Container";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { projects } from "@/data/data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: project.title, description: project.summary, alternates: { canonical: `/work/${project.slug}` } } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <>
      <section className="detail-hero project-detail-hero">
        <Container>
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
      <Container><ProjectVisual project={project}/></Container>
      <section className="section case-body">
        <Container>
          <article><span className="eyebrow">Business problem</span><h2>{project.problem}</h2></article>
          <div className="case-grid">
            <article><span className="eyebrow">Engineering challenge</span><p>{project.challenge}</p></article>
            <article><span className="eyebrow">Proposed solution</span><p>{project.solution}</p></article>
          </div>
          <div className="implementation">
            <span className="eyebrow">Technical implementation</span>
            <ul>{project.implementation.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="chips">{project.technologies.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </Container>
      </section>
      <ContactBlock/>
    </>
  );
}
