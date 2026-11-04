import { ArrowUpRight } from "lucide-react";
import { site } from "../../content/site";

export function About() {
  const c = site.certification;
  return (
    <section id="about" className="bg-white py-24 md:py-36">
      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="reveal md:col-span-5">
          <div className="relative">
            <img
              src="/images/asha.jpg"
              alt="Asha Panchal in tree pose, hands at heart"
              className="bw aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-3 hidden bg-white px-5 py-4 md:block">
              <p className="label text-mid">Trained in</p>
              <p className="text-[28px] font-bold leading-none">Rishikesh</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
          <p className="label reveal text-mid">Introduction</p>
          <h2 className="reveal mt-6 text-[clamp(30px,3.6vw,46px)] font-bold leading-[1.12] tracking-[-0.015em]" style={{ ["--d" as string]: "80ms" }}>
            Yoga that meets you where you are — and gently turns things around.
          </h2>
          <div className="reveal mt-8 space-y-5 text-[16px] leading-[1.75] text-mid" style={{ ["--d" as string]: "160ms" }}>
            <p>
              Asha trained in Rishikesh, India — the birthplace of yoga — completing a 200-hour teacher
              training in Hatha and Ashtanga yoga rooted in the Yoga Sutras of Patanjali.
            </p>
            <p>
              Her classes are small, unhurried and personal. Every pose is explained clearly, with
              options for every body, so beginners feel at ease and experienced students keep growing.
              Students come for flexibility and strength — and stay for the calm, better sleep and
              lighter mind.
            </p>
          </div>
          <p className="reveal mt-8 text-[15px] italic text-ink" style={{ ["--d" as string]: "220ms" }}>
            Founder &amp; Teacher — {site.teacher}
          </p>

          <a
            href="#certificate"
            className="reveal group mt-12 grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 border border-hair p-5 text-left transition-colors hover:border-ink sm:p-6"
            style={{ ["--d" as string]: "280ms" }}
          >
            <img
              src="/images/certificate-flat.jpg"
              alt=""
              className="h-16 w-24 object-cover grayscale transition group-hover:grayscale-0"
              loading="lazy"
            />
            <div>
              <p className="label text-teal">Certified · {c.standard}</p>
              <p className="mt-1.5 text-[15px] font-bold leading-snug">{c.title}</p>
              <p className="mt-0.5 text-[13px] text-mid">
                {c.school} · {c.styles} · YA ID {c.yaId}
              </p>
            </div>
            <ArrowUpRight size={18} strokeWidth={1.5} className="text-mid transition group-hover:text-ink" />
          </a>
        </div>
      </div>
    </section>
  );
}
