import { ArrowUpRight } from "lucide-react";
import { reviews, site } from "../../content/site";
import { Stars } from "./icons";

export function Reviews() {
  return (
    <section id="reviews" className="bg-soft py-24 md:py-36">
      <div className="wrap grid gap-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <p className="label reveal text-mid">What students say</p>
            <h2 className="reveal mt-6 text-[clamp(36px,4.4vw,56px)] font-bold leading-[1] tracking-[-0.02em]">
              Kind words
            </h2>
            <div className="reveal mt-8 flex items-center gap-4">
              <span className="text-[56px] font-bold leading-none tracking-[-0.03em]">
                {site.googleRating.toFixed(1)}
              </span>
              <div>
                <Stars className="text-teal" />
                <p className="label mt-2 text-mid">{site.googleReviewCount} reviews on Google</p>
              </div>
            </div>
            <a
              href={site.googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost-dark reveal mt-8"
            >
              Read all on Google <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="md:col-span-8">
          {reviews.map((r, i) => (
            <figure
              key={r.name}
              className={`reveal py-10 ${i === 0 ? "pt-0 md:pt-2" : "border-t border-hair"}`}
              style={{ ["--d" as string]: `${(i % 3) * 60}ms` }}
            >
              <blockquote className="text-[clamp(19px,2vw,24px)] font-normal italic leading-[1.5] text-ink">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <span className="label font-semibold text-ink">{r.name}</span>
                <span className="h-px w-8 bg-hair" />
                <Stars className="text-teal" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
