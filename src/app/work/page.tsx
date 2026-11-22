import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageSeo } from "@/config/seo-content";
import { projects } from "@/data/data";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({ ...pageSeo.work, path: "/work" });

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Selected work", path: "/work" },
];

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Evidence over theatre."
        copy="A growing selection of independent products and technical explorations. We clearly label the nature of every project and never invent business results."
        breadcrumbs={breadcrumbs}
      />
      <section className="section">
        <Container className="work-grid">
          {projects.map((project, index) => (
            <Link className="work-card" href={`/work/${project.slug}`} key={project.slug}>
              <ProjectVisual project={project} priority={index === 0} />
              <span className="eyebrow">{project.status}</span>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
            </Link>
          ))}
        </Container>
      </section>
      <JsonLd
        data={[
          webPageSchema({
            type: "CollectionPage",
            path: "/work",
            name: pageSeo.work.title,
            description: pageSeo.work.description,
          }),
          breadcrumbSchema(breadcrumbs),
        ]}
      />
    </>
  );
}
