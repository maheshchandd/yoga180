import { classes, whatsappLink } from "../../content/site";

export function Classes() {
  return (
    <section id="classes" className="bg-soft py-24 md:py-36">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-hair pb-8">
          <h2 className="reveal text-[clamp(36px,4.4vw,56px)] font-bold leading-none tracking-[-0.02em]">Classes</h2>
          <p className="label reveal text-mid">Hatha — Ashtanga — Private — Online</p>
        </div>
        <div className="mt-14 grid gap-14 md:grid-cols-3 md:gap-8">
          {classes.map((c, i) => (
            <article key={c.title} className="reveal group" style={{ ["--d" as string]: `${i * 90}ms` }}>
              <div className="overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="bw aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
              <p className="label mt-6 font-semibold text-ink">{c.title}</p>
              <p className="label mt-2 text-mid">{c.caption}</p>
              <p className="mt-4 text-[15px] leading-[1.7] text-mid">{c.description}</p>
              <div className="mt-5 flex items-center justify-between border-t border-hair pt-4">
                <span className="text-[14px] font-semibold">{c.price ?? "Ask about pricing"}</span>
                <a
                  href={whatsappLink(`Hi Asha! I'm interested in ${c.title}. Could you share timings and pricing?`)}
                  target="_blank"
                  rel="noreferrer"
                  className="label text-teal hover:text-teal-dark"
                >
                  Enquire →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
