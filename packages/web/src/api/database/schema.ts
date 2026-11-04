import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * Leads captured from the website: "Book a call" requests and chat messages.
 * Apply schema changes with `bun run db:push` (from packages/web).
 */
export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type", { enum: ["booking", "chat"] }).notNull(),
  name: text("name").notNull(),
  phone: text("phone"),
  classType: text("class_type"),
  preferredDay: text("preferred_day"),
  preferredTime: text("preferred_time"),
  message: text("message"),
  status: text("status", { enum: ["new", "contacted"] })
    .notNull()
    .default("new"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Booking key is a SHA-256 hash of a private cancellation/idempotency token.
export const demoReservations = sqliteTable("demo_reservations", {
  id: text("id").primaryKey(),
  start: text("start").notNull(),
  names: text("names").notNull(),
  email: text("email").notNull(),
  status: text("status").notNull().default("pending"),
  eventId: text("event_id"),
  sheetSynced: integer("sheet_synced", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const checkinSessions = sqliteTable("checkin_sessions", {
  id: text("id").primaryKey(),
  token: text("token").notNull().unique(),
  label: text("label").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  closed: integer("closed", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const attendanceRecords = sqliteTable("attendance_records", {
  // session + normalized name hash: database-level duplicate protection.
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  name: text("name").notNull(),
  sheetSynced: integer("sheet_synced", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});
