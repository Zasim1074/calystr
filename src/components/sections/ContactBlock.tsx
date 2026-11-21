import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/ui/Container";
import { inquiry, site } from "@/data/data";
import { founders } from "@/data/data";
import { FounderContacts } from "@/components/FounderContacts";

export function ContactBlock(){return <section className="contact-block"><Container className="contact-grid"><div><span className="eyebrow">Start a conversation</span><h2>{inquiry.heading}</h2><p>{inquiry.description}</p>{site.email&&<a className="email-link" href={`mailto:${site.email}`}>{site.email}</a>}<div className="direct-contacts">{founders.map(founder=><article key={founder.id}><strong>{founder.name}</strong><span>{founder.role}</span><FounderContacts founder={founder}/></article>)}</div></div><ContactForm/></Container></section>}
