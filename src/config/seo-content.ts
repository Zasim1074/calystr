type SeoEntry = { title: string; description: string };

export const pageSeo = {
  home: {
    title: "Web, Software & AI Development Studio",
    description: "Calystr Studio builds high-performance websites, custom software, mobile applications and dependable AI systems for businesses in India and worldwide.",
  },
  services: {
    title: "Software, Web & AI Development Services",
    description: "Explore website, web application, mobile, backend, custom software and AI development services delivered with direct senior engineering ownership.",
  },
  work: {
    title: "Selected Web, Software & AI Projects",
    description: "Explore Calystr Studio client work, independent products and technical studies across hospitality, recruitment software and reliable AI systems.",
  },
  about: {
    title: "About Our Technology Studio",
    description: "Meet the two-person founding team behind Calystr Studio and learn how we approach product design, software engineering, AI integration and delivery.",
  },
  contact: {
    title: "Discuss Your Software Project",
    description: "Tell Calystr Studio about your website, custom software, mobile application or AI project and receive a practical next step from the founding team.",
  },
} satisfies Record<string, SeoEntry>;

export const serviceSeo = {
  "website-development": {
    title: "Website Development Services",
    description: "Distinctive, accessible and search-ready Next.js websites designed to build trust, explain your offer and turn attention into qualified enquiries.",
  },
  "custom-software": {
    title: "Custom Software Development Services",
    description: "Purpose-built software for businesses constrained by spreadsheets, manual handoffs or inflexible tools, engineered for maintainability and change.",
  },
  "web-applications": {
    title: "Web Application Development Services",
    description: "Responsive portals, dashboards and customer-facing web applications designed around real workflows and built on a dependable technical foundation.",
  },
  "mobile-applications": {
    title: "Mobile App Development Services",
    description: "Focused cross-platform mobile applications for customer and operational workflows, with coherent product design, API integration and release support.",
  },
  "ai-integration": {
    title: "AI Integration Services for Business",
    description: "Integrate LLMs, RAG and evaluated AI capabilities into real business workflows with human oversight, observability and practical safeguards.",
  },
  "agentic-ai-automation": {
    title: "Agentic AI & Business Automation Services",
    description: "Build supervised AI agents and connected automations for multi-step operational work with explicit approvals, monitoring and recovery paths.",
  },
  "api-backend-development": {
    title: "API & Backend Development Services",
    description: "Dependable APIs, data models and backend services built for secure integrations, consistent information and maintainable product growth.",
  },
  "maintenance-deployment": {
    title: "Website Maintenance & Deployment Services",
    description: "Ongoing deployment, dependency, performance and reliability support for business-critical websites and software products after launch.",
  },
} satisfies Record<string, SeoEntry>;
