import { createRouterClient } from '../packages/web/node_modules/@orpc/server/dist/index.mjs';
import { router } from '../packages/web/src/api';
import { db } from '../packages/web/src/api/database';
import { attendanceRecords, checkinSessions } from '../packages/web/src/api/database/schema';
import { eq } from '../packages/web/node_modules/drizzle-orm/index.js';
import { strict as assert } from 'node:assert';
const client=createRouterClient(router,{context:{headers:new Headers({'x-forwarded-for':'test-qr'})}});
const password=process.env.ADMIN_PASSWORD!;
const s=await client.attendance.open({password,label:'QA ONLY — DELETE',minutes:30});
try {
 const session=await client.attendance.session({token:s.token}); assert.equal(session.label,'QA ONLY — DELETE');
 const [a,b]=await Promise.all([client.attendance.checkin({token:s.token,name:'QA Student'}),client.attendance.checkin({token:s.token,name:'qa   student'})]);
 assert.equal(a.saved,true);assert.equal(b.saved,true);assert.equal(Number(a.duplicate)+Number(b.duplicate),1);assert.equal(a.synced,false);
 await client.attendance.close({password,id:s.id});
 await assert.rejects(()=>client.attendance.checkin({token:s.token,name:'Other Student'}));
 await assert.rejects(()=>client.attendance.admin({password:'wrong'}));
 assert.equal((await client.demos.availability()).configured,false);
 await assert.rejects(()=>client.demos.book({token:'a'.repeat(64),start:new Date().toISOString(),names:['Student'],email:'test@example.com'}));
 console.log('PASS: name-only check-in, simultaneous duplicate protection, closed token rejection, admin guard, disconnected Calendar gate');
} finally {
 await db.delete(attendanceRecords).where(eq(attendanceRecords.sessionId,s.id));
 await db.delete(checkinSessions).where(eq(checkinSessions.id,s.id));
}
