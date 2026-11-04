import { db } from '../packages/web/src/api/database';
import { attendanceRecords, checkinSessions } from '../packages/web/src/api/database/schema';
import { eq } from '../packages/web/node_modules/drizzle-orm/index.js';

// Delete only test sessions created by browser-check.py, never studio records.
const sessions = await db.select().from(checkinSessions).where(eq(checkinSessions.label, 'QA BROWSER — DELETE'));
for (const session of sessions) {
  await db.delete(attendanceRecords).where(eq(attendanceRecords.sessionId, session.id));
  await db.delete(checkinSessions).where(eq(checkinSessions.id, session.id));
}
console.log(`Removed ${sessions.length} browser QA sessions and their test attendance.`);