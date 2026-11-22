import { seoConfig } from "@/config/seo";
import type { ServiceSlug } from "@/types";

type SeoEntry = { title: string; description: string };

export const pageSeo = {
  home: {
    title: "Web, Software & AI Development Studio",
    description: seoConfig.defaultDescription,
  },
  services: {
    title: "Website, Software & AI Development Services",
    description: "Explore Calystr Studio's website, application, software, mobile, backend and AI engineering services for businesses in India.",
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
} satisfies Record<"home" | "services" | "work" | "about" | "contact", SeoEntry>;

export const serviceSeo = {
  "website-development": {
    title: "Website Development Services",
    description: "Plan and build a fast, accessible business website that explains your offer clearly and gives visitors a straightforward next step.",
  },
  "custom-software": {
    title: "Custom Software Development",
    description: "Replace spreadsheet-heavy or disconnected workflows with maintainable custom software shaped around the way your business operates.",
  },
  "web-applications": {
    title: "Custom Web Application Development",
    description: "Design and build responsive portals, dashboards and customer-facing web applications around real user workflows and business needs.",
  },
  "mobile-applications": {
    title: "Mobile App Development",
    description: "Plan and build focused iOS and Android applications for customer or operational workflows, with API integration and release support.",
  },
  "ai-integration": {
    title: "AI Integration for Business Applications",
    description: "Add language-model and retrieval capabilities to business workflows with evaluation, human oversight and practical operational safeguards.",
  },
  "agentic-ai-automation": {
    title: "Agentic AI & Workflow Automation",
    description: "Automate multi-step operational work with supervised AI agents, explicit approval points, monitoring and recovery paths.",
  },
  "api-backend-development": {
    title: "API & Backend Development",
    description: "Build dependable APIs, integrations and backend services with clear data models, secure access and maintainable interfaces.",
  },
  "maintenance-deployment": {
    title: "Website Maintenance & Deployment",
    description: "Keep business websites and software dependable with planned updates, deployment support, performance checks and technical maintenance.",
  },
} satisfies Record<ServiceSlug, SeoEntry>;
