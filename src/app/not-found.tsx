import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
export default function NotFound(){return <section className="page-hero"><Container><span className="eyebrow">404</span><h1>This route doesn’t exist.</h1><p>The page may have moved, or the address may be incomplete.</p><ButtonLink href="/">Return home</ButtonLink></Container></section>}
