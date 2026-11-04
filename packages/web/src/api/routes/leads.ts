import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { ORPCError } from "@orpc/server";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";
import { pushLeadToSheet } from "../lib/sheets";
import { assertAdmin } from "../lib/guards";

// Simple in-memory rate limit: max 6 submissions / 10 min per client IP.
const hits = new Map<string, number[]>();
function rateLimit(headers: Headers) {
  const ip =
    headers.get("cf-connecting-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 6) {
    throw new ORPCError("TOO_MANY_REQUESTS", {
      message: "Too many requests — please message on WhatsApp directly.",
    });
  }
  recent.push(now);
  hits.set(ip, recent);
}

const optional = (max: number) => z.string().trim().max(max).optional();

export const leads = {
  create: base
    .input(
      z.object({
        type: z.enum(["booking", "chat"]),
        name: z.string().trim().min(1, "Please enter your name").max(80),
        phone: optional(30),
        classType: optional(80),
        preferredDay: optional(40),
        preferredTime: optional(40),
        message: optional(1000),
        website: z.string().optional(), // honeypot — must stay empty
      }),
    )
    .handler(async ({ input, context }) => {
      const { website, ...data } = input;
      if (website) return { ok: true as const, id: 0 };
      rateLimit(context.headers);
      const [row] = await db.insert(schema.leads).values(data).returning();
      await pushLeadToSheet(row);
      return { ok: true as const, id: row.id };
    }),

  list: base
    .input(z.object({ password: z.string() }))
    .handler(async ({ input }) => {
      assertAdmin(input.password);
      return db.select().from(schema.leads).orderBy(desc(schema.leads.createdAt)).limit(500);
    }),

  setStatus: base
    .input(
      z.object({
        password: z.string(),
        id: z.number(),
        status: z.enum(["new", "contacted"]),
      }),
    )
    .handler(async ({ input }) => {
      assertAdmin(input.password);
      await db
        .update(schema.leads)
        .set({ status: input.status })
        .where(eq(schema.leads.id, input.id));
      return { ok: true as const };
    }),
};
