import { MapPin } from "lucide-react";
import { schedule, site } from "../../content/site";

export function Schedule() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", timeZone: "America/Toronto" });
  return (
    <section id="schedule" className="bg-soft py-24 md:py-36">
      <div className="wrap grid gap-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6">
          <p className="label reveal text-mid">Weekly schedule</p>
          <h2 className="reveal mt-6 text-[clamp(36px,4.4vw,56px)] font-bold leading-[1] tracking-[-0.02em]">
            Morning &amp; evening
          </h2>
          <div className="reveal mt-10 border-t border-ink">
            {schedule.map((d) => {
              const isToday = d.day === today;
              return (
                <div key={d.day} className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-hair py-4">
                  <span className={`label ${isToday ? "font-semibold text-teal" : "text-ink"}`}>
                    {d.day}
                    {isToday && <span className="ml-3 text-mid">· Today</span>}
                  </span>
                  <span className="flex flex-wrap justify-end gap-x-6 gap-y-1 text-[15px] tabular-nums">
                    {d.sessions.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="reveal mt-6 text-[14px] leading-[1.7] text-mid">
            All times are Toronto time. Sunday demos are currently morning-only. Spots are limited — please book or message before your first visit.
          </p>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <p className="label reveal text-mid">Location</p>
          <div className="reveal mt-6 aspect-[4/3] w-full overflow-hidden border border-hair bg-white md:aspect-square">
            <iframe
              title="Yoga180 location map"
              src={site.mapEmbedUrl}
              className="h-full w-full grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="reveal mt-6 flex items-start justify-between gap-6">
            <p className="flex gap-3 text-[15px] leading-[1.6]">
              <MapPin size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-teal" />
              <span>
                <strong className="font-semibold">Yoga180 home studio</strong>
                <br />
                {site.address}
              </span>
            </p>
            <a href={site.googleMapsUrl} target="_blank" rel="noreferrer" className="label shrink-0 text-teal hover:text-teal-dark">
              Directions →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
