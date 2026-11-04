import { CalendarDays, MessageSquare, Users, Clock } from "lucide-react";
import { site, whatsappLink } from "../../content/site";
import { demoMessage, messageLink } from "../../content/messaging";
import { WhatsAppIcon } from "./icons";

export function DemoBooking() {
  return <section id="demo" className="bg-white py-24 md:py-36">
    <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
      <div className="reveal md:col-span-5">
        <p className="label flex items-center gap-2 text-mid"><CalendarDays size={15} className="text-teal" /> Your first class</p>
        <h2 className="mt-6 text-[clamp(38px,4.6vw,60px)] font-bold leading-[1] tracking-[-0.02em]">A little time.<br /><span className="font-normal italic">A fresh start.</span></h2>
        <p className="mt-6 text-[16px] leading-[1.75] text-mid">Try a demo class with Asha. Come as you are — no yoga experience needed.</p>
        <div className="mt-10 border-t border-hair">
          {[{ icon: Clock, title: "60 minutes", text: "A gentle introduction to your practice." }, { icon: Users, title: "Small-group demos", text: "Come on your own, or ask about bringing a friend." }, { icon: MessageSquare, title: "A personal welcome", text: "Asha will share available times and confirm your class." }].map(p => <div key={p.title} className="flex gap-4 border-b border-hair py-5"><p.icon size={18} className="mt-1 shrink-0 text-teal" /><div><p className="label text-ink">{p.title}</p><p className="mt-2 text-[14px] text-mid">{p.text}</p></div></div>)}
        </div>
        <p className="mt-8 text-[14px] leading-relaxed text-mid">{site.address}</p>
      </div>
      <div className="reveal md:col-span-7">
        <div className="border border-hair bg-soft p-6 sm:p-10">
          <p className="label text-mid">Book a demo class</p>
          <h3 className="mt-6 text-3xl font-bold">Let's find your time.</h3>
          <p className="mt-5 text-[15px] leading-relaxed text-mid">Message Asha on WhatsApp or send a text. She'll help you choose a time and confirm your demo personally.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a className="btn btn-primary" href={whatsappLink(demoMessage)} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp</a>
            <a className="btn btn-ghost-dark" href={messageLink(demoMessage)}><MessageSquare size={15} /> Text Asha</a>
          </div>
          <p className="mt-6 text-sm text-mid">{site.phoneDisplay}</p>
          <p className="mt-4 text-xs leading-relaxed text-mid">Your message opens ready to send. Tap Send in your app; your class is confirmed directly by Asha.</p>
        </div>
      </div>
    </div>
  </section>;
}
