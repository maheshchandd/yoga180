import { useState } from "react";
import { Copy, MessageSquare } from "lucide-react";
import { site } from "../content/site";
import { attendanceMessage, messageLink } from "../content/messaging";

export function AttendanceText() {
  const [notice, setNotice] = useState("");
  async function copy(text: string, label: string) {
    try { await navigator.clipboard.writeText(text); setNotice(`${label} copied.`); }
    catch { setNotice("Copy isn't available here. Select the number or message above and copy it manually."); }
  }
  return <>
    <p className="label text-mid">Text to {site.phoneDisplay}</p>
    <p className="mt-4 border-l-2 border-teal pl-4 text-xl leading-relaxed">{attendanceMessage}</p>
    <a className="btn btn-primary mt-8 w-full" href={messageLink(attendanceMessage)}><MessageSquare size={16} />Open text message</a>
    <p className="mt-4 text-sm leading-relaxed text-mid">Tap Send in your messages app. This website does not send or record your attendance.</p>
    <div className="mt-6 flex flex-wrap gap-5">
      <button className="label flex items-center gap-2 underline" onClick={() => void copy(site.phoneE164, "Number")}><Copy size={13} />Copy number</button>
      <button className="label flex items-center gap-2 underline" onClick={() => void copy(attendanceMessage, "Message")}><Copy size={13} />Copy message</button>
    </div>
    <p aria-live="polite" className="mt-3 text-xs text-mid">{notice}</p>
    <p className="mt-4 text-xs leading-relaxed text-mid">If your text app doesn't open, use the number and message above. Standard messaging charges may apply.</p>
  </>;
}