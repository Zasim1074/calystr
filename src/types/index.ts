export type Service = {
  slug: string; title: string; shortTitle: string; summary: string;
  audience: string; value: string; problems: string[]; deliverables: string[]; technologies: string[];
};

export type Project = {
  slug: string; title: string; type: string; status: "Client project" | "Independent project" | "Concept study";
  summary: string; problem: string; challenge: string; solution: string;
  implementation: string[]; technologies: string[]; theme: "gold" | "ember" | "cyan";
  image?: string; liveUrl?: string;
};
