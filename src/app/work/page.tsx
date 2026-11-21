import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/data";
import { createPageMetadata } from "@/lib/seo";
export const metadata=createPageMetadata({title:"Selected work",description:"Independent software products and AI engineering studies by Calystr Studio.",path:"/work"});
export default function WorkPage(){return <><PageHero eyebrow="Selected work" title="Evidence over theatre." copy="A growing selection of independent products and technical explorations. We clearly label the nature of every project and never invent business results."/><section className="section"><Container className="work-grid">{projects.map(p=><Link className="work-card" href={`/work/${p.slug}`} key={p.slug}><ProjectVisual project={p}/><span className="eyebrow">{p.status}</span><h2>{p.title}</h2><p>{p.summary}</p></Link>)}</Container></section></>}
