import { timingSafeEqual, createHash } from "node:crypto";
import { ORPCError } from "@orpc/server";
export const hash = (text: string) => createHash("sha256").update(text).digest("hex");
export function assertAdmin(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !timingSafeEqual(Buffer.from(hash(password)), Buffer.from(hash(expected)))) {
    throw new ORPCError("UNAUTHORIZED", { message: "Wrong password" });
  }
}
const hits = new Map<string, number[]>();
export function throttle(headers: Headers, scope: string, max = 20) {
  const ip = headers.get("cf-connecting-ip") ?? headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const key = `${scope}:${ip}`; const now = Date.now();
  if (hits.size > 10_000) for (const [k, h] of hits) if ((h.at(-1) ?? 0) < now - 600_000) hits.delete(k);
  const recent = (hits.get(key) ?? []).filter((t) => t > now - 600_000);
  if (recent.length >= max) throw new ORPCError("TOO_MANY_REQUESTS", { message: "Please wait a few minutes before trying again." });
  recent.push(now); hits.set(key, recent);
}
