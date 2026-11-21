import { ContactBlock } from "@/components/sections/ContactBlock";
import { createPageMetadata } from "@/lib/seo";
export const metadata=createPageMetadata({title:"Discuss your project",description:"Tell Calystr Studio about your website, application, mobile or AI project.",path:"/contact"});
export default function ContactPage(){return <div className="contact-page"><ContactBlock/></div>}
