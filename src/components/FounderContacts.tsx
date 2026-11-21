import { Mail, MessageCircle, Phone } from "lucide-react";
import type { founders } from "@/data/data";

type Founder = (typeof founders)[number];

export function FounderContacts({ founder, compact = false }: { founder: Founder; compact?: boolean }) {
  return <div className={`founder-contacts ${compact ? "founder-contacts-compact" : ""}`} aria-label={`Contact ${founder.name}`}>
    {founder.email && <a href={`mailto:${founder.email}`} aria-label={`Email ${founder.name}`}><Mail size={15}/><span>{compact ? "Email" : founder.email}</span></a>}
    <a href={`tel:${founder.phone.replace(/\s/g,"")}`} aria-label={`Call ${founder.name}`}><Phone size={15}/><span>{founder.phone}</span></a>
    <a href={`https://wa.me/${founder.whatsapp}`} target="_blank" rel="noreferrer" aria-label={`Message ${founder.name} on WhatsApp`}><MessageCircle size={15}/><span>WhatsApp</span></a>
  </div>;
}
