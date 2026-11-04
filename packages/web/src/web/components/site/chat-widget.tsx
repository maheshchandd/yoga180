import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { site, smsLink, whatsappLink } from "../../content/site";
import { useCreateLead } from "../../queries/leads";
import { WhatsAppIcon } from "./icons";

const quick = [
  "I'd like to try my first class",
  "What are the class timings?",
  "What are your prices?",
  "Do you offer private sessions?",
];

type Msg = { from: "asha" | "me"; text: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "asha", text: `Hi, I'm Asha. Thanks for visiting Yoga180! How can I help you today?` },
  ]);
  const [nudge, setNudge] = useState(false);
  const create = useCreateLead();
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  const compose = (t: string) => `Hi Asha! ${name ? `This is ${name}. ` : ""}${t}`;

  const send = (channel: "whatsapp" | "sms", override?: string) => {
    const body = (override ?? text).trim();
    if (!body) return;
    const full = compose(body);
    // Open the messaging app synchronously (inside the click) so it isn't blocked.
    if (channel === "whatsapp") window.open(whatsappLink(full), "_blank", "noopener");
    else window.location.href = smsLink(full);
    create.mutate({
      type: "chat",
      name: name.trim() || "Website visitor",
      phone: phone.trim() || undefined,
      message: `[${channel}] ${body}`,
    });
    setMsgs((m) => [
      ...m,
      { from: "me", text: body },
      {
        from: "asha",
        text:
          channel === "whatsapp"
            ? "WhatsApp has opened with your message — just tap Send and I'll reply there."
            : "Your messages app has opened — tap Send and I'll text you back.",
      },
    ]);
    setText("");
  };

  return (
    <>
      {open && (
        <section
          className="fixed inset-x-3 bottom-[148px] z-50 flex max-h-[calc(100svh-230px)] flex-col md:left-auto md:w-[380px] md:max-h-[620px] border border-ink bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] animate-in fade-in slide-in-from-bottom-4 duration-300 md:bottom-44 md:right-8"
          aria-label="Chat with Asha"
        >
          <div className="flex items-center gap-3 bg-ink px-5 py-4 text-white">
            <img src="/images/asha-avatar.jpg" alt="" className="h-10 w-10 rounded-full object-cover" />
            <div className="flex-1">
              <p className="text-[15px] font-semibold leading-tight">Asha · Yoga180</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-white/65">
                <span className="h-1.5 w-1.5 rounded-full bg-leaf" /> Usually replies the same day
              </p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-white/70 hover:text-white">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto bg-soft px-4 py-5">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <p
                  className={`max-w-[82%] px-4 py-2.5 text-[14px] leading-[1.55] ${
                    m.from === "me" ? "bg-teal text-white" : "border border-hair bg-white text-ink"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {quick.map((q) => (
                  <button
                    key={q}
                    onClick={() => setText(q)}
                    className="border border-ink/70 bg-white px-3 py-1.5 text-[12.5px] transition-colors hover:bg-ink hover:text-white"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-hair p-4">
            <div className="grid grid-cols-2 gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                aria-label="Your name"
                className="w-full min-w-0 border-b border-hair pb-2 text-[14px] outline-none focus:border-teal"
                autoComplete="name"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (optional)"
                aria-label="Your phone number"
                type="tel"
                inputMode="tel"
                maxLength={30}
                className="w-full min-w-0 border-b border-hair pb-2 text-[14px] outline-none focus:border-teal"
                autoComplete="tel"
              />
            </div>
            <div className="mt-3 flex items-end gap-2">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send("whatsapp");
                  }
                }}
                rows={2}
                aria-label="Message"
                placeholder="Type your message…"
                className="flex-1 resize-none text-[14px] leading-[1.5] outline-none"
              />
            </div>
            <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
              <button
                onClick={() => send("whatsapp")}
                disabled={!text.trim()}
                className="btn btn-primary h-11 disabled:opacity-40"
              >
                <WhatsAppIcon /> Send on WhatsApp
              </button>
              <button
                onClick={() => send("sms")}
                disabled={!text.trim()}
                className="btn btn-ghost-dark h-11 px-4 disabled:opacity-40"
                aria-label="Send as text message"
                title="Send as text message"
              >
                <Send size={14} /> SMS
              </button>
            </div>
            <p className="mt-3 text-center text-[11px] text-mid">
              Messages go straight to Asha at {site.phoneDisplay}
            </p>
          </div>
        </section>
      )}

      <div className="fixed bottom-[84px] right-4 z-50 flex items-center gap-3 md:bottom-24 md:right-8">
        {nudge && !open && (
          <button
            onClick={() => {
              setOpen(true);
              setNudge(false);
            }}
            className="hidden border border-ink bg-white px-4 py-2.5 text-[13px] shadow-lg animate-in fade-in slide-in-from-right-2 duration-500 sm:block"
          >
            Questions? Chat with Asha
          </button>
        )}
        <button
          onClick={() => {
            setOpen((o) => !o);
            setNudge(false);
          }}
          aria-label={open ? "Close chat" : "Chat with Asha"}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white shadow-[0_12px_30px_-8px_rgba(31,107,120,0.7)] transition-transform hover:scale-105 hover:bg-teal-dark"
        >
          {open ? <X size={22} strokeWidth={1.75} /> : <MessageSquare size={22} strokeWidth={1.75} />}
        </button>
      </div>
    </>
  );
}
