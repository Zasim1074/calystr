import { ContactForm } from "@/components/ContactForm";
import { FounderContacts } from "@/components/FounderContacts";
import { Container } from "@/components/ui/Container";
import { founders, inquiry, site } from "@/data/data";

export function ContactBlock() {
  return (
    <section className="contact-block" id="contact">
      <Container className="contact-grid">
        <div>
          <span className="eyebrow">Start a conversation</span>
          <h2>{inquiry.heading}</h2>
          <p>{inquiry.description}</p>
          {site.email && (
            <a className="email-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          )}
          <div className="direct-contacts">
            {founders.map((founder) => (
              <article key={founder.id}>
                <strong>{founder.name}</strong>
                <span>{founder.role}</span>
                <FounderContacts founder={founder} />
              </article>
            ))}
          </div>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
