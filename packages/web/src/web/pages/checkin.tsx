import { AttendanceText } from "../components/attendance-text";
export default function CheckinPage() {
  return <main className="flex min-h-[100svh] items-center justify-center bg-soft px-6 py-12"><div className="w-full max-w-md border border-hair bg-white p-7 sm:p-10">
    <a href="/" className="label">Yoga180</a>
    <p className="label mt-10 text-teal">Student attendance</p><h1 className="mt-3 text-4xl font-bold leading-tight">Here for<br/><span className="font-normal italic">your practice.</span></h1>
    <div className="mt-8"><AttendanceText /></div>
  </div></main>;
}
