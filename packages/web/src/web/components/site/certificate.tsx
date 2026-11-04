import { useEffect, useState } from "react";
import { BadgeCheck, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { site } from "../../content/site";

const CERT_SRC = "/images/certificate-flat.jpg";
const CERT_ALT =
  "Asha Panchal's 200-hour Hatha and Ashtanga yoga teacher training certificate from World Peace Yoga School, Rishikesh, meeting Yoga Alliance USA standards, YA ID 143420";

/** The certificate, displayed as a physical framed print: black frame, white mat, glass sheen. */
function FramedCertificate({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      aria-label="View the certificate full size"
      className="group relative block w-full cursor-zoom-in text-left"
    >
      {/* Frame */}
      <div className="relative bg-[#161616] p-[10px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55),0_14px_28px_-14px_rgba(0,0,0,0.35)] transition-transform duration-700 group-hover:-translate-y-1 sm:p-[16px] md:p-[20px]">
        {/* Frame bevel highlights */}
        <span className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(0,0,0,0.6),inset_1px_0_0_rgba(255,255,255,0.06),inset_-1px_0_0_rgba(0,0,0,0.5)]" />
        {/* Mat */}
        <div className="bg-[#FBFAF7] p-[5%] shadow-[inset_0_2px_6px_rgba(0,0,0,0.18)]">
          {/* Mat bevel cut + print */}
          <div className="relative shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.12)]">
            <img
              src={CERT_SRC}
              alt={CERT_ALT}
              width={1500}
              height={1060}
              loading="lazy"
              className="block aspect-[1500/1060] w-full object-cover"
            />
            {/* Glass sheen */}
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_38%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.08)_100%)]" />
          </div>
        </div>
      </div>
      <span className="label absolute bottom-5 right-5 flex items-center gap-2 bg-white px-3 py-2 text-ink opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100 sm:bottom-8 sm:right-8">
        <Maximize2 size={12} /> View full size
      </span>
    </button>
  );
}

/** Full-screen viewer with zoom so every line of the certificate can be read, on phones too. */
function CertificateViewer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!open) return;
    setZoom(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <dialog
      open
      aria-modal="true"
      aria-label="Certificate"
      className="fixed inset-0 z-[60] m-0 flex h-full max-h-none w-full max-w-none flex-col bg-black p-0 text-white animate-in fade-in duration-200"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="label truncate text-white/70">200-hour teacher training · YA ID {site.certification.yaId}</p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom((z) => !z)}
            className="label flex h-10 items-center gap-2 px-3 text-white/85 hover:text-white"
          >
            {zoom ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
            <span className="hidden sm:inline">{zoom ? "Fit to screen" : "Zoom in"}</span>
          </button>
          <button onClick={onClose} aria-label="Close" className="flex h-10 w-10 items-center justify-center text-white/85 hover:text-white">
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div className={`min-h-0 flex-1 ${zoom ? "overflow-auto" : "flex items-center justify-center overflow-hidden"} px-4 pb-6 sm:px-6`}>
        <button
          onClick={() => setZoom((z) => !z)}
          aria-label={zoom ? "Fit to screen" : "Zoom in"}
          className={zoom ? "mx-auto block cursor-zoom-out" : "flex h-full w-full cursor-zoom-in items-center justify-center"}
        >
          <img
            src={CERT_SRC}
            alt={CERT_ALT}
            className={zoom ? "block w-[250vw] max-w-none sm:w-[1500px]" : "block max-h-full max-w-full object-contain"}
          />
        </button>
      </div>
    </dialog>
  );
}

const facts = [
  { k: "Credential", v: "Registered Yoga Teacher · RYT 200" },
  { k: "Standard", v: "Yoga Alliance USA (RYS 200)" },
  { k: "Training", v: "200 hours · Hatha & Ashtanga" },
  { k: "School", v: "World Peace Yoga School, Rishikesh" },
];

export function Certificate() {
  const [open, setOpen] = useState(false);
  const c = site.certification;

  return (
    <section id="certificate" className="bg-white py-24 md:py-36">
      <div className="wrap">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="label reveal flex items-center justify-center gap-2 text-mid">
            <BadgeCheck size={14} className="text-teal" /> Credentials
          </p>
          <h2
            className="reveal mt-6 text-[clamp(36px,4.4vw,56px)] font-bold leading-[1] tracking-[-0.02em]"
            style={{ ["--d" as string]: "80ms" }}
          >
            Certified. <span className="font-normal italic">Properly trained.</span>
          </h2>
          <p className="reveal mt-6 text-[16px] leading-[1.75] text-mid" style={{ ["--d" as string]: "140ms" }}>
            Asha's teacher-training certificate from {c.school}, meeting the standards set by Yoga Alliance
            USA. Tap the certificate to read it in full.
          </p>
        </div>

        <div className="reveal mx-auto mt-14 max-w-[940px] md:mt-20" style={{ ["--d" as string]: "200ms" }}>
          <FramedCertificate onOpen={() => setOpen(true)} />
          {/* Wall shadow under the frame */}
          <div className="mx-auto mt-2 h-4 w-[86%] rounded-[50%] bg-black/10 blur-md" />
        </div>

        <div className="reveal mx-auto mt-14 max-w-[940px]" style={{ ["--d" as string]: "260ms" }}>
          <dl className="grid grid-cols-1 border-y border-hair sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.k}
                className={`py-5 sm:px-5 ${i > 0 ? "border-t border-hair sm:border-t-0" : ""} ${
                  i % 2 === 1 ? "sm:border-l" : ""
                } ${i > 1 ? "sm:border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""} border-hair`}
              >
                <dt className="label text-mid">{f.k}</dt>
                <dd className="mt-2 text-[14px] font-semibold leading-snug text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => setOpen(true)} className="btn btn-ghost-dark">
              <Maximize2 size={14} /> View full size
            </button>
            <span className="label text-mid">Yoga Alliance ID {c.yaId}</span>
          </div>
        </div>
      </div>
      <CertificateViewer open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
