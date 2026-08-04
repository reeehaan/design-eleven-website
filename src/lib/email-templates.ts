import {
  PROJECT_TYPES,
  BUDGET_BANDS,
  TIMELINE_OPTIONS,
  type ContactFormData,
} from "./contact-form";
import { siteConfig } from "./site";

function labelFor<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

function escape(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function ownerNotificationEmail(data: ContactFormData) {
  const projectTypeLabel = labelFor(PROJECT_TYPES, data.projectType);
  const budgetLabel = labelFor(BUDGET_BANDS, data.budget);
  const timelineLabel = labelFor(TIMELINE_OPTIONS, data.timeline);
  const subject = `New project inquiry — ${data.name} (${projectTypeLabel})`;
  const whatsappUrl = `https://wa.me/${data.phone.replace(/[^0-9]/g, "")}`;

  const text = `
NEW PROJECT INQUIRY

From: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Prefers WhatsApp: ${data.preferWhatsapp ? "Yes" : "No"}

— PROJECT —
Type: ${projectTypeLabel}
Location: ${data.location}
Budget: ${budgetLabel}
Timeline: ${timelineLabel}

— DETAILS —
${data.projectDetails}

—
Reply to: ${data.email}
WhatsApp: ${whatsappUrl}
`.trim();

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#F0F0EC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0E1417;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F0F0EC;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;">
        <tr><td style="padding:0 0 24px 0;border-bottom:1px solid #C9CBC4;">
          <p style="margin:0;font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#656D6A;">${escape(siteConfig.name)} · New inquiry</p>
          <h1 style="margin:12px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:32px;line-height:1.1;font-weight:400;color:#0E1417;">
            New project inquiry from<br><em style="color:#3A423F;">${escape(data.name)}</em>
          </h1>
        </td></tr>

        <tr><td style="padding:32px 0;border-bottom:1px solid #C9CBC4;">
          <p style="margin:0 0 16px 0;font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#656D6A;">Contact</p>
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr><td style="padding:6px 0;font-size:14px;color:#3A423F;width:120px;">Email</td>
                <td style="padding:6px 0;font-size:16px;"><a href="mailto:${escape(data.email)}" style="color:#0E1417;">${escape(data.email)}</a></td></tr>
            <tr><td style="padding:6px 0;font-size:14px;color:#3A423F;">Phone</td>
                <td style="padding:6px 0;font-size:16px;"><a href="tel:${escape(data.phone)}" style="color:#0E1417;">${escape(data.phone)}</a></td></tr>
            <tr><td style="padding:6px 0;font-size:14px;color:#3A423F;">WhatsApp</td>
                <td style="padding:6px 0;font-size:16px;">
                  ${data.preferWhatsapp
                    ? `<a href="${whatsappUrl}" style="color:#BF4317;">Preferred — open WhatsApp →</a>`
                    : `<a href="${whatsappUrl}" style="color:#3A423F;">Open WhatsApp →</a>`}
                </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:32px 0;border-bottom:1px solid #C9CBC4;">
          <p style="margin:0 0 16px 0;font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#656D6A;">Project</p>
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr><td style="padding:6px 0;font-size:14px;color:#3A423F;width:120px;">Type</td>
                <td style="padding:6px 0;font-size:16px;color:#0E1417;">${escape(projectTypeLabel)}</td></tr>
            <tr><td style="padding:6px 0;font-size:14px;color:#3A423F;">Location</td>
                <td style="padding:6px 0;font-size:16px;color:#0E1417;">${escape(data.location)}</td></tr>
            <tr><td style="padding:6px 0;font-size:14px;color:#3A423F;">Budget</td>
                <td style="padding:6px 0;font-size:16px;color:#0E1417;">${escape(budgetLabel)}</td></tr>
            <tr><td style="padding:6px 0;font-size:14px;color:#3A423F;">Timeline</td>
                <td style="padding:6px 0;font-size:16px;color:#0E1417;">${escape(timelineLabel)}</td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:32px 0;">
          <p style="margin:0 0 16px 0;font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#656D6A;">Details</p>
          <p style="margin:0;font-size:16px;line-height:1.6;color:#0E1417;white-space:pre-wrap;">${escape(data.projectDetails)}</p>
        </td></tr>

        <tr><td style="padding:24px 0 0 0;border-top:1px solid #C9CBC4;">
          <p style="margin:0;font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#656D6A;">Sent from ${escape(siteConfig.url)}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}

export function visitorConfirmationEmail(data: ContactFormData) {
  const subject = `We received your request — ${siteConfig.name}`;
  const projectTypeLabel = labelFor(PROJECT_TYPES, data.projectType);
  const budgetLabel = labelFor(BUDGET_BANDS, data.budget);
  const timelineLabel = labelFor(TIMELINE_OPTIONS, data.timeline);

  const text = `
Hi ${data.name},

Thanks for getting in touch with ${siteConfig.name}.

We received your project request and will personally review it within 1 business day.

— Project: ${projectTypeLabel}
— Location: ${data.location}
— Budget: ${budgetLabel}
— Timeline: ${timelineLabel}

If it's urgent, reach us directly:
Phone: ${siteConfig.contact.phoneDisplay}
WhatsApp: https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}

Talk soon,
${siteConfig.name}
${siteConfig.url}
`.trim();

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#F0F0EC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0E1417;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F0F0EC;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;">
        <tr><td style="padding:0 0 24px 0;border-bottom:1px solid #C9CBC4;">
          <p style="margin:0;font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#656D6A;">${escape(siteConfig.name)}</p>
          <h1 style="margin:16px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:32px;line-height:1.1;font-weight:400;color:#0E1417;">
            Thanks — <em style="color:#3A423F;">we'll be in touch.</em>
          </h1>
        </td></tr>

        <tr><td style="padding:32px 0;">
          <p style="margin:0 0 16px 0;font-size:17px;line-height:1.6;color:#0E1417;">Hi ${escape(data.name)},</p>
          <p style="margin:0 0 16px 0;font-size:17px;line-height:1.6;color:#3A423F;">
            We received your project request and will personally review it within 1 business day.
          </p>
          <p style="margin:0;font-size:17px;line-height:1.6;color:#3A423F;">
            We'll either follow up with a few questions, suggest a time for a free site visit, or — if your project is outside our scope — be honest and recommend someone better suited.
          </p>
        </td></tr>

        <tr><td style="padding:24px 0;border-top:1px solid #C9CBC4;border-bottom:1px solid #C9CBC4;">
          <p style="margin:0 0 12px 0;font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#656D6A;">Your request</p>
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr><td style="padding:4px 0;font-size:14px;color:#3A423F;width:100px;">Project</td>
                <td style="padding:4px 0;font-size:15px;color:#0E1417;">${escape(projectTypeLabel)}</td></tr>
            <tr><td style="padding:4px 0;font-size:14px;color:#3A423F;">Location</td>
                <td style="padding:4px 0;font-size:15px;color:#0E1417;">${escape(data.location)}</td></tr>
            <tr><td style="padding:4px 0;font-size:14px;color:#3A423F;">Budget</td>
                <td style="padding:4px 0;font-size:15px;color:#0E1417;">${escape(budgetLabel)}</td></tr>
            <tr><td style="padding:4px 0;font-size:14px;color:#3A423F;">Timeline</td>
                <td style="padding:4px 0;font-size:15px;color:#0E1417;">${escape(timelineLabel)}</td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:32px 0 24px 0;">
          <p style="margin:0 0 12px 0;font-size:15px;color:#3A423F;">If it's urgent, reach us directly:</p>
          <p style="margin:0;font-size:17px;">
            <a href="tel:${escape(siteConfig.contact.phone.replace(/\s/g, ""))}" style="color:#BF4317;text-decoration:none;">${escape(siteConfig.contact.phoneDisplay)}</a>
            <span style="color:#656D6A;"> · </span>
            <a href="https://wa.me/${escape(siteConfig.contact.whatsapp.replace(/[^0-9]/g, ""))}" style="color:#BF4317;text-decoration:none;">WhatsApp</a>
          </p>
        </td></tr>

        <tr><td style="padding:24px 0 0 0;border-top:1px solid #C9CBC4;">
          <p style="margin:0;font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#656D6A;">
            ${escape(siteConfig.name)} · ${escape(siteConfig.url)}
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
