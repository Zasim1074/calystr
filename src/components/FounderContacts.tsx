import { Mail, MessageCircle, Phone } from "lucide-react";
import type { founders } from "@/data/data";

type Founder = (typeof founders)[number];

const whatsappMessage = "Hi, I came across your profile and I'm looking for freelance services. Could we discuss a project?";
const emailSubject = (founder: Founder) => `Freelance project inquiry for ${founder.name}`;
const emailBody = (founder: Founder) => `Hi ${founder.name},\n\nI came across your profile and am looking for freelance services. I'd like to discuss a project with you. Could you share a good time to connect?\n\nThanks`;

export function FounderContacts({ founder, compact = false }: { founder: Founder; compact?: boolean }) {
  const emailHref = `mailto:${founder.email}?${new URLSearchParams({ subject: emailSubject(founder), body: emailBody(founder) })}`;

  return <div className={`founder-contacts ${compact ? "founder-contacts-compact" : ""}`} aria-label={`Contact ${founder.name}`}>
    {founder.email && <a href={emailHref} aria-label={`Email ${founder.name}`}><Mail size={15}/><span>{compact ? "Email" : founder.email}</span></a>}
    <a href={`tel:${founder.phone.replace(/\s/g,"")}`} aria-label={`Call ${founder.name}`}><Phone size={15}/><span>{founder.phone}</span></a>
    <a href={`https://wa.me/${founder.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noreferrer" aria-label={`Message ${founder.name} on WhatsApp`}><MessageCircle size={15}/><span>WhatsApp</span></a>
  </div>;
}
