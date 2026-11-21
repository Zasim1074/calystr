import type { BreadcrumbItem } from "@/lib/structured-data";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "./Container";

export function PageHero({ eyebrow, title, copy, breadcrumbs }: { eyebrow: string; title: string; copy: string; breadcrumbs?: BreadcrumbItem[] }) {
  return <section className="page-hero"><Container>{breadcrumbs && <Breadcrumbs items={breadcrumbs}/>}<span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></Container></section>;
}
