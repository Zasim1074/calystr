import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { services } from "@/data/data";
import { createPageMetadata } from "@/lib/seo";
export const metadata=createPageMetadata({title:"Software & AI development services",description:"Website, web application, mobile app, backend and AI integration services from a senior two-person technology studio.",path:"/services"});
export default function ServicesPage(){return <><PageHero eyebrow="Services" title="Engineering capability, focused on business outcomes." copy="From a high-performing website to a custom operating system, we design the experience and engineer the system behind it."/><section className="section services-catalog"><Container><div className="catalog-intro"><span className="eyebrow">Eight connected capabilities</span><p>Engage us for one focused requirement or for the full path from product definition to deployment and ongoing care.</p></div><div className="service-grid">{services.map((s,i)=><article className={`service-card service-card-${(i%4)+1}`} key={s.slug}><div className="service-card-head"><span>0{i+1}</span><Link href={`/services/${s.slug}`} aria-label={`Explore ${s.title}`}><ArrowUpRight/></Link></div><h2>{s.title}</h2><p>{s.summary}</p><div className="service-commercial"><div><b>Problem</b><span>{s.problems[0]}</span></div><div><b>Value</b><span>{s.value}</span></div><div><b>Includes</b><span>{s.deliverables.slice(0,2).join(" · ")}</span></div></div><div className="chips">{s.technologies.map(t=><span key={t}>{t}</span>)}</div><ButtonLink href={`/services/${s.slug}`} variant="ghost">Explore this service</ButtonLink></article>)}</div></Container></section><ContactBlock/></>}
