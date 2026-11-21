import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/data";
import "./globals.css";

const manrope=Manrope({subsets:["latin"],variable:"--font-sans",display:"swap"});
export const metadata:Metadata={metadataBase:new URL(site.url),title:{default:`${site.name} — ${site.tagline}`,template:`%s — ${site.name}`},description:site.description,icons:{icon:"/favicon.svg"},alternates:{canonical:"/"},openGraph:{type:"website",siteName:site.name,title:site.tagline,description:site.description,images:["/og-card.svg"]},twitter:{card:"summary_large_image",title:site.tagline,description:site.description,images:["/og-card.svg"]}};

export default function RootLayout({children}:{children:React.ReactNode}){const organization={"@context":"https://schema.org","@type":["Organization","ProfessionalService"],name:site.legalName,url:site.url,telephone:site.phone,areaServed:"Worldwide",address:{"@type":"PostalAddress",addressLocality:site.location.city,addressRegion:site.location.region,addressCountry:"IN"},knowsAbout:["Web development","Custom software development","Mobile application development","AI integration"]};return <html lang="en"><body className={manrope.variable}><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization)}}/></body></html>}
