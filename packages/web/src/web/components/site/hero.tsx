import { ArrowDown, Phone } from "lucide-react";
import { site, telLink, whatsappLink } from "../../content/site";
import { Stars, WhatsAppIcon } from "./icons";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-white">
      <img
        src="/images/asha-boat.jpg"
        alt="Asha Panchal in boat pose on her yoga mat"
        className="bw slowzoom absolute inset-0 h-full w-full object-cover object-[30%_center]"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40" />

      <div className="wrap relative grid w-full pb-24 pt-32 md:grid-cols-12 md:pb-20">
        <div className="hidden flex-col justify-end md:col-span-5 md:flex">
          <p className="label rise text-white/70" style={{ ["--d" as string]: "900ms" }}>
            Hatha · Ashtanga · Private · Live online
          </p>
        </div>
        <div
          className="rise relative border border-white/35 p-7 backdrop-blur-[2px] sm:p-10 md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7 lg:p-12"
          style={{ ["--d" as string]: "200ms" }}
        >
          <p className="label text-white/75">Certified yoga teacher · {site.area}</p>
          <h1 className="mt-6 text-[clamp(56px,9vw,104px)] font-extrabold leading-[0.9] tracking-[-0.03em]">
            YOGA180
          </h1>
          <p className="mt-2 text-[clamp(30px,4.4vw,52px)] font-normal italic leading-[1.05] tracking-[-0.01em] text-white/90">
            with Asha Panchal
          </p>
          <p className="mt-6 max-w-[440px] text-[15px] leading-[1.7] text-white/75">
            Small-group, private and live online yoga — in a calm Brampton home studio or from your own living room. Clear guidance, your own pace.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#demo" className="btn btn-primary">
              Book a demo
            </a>
            <a
              href={whatsappLink("Hi Asha! I found Yoga180 online and would like to know more about your classes.")}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost-light"
            >
              <WhatsAppIcon /> WhatsApp
            </a>
            <a href={telLink} className="btn btn-ghost-light">
              <Phone size={14} strokeWidth={1.75} /> Call
            </a>
          </div>
          <div className="mt-10 flex items-end justify-between">
            <a
              href={site.googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="label flex items-center gap-3 text-white/80 hover:text-white"
            >
              <Stars className="text-white" /> {site.googleRating.toFixed(1)} · {site.googleReviewCount} Google reviews
            </a>
            <a href="#about" aria-label="Scroll down" className="text-white/80 hover:text-white">
              <ArrowDown size={20} strokeWidth={1.25} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
