import type { Metadata } from "next";
import { ContactBlock } from "@/components/sections/ContactBlock";
export const metadata:Metadata={title:"Discuss your project",description:"Tell STUDIO_NAME about your website, application, mobile or AI project.",alternates:{canonical:"/contact"}};
export default function ContactPage(){return <div className="contact-page"><ContactBlock/></div>}
