import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/ui/Container";
import { inquiry } from "@/data/data";

export function ContactBlock() {
  return (
    <section className="contact-block" id="contact">
      <Container className="contact-grid">
        <div>
          <span className="eyebrow">Start a conversation</span>
          <h2>{inquiry.heading}</h2>
          <p>{inquiry.description}</p>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
