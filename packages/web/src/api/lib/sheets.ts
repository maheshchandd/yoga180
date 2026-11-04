import { z } from "zod";
import { googleAction, googleConfigured } from "./google-bridge";
// Forwards each new lead to a Google Sheet via a Google Apps Script web app.
// Set GOOGLE_SHEET_WEBHOOK_URL (the /exec URL) and GOOGLE_SHEET_SECRET in .env.
// If the URL is missing, this is a no-op. Failures never block the visitor.

type LeadRow = {
  id: number;
  type: "booking" | "chat";
  name: string;
  phone?: string | null;
  classType?: string | null;
  preferredDay?: string | null;
  preferredTime?: string | null;
  message?: string | null;
  createdAt: Date;
};

export async function pushLeadToSheet(lead: LeadRow) {
  if (!googleConfigured()) return;
  const channel = lead.message?.match(/^\[(whatsapp|sms)\]\s*/i)?.[1] ?? "";
  const message = lead.message?.replace(/^\[(whatsapp|sms)\]\s*/i, "") ?? "";
  const payload = {
    secret: process.env.GOOGLE_SHEET_SECRET ?? "",
    id: lead.id,
    date: lead.createdAt.toLocaleString("en-CA", { timeZone: "America/Toronto", hour12: false }),
    source: lead.type === "chat" ? "Chat with Asha" : "Booking form",
    channel: channel ? channel.toUpperCase() : "",
    name: lead.name,
    phone: lead.phone ?? "",
    classType: lead.classType ?? "",
    preferredDay: lead.preferredDay ?? "",
    preferredTime: lead.preferredTime ?? "",
    message,
  };
  try {
    await googleAction("lead", payload, z.object({ synced: z.literal(true) }));
  } catch { console.error("[sheets] lead not synced"); }
}
