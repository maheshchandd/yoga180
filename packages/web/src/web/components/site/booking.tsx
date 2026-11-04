import { useState } from "react";
import { Check, Loader2, Phone } from "lucide-react";
import { classes, site, smsLink, telLink, whatsappLink } from "../../content/site";
import { useCreateLead } from "../../queries/leads";
import { WhatsAppIcon } from "./icons";

const days = ["Any day", "Weekdays", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = ["Morning", "Evening", "Flexible"];

type Form = {
  name: string;
  phone: string;
  classType: string;
  preferredDay: string;
  preferredTime: string;
  message: string;
  website: string;
};

const empty: Form = {
  name: "",
  phone: "",
  classType: classes[0].title,
  preferredDay: days[0],
  preferredTime: times[0],
  message: "",
  website: "",
};

function summary(f: Form) {
  return [
    `Hi Asha! I'd like to book a call about yoga classes.`,
    `Name: ${f.name}`,
    f.phone && `Phone: ${f.phone}`,
    `Interested in: ${f.classType}`,
    `Preferred: ${f.preferredDay}, ${f.preferredTime}`,
    f.message && `Note: ${f.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function Booking() {
  const [f, setF] = useState<Form>(empty);
  const [sent, setSent] = useState<Form | null>(null);
  const create = useCreateLead();
  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate(
      { type: "booking", ...f },
      {
        onSuccess: () => {
          setSent(f);
          setF(empty);
        },
      },
    );
  };

  return (
    <section id="book" className="bg-soft py-24 md:py-36">
      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="reveal md:col-span-5">
          <div className="flex h-full flex-col border border-ink p-8 sm:p-10">
            <p className="label text-mid">Book a call</p>
            <h2 className="mt-6 text-[clamp(38px,4.6vw,60px)] font-bold leading-[0.98] tracking-[-0.02em]">
              Start your <span className="font-normal italic">practice.</span>
            </h2>
            <p className="mt-6 text-[15px] leading-[1.75] text-mid">
              Leave your details and preferred time — Asha will call you back to chat about your goals and
              find the right class. Prefer to talk now? Reach her directly.
            </p>
            <div className="mt-auto space-y-px pt-10">
              <a href={telLink} className="flex items-center justify-between border-t border-hair py-4 hover:text-teal">
                <span className="label flex items-center gap-3 text-ink">
                  <Phone size={14} /> Call
                </span>
                <span className="text-[15px] tabular-nums">{site.phoneDisplay}</span>
              </a>
              <a
                href={whatsappLink("Hi Asha! I'd like to know more about Yoga180 classes.")}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border-t border-hair py-4 hover:text-teal"
              >
                <span className="label flex items-center gap-3 text-ink">
                  <WhatsAppIcon size={15} /> WhatsApp
                </span>
                <span className="label text-teal">Chat now →</span>
              </a>
              <a
                href={smsLink("Hi Asha! I'd like to know more about Yoga180 classes.")}
                className="flex items-center justify-between border-y border-hair py-4 hover:text-teal"
              >
                <span className="label text-ink">Text message</span>
                <span className="label text-mid">SMS →</span>
              </a>
            </div>
          </div>
        </div>

        <div className="reveal md:col-span-6 md:col-start-7" style={{ ["--d" as string]: "100ms" }}>
          {sent ? (
            <div className="flex h-full flex-col justify-center bg-white p-8 sm:p-12">
              <span className="flex h-12 w-12 items-center justify-center bg-teal text-white">
                <Check size={22} />
              </span>
              <h3 className="mt-8 text-[32px] font-bold leading-tight">Thank you, {sent.name.split(" ")[0]}.</h3>
              <p className="mt-4 text-[15px] leading-[1.75] text-mid">
                Your request is in. Asha will call you back soon. For the fastest reply, send it to her on WhatsApp too.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappLink(summary(sent))} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <WhatsAppIcon /> Send on WhatsApp
                </a>
                <button onClick={() => setSent(null)} className="btn btn-ghost-dark">
                  New request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="bg-white p-8 sm:p-12">
              <div className="grid gap-8 sm:grid-cols-2">
                <label className="block">
                  <span className="label text-mid">Your name *</span>
                  <input required aria-label="Your name" className="field" value={f.name} onChange={set("name")} autoComplete="name" />
                </label>
                <label className="block">
                  <span className="label text-mid">Phone *</span>
                  <input
                    required
                    aria-label="Phone"
                    type="tel"
                    className="field"
                    value={f.phone}
                    onChange={set("phone")}
                    autoComplete="tel"
                    placeholder="647-000-0000"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="label text-mid">Interested in</span>
                  <select aria-label="Interested in" className="field" value={f.classType} onChange={set("classType")}>
                    {classes.map((c) => (
                      <option key={c.title}>{c.title}</option>
                    ))}
                    <option>Live Online Class</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
                <label className="block sm:col-span-2 lg:col-span-1">
                  <span className="label text-mid">Preferred day</span>
                  <select aria-label="Preferred day" className="field" value={f.preferredDay} onChange={set("preferredDay")}>
                    {days.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </label>
                <div className="sm:col-span-2 lg:col-span-1">
                  <span className="label text-mid">Preferred time</span>
                  <div className="mt-3 flex gap-2">
                    {times.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setF((p) => ({ ...p, preferredTime: t }))}
                        className={`label h-10 min-w-0 flex-1 border px-1 tracking-[0.12em] transition-colors ${
                          f.preferredTime === t ? "border-ink bg-ink text-white" : "border-hair text-ink hover:border-ink"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="block sm:col-span-2">
                  <span className="label text-mid">Anything Asha should know?</span>
                  <textarea
                    rows={3}
                    aria-label="Anything Asha should know?"
                    className="field resize-none"
                    value={f.message}
                    onChange={set("message")}
                    placeholder="Goals, injuries, experience…"
                  />
                </label>
                <input
                  tabIndex={-1}
                  aria-label="Leave empty"
                  autoComplete="off"
                  className="hidden"
                  value={f.website}
                  onChange={set("website")}
                  aria-hidden
                />
              </div>
              {create.isError && (
                <p className="mt-6 text-[14px] text-red-700">
                  {create.error.message || "Something went wrong."} You can also reach Asha on WhatsApp.
                </p>
              )}
              <button type="submit" disabled={create.isPending} className="btn btn-primary mt-10 w-full disabled:opacity-60">
                {create.isPending ? <Loader2 size={16} className="animate-spin" /> : "Request a call back"}
              </button>
              <p className="mt-4 text-center text-[12px] text-mid">Usually replies the same day.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
