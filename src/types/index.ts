export type ServiceSlug =
  | "website-development"
  | "custom-software"
  | "web-applications"
  | "mobile-applications"
  | "ai-integration"
  | "agentic-ai-automation"
  | "api-backend-development"
  | "maintenance-deployment";

export type ProjectSlug = "hotel-sanwariya" | "trackhire" | "llm-reliability-lab";

export type ServiceFaq = { question: string; answer: string };

export type Service = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  summary: string;
  audience: string;
  value: string;
  problems: string[];
  deliverables: string[];
  technologies: string[];
  deliverySteps: string[];
  relatedProjectSlugs: ProjectSlug[];
  faqs: ServiceFaq[];
};

export type Project = {
  slug: ProjectSlug;
  title: string;
  type: string;
  status: "Client project" | "Independent project" | "Concept study";
  summary: string;
  problem: string;
  challenge: string;
  solution: string;
  architecture: string;
  features: string[];
  implementation: string[];
  technologies: string[];
  theme: "gold" | "ember" | "cyan";
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  liveUrl?: string;
};
