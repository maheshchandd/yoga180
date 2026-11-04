import { LoopVideo } from "./loop-video";
import { whatsappLink } from "../../content/site";
import { WhatsAppIcon } from "./icons";

const poses = [
  "Pranamasana",
  "Hasta Uttanasana",
  "Padahastasana",
  "Ashwa Sanchalanasana",
  "Dandasana",
  "Ashtanga Namaskara",
  "Bhujangasana",
  "Adho Mukha Svanasana",
  "Ashwa Sanchalanasana",
  "Padahastasana",
  "Hasta Uttanasana",
  "Tadasana",
];

export function SunSalutation() {
  return (
    <section id="surya-namaskar" className="bg-ink py-24 text-white md:py-36">
      <div className="wrap grid items-center gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6">
          <p className="label reveal text-white/60">Surya Namaskar</p>
          <h2
            className="reveal mt-6 text-[clamp(36px,4.4vw,56px)] font-bold leading-[1] tracking-[-0.02em]"
            style={{ ["--d" as string]: "80ms" }}
          >
            Sun Salutation, <span className="font-normal italic text-white/80">twelve breaths of flow.</span>
          </h2>
          <p
            className="reveal mt-6 max-w-[46ch] text-[16px] leading-[1.75] text-white/75"
            style={{ ["--d" as string]: "140ms" }}
          >
            The classic sequence that warms the whole body, links movement to breath and settles the mind.
            Every student learns it step by step — at their own pace.
          </p>

          <ol
            className="reveal mt-10 grid grid-cols-1 border-t border-white/20 sm:grid-cols-2 sm:gap-x-8"
            style={{ ["--d" as string]: "200ms" }}
          >
            {poses.map((p, i) => (
              <li key={`${p}-${i}`} className="flex items-baseline gap-4 border-b border-white/20 py-3">
                <span className="label w-6 shrink-0 text-white/40">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[14px] text-white/90">{p}</span>
              </li>
            ))}
          </ol>

          <div className="reveal mt-10 flex flex-wrap gap-3" style={{ ["--d" as string]: "260ms" }}>
            <a href="#book" className="btn btn-primary">
              Book a class
            </a>
            <a
              href={whatsappLink("Hi Asha! I'd love to learn Surya Namaskar. When is your next class?")}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost-light"
            >
              <WhatsAppIcon /> Ask on WhatsApp
            </a>
          </div>
        </div>

        <div className="reveal order-first md:order-none md:col-span-5 md:col-start-8" style={{ ["--d" as string]: "120ms" }}>
          <div className="relative mx-auto max-w-[400px] overflow-hidden">
            <LoopVideo
              src="/videos/surya-namaskar.mp4"
              poster="/images/surya-namaskar-poster.jpg"
              className="aspect-[9/16] w-full bg-black object-cover"
              label="Student practising a full round of Surya Namaskar outdoors, sped up"
            />
            <span className="label absolute left-4 top-4 bg-white px-3 py-2 text-ink">Student practice</span>
            <span className="label absolute bottom-4 right-4 bg-black/60 px-3 py-2 text-white">4× speed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
