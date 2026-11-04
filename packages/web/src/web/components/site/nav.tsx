import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "../../content/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#classes", label: "Classes" },
  { href: "#online", label: "Online" },
  { href: "#reviews", label: "Reviews" },
  { href: "#schedule", label: "Schedule" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = !solid && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        light ? "bg-transparent text-white" : "border-b border-hair bg-white/95 text-ink backdrop-blur"
      }`}
    >
      <div className="wrap flex h-[68px] items-center justify-between">
        <a href="#top" className="flex items-baseline gap-[2px] text-[19px] font-extrabold tracking-[0.12em]">
          YOGA<span className={light ? "font-normal text-white/80" : "font-normal text-teal"}>180</span>
        </a>
        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="label opacity-85 transition-opacity hover:opacity-100">
              {l.label}
            </a>
          ))}
          <a href="#demo" className={`btn h-10 ${light ? "btn-ghost-light" : "btn-primary"}`}>
            Book a demo
          </a>
        </nav>
        <button
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-hair bg-white md:hidden">
          <div className="wrap flex flex-col py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-hair py-4 text-[15px] font-semibold uppercase tracking-[0.14em]"
              >
                {l.label}
              </a>
            ))}
            <a href="#demo" onClick={() => setOpen(false)} className="btn btn-primary mt-6">
              Book a demo
            </a>
            <p className="label mt-5 text-mid">{site.phoneDisplay}</p>
          </div>
        </div>
      )}
    </header>
  );
}
