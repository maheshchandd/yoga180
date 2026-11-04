import { site, whatsappLink } from "../content/site";
import { messageLink } from "../content/messaging";
export default function CancelDemoPage() {
  const message = "Hi Asha! I'd like to change or cancel my demo class. Could you help?";
  return <main className="flex min-h-screen items-center justify-center bg-soft p-6"><div className="w-full max-w-lg border border-hair bg-white p-8">
    <a href="/" className="label">Yoga180</a><h1 className="mt-8 text-3xl font-bold">Talk to Asha about your demo.</h1>
    <p className="mt-6 text-sm leading-relaxed text-mid">Demo bookings, changes and cancellations are handled directly by Asha at {site.phoneDisplay}. This page does not cancel a class automatically.</p>
    <div className="mt-8 flex flex-wrap gap-3"><a href={whatsappLink(message)} target="_blank" rel="noreferrer" className="btn btn-primary">WhatsApp</a><a href={messageLink(message)} className="btn btn-ghost-dark">Text Asha</a></div>
    <a href="/#demo" className="label mt-8 block underline">Back to demo classes</a>
  </div></main>;
}
