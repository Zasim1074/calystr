"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { founders, inquiry, services } from "@/data/data";

type State={kind:"idle"|"loading"|"success"|"error";message:string};
export function ContactForm(){const [state,setState]=useState<State>({kind:"idle",message:""});
async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();const form=event.currentTarget;setState({kind:"loading",message:""});try{const body=Object.fromEntries(new FormData(form));const response=await fetch("/api/contact",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});const data=await response.json() as {message?:string};if(!response.ok)throw new Error(data.message);setState({kind:"success",message:data.message??"Inquiry sent."});form.reset()}catch(error){setState({kind:"error",message:error instanceof Error&&error.message?error.message:`Delivery is unavailable. Call or WhatsApp ${founders[0].phone}.`})}}
return <form className="contact-form" onSubmit={submit}>
  <div className="field-row"><label>Name<input name="name" required minLength={2} autoComplete="name"/></label><label>Business name<input name="business" autoComplete="organization"/></label></div>
  <div className="field-row"><label>Email<input type="email" name="email" required autoComplete="email"/></label><label>Phone<input type="tel" name="phone" autoComplete="tel" pattern="[+0-9 ()-]{7,20}"/></label></div>
  <div className="field-row"><label>Service<select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map(s=><option key={s.slug} value={s.title}>{s.title}</option>)}</select></label><label>Estimated budget<select name="budget" required defaultValue=""><option value="" disabled>Select a range</option>{inquiry.budgets.map(b=><option key={b}>{b}</option>)}</select></label></div>
  <label>Project description<textarea name="description" required minLength={30} rows={6} placeholder="What are you building, who is it for, and what needs to change?"/></label>
  <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
  <button className="submit-button" disabled={state.kind==="loading"} type="submit">{state.kind==="loading"?"Sending…":"Send inquiry"}<ArrowUpRight size={18}/></button>
  {state.message&&<p className={`form-status ${state.kind}`} role="status">{state.kind==="success"&&<CheckCircle2 size={18}/>} {state.message}</p>}
</form>}
