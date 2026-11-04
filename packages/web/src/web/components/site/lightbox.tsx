import { useEffect } from "react";
import { X } from "lucide-react";

export function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string | null;
  alt?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  if (!src) return null;
  return (
    <dialog
      open
      aria-modal="true"
      className="fixed inset-0 z-[60] m-0 flex h-full max-h-none w-full max-w-none items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
    >
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 cursor-zoom-out" />
      <X size={28} strokeWidth={1.25} className="pointer-events-none absolute right-5 top-5 text-white/80" />
      <img src={src} alt={alt ?? ""} className="pointer-events-none relative max-h-[88vh] max-w-full object-contain" />
    </dialog>
  );
}
