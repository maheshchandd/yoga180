import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, Loader2, Printer, X } from "lucide-react";
import { site } from "../content/site";
import { attendanceMessage, attendanceQrPayload } from "../content/messaging";

export function AdminAttendance() {
  const [qr, setQr] = useState("");
  const [error, setError] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    let live = true;
    void QRCode.toDataURL(attendanceQrPayload, { width: 1200, margin: 4, errorCorrectionLevel: "M" }).then(value => { if (live) setQr(value); }).catch(() => { if (live) setError("Couldn't generate the QR. Refresh to try again."); });
    return () => { live = false; };
  }, []);
  return <section className="mb-12 mt-8 border border-hair bg-white p-5 sm:p-8">
    <p className="label text-teal">A simple text to Asha</p><h2 className="mt-3 text-2xl font-bold">Text attendance QR</h2>
    <p className="mt-4 text-sm leading-relaxed text-mid">One reusable code for every class. Students scan it to open a text, then tap Send. No name entry, expiry or website attendance log.</p>
    <div className="mt-6 grid gap-6 sm:grid-cols-[200px_1fr]">
      {qr ? <img src={qr} alt="Reusable SMS attendance QR code" className="w-[200px]" /> : error ? <p role="alert" className="text-sm text-red-700">{error}</p> : <Loader2 className="animate-spin text-teal" />}
      <div><p className="label text-mid">To {site.phoneDisplay}</p><p className="mt-3 text-lg">{attendanceMessage}</p>
        <div className="mt-6 flex flex-wrap gap-3"><button disabled={!qr} className="btn btn-primary disabled:opacity-40" onClick={() => dialog.current?.showModal()}>Display / print QR</button>{qr && <a download="yoga180-attendance-qr.png" href={qr} className="btn btn-ghost-dark"><Download size={14} />Download QR</a>}</div>
        <a href="/check-in" className="mt-5 block text-sm text-teal underline" target="_blank" rel="noreferrer">Open text fallback page</a>
        <p className="mt-4 text-xs leading-relaxed text-mid">If a phone camera cannot open an SMS QR, use the fallback page or text the number above. Receiving the text happens in Asha's messaging app, not this inbox.</p>
      </div>
    </div>
    <dialog ref={dialog} aria-label="Attendance QR display" className="qr-print fixed inset-0 m-0 h-[100svh] max-h-none w-full max-w-none bg-white p-6 text-center backdrop:bg-black/40">
      <div className="no-print absolute right-4 top-4 flex gap-4"><button className="btn btn-ghost-dark" onClick={() => window.print()}><Printer size={16} />Print</button><button aria-label="Close QR display" onClick={() => dialog.current?.close()}><X /></button></div>
      <div className="flex min-h-full flex-col items-center justify-center pt-12 sm:pt-0"><p className="label text-mid">Yoga180 · Student attendance</p>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Here for the class?<br/><span className="font-normal italic">Send Asha a text.</span></h2>
        {qr && <img src={qr} alt="Scan to open an attendance text" className="mt-4 w-full max-w-[440px]" />}
        <p className="text-xl font-semibold">Scan to open a text. Tap Send.</p><p className="mt-3 text-sm">{attendanceMessage}</p><p className="mt-3 text-sm text-mid">{site.phoneDisplay}</p>
      </div>
    </dialog>
  </section>;
}
