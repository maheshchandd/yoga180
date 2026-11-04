import { useState } from "react";
import { gallery } from "../../content/site";
import { Lightbox } from "./lightbox";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="gallery" className="bg-white py-24 md:py-36">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-hair pb-8">
          <h2 className="reveal text-[clamp(36px,4.4vw,56px)] font-bold leading-none tracking-[-0.02em]">
            In practice
          </h2>
          <p className="label reveal text-mid">Studio &amp; outdoors — Brampton</p>
        </div>
        <div className="mt-12 columns-2 gap-3 sm:gap-5 lg:columns-3">
          {gallery.map((g, i) => (
            <button
              key={g.src}
              onClick={() => setActive(i)}
              className="reveal group mb-3 inline-block w-full break-inside-avoid align-top sm:mb-5"
              style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}
            >
              <span className="block overflow-hidden">
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className={`bw w-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0 ${
                  g.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              />
              </span>
              {g.caption && <span className="label mt-3 block text-left text-mid">{g.caption}</span>}
            </button>
          ))}
        </div>
      </div>
      <Lightbox
        src={active === null ? null : gallery[active].src}
        alt={active === null ? "" : gallery[active].alt}
        onClose={() => setActive(null)}
      />
    </section>
  );
}
