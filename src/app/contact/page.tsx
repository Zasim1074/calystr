import { PageHero } from "@/components/ui/PageHero";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageSeo } from "@/config/seo-content";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({ ...pageSeo.contact, path: "/contact" });

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <div className="contact-page">
      <PageHero
        eyebrow="Contact"
        title="Start a practical project conversation."
        copy="Share the business problem, current constraints and the change you want to make. We will respond with questions and a useful next step."
        breadcrumbs={breadcrumbs}
      />
      <ContactBlock />
      <JsonLd
        data={[
          webPageSchema({
            type: "ContactPage",
            path: "/contact",
            name: pageSeo.contact.title,
            description: pageSeo.contact.description,
          }),
          breadcrumbSchema(breadcrumbs),
        ]}
      />
    </div>
  );
}
