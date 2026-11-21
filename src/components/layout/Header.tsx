"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { navigation } from "@/data/data";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const sectionHref = (hash: string) => pathname === "/" ? hash : `/${hash}`;
  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    event.preventDefault();
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) firstLinkRef.current?.focus();

    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <header className={`site-header${open ? " menu-open" : ""}`}>
      <Container className="header-inner">
      <Logo onClick={handleLogoClick} />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => <Link key={item.href} href={sectionHref(item.href)}>{item.label}</Link>)}
          <Link className="nav-cta" href={sectionHref("#contact")}>Start a project</Link>
        </nav>
        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </Container>
      {open && (
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <Link
              ref={index === 0 ? firstLinkRef : undefined}
              key={item.href}
              href={sectionHref(item.href)}
              onClick={() => setOpen(false)}
            >
              <span>0{index + 1}</span>{item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
