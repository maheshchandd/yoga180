import { site } from "./site";

export const demoMessage = "Hi Asha! I'd like to book a demo class. Could you share your available times?";
export const attendanceMessage = "I am here for the class.";
// Static SMS QR payload: no URL, student data, session token or timestamp.
export const attendanceQrPayload = `SMSTO:${site.phoneE164}:${attendanceMessage}`;

// Messaging-app URL conventions differ on iOS and Android.
export function messageLink(text: string) {
  const ios = typeof navigator !== "undefined" && (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
  return `sms:${site.phoneE164}${ios ? "&" : "?"}body=${encodeURIComponent(text)}`;
}