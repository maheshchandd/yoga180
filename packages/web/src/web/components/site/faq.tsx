import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "../../content/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white py-24 md:py-36">
      <div className="wrap grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="label reveal text-mid">Questions</p>
          <h2 className="reveal mt-6 text-[clamp(36px,4.4vw,56px)] font-bold leading-[1] tracking-[-0.02em]">FAQ</h2>
        </div>
        <div className="reveal border-t border-ink md:col-span-8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-hair">
                <button
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-[17px] font-semibold md:text-[19px]">{f.q}</span>
                  <Plus
                    size={20}
                    strokeWidth={1.25}
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45 text-teal" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <p className="overflow-hidden pr-10 text-[15px] leading-[1.75] text-mid">
                    <span className="block pb-6">{f.a}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
