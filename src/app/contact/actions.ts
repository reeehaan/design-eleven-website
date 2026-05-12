"use server";

import { headers } from "next/headers";
import { ContactFormSchema, type ContactFormData } from "@/lib/contact-form";
import { getSupabaseAdmin } from "@/lib/supabase";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { getContactRateLimiter } from "@/lib/rate-limit";
import { sendContactEmails } from "@/lib/email";

export type ContactSubmissionResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; message: string }
  | { ok: false; reason: "rate-limited"; message: string }
  | { ok: false; reason: "captcha"; message: string }
  | { ok: false; reason: "server"; message: string };

type SubmitArgs = {
  data: ContactFormData;
  turnstileToken: string;
};

export async function submitContactForm(
  args: SubmitArgs,
): Promise<ContactSubmissionResult> {
  // 1. Validate input
  const parsed = ContactFormSchema.safeParse(args.data);
  if (!parsed.success) {
    return {
      ok: false,
      reason: "invalid",
      message: "Some fields are missing or invalid. Please review and try again.",
    };
  }
  const data = parsed.data;

  // 2. Get client IP
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";
  const userAgent = headersList.get("user-agent") ?? null;

  // 3. Rate limit (degrade gracefully if Upstash is unavailable)
  try {
    const { success } = await getContactRateLimiter().limit(ip);
    if (!success) {
      return {
        ok: false,
        reason: "rate-limited",
        message:
          "Too many requests from your network. Please try again in an hour, or call us directly.",
      };
    }
  } catch (err) {
    console.error("[contact] Rate limit check failed:", err);
  }

  // 4. Verify Turnstile
  const captcha = await verifyTurnstileToken(args.turnstileToken, ip);
  if (!captcha.ok) {
    console.warn("[contact] Turnstile failed:", captcha.reason);
    return {
      ok: false,
      reason: "captcha",
      message: "We couldn't verify your request. Please refresh the page and try again.",
    };
  }

  // 5. Persist to Supabase (source of truth — store before sending email)
  let stored = false;
  try {
    const { error } = await getSupabaseAdmin()
      .from("contact_submissions")
      .insert({
        project_type: data.projectType,
        location: data.location,
        project_details: data.projectDetails,
        budget: data.budget,
        timeline: data.timeline,
        name: data.name,
        email: data.email,
        phone: data.phone,
        prefer_whatsapp: data.preferWhatsapp,
        ip_address: ip,
        user_agent: userAgent,
      });
    if (error) throw error;
    stored = true;
  } catch (err) {
    console.error("[contact] Supabase insert failed:", err);
  }

  // 6. Send emails
  let emailOk = false;
  try {
    const result = await sendContactEmails(data);
    emailOk = result.ownerEmail.ok;

    if (!result.ownerEmail.ok) {
      console.error("[contact] Owner email failed:", result.ownerEmail.error);
    }
    if (!result.visitorEmail.ok) {
      console.warn("[contact] Visitor email failed:", result.visitorEmail.error);
    }

    // Update email_sent flag in DB (best effort)
    if (result.ownerEmail.ok && stored) {
      try {
        await getSupabaseAdmin()
          .from("contact_submissions")
          .update({ email_sent: true })
          .eq("email", data.email)
          .order("created_at", { ascending: false })
          .limit(1);
      } catch {
        // Non-fatal
      }
    }
  } catch (err) {
    console.error("[contact] Email threw:", err);
  }

  if (stored || emailOk) return { ok: true };

  return {
    ok: false,
    reason: "server",
    message:
      "Something went wrong on our end. Please call us directly while we look into it.",
  };
}
