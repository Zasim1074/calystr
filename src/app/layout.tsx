import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { createRootMetadata } from "@/lib/seo";
import { globalSchema } from "@/lib/structured-data";
import "./tailwind.css";
import "./globals.css";
import "./navigation.css";
import "./seo.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
export const metadata: Metadata = createRootMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={manrope.variable}>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header/>
        <main id="main">{children}</main>
        <Footer/>
        <JsonLd data={globalSchema()}/>
      </body>
    </html>
  );
}
