"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/data/data";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function Header() {
  const [open,setOpen]=useState(false); const pathname=usePathname();
  useEffect(()=>{document.body.style.overflow=open?"hidden":"";const close=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false)};window.addEventListener("keydown",close);return()=>{document.body.style.overflow="";window.removeEventListener("keydown",close)}},[open]);
  return <header className="site-header"><Container className="header-inner">
    <Logo />
    <nav className="desktop-nav" aria-label="Primary navigation">{navigation.map(item=><Link key={item.href} aria-current={pathname===item.href?"page":undefined} href={item.href}>{item.label}</Link>)}<Link className="nav-cta" href="/contact">Start a project</Link></nav>
    <button className="menu-button" type="button" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open?"Close navigation":"Open navigation"}>{open?<X/>:<Menu/>}</button>
  </Container>{open&&<nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">{navigation.map((item,i)=><Link key={item.href} href={item.href} onClick={()=>setOpen(false)}><span>0{i+1}</span>{item.label}</Link>)}</nav>}</header>;
}
