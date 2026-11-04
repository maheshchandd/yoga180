import { QrCode } from "lucide-react";
import { AttendanceText } from "../attendance-text";

export function Attendance() {
  return <section id="attendance" className="border-t border-hair bg-white py-24 md:py-28">
    <div className="wrap">
      <p className="label flex items-center gap-2 text-teal"><QrCode size={15} />Student attendance</p>
      <h2 className="mt-5 text-[clamp(38px,4.6vw,60px)] font-bold leading-tight tracking-[-0.02em]">Here for class?<br /><span className="font-normal italic">Let Asha know.</span></h2>
      <div className="mt-10 grid items-center gap-10 md:grid-cols-2 md:gap-20">
        <div className="border border-hair p-5 text-center sm:p-8">
          <img src="/images/attendance-qr.png" alt="Scan to open a text to Asha saying: I am here for the class." width={1600} height={1600} loading="lazy" className="mx-auto w-full max-w-[320px]" />
          <p className="mt-3 text-lg font-semibold">Scan to open a text. Tap Send.</p>
          <p className="mt-3 text-sm text-mid">Already on your phone? Use the text button instead.</p>
        </div>
        <div><AttendanceText /></div>
      </div>
    </div>
  </section>;
}