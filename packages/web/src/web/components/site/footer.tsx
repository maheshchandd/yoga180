import { Phone } from "lucide-react";
import { site, telLink, whatsappLink } from "../../content/site";
import { WhatsAppIcon } from "./icons";

export function Footer() {
  const socials = [
    { label: "Google", href: site.googleReviewsUrl },
    { label: "WhatsApp", href: whatsappLink("Hi Asha!") },
    { label: "Instagram", href: site.social.instagram },
    { label: "Facebook", href: site.social.facebook },
    { label: "YouTube", href: site.social.youtube },
  ].filter((s) => s.href);

  return (
    <footer className="bg-ink pb-28 pt-20 text-white md:pb-12">
      <div className="wrap">
        <div className="grid gap-12 border-b border-white/15 pb-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-[clamp(44px,6vw,80px)] font-extrabold leading-none tracking-[-0.03em]">
              YOGA<span className="font-normal text-white/50">180</span>
            </p>
            <p className="mt-5 max-w-sm text-[15px] leading-[1.7] text-white/60">
              Hatha &amp; Ashtanga yoga in Brampton with {site.teacher}, Yoga Alliance certified teacher.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="label text-white/45">Visit</p>
            <p className="mt-4 text-[15px] leading-[1.7] text-white/85">{site.address}</p>
          </div>
          <div className="md:col-span-3">
            <p className="label text-white/45">Contact</p>
            <a href={telLink} className="mt-4 flex items-center gap-2 text-[15px] text-white/85 hover:text-white">
              <Phone size={14} /> {site.phoneDisplay}
            </a>
            <a
              href={whatsappLink("Hi Asha!")}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center gap-2 text-[15px] text-white/85 hover:text-white"
            >
              <WhatsAppIcon size={15} /> WhatsApp
            </a>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between gap-6 pt-8 md:flex-row md:items-center">
          <p className="text-[12px] text-white/45">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-7">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="label text-white/60 hover:text-white">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-ink text-white md:hidden">
      <a href={telLink} className="label flex h-[64px] flex-col items-center justify-center gap-1.5">
        <Phone size={17} strokeWidth={1.5} /> Call
      </a>
      <a
        href={whatsappLink("Hi Asha! I found Yoga180 online and would like to know more about your classes.")}
        target="_blank"
        rel="noreferrer"
        className="label flex h-[64px] flex-col items-center justify-center gap-1.5 border-x border-white/10"
      >
        <WhatsAppIcon size={18} /> WhatsApp
      </a>
      <a href="#demo" className="label flex h-[64px] flex-col items-center justify-center gap-1.5 bg-teal">
        <span className="text-[16px] leading-none">→</span> Book
      </a>
    </div>
  );
}
