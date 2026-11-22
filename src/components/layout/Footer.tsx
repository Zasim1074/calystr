import Link from "next/link";
import { founders, navigation, services, site } from "@/data/data";
import { Container } from "@/components/ui/Container";
import { seoConfig } from "@/config/seo";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer>
      <Container className="footer-grid">
        <div className="footer-lead">
          <Logo />
          <p>{site.tagline}</p>
        </div>
        <div>
          <span className="footer-label">Navigate</span>
          {navigation.map((item) => (
            <Link key={item.href} href={`/${item.href}`}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <span className="footer-label">Capabilities</span>
          {services.slice(0, 4).map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              {service.shortTitle}
            </Link>
          ))}
        </div>
        <div className="footer-contact">
          <span className="footer-label">Contact</span>
          {founders.map((founder) => (
            <a
              key={founder.id}
              href={`tel:${founder.phone.replace(/\s/g, "")}`}
              aria-label={`Call ${founder.name} at ${founder.phone}`}
            >
              {founder.phone}
            </a>
          ))}
          {seoConfig.publicContact.email && (
            <a href={`mailto:${seoConfig.publicContact.email}`}>
              {seoConfig.publicContact.email}
            </a>
          )}
          <p>
            {site.location.city}, {site.location.country}
          </p>
        </div>
        <small>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </small>
      </Container>
    </footer>
  );
}
