import { LoopVideo } from "./loop-video";
import { Laptop, MonitorPlay, MapPinOff } from "lucide-react";
import { whatsappLink } from "../../content/site";
import { WhatsAppIcon } from "./icons";

const points = [
  { icon: MonitorPlay, title: "Live, not recorded", text: "Real-time classes by video call — Asha sees you and guides your alignment." },
  { icon: MapPinOff, title: "From anywhere", text: "Practice from home, while travelling, or anywhere outside Brampton." },
  { icon: Laptop, title: "Simple setup", text: "A mat and a phone, tablet or laptop. We'll send the link before class." },
];

export function Online() {
  return (
    <section id="online" className="bg-white py-24 md:py-36">
      <div className="wrap grid items-center gap-14 md:grid-cols-12 md:gap-10">
        <div className="reveal md:col-span-5">
          <div className="relative mx-auto max-w-[420px] overflow-hidden">
            <LoopVideo
              src="/videos/online-class.mp4"
              poster="/images/online-class-poster.jpg"
              className="aspect-[9/16] w-full bg-soft object-cover"
              label="Short clip of Asha teaching a live online class from her studio"
            />
            <span className="label absolute left-4 top-4 flex items-center gap-2 bg-white px-3 py-2 text-ink">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" /> Live online class
            </span>
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="label reveal text-mid">Virtual classes</p>
          <h2
            className="reveal mt-6 text-[clamp(36px,4.4vw,56px)] font-bold leading-[1] tracking-[-0.02em]"
            style={{ ["--d" as string]: "80ms" }}
          >
            Live online, <span className="font-normal italic">wherever you are.</span>
          </h2>
          <p className="reveal mt-6 text-[16px] leading-[1.75] text-mid" style={{ ["--d" as string]: "140ms" }}>
            Can't make it to the studio? Join Asha's classes live from your own living room — the same clear
            cues and personal attention, without the commute.
          </p>
          <div className="reveal mt-10 border-t border-hair" style={{ ["--d" as string]: "200ms" }}>
            {points.map((p) => (
              <div key={p.title} className="flex gap-4 border-b border-hair py-5">
                <p.icon size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-teal" />
                <div>
                  <p className="label font-semibold text-ink">{p.title}</p>
                  <p className="mt-1.5 text-[14px] leading-[1.65] text-mid">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal mt-10 flex flex-wrap gap-3" style={{ ["--d" as string]: "260ms" }}>
            <a
              href={whatsappLink("Hi Asha! I'm interested in your live online yoga classes. Could you share the timings and how to join?")}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              <WhatsAppIcon /> Join online
            </a>
            <a href="#book" className="btn btn-ghost-dark">
              Book a call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
