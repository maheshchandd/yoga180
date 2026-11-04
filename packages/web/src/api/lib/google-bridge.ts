import { z } from "zod";
import { ORPCError } from "@orpc/server";
export function googleConfigured() {
  return !!(process.env.GOOGLE_SHEET_WEBHOOK_URL && process.env.GOOGLE_SHEET_SECRET);
}
export async function googleAction<T>(action: string, data: Record<string, unknown>, schema: z.ZodType<T>): Promise<T> {
  if (!googleConfigured()) throw new ORPCError("SERVICE_UNAVAILABLE", { message: "Google Calendar connection is not set up yet. Please contact Asha on WhatsApp." });
  try {
    const res = await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL!, {
      method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...data, action, secret: process.env.GOOGLE_SHEET_SECRET }),
      redirect: "follow", signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) throw new Error("Google HTTP error");
    const payload = await res.json();
    const envelope = z.object({ version: z.literal(2), ok: z.boolean(), code: z.string().optional() }).parse(payload);
    if (!envelope.ok) {
      if (envelope.code === "FULL") throw new ORPCError("CONFLICT", { message: "That slot is no longer available. Please choose another time." });
      if (envelope.code === "INVALID") throw new ORPCError("BAD_REQUEST", { message: "This booking is outside the allowed demo schedule." });
      throw new Error("Google rejected request");
    }
    return schema.parse(payload);
  } catch (err) {
    if (err instanceof ORPCError) throw err;
    // Never log payloads, tokens, or student information.
    console.error(`[google] ${action} failed`);
    throw new ORPCError("SERVICE_UNAVAILABLE", { message: "We couldn't confirm the Google connection. Please retry; no confirmation has been issued." });
  }
}
