import { Resend } from "resend";
import { ownerNotificationEmail, visitorConfirmationEmail } from "./email-templates";
import type { ContactFormData } from "./contact-form";

let resend: Resend | null = null;

function getResend(): Resend {
  if (resend) return resend;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Missing env var: RESEND_API_KEY");
  resend = new Resend(apiKey);
  return resend;
}

export type EmailResult = {
  ownerEmail: { ok: boolean; error?: string };
  visitorEmail: { ok: boolean; error?: string };
};

export async function sendContactEmails(data: ContactFormData): Promise<EmailResult> {
  const from = process.env.CONTACT_EMAIL_FROM ?? "onboarding@resend.dev";
  const to = process.env.CONTACT_EMAIL_TO;

  if (!to) {
    return {
      ownerEmail: { ok: false, error: "CONTACT_EMAIL_TO not configured" },
      visitorEmail: { ok: false, error: "CONTACT_EMAIL_TO not configured" },
    };
  }

  const client = getResend();
  const ownerTpl = ownerNotificationEmail(data);
  const visitorTpl = visitorConfirmationEmail(data);

  const [ownerResult, visitorResult] = await Promise.allSettled([
    client.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: ownerTpl.subject,
      html: ownerTpl.html,
      text: ownerTpl.text,
    }),
    client.emails.send({
      from,
      to: data.email,
      subject: visitorTpl.subject,
      html: visitorTpl.html,
      text: visitorTpl.text,
    }),
  ]);

  return {
    ownerEmail: toStatus(ownerResult),
    visitorEmail: toStatus(visitorResult),
  };
}

function toStatus(
  result: PromiseSettledResult<{ error?: { message?: string } | null }>,
): { ok: boolean; error?: string } {
  if (result.status === "rejected") {
    return {
      ok: false,
      error: result.reason instanceof Error ? result.reason.message : "Unknown",
    };
  }
  if (result.value.error) {
    return { ok: false, error: result.value.error.message ?? "Resend error" };
  }
  return { ok: true };
}
