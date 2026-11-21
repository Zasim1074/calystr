import type { Project } from "@/types";
import Image from "next/image";

const visualContent = {
  gold: {
    heading: "Plan your stay",
    value: "12",
    label: "rooms & suites",
    columns: ["Rooms", "Amenities", "Enquire"],
  },
  ember: {
    heading: "Application pipeline",
    value: "24",
    label: "active roles",
    columns: ["Discovery", "In progress", "Review"],
  },
  cyan: {
    heading: "Evaluation suite",
    value: "0.88",
    label: "reliability score",
    columns: ["Discovery", "In progress", "Review"],
  },
} as const;

export function ProjectVisual({ project }: { project: Project }) {
  const content = visualContent[project.theme];

  if (project.image) {
    return (
      <div className={`project-visual has-image ${project.theme}`}>
        <Image
          src={project.image}
          alt={`${project.title} landing page`}
          fill
          sizes="(max-width: 900px) 100vw, 62vw"
          className="project-screenshot"
          priority={project.slug === "hotel-sanwariya"}
        />
      </div>
    );
  }

  return (
    <div
      className={`project-visual ${project.theme}`}
      aria-label={`Interface concept for ${project.title}`}
      role="img"
    >
      <div className="screen">
        <div className="screen-bar">
          <i />
          <i />
          <i />
          <span>{project.title} / website</span>
        </div>
        <div className="screen-layout">
          <aside>
            {[1, 2, 3, 4].map((item) => (
              <i key={item} />
            ))}
          </aside>
          <div className="screen-content">
            <small>{project.type}</small>
            <h4>{content.heading}</h4>
            <div className="metric-row">
              <strong>{content.value}</strong>
              <span>{content.label}</span>
            </div>
            <div className="screen-grid">
              {content.columns.map((label, index) => (
                <div key={label}>
                  <b>{label}</b>
                  <span style={{ height: `${34 + index * 15}px` }} />
                  <span style={{ height: `${52 - index * 7}px` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
