import Link from "next/link";
import type { MouseEventHandler } from "react";
import { site } from "@/data/data";

export function Logo({ compact = false, onClick }: { compact?: boolean; onClick?: MouseEventHandler<HTMLAnchorElement> }) {
  return <Link href="/" onClick={onClick} className={`brand ${compact ? "brand-compact" : ""}`} aria-label={`${site.displayName} home`}>
    <svg className="brand-symbol" viewBox="0 0 44 44" role="img" aria-label="Calystr geometric C logo">
      <path d="M34.5 11.5A16 16 0 1 0 34.5 32.5" />
      <path className="brand-cut" d="M27.5 16.5 36 11.5M27.5 27.5 36 32.5" />
    </svg>
    {!compact && <span className="brand-wordmark">{site.name}</span>}
  </Link>;
}
