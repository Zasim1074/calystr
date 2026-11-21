import { Container } from "./Container";
export function PageHero({eyebrow,title,copy}:{eyebrow:string;title:string;copy:string}){return <section className="page-hero"><Container><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></Container></section>}
