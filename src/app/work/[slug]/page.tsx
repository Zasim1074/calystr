import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { projects } from "@/data/data";
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=projects.find(x=>x.slug===slug);return p?{title:p.title,description:p.summary,alternates:{canonical:`/work/${p.slug}`}}:{}}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(x=>x.slug===slug);if(!p)notFound();return <><section className="detail-hero project-detail-hero"><Container><span className="eyebrow">{p.status} · {p.type}</span><h1>{p.title}</h1><p>{p.summary}</p></Container></section><Container><ProjectVisual project={p}/></Container><section className="section case-body"><Container><article><span className="eyebrow">Business problem</span><h2>{p.problem}</h2></article><div className="case-grid"><article><span className="eyebrow">Engineering challenge</span><p>{p.challenge}</p></article><article><span className="eyebrow">Proposed solution</span><p>{p.solution}</p></article></div><div className="implementation"><span className="eyebrow">Technical implementation</span><ul>{p.implementation.map(x=><li key={x}>{x}</li>)}</ul><div className="chips">{p.technologies.map(x=><span key={x}>{x}</span>)}</div></div></Container></section><ContactBlock/></>}
