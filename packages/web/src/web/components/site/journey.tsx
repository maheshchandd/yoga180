import { useState } from "react";
import { journey, site } from "../../content/site";
import { Lightbox } from "./lightbox";

const facts = [
  { k: "School", v: "World Peace Yoga School" },
  { k: "Training", v: "200 hours · Hatha & Ashtanga" },
  { k: "Yoga Alliance", v: `RYT 200 · ID ${site.certification.yaId}` },
];

export function Journey() {
  const [active, setActive] = useState<{ src: string; alt: string } | null>(null);
  const f = journey.feature;

  return (
    <section id="journey" className="bg-ink py-24 text-white md:py-36">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/20 pb-8">
          <div>
            <p className="label reveal text-white/60">Her journey</p>
            <h2
              className="reveal mt-6 text-[clamp(36px,4.8vw,64px)] font-bold leading-[1] tracking-[-0.02em]"
              style={{ ["--d" as string]: "80ms" }}
            >
              Rishikesh, India. <span className="font-normal italic text-white/80">Where it all began.</span>
            </h2>
          </div>
          <p className="label reveal text-white/60" style={{ ["--d" as string]: "140ms" }}>
            On the banks of the Ganga
          </p>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-10">
          <figure className="reveal md:col-span-7">
            <button
              onClick={() => setActive(f)}
              className="group block w-full cursor-zoom-in overflow-hidden"
              aria-label="Enlarge photo"
            >
              <img
                src={f.src}
                alt={f.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
              />
            </button>
            <figcaption className="label mt-4 text-white/60">{f.caption}</figcaption>
          </figure>

          <div className="flex flex-col justify-center md:col-span-5">
            <div
              className="reveal space-y-5 text-[16px] leading-[1.75] text-white/75"
              style={{ ["--d" as string]: "120ms" }}
            >
              <p>
                Asha travelled to Rishikesh — the birthplace of yoga — for a 200-hour Hatha
                and Ashtanga teacher training at World Peace Yoga School.
              </p>
              <p>
                Staying in a simple hostel, she rose before dawn to practise on the
                ghats of the Ganga. Her classmates came from all over the world and from every walk of
                life — and that shared practice taught her that yoga truly is for every body.
              </p>
            </div>

            <dl className="reveal mt-10 border-t border-white/20" style={{ ["--d" as string]: "200ms" }}>
              {facts.map((x) => (
                <div key={x.k} className="grid grid-cols-[130px_1fr] gap-4 border-b border-white/20 py-4">
                  <dt className="label text-white/50">{x.k}</dt>
                  <dd className="text-[14px] font-medium text-white">{x.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-12">
          <figure className="reveal md:col-span-8">
            <button
              onClick={() => setActive(journey.batch)}
              className="group block w-full cursor-zoom-in overflow-hidden"
              aria-label="Enlarge: teacher-training batch photo"
            >
              <img
                src={journey.batch.src}
                alt={journey.batch.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.02] md:aspect-auto md:h-[560px]"
              />
            </button>
            <figcaption className="label mt-4 text-white/60">{journey.batch.caption}</figcaption>
          </figure>
          <figure className="reveal md:col-span-4" style={{ ["--d" as string]: "100ms" }}>
            <button
              onClick={() => setActive(journey.friends)}
              className="group block w-full cursor-zoom-in overflow-hidden"
              aria-label="Enlarge: practising with friends"
            >
              <img
                src={journey.friends.src}
                alt={journey.friends.alt}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-[1.02] md:aspect-auto md:h-[560px]"
              />
            </button>
            <figcaption className="label mt-4 text-white/60">{journey.friends.caption}</figcaption>
          </figure>
        </div>

        <div className="-mx-6 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [scrollbar-width:none]">
          {journey.photos.map((p, i) => (
            <figure
              key={p.src}
              className="reveal w-[68%] shrink-0 snap-start sm:w-[42%] md:w-auto"
              style={{ ["--d" as string]: `${i * 70}ms` }}
            >
              <button
                onClick={() => setActive(p)}
                className="group block w-full cursor-zoom-in overflow-hidden"
                aria-label={`Enlarge: ${p.caption}`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </button>
              <figcaption className="mt-3 text-[13px] leading-snug text-white/60">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <Lightbox src={active?.src ?? null} alt={active?.alt} onClose={() => setActive(null)} />
    </section>
  );
}
