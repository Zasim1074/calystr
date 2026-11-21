import type { Project, Service } from "@/types";

export const site = {
  name: "CALYSTR",
  displayName: "Calystr Studio",
  pronunciation: "Cal-iss-tr",
  legalName: "Calystr Studio",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  email: "",
  phone: "+91 9555917856",
  location: { city: "Delhi", region: "Delhi", country: "India" },
  description: "A two-person technology studio building websites, applications and reliable AI-powered business systems.",
  tagline: "Engineering beyond expectations.",
  social: { linkedin: "", github: "" },
};

export const brand = {
  concept: "Sharp, modern and technical—built to feel like a premium software engineering company.",
  logo: { symbol: "Geometric C", wordmark: "CALYSTR", clearSpace: "One symbol width" },
  colorRatio: { signalRed: 60, electricBlue: 30, warmWhite: 10 },
  colors: {
    warmWhite: "#F2F0EA",
    electricBlue: "#315CFF",
    signalRed: "#F04432",
    midnight: "#07080B",
    surface: "#0E1118",
  },
} as const;

export const navigation = [
  { label: "Services", href: "/services" }, { label: "Work", href: "/work" },
  { label: "About", href: "/about" }, { label: "Contact", href: "/contact" },
];

export const hero = {
  eyebrow: "Calystr Studio · Delhi, India",
  heading: "Engineering beyond expectations.",
  description: "We design and build high-performance websites, custom applications and AI-powered systems—with senior ownership from first decision to production.",
  primaryCta: "Discuss your project", secondaryCta: "Explore our work",
};

export const services: Service[] = [
  { slug:"website-development", title:"Website Development", shortTitle:"Websites", summary:"Fast, distinctive marketing websites built to clarify your offer and turn attention into qualified conversations.", audience:"Businesses whose current website no longer reflects the quality of their work.", value:"A credible, fast digital presence designed to create trust and support measurable demand.", problems:["Unclear positioning and weak conversion paths","Slow, inaccessible or difficult-to-manage websites","A visual presence that undermines trust"], deliverables:["Content and information architecture","Responsive interface design and development","Technical SEO, analytics and production deployment"], technologies:["Next.js","React","TypeScript","CMS"] },
  { slug:"custom-software", title:"Custom Software Development", shortTitle:"Custom software", summary:"Purpose-built business software for operations that cannot be solved well by a generic subscription tool.", audience:"Growing teams whose processes have become constrained by spreadsheets, manual handoffs or inflexible software.", value:"A maintainable system shaped around your operation, reducing repetitive work and giving the business greater control.", problems:["Core workflows split across disconnected tools","Important operational knowledge living in spreadsheets","Off-the-shelf software forcing inefficient processes"], deliverables:["Workflow discovery and product specification","System architecture and interface design","Full-stack implementation, testing and deployment"], technologies:["Next.js","FastAPI","PostgreSQL","Docker"] },
  { slug:"web-applications", title:"Web Application Development", shortTitle:"Web applications", summary:"Dashboards, portals and customer-facing products shaped around the way people actually work.", audience:"Teams launching a digital product or modernizing an important browser-based workflow.", value:"A responsive, secure product foundation that can evolve as users and business requirements change.", problems:["Manual workflows and repeated data entry","Disconnected systems and limited visibility","Products that cannot adapt to the business"], deliverables:["Product discovery and technical architecture","Accessible, responsive product interfaces","Secure backend, testing and deployment"], technologies:["React","Next.js","FastAPI","PostgreSQL"] },
  { slug:"mobile-applications", title:"Mobile Application Development", shortTitle:"Mobile apps", summary:"Focused iOS and Android experiences built for reliability in real-world use.", audience:"Businesses that need customer or operational workflows available on mobile.", value:"One coherent cross-platform experience with a codebase designed for efficient iteration and support.", problems:["Fragmented cross-device journeys","Field workflows tied to a desktop","Duplicate native development effort"], deliverables:["Product flows and interface system","Cross-platform application development","API integration, testing and release support"], technologies:["Flutter","REST APIs","PostgreSQL","Docker"] },
  { slug:"ai-integration", title:"AI Integration", shortTitle:"AI integration", summary:"Useful AI capabilities integrated with the systems, data and guardrails your team already depends on.", audience:"Teams with a defined workflow where language models can improve speed or decision support.", value:"Practical intelligence embedded into real work, with evaluation and human control designed in from the start.", problems:["Unstructured information at operational scale","Slow knowledge discovery and repetitive drafting","AI prototypes that fail outside a demo"], deliverables:["Use-case validation and solution architecture","LLM, RAG and tool integration","Evaluation, observability and human review"], technologies:["Python","LLMs","RAG","Evaluations"] },
  { slug:"agentic-ai-automation", title:"Agentic AI & Business Automation", shortTitle:"Agentic automation", summary:"Supervised agents and connected workflows that handle multi-step work without hiding control from people.", audience:"Operations teams spending valuable time moving information between tools and queues.", value:"Faster operational throughput with explicit approvals, monitoring and recovery paths where risk matters.", problems:["Repetitive multi-step coordination","Slow handoffs and overloaded operational queues","Automation with poor visibility or control"], deliverables:["Workflow and risk mapping","Agent tools, approvals and integrations","Monitoring, fallback paths and documentation"], technologies:["Python","Agents","APIs","Automation"] },
  { slug:"api-backend-development", title:"Backend & API Engineering", shortTitle:"Backend systems", summary:"Dependable APIs and data systems that give customer-facing products a strong technical core.", audience:"Product teams modernizing brittle services or building a new platform foundation.", value:"A stable technical core that makes integrations, new product channels and future development safer.", problems:["Unreliable integrations and slow endpoints","Inconsistent data and unclear service boundaries","Scaling and deployment constraints"], deliverables:["API and data model design","Authentication, testing and documentation","Containerized deployment and monitoring"], technologies:["FastAPI","PostgreSQL","REST","Docker"] },
  { slug:"maintenance-deployment", title:"Maintenance & Deployment", shortTitle:"Care & deployment", summary:"Ongoing technical care for software that the business cannot afford to neglect.", audience:"Teams that need dependable releases and accountable technical ownership after launch.", value:"Continuity after launch, fewer release surprises and a technical partner who already understands the system.", problems:["Risky releases and neglected dependencies","Unclear ownership when incidents happen","Performance and reliability drift"], deliverables:["Deployment pipeline and environment review","Updates, monitoring and issue response","Planned performance and security improvements"], technologies:["CI/CD","Docker","Monitoring","Cloud"] },
];

export const businessValues = [
  { title:"Direct senior ownership", description:"The founders stay close to discovery, technical decisions, delivery and communication. Context does not disappear into account-management layers." },
  { title:"Business before technology", description:"We begin with the operational or commercial outcome, then choose the smallest credible technical approach that can deliver it." },
  { title:"Engineered for change", description:"Clear architecture, typed interfaces and documented decisions make the product easier to extend after the first release." },
  { title:"Honest delivery", description:"Trade-offs, risks and progress stay visible. We do not manufacture certainty, metrics or theatre where evidence is still developing." },
];

export const industries = [
  { name:"Hospitality", need:"Booking journeys, operational tools and high-trust digital experiences." },
  { name:"Recruitment", need:"Candidate workflows, hiring operations and structured decision support." },
  { name:"Professional services", need:"Lead generation, client portals and internal delivery systems." },
  { name:"AI-enabled operations", need:"Knowledge systems, evaluation workflows and supervised automation." },
];

export const projects: Project[] = [
  { slug:"trackhire", title:"TrackHire", type:"Full-stack product", status:"Independent project", summary:"A focused workspace for organizing job applications and recruitment activity.", problem:"Job search and hiring activity becomes difficult to follow across inboxes, notes and disconnected tools.", challenge:"Create a useful workflow without turning a simple tracking need into a heavy enterprise system.", solution:"A structured product experience that brings roles, applications, stages and next actions into one legible workspace.", implementation:["Responsive workflow views for desktop and mobile","Typed client-to-API contracts","Relational data model designed around application history"], technologies:["React","TypeScript","FastAPI","PostgreSQL"], theme:"ember" },
  { slug:"llm-reliability-lab", title:"LLM Reliability Lab", type:"AI engineering", status:"Concept study", summary:"An evaluation workspace for understanding how AI applications behave before release.", problem:"Language-model outputs can look convincing while failing silently on the cases that matter.", challenge:"Make evaluation evidence readable for both engineering and product decisions.", solution:"A technical environment for organizing test cases, comparing runs and making reliability work visible.", implementation:["Reusable evaluation suites and test cases","Response comparison and pass/fail evidence","Run-level quality signals and failure inspection"], technologies:["Python","LLMs","Evaluations","APIs"], theme:"cyan" },
];

export const founders = [
  { id:"jaseem", initials:"JQ", name:"Jaseem Quraishi", role:"Co-Founder & Technical Lead", email:"jaseem1quraishi@gmail.com", phone:"+91 9555917856", whatsapp:"919555917856", description:"Leads architecture, frontend and backend engineering, AI integration, technical quality and deployment." },
  { id:"dhruv", initials:"DMV", name:"Dhruv Moses Vats", role:"Co-Founder & Business Development Lead", email:"dhruvmoses15@gmail.com", phone:"+91 9555985754", whatsapp:"919555985754", description:"Leads business development, discovery, client communication, requirements gathering and coordination." },
] as const;

export const processSteps = [
  ["Discover","Understand the business, users, constraints and why this matters now."],
  ["Define","Turn the opportunity into scope, priorities and a shared definition of done."],
  ["Design","Shape the experience and technical direction before expensive decisions harden."],
  ["Build","Deliver in focused increments with visible progress and direct feedback."],
  ["Validate","Test behavior, accessibility, performance and the edge cases that carry risk."],
  ["Launch & support","Release carefully, document the system and stay available after launch."],
];

export const faqs = [
  { question:"What kinds of projects are a good fit?", answer:"Projects where software has a clear business job: generating demand, improving an operation, launching a product or adding a well-defined AI capability." },
  { question:"Who will we work with?", answer:"Directly with the two founders. Technical decisions stay with Jaseem; discovery, communication and coordination stay with Dhruv." },
  { question:"Can you work with an existing product?", answer:"Yes. We can audit an existing codebase, stabilize it and improve it incrementally when a full rebuild is not justified." },
  { question:"How do engagements begin?", answer:"With a focused conversation about the business problem, users, current systems, constraints and desired outcome. We then recommend a practical next step." },
];

export const inquiry = {
  budgets:["₹50k – ₹1.5L","₹1.5L – ₹4L","₹4L – ₹10L","₹10L+","Let’s discuss"],
  heading:"Let’s build the right thing, properly.",
  description:"Tell us what needs to change. We’ll respond with candid questions and a practical next step.",
};
