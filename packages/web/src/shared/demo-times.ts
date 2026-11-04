export const ZONE = "America/Toronto";
export const DEMO_MINUTES = 60;
const fmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: ZONE, year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", hourCycle: "h23", weekday: "short",
});
export function torontoParts(date: Date) {
  return Object.fromEntries(fmt.formatToParts(date).map((p) => [p.type, p.value]));
}
export function dateKey(date: Date) {
  const p = torontoParts(date); return `${p.year}-${p.month}-${p.day}`;
}
export function allowedStart(start: string, now = new Date()) {
  const d = new Date(start);
  if (!Number.isFinite(d.getTime()) || d.getSeconds() || d.getMilliseconds()) return false;
  if (d.getTime() < now.getTime() + 12 * 3600_000 || d.getTime() > now.getTime() + 30 * 86400_000) return false;
  const p = torontoParts(d);
  return ["Sat", "Sun"].includes(p.weekday)
    ? p.minute === "30" && ["07", "08"].includes(p.hour)
    : p.minute === "00" && ["06", "07", "17", "18", "19"].includes(p.hour);
}
// Construct Toronto wall-clock slots via UTC scanning: no guessed UTC offset,
// and DST transitions are handled by Intl's IANA timezone data.
export function candidateSlots(now = new Date()) {
  const slots: string[] = [];
  let ms = Math.ceil(now.getTime() / 1800_000) * 1800_000;
  for (; ms <= now.getTime() + 30 * 86400_000; ms += 1800_000) {
    const iso = new Date(ms).toISOString();
    if (allowedStart(iso, now)) slots.push(iso);
  }
  return slots;
}
