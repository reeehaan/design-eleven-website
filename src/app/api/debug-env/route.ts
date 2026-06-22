import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    CONTACT_EMAIL_FROM: process.env.CONTACT_EMAIL_FROM ?? "NOT SET",
    CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO ? "SET (hidden)" : "NOT SET",
    RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET (hidden)" : "NOT SET",
    NODE_ENV: process.env.NODE_ENV,
  });
}
