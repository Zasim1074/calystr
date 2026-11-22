import type { Project, Service } from "@/types";
import { seoConfig } from "@/config/seo";

export const site = {
  name: seoConfig.shortName,
  displayName: seoConfig.siteName,
  pronunciation: "Cal-iss-tr",
  legalName: seoConfig.legalName,
  url: seoConfig.siteUrl,
  location: { city: "Delhi", region: "Delhi", country: "India" },
  description: seoConfig.organization.description,
  tagline: seoConfig.tagline,
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
  { label: "Services", href: "#services" }, { label: "Work", href: "#work" },
  { label: "About", href: "#about" }, { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Calystr Studio · Delhi, India",
  heading: "Engineering beyond expectations.",
  description: "We design and build high-performance websites, custom applications and AI-powered systems—with senior ownership from first decision to production.",
  primaryCta: "Discuss your project", secondaryCta: "Explore our work",
};

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    shortTitle: "Websites",
    summary: "Fast, distinctive marketing websites built to clarify your offer and turn attention into qualified conversations.",
    audience: "Businesses whose current website no longer reflects the quality of their work.",
    value: "A credible, fast digital presence designed to create trust and support measurable demand.",
    problems: ["Unclear positioning and weak conversion paths", "Slow, inaccessible or difficult-to-manage websites", "A visual presence that undermines trust"],
    deliverables: ["Content and information architecture", "Responsive interface design and development", "Technical SEO, analytics and production deployment"],
    technologies: ["Next.js", "React", "TypeScript", "CMS"],
    deliverySteps: ["Clarify audience, offer and conversion goals", "Plan page structure and content priorities", "Design and build the responsive site", "Validate accessibility, performance and launch readiness"],
    relatedProjectSlugs: ["hotel-sanwariya"],
    faqs: [
      { question: "Can you improve an existing website instead of replacing it?", answer: "Yes. We can review the current site and recommend focused improvements when they are a better fit than a rebuild." },
      { question: "What do you need before website development begins?", answer: "We start by understanding your audience, offer, content, integrations and the action visitors should take. The scope can then be shaped around what is known and what still needs discovery." },
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software Development",
    shortTitle: "Custom software",
    summary: "Purpose-built business software for operations that cannot be solved well by a generic subscription tool.",
    audience: "Growing teams whose processes have become constrained by spreadsheets, manual handoffs or inflexible software.",
    value: "A maintainable system shaped around your operation, reducing repetitive work and giving the business greater control.",
    problems: ["Core workflows split across disconnected tools", "Important operational knowledge living in spreadsheets", "Off-the-shelf software forcing inefficient processes"],
    deliverables: ["Workflow discovery and product specification", "System architecture and interface design", "Full-stack implementation, testing and deployment"],
    technologies: ["Next.js", "FastAPI", "PostgreSQL", "Docker"],
    deliverySteps: ["Map the workflow, users and constraints", "Define product scope, data and system boundaries", "Build and validate in focused increments", "Prepare deployment and document the system"],
    relatedProjectSlugs: ["trackhire"],
    faqs: [
      { question: "When is custom software worth considering?", answer: "It is worth evaluating when important workflows are held back by disconnected tools or repeated manual work. Discovery should compare a custom build with process changes and integrations before committing." },
      { question: "Do requirements need to be fully documented before a project starts?", answer: "No. We can begin by mapping the current workflow, users and constraints, then turn the findings into a clear scope and delivery plan." },
    ],
  },
  {
    slug: "web-applications",
    title: "Web Application Development",
    shortTitle: "Web applications",
    summary: "Dashboards, portals and customer-facing products shaped around the way people actually work.",
    audience: "Teams launching a digital product or modernizing an important browser-based workflow.",
    value: "A responsive, secure product foundation that can evolve as users and business requirements change.",
    problems: ["Manual workflows and repeated data entry", "Disconnected systems and limited visibility", "Products that cannot adapt to the business"],
    deliverables: ["Product discovery and technical architecture", "Accessible, responsive product interfaces", "Secure backend, testing and deployment"],
    technologies: ["React", "Next.js", "FastAPI", "PostgreSQL"],
    deliverySteps: ["Understand users, workflows and product constraints", "Define the first useful release and technical architecture", "Build the interface, application logic and integrations", "Test core journeys and prepare a maintainable release"],
    relatedProjectSlugs: ["trackhire"],
    faqs: [
      { question: "Can you help define the first version of a web application?", answer: "Yes. We can prioritize the users, workflows and capabilities that belong in an initial release, then document what should follow." },
      { question: "Can a web application connect to existing business systems?", answer: "Integration needs are part of discovery and architecture. The approach depends on the systems, available interfaces and data access requirements." },
    ],
  },
  {
    slug: "mobile-applications",
    title: "Mobile Application Development",
    shortTitle: "Mobile apps",
    summary: "Focused iOS and Android experiences built for reliability in real-world use.",
    audience: "Businesses that need customer or operational workflows available on mobile.",
    value: "One coherent cross-platform experience with a codebase designed for efficient iteration and support.",
    problems: ["Fragmented cross-device journeys", "Field workflows tied to a desktop", "Duplicate native development effort"],
    deliverables: ["Product flows and interface system", "Cross-platform application development", "API integration, testing and release support"],
    technologies: ["Flutter", "REST APIs", "PostgreSQL", "Docker"],
    deliverySteps: ["Define mobile users, tasks and platform requirements", "Plan product flows and shared interface foundations", "Build the application and connect required APIs", "Test on target devices and prepare store releases"],
    relatedProjectSlugs: [],
    faqs: [
      { question: "Can one mobile app support both iOS and Android?", answer: "A cross-platform approach can support both platforms from a shared codebase when the product requirements and device capabilities make that a suitable choice." },
      { question: "Do you have a published mobile app case study?", answer: "There is no directly relevant mobile app case study published in the current portfolio. We will discuss fit and scope transparently before recommending an approach." },
    ],
  },
  {
    slug: "ai-integration",
    title: "AI Integration",
    shortTitle: "AI integration",
    summary: "Useful AI capabilities integrated with the systems, data and guardrails your team already depends on.",
    audience: "Teams with a defined workflow where language models can improve speed or decision support.",
    value: "Practical intelligence embedded into real work, with evaluation and human control designed in from the start.",
    problems: ["Unstructured information at operational scale", "Slow knowledge discovery and repetitive drafting", "AI prototypes that fail outside a demo"],
    deliverables: ["Use-case validation and solution architecture", "LLM, RAG and tool integration", "Evaluation, observability and human review"],
    technologies: ["Python", "LLMs", "RAG", "Evaluations"],
    deliverySteps: ["Validate the use case, data and risk boundaries", "Design retrieval, model and application integrations", "Evaluate representative cases and failure modes", "Deploy with monitoring and appropriate human review"],
    relatedProjectSlugs: ["llm-reliability-lab"],
    faqs: [
      { question: "Can AI use information from our existing documents or systems?", answer: "Retrieval and application integrations can be evaluated when the data is accessible and its permissions, quality and handling requirements are understood." },
      { question: "How do you assess whether an AI feature is reliable enough?", answer: "We define representative evaluation cases, inspect failure modes and decide where human review or fallback behavior is needed before release." },
    ],
  },
  {
    slug: "agentic-ai-automation",
    title: "Agentic AI & Business Automation",
    shortTitle: "Agentic automation",
    summary: "Supervised agents and connected workflows that handle multi-step work without hiding control from people.",
    audience: "Operations teams spending valuable time moving information between tools and queues.",
    value: "Faster operational throughput with explicit approvals, monitoring and recovery paths where risk matters.",
    problems: ["Repetitive multi-step coordination", "Slow handoffs and overloaded operational queues", "Automation with poor visibility or control"],
    deliverables: ["Workflow and risk mapping", "Agent tools, approvals and integrations", "Monitoring, fallback paths and documentation"],
    technologies: ["Python", "Agents", "APIs", "Automation"],
    deliverySteps: ["Choose a bounded workflow and map its risks", "Define tool permissions and human approval points", "Test normal paths, failures and escalation behavior", "Release with monitoring and recovery procedures"],
    relatedProjectSlugs: [],
    faqs: [
      { question: "Do AI agents act without human approval?", answer: "Approval points are defined around the consequences of each action. Workflows can keep consequential steps under human control rather than granting an agent unrestricted authority." },
      { question: "What happens when an automation cannot complete a step?", answer: "Failure handling, escalation and recovery paths are part of the design so that blocked work is visible and can be reviewed or resumed safely." },
    ],
  },
  {
    slug: "api-backend-development",
    title: "Backend & API Engineering",
    shortTitle: "Backend systems",
    summary: "Dependable APIs and data systems that give customer-facing products a strong technical core.",
    audience: "Product teams modernizing brittle services or building a new platform foundation.",
    value: "A stable technical core that makes integrations, new product channels and future development safer.",
    problems: ["Unreliable integrations and slow endpoints", "Inconsistent data and unclear service boundaries", "Scaling and deployment constraints"],
    deliverables: ["API and data model design", "Authentication, testing and documentation", "Containerized deployment and monitoring"],
    technologies: ["FastAPI", "PostgreSQL", "REST", "Docker"],
    deliverySteps: ["Map consumers, integrations and data ownership", "Design contracts, authentication and data models", "Implement APIs with validation and automated tests", "Document, deploy and monitor the service"],
    relatedProjectSlugs: ["trackhire"],
    faqs: [
      { question: "Can you integrate an API with systems we already use?", answer: "Yes, when the existing system exposes a suitable interface and the required access is available. Integration constraints are reviewed during discovery." },
      { question: "Can you improve a backend without replacing the whole product?", answer: "Yes. The current system can be assessed first, then improved in focused steps where that is safer and more practical than a rewrite." },
    ],
  },
  {
    slug: "maintenance-deployment",
    title: "Maintenance & Deployment",
    shortTitle: "Care & deployment",
    summary: "Ongoing technical care for software that the business cannot afford to neglect.",
    audience: "Teams that need dependable releases and accountable technical ownership after launch.",
    value: "Continuity after launch, fewer release surprises and a technical partner who already understands the system.",
    problems: ["Risky releases and neglected dependencies", "Unclear ownership when incidents happen", "Performance and reliability drift"],
    deliverables: ["Deployment pipeline and environment review", "Updates, monitoring and issue response", "Planned performance and security improvements"],
    technologies: ["CI/CD", "Docker", "Monitoring", "Cloud"],
    deliverySteps: ["Review the application, dependencies and release process", "Prioritize reliability, performance and maintenance risks", "Apply and validate changes through controlled releases", "Document follow-up work and support needs"],
    relatedProjectSlugs: ["hotel-sanwariya"],
    faqs: [
      { question: "Can you take over a website built by another team?", answer: "Yes. We start with a code and deployment review to understand the current system, its risks and what should be stabilized first." },
      { question: "What does ongoing website maintenance include?", answer: "The scope can include dependency updates, deployment support, performance checks and planned reliability improvements based on the needs of the system." },
    ],
  },
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
  {
    slug: "hotel-sanwariya",
    title: "Hotel Sanwariya",
    type: "Hospitality website",
    status: "Client project",
    summary: "A clear, responsive hotel website designed to present the property, rooms and guest essentials while making booking enquiries easy to start.",
    problem: "Prospective guests need a trustworthy way to understand the stay, compare room options and contact the hotel without relying on fragmented listing information.",
    challenge: "Bring atmosphere, practical details and a direct enquiry path together in a fast experience that works well on mobile.",
    solution: "A focused hospitality website with structured room information, property highlights, location context and prominent booking actions.",
    architecture: "A responsive Next.js website with structured property content and direct booking enquiry paths.",
    features: ["Room and property information", "Responsive accommodation and amenity pages", "Direct booking and contact actions"],
    implementation: ["Responsive, mobile-first accommodation and amenity pages", "Clear booking and contact paths across the visitor journey", "Structured content and technical SEO foundations"],
    technologies: ["Next.js", "React", "TypeScript", "SEO"],
    theme: "gold",
    image: "/projects/hotel-sanwariya.png",
    imageAlt: "Hotel Sanwariya website preview",
    imageWidth: 1440,
    imageHeight: 900,
    liveUrl: "https://sanwariyahotel.com/",
  },
  {
    slug: "trackhire",
    title: "TrackHire",
    type: "Full-stack product",
    status: "Independent project",
    summary: "A focused workspace for organizing job applications and recruitment activity.",
    problem: "Job search and hiring activity becomes difficult to follow across inboxes, notes and disconnected tools.",
    challenge: "Create a useful workflow without turning a simple tracking need into a heavy enterprise system.",
    solution: "A structured product experience that brings roles, applications, stages and next actions into one legible workspace.",
    architecture: "A React and TypeScript application connected to FastAPI services and a PostgreSQL relational data model.",
    features: ["Application and role tracking", "Stage and next-action organization", "Responsive workflow views"],
    implementation: ["Responsive workflow views for desktop and mobile", "Typed client-to-API contracts", "Relational data model designed around application history"],
    technologies: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
    theme: "ember",
  },
  {
    slug: "llm-reliability-lab",
    title: "LLM Reliability Lab",
    type: "AI engineering",
    status: "Concept study",
    summary: "An evaluation workspace for understanding how AI applications behave before release.",
    problem: "Language-model outputs can look convincing while failing silently on the cases that matter.",
    challenge: "Make evaluation evidence readable for both engineering and product decisions.",
    solution: "A technical environment for organizing test cases, comparing runs and making reliability work visible.",
    architecture: "A Python-based evaluation workflow organized around reusable cases and run-by-run response comparison.",
    features: ["Reusable evaluation suites and test cases", "Response comparison and pass/fail evidence", "Run-level quality signals and failure inspection"],
    implementation: ["Reusable evaluation suites and test cases", "Response comparison and pass/fail evidence", "Run-level quality signals and failure inspection"],
    technologies: ["Python", "LLMs", "Evaluations", "APIs"],
    theme: "cyan",
  },
];

export const founders = [
  { id:"jaseem", initials:"JQ", name:"Jaseem Quraishi", role:"Co-Founder & Technical Lead", email:"jaseem1quraishi@gmail.com", linkedin:"https://www.linkedin.com/in/jaseem-quraishi/", phone:"+91 9555917856", whatsapp:"919555917856", description:"Jaseem leads technical direction from early architecture through production. His work spans frontend and backend engineering, AI integration, deployment and technical quality, with an emphasis on maintainable systems and clear engineering trade-offs." },
  { id:"dhruv", initials:"DMV", name:"Dhruv Moses Vats", role:"Co-Founder & Business Development Lead", email:"dhruvmoses15@gmail.com", linkedin:"https://www.linkedin.com/in/dhruvmoses/", phone:"+91 9555985754", whatsapp:"919555985754", description:"Dhruv leads business development and client discovery, helping clarify goals, users and constraints before work begins. He coordinates requirements and communication through delivery so scope, decisions and next steps stay clear." },
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
  heading:"Let’s build the right thing, properly.",
  description:"Tell us what needs to change. We’ll respond with candid questions and a practical next step.",
};
