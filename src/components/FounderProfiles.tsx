import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
import jaseemPortrait from "../../assets/jaseem.png";
import dhruvPortrait from "../../assets/dhruv.png";
import { founders } from "@/data/data";

const founderPortraits = {
  jaseem: jaseemPortrait,
  dhruv: dhruvPortrait,
};

export function FounderProfiles({ large = false }: { large?: boolean }) {
  const Heading = large ? "h2" : "h3";

  return (
    <div className={`founder-grid ${large ? "founder-grid-large" : ""}`}>
      {founders.map((founder, index) => (
        <article key={founder.id}>
          <div className={`portrait portrait-photo portrait-${index}`}>
            <Image
              src={founderPortraits[founder.id]}
              alt={founder.name}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 28vw"
              className="portrait-image"
            />
          </div>
          <Heading>{founder.name}</Heading>
          <b>{founder.role}</b>
          <p>{founder.description}</p>
          <div className="founder-profile-links">
            <a
              className="founder-profile-email"
              href={`mailto:${founder.email}`}
              aria-label={`Email ${founder.name}`}
            >
              <Mail size={15} aria-hidden="true" />
              <span>{founder.email}</span>
            </a>
            <a
              className="founder-profile-linkedin"
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn profile for ${founder.name}`}
            >
              <Linkedin size={15} aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
