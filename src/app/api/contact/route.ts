import { NextResponse } from "next/server";
import { z } from "zod";
import { services, inquiry } from "@/data/data";

const schema=z.object({name:z.string().trim().min(2).max(80),business:z.string().trim().max(120).optional().default(""),email:z.string().email().max(160),phone:z.string().trim().max(24).optional().default(""),service:z.enum(services.map(s=>s.title) as [string,...string[]]),budget:z.enum(inquiry.budgets as [string,...string[]]),description:z.string().trim().min(30).max(5000),website:z.string().max(0).optional().default("")});
const attempts=new Map<string,{count:number;reset:number}>();

export async function POST(request:Request){const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()??"unknown";const now=Date.now();const record=attempts.get(ip);if(record&&record.reset>now&&record.count>=5)return NextResponse.json({message:"Too many requests. Please try again later."},{status:429});attempts.set(ip,!record||record.reset<=now?{count:1,reset:now+60_000}:{...record,count:record.count+1});
let raw:unknown;try{raw=await request.json()}catch{return NextResponse.json({message:"Invalid request."},{status:400})}const parsed=schema.safeParse(raw);if(!parsed.success)return NextResponse.json({message:"Please check the form and try again."},{status:400});
const endpoint=process.env.INQUIRY_WEBHOOK_URL;if(!endpoint)return NextResponse.json({message:"Inquiry delivery is not configured. Please use the email link instead."},{status:503});
try{const response=await fetch(endpoint,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...parsed.data,website:undefined,source:"website",receivedAt:new Date().toISOString()})});if(!response.ok)throw new Error("Provider error");return NextResponse.json({message:"Thank you. Your inquiry has been delivered."})}catch{return NextResponse.json({message:"We could not deliver this right now. Please use the email link instead."},{status:502})}}
