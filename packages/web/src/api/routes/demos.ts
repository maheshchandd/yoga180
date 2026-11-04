import { z } from "zod";
import { eq, desc, asc, and, or, gt } from "drizzle-orm";
import { ORPCError } from "@orpc/server";
import { base } from "../__core/app";
import { db } from "../database";
import { demoReservations } from "../database/schema";
import { hash, assertAdmin, throttle } from "../lib/guards";
import { googleAction, googleConfigured } from "../lib/google-bridge";
import { candidateSlots } from "../../shared/demo-times";

const tokenSchema = z.string().regex(/^[a-f0-9]{64}$/);
const reservationSchema = z.object({ eventId: z.string(), sheetSynced: z.boolean(), cancelled: z.boolean().optional() });
const slotSchema = z.object({ slots: z.array(z.object({ start: z.string().datetime(), remaining: z.number().int().min(0).max(2) })) });

export const demos = {
  availability: base.handler(async ({ context }) => {
    throttle(context.headers, "slots", 60);
    if (!googleConfigured()) return { configured: false, slots: [] as z.infer<typeof slotSchema>["slots"] };
    const candidates = candidateSlots();
    const data = await googleAction("availability", { starts: candidates }, slotSchema);
    const allowed = new Set(candidates);
    return { configured: true, slots: data.slots.filter((s) => allowed.has(s.start) && s.remaining > 0) };
  }),
  book: base.input(z.object({
    token: tokenSchema, start: z.string().datetime(),
    names: z.array(z.string().trim().min(2).max(80)).min(1).max(2),
    email: z.string().trim().email().max(200), website: z.string().max(0).optional(),
  })).handler(async ({ input, context }) => {
    throttle(context.headers, "book", 12);
    if (!googleConfigured()) throw new ORPCError("SERVICE_UNAVAILABLE", { message: "Calendar booking is not connected yet. Please message Asha." });
    const id = hash(input.token);
    await db.insert(demoReservations).values({ id, start: input.start, names: JSON.stringify(input.names), email: input.email }).onConflictDoNothing();
    const [row] = await db.select().from(demoReservations).where(eq(demoReservations.id, id));
    if (row.start !== input.start || row.names !== JSON.stringify(input.names) || row.email !== input.email) {
      throw new ORPCError("CONFLICT", { message: "Please retry the original booking, or start a new booking." });
    }
    if (row.status === "cancelled") throw new ORPCError("CONFLICT", { message: "This booking has been cancelled." });
    if (row.status === "confirmed") return { confirmed: true, start: row.start, names: input.names, sheetSynced: row.sheetSynced };
    // Script checks idempotency before lead-time validation, so a timeout can be recovered later.
    const remote = await googleAction("book", { id, start: input.start, names: input.names, email: input.email }, reservationSchema);
    if (remote.cancelled) throw new ORPCError("CONFLICT", { message: "This reservation has been cancelled." });
    await db.update(demoReservations).set({ status: "confirmed", eventId: remote.eventId, sheetSynced: remote.sheetSynced }).where(eq(demoReservations.id, id));
    return { confirmed: true, start: row.start, names: input.names, sheetSynced: remote.sheetSynced };
  }),
  lookup: base.input(z.object({ token: tokenSchema })).handler(async ({ input }) => {
    const [row] = await db.select().from(demoReservations).where(eq(demoReservations.id, hash(input.token)));
    if (!row) throw new ORPCError("NOT_FOUND", { message: "Booking not found." });
    return { start: row.start, names: JSON.parse(row.names) as string[], status: row.status };
  }),
  cancel: base.input(z.object({ token: tokenSchema })).handler(async ({ input, context }) => {
    throttle(context.headers, "cancel"); const id = hash(input.token);
    const [row] = await db.select().from(demoReservations).where(eq(demoReservations.id, id));
    if (!row) throw new ORPCError("NOT_FOUND", { message: "Booking not found." });
    if (row.status !== "cancelled") {
      await googleAction("cancel", { id, start: row.start }, z.object({ cancelled: z.literal(true) }));
      await db.update(demoReservations).set({ status: "cancelled" }).where(eq(demoReservations.id, id));
    }
    return { cancelled: true };
  }),
  sync: base.input(z.object({ password: z.string(), after: z.string().regex(/^[a-f0-9]{64}$/).optional() })).handler(async ({ input }) => {
    assertAdmin(input.password);
    const candidates = await db.select().from(demoReservations).where(and(
      or(eq(demoReservations.status, "pending"), and(eq(demoReservations.status, "confirmed"), eq(demoReservations.sheetSynced, false))),
      input.after ? gt(demoReservations.id, input.after) : undefined,
    )).orderBy(asc(demoReservations.id)).limit(21);
    const rows = candidates.slice(0, 20);
    let reconciled = 0;
    for (const row of rows) {
      const result = await googleAction("reconcile", { id: row.id, start: row.start }, z.object({ found: z.boolean(), cancelled: z.boolean(), eventId: z.string(), sheetSynced: z.boolean() }));
      if (result.found) {
        await db.update(demoReservations).set({ status: result.cancelled ? "cancelled" : "confirmed", eventId: result.eventId, sheetSynced: result.sheetSynced }).where(eq(demoReservations.id, row.id));
        reconciled++;
      }
    }
    return { reconciled, nextCursor: candidates.length > 20 ? rows[rows.length - 1].id : null };
  }),
  admin: base.input(z.object({ password: z.string() })).handler(async ({ input }) => {
    assertAdmin(input.password);
    return { configured: googleConfigured(), bookings: await db.select().from(demoReservations).orderBy(desc(demoReservations.createdAt)).limit(100) };
  }),
};
