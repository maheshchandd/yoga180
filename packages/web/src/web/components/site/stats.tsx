import { site } from "../../content/site";

const stats = [
  { n: site.googleRating.toFixed(1), l: "Google rating" },
  { n: String(site.googleReviewCount), l: "Five-star reviews" },
  { n: "200", l: "Hours of training" },
  { n: "RYT", l: "Yoga Alliance certified" },
];

export function Band() {
  return (
    <div className="relative h-[52vh] min-h-[320px] overflow-hidden md:h-[70vh]">
      <img
        src="/images/student-boat.jpg"
        alt="Student practice outdoors on the grass"
        loading="lazy"
        className="bw h-full w-full object-cover"
      />
    </div>
  );
}

export function Stats() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="wrap">
        <div className="grid grid-cols-2 border-y border-hair md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.l}
              className={`reveal px-4 py-10 text-center md:py-14 ${i % 2 === 1 ? "border-l border-hair" : ""} ${
                i > 1 ? "border-t border-hair md:border-t-0" : ""
              } ${i === 2 ? "md:border-l" : ""}`}
              style={{ ["--d" as string]: `${i * 80}ms` }}
            >
              <p className="text-[clamp(44px,5.5vw,72px)] font-bold leading-none tracking-[-0.03em]">{s.n}</p>
              <p className="label mt-4 text-mid">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
