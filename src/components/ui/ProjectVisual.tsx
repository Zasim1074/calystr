import type { Project } from "@/types";
import Image from "next/image";

const visualContent = {
  gold: {
    heading: "Plan your stay",
    value: "Stay",
    label: "property information",
    columns: ["Rooms", "Amenities", "Enquire"],
  },
  ember: {
    heading: "Application pipeline",
    value: "Track",
    label: "applications and next steps",
    columns: ["Discovery", "In progress", "Review"],
  },
  cyan: {
    heading: "Evaluation suite",
    value: "Test",
    label: "model outputs against cases",
    columns: ["Discovery", "In progress", "Review"],
  },
} as const;

export function ProjectVisual({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const content = visualContent[project.theme];

  if (project.image) {
    return (
      <div className={`project-visual has-image ${project.theme}`}>
        <Image
          src={project.image}
          alt={project.imageAlt ?? `${project.title} project image`}
          fill
          sizes="(max-width: 900px) 100vw, 62vw"
          className="project-screenshot"
          loading={priority ? "eager" : "lazy"}
        />
      </div>
    );
  }

  return (
    <figure className="project-preview">
      <div
        className={`project-visual ${project.theme}`}
        aria-label={`Illustrative interface concept for ${project.title}, not a production screenshot`}
        role="img"
      >
        <div className="screen">
          <div className="screen-bar">
            <i />
            <i />
            <i />
            <span>{project.title} / interface concept</span>
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
      <figcaption className="project-preview-caption">
        Illustrative interface concept; not a production product screenshot.
      </figcaption>
    </figure>
  );
}
