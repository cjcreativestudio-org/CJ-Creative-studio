"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "hello@cjcreativestudio.com";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

interface FormState {
  success?: boolean;
  serverError?: boolean;
  errors?: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export async function sendEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  const errors: FormState["errors"] = {};
  if (!name) errors.name = "Please enter your name";
  if (!email) errors.email = "Please enter your email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email";
  if (!message) errors.message = "Please tell us about your project";

  if (Object.keys(errors).length > 0) return { errors };

  try {
    await resend.emails.send({
      from: "CJ Studio Website <noreply@cjcreativestudio.com>",
      to: CONTACT_EMAIL,
      subject: `New project enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; color: #111827;">
          <div style="border-bottom: 2px solid #f3f4f6; padding-bottom: 20px; margin-bottom: 24px;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #111827;">New project enquiry</h1>
            <p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">via cjcreativestudio.com</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; font-size: 13px; color: #6b7280; width: 80px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; font-size: 15px; font-weight: 600; color: #111827;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 13px; color: #6b7280; vertical-align: top;">Email</td>
              <td style="padding: 10px 0; font-size: 15px; color: #111827;">
                <a href="mailto:${escapeHtml(email)}" style="color: #a78bfa; text-decoration: none;">${escapeHtml(email)}</a>
              </td>
            </tr>
          </table>

          <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 32px;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.08em;">Message</p>
            <p style="margin: 0; font-size: 15px; color: #111827; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>

          <a href="mailto:${escapeHtml(email)}" style="display: inline-block; background: #111827; color: white; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-size: 14px; font-weight: 600;">
            Reply to ${escapeHtml(name)}
          </a>
        </div>
      `,
    });

    return { success: true };
  } catch (e) {
    console.error("[send-enquiry] Resend error:", e);
    return { serverError: true };
  }
}
