import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { FounderProfiles } from "@/components/FounderProfiles";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageSeo } from "@/config/seo-content";
import { processSteps } from "@/data/data";
import { createPageMetadata } from "@/lib/seo";
import { aboutPageSchema, breadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({ ...pageSeo.about, path: "/about" });

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About the studio", path: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Calystr"
        title="Small by design. Serious about the work."
        copy="A two-person founding team built around direct communication, senior technical ownership and decisions that remain understandable long after launch."
        breadcrumbs={breadcrumbs}
      />
      <section className="section">
        <Container>
          <FounderProfiles large />
        </Container>
      </section>
      <section className="section process-section">
        <Container>
          <div className="section-heading">
            <span className="eyebrow">Principles</span>
            <h2>Clear thinking. Visible trade-offs. Durable software.</h2>
            <p>We ask difficult questions early, keep context close to implementation and choose tools based on the problem—not trend pressure.</p>
          </div>
          <ol>
            {processSteps.map(([title, copy], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <ContactBlock />
      <JsonLd
        data={[
          aboutPageSchema("/about", pageSeo.about.title, pageSeo.about.description),
          breadcrumbSchema(breadcrumbs),
        ]}
      />
    </>
  );
}
