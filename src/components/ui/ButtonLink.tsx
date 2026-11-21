import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  return (
    <Link className={`button button-${variant}`} href={href}>
      {children}
      <ArrowUpRight aria-hidden="true" size={17} />
    </Link>
  );
}
