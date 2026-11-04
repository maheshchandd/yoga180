import { test, expect } from "bun:test";
import vm from "node:vm";
import { readFileSync } from "node:fs";
import { candidateSlots, allowedStart, torontoParts } from "../packages/web/src/shared/demo-times";

function mockGoogle() {
  const rows = new Map<string, any[][]>(); const events: any[]=[];
  let failRows=false; let failDelete=false;
  class Sheet {
    constructor(public name:string){if(!rows.has(name))rows.set(name,[]);}
    getLastRow(){return rows.get(this.name)!.length;}
    appendRow(row:any[]){if(failRows&&this.name==="Demo Bookings")throw Error('outage');rows.get(this.name)!.push(row);}
    setFrozenRows(){}
    getRange(row:number,col:number,n=1,m=1){const name=this.name;return {setFontWeight(){},getValues(){return rows.get(name)!.slice(row-1,row-1+n).map(r=>r.slice(col-1,col-1+m));},setValues(values:any[][]){if(failRows)throw Error('outage');for(let i=0;i<n;i++){const r=rows.get(name)![row-1+i];for(let j=0;j<m;j++)r[col-1+j]=values[i][j];}},setValue(v:any){rows.get(name)![row-1][col-1]=v;}};}
  }
  const sheets=new Map<string,Sheet>(); const spreadsheet={getSheetByName:(n:string)=>sheets.get(n),insertSheet:(n:string)=>{const s=new Sheet(n);sheets.set(n,s);return s;}};
  class Event {
    tags:any={};id=crypto.randomUUID();deleted=false;transparency="opaque";
    constructor(public a:Date,public b:Date){}
    getStartTime(){return this.a;}getEndTime(){return this.b;}getTag(k:string){return this.tags[k]??'';}setTag(k:string,v:string){this.tags[k]=v;}
    getId(){return this.id;}isAllDayEvent(){return false;}getTransparency(){return this.transparency;}setTransparency(t:string){this.transparency=t;}
    setVisibility(){}setDescription(){}deleteEvent(){if(failDelete)throw Error('outage');this.deleted=true;}
  }
  const cal={getEvents:(a:Date,b:Date)=>events.filter(e=>!e.deleted&&e.a<b&&e.b>a),createEvent:(_t:string,a:Date,b:Date)=>{const e=new Event(a,b);events.push(e);return e;}};
  const ctx=vm.createContext({Date,JSON,Math,Object,String,Array,isFinite,Error,
    PropertiesService:{getScriptProperties:()=>({getProperty:(k:string)=>k==='BRIDGE_SECRET'?'test-secret':'sheet'})},
    SpreadsheetApp:{openById:()=>spreadsheet},
    CalendarApp:{getCalendarById:()=>cal,Visibility:{PRIVATE:'private'},EventTransparency:{OPAQUE:'opaque',TRANSPARENT:'transparent'}},
    Utilities:{formatDate:(date:Date,_tz:string,pattern:string)=>{
      const p=torontoParts(date); if(pattern==='EEE')return p.weekday;if(pattern==='HH:mm')return `${p.hour}:${p.minute}`;
      if(pattern==='yyyy-MM-dd')return `${p.year}-${p.month}-${p.day}`;return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}`;
    }},
    LockService:{getScriptLock:()=>({tryLock:()=>true,hasLock:()=>true,releaseLock(){}})},
    ContentService:{MimeType:{JSON:'json'},createTextOutput:(s:string)=>({text:s,setMimeType(){return this;}})},
  });
  vm.runInContext(readFileSync('/home/user/yoga180-google/Code.gs','utf8'),ctx);
  const call=(action:string,data:any={},secret='test-secret')=>JSON.parse((ctx.doPost as any)({postData:{contents:JSON.stringify({...data,action,secret})}}).text);
  return {call,events,rows,setFailRows:(v:boolean)=>{failRows=v;},setFailDelete:(v:boolean)=>{failDelete=v;},busy:(s:string)=>events.push(new Event(new Date(s),new Date(new Date(s).getTime()+3600000)))};
}
test('Toronto schedule handles DST and 12-hour lead time',()=>{
 const now=new Date('2026-10-20T00:00:00Z');const slots=candidateSlots(now);
 expect(slots.some(s=>s==='2026-10-30T10:00:00.000Z')).toBe(true);
 expect(slots.some(s=>s==='2026-11-02T11:00:00.000Z')).toBe(true);
 expect(allowedStart('2026-10-20T10:00:00.000Z',now)).toBe(false);
 expect(allowedStart('2026-10-25T17:30:00.000Z',now)).toBe(false);
});
test('Google authorization, capacity, retries, cancellations and private availability',()=>{
 const g=mockGoogle();const start=candidateSlots()[3];
 expect(g.call('availability',{starts:[start]},'bad').ok).toBe(false);
 const a={id:'a'.repeat(64),start,names:['Alice'],email:'a@example.com'};
 const b={id:'b'.repeat(64),start,names:['Bea'],email:'b@example.com'};
 expect(g.call('book',a).ok).toBe(true);expect(g.call('book',a).ok).toBe(true);expect(g.events.length).toBe(1);
 expect(g.call('availability',{starts:[start]}).slots[0].remaining).toBe(1);
 expect(g.call('book',b).ok).toBe(true);expect(g.call('book',{...b,id:'c'.repeat(64)}).code).toBe('FULL');
 expect(g.call('availability',{starts:[start]}).slots).toEqual([]);
 expect(g.call('cancel',a).cancelled).toBe(true);expect(g.events[0].deleted).toBe(false);
 expect(g.call('cancel',b).cancelled).toBe(true);expect(g.events[0].deleted).toBe(true);
 expect(g.call('book',a).cancelled).toBe(true);
});
test('unrelated calendar conflict, two-person limit and safe spreadsheet cells',()=>{
 const g=mockGoogle();const start=candidateSlots()[5];g.busy(start);
 expect(g.call('book',{id:'d'.repeat(64),start,names:['Diane'],email:'d@example.com'}).code).toBe('FULL');
 const next=candidateSlots()[8];expect(g.call('book',{id:'e'.repeat(64),start:next,names:['=FORMULA','Friend'],email:'e@example.com'}).ok).toBe(true);
 expect(g.call('availability',{starts:[next]}).slots).toEqual([]);
 expect(g.rows.get('Demo Bookings')![1][2]).toStartWith("'");
});
test('Sheet outage after Calendar confirmation recovers without a duplicate event',()=>{
 const g=mockGoogle();const start=candidateSlots()[10];const a={id:'f'.repeat(64),start,names:['Faye'],email:'f@example.com'};
 g.call('reconcile',a);g.setFailRows(true);expect(g.call('book',a).sheetSynced).toBe(false);g.setFailRows(false);
 expect(g.call('book',a).sheetSynced).toBe(true);expect(g.events.length).toBe(1);
 expect(g.call('reconcile',a).found).toBe(true);
});
test('attendance retries append only one row',()=>{
 const g=mockGoogle();const a={id:'a'.repeat(64),name:'Student',label:'Morning class',sessionId:'session',timestamp:new Date().toISOString()};
 expect(g.call('attendance',a).synced).toBe(true);expect(g.call('attendance',a).synced).toBe(true);expect(g.rows.get('Attendance')!.length).toBe(2);
});
test('cancellation retry removes event after deletion fails following Sheet update',()=>{
 const g=mockGoogle();const a={id:'c'.repeat(64),start:candidateSlots()[6],names:['Casey'],email:'c@example.com'};
 expect(g.call('book',a).ok).toBe(true);g.setFailDelete(true);
 expect(g.call('cancel',a).ok).toBe(false);expect(g.events[0].deleted).toBe(false);
 g.setFailDelete(false);expect(g.call('cancel',a).cancelled).toBe(true);expect(g.events[0].deleted).toBe(true);
});
