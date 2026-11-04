import { randomBytes, randomUUID } from "node:crypto";
import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { ORPCError } from "@orpc/server";
import { base } from "../__core/app";
import { db } from "../database";
import { attendanceRecords, checkinSessions } from "../database/schema";
import { assertAdmin, hash, throttle } from "../lib/guards";
import { googleAction, googleConfigured } from "../lib/google-bridge";
async function sessionFor(token: string) {
  const [s] = await db.select().from(checkinSessions).where(eq(checkinSessions.token, token));
  if (!s || s.closed || s.expiresAt.getTime() <= Date.now()) throw new ORPCError("NOT_FOUND", { message: "This check-in is closed or has expired. Please ask Asha for the current QR code." });
  return s;
}
async function syncRecord(record: typeof attendanceRecords.$inferSelect, label: string) {
  if (record.sheetSynced || !googleConfigured()) return record.sheetSynced;
  try {
    await googleAction("attendance", { id: record.id, sessionId: record.sessionId, label, name: record.name, timestamp: record.createdAt.toISOString() }, z.object({ synced: z.literal(true) }));
    await db.update(attendanceRecords).set({ sheetSynced: true }).where(eq(attendanceRecords.id, record.id));
    return true;
  } catch { return false; }
}
const token = z.string().regex(/^[a-f0-9]{64}$/);
export const attendance = {
  session: base.input(z.object({ token })).handler(async ({ input }) => {
    const s = await sessionFor(input.token); return { label: s.label, expiresAt: s.expiresAt };
  }),
  checkin: base.input(z.object({ token, name: z.string().trim().min(2).max(80), website: z.string().max(0).optional() })).handler(async ({ input, context }) => {
    throttle(context.headers, "checkin", 60); const s = await sessionFor(input.token);
    const normalized = input.name.normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase("en-CA");
    const id = hash(`${s.id}:${normalized}`);
    const inserted = await db.insert(attendanceRecords).values({ id, sessionId: s.id, name: input.name }).onConflictDoNothing().returning();
    const [r] = await db.select().from(attendanceRecords).where(eq(attendanceRecords.id, id));
    return { saved: true, duplicate: inserted.length === 0, synced: await syncRecord(r, s.label), name: r.name };
  }),
  open: base.input(z.object({ password: z.string(), label: z.string().trim().min(2).max(80), minutes: z.number().int().min(15).max(180) })).handler(async ({ input }) => {
    assertAdmin(input.password);
    await db.update(checkinSessions).set({ closed: true }).where(eq(checkinSessions.closed, false));
    const [s] = await db.insert(checkinSessions).values({ id: randomUUID(), token: randomBytes(32).toString("hex"), label: input.label, expiresAt: new Date(Date.now() + input.minutes * 60_000) }).returning(); return s;
  }),
  close: base.input(z.object({ password: z.string(), id: z.string() })).handler(async ({ input }) => {
    assertAdmin(input.password); await db.update(checkinSessions).set({ closed: true }).where(eq(checkinSessions.id, input.id)); return { ok: true };
  }),
  admin: base.input(z.object({ password: z.string() })).handler(async ({ input }) => {
    assertAdmin(input.password); return { configured: googleConfigured(), sessions: await db.select().from(checkinSessions).orderBy(desc(checkinSessions.createdAt)).limit(50), records: await db.select().from(attendanceRecords).orderBy(desc(attendanceRecords.createdAt)).limit(500) };
  }),
  sync: base.input(z.object({ password: z.string() })).handler(async ({ input }) => {
    assertAdmin(input.password);
    if (!googleConfigured()) throw new ORPCError("SERVICE_UNAVAILABLE", { message: "Connect the Google Apps Script first." });
    const pending = await db.select().from(attendanceRecords).where(eq(attendanceRecords.sheetSynced, false)).limit(30); let synced = 0;
    for (const r of pending) {
      const [s] = await db.select().from(checkinSessions).where(eq(checkinSessions.id, r.sessionId));
      if (s && await syncRecord(r, s.label)) synced++;
    }
    return { synced, attempted: pending.length };
  }),
};
